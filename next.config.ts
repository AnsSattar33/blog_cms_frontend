import type { NextConfig } from "next";

const backendUrl = process.env.BACKEND_URL?.replace(/\/$/, "");

const nextConfig: NextConfig = {
  env: {
    // Force same-origin /api in the browser whenever the proxy backend is configured.
    // Prevents accidental third-party cookie calls to an absolute NEXT_PUBLIC_API_URL.
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
