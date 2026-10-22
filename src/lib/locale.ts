export type Locale = "en" | "ur";
/** Draft interface translations; the client DOCX's Urdu cells were empty. Native review required. */
export const urdu: Record<string, string> = {
  Learn: "سیکھیں",
  "Brain Health": "دماغی صحت",
  Programmes: "پروگرام",
  Research: "تحقیق",
  "Research resources": "تحقیقی وسائل",
  "Projects & publications": "منصوبے اور اشاعتیں",
  Datasets: "ڈیٹا سیٹس",
  People: "ہماری ٹیم",
  "Partner With Us": "ہمارے شراکت دار بنیں",
  About: "ہمارے بارے میں",
  Contact: "رابطہ",
  Home: "ابتدائی صفحہ",
  "Brain health, learned and built together.":
    "دماغی صحت، مل کر سیکھیں، مل کر آگے بڑھیں۔",
  "Explore micro-credentials": "مختصر کورسز دیکھیں",
  "Become a founding partner": "بانی شراکت دار بنیں",
  "Join the waitlist": "انتظار کی فہرست میں شامل ہوں",
  "Register your interest": "اپنی دلچسپی درج کریں",
  "Register interest": "دلچسپی درج کریں",
  "Open now": "اب دستیاب",
  "Opening soon": "جلد دستیاب",
  "In planning": "منصوبہ بندی جاری ہے",
  "Certificate of completion": "تکمیل کا سرٹیفکیٹ",
  "Explore Learn": "تعلیمی مواقع دیکھیں",
  "Explore Brain Health": "دماغی صحت کے بارے میں جانیں",
  "See the catalogue": "کورسز کی فہرست دیکھیں",
  "See all programmes": "تمام پروگرام دیکھیں",
  "See the full roadmap": "مکمل منصوبہ دیکھیں",
  Subscribe: "رکنیت حاصل کریں",
  "Contact us": "ہم سے رابطہ کریں",
  "Send an enquiry": "استفسار بھیجیں",
  "Request the partner brief": "شراکت کی تفصیلات طلب کریں",
  "Apply for a student track": "طلبہ کے پروگرام میں درخواست دیں",
  "Back to top": "اوپر جائیں",
  "Understand your brain. Protect it. Know where to turn.":
    "اپنے دماغ کو سمجھیں۔ اس کی حفاظت کریں۔ جانیں کہ مدد کہاں سے حاصل کرنی ہے۔",
  "This is education, not a diagnosis or a replacement for your doctor.":
    "یہ تعلیمی معلومات ہیں، تشخیص یا آپ کے ڈاکٹر کا متبادل نہیں۔",
  "We are not a clinic and do not give medical advice. In an emergency, contact local emergency services.":
    "ہم کلینک نہیں ہیں اور طبی مشورہ نہیں دیتے۔ ہنگامی حالت میں مقامی ایمرجنسی سروسز سے رابطہ کریں۔",
  "A Pakistan-based institute for brain and mental health.":
    "دماغی اور ذہنی صحت کے لیے پاکستان میں قائم ایک ادارہ۔",
};
export function translate(text: string, locale: Locale) {
  return locale === "ur" ? (urdu[text] ?? text) : text;
}
export function localHref(href: string, locale: Locale) {
  if (!href.startsWith("/") || href.startsWith("//") || locale === "en")
    return href;
  return href === "/" ? "/ur" : `/ur${href}`;
}
export function routeLocale(path: string) {
  const locale: Locale =
    path === "/ur" || path.startsWith("/ur/") ? "ur" : "en";
  return { locale, path: locale === "ur" ? path.slice(3) || "/" : path };
}
