# NeuroZehn UI / UX audit

2 November 2026 · Current local build · Product Design audit workflow

**Verdict:** the rebrand has a useful visual foundation, but the website does not yet meet the requested launch-quality standard. There is a genuine content-rendering defect, several unnecessarily difficult conversion flows, and a design system that has been applied unevenly. More animation will not resolve those problems. Repair the content and task flows first, then refine hierarchy, typography and figures.

This is an audit, not an implementation pass. No application files were changed, and nothing was pushed or deployed. The earlier QA missed the programme rendering defect; a passing build and route checks were insufficient evidence of visual completeness.

## Scope and evidence

Reviewed 18 distinct rendered routes through the in-app browser: `/`, `/learn`, `/learn/brain-health-essentials`, `/programmes`, `/research`, `/research/resources`, `/projects`, `/datasets`, `/people`, `/contact`, `/join`, `/ur`, `/brain-health`, `/brain-health/stroke`, `/partner`, `/about`, `/insights`, and `/insights/1`. Desktop viewport 1280×720; phone 390×720; additional homepage checks at 320×720 and 768×720. Forty-five numbered screenshots were captured during this run. Initial clipped desktop captures were rejected and replaced.

Full visual report and the original screenshot files:

`C:/Users/PC/.codex/visualizations/2026/11/02/neurozehn-audit/index.html`

Each numbered screenshot is linked in the visual report. Findings distinguish observed defects from design recommendations. Accessibility checks here are targeted, not a WCAG certification.

## Journey review

| Step | Visitor task / surface | Health | Evidence |
| --- | --- | --- | --- |
| 1 | Understand the homepage on desktop, phone and tablet | Needs improvement; hierarchy is oversized on narrow screens | 01, 02, 25, 39, 40 |
| 2 | Explore the homepage figures and programme links | Blocked by broken programme labels | 03–07, 37, 38 |
| 3 | Browse courses, search, recover from no results and inspect a course | Functional; important comparison details are hidden on listing | 08–13, 28 |
| 4 | Filter the twelve programmes | Functional; listing lacks a sense of relationships | 14–16 |
| 5 | Find research, resources, publications and datasets | Functional; long introductions and repetitive presentation slow access | 17–21 |
| 6 | Assess the people and institute background | Usable; profiles are uneven and repetitive | 22, 35 |
| 7 | Contact the team and join updates | High friction; separate email handoff and long mobile lead-in | 23, 24, 29, 30 |
| 8 | Read brain-health guidance and urgent contact information | Needs improvement; dense emergency block and unclear guide status | 31, 32 |
| 9 | Explore a partnership and request the brief | Functional; request uses a relatively heavy enquiry form | 33, 34 |
| 10 | Browse insights and open an article | Clear planning labels, but no article content at destination | 36, 45 |
| 11 | Use the Urdu interface | Partially translated; visitor-facing preview language needs refinement | 27 |
| 12 | Use keyboard, reduced motion and shared footer | Core checks pass; readability and spacing defects remain | 26, 41–44, DOM/style observations |

## Findings and recommended changes

Priority definitions: **P1** fix before calling the site polished / ready; **P2** substantial usability or presentation improvement; **P3** smaller polish. Recommendations that depend on client approval or operational setup are explicitly identified.

### P1 — Content and task-flow repairs

**01. The homepage programme list is broken.** All twelve names appear in the first link; the next eleven links have empty headings and no meaningful accessible names. Screenshot 06 and current DOM confirm eleven empty programme headings. The source splits a copy paragraph on ` · `, but the imported text contains ` Â· `. This inflates the first row and makes most destinations unidentifiable. Use the structured programme records for every label; never derive navigation by splitting a prose paragraph. Verify twelve distinct, named links on desktop and phone. Owner: `src/components/site/home.tsx:37` and `:183`.

**02. Imported copy has character corruption.** The live footer shows `Â©`; the homepage list shows `Â·`. Eight lines in `content/source/neurozehn/aligned.json` contain suspect encoding characters. Direct inspection of the DOCX XML shows proper © and ·, so this was introduced during integration, not supplied by the client. Repair the import/projection without changing scientific wording, then check the entire rendered copy. Evidence: 06, 43 and source inspection.

