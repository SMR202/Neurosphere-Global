# Client copy update

Historical note: the October 2026 implementation initially treated the DOCX as replacing the earlier research content. That interpretation was corrected at the user's request on 22 October 2026. The sources are now combined: current DOCX branding and new sections, plus previously approved research, resources and people. See `CONTENT-RECONCILIATION.md`, which supersedes conflicting source-priority and gap statements below. Source paragraphs remain verbatim in JSON; display-only wording handles unanswered fields.

## Visual and interaction direction

Continue Field Notes: neutral #f6f6f2, forest #123d36, olive #626b34; Cormorant Garamond and Manrope. Use the existing decorative fiber-loop image and library Atom mark. No invented team photographs, partner logos, accreditation or clinical results. The accepted refreshed homepage and catalogue concepts live in `design/concepts/client-update/`. Where generated concepts paraphrase copy, exact DOCX wording takes precedence.

Hero composition: left-aligned editorial headline, readable supporting copy and two clear actions; right decorative loop. A status band leads into three doors. Then building/story, four sourced facts, twelve programme entries, founding partners, roadmap, waitlist and detailed footer. Catalogue uses open ruled tiles, search and status filters. Long pages use an index, readable prose and varied spacing rather than repeated generic cards.

Motion: 600–850ms eased entrance with a 16–24px rise; child staggering capped at 240ms; subtle artwork drift; 180–240ms link/card feedback; scroll progress; native smooth anchor navigation. No scroll hijacking, flashing, auto-playing carousel or content that requires animation to become accessible. Reduced-motion setting removes decorative animation and smooth scrolling. Focused content is always visible.

## Content and publication gaps

- The DOCX Urdu table has 20 English key strings and **zero populated Urdu translation cells**. Urdu interface architecture can be prepared, but supplied translations must not be claimed to exist. Any machine-authored translations require native-speaker review and are recorded separately.
- Course durations, fees, teachers, dates, physician reviewers, official emails, response time, emergency/crisis numbers, city, legal policies, registered entity and named collaborators are absent. Preserve bracketed placeholders in local preview; block public indexing and a publication-ready configuration until resolved.
- Research/clinical programmes retain their supplied status and future tense. The two supplied health guide drafts are not presented as physician-approved publications while reviewer information is blank.
- Worldometer's currently retrieved 2026 page reports a median age of 20.8; the client copy says 20.6. Preserve the client copy in the preview and flag this discrepancy for approval before publication. The policy announcement is corroborated by Pakistan's Press Information Department: https://pid.gov.pk/site/press_detail/34131 . Workforce/budget source: https://www.frontiersin.org/journals/health-services/articles/10.3389/frhs.2024.1471528/full .
- Contact destination remains unconfigured. Forms validate and prepare an unsent downloadable draft locally, or send only through the configured server-side HTTPS webhook. Supplied confirmation messages appear only after confirmed delivery. No simulated enrolment or newsletter subscription.

## Architecture

Server-rendered Next.js pages with English URLs as supplied and `/ur` route variants; locale is explicit in HTML and direction. Shared page families cover course, programme, health-guide and form detail pages. Small client islands handle navigation, catalogue filters, form state and motion. Preserve old links with redirects. Include exact browser titles/meta descriptions and conservative noindex metadata while source gaps remain.

## Final visual comparison and QA

Selected concept references: `concepts/client-update/home.png` (1435 × 1096) and `learn.png` (1113 × 1413). Chrome was used because the in-app browser was unavailable. Evidence lives outside the repository in `C:/Users/PC/.codex/visualizations/2026/10/19/neurosphere-client-update/`. `home-final-desktop.png`, `home-browser-final.jpg`, `learn-browser-final.jpg`, `home-mobile.png`, `urdu-mobile.png` and `contact-draft-mobile.png` are the useful final visual records. Tall viewport captures sometimes returned scaled, letterboxed Chrome images; those are diagnostic captures, not pixel-accurate comparison evidence. Normal browser captures and DOM breakpoint checks supplemented the comparison.

| Comparison point | Final decision |
| --- | --- |
| Hero hierarchy | Retained large editorial serif, left copy and right abstract loop. Enlarged desktop home typography and refined the Learn heading to keep its intended two-line composition. |
| Colour and typography | Retained warm neutral ground, forest text, olive accents, Cormorant Garamond and Manrope; fonts are served locally. |
| Artwork | Reused the decorative fiber-loop asset with restrained movement. It does not represent measured anatomy or research results. |
| Navigation | Added a separate language/utility row so seven destinations remain readable. Mobile uses a focus-managed dialog; Escape restores trigger focus. Library Atom replaces the generated concept's inconsistent mark. |
| Catalogue | Preserved open ruled tiles, prominent search and status controls. All 11 supplied courses retain exact titles, audiences and availability; generated mock-up descriptions were discarded. |
| Content density | Exact DOCX paragraphs are longer than some concept paraphrases. Readability and source fidelity take precedence over matching their line count. Generated continuation imagery's invented scientific figures were never used. |
| Responsive interaction | Mobile stacks content and actions; RTL applies to the draft Urdu interface, with English body text retaining language semantics. Reduced motion removes decorative movement. |

Validation completed: 14 automated tests; ESLint; TypeScript; production build; all 58 English routes return 200 and unknown paths return 404. Browser checks covered 17 page families at 375, 768, 1024 and 1440 CSS pixels (68 cases), with an additional 1280-pixel home check after the last typography refinement. No horizontal overflow was found. Nine representative pages passed targeted computed text-contrast checks. Search, empty state, reset to all 11 courses, course and partner form context, mobile menu focus, RTL switching and contact validation/draft preparation were exercised. Fresh production browser logs were clean. Reduced-motion verification reported zero active animations.

Separating the homepage from the shared detail route reduced measured homepage JavaScript transfer from about 316 KiB to 206 KiB gzip; the optimized hero image was about 51 KiB. These are local asset measurements, not Lighthouse or field Core Web Vitals results.

Form provider outcomes were tested with mocks. The unsent draft text and native download anchor were verified; browser automation did not confirm the operating-system file-save event. Live provider delivery, Safari/Firefox, physical devices and assistive-technology testing remain unverified. These checks do not constitute full WCAG certification. Public indexing stays disabled until the source gaps and approvals listed above are resolved.
