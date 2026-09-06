# NeuroSphere Global — Phase 1 Master Build Brief

> **Purpose of this file**
>
> This is the source-of-truth brief for designing and building the Phase 1 NeuroSphere Global website.  
> Read this entire document before planning or coding.
>
> The final website must include **all client-approved content and requirements in this document**.  
> You may improve information architecture, hierarchy, presentation, interaction design, responsiveness, accessibility, and visual storytelling, but **do not remove, materially rewrite, or invent scientific claims, credentials, publications, datasets, affiliations, or project facts without explicit approval**.

---

# 1. Your Role

Act as a combined:

- senior product designer
- senior UX/HCI designer
- senior frontend engineer
- information architect
- accessibility-minded interaction designer
- performance-conscious React/Next.js engineer
- scientific/research website designer

The goal is **not** to make a generic template website.

The goal is to create a website that feels like it belongs to a credible, modern, internationally relevant neuroscience research group — polished enough that the client can confidently share it with researchers, clinicians, collaborators, students, universities, and institutions.

The experience should feel:

- premium
- scientific
- modern
- calm
- highly credible
- human
- research-led
- easy to scan
- responsive
- fast
- accessible
- distinctive without becoming flashy or gimmicky

Aim for the level of design discipline seen in high-quality technology and research organizations: strong typography, intentional spacing, clear information hierarchy, excellent responsive behavior, restrained motion, and polished micro-interactions.

Do **not** simply clone any reference website.

---

# 2. Autonomy / Decision-Making Rule

You are expected to think for yourself.

Do not ask for approval for every small design decision.

Make strong senior-level decisions about:

- page structure
- section order
- typography
- layout
- visual rhythm
- component system
- spacing
- responsive behavior
- interaction patterns
- animation
- filtering/search where justified
- content presentation
- card/list/table choice
- navigation behavior
- project/resource presentation
- mobile experience
- empty/loading/success states
- accessibility details

However:

## You must NOT autonomously invent

- new research claims
- new publications
- new team members
- academic credentials
- affiliations
- research results
- statistics
- datasets
- awards
- testimonials
- partner institutions
- contact details
- scientific recommendations presented as fact

Use placeholders or clearly marked `TBD` fields where information has not yet been provided.

---

# 3. First Step Before Coding

Before implementation:

1. Read this complete brief.
2. Review the reference websites listed later in this file.
3. Study current high-quality product/research UI patterns.
4. Establish the site information architecture.
5. Create a concise design strategy and design system.
6. Produce visual concepts for the major page types/sections before committing to implementation.
7. Choose the strongest coherent direction.
8. Then implement it faithfully.
9. Test the actual rendered website at desktop, tablet, and mobile sizes.
10. Iterate on weak visual details instead of stopping at “functional.”

The design process should be intentional, not “code first and decorate later.”

---

# 4. Core Product Understanding

NeuroSphere Global is **not primarily a virtual lab in Phase 1**.

Phase 1 is a professional digital home for a neuroscience research group.

Its primary jobs are to:

1. Explain who NeuroSphere Global is.
2. Establish credibility.
3. Present the team's research domains.
4. Showcase published, ongoing, submitted, and drafting-stage projects.
5. Give researchers, clinicians, and students useful neuroscience research guidance and resources.
6. Present neuroscience datasets and links.
7. Present team members and expertise.
8. Make it easy to contact the group for guidance, research enquiries, and collaboration.

The website should leave room for future expansion into virtual labs, simulations, user accounts, and interactive research tools, but those features are **not Phase 1 requirements**.

---

# 5. Primary Audiences

Design for several audiences without making the site confusing.

## Researchers
Need:
- projects
- methods/resources
- datasets
- publications
- collaboration pathway

## Clinicians
Need:
- relevant research areas
- evidence/resources
- team expertise
- contact/collaboration route

## Students / Early-Career Researchers
Need:
- approachable research guidance
- useful tools and frameworks
- datasets
- ability to ask for guidance

## Potential Collaborators / Institutions
Need:
- immediate credibility
- team background
- areas of expertise
- active projects
- clear contact route

The site must work for someone discovering NeuroSphere Global for the first time.

---

# 6. Design Philosophy

## Desired overall direction

Think:

**scientific editorial website × premium modern product website**

Not:

**generic university department page**

Not:

**AI startup with purple gradients everywhere**

Not:

**dashboard full of cards**

