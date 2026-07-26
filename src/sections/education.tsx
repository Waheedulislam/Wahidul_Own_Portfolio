"use client";

import { motion } from "framer-motion";
import { GraduationCap, Sparkles } from "lucide-react";
import { siteConfig } from "@/data/site";
import { learning } from "@/data/skills";
import { Card } from "@/components/ui/card";

export function Education() {
  return (
    <section
      id="education"
      className="border-b border-border bg-background-alt py-28 lg:py-32"
    >
      <div className="container-px grid gap-[22px] lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45 }}
        >
          <div className="section-eyebrow">Education</div>
          <h2 className="mb-7 font-display text-[29px] font-semibold tracking-[-0.01em]">
            Academic background
          </h2>

          <Card className="h-full p-[26px]">
            <span className="flex h-[42px] w-[42px] items-center justify-center rounded-lg bg-accent/[0.14] text-accent">
              <GraduationCap size={20} />
            </span>
            <h3 className="mt-3 font-display text-base font-semibold">
              {siteConfig.education.degree}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {siteConfig.education.department}
            </p>
            <p className="text-sm text-muted-foreground">{siteConfig.education.school}</p>

            <div className="mt-5 border-t border-border pt-5">
              <p className="mb-3 font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-faint">
                Relevant coursework
              </p>
              <div className="flex flex-wrap gap-[7px]">
                {siteConfig.education.coursework.map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-border-strong bg-foreground/[0.02] px-3.5 py-1.5 text-[13px] text-muted-foreground"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, delay: 0.1 }}
        >
          <div className="section-eyebrow">Certifications</div>
          <h2 className="mb-7 font-display text-[29px] font-semibold tracking-[-0.01em]">
            Currently learning
          </h2>

          <Card className="h-full p-[26px]">
            <span className="flex h-[42px] w-[42px] items-center justify-center rounded-lg bg-accent/[0.14] text-accent">
              <Sparkles size={20} />
            </span>
            <p className="mt-3 text-sm text-muted-foreground">
              No certificates listed yet — here&apos;s what&apos;s actively in progress instead.
            </p>
            <div className="mt-5 flex flex-wrap gap-[7px]">
              {learning.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-border-strong bg-foreground/[0.02] px-3.5 py-1.5 text-[13px] text-muted-foreground"
                >
                  {item}
                </span>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
