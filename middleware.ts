import { NextResponse, type NextRequest } from "next/server";
import { isLang, stripLang } from "@/lib/lang";
import { isProtectedPath, SESSION_COOKIE } from "@/lib/protected";
import type { Lang } from "@/lib/types";

function pickLang(req: NextRequest): Lang {
  const cookie = req.cookies.get("vibe.lang")?.value;
  if (isLang(cookie)) return cookie;
  const accept = (req.headers.get("accept-language") ?? "").toLowerCase();
  return accept.includes("he") ? "he" : "en";
}

/** ponytail: files stay unprefixed; the locale lives in the public URL via rewrite */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const first = pathname.split("/")[1];

  if (!isLang(first)) {
    const url = req.nextUrl.clone();
    url.pathname = `/${pickLang(req)}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url);
  }

  const lang = first;
  const rest = stripLang(pathname);
  const headers = new Headers(req.headers);
  headers.set("x-vibe-lang", lang);
  // the rewrite hides the locale from the app; metadata needs it back for canonical + hreflang
  headers.set("x-vibe-path", rest);

  if (isProtectedPath(rest) && !req.cookies.get(SESSION_COOKIE)?.value) {
    const login = new URL(`/${lang}/login`, req.url);
    login.searchParams.set("next", pathname + req.nextUrl.search);
    return NextResponse.redirect(login);
  }

  const url = req.nextUrl.clone();
  url.pathname = rest;
  const res = NextResponse.rewrite(url, { request: { headers } });
  res.cookies.set("vibe.lang", lang, { path: "/", maxAge: 31536000, sameSite: "lax" });
  return res;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
