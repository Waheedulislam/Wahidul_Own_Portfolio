"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  ExternalLink,
  FolderGit2,
  Github,
  Users,
} from "lucide-react";
import { projects, type Project } from "@/data/projects";
import { Spotlight, useSpotlight } from "@/components/ui/spotlight";
import { cn } from "@/lib/utils";

/** Projects built with a team rather than solo — surfaced as its own filter. */
const TEAM_SLUGS = new Set(["tech-heim", "wedding-pro"]);

const TEAM_FILTER = "Team Projects";
const ALL_FILTER = "All";

/* Each category gets its own two-stop gradient so the grid reads as a family of
   cards rather than nine identical tiles. Stops come from the brand tokens. */
const CATEGORY_GRADIENT: Record<Project["category"], string> = {
  "Full Stack": "from-accent to-teal",
  Frontend: "from-teal to-accent",
  Backend: "from-ok to-teal",
  API: "from-accent to-ok",
  Dashboard: "from-teal to-ok",
};

function imageSrcOf(project: Project) {
  return project.image ?? null;
}

function TechChips({ items, max = 4 }: { items: string[]; max?: number }) {
  const shown = items.slice(0, max);
  const rest = items.length - shown.length;

  return (
    <ul className="flex flex-wrap gap-1.5">
      {shown.map((tech) => (
        <li
          key={tech}
          className="inline-flex items-center gap-1.5 rounded-full border border-border-strong bg-foreground/[0.02] px-2.5 py-1 text-[11.5px] font-medium text-muted-foreground"
        >
          <span className="h-[5px] w-[5px] flex-none rounded-full bg-teal" />
          {tech}
        </li>
      ))}
      {rest > 0 && (
        <li className="inline-flex items-center rounded-full border border-dashed border-border-strong px-2.5 py-1 text-[11.5px] font-medium text-faint">
          +{rest}
        </li>
      )}
    </ul>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="relative z-20 flex items-center gap-2">
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open the live demo of ${project.name}`}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border-strong bg-card text-muted-foreground transition-[color,border-color,background-color,transform] duration-200 ease-smooth hover:-translate-y-0.5 hover:border-accent hover:bg-accent/10 hover:text-accent"
        >
          <ExternalLink size={15} />
        </a>
      )}
      {project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View the source of ${project.name} on GitHub`}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border-strong bg-card text-muted-foreground transition-[color,border-color,background-color,transform] duration-200 ease-smooth hover:-translate-y-0.5 hover:border-accent hover:bg-accent/10 hover:text-accent"
        >
          <Github size={15} />
        </a>
      )}
    </div>
  );
}

