function normalizeBackendUrl(url: string): string {
  return url.replace(/\/$/, "");
}

export function getApiBaseUrl(): string {
  const publicUrl = process.env.NEXT_PUBLIC_API_URL;

  if (typeof window !== "undefined") {
    return publicUrl ?? "/api";
  }

  const backendUrl = process.env.BACKEND_URL;

  if (backendUrl?.startsWith("http")) {
    return `${normalizeBackendUrl(backendUrl)}/api`;
  }

  if (publicUrl?.startsWith("http")) {
    return publicUrl;
  }

  return publicUrl ?? "http://localhost:5000/api";
}
