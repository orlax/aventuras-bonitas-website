import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import Negotiator from "negotiator";
import { match } from "@formatjs/intl-localematcher"
import { DEFAULT_LOCALE, LOCALES } from "@/dictionaries";

function getLocale(request: NextRequest) {
    const acceptedLanguage = request.headers.get('accept-language') ?? undefined
    const languages = new Negotiator({ headers: { 'accept-language': acceptedLanguage } }).languages();
    return match(languages, LOCALES, DEFAULT_LOCALE);
}
 
export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl
  const pathnameHasLocale = LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
 
  if (pathnameHasLocale) return;
 
  // Redirect if there is no locale
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return NextResponse.redirect(request.nextUrl)
}
 
export const config = {
  matcher: [
    // matcher solution for public assets/api routes/_next exclusion
    '/((?!api|static|.*\\..*|_next|favicon.ico).*)',
  ],
}