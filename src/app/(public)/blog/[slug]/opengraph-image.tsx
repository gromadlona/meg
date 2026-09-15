import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/posts";

// OG image dinamis per artikel: /blog/:slug/opengraph-image
// (file convention — otomatis masuk metadata openGraph + twitter).
// Runtime nodejs agar bisa baca frontmatter via fs.
export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  const title = post?.title ?? "MeGGi.dev";
  const description = post?.description ?? "Portfolio & blog pribadi.";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#09090b",
          color: "#fafafa",
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "linear-gradient(135deg,#4f46e5,#ec4899)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            M
          </div>
          <div style={{ fontSize: 28, color: "#a1a1aa" }}>MeGGi.dev — Blog</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1 }}>
            {title}
          </div>
          <div style={{ fontSize: 30, color: "#a1a1aa", lineHeight: 1.4 }}>
            {description}
          </div>
        </div>
        <div
          style={{
            height: 8,
            borderRadius: 4,
            background: "linear-gradient(90deg,#4f46e5,#8b5cf6,#ec4899)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
