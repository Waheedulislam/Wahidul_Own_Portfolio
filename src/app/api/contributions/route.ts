import { NextResponse } from "next/server";
import { siteConfig } from "@/data/site";

// GitHub doesn't expose the contribution calendar via its public REST API,
// so this proxies the well-known community endpoint that scrapes the same
// calendar shown on a user's public profile page (no auth/token needed).
// See: https://github.com/grubersjoe/github-contributions-api
export const revalidate = 3600;

export async function GET(request: Request) {
  const username = siteConfig.github.username;
  const requestedYear = new URL(request.url).searchParams.get("year");
  const currentYear = new Date().getFullYear();
  const year = requestedYear === "last"
    ? "last"
    : requestedYear && /^\d{4}$/.test(requestedYear) && Number(requestedYear) >= 2008 && Number(requestedYear) <= currentYear
      ? requestedYear
      : "last";

  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=${year}`,
      { next: { revalidate } }
    );

    if (!res.ok) {
      console.error("[api/contributions] request failed", {
        username,
        status: res.status,
        body: await res.text(),
      });
      return NextResponse.json(
        { error: "Contributions API request failed" },
        { status: 502 }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("[api/contributions] Failed to reach contributions API", error);
    return NextResponse.json(
      { error: "Failed to reach contributions API" },
      { status: 500 }
    );
  }
}
