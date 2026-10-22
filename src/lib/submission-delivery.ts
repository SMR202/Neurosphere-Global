import { submissionSchema, submissionErrors } from "./submission";
import { formDefinitions } from "@/content/forms";
import { allowEnquiry, deliveryConfiguration } from "./enquiry-delivery";
export async function handleSubmission(
  request: Request,
  fetcher: typeof fetch = fetch,
) {
  const reply = (body: unknown, status: number) =>
    Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
  if (request.headers.get("origin") !== new URL(request.url).origin)
    return reply({ error: "Please send this form from the website." }, 403);
  if (!request.headers.get("content-type")?.includes("application/json"))
    return reply({ error: "Unsupported request format." }, 415);
  if (Number(request.headers.get("content-length")) > 24000)
    return reply({ error: "Your request is too large." }, 413);
  const key =
    process.env.TRUST_PROXY === "true"
      ? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        "unknown"
      : "local";
  if (!allowEnquiry("forms:" + key))
    return reply(
      {
        error: "Too many requests. Please wait 15 minutes before trying again.",
      },
      429,
    );
  let raw: unknown;
  try {
    const reader = request.body?.getReader();
    if (!reader) return reply({ error: "Please complete the form." }, 400);
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.length;
      if (size > 24000) {
        await reader.cancel();
        return reply({ error: "Your request is too large." }, 413);
      }
      chunks.push(value);
    }
    raw = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return reply({ error: "Please complete the form and try again." }, 400);
  }
  const parsed = submissionSchema.safeParse(raw);
  if (!parsed.success)
    return reply(
      {
        error: "Please review the highlighted fields.",
        fields: submissionErrors(parsed.error),
      },
      422,
    );
  const configuration = deliveryConfiguration();
  if (!configuration)
    return reply(
      {
        error:
          "Delivery is not yet available. Your details have not been sent. You can prepare a draft instead.",
      },
      503,
    );
  try {
    const response = await fetcher(configuration.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${configuration.token}`,
      },
      body: JSON.stringify({
        source: "NeuroSphere",
        form: parsed.data.form,
        values: parsed.data.values,
      }),
      redirect: "error",
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok)
      return reply(
        {
          error:
            "Something went wrong. Please try again, or prepare a draft below.",
        },
        502,
      );
    return reply(
      { message: formDefinitions[parsed.data.form].confirmation },
      200,
    );
  } catch {
    return reply(
      {
        error:
          "We could not confirm delivery. Your form is still here; please try again or prepare a draft.",
      },
      502,
    );
  }
}
