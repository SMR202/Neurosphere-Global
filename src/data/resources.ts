import type { ResearchDomain } from "./types";

// Resource names and grouping are client-approved. URLs point to their primary sources.
// Guidance topics are not presented as completed articles or clinical recommendations.
export const domains: ResearchDomain[] = [
  {
    slug: "neurophysiology-eeg",
    title: "Neurophysiology & EEG",
    shortTitle: "Neurophysiology & EEG",
    description:
      "Recommended reading, analysis tools, and guidance notes for EEG acquisition, artifact handling, and signal interpretation.",
    resources: [
      { title: "EEGLAB", url: "https://eeglab.org/", type: "Tool" },
      {
        title: "FieldTrip",
        url: "https://www.fieldtriptoolbox.org/",
        type: "Tool",
      },
      { title: "MNE-Python", url: "https://mne.tools/stable/", type: "Tool" },
    ],
    guidance: [
      "10-20 electrode placement systems",
      "common artifact types and rejection strategies",
      "quantitative EEG basics",
    ],
  },
  {
    slug: "neuroimaging",
    title: "Neuroimaging",
    shortTitle: "Neuroimaging",
    description:
      "References and tool links for structural and functional MRI, fMRI, and DTI methodology and processing.",
    resources: [
      { title: "SPM", url: "https://www.fil.ion.ucl.ac.uk/spm/", type: "Tool" },
      { title: "FSL", url: "https://fsl.fmrib.ox.ac.uk/", type: "Tool" },
      { title: "FreeSurfer", url: "https://www.freesurfer.net/", type: "Tool" },
      { title: "AFNI", url: "https://afni.nimh.nih.gov/", type: "Tool" },
      { title: "MRtrix3", url: "https://www.mrtrix.org/", type: "Tool" },
    ],
    guidance: [
      "structural vs. functional sequence selection",
      "BOLD signal basics",
      "DTI/tractography fundamentals",
    ],
  },
  {
    slug: "neurogenetics",
    title: "Neurogenetics",
    shortTitle: "Neurogenetics",
    description:
      "Resources for variant interpretation, genetic counseling, and rare-disease knowledge bases relevant to neurogenetic conditions.",
    resources: [
      {
        title: "ClinVar",
        url: "https://www.ncbi.nlm.nih.gov/clinvar/",
        type: "Database",
      },
      { title: "OMIM", url: "https://www.omim.org/", type: "Database" },
      {
        title: "gnomAD",
        url: "https://gnomad.broadinstitute.org/",
        type: "Database",
      },
      {
        title: "Human Phenotype Ontology (HPO)",
        url: "https://hpo.jax.org/",
        type: "Database",
      },
    ],
    guidance: [
      "variant classification frameworks",
      "referral pathways for genetic counseling",
    ],
  },
  {
    slug: "neuromodulation",
    title: "Neuromodulation (TMS/tDCS)",
    shortTitle: "Neuromodulation",
    description:
      "Protocol references and safety guidelines for non-invasive brain stimulation research.",
    resources: [
      {
        title: "ClinicalTrials.gov",
        url: "https://clinicaltrials.gov/",
        type: "Trial registry",
      },
    ],
    guidance: [
      "published TMS safety consensus guidelines",
      "tDCS dosing and safety considerations",
    ],
  },
  {
    slug: "brain-informatics-ai",
    title: "Brain Informatics & AI",
    shortTitle: "Brain Informatics & AI",
    description:
      "Statistical and machine-learning resources relevant to neuroscience data analysis.",
    resources: [
      { title: "Python", url: "https://www.python.org/", type: "Tool" },
      {
        title: "scikit-learn",
        url: "https://scikit-learn.org/stable/",
        type: "Tool",
        parent: "Python",
      },
      {
        title: "PyTorch",
        url: "https://pytorch.org/",
        type: "Tool",
        parent: "Python",
      },
      {
        title: "TensorFlow",
        url: "https://www.tensorflow.org/",
        type: "Tool",
        parent: "Python",
      },
      { title: "R", url: "https://www.r-project.org/", type: "Tool" },
    ],
    guidance: [
      "applying machine learning to neurophysiological and imaging data responsibly",
    ],
  },
  {
    slug: "general-research",
    title: "General Research Guidance",
    shortTitle: "General Research Guidance",
    description:
      "Study design checklists, systematic review methodology (PRISMA), manuscript preparation notes, and a short FAQ for early-career researchers.",
    resources: [
      {
        title: "PRISMA guidelines for systematic reviews",
        url: "https://www.prisma-statement.org/",
        type: "Framework",
      },
      {
        title: "Cochrane Handbook",
        url: "https://www.cochrane.org/authors/handbooks-and-manuals/handbook/current",
        type: "Framework",
      },
      {
        title: "ICMJE authorship and manuscript recommendations",
        url: "https://www.icmje.org/recommendations/",
        type: "Framework",
      },
    ],
    guidance: [
      "choosing a study design",
      "preparing a manuscript for submission",
      "responding to reviewer comments",
    ],
  },
];
export const coreDomains = domains.slice(0, 5);
