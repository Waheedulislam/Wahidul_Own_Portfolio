import { NextResponse } from "next/server";
import { siteConfig } from "@/data/site";
import type { GithubStats } from "@/types";

// Revalidate GitHub data every hour rather than fetching on every request.
export const revalidate = 3600;

export async function GET() {
  const username = siteConfig.github.username;
  const headers: HeadersInit = { Accept: "application/vnd.github+json" };
  // Optional: set GITHUB_TOKEN in your environment to raise the rate limit
  // (60/hr unauthenticated -> 5,000/hr authenticated).
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const userRes = await fetch(`https://api.github.com/users/${username}`, {
      headers,
      next: { revalidate },
    });

    if (!userRes.ok) {
      const userBody = await userRes.text();
      console.error("[api/github] GitHub API request failed", {
        username,
        userStatus: userRes.status,
        userBody,
        hint: !process.env.GITHUB_TOKEN
          ? "No GITHUB_TOKEN set — unauthenticated requests are limited to 60/hour and share that limit across your whole network/IP. Add GITHUB_TOKEN to .env.local to raise it to 5,000/hour."
          : undefined,
      });

      return NextResponse.json(
        { error: "GitHub API request failed", userStatus: userRes.status },
        { status: 502 }
      );
    }

    const user = await userRes.json();

    const stats: GithubStats = {
      login: user.login,
      name: user.name,
      avatarUrl: user.avatar_url,
      bio: user.bio,
      publicRepos: user.public_repos,
      followers: user.followers,
      following: user.following,
      htmlUrl: user.html_url,
    };

    return NextResponse.json({ stats });
  } catch (error) {
    console.error("[api/github] Failed to reach GitHub", error);
    return NextResponse.json(
      { error: "Failed to reach GitHub" },
      { status: 500 }
    );
  }
}
