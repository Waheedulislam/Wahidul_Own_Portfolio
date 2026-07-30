import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { projects, type Project } from "@/data/projects";
import { Button } from "@/components/ui/button";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export default function ProjectDetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  const imageSrc =
    typeof project.image === "string" ? project.image : project.image;

  return (
    <main className="section-y overflow-x-hidden bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.08),transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.08),transparent_26%)]">
      <div className="container-px">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
              Project case study
            </p>
            <h1 className="text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl lg:text-5xl">
              {project.name}
            </h1>
            <p className="max-w-[72ch] text-base leading-7 text-muted-foreground">
              {project.shortDescription}
            </p>
          </div>

          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 self-start text-sm font-semibold uppercase tracking-[0.18em] text-accent transition hover:text-accent-foreground"
          >
            <ArrowLeft size={16} />
            Back to projects
          </Link>
        </div>

        {imageSrc ? (
          <div className="overflow-hidden rounded-[1.5rem] border border-border bg-card shadow-[0_18px_80px_-48px_rgba(15,23,42,0.45)]">
            <Image
              src={typeof imageSrc === "string" ? imageSrc : imageSrc}
              alt={`${project.name} preview`}
              width={1280}
              height={720}
              className="h-[240px] w-full object-cover sm:h-[320px] lg:h-[420px]"
            />
          </div>
        ) : null}

        <div className="mt-10 grid gap-8 xl:grid-cols-[1.8fr_1fr]">
          <section className="space-y-8">
            <div className="rounded-[1.25rem] border border-border bg-foreground/[0.7] p-6 shadow-sm">
              <div className="flex flex-wrap gap-3">
                <span className="rounded-full border border-border bg-slate-950/10 px-3 py-1 text-[12px] uppercase tracking-[0.18em] text-muted-foreground">
                  {project.category}
                </span>
                <span className="rounded-full bg-accent px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.18em] text-accent-foreground">
                  {project.slug === "tech-heim" ||
                  project.slug === "wedding-pro"
                    ? "Team Project"
                    : "Featured"}
                </span>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-card p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
                    Problem
                  </p>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {project.problem}
                  </p>
                </div>
                <div className="rounded-3xl bg-card p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
                    Solution
                  </p>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {project.solution}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-[1.25rem] border border-border bg-card p-6 shadow-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
                  Key Features
                </p>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground">
                  {project.keyFeatures.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-accent" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[1.25rem] border border-border bg-card p-6 shadow-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
                  Tech Stack
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-border bg-foreground/[0.12] px-3 py-1 text-sm text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6 rounded-[1.25rem] border border-border bg-card p-6 shadow-sm">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
                  Architecture
                </p>
                <pre className="mt-4 overflow-x-auto whitespace-pre-wrap break-words rounded-3xl border border-border bg-slate-950/5 p-5 font-mono text-xs leading-6 text-slate-500">
                  {project.architecture}
                </pre>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
                    Challenges
                  </p>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {project.challenges}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
                    Lessons Learned
                  </p>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {project.lessonsLearned}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-[1.25rem] border border-border bg-card p-6 shadow-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
                Links
              </p>
              <div className="mt-4 space-y-3">
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <Button
                      variant="accent"
                      size="default"
                      className="w-full justify-center"
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </Button>
                  </a>
                ) : null}
                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <Button
                      variant="outline"
                      size="default"
                      className="w-full justify-center"
                    >
                      <Github size={16} />
                      View Code
                    </Button>
                  </a>
                ) : null}
              </div>
            </div>

            <div className="rounded-[1.25rem] border border-border bg-foreground/[0.6] p-5 shadow-sm sm:p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
                Summary
              </p>
              <div className="mt-4 space-y-4 text-sm leading-7 text-muted-foreground">
                <p>
                  This page shows the end-to-end problem, solution,
                  architecture, and product outcomes for the project.
                </p>
                <p>
                  Use the detail page to present a polished case study for
                  hiring managers or product reviewers.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
