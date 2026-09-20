import { NextResponse, type NextRequest } from "next/server";
import { isProtectedPath, SESSION_COOKIE } from "@/lib/protected";

/** ponytail: middleware runs on Edge — cookie presence only; Admin SDK verifies in server layouts */
export function middleware(req: NextRequest) {
  if (!isProtectedPath(req.nextUrl.pathname)) return NextResponse.next();

  const session = req.cookies.get(SESSION_COOKIE)?.value;
  if (!session) {
    const login = new URL("/login", req.url);
    login.searchParams.set("next", req.nextUrl.pathname + req.nextUrl.search);
    return NextResponse.redirect(login);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/lesson",
    "/lesson/:path*",
    "/glossary",
    "/review",
    "/project",
    "/checklist",
    "/architectures",
    "/architectures/:path*",
  ],
};
