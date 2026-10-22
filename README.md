# NeuroSphere

Next.js website combining the original approved research website, the linked Phase 1 Google Doc and the October 2026 ready-to-paste copy. The DOCX supplies the current brand presentation and new learning/institute sections; it does not erase previously approved research or people. Source snapshots and the exact DOCX are retained in `content/source/`. See `design/CONTENT-RECONCILIATION.md` for the source decisions.

## Run

Use Node.js 24 LTS and npm:

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:3000. For an optimized preview:

```sh
npm run build
npm start
```

Scripts bind to loopback. A public Next.js host must provide its normal interface/port configuration. This reconciled revision has not been deployed; the supplied Vercel URL was used as an older reference.

## Content and pages

The site includes 61 English page addresses and corresponding `/ur` interface previews: the supplied main pages, 11 course pages, 12 programme pages, 10 health-topic pages, six planned article pages, roadmap, student/research applications, waitlist and legal holding pages, plus the restored projects/publications, resources and datasets. Main page browser titles and meta descriptions match the DOCX exactly. `/projects` and `/datasets` are real pages again; `/team` redirects to `/people`. Old `/research?domain=…` links reach the resource library at `/research/resources?domain=…`.

`src/content/client.ts` references the verbatim extracted paragraphs. `src/content/forms.ts` defines the six form types and supplied confirmation messages. Add approved scientific content to the source model; do not invent article text, programme details, affiliations or clinical claims to fill gaps. Source-only editorial instructions are not rendered as page copy.

## Items needed before publication

The DOCX still contains unanswered fields for course hours, durations, fees, dates, teachers, physician reviewers, emergency/crisis numbers, official emails, reply time, hub city, registered entity and legal text. Public-facing display copy uses honest forthcoming wording rather than brackets; source text remains intact. The original team biographies, 15 project records and all 21 original resource links are restored, with the Google Doc additions. Dr. Mirza Obaid Baig's title/biography are still unknown and are not invented. Health guides remain clearly identified as drafts awaiting physician review and local emergency contacts.

The supplied Urdu table contains no translations. Draft key navigation/button translations are maintained in `src/lib/locale.ts`, labelled as a preview and awaiting native-speaker review. The layout switches to RTL and uses a locally served Arabic-script font; longer English content keeps its own language semantics. This is not a claim that a complete, approved Urdu site has been delivered.

The client copy gives Pakistan's median age as 20.6. Under the user's authorization to resolve factual gaps, the displayed figure was updated to 20.8 from Worldometer's 2026 page, checked on 22 October 2026. The original wording remains in the source extraction. The national mental-health-policy announcement was corroborated against the government's Press Information Department.

All pages currently use `noindex,nofollow`; robots disallows crawling and the sitemap is empty. Setting `SITE_URL` enables correct canonical URLs but does **not** remove this publication hold. Resolve the client details and approvals before changing the indexing rules. See `design/CLIENT-COPY-UPDATE.md` for the design direction, gaps and verification notes.

## Forms and delivery

Waitlist/newsletter, course interest, student track, partner enquiry, research interest and contact forms have client and server validation, explicit consent and bounded fields. Without delivery credentials they prepare an **unsent draft**, with a native text-file download link. The application stores no form data. Editing a field clears its old error and invalidates a prepared draft.

Copy `.env.example` to `.env.local` and supply `CONTACT_WEBHOOK_URL` (HTTPS) and `CONTACT_WEBHOOK_TOKEN` only after a real destination is agreed. `/api/forms` POSTs `{ source: "NeuroSphere", form, values }` to that endpoint with a server-only Bearer token. The receiver must return 2xx only after accepting delivery. The supplied confirmation message is shown only after a confirmed 2xx; timeout and provider failure retain the form. Tests use mocks and never send external enquiries.

Requests require same-origin JSON, valid field/options/consent, an empty honeypot and a maximum 24 KB body. A bounded process-local limiter permits five requests per 15 minutes. Set `TRUST_PROXY=true` only behind a proxy that sanitizes `x-forwarded-for`; apply a shared edge limiter for multiple production instances. Real delivery and retention/unsubscribe handling must be verified with the chosen provider before launch. The legacy `/api/enquiry` endpoint is retained for compatibility with the previous implementation.

## UI and motion

The Field Notes identity uses Cormorant Garamond, Manrope, a forest/olive palette, fine rules and the existing abstract fiber-loop illustration. Refreshed visual concepts are in `design/concepts/client-update/`. shadcn/Radix supplies accessible primitives with custom styling.

Motion uses progressive enhancement: short hero entrances, scroll-triggered reveals, capped child staggering, reading progress and responsive hover/focus feedback. Content is never hidden while waiting for JavaScript or scrolling. Reduced-motion preferences remove animation and smooth scrolling. Native anchor links and disclosure controls preserve familiar keyboard behavior. No animation framework, analytics, accounts or simulated clinical service was added.

## Checks

```sh
npm test
npm run lint
npm run typecheck
npm run build
```

Tests verify exact source metadata, catalogue counts/content, locale paths, consent/options/length validation, explicit draft labels, request limits and mocked delivery outcomes. Browser checks exercise desktop/mobile page families, catalogue search/filter/reset, course context, menu focus restoration, RTL switching, form errors/drafts and reduced-motion behavior. Evidence is stored outside the repository in the task's visualization directory. Browser checks are not complete WCAG certification or physical-device testing.
