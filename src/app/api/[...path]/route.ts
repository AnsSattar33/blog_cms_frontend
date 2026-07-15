import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL?.replace(/\/$/, "");

const HOP_BY_HOP_HEADERS = new Set([
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailers",
  "transfer-encoding",
  "upgrade",
]);

type RouteContext = {
  params: Promise<{ path: string[] }>;
};

/**
 * Same-origin API proxy: browser → /api/* → Express backend.
 * Cookies become first-party on the frontend host (avoids third-party cookie blocks).
 */
async function proxyRequest(request: NextRequest, context: RouteContext) {
  if (!BACKEND_URL) {
    return NextResponse.json(
      { success: false, message: "BACKEND_URL is not configured" },
      { status: 500 }
    );
  }

  const { path } = await context.params;
  const targetPath = path.join("/");
  const targetUrl = `${BACKEND_URL}/api/${targetPath}${request.nextUrl.search}`;

  const headers = new Headers();
  request.headers.forEach((value, key) => {
    const lower = key.toLowerCase();
    if (lower === "host" || HOP_BY_HOP_HEADERS.has(lower)) return;
    headers.set(key, value);
  });

  const hasBody = !["GET", "HEAD"].includes(request.method);
  // Buffer the body so multipart uploads (e.g. cover images) are preserved intact.
  const body = hasBody ? await request.arrayBuffer() : undefined;

  const backendResponse = await fetch(targetUrl, {
    method: request.method,
    headers,
    body,
    redirect: "manual",
    cache: "no-store",
  });

  const responseHeaders = new Headers();
  backendResponse.headers.forEach((value, key) => {
    const lower = key.toLowerCase();
    if (HOP_BY_HOP_HEADERS.has(lower)) return;
    // Set-Cookie must be copied via getSetCookie() — forEach/get can corrupt values.
    if (lower === "set-cookie") return;
    responseHeaders.append(key, value);
  });

  const setCookies =
    typeof backendResponse.headers.getSetCookie === "function"
      ? backendResponse.headers.getSetCookie()
      : [];

  for (const cookie of setCookies) {
    responseHeaders.append("set-cookie", cookie);
  }

  return new NextResponse(backendResponse.body, {
    status: backendResponse.status,
    statusText: backendResponse.statusText,
    headers: responseHeaders,
  });
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const GET = proxyRequest;
export const POST = proxyRequest;
export const PUT = proxyRequest;
export const PATCH = proxyRequest;
export const DELETE = proxyRequest;
export const OPTIONS = proxyRequest;
