"use client";

import * as React from "react";
import { Github, Star, GitFork, ExternalLink, Pin } from "lucide-react";
import { siteConfig } from "@/data/site";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ContributionGraph } from "@/components/contribution-graph";
import type { ContributionData, GithubStats, PinnedRepo } from "@/types";

type Status = "loading" | "ready" | "error";

const LANG_COLORS: Record<string, string> = {
  JavaScript: "#F1E05A",
  TypeScript: "#3178C6",
  Python: "#3572A5",
  HTML: "#E34C26",
  CSS: "#563D7C",
  Java: "#B07219",
  "C++": "#F34B7D",
  C: "#555555",
  PHP: "#4F5D95",
  Go: "#00ADD8",
  Rust: "#DEA584",
};

const SKELETON =
  "animate-shimmer rounded-lg bg-gradient-to-r from-foreground/[0.03] via-foreground/[0.07] to-foreground/[0.03] bg-[length:400%_100%]";

export function GithubSection() {
  const [stats, setStats] = React.useState<GithubStats | null>(null);
  const [contrib, setContrib] = React.useState<ContributionData | null>(null);
  const [pinned, setPinned] = React.useState<PinnedRepo[]>([]);
  const [status, setStatus] = React.useState<Status>("loading");
  const [contribStatus, setContribStatus] = React.useState<Status>("loading");
  const [pinnedStatus, setPinnedStatus] = React.useState<Status>("loading");

  React.useEffect(() => {
    let cancelled = false;

    async function loadWithRetry<T>(
      url: string,
      onSuccess: (data: T) => void,
      onError: () => void,
      attempt = 1,
    ) {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("request failed");
        const data = (await res.json()) as T;
        if (cancelled) return;
        onSuccess(data);
      } catch {
        if (cancelled) return;
        if (attempt < 2) {
          setTimeout(
            () => loadWithRetry(url, onSuccess, onError, attempt + 1),
            1200,
          );
        } else {
          onError();
        }
      }
    }

    loadWithRetry<{ stats: GithubStats }>(
      "/api/github",
      (data) => {
        setStats(data.stats);
        setStatus("ready");
      },
      () => setStatus("error"),
    );

    loadWithRetry<ContributionData>(
      "/api/contributions",
      (data) => {
        setContrib(data);
        setContribStatus("ready");
      },
      () => setContribStatus("error"),
    );

    loadWithRetry<{ repos: PinnedRepo[] }>(
      "/api/pinned-repos",
      (data) => {
        setPinned(data.repos ?? []);
        setPinnedStatus("ready");
      },
      () => setPinnedStatus("error"),
    );

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="github" className="border-b border-border py-28 lg:py-32">
      <div className="container-px">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-[640px]">
            <div className="section-eyebrow">GitHub</div>
            <h2 className="font-display text-[29px] font-semibold tracking-[-0.01em]">
              Live from GitHub
            </h2>
            <p className="mt-3.5 max-w-[56ch] text-muted-foreground">
              Pulled directly from the GitHub API — updates automatically.
            </p>
          </div>
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline">
              <Github size={15} />
              View Profile
            </Button>
          </a>
        </div>

        {status === "error" ? (
          <p className="rounded-xl border border-border bg-card p-5 text-sm text-muted-foreground">
            GitHub data couldn&apos;t be loaded right now. Visit the profile
            directly using the button above.
          </p>
        ) : (
          <Card className="p-6 sm:p-8">
            <div className="mb-[26px] flex flex-wrap gap-9">
              {[
                { label: "Public Repos", value: stats?.publicRepos },
                { label: "Followers", value: stats?.followers },
                { label: "Following", value: stats?.following },
              ].map((s) => (
                <div key={s.label}>
                  <strong className="text-gradient block font-display text-[28px] font-semibold">
                    {status === "loading" ? "—" : s.value}
                  </strong>
                  <span className="font-mono text-xs text-faint">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="min-h-[172px] overflow-x-auto rounded-xl border border-border bg-foreground/[0.015] p-[26px]">
              <p className="mb-5 text-sm font-semibold">
                Contribution activity
              </p>
              {contribStatus === "loading" && (
                <div className={`h-[100px] ${SKELETON}`} />
              )}
              {contribStatus === "error" && (
                <p className="text-sm text-muted-foreground">
                  Contribution data couldn&apos;t be loaded right now.
                </p>
              )}
              {contribStatus === "ready" && contrib && (
                <ContributionGraph days={contrib.contributions} />
              )}
            </div>

            <div className="mt-7">
              <p className="mb-4 flex items-center gap-2 text-sm font-semibold">
                <Pin size={15} className="text-accent" /> Pinned Projects
              </p>

              {pinnedStatus === "loading" && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className={`h-[120px] ${SKELETON}`} />
                  <div className={`h-[120px] ${SKELETON}`} />
                </div>
              )}

              {pinnedStatus === "error" && (
                <p className="rounded-xl border border-dashed border-border-strong p-7 text-center text-[13.5px] text-muted-foreground">
                  Pinned projects couldn&apos;t be loaded right now.{" "}
                  <a
                    href={siteConfig.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-accent"
                  >
                    View them on GitHub ↗
                  </a>
                </p>
              )}

              {pinnedStatus === "ready" && pinned.length === 0 && (
                <p className="rounded-xl border border-dashed border-border-strong p-7 text-center text-[13.5px] text-muted-foreground">
                  No pinned repositories yet — pin your favorite projects on
                  your{" "}
                  <a
                    href={siteConfig.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-accent"
                  >
                    GitHub profile
                  </a>{" "}
                  and they&apos;ll show up here automatically.
                </p>
              )}

              {pinnedStatus === "ready" && pinned.length > 0 && (
                <div className="grid gap-4 sm:grid-cols-2">
                  {pinned.slice(0, 6).map((repo) => {
                    const link =
                      repo.link ??
                      (repo.owner
                        ? `https://github.com/${repo.owner}/${repo.repo}`
                        : `${siteConfig.links.github}/${repo.repo}`);
                    const color =
                      repo.languageColor ??
                      (repo.language
                        ? LANG_COLORS[repo.language]
                        : undefined) ??
                      "hsl(var(--accent))";
                    return (
                      <a
                        key={repo.repo}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-xl border border-border bg-foreground/[0.015] px-5 py-[18px] transition-[transform,border-color] duration-200 ease-smooth hover:-translate-y-[3px] hover:border-accent/35"
                      >
                        <div className="flex items-start justify-between gap-2.5">
                          <h3 className="font-mono text-[13.5px] font-semibold">
                            {repo.repo}
                          </h3>
                          <ExternalLink
                            size={14}
                            className="mt-0.5 flex-none text-faint"
                          />
                        </div>
                        <p className="mt-2 min-h-[34px] text-[13px] leading-relaxed text-muted-foreground">
                          {repo.description ?? "No description provided."}
                        </p>
                        <div className="mt-3.5 flex items-center gap-3.5 text-xs text-faint">
                          {repo.language && (
                            <span className="flex items-center gap-1.5">
                              <span
                                className="h-[9px] w-[9px] rounded-full"
                                style={{ background: color }}
                              />
                              {repo.language}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Star size={12} />
                            {repo.stars}
                          </span>
                          <span className="flex items-center gap-1">
                            <GitFork size={12} />
                            {repo.forks}
                          </span>
                        </div>
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          </Card>
        )}
      </div>
    </section>
  );
}
