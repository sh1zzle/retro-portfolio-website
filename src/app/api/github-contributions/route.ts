import { profile } from "@/lib/content";

/* Last year's contribution calendar for the About tab's activity card.
   Private-repo contributions arrive as day counts only, with no repo
   names, so client work stays anonymous. The token stays on the server;
   the CDN holds a good response for a day, and failures are not cached
   so the next visit tries again. */

export type ContributionDay = { date: string; count: number };
export type ContributionsPayload = {
  login: string;
  total: number;
  weeks: ContributionDay[][];
};

type GraphQLResponse = {
  data?: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: { contributionDays: { date: string; contributionCount: number }[] }[];
        };
      };
    } | null;
  };
  errors?: { message: string }[];
};

const QUERY = `query($login: String!) {
  user(login: $login) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks { contributionDays { date contributionCount } }
      }
    }
  }
}`;

function unavailable(reason: string, status: number) {
  return Response.json({ error: reason }, { status, headers: { "Cache-Control": "no-store" } });
}

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return unavailable("GITHUB_TOKEN is not set", 503);

  const login = new URL(profile.github).pathname.replace(/\//g, "");

  let body: GraphQLResponse;
  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "devpresso-portfolio",
      },
      body: JSON.stringify({ query: QUERY, variables: { login } }),
      cache: "no-store",
    });
    if (!res.ok) return unavailable(`GitHub responded ${res.status}`, 502);
    body = (await res.json()) as GraphQLResponse;
  } catch (err) {
    console.error("github-contributions: request failed", err);
    return unavailable("GitHub request failed", 502);
  }

  const calendar = body.data?.user?.contributionsCollection.contributionCalendar;
  if (!calendar) {
    console.error("github-contributions: no calendar", body.errors);
    return unavailable("GitHub returned no calendar", 502);
  }

  const payload: ContributionsPayload = {
    login,
    total: calendar.totalContributions,
    weeks: calendar.weeks.map((w) =>
      w.contributionDays.map((d) => ({ date: d.date, count: d.contributionCount })),
    ),
  };
  return Response.json(payload, {
    headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=86400" },
  });
}
