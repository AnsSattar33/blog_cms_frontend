import { SESSION_COOKIE_NAME } from "@/lib/constants";

export function hasSessionCookie(cookieHeader?: string): boolean {
  if (!cookieHeader) return false;

  const cookies = cookieHeader.split(";").map((c) => c.trim());
  return cookies.some((cookie) => {
    const [name, ...valueParts] = cookie.split("=");
    return name === SESSION_COOKIE_NAME && valueParts.join("=").length > 0;
  });
}