function CardBadges({ project, index }: { project: Project; index: number }) {
  const isTeam = TEAM_SLUGS.has(project.slug);

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-3 p-4">
      <span className="rounded-full border border-white/15 bg-slate-950/55 px-2.5 py-1 font-mono text-[11px] font-medium text-white/85 backdrop-blur-sm">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="flex flex-wrap items-center justify-end gap-2">
        {isTeam && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-slate-950/55 px-2.5 py-1 text-[11px] font-medium text-white/85 backdrop-blur-sm">
            <Users size={12} />
            Team
          </span>
        )}
        <span
          className={cn(
            "rounded-full bg-gradient-to-r px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white shadow-glow",
            CATEGORY_GRADIENT[project.category],
          )}
        >
          {project.category}
        </span>
      </span>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const onMouseMove = useSpotlight();
  const image = imageSrcOf(project);

  return (
    <article
      onMouseMove={onMouseMove}
      className={cn(
        "group relative flex h-full flex-col rounded-[1.6rem] border border-border bg-card p-2.5",
        "shadow-[0_18px_60px_-40px_hsl(var(--foreground)/0.5)] transition-[transform,border-color,box-shadow] duration-300 ease-smooth",
        "hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-lift",
      )}
    >
      <Spotlight />

      {/* Full-card target for the case study. Action links sit above it at z-20. */}
      <Link
        href={`/projects/${project.slug}`}
        aria-label={`Read the ${project.name} case study`}
        className="absolute inset-0 z-10 rounded-[1.6rem]"
      />

      {/* Inset preview frame — the shot sits inside the card, not bleeding to its edge. */}
      <div className="relative z-[2] aspect-[16/11] w-full overflow-hidden rounded-[1.15rem] border border-border/80 bg-background-alt">
        {image ? (
          <Image
            src={image}
            alt={`${project.name} interface preview`}
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 1280px) 45vw, 340px"
            className="object-cover object-top transition-transform duration-500 ease-smooth group-hover:scale-[1.06]"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-teal/10" />
        )}

        {/* Keeps the badges legible over bright screenshots. */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/55 via-slate-950/0 to-slate-950/35 transition-opacity duration-300 group-hover:opacity-80" />

        <CardBadges project={project} index={index} />
      </div>

      <div className="relative z-[2] flex flex-1 flex-col px-3 pb-2 pt-5 sm:px-4">
        <h3 className="flex items-start gap-2 font-display text-[19.5px] font-semibold tracking-[-0.02em] text-foreground">
          <span className="transition-colors duration-200 group-hover:text-accent">
            {project.name}
          </span>
          <ArrowUpRight
            size={18}
            className="mt-1 flex-none text-faint transition-transform duration-300 ease-smooth group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
          />
        </h3>

        {/* Accent rule that draws itself out on hover. */}
        <span
          aria-hidden
          className="mt-2.5 h-px w-8 origin-left bg-gradient-to-r from-accent to-teal transition-transform duration-300 ease-smooth group-hover:scale-x-[2.4]"
        />

        <p className="mt-3 line-clamp-3 text-[13.5px] leading-6 text-muted-foreground">
          {project.shortDescription}
        </p>

        <div className="mb-6 mt-4">
          <TechChips items={project.techStack} max={4} />
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-border/70 pt-4">
          <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-accent">
            Case study
            <ArrowUpRight size={14} />
          </span>
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  const reduceMotion = useReducedMotion();
  const [filter, setFilter] = React.useState<string>(ALL_FILTER);

  /* Filters are derived from the data so a tab can never render an empty grid. */
  const filterOptions = React.useMemo(() => {
    const counts = new Map<string, number>([[ALL_FILTER, projects.length]]);

    for (const project of projects) {
      counts.set(project.category, (counts.get(project.category) ?? 0) + 1);
      if (TEAM_SLUGS.has(project.slug)) {
        counts.set(TEAM_FILTER, (counts.get(TEAM_FILTER) ?? 0) + 1);
      }
    }

    return [...counts.entries()].map(([label, count]) => ({ label, count }));
  }, []);

  const visible = React.useMemo(() => {
    if (filter === ALL_FILTER) return projects;
    if (filter === TEAM_FILTER)
      return projects.filter((p) => TEAM_SLUGS.has(p.slug));
    return projects.filter((p) => p.category === filter);
  }, [filter]);

  const liveCount = projects.filter((p) => p.liveUrl).length;

  return (
    <section
      id="projects"
      className="section-y relative overflow-hidden border-b border-border"
    >
      {/* Soft aurora behind the grid so the cards sit on depth, not flat paper. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-accent/[0.07] blur-[120px]"
      />

      <div className="container-px relative">
        <div className="mb-10 flex flex-col gap-8 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[640px]">
            <div className="section-eyebrow">Featured Work</div>
            <h2 className="font-display text-[29px] font-semibold tracking-[-0.01em]">
              Projects
            </h2>
            <p className="mt-3.5 max-w-[56ch] text-muted-foreground">
              Real systems, broken down the way I&apos;d walk a hiring manager
              through them.
            </p>
          </div>

          <dl className="flex flex-none items-center gap-3 sm:gap-4">
            {[
              { value: projects.length, label: "Projects" },
              { value: liveCount, label: "Live" },
              { value: filterOptions.length - 1, label: "Stacks" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex-1 rounded-xl border border-border bg-card/70 px-4 py-3 text-center lg:flex-none lg:min-w-[92px]"
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-display text-[22px] font-semibold leading-none text-foreground">
                    {stat.value}
                  </span>
                  <span className="mt-1.5 block font-mono text-[10.5px] uppercase tracking-[0.14em] text-faint">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div
          role="tablist"
          aria-label="Filter projects by type"
          className="mb-8 flex flex-wrap gap-2.5 sm:gap-3"
        >
          {filterOptions.map(({ label, count }) => {
            const active = filter === label;
            return (
              <button
                key={label}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(label)}
                className={cn(
                  "relative isolate inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[13.5px] font-medium transition-colors duration-200 ease-smooth sm:px-5",
                  active
                    ? "border-transparent text-accent-foreground"
                    : "border-border-strong bg-card text-muted-foreground hover:border-accent hover:text-foreground",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="project-filter-pill"
                    aria-hidden
                    className="absolute inset-0 -z-10 rounded-full bg-gradient-to-br from-accent to-accent/75 shadow-glow"
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 420, damping: 34 }
                    }
                  />
                )}
                {label}
                <span
                  className={cn(
                    "font-mono text-[11px] tabular-nums",
                    active ? "text-accent-foreground/70" : "text-faint",
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {visible.length === 0 ? (
          <div className="flex flex-col items-center gap-3.5 rounded-2xl border border-dashed border-border-strong bg-foreground/[0.015] px-8 py-16 text-center">
            <FolderGit2 size={30} className="text-faint" />
            <p className="text-[15px] font-semibold">
              Project case studies go here
            </p>
            <p className="max-w-[44ch] text-sm text-muted-foreground">
              Add entries to{" "}
              <code className="font-mono text-accent">
                src/data/projects.ts
              </code>{" "}
              with real problem statements, architecture and stack for each
              project — nothing is auto-generated here.
            </p>
          </div>
        ) : (
          <motion.div
            layout={!reduceMotion}
            className="grid gap-5 sm:gap-6 md:grid-cols-2 xl:grid-cols-3"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((project, index) => (
                <motion.div
                  key={project.slug}
                  layout={!reduceMotion}
                  initial={{ opacity: 0, y: 16, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.32,
                    delay: reduceMotion ? 0 : Math.min(index, 5) * 0.04,
                    ease: [0.22, 0.61, 0.36, 1],
                  }}
                >
                  <ProjectCard project={project} index={index} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}
