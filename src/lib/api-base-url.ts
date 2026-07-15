function normalizeBackendUrl(url: string): string {
  return url.replace(/\/$/, "");
}

/** True when the browser should call same-origin `/api` (Next.js proxy). */
export function isApiProxied(): boolean {
  const publicUrl = process.env.NEXT_PUBLIC_API_URL ?? "/api";
  return !publicUrl.startsWith("http");
}

/**
 * Axios base URL.
 *
 * - Browser: same-origin `/api` whenever NEXT_PUBLIC_API_URL is relative
 *   (forced to `/api` at build when BACKEND_URL is set — see next.config.ts).
 * - Server: call the Express origin directly via BACKEND_URL to avoid a
 *   server→Next→Express double hop during RSC.
 */
export function getApiBaseUrl(): string {
  const publicUrl = process.env.NEXT_PUBLIC_API_URL;
  const backendUrl = process.env.BACKEND_URL;

  if (typeof window !== "undefined") {
    if (isApiProxied()) {
      return publicUrl && publicUrl.startsWith("/") ? publicUrl : "/api";
    }
    // Legacy direct backend URL (third-party cookies — avoid in production).
    return publicUrl ?? "/api";
  }

  if (backendUrl?.startsWith("http")) {
    return `${normalizeBackendUrl(backendUrl)}/api`;
  }

  if (publicUrl?.startsWith("http")) {
    return publicUrl;
  }

  return publicUrl ?? "http://localhost:5000/api";
}
