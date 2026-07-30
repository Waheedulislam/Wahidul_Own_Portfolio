"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ExternalLink, Github, FolderGit2, ChevronRight } from "lucide-react";
import { projects, type Project } from "@/data/projects";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const filters = [
  "Full Stack",
  "Team Projects",
  "Frontend",
  "Dashboard",
  "All",
] as const;

function ProjectCard({ project }: { project: Project }) {
  const router = useRouter();
  const imageSrc =
    typeof project.image === "string" ? project.image : project.image;

  const handleCardClick = () => {
    router.push(`/projects/${project.slug}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <Card className="group h-full cursor-pointer select-none touch-manipulation overflow-hidden rounded-[1.25rem] border border-border/70 bg-card/95 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.5)] transition-all duration-200 ease-smooth hover:-translate-y-1 hover:shadow-xl">
        {imageSrc ? (
          <div
            className="relative w-full h-[220px] overflow-hidden rounded-t-[1.25rem]"
            onClick={handleCardClick}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                handleCardClick();
              }
            }}
          >
            <img
              src={typeof imageSrc === "string" ? imageSrc : imageSrc.src}
              alt={`${project.name} preview`}
              className="absolute inset-0 h-full w-full object-cover transition duration-300 ease-smooth group-hover:scale-[1.03]"
            />
            <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-3 bg-gradient-to-b from-slate-950/80 to-transparent px-5 py-4 text-white">
              <span className="rounded-full border border-white/10 bg-slate-950/65 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-slate-100">
                {project.category}
              </span>
              <span className="rounded-full bg-accent px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-foreground">
                {project.slug === "tech-heim" || project.slug === "wedding-pro"
                  ? "Team"
                  : "Featured"}
              </span>
            </div>
          </div>
        ) : null}

        <div className="p-5" onClick={handleCardClick}>
          <div className="flex flex-wrap gap-2">
            {project.techStack.slice(0, 4).map((t) => (
              <span
                key={t}
                className="rounded-full border border-border bg-foreground/[0.12] px-3 py-1 text-[12px] font-medium text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>

          <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-foreground">
            {project.name}
          </h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            {project.shortDescription}
          </p>
        </div>

        <div className="border-t border-border/70 px-6 py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(event) => event.stopPropagation()}
                >
                  <Button
                    variant="accent"
                    size="sm"
                    className="w-full rounded-full px-4 py-2 font-semibold sm:w-auto"
                  >
                    <ExternalLink size={14} />
                    Live Demo
                  </Button>
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(event) => event.stopPropagation()}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full rounded-full border-accent px-4 py-2 font-semibold text-accent sm:w-auto"
                  >
                    <Github size={14} />
                    Code
                  </Button>
                </a>
              )}
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleCardClick}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border-accent px-4 py-2 text-sm font-semibold uppercase tracking-[0.16em] text-accent transition duration-200 hover:bg-accent/10 sm:w-auto"
            >
              Details
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export function Projects() {
  const [filter, setFilter] = React.useState<(typeof filters)[number]>("All");
  const visible =
    filter === "All"
      ? projects
      : filter === "Team Projects"
        ? projects.filter(
            (p) => p.slug === "tech-heim" || p.slug === "wedding-pro",
          )
        : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="section-y border-b border-border">
      <div className="container-px">
        <div className="mb-12 max-w-[640px]">
          <div className="section-eyebrow">Featured Work</div>
          <h2 className="font-display text-[29px] font-semibold tracking-[-0.01em]">
            Projects
          </h2>
          <p className="mt-3.5 max-w-[56ch] text-muted-foreground">
            Real systems, broken down the way I&apos;d walk a hiring manager
            through them.
          </p>
        </div>

        <div className="mb-[30px] flex flex-wrap gap-3">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`rounded-full border px-5 py-2 text-sm font-medium transition-colors duration-150 ease-smooth ${
                filter === f
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border-strong bg-card text-muted-foreground hover:border-accent hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {visible.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-3.5 rounded-2xl border border-dashed border-border-strong bg-foreground/[0.015] px-8 py-16 text-center"
          >
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
          </motion.div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {visible.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
