"use client";

import { motion } from "framer-motion";
import { skillCategories } from "@/data/skills";
import { Card } from "@/components/ui/card";

export function Skills() {
  return (
    <section
      id="skills"
      className="border-b border-border bg-background-alt py-28 lg:py-32"
    >
      <div className="container-px">
        <div className="mb-12 max-w-[640px]">
          <div className="section-eyebrow">Tech Stack</div>
          <h2 className="font-display text-[29px] font-semibold tracking-[-0.01em]">
            Skills &amp; Tools
          </h2>
          <p className="mt-3.5 max-w-[56ch] text-muted-foreground">
            Technologies I use to design, build and ship production applications.
          </p>
        </div>

        <div className="grid gap-[22px] sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, i) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Card interactive className="h-full p-[26px]">
                  <span className="mb-4 flex h-[42px] w-[42px] items-center justify-center rounded-lg bg-accent/[0.14] text-accent">
                    <Icon size={20} />
                  </span>
                  <h3 className="mb-4 font-display text-[15.5px] font-semibold">
                    {category.title}
                  </h3>
                  <ul className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <li key={skill.name}>
                        <span
                          title={skill.description}
                          className="inline-flex items-center gap-1.5 rounded-sm border border-border-strong bg-foreground/[0.02] px-[11px] py-1.5 text-[12.5px] font-medium text-muted-foreground transition-[color,border-color,transform] duration-200 ease-smooth hover:-translate-y-0.5 hover:border-accent hover:text-foreground"
                        >
                          <span className="h-[5px] w-[5px] flex-none rounded-full bg-teal" />
                          {skill.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
