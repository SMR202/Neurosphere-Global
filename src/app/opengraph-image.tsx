import { ImageResponse } from "next/og";
export const alt = "NeuroSphere — Brain health, learned and built together.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          background: "#f6f6f2",
          color: "#123d36",
          padding: 65,
        }}
      >
        <div style={{ fontSize: 28, display: "flex" }}>NeuroSphere</div>
        <div
          style={{
            fontSize: 68,
            lineHeight: 1.12,
            letterSpacing: -2,
            maxWidth: 1040,
          }}
        >
          Brain health, learned and built together.
        </div>
        <div
          style={{
            display: "flex",
            borderTop: "1px solid #a0aa91",
            paddingTop: 24,
            fontSize: 23,
          }}
        >
          Learn · Brain Health · Programmes · Research · Partner With Us
        </div>
      </div>
    ),
    size,
  );
}
