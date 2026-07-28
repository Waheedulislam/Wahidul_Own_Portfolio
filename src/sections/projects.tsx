"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, FolderGit2 } from "lucide-react";
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

function CaseStudyField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-1.5 font-mono text-[11.5px] font-medium uppercase tracking-[0.06em] text-accent">
        {label}
      </p>
      <div className="text-sm text-muted-foreground">{children}</div>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = React.useState(false);
  const imageSrc =
    typeof project.image === "string" ? project.image : project.image?.src;

  return (
    <Card interactive className="overflow-hidden">
      {imageSrc ? (
        <div className="border-b border-border bg-foreground/[0.02] p-3">
          <img
            src={imageSrc}
            alt={`${project.name} preview`}
            className="h-[240px] w-full rounded-lg border border-border object-cover shadow-sm"
          />
        </div>
      ) : null}

      <div className="flex flex-wrap items-start justify-between gap-4 p-6">
        <div>
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 5).map((t) => (
              <span
                key={t}
                className="rounded-sm border border-border-strong bg-foreground/[0.02] px-2.5 py-1 font-mono text-[11.5px] text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
          <h3 className="mt-3.5 font-display text-xl font-semibold">
            {project.name}
          </h3>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            {project.shortDescription}
          </p>
        </div>
        <div className="flex gap-2">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm">
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
            >
              <Button variant="outline" size="sm">
                <Github size={14} />
                Code
              </Button>
            </a>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full border-t border-border px-6 py-3.5 text-left text-sm font-semibold text-accent transition-colors duration-150 ease-smooth hover:bg-accent/[0.07]"
        aria-expanded={open}
      >
        {open ? "Hide case study" : "View case study"}
      </button>

      {open && (
        <div className="grid gap-6 border-t border-border bg-foreground/[0.015] p-6 sm:grid-cols-2">
          <CaseStudyField label="Problem Statement">
            {project.problem}
          </CaseStudyField>
          <CaseStudyField label="Solution">{project.solution}</CaseStudyField>
          <CaseStudyField label="Key Features">
            <ul className="list-inside list-disc space-y-1">
              {project.keyFeatures.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </CaseStudyField>
          <CaseStudyField label="Tech Stack">
            {project.techStack.join(", ")}
          </CaseStudyField>
          <div className="sm:col-span-2">
            <CaseStudyField label="Architecture Overview">
              <pre className="overflow-x-auto rounded-md border border-border bg-card-soft p-3.5 font-mono text-xs leading-relaxed">
                {project.architecture}
              </pre>
            </CaseStudyField>
          </div>
          <CaseStudyField label="Challenges Faced">
            {project.challenges}
          </CaseStudyField>
          <CaseStudyField label="Lessons Learned">
            {project.lessonsLearned}
          </CaseStudyField>
        </div>
      )}
    </Card>
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

        <div className="mb-[30px] flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`rounded-full border px-4 py-[7px] text-[13.5px] font-medium transition-colors duration-150 ease-smooth ${
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
          <div className="space-y-6">
            {visible.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
