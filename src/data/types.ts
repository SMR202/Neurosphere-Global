export type ResourceLink = {
  title: string;
  url: string;
  type: "Tool" | "Database" | "Framework" | "Trial registry";
  parent?: string;
};
export type ResearchDomain = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  resources: ResourceLink[];
  guidance: string[];
};
export type ProjectStatus =
  | "Published"
  | "Submitted"
  | "Drafting"
  | "Ongoing"
  | "Manuscript in progress";
export type Project = {
  slug: string;
  title: string;
  status: ProjectStatus;
  summary?: string;
  doi?: string;
};
export type TeamMember = {
  slug: string;
  name: string;
  initials: string;
  role?: string;
  bio?: string;
  image?: string;
  expertise?: string;
};
export type Dataset = {
  slug: string;
  name: string;
  description: string;
  domain?: string;
  modality?: string;
  source?: string;
  accessUrl?: string;
  accessRequirements?: string;
};
