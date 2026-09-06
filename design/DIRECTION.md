# NeuroSphere Global — Field Notes

## Decision
Selected the first of three image-generated directions under the user's explicit design autonomy. Signal Atlas (white/orange Swiss sans) was clear but less distinctive; Open Observatory (slate/dark serif) gave decorative imagery too much emphasis. Field Notes balances scientific editorial reading with a recognizable abstract fiber motif. No imagery represents anatomy, research data, or a result.

## Research and IA
Inspected Labster's topic-led course catalogue and NeuralVista's neuroscience identity in the in-app browser. Inspected PraxiLabs and The Virtual Brain as well; some typography/assets loaded imperfectly. HHMI returned an access challenge/403. Mobbin was actively queried but requires a paid plan; no Mobbin visual results were available. No source branding or scientific content was imported.

Six routes: Home `/`, Research & Resources `/research`, Datasets `/datasets`, Projects `/projects`, Team `/team`, Contact `/contact`. The brand links home; Research Enquiry is the primary header action. All required content remains in its appropriate destination. Resources use domain navigation, search, and external source links; guidance topics are distinguished from available articles. Projects separate all five supplied statuses. Dataset filters appear only when real content justifies them. No accounts, simulations, CMS, or fabricated datasets.

## Concept inventory
`concepts/home.png`: first viewport and domain rail. `home-continuation.png`: introduction, forest project band, resource/dataset entries. `resources.png`: discovery interface. `projects.png`: publication and active-study hierarchy. `team.png`: text-led profiles, enquiry band and footer. `datasets.png`: honest empty state. `contact.png`: accessible form and delivery-unavailable state. `mobile.png`: intentional single-column home.

## Locked visual system
- Background: near-white #f6f6f2 (adjust only if measured asset background demands an edge blend).
- Ink and dark bands #123d36; muted text #52645d; olive #737744; pale olive #e9ecdd; borders #c8cec0.
- Cormorant Garamond regular for display/headings; Manrope 400–700 for reading and controls. Display 88–96px desktop, 48–54px mobile; page title 72–88px; section title 44–52px; body 17–19px, 1.65 line height. Long academic titles wrap naturally.
- Max container 1360px; desktop gutters 56–64px, tablet 32px, mobile 24px. Sections 80–104px apart. Controls at least 44px tall, primary buttons 52–56px. Radius 3–4px, no card stack or outer page frame.
- Lucide Atom mark, ArrowRight, ArrowUpRight/ExternalLink, Search, Menu, X, BookOpen, Database, Info, Check, Download. Thin consistent outlines; decorative icons aria-hidden.
- Dark band has no gradient. Hero art has no tint/overlay; only edge fade if needed to blend neutral background. No animated art. Short hover/focus changes respect reduced motion.

## Above-the-fold copy lock
NeuroSphere Global; Research & Resources; Datasets; Projects; Team; Research Enquiry; Neuroscience research, practical resources, and open collaboration.; For researchers, clinicians, and students working across EEG, neuroimaging, neurogenetics, and neuromodulation.; Explore Research; View Projects; Our research domains; the five domain names. Logo is the home link. No hero eyebrow.

## Intentional completeness/accessibility refinements
- Browser comparison exposed Instrument Serif as too condensed for the selected concept. Cormorant Garamond preserves the intended broader editorial proportions. The Atom library mark matches the concept’s orbital identity.
- Preserve the entire supplied mission and introduction in the homepage introduction; hero is a display excerpt of that mission, not a new claim.
- Preserve the full lead bio, including the research-spans sentence omitted from the concept for space. Additional vertical space is expected.
- Use labelled native selects for mobile domain navigation and enquiry fields; shadcn Dialog for focus-managed mobile navigation, shadcn Button for consistent controls.
- Publication list includes all six published entries, all three submitted entries, all four drafting entries, and two featured studies; concept depicts only first rows.
- Contact: since destination is TBD, clearly explain delivery is unavailable. Client validation prepares a downloadable local text draft; server endpoint validates and delivers only when a private HTTPS webhook and token are configured. Never report a draft as sent.
- Guidance topics preserve supplied wording. No invented scientific advice or unprovided article content; enquiry links provide a route to ask the team.
- Team portraits and dataset entries remain absent, with explicitly marked missing information.

