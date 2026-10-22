import { domains } from "@/data/resources";
import type { ResearchDomain, ResourceLink } from "@/data/types";

/** Additions supplied in the linked Phase 1 Google Doc. Original records remain intact. */
export type LibraryDomain = ResearchDomain & {
  journals: string[];
  reading: ResourceLink[];
};
const additions: Record<
  string,
  {
    resources?: ResourceLink[];
    guidance?: string[];
    journals: string[];
    reading?: ResourceLink[];
  }
> = {
  "neurophysiology-eeg": {
    resources: [
      {
        title: "BrainVision Analyzer",
        url: "https://www.brainproducts.com/solutions/analyzer/",
        type: "Tool",
      },
    ],
    guidance: ["needle EMG vs. nerve conduction study fundamentals"],
    journals: ["Clinical Neurophysiology", "Journal of Neuroscience Methods"],
  },
  neuroimaging: {
    resources: [
      {
        title: "BIDS (Brain Imaging Data Structure)",
        url: "https://bids.neuroimaging.io/standards/index.html",
        type: "Framework",
      },
    ],
    guidance: ["MRI safety screening considerations"],
    journals: ["NeuroImage", "Human Brain Mapping"],
  },
  neurogenetics: {
    resources: [
      {
        title: "DECIPHER",
        url: "https://www.deciphergenomics.org/",
        type: "Database",
      },
    ],
    guidance: ["phenotype-genotype correlation basics"],
    journals: ["Genetics in Medicine", "European Journal of Human Genetics"],
  },
  neuromodulation: {
    resources: [
      {
        title: "ISRCTN registry",
        url: "https://www.isrctn.com/",
        type: "Trial registry",
      },
    ],
    guidance: ["coil positioning and motor threshold determination"],
    journals: ["Brain Stimulation", "Clinical Neurophysiology"],
  },
  "brain-informatics-ai": {
    resources: [
      { title: "OpenNeuro", url: "https://openneuro.org/", type: "Database" },
      { title: "PhysioNet", url: "https://physionet.org/", type: "Database" },
    ],
    guidance: ["avoiding overfitting in small clinical datasets"],
    journals: ["Journal of Neural Engineering", "NeuroImage"],
  },
  "general-research": {
    resources: [
      {
        title: "COPE (Committee on Publication Ethics)",
        url: "https://publicationethics.org/",
        type: "Framework",
      },
      { title: "Zotero", url: "https://www.zotero.org/", type: "Tool" },
      { title: "EndNote", url: "https://endnote.com/", type: "Tool" },
      { title: "Mendeley", url: "https://www.mendeley.com/", type: "Tool" },
    ],
    guidance: ["navigating authorship disputes"],
    journals: [],
    reading: [
      { title: "KACST", url: "https://www.kacst.gov.sa/", type: "Framework" },
      {
        title: "Vision 2030 health-innovation priorities",
        url: "https://www.vision2030.gov.sa/",
        type: "Framework",
      },
      {
        title: "NIH funding",
        url: "https://grants.nih.gov/",
        type: "Framework",
      },
      {
        title: "Wellcome funding",
        url: "https://wellcome.org/research-funding",
        type: "Framework",
      },
    ],
  },
};
export const libraryDomains: LibraryDomain[] = domains.map((domain) => {
  const extra = additions[domain.slug];
  return {
    ...domain,
    ...(domain.slug === "neurophysiology-eeg"
      ? {
          title: "Neurophysiology, EEG & EMG",
          description:
            "Recommended reading, analysis tools, and guidance notes for EEG/EMG acquisition, artifact handling, and signal interpretation.",
        }
      : {}),
    resources: [...domain.resources, ...(extra.resources ?? [])],
    guidance: [
      ...domain.guidance.map((topic) =>
        topic === "variant classification frameworks"
          ? "variant classification frameworks (ACMG/AMP guidelines)"
          : topic,
      ),
      ...(extra.guidance ?? []),
    ],
    journals: extra.journals,
    reading: extra.reading ?? [],
  };
});

/** Research areas from the Google Doc; these describe the team's work, not live clinical services. */
export const researchAreas = [
  {
    title: "Neuromodulation & Personalized Brain Stimulation",
    description:
      "Exploring how brain stimulation techniques like TMS can be tailored to an individual's own brain activity, moving toward more precise, patient-specific therapy.",
  },
  {
    title: "Rare Genetic Epilepsies & Neurogenetics",
    description:
      "Studying the genetic and cellular basis of rare epilepsy syndromes, working toward faster, clearer diagnostic pathways for affected families.",
  },
  {
    title: "Neurodevelopmental Disorders",
    description:
      "Investigating new therapeutic approaches for conditions like Rett syndrome and related developmental disorders, with a focus on improving quality of life.",
  },
  {
    title: "Neuroimaging & Treatment Safety",
    description:
      "Using brain imaging to better understand how therapies interact with the developing and adult brain, supporting safer, more informed care.",
  },
  {
    title: "Exercise, Cognition & Healthy Aging",
    description:
      "Examining the relationship between physical activity, cognitive health, and the trajectory from healthy aging to neurodegenerative disease.",
  },
  {
    title: "AI in Neurological Diagnosis",
    description:
      "Applying artificial intelligence and machine learning to improve the speed and accuracy of diagnosis in complex neurological conditions.",
  },
  {
    title: "Patient Experience & Health Systems",
    description:
      "Understanding the real-world experience of patients navigating a neurological diagnosis, to help close gaps in clinical communication and support.",
  },
  {
    title: "Regional Research Capacity Building",
    description:
      "Strengthening research infrastructure and collaboration across the region's hospitals and institutions.",
  },
];

/** External sources, not NeuroSphere-owned releases. Descriptions checked against provider documentation. */
export const externalDataSources = [
  {
    name: "OpenNeuro",
    kind: "Repository",
    focus: "Neuroimaging",
    description:
      "A free, open platform for sharing neuroimaging data. Search public datasets and follow the documentation for reuse and citation.",
    url: "https://openneuro.org/",
    access: "Public datasets; check each dataset's licence and citation.",
    source: "https://docs.openneuro.org/",
  },
  {
    name: "PhysioNet",
    kind: "Repository",
    focus: "Physiological and clinical data",
    description:
      "A platform for biomedical datasets, software and research resources. Access requirements vary between individual resources.",
    url: "https://physionet.org/",
    access:
      "Open and controlled-access resources; check the individual listing.",
    source: "https://physionet.org/about/",
  },
  {
    name: "EEG Motor Movement/Imagery Dataset",
    kind: "Dataset",
    focus: "EEG",
    description:
      "EEG recordings of motor movement and imagery tasks, hosted by PhysioNet. An external dataset for research and analysis practice.",
    url: "https://physionet.org/content/eegmmidb/1.0.0/",
    access:
      "Publicly available on PhysioNet; follow its licence and attribution requirements.",
    source: "https://physionet.org/content/eegmmidb/1.0.0/",
  },
];

export const restoredPages = {
  "/research/resources": {
    title: "Research Guidance & Resources | NeuroSphere",
    description:
      "Tools, methods, references and guidance across EEG, neuroimaging, neurogenetics, neuromodulation and brain informatics.",
  },
  "/projects": {
    title: "Projects & Publications | NeuroSphere",
    description:
      "Published work, ongoing studies, submitted projects and manuscripts from the NeuroSphere Global research team.",
  },
  "/datasets": {
    title: "Neuroscience Datasets | NeuroSphere",
    description:
      "Explore external neuroscience data sources, with provider links, access information and guidance for responsible reuse.",
  },
} as const;
