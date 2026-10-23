export const config = { runtime: "edge" };

const GITHUB_USER = "migueelzz";

const QUERY = `{
  user(login: "${GITHUB_USER}") {
    pinnedItems(first: 6, types: REPOSITORY) {
      nodes {
        ... on Repository {
          name
          description
          url
          homepageUrl
          openGraphImageUrl
          primaryLanguage { name }
          repositoryTopics(first: 8) { nodes { topic { name } } }
        }
      }
    }
  }
}`;

interface PinnedRepoNode {
  name: string;
  description: string | null;
  url: string;
  homepageUrl: string | null;
  openGraphImageUrl: string;
  primaryLanguage: { name: string } | null;
  repositoryTopics: { nodes: { topic: { name: string } }[] };
}

// ["TypeScript", "typescript", "nestjs"] -> ["TypeScript", "nestjs"]
function uniqueIgnoringCase(values: (string | undefined)[]) {
  const seen = new Set<string>();
  return values.filter((v): v is string => {
    if (!v || seen.has(v.toLowerCase())) return false;
    seen.add(v.toLowerCase());
    return true;
  });
}

export default async function handler() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return Response.json({ error: "GITHUB_TOKEN not configured" }, { status: 500 });

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: { Authorization: `bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ query: QUERY }),
  });

  if (!res.ok) return Response.json({ error: `GitHub responded ${res.status}` }, { status: 502 });

  const { data } = await res.json();
  const nodes: PinnedRepoNode[] = data?.user?.pinnedItems?.nodes ?? [];

  const repos = nodes.map((repo) => ({
    name: repo.name,
    description: repo.description,
    url: repo.url,
    homepageUrl: repo.homepageUrl || null,
    thumb: repo.openGraphImageUrl,
    tech: uniqueIgnoringCase([
      repo.primaryLanguage?.name,
      ...repo.repositoryTopics.nodes.map((n) => n.topic.name),
    ]),
  }));

  return Response.json(repos, {
    headers: {
      // Pin/unpin on GitHub shows up within an hour, without a redeploy.
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