## Implementation and QA
Next.js App Router, TypeScript, server pages by default, small client islands, local optimized fonts and artwork, per-page metadata and domain-conditional sitemap/canonical URLs. Validate content, server request bounds and failure/success paths. Inspect actual browser renders at 1440/1280/1024/768/430/375 widths and concept-native desktop dimensions. Compare saved concepts against captured implementation screenshots using view_image; document material differences and fixes.

## Final fidelity ledger — 6 September 2026

Accepted concept `concepts/home.png` is 1487×1058. Browser comparison used a 1488×1056 viewport, plus desktop 1440×1024 and mobile 430×932 / 375×1024. The browser may reserve 15px for its scrollbar. Full-page page concepts were compared with corresponding full-page renders. Evidence is outside the repository at `C:/Users/PC/.codex/visualizations/2026/09/06/01a07597-e9b4-7100-a639-dc992a1a564d/neurosphere-qa/`.

| Comparison | Result and refinement |
| --- | --- |
| Header and grid | Orbital mark, compact sans wordmark, quiet navigation and outlined enquiry action retained. Removed Tailwind's container max-width collision to restore the intended gutters and four-line desktop headline. Library Atom mark intentionally replaces the generated mark. |
| Hero typography | Broad editorial serif, four-line desktop composition and two clear actions retained. Cormorant replaced overly condensed Instrument Serif after screenshots exposed the mismatch. Tablet scale corrected to avoid six narrow lines. |
| Hero artwork | Separate generated olive fiber sculpture retains the direction's looping silhouette and negative space. Its individual strands and shadow differ from the concept; it remains a decorative asset with empty alt text. |
| Domain navigation | Five ruled columns become five generously spaced mobile rows. Mobile actions can sit together where they fit, reducing unnecessary scrolling from the concept's stacked actions. |
| Homepage continuation | Forest research band, two study columns, editorial resource entries and muted enquiry band retained. Full source mission and introduction occupy more space than the abbreviated concept. |
| Research library | Search, domain sidebar, fine rows, source domains and external-link cues retained. Mobile uses a labelled native selector. Added honest forthcoming-content notes, live result counts and reset states. All resource content now renders on the server before JavaScript. |
| Projects | Pale olive active-study panel and ruled publication list match the selected hierarchy. All supplied entries and statuses are included; counts and a screen-reader heading improve navigation. Darkened status text after measuring insufficient contrast. |
| Team | Large initials, role rail and serif names retained. Full bio uses sequential paragraphs for reading order rather than the concept's shortened columns. No invented portraits. |
| Contact and datasets | Two-column desktop form, single-column mobile form, honest delivery note and dataset empty state retained. Darker form borders improve control visibility. No pretend submissions or fabricated catalogue. |

Above-the-fold copy matches the locked direction, allowing responsive line breaks and normal typographic punctuation. Scientific prose and project identifiers match the source brief. Changes from generated concepts are the explicit completeness, accessibility and responsive refinements above; the final page was not treated as a pixel-identical raster recreation.

## Verification results

- All six production routes checked at six widths (36 combinations): one h1 per page, no horizontal overflow, no broken loaded images; clean browser error/warning log.
- Seven tests pass, lint passes, TypeScript passes, optimized production build passes. Copied brief SHA-256 matches the supplied original.
- Every project status filter returns the expected count (6 published, 3 submitted, 4 drafting, 1 ongoing, 1 manuscript in progress).
- Resource search finds BOLD, domain selections update the URL, empty search resets to six domains, and initial/domain-filtered resource links are present in server HTML.
- Mobile flow: find guidance → correctly prefilled enquiry → invalid submission focuses Name → valid input prepares an explicitly unsent draft → download action. Navigation Escape restores focus to the 46px trigger.
- Computed text-color checks report no failures against 4.5:1 normal / 3:1 large text thresholds for the tested elements on six routes. This targeted check does not replace assistive-technology testing or WCAG certification.
- All public routes and metadata assets return 200; missing route returns the designed 404. Homepage JavaScript totals about 204 KiB gzip (calculated from script files); the optimized hero WebP is about 51 KiB. These are local asset measurements, not Lighthouse scores or field Core Web Vitals.
- Remaining verification limits: actual Safari/Firefox and physical devices, screen-reader speech output, production hosting conditions and live webhook delivery. No external enquiry was sent. No public site was deployed.
