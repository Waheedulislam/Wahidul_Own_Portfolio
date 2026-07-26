"use client";

import { motion } from "framer-motion";
import { Milestone } from "lucide-react";
import { timeline } from "@/data/timeline";

export function Experience() {
  return (
    <section id="experience" className="border-b border-border py-28 lg:py-32">
      <div className="container-px">
        <div className="mb-12 max-w-[640px]">
          <div className="section-eyebrow">Experience</div>
          <h2 className="font-display text-[29px] font-semibold tracking-[-0.01em]">
            What I&apos;ve built &amp; learned
          </h2>
          <p className="mt-3.5 max-w-[56ch] text-muted-foreground">
            Real projects, collaboration and continuous learning — not a list of job titles.
          </p>
        </div>

        {/* The rail fades out toward the bottom, like the reference design */}
        <ol className="relative pl-11 before:absolute before:bottom-1.5 before:left-3.5 before:top-1.5 before:w-px before:bg-gradient-to-b before:from-accent before:to-transparent before:content-['']">
          {timeline.map((item, i) => (
            <motion.li
              key={item.title}
              initial={{ opacity: 0, x: 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="relative pb-9 last:pb-0"
            >
              <span className="absolute -left-11 top-0 z-[2] flex h-[29px] w-[29px] items-center justify-center rounded-md border border-border-strong bg-card text-accent">
                <Milestone size={14} />
              </span>

              <div className="rounded-xl border border-border bg-card px-6 py-[22px] transition-[transform,border-color] duration-200 ease-smooth hover:translate-x-1 hover:border-border-strong">
                <h3 className="font-display text-[16.5px] font-semibold">{item.title}</h3>
                <p className="mt-[7px] text-[14.5px] text-muted-foreground">
                  {item.description}
                </p>
                {item.tags && (
                  <div className="mt-3.5 flex flex-wrap gap-1.5">
                    {item.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-sm border border-border-strong bg-foreground/[0.02] px-2.5 py-1 font-mono text-[11.5px] text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
