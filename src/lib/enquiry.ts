import { z } from "zod";
import { domains } from "@/data/resources";
export const enquiryTypes = [
  "Research guidance",
  "Collaboration",
  "General enquiry",
  "Dataset/resource enquiry",
  "Other",
] as const;
export const enquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(120, "Please use 120 characters or fewer."),
  email: z.email("Please enter a valid email address.").max(254),
  institution: z
    .string()
    .trim()
    .max(200, "Please use 200 characters or fewer.")
    .default(""),
  type: z.enum(enquiryTypes, { error: "Please choose an enquiry type." }),
  area: z
    .string()
    .max(60)
    .refine(
      (value) => value === "" || domains.some((d) => d.slug === value),
      "Please choose a research area.",
    )
    .default(""),
  message: z
    .string()
    .trim()
    .min(20, "Please add at least 20 characters to explain your enquiry.")
    .max(5000, "Please keep your message within 5,000 characters."),
  website: z.string().max(0, "Unable to process this enquiry.").default(""),
});
export type Enquiry = z.infer<typeof enquirySchema>;
export function enquiryDraft(values: Enquiry) {
  return [
    "NeuroSphere Global — Research Enquiry",
    "DRAFT — NOT SENT",
    "",
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    `Institution / Organization: ${values.institution || "Not provided"}`,
    `Enquiry type: ${values.type}`,
    `Research area: ${domains.find((d) => d.slug === values.area)?.title || "Not specified"}`,
    "",
    "Message:",
    values.message,
  ].join("\n");
}
