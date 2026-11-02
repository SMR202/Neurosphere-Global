import { z } from "zod";
import {
  sendWeb3Forms,
  web3FormsPayloadSchema,
  Web3FormsError,
} from "./web3forms";
import type { Submission } from "./submission";

export class FormSubmissionError extends Error {
  constructor(
    message: string,
    public fields?: Record<string, string>,
  ) {
    super(message);
    this.name = "FormSubmissionError";
  }
}

const handoffSchema = z.object({
  delivery: z.object({
    provider: z.literal("web3forms"),
    payload: web3FormsPayloadSchema,
  }),
  confirmation: z.string().min(1),
});
const errorSchema = z.object({
  error: z.string().min(1),
  fields: z.record(z.string(), z.string()).optional(),
});
const submittedSchema = z.object({ message: z.string().min(1) });

export async function submitInterest(
  data: Submission,
  fetcher: typeof fetch = fetch,
) {
  const response = await fetcher("/api/forms", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    signal: AbortSignal.timeout(15000),
  });
  const result: unknown = await response.json();
  if (!response.ok) {
    const failure = errorSchema.safeParse(result);
    throw new FormSubmissionError(
      failure.success
        ? failure.data.error
        : "We could not submit this. Please try again or continue by email.",
      failure.success ? failure.data.fields : undefined,
    );
  }
  if (response.status === 202) {
    // Web3Forms' free plan requires the browser to make this request.
    // Its form access key is a public inbox alias, not an Outlook credential.
    const handoff = handoffSchema.parse(result);
    try {
      await sendWeb3Forms(handoff.delivery.payload, fetcher);
    } catch (failure) {
      if (failure instanceof Web3FormsError)
        throw new FormSubmissionError(failure.message);
      throw failure;
    }
    return handoff.confirmation;
  }
  return submittedSchema.parse(result).message;
}
