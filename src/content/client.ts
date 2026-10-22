import paragraphs from "../../content/source/copy-paragraphs.json";
import { restoredPages } from "./reconciled";

/** Verbatim text from the supplied DOCX. One-based references match the extraction. */
export function copy(line: number): string {
  const value = paragraphs[line - 1];
  if (!value) throw new Error(`Missing client copy at line ${line}`);
  return value;
}
export function lines(first: number, last: number): string[] {
  return Array.from({ length: last - first + 1 }, (_, i) => copy(first + i));
}
export type Status = "Open now" | "Opening soon" | "In planning";
export { navigation, footerLinks } from "./navigation";
export const pageCopy = {
  "/": { title: copy(38), description: copy(40) },
  "/learn": { title: copy(87), description: copy(89) },
  "/brain-health": { title: copy(271), description: copy(273) },
  "/programmes": { title: copy(339), description: copy(341) },
  "/research": { title: copy(388), description: copy(390) },
  "/partner": { title: copy(459), description: copy(461) },
  "/about": { title: copy(506), description: copy(508) },
  "/people": { title: copy(549), description: copy(551) },
  "/insights": { title: copy(559), description: copy(561) },
  "/ethics-privacy": { title: copy(574), description: copy(576) },
  "/contact": { title: copy(591), description: copy(593) },
} as const;
export type Course = {
  slug: string;
  title: string;
  audience: string;
  status: Status;
  description: string;
  outcomes: string[];
  format?: string;
};
const courseSpecs = [
  ["brain-health-essentials", 102, 103, 196, 198, 200, 204, 205],
  ["supporting-mental-wellbeing", 105, 106, 239, 241, 0, 0, 0],
  [
    "stroke-recognition-and-rehabilitation-basics",
    108,
    109,
    217,
    219,
    221,
    225,
    226,
  ],
  [
    "safe-medicines-for-brain-and-mental-health",
    111,
    112,
    207,
    209,
    211,
    214,
    215,
  ],
  ["research-methods-and-ethics", 114, 115, 228, 230, 232, 236, 237],
  [
    "rehabilitation-swallowing-and-communication-after-stroke",
    117,
    118,
    243,
    245,
    0,
    0,
    0,
  ],
  ["child-language-speech-and-neurodevelopment", 120, 121, 247, 249, 0, 0, 0],
  ["epilepsy-care-and-first-aid", 123, 124, 251, 253, 0, 0, 0],
  ["eeg-foundations", 126, 127, 255, 257, 0, 0, 0],
  ["clinical-research-and-good-clinical-practice", 129, 130, 259, 261, 0, 0, 0],
  [
    "introduction-to-non-invasive-brain-stimulation",
    132,
    133,
    263,
    265,
    0,
    0,
    0,
  ],
] as const;
export const courses: Course[] = courseSpecs.map(
  ([slug, title, audience, , description, start, end, format], i) => ({
    slug,
    title: copy(title),
    audience: copy(audience),
    status: i < 5 ? "Opening soon" : "In planning",
    description: copy(description),
    outcomes: start ? lines(start, end) : [],
    format: format ? copy(format) : undefined,
  }),
);
export const programmes = Array.from({ length: 12 }, (_, i) => ({
  slug: [
    "public-and-school-brain-health",
    "mental-health-and-behaviour",
    "rehabilitation-and-allied-health",
    "education",
    "brain-genetics-and-family-health",
    "child-and-adolescent-brain-health",
    "clinical-research-and-trials",
    "imaging-and-neurophysiology",
    "new-methods-and-technologies",
    "equity-and-access",
    "medicines-and-pharmacy",
    "basic-brain-science",
  ][i],
  title: copy(346 + i * 3),
  description: copy(347 + i * 3),
  status: copy(348 + i * 3).replace("Badge: ", "") as Status,
}));
export const researchStudies = Array.from({ length: 8 }, (_, i) => ({
  title: copy(395 + i * 3),
  description: copy(396 + i * 3),
  status: copy(397 + i * 3).replace("Badge: ", "") as Status,
}));
export const methods = Array.from({ length: 6 }, (_, i) => ({
  name: copy(434 + i * 3),
  purpose: copy(435 + i * 3),
  status: copy(436 + i * 3),
}));
export const studentTracks = Array.from({ length: 9 }, (_, i) => ({
  discipline: copy(141 + i * 3),
  work: copy(142 + i * 3),
  example: copy(143 + i * 3),
}));
export const partnerTypes = Array.from({ length: 7 }, (_, i) => ({
  type: copy(471 + i * 3),
  offer: copy(472 + i * 3),
  ask: copy(473 + i * 3),
}));
export const roadmap = Array.from({ length: 4 }, (_, i) => ({
  stage: copy(526 + i * 3),
  description: copy(527 + i * 3),
  status: copy(528 + i * 3),
}));
export const healthTopics = [
  {
    slug: "stroke",
    title: copy(280),
    description: copy(281),
    status: "Opening soon" as Status,
    paragraphs: [copy(309), copy(310)],
    bullets: lines(311, 314),
    after: lines(315, 317),
  },
  {
    slug: "epilepsy",
    title: copy(282),
    description: copy(283),
    status: "Opening soon" as Status,
    paragraphs: [copy(319), copy(320)],
    bullets: lines(321, 326),
    after: [copy(327)],
  },
  ...Array.from({ length: 8 }, (_, i) => ({
    slug: [
      "memory-and-dementia",
      "child-development",
      "mental-wellbeing",
      "headache-and-pain",
      "head-injury-and-concussion",
      "healthy-habits",
      "medicines",
      "caregivers",
    ][i],
    title: copy(284 + i * 3),
    description: copy(285 + i * 3),
    status: "In planning" as Status,
    paragraphs: [] as string[],
    bullets: [] as string[],
    after: [] as string[],
  })),
];
export const insights = lines(564, 569);
export const clinicalDisclaimer = copy(31);
export const emergency = copy(33);
export const pendingDetails = lines(686, 695);
export const sourceLinks = [
  "https://www.frontiersin.org/journals/health-services/articles/10.3389/frhs.2024.1471528/full",
  "https://www.frontiersin.org/journals/health-services/articles/10.3389/frhs.2024.1471528/full",
  "https://www.worldometers.info/world-population/pakistan-population/",
  "https://pid.gov.pk/site/press_detail/34131",
];