Not:

**medical stock-photo template**

The visual identity should communicate intelligence and scientific seriousness while still feeling current and inviting.

### Strong design characteristics

- high-quality typography
- large but disciplined headings
- clear content hierarchy
- meaningful whitespace
- excellent alignment and grids
- strong editorial layouts
- selective use of scientific visual motifs
- subtle depth where useful
- purposeful transitions
- restrained, tasteful motion
- excellent hover/focus states
- clear navigation
- beautiful data/resource presentation
- obvious but non-aggressive calls to action
- clean mobile layouts
- meaningful visual separation between research domains

### Avoid

- excessive rounded cards
- bento-grid-for-everything
- fake glassmorphism
- neon “AI brain” imagery
- random glowing neurons
- excessive gradients
- animation for animation’s sake
- tiny low-contrast text
- decorative pills everywhere
- dozens of icons with no purpose
- generic startup copy
- unverified scientific claims
- overwhelming the user with every piece of content at once

---

# 7. HCI / UX Principles

Apply strong human-computer interaction principles throughout.

## Information hierarchy
Users must understand:
1. what NeuroSphere Global is
2. what it works on
3. what they can explore
4. why the group is credible
5. how to contact it

within the first part of the browsing experience.

## Recognition over recall
Use recognizable navigation labels:
- Research
- Resources
- Datasets
- Projects / Activities
- Team
- Contact

Do not use clever but ambiguous navigation labels.

## Progressive disclosure
Do not put every resource or every project detail on the home page.

Use the home page to create clear entry points into deeper information.

## Hick-Hyman Law
Keep top-level navigation focused and avoid excessive competing options.

## Fitts’s Law
Primary actions should have comfortable touch/click targets and clear spacing.

## Consistency
Buttons, filters, cards, tags, links, and metadata must behave consistently across the site.

## Feedback
Forms and interactions must visibly communicate:
- hover
- focus
- loading
- success
- validation error
- disabled state

## Accessibility
Target WCAG 2.2 AA where practical.

At minimum:
- semantic HTML
- keyboard navigation
- visible focus states
- sufficient contrast
- properly associated labels
- alt text strategy
- reduced-motion support
- logical heading structure
- touch-friendly controls
- no essential information conveyed only through color

---

# 8. Visual Inspiration / Research Direction

Use these for inspiration, **not copying**.

## Client-provided references

### PraxiLabs
https://praxilabs.com/en/virtual-biology-lab

Useful inspiration:
- science-focused presentation
- approachable educational content
- strong visual explanation

Do not treat virtual lab functionality as a Phase 1 requirement.

### HHMI BioInteractive — Neurophysiology Virtual Lab
https://www.biointeractive.org/classroom-resources/neurophysiology-virtual-lab

The client specifically indicated this reference was closer to their thinking.

Useful inspiration:
- scientific credibility
- structured educational content
- resource metadata
- clear topic presentation
- accessible resource discovery

### Labster
https://www.labster.com/simulation-courses/molecular-biology

Useful inspiration:
- content catalog organization
- discoverability
- visual hierarchy for scientific resources

Again, simulation functionality is not required in Phase 1.

### NeuralVista Neuroscience Lab
https://www.cibnp.com/neuralvista-neuroscience-lab/

Useful inspiration:
- neuroscience-specific identity
- research/platform framing
- scientific focus

### The Virtual Brain
https://www.thevirtualbrain.org/tvb/zwei/

Useful inspiration:
- serious research/technical identity
- neuroscience community positioning

Do not reproduce its scientific simulation functionality in Phase 1.

---

# 9. Additional Modern UI Inspiration

Study high-end contemporary web/product design patterns from organizations such as:

- Linear — calm interfaces, consistency, focus, strong visual hierarchy
- Vercel — typography, layout rhythm, intentional responsive presentation
- Stripe — polished visual storytelling, strong hierarchy, transitions between dense and spacious sections
- high-quality scientific journals, research institutions, and modern biotech/neuroscience organizations

Borrow **principles**, not their branding.

The finished result must still feel uniquely NeuroSphere Global.

---

# 10. Proposed Information Architecture

Use this as the default architecture unless a clearly better UX structure is identified while preserving every required area.

## Top navigation

- Home
- Research & Resources
- Datasets
- Projects / Activities
- Team
- Contact

Potentially:
- a prominent “Research Enquiry” CTA

Keep navigation clean.

