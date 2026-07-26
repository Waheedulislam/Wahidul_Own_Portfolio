"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/data/site";
import { Button } from "@/components/ui/button";

export function Cta() {
  return (
    <section className="section-y border-b border-border">
      <div className="container-px">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl border border-border-strong bg-[linear-gradient(150deg,hsl(var(--accent)/0.16),hsl(var(--card))_60%)] px-10 py-14 text-center sm:px-10 sm:py-[56px]"
        >
          <h2 className="text-gradient font-display text-[28px] font-semibold tracking-[-0.01em] sm:text-4xl">
            Let&apos;s build something amazing together.
          </h2>
          <p className="mx-auto mt-3 max-w-[52ch] text-muted-foreground">
            I&apos;m currently open for {siteConfig.availability.slice(0, -1).join(", ")} and{" "}
            {siteConfig.availability[siteConfig.availability.length - 1]} opportunities.
          </p>
          <div className="mt-[26px] flex flex-wrap justify-center gap-3">
            <a href="#contact"><Button variant="accent" size="lg">Hire Me</Button></a>
            <a href="#contact"><Button variant="outline" size="lg">Contact Me</Button></a>
            <a href={siteConfig.links.resume} target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="lg">Download Resume</Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
