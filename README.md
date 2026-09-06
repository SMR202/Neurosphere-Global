# NeuroSphere Global — Phase 1

A Next.js App Router website built from the complete `NEUROSPHERE_GLOBAL_PHASE1_MASTER_BUILD_BRIEF.md`, copied into this folder from the supplied source. The brief controls scientific content and scope.

## Run

Use Node.js 22.13 or later (24 LTS recommended) and npm.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:3000. For production:

```sh
npm run build
npm start
```

The local scripts bind to loopback. For deployment, use a Next.js-compatible Node host or adapt its start command to the host's required interface and port. This project requires a server for enquiries; it is not a static export.

## Included

- Six routes: home, research/resources, datasets, projects, team, contact.
- Searchable resource library, shareable domain filters, 21 official external resource links, and the supplied guidance/FAQ topics.
- All 15 supplied projects, with exact titles, statuses, summaries and DOI identifiers; accessible status filters.
- Full supplied lead biography and explicit TBD fields for the second member.
- Dataset empty state and typed listing ready for approved entries.
- Responsive navigation, keyboard focus handling, skip link, reduced-motion support, form validation and accessible status messages.
- Server-rendered pages, small interactive client components, optimized locally served fonts/art, page metadata, social preview, favicon, robots and sitemap.

## Enquiries and launch configuration

Copy `.env.example` to `.env.local`. Do not commit secrets.

With no delivery configuration, the form validates and prepares a downloadable text draft in the browser. **It does not send the enquiry.** No form data is persisted by the application. The UI states this before entry and after preparation.

To enable submission, provide both `CONTACT_WEBHOOK_URL` (HTTPS only) and `CONTACT_WEBHOOK_TOKEN`. The server POSTs JSON `{ source: "NeuroSphere Global", enquiry: { name, email, institution, type, area, message } }` with a Bearer authorization header. Connect this endpoint to your chosen delivery system and verified recipient; return 2xx only after accepting the enquiry. Credentials remain on the server. No destination or email address has been invented.

The endpoint checks origin, schema, JSON format, a 24 KB request limit and a honeypot. Its bounded process-local limiter allows five requests per 15 minutes. `TRUST_PROXY=true` is appropriate only when the hosting proxy sanitizes `x-forwarded-for`; otherwise a conservative shared local bucket is used. Configure a shared edge limiter for multiple server instances. The current delivery tests use mocks and never send external messages. Real delivery must be verified after the destination is supplied.

Set `SITE_URL` to the confirmed HTTPS production origin, then rebuild. This enables canonical URLs, public indexing and sitemap entries. Without it, indexing is disabled and the sitemap is empty; localhost is used only to resolve local social-preview metadata. No public deployment has been made.

## Content maintenance

Edit the typed source files in `src/data/`:

| File | Content |
| --- | --- |
| `site.ts` | Mission, introduction, navigation and section copy |
| `resources.ts` | Research domains, official links and guidance topics |
| `projects.ts` | Project titles, statuses, DOI identifiers and approved summaries |
| `team.ts` | Profiles and optional image paths |
| `datasets.ts` | Approved dataset entries; currently intentionally empty |
| `types.ts` | Content schema |

Add real dataset entries with source, access link and requirements to populate the listing automatically. Guidance articles/FAQ answers, dataset content, portraits, the second biography, final domain and enquiry recipient remain client-provided items. Do not replace these with invented scientific information.

## Design

`design/DIRECTION.md` records research, IA, three explored visual directions, the selected Field Notes system and intentional refinements. Accepted image-generated page concepts are in `design/concepts/`. The looping fiber artwork is decorative, not anatomical imagery or a research result. Cormorant Garamond and Manrope are served locally by Next.js; Lucide provides the vector icons. shadcn/Radix primitives receive custom typography, geometry, color and interaction styling.

## Verification

```sh
npm test
npm run lint
npm run typecheck
npm run build
```

Content tests compare all project titles/statuses/DOIs and key prose against the source brief. Other tests cover search, draft labeling, validation, request bounds, rate limiting and delivery success/failure responses. Browser checks cover the six pages at 375, 430, 768, 1024, 1280 and 1440 pixels, mobile menu focus restoration, search/reset, domain URLs, project filtering and enquiry draft preparation. Screenshots and the visual fidelity ledger are stored outside the repository in the Codex task's visualization folder.

The build has no analytics, account system, simulation engine, clinical decision tool or unnecessary CMS. Automated checks and browser inspection are not a claim of complete WCAG certification or real-device testing.