On mobile, implement a polished accessible menu.

---

# 11. HOME PAGE

The home page should establish identity, credibility, research focus, and clear pathways to deeper content.

It should not dump the entire website onto one page.

## Required client content

### Mission Statement

> NeuroSphere Global brings together neuroscience research, practical resources, and open collaboration — for researchers, clinicians, and students working across EEG, neuroimaging, neurogenetics, and neuromodulation.

### Introduction

> NeuroSphere Global is a research group dedicated to advancing neuroscience through active research, practical guidance, and open collaboration, the team works across five core domains — neurophysiology/EEG, neuroimaging, neurogenetics, neuromodulation, and brain informatics/AI — to support researchers, clinicians, and students at every stage of their work.
>
> This website serves as a central home for that work: a place to explore the team's ongoing projects, access curated research resources and datasets, learn about the people behind the research, and reach out directly for guidance or collaboration.

## Explore the Site

### Research Guidance & Resources
> Curated references, tools, and methodology guidance across the team's core research areas.

### Datasets
> Neuroscience datasets from the team's own research and trusted external sources, with access details.

### Activities / Projects
> Current and past research projects, studies, and collaborations from the NeuroSphere Global team.

### Team
> Meet the people behind NeuroSphere Global — their roles, expertise, and background.

### Contact / Research Enquiry
> Reach out for research guidance, collaboration, or general enquiries.

---

# 12. HOME PAGE UX DIRECTION

Do not blindly use a five-card feature grid.

Explore stronger layouts.

A possible structure:

1. Hero
2. Core research domains
3. Selected / featured research projects
4. Research resources preview
5. Dataset preview
6. Team / credibility section
7. Research enquiry CTA
8. Footer

The exact composition should be determined through design exploration.

## Hero

The hero should immediately answer:

- Who are we?
- What do we do?
- Who is this for?
- Where can the visitor go next?

Potential CTAs:
- Explore Research
- Browse Resources
- Research Enquiry

Do not invent a slogan if the supplied mission statement already works better.

---

# 13. RESEARCH GUIDANCE & RESOURCES PAGE

## Client-approved overview

> This section brings together research information, references, tools, and guidance curated by the NeuroSphere Global team — organized around the group's core research domains, so researchers, clinicians, and students can quickly find material relevant to their own work.

This page is a major content experience.

It should be highly scannable.

Consider:
- domain navigation
- sticky local navigation on desktop
- search
- lightweight filtering
- anchor navigation
- expandable details only where it improves usability
- external-link treatment
- metadata labels

Do not create complex features merely to appear sophisticated.

---

# 14. Research Domain — Neurophysiology & EEG

> Recommended reading, analysis tools, and guidance notes for EEG acquisition, artifact handling, and signal interpretation.

## Tools
- EEGLAB
- FieldTrip
- MNE-Python

## Guidance
- 10-20 electrode placement systems
- common artifact types and rejection strategies
- quantitative EEG basics

---

# 15. Research Domain — Neuroimaging

> References and tool links for structural and functional MRI, fMRI, and DTI methodology and processing.

## Tools
- SPM
- FSL
- FreeSurfer
- AFNI
- MRtrix3

## Guidance
- structural vs. functional sequence selection
- BOLD signal basics
- DTI/tractography fundamentals

---

# 16. Research Domain — Neurogenetics

> Resources for variant interpretation, genetic counseling, and rare-disease knowledge bases relevant to neurogenetic conditions.

## Databases
- ClinVar
- OMIM
- gnomAD
- Human Phenotype Ontology (HPO)

## Guidance
- variant classification frameworks
- referral pathways for genetic counseling

---

# 17. Research Domain — Neuromodulation (TMS/tDCS)

> Protocol references and safety guidelines for non-invasive brain stimulation research.

## Guidance
- published TMS safety consensus guidelines
- tDCS dosing and safety considerations

## Trial registries
- ClinicalTrials.gov

---

# 18. Research Domain — Brain Informatics & AI

> Statistical and machine-learning resources relevant to neuroscience data analysis.

## Tools
- Python
  - scikit-learn
  - PyTorch
  - TensorFlow
- R

## Guidance
- applying machine learning to neurophysiological and imaging data responsibly

---

# 19. General Research Guidance

> Study design checklists, systematic review methodology (PRISMA), manuscript preparation notes, and a short FAQ for early-career researchers.

