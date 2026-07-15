import type { NextConfig } from "next";

const backendUrl = process.env.BACKEND_URL?.replace(/\/$/, "");

const nextConfig: NextConfig = {
  env: {
    // When BACKEND_URL is set, the browser must call same-origin /api (proxied route handler).
    // This overrides a misconfigured absolute NEXT_PUBLIC_API_URL on Vercel.
    ...(backendUrl ? { NEXT_PUBLIC_API_URL: "/api" } : {}),
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "i.pravatar.cc" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
};

export default nextConfig;
