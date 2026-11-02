import { z } from "zod";
import { getFormDefinition, type FormKind } from "@/content/forms";
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
    intent: z.literal("brief").optional(),
  })
  .superRefine((payload, ctx) => {
    if (payload.intent && payload.form !== "partner")
      ctx.addIssue({
        code: "custom",
        path: ["intent"],
        message: "This request is not available for this form.",
      });
    const definition = getFormDefinition(payload.form, payload.intent);
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
export function draftText(
  form: FormKind,
  values: Submission["values"],
  intent?: "brief",
) {
  return [
    "NeuroZehn — " + getFormDefinition(form, intent).title,
    "DRAFT — NOT SENT",
    "",
    ...getFormDefinition(form, intent)
      .fields.filter(
        (field) =>
          field.required ||
          (Array.isArray(values[field.name])
            ? (values[field.name] as string[]).length > 0
            : Boolean(values[field.name])),
      )
      .map(
        (field) =>
          `${field.label}\n${Array.isArray(values[field.name]) ? (values[field.name] as string[]).join(", ") : values[field.name] || "Not provided"}\n`,
      ),
  ].join("\n");
}

export function emailHref(form: FormKind, text: string, intent?: "brief") {
  const body = text.replace(
    "DRAFT — NOT SENT",
    "Enquiry prepared on the NeuroZehn website",
  );
  return `mailto:NeuroZehn@outlook.com?subject=${encodeURIComponent("NeuroZehn — " + getFormDefinition(form, intent).title)}&body=${encodeURIComponent(body)}`;
}