## Frameworks
- PRISMA guidelines for systematic reviews
- Cochrane Handbook
- ICMJE authorship and manuscript recommendations

## FAQ topics
- choosing a study design
- preparing a manuscript for submission
- responding to reviewer comments

---

# 20. Resource UX Requirements

Resources should not appear as a wall of text.

Each resource type should have a consistent visual treatment.

Useful metadata may include, where known:
- title
- category/domain
- resource type
- short description
- source
- external link
- optional “official resource” indicator where factual
- optional tags

Do not fabricate metadata that has not been provided.

External links must be visually distinguishable and accessible.

---

# 21. DATASETS PAGE

## Client-approved requirement

> A page for displaying useful neuroscience datasets with a short description and access/source link.

The actual dataset list has **not yet been provided**.

Therefore:

- create a beautiful, production-ready dataset listing architecture
- use clearly marked development/example data only during implementation if necessary
- separate seed/mock data from client content
- make replacing mock entries easy
- do not ship fabricated datasets as real NeuroSphere Global recommendations

Potential dataset fields:

- Dataset name
- Research domain
- Modality/type
- Short description
- Source
- Access link
- Optional access requirements if later supplied

Potential UX:
- search
- domain filter
- modality filter

Only add filters if they improve the real expected dataset count.

---

# 22. ACTIVITIES / PROJECTS PAGE

This section should communicate research momentum and credibility.

It must clearly distinguish between:
- published work
- submitted work
- drafting / manuscript work
- ongoing projects

Do not blur statuses.

Use strong status presentation without making the page look like a project-management dashboard.

---

# 23. Published Projects

Include all of the following.

### Effects of anodal transcranial direct current stimulation on postural stability in subacute stroke: A randomized control trial
DOI:
https://doi.org/10.14814/phy2.70067

### Effects of transcranial direct current stimulation combined with motor relearning program on strength and balance in stroke patients
DOI:
https://doi.org/10.7717/peerj.18925

### Green Light and Transcranial Direct Current Stimulation in Migraine Patients: A Randomized Control Trial
DOI:
https://doi.org/10.3390/brainsci15111209

### Repetitive Transcranial Magnetic Stimulation for Pediatric Epilepsy: Current Evidence
DOI / reference provided:
10.57197/JDR-2025-0707

### Diverse Physical Exercise Interventions and their Impact on Individuals with Multiple Sclerosis: A Literature Review
DOI / reference provided:
10.57197/JDR-2026-0714

### Effects of vagal nerve stimulation on pain frequency and intensity in chronic migraine; a randomized controlled trial
DOI:
https://doi.org/10.14814/phy2.70843

---

# 24. Completed / Submitted / Drafting Projects

Include all of the following with the status exactly represented.

### Neurocognitive basis of lifestyle behaviors that impact cardiovascular risk
Status: Submitted

### Novel Neuroplasticity-Driven Rehabilitation Strategies for Stroke in Low-Resource Settings: Bridging Innovation and Implementation
Status: Submitted

### Effects Of Transcranial Direct Current Stimulation On Spasticity In Stroke Patients
Status: Submitted

### Effects of Transcranial Direct Current Stimulation on Post Stroke Depression: A randomized clinical trial
Status: Drafting

### Combined effects of focal muscle vibration and tDCS on motor recovery in stroke
Status: Drafting

### Combined Effects of Green Light and Transcranial Direct Current Stimulation on Migraine Intensity and Frequency in Migraine Patients
Status: Drafting

### Assess tDCS for cardiovascular and locomotor outcomes in the community dwellers
Status: Drafting

---

# 25. Activities / Projects Section Description

> This section showcases the team's current and previous research activities, projects, workshops, and related work — reflecting the group's ongoing contribution to neuroscience research across clinical, translational, and epidemiological domains.

---

# 26. Highlighted / Ongoing Research Projects

## A Connectome-Based Framework for Personalized rTMS Targeting in Post-Stroke Depression

> Developing a connectome-informed approach to individualize repetitive TMS targeting for patients with post-stroke depression.

Status:
**Manuscript in progress**

## ExCITE — Exercise-Cognition Integrated Training for Enhancement

> A feasibility study examining exercise-based cognitive training, part of a broader research program tracking aging-brain trajectories toward Alzheimer's disease in the Saudi population.

Status:
**Ongoing**

---

# 27. Projects Page UX Direction

The user should be able to understand a project's status at a glance.

