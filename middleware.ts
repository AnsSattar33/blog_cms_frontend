import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { hasSessionCookie } from "@/features/auth/session";

const protectedPaths = ["/dashboard"];

function usesSameOriginApi(): boolean {
  if (process.env.BACKEND_URL) return true;

  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "/api";
  return !apiUrl.startsWith("http");
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Legacy direct API mode: session cookie lives on the backend host, not here.
  // Prefer BACKEND_URL + /api proxy so cookies are first-party on this host.
  if (!usesSameOriginApi()) {
    return NextResponse.next();
  }

  const isProtected = protectedPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );
  const isLoginPage = pathname === "/login";
  const authenticated = hasSessionCookie(request.cookies.toString());

  if (isProtected && !authenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isLoginPage && authenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
