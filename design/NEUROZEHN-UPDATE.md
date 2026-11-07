# NeuroZehn client update

## Client direction — 7 November 2026

The owner requested no fees or payment information on the initial website. This supersedes the earlier instruction to display the supplied fees. The Learn summary now presents subject, learning approach and certificate information; the fees section, catalogue prices, course-summary prices and scholarship form question are removed. Course descriptions retain format, duration, assessment and certificate text while omitting the source's fee sentence. Community-talk copy no longer makes a price claim, and the partner-support copy refers to training and research. No replacement prices or claim that all courses are free is introduced. Original documents and source extractions remain unchanged. Existing source-reconciliation and audit notes below describe the earlier revision where pricing was displayed.

## Source reconciliation

The November client DOCX and six figures are preserved in `content/source/neurozehn/`. The complete 735-paragraph extraction is `paragraphs.json`. `aligned.json` projects updated paragraphs onto stable historical content IDs, preserving all existing routes and the earlier approved research/publication/resource collections. Source-specific additions include the full institute name, explanation of Zehn, early-2027 intake, actual fees/durations, prepared-by credits, two founders, eight scientific-team entries, reply times and supplied Urdu keys. Old names remain only in archived source documents and historical notes; active `src` has no former-name references.

Do not infer that a prepared-by credit is physician review or that the named author teaches every course. The at-a-glance label is Prepared by. Programme status, fees and dates remain as supplied. Dr. Mirza Obaid Baig is now explicitly supplied as Founder. Existing approved research biography details remain; no new degrees, affiliations, portraits or results were invented.

Contact throughout the footer, contact page and form handoff is `NeuroZehn@outlook.com`. Without webhook credentials, forms validate and prepare an email, then offer an explicit email-app handoff and downloadable copy. A visitor still has to send it; no automatic subscription, application delivery or successful transmission is simulated.

The audit repair simplifies that handoff to one clearly labelled action, with a compact unsent state and copy/download recovery. Email and course/interests plus consent are sufficient for initial interest; all client-specified background fields remain available as optional details. The short partner-brief path keeps name, email, message and consent, while the full partnership enquiry retains its fuller requirements. No email address is passed in a navigation URL. The original DOCX remains unchanged; eight punctuation encoding errors in the aligned projection were corrected.

## Design process and figures

Studied SimonMed and SAHMRI through their public websites: audience-led tasks, confident sans-serif hierarchy, readable content richness, research navigation and strong editorial section rhythm. Their copy, photography, metrics and clinical service claims were not reused. Frontend App Builder, Impeccable craft guidance, existing React/Next patterns and local Next documentation informed the implementation. The user delegated visual decisions; the new clean research-institute direction was pinned to their references.

Two original image-generated references are in `design/concepts/neurozehn/`: homepage and journey/roadmap. A separate original blue-and-amber connection sculpture is shipped as a 138 KB WebP. It is an abstract metaphor, not anatomical imaging or research data. The new visual system uses Manrope, locally served Urdu font, navy, cobalt, warm white and restrained gold. The previous serif/olive system has been replaced across all page families. Source figures are replaced as follows:

| Figure | Refined implementation |
| --- | --- |
| Wordmark | Code-native two-tone NeuroZehn with full descriptor, gold rule and matching NZ favicon; readable, scalable and linked home. |
| Journey | Six keyboard-operable stages with linework, consistent library icons, selected-state motion and a live explanatory caption. |
| Roadmap | Four-stage timeline with explicit stage descriptions; dark editorial band on Home and detailed About roadmap. |
| Programmes | Live availability filters and accessible programme links; all twelve supplied descriptions/statuses remain. |
| Facts | Large typeset numbers, high-contrast panel, selectable explanatory text and source links; no rasterised source text. |
| Credentials | Responsive four-part diagram with complete supplied descriptions and separate licence/degree clarification. |

Audit refinements add a twelve-destination programme relationship figure to Home, meaningful onward actions to all journey stages, a distinct course-intake overview and comparison metadata, equal compact founder summaries with expandable supplied biography, and a single-column sourced-facts layout on phones. Shared emergency content is presented once per page with explicit service actions and separate support hours; no client-supplied numbers or medical guidance were invented or rewritten.

