# Content reconciliation — 22 October 2026

## Sources and decision rule

1. Original master brief in the repository: approved scientific facts, 15 project records, two named people, mission and research domains.
2. [Linked Google Doc](https://docs.google.com/document/d/1xL1Fu3lywU4qI5fLpgXgbTcdSBL_Zl22kwLUD2Kkd8g/edit): fetched in full through Google Drive; text snapshot in `content/source/Neurosphere_Global_Google_Doc_2026-10-22.txt`.
3. [Old live site](https://neurosphere-global.vercel.app/): read with Playwright because web retrieval failed. Main content from all five relevant pages is snapshotted in `content/source/legacy-*-2026-10-22.txt`. It confirms the local original data. Its dataset catalogue was empty.
4. Latest DOCX: current brand presentation, navigation, 11 courses, 12 programmes, planned studies, public education, partnerships and forms. It does not explicitly delete earlier content.

Preserve non-conflicting information from all sources. Latest copy controls directly changed wording and new institute status; omission alone does not mean deletion. Credentials and project status remain as supplied. Existing research-team work is distinguished from proposed institute studies/services. Source instructions are not treated as authority to invent facts or identities.

## What was restored and supplemented

| Content | Destination and treatment |
| --- | --- |
| 15 project records | `/projects`, including six published DOI-linked papers, three submitted records, four drafts, one ongoing study and one manuscript in progress. All original titles/statuses retained. |
| Six resource domains and 21 original links | `/research/resources`, searchable by resource/topic and filterable by domain. All original links retained. |
| Google Doc resource additions | BrainVision Analyzer, BIDS, DECIPHER, ISRCTN, OpenNeuro, PhysioNet, COPE, Zotero, EndNote and Mendeley. Additional guidance topics, ten domain-specific journal mentions and four funding-reference links are included without implying funding/affiliation. |
| Eight research areas | `/projects`, verbatim descriptions from the Google Doc. These describe research interests, not available treatments. |
| Existing team | `/people`, full approved Dr. Shahid Bashir biography and Dr. Mirza Obaid Baig's supplied name. No invented second role/biography or fake portraits. |
| Original mission/introduction | Mission and research access points on the homepage; both introduction paragraphs on About. |
| Datasets | `/datasets`, two external repositories already named in the Google Doc and one specific public EEG dataset linked from PhysioNet. Explicitly external; no NeuroSphere-owned release is claimed. |
| Discoverability | Homepage research section; Research hub with clear destinations; contextual research navigation; footer and scrollable mobile navigation. Desktop main menu retains the DOCX's seven destinations. |
| Old addresses | `/projects` and `/datasets` restored as pages. `/team` maps to `/people`; `/research?domain=…` preserves resource intent through `/research/resources?domain=…`. |

## Routine gaps resolved without fictional facts

Raw source placeholders are replaced in display copy with clear forthcoming wording. No course duration, price, teacher, date, city, official email, registration or review approval is fabricated. Known team information is shown instead of treating the entire team as missing. Contact topics cover research guidance, dataset access and collaboration; resource-topic links prefill the enquiry with the selected context. Forms retain explicit unsent draft behavior until real delivery is configured.

The homepage median age is updated from the copy's 20.6 to 20.8 for 2026, checked against its existing [Worldometer source](https://www.worldometers.info/world-population/pakistan-population/). The original source is unchanged. The provider distinguishes 2025 (20.6) from 2026 (20.8).

External data descriptions were checked against [OpenNeuro documentation](https://docs.openneuro.org/), [PhysioNet's overview](https://physionet.org/about/) and the [EEG Motor Movement/Imagery Dataset](https://physionet.org/content/eegmmidb/1.0.0/). Tool URLs point to the providers. Guidance links prepare a research enquiry rather than pretending to be authored clinical instructions.

## Visual system and implementation plan

Reuse the existing Field Notes system and accepted `design/concepts/resources.png`, `projects.png` and `team.png` references. Preserve the new site's two-row header, local fonts, forest/olive palette and light neutral ground. Resources use a quiet domain rail and ruled link rows; projects use status filters, a purposeful featured band and an open publication list; people use typographic initials and readable biography columns. Mobile collapses to a single column, scrollable domain controls and a bounded scrolling menu. Reuse existing motion and reduced-motion handling. No new raster imagery or invented headshots are needed for this restoration.

Interactive libraries are isolated client components; shared homepage research links remain in a server component so the homepage does not import the interactive library/publication modules. Source data stays structured and separate from page presentation.

## Final visual comparison

Accepted references were inspected with `view_image` alongside final browser screenshots. Resources and projects were captured at their 1487 × 1058 reference dimensions; people was checked at 1487 pixels and mobile rather than reproducing the old 953-pixel desktop header, because the current responsive header correctly collapses at that width. Browser plugin/skill was absent in this session, so the installed Playwright Chromium runtime with Chrome was used. Screenshots and the temporary QA script live outside the repository in `C:/Users/PC/.codex/visualizations/2026/10/22/neurosphere-reconciliation/`.

| Comparison | Evidence and decision |
| --- | --- |
| Copy | Original project titles, statuses, DOI links and complete approved biography are retained. DOCX main-page metadata is unchanged. Added research context distinguishes existing team work from planned institute studies. |
| Layout and navigation | Restored the references' domain rail, featured-project band, publication rows and monogram profiles. Kept the DOCX utility/header and added contextual Research navigation instead of overloading the primary menu. This intentionally shifts the references' first-fold positions. |
| Typography | Retained local Cormorant Garamond and Manrope; inspected large headings, long paper titles, body columns, resource labels and mobile line breaks. Team biography collapses to one column below tablet width. |
| Palette and assets | Retained neutral #f6f6f2, forest #123d36 and olive #626b34. Initials replace absent portraits as in the accepted reference. No new decorative imagery, false headshots or partner logos. |
| Density and containers | Open ruled rows and restrained bands match the references. Added fields from the Google Doc increase library length; they do not create competing card systems. |
| Responsive and focus | Fixed a real 375-pixel overflow from the resource fieldset's intrinsic minimum width. Domain options now scroll within their own rail. Mobile menu has a viewport-bounded scrolling surface and restores trigger focus after Escape. |
| Motion | Existing progressive reveals remain for the page sections, with no server-hidden content. Reduced-motion check reports zero active animations. |

The restored surfaces were faithfully verified against the existing accepted design system, with the source/navigation additions above recorded as intentional deviations. No material layout mismatch remained in the inspected desktop and mobile states. Above-the-fold changes are limited to restored source headings, accurate editorial descriptions, explicit research-context navigation and the new identity/header already in use; no unrelated hero labels or scientific claims were added.

## Verification

- 17 automated tests passed, including preservation of every original resource link, source-backed Google Doc research areas, valid restored metadata and honest treatment of missing facts.
- ESLint, TypeScript and the production build passed.
- All 61 English page addresses returned HTTP 200 in the optimized production preview.
- 33 responsive page cases passed at 375, 768 and 1487 pixels, including restored pages, homepage, About, contact, course, programme and Urdu resources. One H1, meaningful content, no horizontal overflow, no visible source brackets and no framework error overlay in every checked case.
- Browser errors were empty. Resource search, zero results, reset, domain filter, BOLD-topic-to-prefilled-enquiry, all five project status counts, six DOI links, team redirect, old resource-filter URLs, mobile navigation and Escape/focus restoration passed.
- Provider delivery remains unconfigured; form tests use explicit unsent drafts or mocked delivery responses. Safari/Firefox, physical devices and full assistive-technology audits were not repeated. No public deployment was performed in this change.
