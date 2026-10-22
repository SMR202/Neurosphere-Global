import { courses, partnerTypes, copy } from "./client";
import { editorialText } from "@/lib/editorial";
export type FormKind =
  | "waitlist"
  | "course"
  | "student"
  | "partner"
  | "research"
  | "contact";
export type FormField = {
  name: string;
  label: string;
  type: "text" | "email" | "select" | "textarea" | "checkboxes" | "checkbox";
  required?: boolean;
  options?: string[];
  max?: number;
  hint?: string;
  autoComplete?: string;
};
const name: FormField = {
  name: "name",
  label: "Name",
  type: "text",
  required: true,
  max: 120,
  autoComplete: "name",
};
const email: FormField = {
  name: "email",
  label: "Email",
  type: "email",
  required: true,
  max: 254,
  autoComplete: "email",
};
const consent: FormField = {
  name: "consent",
  label: copy(675).replace(" [Link: Privacy Policy]", ""),
  type: "checkbox",
  required: true,
};
export const contactTopics = [
  "General",
  "Research guidance",
  "Dataset access",
  "Collaboration",
  "Learning",
  "Partnerships",
  "Research participation",
  "Media",
];
export const formDefinitions: Record<
  FormKind,
  { title: string; confirmation: string; button: string; fields: FormField[] }
> = {
  waitlist: {
    title: "Join the waitlist",
    confirmation: copy(658),
    button: "Join the waitlist",
    fields: [
      { ...name, required: false },
      email,
      {
        name: "interests",
        label: "What would you like to hear about?",
        type: "checkboxes",
        required: true,
        options: [
          "Courses",
          "Brain-health guides",
          "Research participation",
          "Partnerships",
        ],
      },
      {
        name: "role",
        label: "Role",
        type: "select",
        required: true,
        options: ["Student", "Professional", "Family member", "Institution"],
      },
      { name: "city", label: "City", type: "text", required: true, max: 120 },
      consent,
    ],
  },
  course: {
    title: "Course interest",
    confirmation: copy(661),
    button: "Register interest",
    fields: [
      name,
      email,
      { name: "role", label: "Role", type: "text", required: true, max: 120 },
      {
        name: "discipline",
        label: "Discipline",
        type: "text",
        required: true,
        max: 160,
      },
      {
        name: "organisation",
        label: "University or workplace",
        type: "text",
        required: true,
        max: 200,
      },
      {
        name: "course",
        label: "Which course?",
        type: "select",
        required: true,
        options: courses.map((c) => c.title),
      },
      {
        name: "scholarship",
        label: "Scholarship needed",
        type: "select",
        required: true,
        options: ["Yes", "No"],
      },
      consent,
    ],
  },
  student: {
    title: "Apply for a student track",
    confirmation: editorialText(copy(664)),
    button: "Apply for a student track",
    fields: [
      name,
      email,
      {
        name: "university",
        label: "University",
        type: "text",
        required: true,
        max: 200,
      },
      {
        name: "discipline",
        label: "Discipline",
        type: "select",
        required: true,
        options: [
          "Pharmacy",
          "Physical therapy",
          "Occupational therapy",
          "Speech-language pathology",
          "Nursing",
          "Clinical and counselling psychology",
          "Medicine and residents",
          "Public health and social sciences",
          "Biomedical, neuroscience, engineering and data science",
        ],
      },
      {
        name: "year",
        label: "Year of study",
        type: "text",
        required: true,
        max: 80,
      },
      {
        name: "statement",
        label: "Short statement",
        type: "textarea",
        required: true,
        max: 3000,
      },
      { name: "reference", label: "Reference", type: "text", max: 300 },
      consent,
    ],
  },
  partner: {
    title: "Partner enquiry",
    confirmation: editorialText(copy(667)),
    button: "Send an enquiry",
    fields: [
      name,
      {
        name: "organisation",
        label: "Organisation and role",
        type: "text",
        required: true,
        max: 250,
      },
      email,
      {
        name: "partnerType",
        label: "Type of partner",
        type: "select",
        required: true,
        options: partnerTypes.map((p) => p.type),
      },
      {
        name: "message",
        label: "What would you like to do together?",
        type: "textarea",
        required: true,
        max: 5000,
      },
      { name: "timeline", label: "Timeline", type: "text", max: 160 },
      consent,
      {
        name: "namingPermission",
        label: "Permission to be named as a founding partner later.",
        type: "checkbox",
      },
    ],
  },
  research: {
    title: "Register your interest",
    confirmation: copy(670),
    button: "Register interest",
    fields: [
      name,
      email,
      {
        name: "ageGroup",
        label: "Age group",
        type: "select",
        required: true,
        options: [
          "Under 18",
          "18–24",
          "25–34",
          "35–44",
          "45–54",
          "55–64",
          "65 or over",
          "Prefer not to say",
        ],
      },
      { name: "city", label: "City", type: "text", required: true, max: 120 },
      {
        name: "conditions",
        label: "Conditions of interest",
        type: "text",
        max: 250,
        hint: "Optional. Please do not include personal medical information.",
      },
      consent,
    ],
  },
  contact: {
    title: "Send an enquiry",
    confirmation: editorialText(copy(673)),
    button: "Send an enquiry",
    fields: [
      name,
      email,
      {
        name: "topic",
        label: "Topic",
        type: "select",
        required: true,
        options: contactTopics,
      },
      {
        name: "message",
        label: "Message",
        type: "textarea",
        required: true,
        max: 5000,
        hint: "Please do not include personal medical information.",
      },
      consent,
    ],
  },
};
