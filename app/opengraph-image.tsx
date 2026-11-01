import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { hero, site } from "@/content";

export const alt = `${site.name}: ${hero.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const [font, photo] = await Promise.all([
    readFile(join(process.cwd(), "app/fonts/dm-serif-display-latin-400-normal.woff")),
    readFile(join(process.cwd(), "public/images/hero-chair.jpg")),
  ]);
  const bg = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#0e0c0a" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={bg} alt="" width={1200} height={750} style={{ position: "absolute", top: -60, left: 0, objectFit: "cover" }} />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background: "linear-gradient(90deg, rgba(14,12,10,0.95) 0%, rgba(14,12,10,0.7) 55%, rgba(14,12,10,0.25) 100%)",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 80px",
            color: "#ede6da",
          }}
        >
          <div style={{ display: "flex", fontSize: 22, letterSpacing: 6, color: "#c8a26b" }}>
            TAMPA, FLORIDA · EST. {site.established}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 24,
              fontFamily: "DM Serif",
              fontSize: 108,
              lineHeight: 1,
            }}
          >
            <span>Look sharp.</span>
            <span style={{ display: "flex" }}>
              Leave&nbsp;<span style={{ color: "#c8a26b" }}>better.</span>
            </span>
          </div>
          <div style={{ display: "flex", marginTop: 36, fontFamily: "DM Serif", fontSize: 40 }}>{site.name}</div>
          <div style={{ display: "flex", marginTop: 8, fontSize: 24, color: "#aaa093" }}>
            Cuts · Fades · Hot-towel shaves · Book online
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "DM Serif", data: font, weight: 400, style: "normal" }] },
  );
}
