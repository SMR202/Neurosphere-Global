# NeuroZehn form delivery

Implementation: Web3Forms free-plan browser submission, preceded by the existing same-origin server validation. All six current forms share one verified receiving inbox, `NeuroZehn@outlook.com`, and use distinct subjects. The form key routes mail to the inbox verified in Web3Forms; the website cannot verify that mapping by inspecting the key.

## Client action

1. Open [Web3Forms](https://app.web3forms.com/), choose Continue with Email and use `NeuroZehn@outlook.com`.
2. The client reviews the provider's terms and privacy policy and completes email verification themselves. No Outlook password or login verification code is needed by the developer.
3. Create a form for the NeuroZehn website, confirm that its receiving address is `NeuroZehn@outlook.com`, and share its form access key with the developer. This key is a public form identifier, not an account-login credential.

The provider account and inbox stay client-owned. A form access key is not fabricated or enabled before verification. The client's confirmation that a test email arrived is required before calling live email delivery verified.

## Activation

1. In the client's Web3Forms dashboard, review the receiving address, notification settings and submission retention. Select the shortest retention suitable for their stated needs; the application does not promise that the provider stores no data. Configure spam protection supported by the chosen plan.
2. Add `WEB3FORMS_ACCESS_KEY` to the existing Vercel project's Production environment. Do not commit it to source or replace it with an Outlook password. The access key is public by provider design; the authenticated webhook token, if used, remains server-only.
3. Redeploy the production site to load the environment setting. A missing or malformed key keeps the existing explicit email-app option. A valid key enables the submission buttons. Existing authenticated HTTPS webhook delivery remains an optional alternative; a configured Web3Forms key takes precedence for the current forms.
4. Submit one clearly labelled non-medical test from each form: contact, updates, course interest, student track, partner and research interest. Also check the short partner-brief path. Verify subject, all chosen fields, consent wording and reply address in the real receiving inbox. Check spam/junk. Coordinate or space tests to respect the per-visitor rate limit; do not disable production protection for testing.
5. Confirm that Reply targets the visitor's address and that each successful submission shows confirmation only after Web3Forms accepts it. Check a controlled failure in a non-production test to confirm retained fields and email fallback.
6. Check the free-plan quota in the dashboard and review usage during maintenance. The published allowance was 250 submissions/month on 2 November 2026. Exceeding it must not produce a false success message.

No automatic newsletter campaigns, research enrolment, guaranteed course place or application acceptance are implied by emailing an interest request. Update preferences are submitted to the team; ongoing list management remains an operational task.

## Technical behavior

- `/api/forms` validates origin/host, bounded JSON, consent, allowed options and honeypot before preparing the provider payload. On Vercel it uses the platform-controlled forwarded client address for the bounded process-local limiter; other hosting requires an explicitly trusted proxy. The limiter is not a shared distributed abuse-control service.
- Web3Forms returns a **202 preparation response** from our API. This is not message delivery. The browser then POSTs to the fixed official Web3Forms endpoint. Only HTTP success plus JSON `success: true` permits the UI confirmation and reset. HTTP 200 with `success: false`, malformed JSON, provider errors and timeouts retain the form and offer an email fallback. There are no automatic retries.
- Names and addresses are never embedded in navigation URLs. Form payloads and provider credentials are not logged. The website has no submission database. The provider and receiving mailbox may retain submissions under their own policies and settings; an enabled-state privacy notice describes that processing.
- The legacy `/api/enquiry` endpoint continues to support its existing authenticated webhook contract. The current six form types use `/api/forms`.

## Verification and current limit

31 automated tests, lint and the production build passed. Tests use synthetic keys and mocked provider responses; no real email was sent. Browser verification uses an isolated local server and intercepts provider traffic, never enabling a synthetic key in production. Real receiving-inbox verification remains pending the client's verified form key and receipt confirmation.

Official references: [API contract and browser requirement](https://docs.web3forms.com/getting-started/api-reference), [React integration](https://docs.web3forms.com/how-to-guides/js-frameworks/react-js/react-js), [access keys](https://docs.web3forms.com/getting-started/faq), [current service and retention information](https://web3forms.com/), [pricing](https://web3forms.com/pricing), [Vercel request headers](https://vercel.com/docs/headers/request-headers).
