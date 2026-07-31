"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  BookOpen,
  Building2,
  GraduationCap,
  MapPin,
  Sparkles,
} from "lucide-react";
import { siteConfig } from "@/data/site";
import { learning } from "@/data/skills";
import { Spotlight, useSpotlight } from "@/components/ui/spotlight";

const { education } = siteConfig;

/** Shared shell for the two panels — inset gradient border, lift + spotlight on hover. */
function Panel({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const onMouseMove = useSpotlight();

  return (
    <div
      onMouseMove={onMouseMove}
      className={[
        "group relative flex h-full flex-col overflow-hidden rounded-[1.6rem] border border-border bg-card p-6 sm:p-8",
        "shadow-[0_18px_60px_-40px_hsl(var(--foreground)/0.5)] transition-[transform,border-color,box-shadow] duration-300 ease-smooth",
        "hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-lift",
        className ?? "",
      ].join(" ")}
    >
      <Spotlight />
      {/* Gradient hairline along the top edge of the card. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      {children}
    </div>
  );
}

function IconTile({
  icon: Icon,
  gradient,
}: {
  icon: typeof GraduationCap;
  gradient: string;
}) {
  return (
    <span
      className={`flex h-[52px] w-[52px] flex-none items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-glow transition-transform duration-300 ease-smooth group-hover:-rotate-6 group-hover:scale-105`}
    >
      <Icon size={23} />
    </span>
  );
}

export function Education() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="education"
      className="section-y relative overflow-hidden border-b border-border bg-background-alt"
    >
      {/* Soft aurora so the panels sit on depth rather than flat paper. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 right-0 h-[380px] w-[620px] rounded-full bg-teal/[0.07] blur-[120px]"
      />

      <div className="container-px relative">
        <div className="mb-10 max-w-[640px] lg:mb-12">
          <div className="section-eyebrow">Education</div>
          <h2 className="font-display text-[29px] font-semibold tracking-[-0.01em]">
            Academic background
          </h2>
          <p className="mt-3.5 max-w-[56ch] text-muted-foreground">
            Where the formal training came from — and what I&apos;m actively
            teaching myself alongside it.
          </p>
        </div>

        <div className="grid gap-5 sm:gap-6 lg:grid-cols-5">
          {/* ── Full Stack Web Development (self-taught) ─────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: reduceMotion ? 0 : 0.45 }}
            className="lg:col-span-3"
          >
            <Panel>
              <div className="relative z-[2] flex items-start justify-between gap-4">
                <IconTile icon={Sparkles} gradient="from-teal to-accent" />
                {/* Live pulse — signals this list is actively moving. */}
                <span className="inline-flex items-center gap-2 rounded-full border border-ok/30 bg-ok/10 px-2.5 py-1 font-mono text-[10.5px] font-medium uppercase tracking-[0.14em] text-ok">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-ok animate-ping-ring" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ok" />
                  </span>
                  In progress
                </span>
              </div>

              <h3 className="relative z-[2] mt-5 font-display text-[21px] font-semibold tracking-[-0.02em] text-foreground">
                Full Stack Web Development
              </h3>
              <p className="relative z-[2] mt-2.5 max-w-[52ch] text-[13.5px] leading-6 text-muted-foreground">
                Self-taught, project-driven learning across the whole stack —
                here&apos;s what&apos;s actively in rotation right now.
              </p>

              <ul className="relative z-[2] mt-6 flex flex-wrap gap-2">
                {learning.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.3,
                      delay: reduceMotion ? 0 : 0.15 + i * 0.04,
                    }}
                  >
                    <span className="group/chip inline-flex items-center gap-2 rounded-full border border-border-strong bg-foreground/[0.02] py-1.5 pl-2.5 pr-3 text-[12.5px] font-medium text-muted-foreground transition-[color,border-color,transform] duration-200 ease-smooth hover:-translate-y-0.5 hover:border-accent hover:text-foreground">
                      <span className="font-mono text-[10px] tabular-nums text-faint transition-colors group-hover/chip:text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>

              <p className="relative z-[2] mt-auto border-t border-border/70 pt-6 font-mono text-[11px] uppercase tracking-[0.1em] text-faint">
                {learning.length} topics in rotation
              </p>
            </Panel>
          </motion.div>

          {/* ── Degree ───────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: reduceMotion ? 0 : 0.45,
              delay: reduceMotion ? 0 : 0.1,
            }}
            className="lg:col-span-2"
          >
            <Panel>
              {/* Oversized watermark glyph bleeding out of the corner. */}
              <GraduationCap
                aria-hidden
                size={190}
                strokeWidth={0.6}
                className="pointer-events-none absolute -right-8 -top-8 text-accent/[0.06] transition-transform duration-500 ease-smooth group-hover:-translate-y-1 group-hover:scale-105"
              />

              <div className="relative z-[2] flex items-start gap-4">
                <IconTile icon={GraduationCap} gradient="from-accent to-teal" />
                <div className="min-w-0 flex-1">
                  <span className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-[10.5px] font-medium uppercase tracking-[0.14em] text-accent">
                    Undergraduate
                  </span>
                  <h3 className="mt-2.5 font-display text-[21px] font-semibold leading-snug tracking-[-0.02em] text-foreground">
                    {education.degree}
                  </h3>
                </div>
              </div>

              <ul className="relative z-[2] mt-6 space-y-3 text-[13.5px] text-muted-foreground">
                {[
                  { icon: BookOpen, value: education.department },
                  { icon: Building2, value: education.school },
                  { icon: MapPin, value: siteConfig.location },
                ].map(({ icon: Icon, value }) => (
                  <li key={value} className="flex items-center gap-2.5">
                    <span className="flex h-7 w-7 flex-none items-center justify-center rounded-lg border border-border-strong bg-foreground/[0.02] text-accent">
                      <Icon size={13} />
                    </span>
                    {value}
                  </li>
                ))}
              </ul>

              <div className="relative z-[2] mt-auto border-t border-border/70 pt-6">
                <p className="mb-3.5 flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-faint">
                  Relevant coursework
                  <span className="h-px flex-1 bg-gradient-to-r from-border-strong to-transparent" />
                </p>
                <ul className="flex flex-wrap gap-2">
                  {education.coursework.map((course) => (
                    <li key={course}>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-border-strong bg-foreground/[0.02] px-3 py-1.5 text-[12.5px] font-medium text-muted-foreground transition-[color,border-color,transform] duration-200 ease-smooth hover:-translate-y-0.5 hover:border-accent hover:text-foreground">
                        <span className="h-[5px] w-[5px] flex-none rounded-full bg-teal" />
                        {course}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Panel>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
