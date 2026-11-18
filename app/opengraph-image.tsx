import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const runtime = "edge";
export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f3dcdf",
          padding: "72px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#a85666",
            fontWeight: 700,
          }}
        >
          New Jersey · Photography
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 92,
              color: "#3a2f3a",
              fontStyle: "italic",
              lineHeight: 1.05,
            }}
          >
            Impressions by AJ
          </div>
          <div style={{ fontSize: 34, color: "#5a4a52", marginTop: 16 }}>
            Capturing moments, frame by frame
          </div>
        </div>
        <div style={{ fontSize: 24, color: "#7a6670", display: "flex" }}>
          {`${site.email} · ${site.instagram}`}
        </div>
      </div>
    ),
    { ...size }
  );
}
