import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { createServerClient } from "@supabase/ssr";
import { i18nConfig, type Locale } from "./infrastructure/i18n/config";

// Public-only paths: redirect authenticated users to dashboard
const PUBLIC_ONLY_PATHS = ["/login", "/register", "/forgot-password", "/"];

// Auth-only paths: redirect anonymous users to login
const AUTH_ONLY_PATHS = ["/dashboard"];

function getPreferredLocale(request: NextRequest): Locale {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    negotiatorHeaders[key] = value;
  });

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  const locale = match(
    languages,
    i18nConfig.locales,
    i18nConfig.defaultLocale,
  ) as Locale;

  return locale;
}

function stripLocale(pathname: string): string {
  for (const locale of i18nConfig.locales) {
    if (pathname.startsWith(`/${locale}/`))
      return pathname.slice(locale.length + 1);
    if (pathname === `/${locale}`) return "/";
  }
  return pathname;
}

function isPublicOnlyPath(pathWithoutLocale: string): boolean {
  return PUBLIC_ONLY_PATHS.some(
    (p) => pathWithoutLocale === p || pathWithoutLocale.startsWith(`${p}/`),
  );
}

function isAuthOnlyPath(pathWithoutLocale: string): boolean {
  return AUTH_ONLY_PATHS.some(
    (p) => pathWithoutLocale === p || pathWithoutLocale.startsWith(`${p}/`),
  );
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = i18nConfig.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (!pathnameHasLocale) {
    const locale = getPreferredLocale(request);
    request.nextUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
  }

  const response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathWithoutLocale = stripLocale(pathname);
  const locale = pathname.split("/")[1] as Locale;
  const publicOnly = isPublicOnlyPath(pathWithoutLocale);
  const authOnly = isAuthOnlyPath(pathWithoutLocale);

  // Redirect anonymous users from auth-only paths to login
  if (!user && authOnly) {
    request.nextUrl.pathname = `/${locale}/login`;
    return NextResponse.redirect(request.nextUrl);
  }

  // Redirect authenticated users from public-only paths (except home) to dashboard
  if (user && publicOnly) {
    request.nextUrl.pathname = `/${locale}/templates`;
    return NextResponse.redirect(request.nextUrl);
  }

  return response;
}

export const config = {
  matcher: [`/((?!_next|api|favicon.ico|.*\\..*).*)`],
};
