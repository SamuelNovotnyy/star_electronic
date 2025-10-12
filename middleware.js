/** @format */
import { locales, defaultLocale } from "./i18n.config";
import { NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request) {
  const { pathname } = request.nextUrl;
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/uploads") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  const cookies = request.cookies;
  const preferred = cookies.get("locale")?.value;

  if (!hasLocale) {
    const to = locales.includes(preferred) ? preferred : defaultLocale;
    const url = request.nextUrl.clone();
    url.pathname = `/${to}${pathname}`;
    const res = NextResponse.redirect(url);
    res.cookies.set("locale", to, { path: "/", maxAge: 60 * 60 * 24 * 365 });
    return res;
  }

  // If URL has a locale that doesn't match cookie, sync cookie
  const current = pathname.split("/").filter(Boolean)[0];
  if (current && current !== preferred) {
    const res = NextResponse.next();
    res.cookies.set("locale", current, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
    return res;
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|uploads).*)",
  ],
};
