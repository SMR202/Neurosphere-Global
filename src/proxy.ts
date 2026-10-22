import { NextResponse, type NextRequest } from "next/server";
export function proxy(request: NextRequest) {
  const headers = new Headers(request.headers);
  const path = request.nextUrl.pathname;
  headers.set(
    "x-neurosphere-locale",
    path === "/ur" || path.startsWith("/ur/") ? "ur" : "en",
  );
  return NextResponse.next({ request: { headers } });
}
export const config = {
  matcher: [
    "/((?!api|_next|images|icon.svg|opengraph-image|robots.txt|sitemap.xml|favicon.ico).*)",
  ],
};