Potential organization:
- Featured / ongoing research
- Published research
- Submitted
- Drafting
- Activities / workshops as content becomes available

Consider:
- clean status tags
- year where later supplied
- DOI external-link actions
- concise project summaries
- optional detail pages only if enough content exists

Avoid:
- dense spreadsheet look
- excessive card nesting
- fake citation counts
- fake metrics
- made-up publication dates

---

# 28. TEAM PAGE

## Client-approved requirement

> Profiles of the NeuroSphere Global team members, including their roles, expertise, and brief information.

Team presentation should feel highly credible and human.

Use real portraits once supplied.

Do not use fake AI headshots as final production content.

---

# 29. Dr. Shahid Bashir

### Dr. Shahid Bashir, PhD
**Lead, NeuroSphere Global**

> 20+ years of international neuroscience research experience across Switzerland, the United States, Singapore, South Korea, and Saudi Arabia. PhD in Neurophysiology (University of Fribourg, under Prof. Eric M. Rouiller); postdoctoral training at Harvard Medical School (under Prof. Alvaro Pascual-Leone); Research Lead at King Fahad Specialist Hospital – Dammam; academic affiliation at King Saud University. 210+ peer-reviewed publications; serves on two ILAE Diagnostic Methods Commission task forces and the ILAE EEG Platform Initiative for the Eastern Mediterranean Region. Research spans non-invasive brain stimulation (TMS, tDCS, tACS), cortical neurophysiology, rare genetic epilepsies, neurodevelopmental disorders, neurodegeneration, stroke rehabilitation, and global burden of disease (GBD) epidemiological modeling.

Do not modify credentials or numbers unless the client supplies corrections.

---

# 30. Dr. Mirza Obaid Baig

### Dr. Mirza Obaid Baig
Role: **TBD**

Expertise summary:
**TBD — client to provide 1–2 sentences**

Background / bio:
**TBD — client to provide 2–3 sentences**

Do not invent this information.

The team data model should allow additional team members to be added easily.

---

# 31. CONTACT / RESEARCH ENQUIRY

## Client-approved requirement

> A form where visitors can contact the team regarding research guidance, collaboration, general research enquiries, or other questions.

This should feel like an important site function, not an afterthought.

Potential form structure:

- Name
- Email
- Institution / Organization (optional unless client later requires it)
- Enquiry type
- Research area (optional)
- Message
- Consent / privacy note if required

Possible enquiry types:
- Research guidance
- Collaboration
- General enquiry
- Dataset/resource enquiry
- Other

Do not implement fields that create unnecessary friction.

Use good validation, accessible labels, clear error messages, loading feedback, and a proper success state.

The destination email/backend is **TBD** until provided by the client.

---

# 32. PHASE 1 DELIVERABLE

The website must include:

- Home page
- Research resources
- Dataset listings
- Activities/projects
- Team profiles
- Contact/research enquiry form

The site must be:
- responsive
- professional
- production-quality
- accessible
- performant
- easy to maintain
- easy to extend

---

# 33. FUTURE SCOPE — NOT PHASE 1

The architecture should not prevent future expansion, but do not build these now unless explicitly requested:

- virtual labs
- neuroscience simulations
- user accounts
- interactive research tools
- advanced dataset hosting
- large-scale computational neuroscience tools
- learning management features
- institutional dashboards

Future-ready architecture is good.

Prematurely building future products is not.

---

# 34. Recommended Technical Direction

Unless an existing repository imposes other constraints:

## Frontend
- latest stable Next.js
- TypeScript
- App Router
- modern CSS / Tailwind CSS
- reusable component architecture
- server components by default where appropriate
- client components only where interaction requires them

## UI components
Use a disciplined component system.

shadcn/ui or equivalent may be used selectively where it improves accessibility and speed, but:
- do not let the site look like default shadcn
- customize components to the site’s design language
- avoid turning every section into a generic Card component

## Icons
Use one coherent high-quality icon family when icons are needed.

Do not decorate every heading with an icon.

## Content architecture
For Phase 1, favor structured content files/data models that are easy to update.

Examples:
- `data/projects.ts`
- `data/resources.ts`
- `data/team.ts`
- `data/datasets.ts`

or an equivalent clean content layer.

Do not introduce a complicated CMS unless there is a real requirement.

The structure should allow migration to a CMS later.

---

# 35. Contact Form Technical Direction

