import { z } from "zod";
import { formDefinitions, type FormKind } from "@/content/forms";
export const submissionSchema = z
  .object({
    form: z.enum([
      "waitlist",
      "course",
      "student",
      "partner",
      "research",
      "contact",
    ]),
    values: z.record(
      z.string().max(60),
      z.union([z.string().max(5000), z.array(z.string().max(250)).max(12)]),
    ),
    website: z.string().max(0).default(""),
  })
  .superRefine((payload, ctx) => {
    const definition = formDefinitions[payload.form];
    for (const field of definition.fields) {
      const raw = payload.values[field.name];
      const value = typeof raw === "string" ? raw.trim() : raw;
      const fail = (message: string) =>
        ctx.addIssue({ code: "custom", path: ["values", field.name], message });
      if (
        field.required &&
        (!value || (Array.isArray(value) && !value.length))
      ) {
        fail("Please complete this field.");
        continue;
      }
      if (field.type === "checkbox") {
        if (value && value !== "yes") fail("Please confirm your choice.");
        continue;
      }
      if (field.type === "checkboxes") {
        if (
          value &&
          (!Array.isArray(value) ||
            value.some((v) => !field.options?.includes(v)))
        )
          fail("Please choose from the listed options.");
        continue;
      }
      if (value !== undefined && typeof value !== "string") {
        fail("Please check this field.");
        continue;
      }
      if (typeof value !== "string" || !value) continue;
      if (field.type === "email" && !z.email().safeParse(value).success)
        fail("Please check your email address.");
      if (field.max && value.length > field.max)
        fail(`Please use ${field.max} characters or fewer.`);
      if (field.type === "select" && !field.options?.includes(value))
        fail("Please choose from the listed options.");
    }
    const allowed = new Set(definition.fields.map((f) => f.name));
    for (const key of Object.keys(payload.values))
      if (!allowed.has(key))
        ctx.addIssue({
          code: "custom",
          path: ["values", key],
          message: "Unexpected field.",
        });
  });
export type Submission = z.infer<typeof submissionSchema>;
export function submissionErrors(error: z.ZodError) {
  const errors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[1] ?? issue.path[0]);
    errors[key] ??= issue.message;
  }
  return errors;
}
export function draftText(form: FormKind, values: Submission["values"]) {
  return [
    "NeuroSphere — " + formDefinitions[form].title,
    "DRAFT — NOT SENT",
    "",
    ...formDefinitions[form].fields.map(
      (field) =>
        `${field.label}\n${Array.isArray(values[field.name]) ? (values[field.name] as string[]).join(", ") : values[field.name] || "Not provided"}\n`,
    ),
  ].join("\n");
}
