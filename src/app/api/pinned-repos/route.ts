import { NextResponse } from "next/server";
import { siteConfig } from "@/data/site";

// GitHub's REST API doesn't expose *which* repos a user has pinned (that's
// only available via the authenticated GraphQL API), so this proxies a
// public community service that reads the pinned section of the profile
// page directly — same pattern as the contributions route.
// See: https://github.com/egoist/gh-pinned-repos
export const revalidate = 3600;

export async function GET() {
  const username = siteConfig.github.username;

  try {
    const res = await fetch(
      `https://gh-pinned-repos.egoist.dev/?username=${username}`,
      { next: { revalidate } }
    );

    if (!res.ok) {
      console.error("[api/pinned-repos] request failed", {
        username,
        status: res.status,
        body: await res.text(),
      });
      return NextResponse.json(
        { error: "Pinned repos request failed" },
        { status: 502 }
      );
    }

    const data = await res.json();
    return NextResponse.json({ repos: Array.isArray(data) ? data : [] });
  } catch (error) {
    console.error("[api/pinned-repos] Failed to reach pinned-repos API", error);
    return NextResponse.json(
      { error: "Failed to reach pinned repos API" },
      { status: 500 }
    );
  }
}
