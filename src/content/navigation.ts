export const navigation = [
  ["Learn", "/learn"],
  ["Brain Health", "/brain-health"],
  ["Programmes", "/programmes"],
  ["Research", "/research"],
  ["Partner With Us", "/partner"],
  ["About", "/about"],
  ["Contact", "/contact"],
] as const;
export const footerLinks = [
  ...navigation.slice(0, 6),
  ["People", "/people"],
  ["Research resources", "/research/resources"],
  ["Projects & publications", "/projects"],
  ["Datasets", "/datasets"],
  ["Insights", "/insights"],
  ["Contact", "/contact"],
  ["Privacy Policy", "/privacy-policy"],
  ["Terms of Use", "/terms-of-use"],
  ["Cookie notice", "/cookies"],
  ["Accessibility", "/accessibility"],
] as const;
