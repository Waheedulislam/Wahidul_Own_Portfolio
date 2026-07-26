"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { siteConfig } from "@/data/site";
import { Button } from "@/components/ui/button";

const socials = [
  { href: siteConfig.links.github, label: "GitHub", icon: Github },
  { href: siteConfig.links.linkedin, label: "LinkedIn", icon: Linkedin },
  { href: `mailto:${siteConfig.links.email}`, label: "Email", icon: Mail },
];

function useRotatingRole(roles: readonly string[], intervalMs = 2200) {
  const [index, setIndex] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % roles.length), intervalMs);
    return () => clearInterval(id);
  }, [roles, intervalMs]);
  return roles[index];
}

/** JSON key — violet */
const K = ({ children }: { children: React.ReactNode }) => (
  <span className="text-accent">{children}</span>
);
/** JSON string value — teal */
const S = ({ children }: { children: React.ReactNode }) => (
  <span className="text-teal">{children}</span>
);

export function Hero() {
  const role = useRotatingRole(siteConfig.roles);

  return (
    <section id="home" className="border-b border-border">
      <div className="container-px grid items-start gap-14 py-24 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-ok/25 bg-ok/[0.14] px-3 py-1.5 font-mono text-[12.5px] font-medium text-ok">
            <span className="relative h-[7px] w-[7px] rounded-full bg-ok">
              <span className="absolute -inset-1 animate-ping-ring rounded-full border border-ok opacity-50" />
            </span>
            Open to work
          </span>

          <p className="mb-2 font-mono text-sm text-accent">Hi, I&apos;m</p>

          <h1 className="text-gradient font-display text-[2.75rem] font-semibold leading-[1.15] tracking-[-0.01em] sm:text-5xl">
            {siteConfig.name}
          </h1>

          <div className="mt-2 h-[26px] overflow-hidden font-mono text-[19px] text-muted-foreground">
            <span key={role} className="inline-block animate-fade-up">
              {role}
            </span>
            <span className="ml-[3px] inline-block h-4 w-[2px] animate-blink bg-accent align-middle" />
          </div>

          <p className="mt-[18px] max-w-[50ch] text-[17px] leading-relaxed text-muted-foreground">
            {siteConfig.headline}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a href={siteConfig.links.resume} target="_blank" rel="noopener noreferrer">
              <Button variant="accent" size="lg">Download Resume</Button>
            </a>
            <a href="#projects">
              <Button variant="outline" size="lg">View Projects</Button>
            </a>
            <a href="#contact">
              <Button variant="ghost" size="lg">Hire Me</Button>
            </a>
          </div>

          <div className="mt-[26px] flex items-center gap-2.5">
            {socials.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-[38px] w-[38px] items-center justify-center rounded-md border border-border-strong bg-card text-muted-foreground transition-[color,border-color,transform] duration-150 ease-smooth hover:-translate-y-0.5 hover:border-accent hover:text-foreground"
                >
                  <Icon size={16} />
                </a>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          className="overflow-hidden rounded-xl border border-border bg-card shadow-lift"
        >
          <div className="flex items-center gap-[7px] border-b border-border px-4 py-3">
            <span className="h-[9px] w-[9px] rounded-full bg-foreground/15" />
            <span className="h-[9px] w-[9px] rounded-full bg-foreground/15" />
            <span className="h-[9px] w-[9px] rounded-full bg-foreground/15" />
            <span className="ml-1.5 font-mono text-xs text-faint">profile.json</span>
          </div>
          <pre className="overflow-x-auto px-5 pb-[22px] pt-5 font-mono text-[13px] leading-[1.85] text-muted-foreground">
            <code>
              {"{\n"}
              {"  "}<K>&quot;name&quot;</K>: <S>&quot;{siteConfig.name}&quot;</S>,{"\n"}
              {"  "}<K>&quot;role&quot;</K>: [{"\n"}
              {siteConfig.roles.map((r, i) => (
                <React.Fragment key={r}>
                  {"    "}<S>&quot;{r}&quot;</S>
                  {i < siteConfig.roles.length - 1 ? "," : ""}
                  {"\n"}
                </React.Fragment>
              ))}
              {"  "}],{"\n"}
              {"  "}<K>&quot;stack&quot;</K>: [{"\n"}
              {"    "}<S>&quot;React&quot;</S>, <S>&quot;Next.js&quot;</S>, <S>&quot;Node.js&quot;</S>,{"\n"}
              {"    "}<S>&quot;Express&quot;</S>, <S>&quot;MongoDB&quot;</S>, <S>&quot;PostgreSQL&quot;</S>,{"\n"}
              {"    "}<S>&quot;Prisma&quot;</S>{"\n"}
              {"  "}],{"\n"}
              {"  "}<K>&quot;status&quot;</K>: <S>&quot;Open to Work&quot;</S>{"\n"}
              {"}"}
            </code>
          </pre>
        </motion.div>
      </div>
    </section>
  );
}
