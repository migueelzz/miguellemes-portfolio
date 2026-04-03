export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  published: boolean;
}

export interface Post extends PostMeta {
  content: string;
}

// Minimal browser-safe YAML frontmatter parser (no Buffer/Node.js deps)
function parseFrontmatter(raw: string): { data: Record<string, unknown>; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };

  const yamlStr = match[1];
  const content = match[2];
  const data: Record<string, unknown> = {};

  for (const line of yamlStr.split('\n')) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    const raw = line.slice(colonIdx + 1).trim();
    if (!key) continue;

    if (raw.startsWith('[') && raw.endsWith(']')) {
      // Inline array: ["a", "b"] or [a, b]
      data[key] = raw
        .slice(1, -1)
        .split(',')
        .map((v) => v.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean);
    } else if (raw === 'true') {
      data[key] = true;
    } else if (raw === 'false') {
      data[key] = false;
    } else {
      data[key] = raw.replace(/^["']|["']$/g, '');
    }
  }

  return { data, content };
}

// Vite reads all .md files at build time via import.meta.glob
const rawFiles = import.meta.glob('/src/content/posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

function slugFromPath(path: string): string {
  return path.split('/').pop()?.replace(/\.md$/, '') ?? '';
}

export function getAllPosts(): PostMeta[] {
  return Object.entries(rawFiles)
    .map(([path, raw]) => {
      const { data } = parseFrontmatter(raw);
      const slug = slugFromPath(path);
      return {
        slug,
        title: (data.title as string) ?? slug,
        date: (data.date as string) ?? '',
        description: (data.description as string) ?? '',
        tags: (data.tags as string[]) ?? [],
        published: data.published !== false,
      } as PostMeta;
    })
    .filter((p) => p.published)
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getPostBySlug(slug: string): Post | null {
  const entry = Object.entries(rawFiles).find(
    ([path]) => slugFromPath(path) === slug
  );
  if (!entry) return null;

  const [, raw] = entry;
  const { data, content } = parseFrontmatter(raw);

  return {
    slug,
    title: (data.title as string) ?? slug,
    date: (data.date as string) ?? '',
    description: (data.description as string) ?? '',
    tags: (data.tags as string[]) ?? [],
    published: data.published !== false,
    content,
  };
}
