import { ImageResponse } from "next/og";
import { profile } from "@/lib/content";

export const alt = `${profile.name} · Full Stack Developer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Social-share card drawn in the site's retro-window style: cream
   desktop, hard-shadow window with traffic dots, name + role + status.
   Satori only supports flexbox, so everything is flex containers. */
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f4ede4",
          backgroundImage:
            "radial-gradient(ellipse at 12% 18%, rgba(244,154,58,0.18) 0%, rgba(244,154,58,0) 38%)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: 920,
            borderRadius: 16,
            border: "3px solid #1a1a1a",
            backgroundColor: "#fffdf8",
            boxShadow: "10px 10px 0 #1a1a1a",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "18px 26px",
              borderBottom: "3px solid #1a1a1a",
              backgroundColor: "#f4ede4",
            }}
          >
            <div style={{ width: 22, height: 22, borderRadius: 11, border: "2.5px solid #1a1a1a", backgroundColor: "#ff5f57" }} />
            <div style={{ width: 22, height: 22, borderRadius: 11, border: "2.5px solid #1a1a1a", backgroundColor: "#febc2e" }} />
            <div style={{ width: 22, height: 22, borderRadius: 11, border: "2.5px solid #1a1a1a", backgroundColor: "#28c840" }} />
            <div style={{ display: "flex", marginLeft: 18, fontSize: 26, color: "#6b6b6b" }}>
              portfolio.mdx
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", padding: "54px 60px 60px" }}>
            <div style={{ display: "flex", fontSize: 72, fontWeight: 800, color: "#1a1a1a" }}>
              {profile.name}
            </div>
            <div style={{ display: "flex", marginTop: 16, fontSize: 38, color: "#3f3f3f" }}>
              {profile.role}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 40 }}>
              <div style={{ width: 18, height: 18, borderRadius: 9, backgroundColor: "#10b981" }} />
              <div style={{ display: "flex", fontSize: 28, color: "#4b4b4b" }}>
                {profile.status}
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