Implement the UI and validation cleanly.

Backend delivery can use an appropriate production service or server endpoint after the final recipient is provided.

Do not hardcode personal email addresses into client-side code.

Include:
- server-side validation
- spam mitigation appropriate to scope
- rate limiting where necessary
- friendly error state
- success confirmation
- accessible form semantics

---

# 36. SEO / Metadata

Implement good fundamentals:

- meaningful page titles
- meta descriptions
- Open Graph metadata
- clean URLs
- semantic page headings
- sitemap
- robots settings
- structured data only where valid and useful
- canonical URLs when production domain is known

Do not invent organization details to fill structured data fields.

---

# 37. Performance Requirements

The site should feel instant and polished.

Priorities:

- avoid unnecessary client-side JavaScript
- optimize images
- use modern image loading
- lazy-load noncritical media
- avoid layout shift
- avoid giant animation libraries unless justified
- defer noncritical scripts
- keep initial bundle reasonable
- use server rendering/static generation where appropriate
- avoid sequential data-fetch waterfalls
- load independent data in parallel
- dynamically import genuinely heavy optional components
- preserve smooth scrolling without hijacking native behavior

Target excellent Lighthouse/Core Web Vitals rather than merely “passing.”

---

# 38. Motion / Micro-Interaction Direction

Motion should make the experience feel crafted.

Good uses:
- subtle page/section reveals
- nav state transitions
- hover elevation or underline movement
- filter transitions
- form state transitions
- project/resource list transitions
- gentle image movement if appropriate
- restrained background motion in one or two signature areas

Bad uses:
- constant floating elements
- aggressive parallax
- scrolling that fights the user
- huge animation delays
- animations that block reading
- animations on every card

Respect `prefers-reduced-motion`.

---

# 39. Responsive Design

Do not treat mobile as a collapsed desktop afterthought.

Design intentionally for:
- large desktop
- laptop
- tablet
- mobile

Check:
- nav
- hero line lengths
- research resource navigation
- project metadata
- cards/lists
- forms
- team bios
- DOI links
- long research titles

Long academic publication titles must wrap gracefully.

No horizontal scrolling.

---

# 40. Content Presentation Rules

Scientific content should be readable, not intimidating.

Use:
- short introductory summaries
- strong subheadings
- readable line lengths
- domain grouping
- metadata
- links
- deliberate spacing

Do not:
- hide important information behind excessive animation
- shrink type to make content fit
- place long paragraphs in tiny cards
- create endless nested accordions

---

# 41. Search / Filters

Search/filtering is optional, not mandatory.

Add it only where it improves actual use.

Good candidates:
- research resources
- datasets
- projects

For a small initial dataset, simple category/domain filters may be enough.

Do not build Elasticsearch-level infrastructure for Phase 1.

---

# 42. Data / Content Model

Create reusable typed models.

Example conceptual structures:

```ts
type ResearchDomain = {
  slug: string
  title: string
  description: string
  tools?: ResourceLink[]
  databases?: ResourceLink[]
  guidance?: ResourceLink[]
}

type Project = {
  slug: string
  title: string
  status: "published" | "submitted" | "drafting" | "ongoing" | "manuscript-in-progress"
  summary?: string
  doi?: string
  externalUrl?: string
}

type TeamMember = {
  slug: string
  name: string
  credentials?: string
  role?: string
  expertise?: string[]
  bio?: string
  image?: string
  links?: {
    label: string
    url: string
  }[]
}

type Dataset = {
  slug: string
  name: string
  description: string
  domain?: string
  modality?: string
  source?: string
  accessUrl?: string
}
```

Use appropriate equivalents in the actual project.

---

# 43. Visual Asset Strategy

Prefer authenticity.

Best final assets:
- real team photography
- real research/lab photography
- publication/research figures where rights permit
- scientifically meaningful abstract imagery
- high-quality custom visual motifs

Until real assets are provided:
- use tasteful temporary visual concepts
- mark development placeholders clearly
- keep replacement simple

Avoid generic doctor-with-tablet stock imagery.

Avoid anatomically dubious AI-generated brain imagery being presented as scientific content.

Decorative imagery is fine if clearly decorative.

---

# 44. Potential Brand / Visual Motifs

Explore, do not blindly implement:

- neural connection / connectome geometry
- electrophysiology waveform motifs
- subtle network topology
- imaging slices as abstract framing
- clean scientific grid systems
- restrained data visualization patterns
- thin rule lines / editorial separators
- subtle dot matrices or coordinate systems

