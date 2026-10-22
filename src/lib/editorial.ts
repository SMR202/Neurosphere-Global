/** Display-only treatment of unanswered client fields. The original source stays verbatim. */
export function editorialText(text: string): string {
  return text
    .replace(
      "of [hours] learning hours over [weeks]",
      "with learning hours and duration to be announced",
    )
    .replace("[hours] over [weeks]", "duration to be announced")
    .replaceAll("[hours]", "duration to be announced")
    .replace("Fee: [fee].", "Fees will be announced before enrolment.")
    .replace("[fee levels]", "fee levels to be announced before enrolment")
    .replace("[to be confirmed]", "(measures to be confirmed)")
    .replace(
      /Content reviewed by \[reviewer name and role\], \[date\]\./g,
      "Content review details will be published when confirmed.",
    )
    .replace("We reply within [reply time]", "We review your enquiry")
    .replace("reply within [reply time]", "reply as soon as we can")
    .replace("reply by [date]", "contact you with the next steps")
    .replace("[city]", "a location to be confirmed")
    .replace(" [Registered name and number, once registered]", "")
    .replace(" [Emergency and crisis numbers for Pakistan]", "");
}