**03. Contact and waitlist completion depends on a separate email app.** Filling the contact form produces a large draft preview, then an `Email your enquiry` link. It does not deliver the message. The disclosure is honest, but this adds another app, another action and an unconfirmed outcome. Evidence: 12, 24, 30, 34. Preferred launch experience: configure the existing delivery integration, retain entered details on errors, and show success only after accepted delivery. If email handoff remains the chosen launch arrangement, simplify it to a clearly labelled email action with a copy fallback; do not suggest registration is already complete. Email-app opening and actual delivery were not triggered in this audit.

**04. The mobile contact form is buried.** At 390px, the first name input starts at approximately **1,442px** from the top. A large title, introductory copy and five repetitions of the same address come first. Evidence: 29 and DOM measurement. Show one contact address and response expectation, then the form. Keep topic selection inside the form; the duplicate directory does not route people to different inboxes.

**05. The course waitlist asks for too much too early.** Name, email, role, discipline, workplace, course, scholarship selection and consent are required, even on a course described as suitable for families and everyone. Evidence: 12–13. This is registration-level effort for an expression of interest. Recommend email, course and consent first, with other information optional or collected later. The client specified fields, so relax their required status only with explicit content/business sign-off; this is not a reason to fabricate data or silently remove approved requirements.

**06. Editorial instructions leak into live consent text.** The form literally includes `(link to Privacy Policy)` and then displays another Privacy Policy link. This text also appears in the prepared enquiry. Evidence: 12–13, 24, 30, 34 and DOM. Convert the instruction into the actual inline link, preserving the approved consent meaning. The wording should read as one sentence.

### P2 — Hierarchy, navigation and responsiveness

**07. The same large-title pattern is used for almost every task.** On the desktop projects page, the 720px viewport reaches filters and a count but no actual project. The datasets page reaches “Explore the data” but no dataset. On the contact page, the heading consumes space needed for the form. Evidence: 17–23, 29. Establish compact introductions for libraries and task pages, a readable article header, and a larger institutional homepage hero. Bring the first useful result into view earlier.

**08. The homepage lacks a disciplined content sequence.** Hero actions, audience doors, institution explanation, journey, research doors, statistics, twelve programmes, partnership invitation, roadmap, waitlist and another subscription section all compete. Mobile document height measured approximately **9,927px**, partly caused by the broken programme list. Evidence: 01–07, 25, 37–38, 42. Fix the defect before evaluating length again. Then make the first sequence: what is available → choose an audience/task → credible evidence/team → deeper programmes/roadmap → one closing action. Preserve the approved research and resources; improve hierarchy rather than deleting them.

**09. The mobile menu is an ungrouped thirteen-link scroll area.** Screenshot 26 shows primary navigation and research subsections mixed at one level, with People and the waitlist further down. Escape correctly closes it and restores focus. Group “Explore”, “Research” and “Institute”; put the waitlist in a clearly separate action. Reduce title/intro space and retain a visible close control and manageable scroll area. No need for a complex mega-menu.

**10. Small-phone and tablet headline sizing is too rigid.** The homepage uses a fixed 49px phone title. At 320px it wraps into five lines and the first action begins around y=712px. At 768px, a fixed 60px title occupies four lines in a narrow column while the image sits low beside it. Evidence: 39–40. Use fluid typography, intentional line length and a tablet-specific composition; reduce the top gap. Do not merely hide the illustration or clip content to pass an overflow check.

**11. Important supporting text is uncomfortably small.** Mobile institute descriptor is 8px; utility links are 11px; facts citations are 10px. In two narrow mobile columns, citations wrap into many short lines. Evidence: 25, 37 and computed styles. Establish a supporting-text floor around 12–13px and a comfortable reading size around 16px where appropriate; use one fact per row on phones. Keep citations accessible without giving them the same visual weight as the claim. Small size alone is not a WCAG failure, but it is a real readability problem here.

