import { enquirySchema } from "./enquiry";

export function deliveryConfiguration() {
  const endpoint = process.env.CONTACT_WEBHOOK_URL;
  const token = process.env.CONTACT_WEBHOOK_TOKEN;
  if (!endpoint || !token) return null;
  try {
    const url = new URL(endpoint);
    if (url.protocol !== "https:") return null;
    return { endpoint, token };
  } catch {
    return null;
  }
}

// Bounded process-local limiter. Configure a shared edge rate limit for multi-instance hosting.
const recentRequests = new Map<string, { count: number; reset: number }>();
export function allowEnquiry(key: string, now = Date.now()) {
  for (const [id, entry] of recentRequests)
    if (entry.reset <= now) recentRequests.delete(id);
  const entry = recentRequests.get(key);
  if (entry && entry.count >= 5) return false;
  if (!entry && recentRequests.size >= 10000) return false;
  recentRequests.set(key, {
    count: (entry?.count ?? 0) + 1,
    reset: entry?.reset ?? now + 15 * 60 * 1000,
  });
  return true;
}

export async function handleEnquiry(
  request: Request,
  fetcher: typeof fetch = fetch,
) {
  const headers = { "Cache-Control": "no-store" };
  const reply = (body: unknown, status: number) =>
    Response.json(body, { status, headers });
  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(request.url).origin)
    return reply({ error: "Please send this enquiry from the website." }, 403);
  if (!request.headers.get("content-type")?.includes("application/json"))
    return reply({ error: "Unsupported request format." }, 415);
  if (Number(request.headers.get("content-length")) > 24000)
    return reply({ error: "Your enquiry is too large." }, 413);
  // Trust the deployment proxy's IP only when explicitly configured by the operator.
  const key =
    process.env.TRUST_PROXY === "true"
      ? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        "unknown"
      : "local";
  if (!allowEnquiry(key))
    return reply(
      {
        error:
          "Too many enquiries. Please wait 15 minutes before trying again.",
      },
      429,
    );
  let raw: unknown;
  try {
    const reader = request.body?.getReader();
    if (!reader) return reply({ error: "Please complete the form." }, 400);
    const chunks: Uint8Array[] = [];
    let length = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > 24000) {
        await reader.cancel();
        return reply({ error: "Your enquiry is too large." }, 413);
      }
      chunks.push(value);
    }
    raw = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return reply({ error: "Please complete the form and try again." }, 400);
  }
  const parsed = enquirySchema.safeParse(raw);
  if (!parsed.success)
    return reply(
      {
        error: "Please review the highlighted fields.",
        fields: parsed.error.flatten().fieldErrors,
      },
      422,
    );
  const config = deliveryConfiguration();
  if (!config)
    return reply(
      {
        error:
          "Enquiry delivery is not yet available. Your message has not been sent. You can download a draft instead.",
      },
      503,
    );
  try {
    const { website: _honeypot, ...data } = parsed.data;
    void _honeypot;
    const response = await fetcher(config.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.token}`,
      },
      body: JSON.stringify({ source: "NeuroSphere Global", enquiry: data }),
      signal: AbortSignal.timeout(10000),
      redirect: "error",
    });
    if (!response.ok)
      return reply(
        {
          error:
            "We could not confirm delivery. Please try again later or download your draft.",
        },
        502,
      );
    return reply(
      {
        message:
          "Your enquiry has been submitted. Thank you for contacting NeuroSphere Global.",
      },
      200,
    );
  } catch {
    return reply(
      {
        error:
          "We could not confirm delivery. Your form is still here; please try again later or download a draft.",
      },
      502,
    );
  }
}
