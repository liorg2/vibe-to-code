import { NextResponse, type NextRequest } from "next/server";
import { isProtectedPath, SESSION_COOKIE } from "@/lib/protected";

export async function middleware(req: NextRequest) {
  if (!isProtectedPath(req.nextUrl.pathname)) return NextResponse.next();

  const session = req.cookies.get(SESSION_COOKIE)?.value;
  if (!session) {
    const login = new URL("/login", req.url);
    login.searchParams.set("next", req.nextUrl.pathname + req.nextUrl.search);
    return NextResponse.redirect(login);
  }

  if (process.env.NODE_ENV === "development" && process.env.DEV_AUTH_BYPASS === "1") {
    return NextResponse.next();
  }

  try {
    const { getAdminAuth } = await import("@/lib/firebase/admin");
    await getAdminAuth().verifySessionCookie(session, true);
    return NextResponse.next();
  } catch {
    const res = NextResponse.redirect(new URL("/login", req.url));
    res.cookies.delete(SESSION_COOKIE);
    return res;
  }
}

export const config = {
  matcher: ["/lesson", "/lesson/:path*", "/glossary", "/review", "/project", "/checklist", "/architectures", "/architectures/:path*"],
};