**12. The header consumes too much of a short mobile viewport.** It remains about 118px high at 390×720, before the page content begins. Evidence: 25–30, DOM measurement. Simplify the utility strip and brand descriptor at small sizes and consider a restrained compact-on-scroll header. Preserve language access and generous menu touch targets. Avoid adding a second persistent bar.

**13. Course cards do not support useful comparison.** The catalogue shows title, audience and status, but not supplied duration, delivery format or indicative fee. People must open individual courses to compare. Evidence: 09, 11, 28. Add a concise metadata row where the client has provided those details. Do not invent details for planned courses. Keep the search, status filter, result count and reset state—they worked.

**14. Availability language is not consistent at the point of action.** The course summary states early 2027 and exact first-intake fees, while the waitlist paragraph says the start date and fee will be shared “as soon as they are set.” The roadmap’s “Now” includes first micro-credentials, while the status strip says opening soon. A Stroke guide labelled opening soon can already be read. Evidence: 07, 11–12, 31–32. Distinguish “register interest now”, “teaching starts early 2027”, and “guide available / programme opening”. Reconcile labels against the client source before making factual changes.

**15. “Subscribe” overstates what the footer button does.** The footer takes the visitor to another form and carries the email in the query string; it does not subscribe them. Evidence: 30, 42, 44 and footer source. Use “Continue” / “Choose updates” for the current multi-step flow, or implement one concise consented signup. Avoid placing email addresses in navigation URLs where they remain in history and may enter logs. Keep an accurate success state.

**16. Emergency/support information is a dense paragraph rather than a usable tool.** Both the brain-health index and Stroke page combine warning signs, emergency services, several support contacts and hours in one small alert, repeated again later. Phone numbers are plain text rather than explicit call links. Evidence: 31–32 and DOM. Keep all client-supplied content, but separate urgent action, service name, number, availability and mental-health support. Use explicit `tel:` actions with visible labels. This audit does not validate clinical wording or whether those lines are operating.

**17. The Urdu experience reads like an internal preview.** It includes “Client-supplied key translations” and “native-language review is recommended” in English above the hero. Important actions are Urdu, while many headings, figures and forms are English. Evidence: 27 and DOM. Explain partial translation in visitor-friendly Urdu and English, make language changes and directions explicit, and remove internal production phrasing. Retain honest disclosure until full approved translation exists; do not generate unreviewed health translations to make the page look complete.

**18. The footer has visibly crowded adjacent links.** The email and “Ethics and privacy” run together without enough separation on desktop. All footer destinations share one flat grid, mixing core tasks and legal pages. Evidence: 43. Give the email its own row, space the ethics link, and group navigation by purpose. Retain the readable contrast of the entered email text.

### P2 — Visual identity, figures and trust

**19. The visual treatment is too repetitive for a content-rich institute.** Most pages use a large heading, a long grey paragraph and ruled text rows. Home and Learn reuse the same sculpture; research, people and editorial areas have little visual distinction. Evidence: 01, 08, 14, 17–23, 35–36. Define three related page families: institutional storytelling, discovery libraries and focused reading/task pages. Add relevant original scientific/process visuals where they explain the content, without implying measured results, facilities or staff photography that do not exist.

**20. The figures are accessible text, but do not yet meet the requested design ambition.** The journey is six library icons with a caption. The programme “atlas” is a filtered list rather than a relationship diagram. The facts are large numbers plus dense source copy. Evidence: 03, 14–16, 37–38. Improve the figure's explanatory job first: connect stages to approved next actions, show relationships between programmes with a readable list alternative, and clearly label numbers and units. Do not add spinning graphics or invented research charts. The current native buttons and pressed state should be retained.

**21. The People page has a visibly uneven profile hierarchy.** One founder receives a long two-column biography and large initials; the other has essentially one line. Scientific team members appear as names only, and the introductory community statement is repeated near the end. Evidence: 22 and DOM. Use an equal compact founder overview, expandable detailed biography where supplied, and a deliberate text-based scientific team list. Approved roles, links or portraits can enrich this later; do not invent missing biographies or credentials.

