import type { Project } from "./types";
export const projects: Project[] = [
  {
    slug: "connectome-rtms",
    title:
      "A Connectome-Based Framework for Personalized rTMS Targeting in Post-Stroke Depression",
    status: "Manuscript in progress",
    summary:
      "Developing a connectome-informed approach to individualize repetitive TMS targeting for patients with post-stroke depression.",
  },
  {
    slug: "excite",
    title: "ExCITE — Exercise-Cognition Integrated Training for Enhancement",
    status: "Ongoing",
    summary:
      "A feasibility study examining exercise-based cognitive training, part of a broader research program tracking aging-brain trajectories toward Alzheimer's disease in the Saudi population.",
  },
  {
    slug: "postural-stability-stroke",
    title:
      "Effects of anodal transcranial direct current stimulation on postural stability in subacute stroke: A randomized control trial",
    status: "Published",
    doi: "10.14814/phy2.70067",
  },
  {
    slug: "motor-relearning-stroke",
    title:
      "Effects of transcranial direct current stimulation combined with motor relearning program on strength and balance in stroke patients",
    status: "Published",
    doi: "10.7717/peerj.18925",
  },
  {
    slug: "green-light-migraine",
    title:
      "Green Light and Transcranial Direct Current Stimulation in Migraine Patients: A Randomized Control Trial",
    status: "Published",
    doi: "10.3390/brainsci15111209",
  },
  {
    slug: "pediatric-epilepsy",
    title:
      "Repetitive Transcranial Magnetic Stimulation for Pediatric Epilepsy: Current Evidence",
    status: "Published",
    doi: "10.57197/JDR-2025-0707",
  },
  {
    slug: "exercise-multiple-sclerosis",
    title:
      "Diverse Physical Exercise Interventions and their Impact on Individuals with Multiple Sclerosis: A Literature Review",
    status: "Published",
    doi: "10.57197/JDR-2026-0714",
  },
  {
    slug: "vagal-migraine",
    title:
      "Effects of vagal nerve stimulation on pain frequency and intensity in chronic migraine; a randomized controlled trial",
    status: "Published",
    doi: "10.14814/phy2.70843",
  },
  {
    slug: "lifestyle-cardiovascular-risk",
    title:
      "Neurocognitive basis of lifestyle behaviors that impact cardiovascular risk",
    status: "Submitted",
  },
  {
    slug: "neuroplasticity-rehabilitation",
    title:
      "Novel Neuroplasticity-Driven Rehabilitation Strategies for Stroke in Low-Resource Settings: Bridging Innovation and Implementation",
    status: "Submitted",
  },
  {
    slug: "spasticity-stroke",
    title:
      "Effects Of Transcranial Direct Current Stimulation On Spasticity In Stroke Patients",
    status: "Submitted",
  },
  {
    slug: "post-stroke-depression",
    title:
      "Effects of Transcranial Direct Current Stimulation on Post Stroke Depression: A randomized clinical trial",
    status: "Drafting",
  },
  {
    slug: "vibration-motor-recovery",
    title:
      "Combined effects of focal muscle vibration and tDCS on motor recovery in stroke",
    status: "Drafting",
  },
  {
    slug: "green-light-migraine-intensity",
    title:
      "Combined Effects of Green Light and Transcranial Direct Current Stimulation on Migraine Intensity and Frequency in Migraine Patients",
    status: "Drafting",
  },
  {
    slug: "community-tdcs",
    title:
      "Assess tDCS for cardiovascular and locomotor outcomes in the community dwellers",
    status: "Drafting",
  },
];
export const featuredProjects = projects.filter((p) => p.summary);