These should function as a coherent visual language, not decoration pasted everywhere.

---

# 45. Typography

Typography is one of the most important parts of this website.

Build a clear type system:
- display / hero
- H1
- H2
- H3
- body large
- body
- metadata
- labels
- buttons
- captions

Use high-quality web fonts with excellent readability.

Avoid fonts that feel:
- gaming-oriented
- sci-fi cliché
- excessively futuristic
- playful in a way that undermines research credibility

The site should feel contemporary and intelligent.

---

# 46. Color Direction

Do not default to “neuroscience = neon purple/blue.”

Explore a restrained palette.

A good direction may involve:
- a neutral/near-white or deep neutral foundation
- one distinctive scientific accent
- optional secondary accent for domain differentiation
- excellent text contrast
- subdued surface colors

Dark sections may be used strategically if they improve rhythm.

Do not make the entire website dark simply because it looks “tech.”

---

# 47. Navigation UX

Desktop:
- clean header
- clear current-page state
- one primary CTA if useful
- sticky behavior only if elegant

Mobile:
- accessible menu
- no tiny tap targets
- clear close/back behavior
- preserve research enquiry CTA

Consider whether a mega-menu is actually necessary. It probably is not for Phase 1.

---

# 48. Footer

Include useful navigation and contact pathways.

Potential structure:
- NeuroSphere Global identity
- Research & Resources
- Projects
- Datasets
- Team
- Contact
- future social/profile links only when provided
- copyright / legal placeholders where needed

Do not invent social links.

---

# 49. Empty / Missing Content Handling

Some client content is still incomplete.

Known missing items include:
- actual dataset entries
- Dr. Mirza Obaid Baig role
- Dr. Mirza Obaid Baig expertise summary
- Dr. Mirza Obaid Baig bio
- potentially additional team members
- final contact recipient/backend
- possibly team/project imagery

Build the site so this missing content can be inserted later without redesigning the site.

Do not make up content to make the UI look complete.

---

# 50. Quality Bar

Do not stop when:
- the app compiles
- all links technically work
- the layout is “fine”
- the first design looks acceptable

The final visual result should withstand a serious design review.

Inspect:
- first viewport
- typography
- whitespace
- alignment
- vertical rhythm
- grid consistency
- imagery
- buttons
- nav
- cards/list anatomy
- link treatments
- hover states
- mobile composition
- form states
- project status clarity
- long-title wrapping
- accessibility
- performance

Fix anything that looks prototype-like.

---

# 51. Browser QA

Before considering the project complete:

## Functional checks
- all navigation works
- all internal links work
- DOI/external links work
- filters/search work if implemented
- contact form validation works
- success/error states work
- mobile menu works

## Visual checks
Test at several widths such as:
- ~1440px
- ~1280px
- ~1024px
- ~768px
- ~430px
- ~375px

Look for:
- overflow
- awkward line breaks
- orphan headings
- oversized hero
- tiny controls
- inconsistent spacing
- broken cards
- bad nav wrapping

## Accessibility checks
- keyboard only
- visible focus
- labels
- contrast
- reduced motion
- semantic landmarks

---

# 52. Design Review Loop

Use an iterative process:

1. render
2. inspect
3. identify weak visual areas
4. improve
5. repeat

For major pages, compare the rendered result to the intended design concept.

Do not accept large visual drift between concept and implementation.

---

# 53. Suggested Build Order

1. Project setup
2. Content/data models
3. Global design tokens
4. Header/navigation
5. Home page
6. Research Guidance & Resources
7. Projects / Activities
8. Datasets
9. Team
10. Contact / Research Enquiry
11. Footer
12. Motion polish
13. Responsive pass
14. Accessibility pass
15. Performance pass
16. Browser QA
17. Final content completeness audit

---

# 54. Content Completeness Audit

Before handoff, verify that every item below appears somewhere appropriate in the site:

## Home
- mission statement
- introduction
- Research Guidance & Resources entry point
- Datasets entry point
- Activities / Projects entry point
- Team entry point
- Contact / Research Enquiry entry point

## Research domains
- Neurophysiology & EEG
- Neuroimaging
- Neurogenetics
- Neuromodulation (TMS/tDCS)
- Brain Informatics & AI
- General Research Guidance

