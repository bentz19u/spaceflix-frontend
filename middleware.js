import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

let locales = ['en', 'fr'];

async function getLocale(request) {
  const cookieStore = await cookies();
  const preferredLanguage = cookieStore.get('preferredLanguage');

  if (!preferredLanguage) return 'en';

  if (locales.includes(preferredLanguage.value)) return preferredLanguage.value;

  return 'en';
}

export async function middleware(request) {
  // check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // redirect if there is no locale
  const locale = await getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;

  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/` and '/public' common files
  matcher: '/((?!api|static|.*\\..*|_next).*)',
};
