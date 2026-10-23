import { ImageResponse } from "@vercel/og";

export const config = { runtime: "edge" };

const GITHUB_USER = "migueelzz";

type Node = { type: string; props: Record<string, unknown> };

// Tiny element helper so this file doesn't need a JSX toolchain.
const h = (type: string, style: Record<string, unknown>, children?: unknown, extra = {}): Node => ({
  type,
  props: { style, children, ...extra },
});

async function loadGoogleFont(family: string, weight: number, text: string) {
  // Without a modern User-Agent, Google Fonts serves TTF, which Satori supports (woff2 it doesn't).
  const url = `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, "+")}:wght@${weight}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const src = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
  if (!src) throw new Error(`Font ${family} not found`);
  return (await fetch(src)).arrayBuffer();
}

export default async function handler() {
  const title = "Software Developer";
  const name = "Miguel Lemes";
  const description =
    "Full stack developer focused on backend systems, scalable APIs, and AI-driven applications.";
  const domain = "miguellemes.vercel.app";

  // Always the current GitHub avatar, so updating the profile picture updates the preview.
  const avatar = `https://github.com/${GITHUB_USER}.png?size=400`;

  const fonts = await Promise.all([
    loadGoogleFont("Crimson Text", 400, title).then((data) => ({ name: "Crimson Text", data, weight: 400 as const })),
    loadGoogleFont("Inter", 400, name + description + domain + "Available for opportunities").then((data) => ({
      name: "Inter",
      data,
      weight: 400 as const,
    })),
  ]).catch(() => undefined);

  const tree = h(
    "div",
    {
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      gap: 56,
      padding: "0 80px",
      backgroundColor: "#0a0a0a",
      color: "#fafafa",
      fontFamily: "Inter",
    },
    [
      h("img", { width: 240, height: 240, borderRadius: 48, objectFit: "cover", border: "2px solid #262626" }, undefined, {
        src: avatar,
        width: 240,
        height: 240,
      }),
      h("div", { display: "flex", flexDirection: "column", flex: 1, gap: 16 }, [
        h("div", { display: "flex", alignItems: "center", gap: 12, fontSize: 24, color: "#a3a3a3" }, [
          h("div", { width: 14, height: 14, borderRadius: 999, backgroundColor: "#22c55e" }),
          "Available for opportunities",
        ]),
        h("div", { fontSize: 80, fontFamily: "Crimson Text", lineHeight: 1 }, title),
        h("div", { fontSize: 30, color: "#a3a3a3", lineHeight: 1.4 }, description),
        h("div", { display: "flex", gap: 16, marginTop: 16, fontSize: 24, color: "#737373" }, [
          h("div", {}, name),
          h("div", {}, "·"),
          h("div", {}, domain),
        ]),
      ]),
    ],
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return new ImageResponse(tree as any, {
    width: 1200,
    height: 630,
    fonts,
    headers: {
      // Re-render at most once a day at the edge.
      "Cache-Control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