**22. Insights creates avoidable empty destinations.** All six cards are marked in planning; the opened first card has a title, planning notice and waitlist link but no article. Evidence: 36, 45. Keep planned topics as a non-clickable “Coming next” list until content exists, or explicitly label the action “Notify me”. Preserve existing URLs if needed; do not make a blank destination look like an available article.

### P3 — Finish and consistency

**23. The footer placeholder is too pale on white.** Computed placeholder colour `rgb(201,214,199)` against white is approximately **1.51:1**. Entered text is correctly dark navy. Evidence: 42–44 and computed styles. Use a darker neutral for the placeholder; retain the visible label. This is a measured contrast issue for that state, not a claim about every site colour.

**24. Several small labels and content repetitions make the interface feel unedited.** Examples: “1 programmes” after filtering, “Stay informed.” repeated in its own paragraph, and the same commitments paragraph under two About headings. Evidence: 07, 16, 30, 35 and DOM. Correct singular/plural output and remove redundant display text without changing approved meaning. In the facts band, the displayed source name and destination should also be presented consistently rather than naming a newspaper beside a government link.

**25. Mobile numbering and link titles lack breathing room.** In the research shortcut grid, “04” touches “Meet the team”; the small multi-column source layout also becomes cramped. Evidence: 37. Use explicit grid gaps and independent number/title columns at each breakpoint. Review long titles and translations rather than relying on desktop spacing to cascade into mobile.

## Confirmed strengths to preserve

- Core research, project, dataset and programme destinations remain discoverable; existing research has not been deleted.
- Course search reports the result count, produces a useful empty state and resets correctly.
- Programme filtering returns the expected one open-now record.
- Contact/course validation shows field errors and moves focus to the first invalid field.
- Contact draft completion receives focus and accurately states that nothing has been sent.
- The mobile dialog closes with Escape and restores focus to its trigger.
- Keyboard activation of Skip to content moves focus to `main#main`.
- With reduced-motion emulation, the hero's computed animation becomes `none`.
- No horizontal homepage overflow was observed at the tested 320, 390 and 768px widths; this does not make their composition optimal.
- No warning/error entries were returned by the audit tab's captured browser log inspection. This is not an exhaustive production error check.

## Repair order and acceptance

1. **Content integrity:** repair encoding and the twelve programme labels; remove editorial link instructions. Check the complete rendered copy, including Urdu and shared footer. Acceptance: all programme links have distinct names, no empty headings or stray encoding characters, original scientific facts retained.
2. **Completion paths:** configure delivery or intentionally simplify the email flow; bring mobile contact input upward; align subscription labels with real behavior; streamline expressions of interest within approved requirements. Acceptance: the next step is clear, successful delivery is never fabricated, and people can recover from validation/delivery failures.
3. **Page hierarchy:** create compact library/task headers, improve small-phone/tablet hero sizing, group navigation and reduce repeated invitations. Acceptance: users can reach a real result/action quickly and do not face multiple competing signups.
4. **Reading and figures:** increase supporting text, reflow facts to one column on phones, make urgent numbers actionable, improve the explanatory figures, standardize profiles and planned-content states. Acceptance: no dense tiny-print blocks, broken long titles, misleading status or empty editorial destinations.
5. **Visual and interaction QA:** capture the same viewports and states again, compare against this evidence, test keyboard and touch, and test production behavior. Add targeted checks for named programme links and source encoding—the failures that the previous checks missed. Do not use route counts or a successful build as a substitute for visual inspection.

## Limits

This review is broad across representative templates, not a screenshot of every one of the site's routes. The 18 routes above were actually opened; not every route was checked at every width. No real enquiry, email, subscription, clinical-support call or partnership request was sent. External papers/dataset sites and phone availability were not revalidated. A full screen-reader pass, real iOS/Android testing, 200%/400% browser zoom, production delivery/error states, network throttling, Lighthouse/Core Web Vitals measurements and an exhaustive colour-contrast scan remain outside this audit. Screenshot/read-only style evidence cannot establish full accessibility or medical-content compliance. No new claims, services or scientific information are proposed.
