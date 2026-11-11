import { z } from "zod";
import {
  getFormDefinition,
  getFormTitle,
  type FormKind,
} from "@/content/forms";
import type { Submission } from "./submission";

export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
export class Web3FormsError extends Error {}

export const web3FormsPayloadSchema = z
  .object({
    access_key: z.uuid(),
    subject: z.string().min(1).max(200),
    from_name: z.literal("NeuroZehn website"),
    email: z.email().max(254),
    name: z.string().min(1).max(120).optional(),
    message: z.string().min(1).max(20000),
    botcheck: z.literal(false),
  })
  .strict();

export function web3FormsPayload(data: Submission, accessKey: string) {
  const definition = getFormDefinition(data.form, data.intent);
  const title = getFormTitle(data.form, data.intent, data.values);
  const entries = definition.fields.flatMap((field) => {
    const value = data.values[field.name];
    const text = Array.isArray(value) ? value.join(", ") : (value || "").trim();
    if (!text) return [];
    return [
      `${field.name === "consent" ? "Consent" : field.label}\n${field.name === "consent" ? `Yes — ${field.label}` : text}`,
    ];
  });
  const name = String(data.values.name || "").trim();
  return web3FormsPayloadSchema.parse({
    access_key: accessKey,
    subject: `NeuroZehn — ${title}`,
    from_name: "NeuroZehn website",
    email: String(data.values.email).trim(),
    ...(name ? { name } : {}),
    message: [title, ...entries].join("\n\n"),
    botcheck: false,
  });
}

// An emailed interest request is not an automatic mailing-list subscription.
export function emailSubmissionConfirmation(form: FormKind, intent?: "brief") {
  if (form === "waitlist")
    return "Thank you. Your update preferences have been submitted to the NeuroZehn team. This does not confirm a course or programme place.";
  if (form === "partner" && intent === "brief")
    return "Thank you. Your request for the partner brief has been submitted. We will reply by email.";
  return getFormDefinition(form, intent).confirmation;
}

export async function sendWeb3Forms(
  payload: z.infer<typeof web3FormsPayloadSchema>,
  fetcher: typeof fetch = fetch,
) {
  const response = await fetcher(WEB3FORMS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(web3FormsPayloadSchema.parse(payload)),
    credentials: "omit",
    redirect: "error",
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok)
    throw new Web3FormsError(
      response.status === 429
        ? "The form service is busy. Please wait a little, or continue by email."
        : "We could not confirm submission. Your details are still here. Please try again or continue by email.",
    );
  const result: unknown = await response.json();
  if (
    !result ||
    typeof result !== "object" ||
    !("success" in result) ||
    result.success !== true
  )
    throw new Web3FormsError(
      "We could not confirm submission. Your details are still here. Please try again or continue by email.",
    );
}
