export function hasSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    const source = new URL(origin);
    const target = new URL(request.url);
    // Next may use its internal localhost address in Request.url. The incoming
    // Host is the address the browser actually contacted. Do not use an
    // arbitrary X-Forwarded-Host as an alternative allowed origin.
    const host = request.headers.get("host")?.toLowerCase() || target.host;
    return (
      source.origin === origin &&
      ["http:", "https:"].includes(source.protocol) &&
      source.protocol === target.protocol &&
      source.host === host
    );
  } catch {
    return false;
  }
}
