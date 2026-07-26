"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { siteConfig } from "@/data/site";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const infoCards = [
  { label: "Name", value: siteConfig.name },
  { label: "Location", value: siteConfig.location },
  { label: "Role", value: siteConfig.roles.join(", ") },
  { label: "Education", value: siteConfig.education.school },
  { label: "Current Focus", value: siteConfig.currentFocus },
  { label: "Availability", value: siteConfig.availability.join(", ") },
];

export function About() {
  return (
    <section id="about" className="border-b border-border py-28 lg:py-32">
      <div className="container-px grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-14">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="mx-auto w-full max-w-sm"
        >
          <div className="overflow-hidden rounded-2xl border border-border-strong shadow-lift transition-transform duration-300 ease-smooth hover:-translate-y-1">
            <div className="relative aspect-[4/5] w-full bg-card-soft">
              <Image
                src="/profile.jpg"
                alt={siteConfig.name}
                fill
                sizes="(max-width: 1024px) 100vw, 400px"
                className="object-cover"
                priority={false}
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
        >
          <div className="section-eyebrow">About Me</div>
          <h2 className="font-display text-[29px] font-semibold tracking-[-0.01em]">
            Who I am
          </h2>

          <p className="mt-5 text-muted-foreground">
            Hi, I&apos;m {siteConfig.name}. A passionate Frontend, Backend and Full Stack Developer.
          </p>
          <p className="mt-3 text-muted-foreground">
            I enjoy building responsive interfaces, scalable backend systems, secure REST APIs
            and production-ready applications.
          </p>
          <p className="mt-3 text-muted-foreground">
            I love solving real-world problems, writing clean code and continuously learning
            modern technologies.
          </p>

          <div className="mt-[26px] grid grid-cols-1 gap-3 sm:grid-cols-2">
            {infoCards.map((item) => (
              <Card key={item.label} className="px-4 py-3.5 hover:border-border-strong">
                <p className="text-[11px] uppercase tracking-[0.05em] text-faint">
                  {item.label}
                </p>
                <p className="mt-1 text-sm font-semibold">{item.value}</p>
              </Card>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={siteConfig.links.resume} target="_blank" rel="noopener noreferrer">
              <Button variant="accent">Download Resume</Button>
            </a>
            <a href="#contact">
              <Button variant="outline">Let&apos;s Talk</Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
