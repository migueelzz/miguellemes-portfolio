export const config = { runtime: "edge" };

const GITHUB_USER = "migueelzz";

const QUERY = `{
  user(login: "${GITHUB_USER}") {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays { date contributionCount contributionLevel }
        }
      }
    }
  }
}`;

const LEVELS: Record<string, number> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

interface ContributionDay {
  date: string;
  contributionCount: number;
  contributionLevel: keyof typeof LEVELS;
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
  const calendar = data?.user?.contributionsCollection?.contributionCalendar;
  if (!calendar) return Response.json({ error: "No contribution data" }, { status: 502 });

  return Response.json(
    {
      total: calendar.totalContributions,
      // One array per week (Sunday first), each day as [date, count, level 0-4].
      weeks: calendar.weeks.map((week: { contributionDays: ContributionDay[] }) =>
        week.contributionDays.map((d) => [d.date, d.contributionCount, LEVELS[d.contributionLevel] ?? 0]),
      ),
    },
    {
      headers: {
        // New commits show up within ~10 minutes.
        "Cache-Control": "public, max-age=0, s-maxage=600, stale-while-revalidate=3600",
      },
    },
  );
}
