"use client";

import * as React from "react";
import { Github, Star, GitFork, ExternalLink, Pin, FolderGit2, Users, UserPlus } from "lucide-react";
import { siteConfig } from "@/data/site";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ContributionGraph } from "@/components/contribution-graph";
import type { ContributionData, GithubStats, PinnedRepo } from "@/types";

type Status = "loading" | "ready" | "error";
type ContributionPeriod = number | "last";

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
  const [contribPeriod, setContribPeriod] = React.useState<ContributionPeriod | null>(null);
  const [pinned, setPinned] = React.useState<PinnedRepo[]>([]);
  const [status, setStatus] = React.useState<Status>("loading");
  const [contribStatus, setContribStatus] = React.useState<Status>("loading");
  const [pinnedStatus, setPinnedStatus] = React.useState<Status>("loading");
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = React.useState<number | null>(null);
  const years = React.useMemo(
    () => Array.from({ length: 5 }, (_, index) => currentYear - index),
    [currentYear],
  );

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

  React.useEffect(() => {
    let cancelled = false;
    setContribStatus("loading");
    const period: ContributionPeriod = selectedYear ?? "last";

    async function loadContributions(attempt = 1): Promise<void> {
      try {
        const res = await fetch(`/api/contributions?year=${period}`);
        if (!res.ok) throw new Error("request failed");
        const data = (await res.json()) as ContributionData;
        if (cancelled) return;
        setContrib(data);
        setContribPeriod(period);
        setContribStatus("ready");
      } catch {
        if (cancelled) return;
        if (attempt < 2) {
          window.setTimeout(() => void loadContributions(attempt + 1), 1200);
        } else {
          setContribStatus("error");
        }
      }
    }

    void loadContributions();
    return () => {
      cancelled = true;
    };
  }, [selectedYear]);

  return (
    <section id="github" className="section-y border-b border-border">
      <div className="container-px">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4 sm:mb-12">
          <div className="max-w-[640px]">
            <div className="section-eyebrow">GitHub</div>
            <h2 className="font-display text-[25px] font-semibold tracking-[-0.01em] sm:text-[29px]">
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
            className="w-full sm:w-auto"
          >
            <Button variant="outline" className="w-full sm:w-auto">
              <Github size={15} />
              View Profile
            </Button>
          </a>
        </div>

        <div className="mb-6 grid gap-3 sm:grid-cols-3 sm:gap-4">
          {[
            { label: "Public repositories", value: stats?.publicRepos, icon: FolderGit2, accent: "text-accent" },
            { label: "Followers", value: stats?.followers, icon: Users, accent: "text-teal" },
            { label: "Following", value: stats?.following, icon: UserPlus, accent: "text-accent" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="group relative overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-card transition-[transform,border-color,box-shadow] duration-200 ease-smooth hover:-translate-y-1 hover:border-accent/45 hover:shadow-glow sm:p-5">
                <span aria-hidden="true" className="absolute -right-5 -top-5 h-20 w-20 rounded-full bg-accent/[0.09] blur-2xl" />
                <div className="relative flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-faint">{item.label}</p>
                    <strong className="mt-2 block font-display text-[28px] font-semibold leading-none tracking-[-0.03em] sm:text-[32px]">
                      {status === "loading" ? "—" : item.value ?? "—"}
                    </strong>
                  </div>
                  <span className={`flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-foreground/[0.045] sm:h-10 sm:w-10 ${item.accent}`}>
                    <Icon size={18} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {status === "error" ? (
          <p className="rounded-xl border border-border bg-card p-5 text-sm text-muted-foreground">
            GitHub data couldn&apos;t be loaded right now. Visit the profile
            directly using the button above.
          </p>
        ) : (
          <Card className="p-4 sm:p-6 lg:p-8">
            <div className="rounded-xl border border-border bg-foreground/[0.015] p-3.5 sm:p-5 lg:p-[26px]">
              <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_92px] lg:gap-8">
                <div className="min-w-0">
                  <div className="mb-5">
                    <p className="text-sm font-semibold">
                      {selectedYear ? `Contribution activity — ${selectedYear}` : "Contribution activity"}
                    </p>
                    <p className="mt-0.5 text-xs text-faint">
                      {selectedYear ? "Full January–December calendar." : "Your public contribution activity from the last 12 months."}
                    </p>
                  </div>
                  <div className="relative min-h-[142px]">
                    {!contrib && contribStatus === "loading" && (
                      <div className={`h-[100px] ${SKELETON}`} />
                    )}
                    {contribStatus === "error" && !contrib && (
                      <p className="text-sm text-muted-foreground">
                        Contribution data couldn&apos;t be loaded right now.
                      </p>
                    )}
                    {contrib && contribPeriod && (
                      <ContributionGraph days={contrib.contributions} period={contribPeriod} />
                    )}
                    {contribStatus === "loading" && contrib && (
                      <p className="absolute right-0 top-0 rounded-full bg-card/90 px-2 py-1 font-mono text-[10px] text-faint">
                        Loading {selectedYear ?? "last 12 months"}…
                      </p>
                    )}
                    {contribStatus === "error" && contrib && (
                      <p className="mt-3 text-xs text-muted-foreground">Couldn&apos;t update this year. Showing the last loaded chart.</p>
                    )}
                  </div>
                </div>
                <nav aria-label="Contribution year filter" className="-mx-1 flex min-w-0 gap-2 overflow-x-auto border-t border-border px-1 pt-4 lg:mx-0 lg:flex-col lg:overflow-visible lg:border-l lg:border-t-0 lg:px-0 lg:pl-5 lg:pt-0">
                  {years.map((year) => {
                    const isActive = selectedYear === year || (selectedYear === null && year === currentYear);
                    return (
                      <button
                        key={year}
                        type="button"
                        onClick={() => setSelectedYear(selectedYear === year && year === currentYear ? null : year)}
                        className={`min-w-[60px] flex-none rounded-lg px-3 py-2 text-center text-sm font-medium transition-colors lg:text-left ${isActive ? "bg-accent text-accent-foreground shadow-glow" : "text-muted-foreground hover:bg-accent/10 hover:text-foreground"}`}
                        aria-pressed={isActive}
                        title={year === currentYear ? "Click again to return to the last 12 months" : `Show ${year} contributions`}
                      >
                        {year}
                      </button>
                    );
                  })}
                </nav>
              </div>
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
                <p className="rounded-xl border border-dashed border-border-strong p-5 text-center text-[13.5px] text-muted-foreground sm:p-7">
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
                <p className="rounded-xl border border-dashed border-border-strong p-5 text-center text-[13.5px] text-muted-foreground sm:p-7">
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
                        className="rounded-xl border border-border bg-foreground/[0.015] px-4 py-4 transition-[transform,border-color] duration-200 ease-smooth hover:-translate-y-[3px] hover:border-accent/35 sm:px-5 sm:py-[18px]"
                      >
                        <div className="flex items-start justify-between gap-2.5">
                          <h3 className="min-w-0 break-words font-mono text-[13.5px] font-semibold">
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
                        <div className="mt-3.5 flex flex-wrap items-center gap-x-3.5 gap-y-1.5 text-xs text-faint">
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