## Neurophysiology tools
- EEGLAB
- FieldTrip
- MNE-Python

## Neurophysiology guidance
- 10-20 electrode placement systems
- artifact handling/rejection
- quantitative EEG basics

## Neuroimaging tools
- SPM
- FSL
- FreeSurfer
- AFNI
- MRtrix3

## Neuroimaging guidance
- structural vs functional sequence selection
- BOLD basics
- DTI/tractography fundamentals

## Neurogenetics
- ClinVar
- OMIM
- gnomAD
- HPO
- variant classification frameworks
- genetic counseling referral pathways

## Neuromodulation
- TMS safety consensus guidelines
- tDCS dosing/safety considerations
- ClinicalTrials.gov

## Brain Informatics & AI
- Python
- scikit-learn
- PyTorch
- TensorFlow
- R
- responsible ML guidance

## General research guidance
- PRISMA
- Cochrane Handbook
- ICMJE
- study design FAQ
- manuscript preparation FAQ
- reviewer response FAQ

## Projects
All published, submitted, drafting, ongoing, and manuscript-in-progress items listed in this brief.

## Team
- Dr. Shahid Bashir
- Dr. Mirza Obaid Baig placeholder

## Contact
- research enquiry form

Nothing from the client-approved scope should silently disappear during design.

---

# 55. Phase 1 Definition of Done

Phase 1 is complete when:

- the full approved content architecture is implemented
- the website feels premium and credible
- all required pages exist
- all supplied research content is present
- project statuses are clear
- resources are easy to navigate
- datasets architecture is ready for real entries
- team profiles are implemented
- missing client data is clearly handled
- the research enquiry form works
- the site is responsive
- accessibility fundamentals are strong
- performance is good
- no fake research content exists
- no major UI looks generic, unfinished, or template-like
- the codebase is maintainable
- the site is ready to show the client

---

# 56. Important Final Instruction

Be ambitious about **quality**, not **scope**.

Phase 1 should feel excellent because the design, UX, content hierarchy, interactions, and implementation are excellent — not because unnecessary features were added.

If you identify a genuinely better way to present the approved content, use your judgment and improve it.

If a change would alter the client's meaning, scientific claims, project status, or agreed scope, preserve the source content instead.

**Build a focused, world-class Phase 1 website.**


---

# 57. How to Use This Brief in Codex

Place this file in the root of the website repository.

Suggested filename:

`NEUROSPHERE_GLOBAL_PHASE1_MASTER_BUILD_BRIEF.md`

Then start Codex with the following instruction:

> Read `NEUROSPHERE_GLOBAL_PHASE1_MASTER_BUILD_BRIEF.md` completely and treat it as the source of truth for the project. Build the complete NeuroSphere Global Phase 1 website described there. Do not reduce the approved content or expand the product scope unnecessarily. I care heavily about exceptional UI, UX, HCI, responsiveness, accessibility, performance, and overall design quality. Act like a senior product designer and senior frontend engineer. Research the references, establish a strong visual direction, create coherent visual concepts before locking implementation, then build the site end-to-end. Make reasonable design decisions yourself instead of asking me about every detail. Do not invent scientific facts or missing client information. Use placeholders where the brief marks content as TBD. Run the site, inspect it in the browser across desktop and mobile, and keep iterating on any area that still looks generic, unfinished, or prototype-like. Do not stop merely because the build passes.

If Codex initially returns only a plan, tell it:

> Proceed with the plan and complete the implementation. Keep going through visual QA, responsive QA, accessibility, and browser testing. Fix design issues you find rather than just reporting them.

If the first visual direction is mediocre, do not spend time manually describing dozens of CSS changes. Instead say:

> The functionality is fine, but the visual quality is not at the level required by the brief. Re-evaluate the design as a senior product designer. Improve typography, hierarchy, spacing, section rhythm, visual identity, scientific credibility, micro-interactions, and responsive composition. Avoid generic card-grid/startup-template patterns. Then implement the stronger direction and verify it in the browser.

---

# 58. Repository Handoff Principle

Keep this brief in the repository throughout development.

When future client feedback arrives:

1. Update the relevant approved-content section in this file.
2. Mark obsolete requirements clearly instead of leaving contradictory instructions.
3. Ask Codex to re-read the updated brief.
4. Implement only the requested changes.
5. Re-run visual and functional QA.

This makes the brief the long-term project specification rather than a one-time prompt.