## Fidelity and QA

Generated concepts and rendered desktop/mobile screenshots were visually inspected. Native desktop reference size was 1536 × 1024. The Browser plugin was unavailable, so installed Playwright Chromium/Chrome was used. Evidence and the temporary QA script are outside the repository at `C:/Users/PC/.codex/visualizations/2026/11/02/neurozehn/`.

Comparison covered: exact source headline/actions; bold sans-serif hierarchy; navy/cobalt/gold palette; original sculpture framing; open audience pathways; readable diagrams; responsive stacking; motion and reduced motion. Intentional deviations from generated mockups: exact client paragraphs are longer; full name excludes the mockup's extra Pakistan suffix; the supplied status strip remains; the final standalone sculpture differs from the mockup asset; every diagram uses real selectable text. No mockup paraphrases or fabricated institutional claims were adopted. A tablet artwork overflow was found and corrected. Final hero screenshots at 1536 and 375 pixels show no horizontal overflow.

The follow-up audit was repaired and verified in the in-app browser using its documented Playwright interface. Latest screenshots and the responsive results are outside the repository at `C:/Users/PC/.codex/visualizations/2026/11/02/neurozehn-fixes/`. Seventy-two strict responsive cases cover 18 representative routes at 320, 390, 768 and 1280 pixels. Checks compare content width against the actual document client width, accounting for the scrollbar; they also check one H1, meaningful content, loaded images and broken punctuation/old-brand/editorial-instruction leakage. All passed. Late fixes corrected small-phone long titles, the mobile filter's inherited 200px maximum width and a redundant desktop filter, plus inherited biography columns inside founder summaries.

Validation: 22 automated tests pass; ESLint and the TypeScript/production build pass. All 61 English addresses returned 200 from the production server. Verified interactions include journey selection and its next-action link, programme filtering with correct singular count, course/resource empty states and reset, optional form details, validation focus, the short partner brief, biography disclosure, mobile drawer Escape/focus restoration, skip navigation and reduced motion. Latest browser warnings/errors were empty. The test browser blocked external email-app opening; it was not bypassed. The local unsent completion state and mailto encoding were checked, but external email-app behavior and real message delivery are not claimed as verified. No external messages were sent.

Concept comparison used `view_image` on the original homepage concept and the final browser screenshots. The host screenshot surface is 1280 × 720, so this follow-up uses that native surface plus phone captures rather than claiming a 1536 × 1024 pixel match. The retained visual direction was faithfully checked against the concept, with the following explicit audit refinements:

| Comparison | Final treatment / reason |
| --- | --- |
| Copy and actions | Exact supplied headline and primary actions retained; full approved introductory wording replaces generated paraphrases. The redundant eyebrow is removed. |
| Layout and spacing | Open two-column homepage, tighter header and hero allow the availability strip into view; task/library pages use compact introductions. |
| Typography | Consistent Manrope hierarchy; fluid phone/tablet headings, readable labels and source text replace rigid sizes. |
| Palette and assets | Navy/cobalt/warm white with restrained gold and the existing original connection sculpture; no borrowed reference-site imagery. |
| Figures and containers | Open programme connections and labelled journey stages replace a broken link list and decorative-only treatment; all labels remain real text. |
| Responsive behavior and motion | Phone stacking, long-title wrapping and full-width controls verified; restrained artwork/selection motion stops with reduced-motion preference. |

The approved visual direction and audit refinements are verified without claiming pixel identity to generated typography or artwork. No remaining fixable mismatch was observed in the inspected states; operational and content dependencies below remain separate from the interface repair.

## Publication limits

Client-supplied emergency and support contacts are transcribed as supplied, not independently certified. The hotline connector returned a different country's service and was not used to replace the client's Pakistan numbers. Those numbers and availability should receive an operational check before public launch. The client's median-age wording is retained in the new source. Legal policy pages still await approved final text. Indexing remains disabled pending launch approval. Urdu key strings are now supplied, but long English content is not presented as a completed Urdu translation. No external enquiries were sent during verification. These notes describe local build and browser QA; Git and deployment status must be checked separately for each release.
