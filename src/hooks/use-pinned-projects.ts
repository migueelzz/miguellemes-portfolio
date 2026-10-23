import { useQuery } from "@tanstack/react-query";
import { projects, type Project } from "@/data/projects";

interface PinnedRepo {
  name: string;
  description: string | null;
  url: string;
  homepageUrl: string | null;
  thumb: string;
  tech: string[];
}

// Pinned repos decide which projects show (and in which order). If a repo also
// exists in src/data/projects.ts, its hand-written title/description/tech win.
function toProject(repo: PinnedRepo): Project {
  const local = projects.find((p) => p.githubUrl.toLowerCase() === repo.url.toLowerCase());
  return {
    title: local?.title ?? repo.name,
    description: local?.description ?? repo.description ?? "",
    thumb: repo.thumb,
    tech: local?.tech ?? repo.tech,
    liveUrl: repo.homepageUrl ?? local?.liveUrl,
    githubUrl: repo.url,
    featured: true,
  };
}

const fallback = projects.filter((p) => p.featured);

export function usePinnedProjects() {
  const { data } = useQuery({
    queryKey: ["pinned-projects"],
    queryFn: async () => {
      const res = await fetch("/api/pinned");
      if (!res.ok) throw new Error(`Failed to load pinned repos: ${res.status}`);
      const repos: PinnedRepo[] = await res.json();
      return repos.map(toProject);
    },
    staleTime: Infinity,
    retry: false,
  });

  return data?.length ? data : fallback;
}
