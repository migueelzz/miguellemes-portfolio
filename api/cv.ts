export const config = { runtime: "edge" };

// The CV PDFs live in a GitHub repo, so updating them is just a commit/upload there.
// Override with the CV_REPO / CV_BRANCH / CV_DIR env vars on Vercel if needed.
const REPO = process.env.CV_REPO || "migueelzz/migueelzz";
const BRANCH = process.env.CV_BRANCH || "main";
const DIR = process.env.CV_DIR || "cv";

const FILES = {
  en: { path: "cv-miguel-lemes-en.pdf", download: "Miguel-Lemes-CV-English.pdf" },
  pt: { path: "cv-miguel-lemes-pt.pdf", download: "Miguel-Lemes-CV-Portugues.pdf" },
} as const;

export default async function handler(req: Request) {
  const url = new URL(req.url);
  const lang = url.searchParams.get("lang") === "pt" ? "pt" : "en";
  const file = FILES[lang];

  const headers: Record<string, string> = { Accept: "application/vnd.github.raw" };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `bearer ${process.env.GITHUB_TOKEN}`;

  const res = await fetch(
    `https://api.github.com/repos/${REPO}/contents/${DIR}/${file.path}?ref=${BRANCH}`,
    { headers },
  );

  // Fall back to the copy bundled with the site.
  if (!res.ok) return Response.redirect(new URL(`/${file.path}`, url), 302);

  return new Response(res.body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${file.download}"`,
      "Cache-Control": "public, max-age=0, s-maxage=300, stale-while-revalidate=3600",
    },
  });
}
