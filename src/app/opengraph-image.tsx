import { ImageResponse } from "next/og";

export const alt = "Blog CMS — Articles on technology, design, and business";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0e1117",
          color: "#eef0f6",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 1.1,
          }}
        >
          Blog CMS
        </div>
        <div
          style={{
            marginTop: 20,
            width: 96,
            height: 3,
            backgroundColor: "#6b7fd7",
          }}
        />
        <div
          style={{
            marginTop: 24,
            fontSize: 28,
            color: "#8b93a8",
          }}
        >
          Articles on technology, design, and business
        </div>
      </div>
    ),
    { ...size }
  );
}