export const legalPages = {
  "/privacy-policy": "Privacy Policy",
  "/terms-of-use": "Terms of Use",
  "/cookies": "Cookie notice",
  "/accessibility": "Accessibility statement",
} as const;

export function getPageInfo(path: string) {
  if (path in restoredPages)
    return restoredPages[path as keyof typeof restoredPages];
  if (path in pageCopy) return pageCopy[path as keyof typeof pageCopy];
  const course = courses.find((c) => path === `/learn/${c.slug}`);
  if (course)
    return {
      title: `${course.title} | Micro-credential | NeuroSphere`,
      description: course.description.includes(". ")
        ? course.description.slice(0, course.description.indexOf(". ") + 1)
        : course.description,
    };
  const programme = programmes.find((p) => path === `/programmes/${p.slug}`);
  if (programme)
    return {
      title: `${programme.title} | NeuroSphere`,
      description: programme.description,
    };
  const health = healthTopics.find((p) => path === `/brain-health/${p.slug}`);
  if (health)
    return {
      title: `${health.title} | Brain Health | NeuroSphere`,
      description: health.description,
    };
  if (path in legalPages)
    return {
      title: `${legalPages[path as keyof typeof legalPages]} | NeuroSphere`,
      description: "Policy text is awaiting approval.",
    };
  const article = /^\/insights\/([1-6])$/.exec(path);
  if (article)
    return {
      title: `${insights[Number(article[1]) - 1]} | NeuroSphere`,
      description: "Article content is being prepared.",
    };
  const extra: Record<string, { title: string; description: string }> = {
    "/about/roadmap": {
      title: "Our roadmap | NeuroSphere",
      description: copy(508),
    },
    "/join": {
      title: "Join the waitlist | NeuroSphere",
      description: copy(81),
    },
    "/learn/student-tracks": {
      title: "Student tracks | NeuroSphere",
      description: copy(137),
    },
    "/research/participate": {
      title: "Research participation | NeuroSphere",
      description: copy(427),
    },
  };
  return extra[path];
}
export const publicPaths = [
  ...Object.keys(restoredPages),
  ...Object.keys(pageCopy),
  ...insights.map((_, i) => `/insights/${i + 1}`),
  ...Object.keys(legalPages),
  "/about/roadmap",
  "/join",
  "/learn/student-tracks",
  "/research/participate",
  ...courses.map((c) => `/learn/${c.slug}`),
  ...programmes.map((p) => `/programmes/${p.slug}`),
  ...healthTopics.map((h) => `/brain-health/${h.slug}`),
];
