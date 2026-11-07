# NeuroZehn

Current source: the November NeuroZehn DOCX in `content/source/neurozehn/`. The rebrand, supplied Outlook contact, fees, durations, early-2027 intake, founders, scientific team and Urdu keys supersede earlier source versions. See `design/NEUROZEHN-UPDATE.md` for the design, audit repairs and verification. Forms offer an explicit email-app handoff to NeuroZehn@outlook.com when server delivery is unconfigured.

Client direction, 7 November 2026: publish no fees or payment information during the initial phase. Course pricing, the fees section and scholarship enquiry field are removed from the public presentation. Learning formats are published without the source's fee sentence; original supplied documents remain archived unchanged. This does not declare all programmes free.

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

Scripts bind to loopback. A public Next.js host must provide its normal interface/port configuration. The existing Vercel project is connected to the repository's main branch.

## Content and pages

The site includes 61 English page addresses and corresponding `/ur` interface previews: the supplied main pages, 11 course pages, 12 programme pages, 10 health-topic pages, six planned article pages, roadmap, student/research applications, waitlist and legal holding pages, plus the restored projects/publications, resources and datasets. Main page browser titles and meta descriptions match the DOCX exactly. `/projects` and `/datasets` are real pages again; `/team` redirects to `/people`. Old `/research?domain=…` links reach the resource library at `/research/resources?domain=…`.

`src/content/client.ts` references the verbatim extracted paragraphs. `src/content/forms.ts` defines the six form types and supplied confirmation messages. Add approved scientific content to the source model; do not invent article text, programme details, affiliations or clinical claims to fill gaps. Source-only editorial instructions are not rendered as page copy.

## Items needed before publication

The November DOCX supplies course fees/durations where available, early-2027 intake, Outlook contact, reply expectations, two founders, eight scientific-team names and emergency/support contacts. Remaining programme details, teaching/review credentials, registered-entity details and final policy wording require approved content. Planned topics are labelled honestly; no unavailable articles, facilities, biographies or clinical services are invented. The earlier approved research biography, 15 project records and resource collections remain available. Dr. Mirza Obaid Baig is identified as Founder; additional biography is not fabricated. Client-supplied support numbers and operating hours still require an operational check before launch.

Supplied Urdu navigation/button strings are maintained in `src/lib/locale.ts`. The layout switches to RTL and uses a locally served Arabic-script font; longer English content keeps its own language semantics. A visitor-facing bilingual notice explains that menus and key buttons are translated while detailed content remains English.

Scientific and statistical wording follows the current client source. Source citations remain visible and selectable, including a separately labelled government announcement link where the supplied reporting attribution differs from the linked primary source.

All pages currently use `noindex,nofollow`; robots disallows crawling and the sitemap is empty. Setting `SITE_URL` enables correct canonical URLs but does **not** remove this publication hold. Resolve the client details and approvals before changing the indexing rules. See `design/CLIENT-COPY-UPDATE.md` for the design direction, gaps and verification notes.

## Forms and delivery

The current six forms support Web3Forms' free-plan browser delivery after server validation. See `design/FORM-DELIVERY-SETUP.md` for client verification, Vercel activation and real-inbox tests. Set `WEB3FORMS_ACCESS_KEY` only for a form linked to the client's verified receiving inbox. A missing/malformed key keeps the explicit email-app handoff. This provider connection is implemented; actual delivery requires the verified key and receipt confirmation. The existing authenticated webhook remains an alternative.

Waitlist/newsletter, course interest, student track, partner enquiry, research interest and contact forms have client and server validation, explicit consent and bounded fields. Without delivery credentials they prepare an **unsent draft**, with a native text-file download link. The application stores no form data. Editing a field clears its old error and invalidates a prepared draft.

Copy `.env.example` to `.env.local` and supply `CONTACT_WEBHOOK_URL` (HTTPS) and `CONTACT_WEBHOOK_TOKEN` only after a real destination is agreed. `/api/forms` POSTs `{ source: "NeuroZehn", form, values }` plus optional brief-request intent to that endpoint with a server-only Bearer token. The receiver must return 2xx only after accepting delivery. The supplied confirmation message is shown only after a confirmed 2xx; timeout and provider failure retain the form. Tests use mocks and never send external enquiries.

Requests require same-origin JSON, valid field/options/consent, an empty honeypot and a maximum 24 KB body. A bounded process-local limiter permits five requests per visitor per 15 minutes on Vercel, using its platform-controlled forwarded address. On other hosts, set `TRUST_PROXY=true` only behind a proxy that sanitizes `x-forwarded-for`; otherwise requests share the local limit. Apply a shared edge limiter for multiple production instances. Real delivery and retention/unsubscribe handling must be verified with the chosen provider before launch. The legacy `/api/enquiry` endpoint retains its webhook-only contract for compatibility with the previous implementation.

## UI and motion

The NeuroZehn identity uses Manrope, locally served Urdu type, navy/cobalt, warm white, restrained gold, open editorial layouts and an original abstract blue/amber connection sculpture. Current concepts are in `design/concepts/neurozehn/`. Institutional, library and task pages share the visual system with different content density. shadcn/Radix supplies accessible primitives with custom styling; figures use real text, semantic controls and responsive layouts.

Motion uses progressive enhancement: short hero entrances, scroll-triggered reveals, capped child staggering, reading progress and responsive hover/focus feedback. Content is never hidden while waiting for JavaScript or scrolling. Reduced-motion preferences remove animation and smooth scrolling. Native anchor links and disclosure controls preserve familiar keyboard behavior. No animation framework, analytics, accounts or simulated clinical service was added.

## Checks

```sh
npm test
npm run lint
npm run typecheck
npm run build
```

Tests verify exact source metadata, catalogue counts/content, locale paths, consent/options/length validation, explicit draft labels, request limits and mocked delivery outcomes. Browser checks exercise desktop/mobile page families, catalogue search/filter/reset, course context, menu focus restoration, RTL switching, form errors/drafts and reduced-motion behavior. Evidence is stored outside the repository in the task's visualization directory. Browser checks are not complete WCAG certification or physical-device testing.
