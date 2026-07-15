function normalizeBackendUrl(url: string): string {
  return url.replace(/\/$/, "");
}

export function isApiProxied(): boolean {
  const publicUrl = process.env.NEXT_PUBLIC_API_URL ?? "/api";
  return !publicUrl.startsWith("http");
}

export function getApiBaseUrl(): string {
  const publicUrl = process.env.NEXT_PUBLIC_API_URL;
  const backendUrl = process.env.BACKEND_URL;

  if (typeof window !== "undefined") {
    return isApiProxied() ? "/api" : (publicUrl ?? "/api");
  }

  if (backendUrl?.startsWith("http")) {
    return `${normalizeBackendUrl(backendUrl)}/api`;
  }

  if (publicUrl?.startsWith("http")) {
    return publicUrl;
  }

  return publicUrl ?? "http://localhost:5000/api";
}
