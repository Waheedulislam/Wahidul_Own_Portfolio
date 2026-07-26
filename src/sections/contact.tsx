"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, Loader2, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/data/site";
import { Button } from "@/components/ui/button";

type Status = "idle" | "submitting" | "success" | "error";

const contactItems = [
  { icon: Mail, label: "Email", value: siteConfig.links.email, href: `mailto:${siteConfig.links.email}` },
  { icon: Github, label: "GitHub", value: "github.com/Waheedulislam", href: siteConfig.links.github },
  { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/waheedul-islam", href: siteConfig.links.linkedin },
  { icon: MapPin, label: "Location", value: siteConfig.location, href: undefined },
];

const fieldClass =
  "w-full rounded-md border border-border-strong bg-foreground/[0.02] px-3.5 py-2.5 text-[14.5px] text-foreground outline-none transition-[border-color,box-shadow] duration-200 ease-smooth placeholder:text-faint focus:border-accent focus:ring-[3px] focus:ring-accent/[0.14]";

export function Contact() {
  const [status, setStatus] = React.useState<Status>("idle");
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const form = new FormData(formEl);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const message = String(form.get("message") || "").trim();

    const nextErrors: Record<string, string> = {};
    if (!name) nextErrors.name = "Name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = "Enter a valid email.";
    if (!message || message.length < 10) nextErrors.message = "Message should be at least 10 characters.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    // TODO(Waheedul): wire this to a real endpoint (Resend, Formspree, your own API route, etc.)
    // Currently simulates a submission so the UX is complete and ready to connect.
    setTimeout(() => {
      setStatus("success");
      formEl.reset();
    }, 900);
  }

  return (
    <section id="contact" className="py-28 lg:py-32">
      <div className="container-px grid gap-14 lg:grid-cols-2 lg:items-start">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
        >
          <div className="section-eyebrow">Contact</div>
          <h2 className="font-display text-[29px] font-semibold tracking-[-0.01em]">
            Let&apos;s Build Something Great Together
          </h2>
          <p className="mt-3.5 max-w-[56ch] text-muted-foreground">
            I&apos;m always interested in Frontend, Backend, Full Stack, Internship, Freelance, and
            exciting software engineering opportunities.
          </p>

          <ul className="mt-[22px] flex flex-col gap-[11px]">
            {contactItems.map((item) => {
              const Icon = item.icon;
              const content = (
                <div className="flex items-center gap-3.5 rounded-xl border border-border bg-card p-4 transition-[transform,border-color] duration-200 ease-smooth hover:translate-x-1 hover:border-accent">
                  <span className="flex h-[38px] w-[38px] flex-none items-center justify-center rounded-md bg-accent/[0.14] text-accent">
                    <Icon size={16} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[11px] uppercase tracking-[0.05em] text-faint">
                      {item.label}
                    </p>
                    <p className="truncate text-sm font-semibold">{item.value}</p>
                  </div>
                </div>
              );
              return (
                <li key={item.label}>
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer">{content}</a>
                  ) : (
                    content
                  )}
                </li>
              );
            })}
          </ul>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onSubmit={handleSubmit}
          noValidate
          className="space-y-4 rounded-2xl border border-border bg-card p-7"
        >
          {status === "success" ? (
            <div className="flex flex-col items-center gap-2.5 px-2.5 py-[34px] text-center">
              <CheckCircle2 className="text-ok" size={32} />
              <p className="font-display text-base font-semibold">Message sent</p>
              <p className="text-sm text-muted-foreground">
                Thanks for reaching out — I&apos;ll reply within a day.
              </p>
              <Button variant="outline" size="sm" onClick={() => setStatus("idle")} type="button" className="mt-2">
                Send another
              </Button>
            </div>
          ) : (
            <>
              <div>
                <label htmlFor="name" className="mb-1.5 block text-[13px] font-semibold text-muted-foreground">
                  Full Name
                </label>
                <input id="name" name="name" type="text" autoComplete="name" placeholder="Your name"
                  className={fieldClass}
                  aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />
                {errors.name && <p id="name-error" className="mt-1.5 text-xs text-red-400">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-[13px] font-semibold text-muted-foreground">
                  Email Address
                </label>
                <input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com"
                  className={fieldClass}
                  aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />
                {errors.email && <p id="email-error" className="mt-1.5 text-xs text-red-400">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="subject" className="mb-1.5 block text-[13px] font-semibold text-muted-foreground">
                  Subject
                </label>
                <input id="subject" name="subject" type="text" placeholder="What's this about?" className={fieldClass} />
              </div>
              <div>
                <label htmlFor="message" className="mb-1.5 block text-[13px] font-semibold text-muted-foreground">
                  Message
                </label>
                <textarea id="message" name="message" rows={4} placeholder="Tell me about your project…"
                  className={`${fieldClass} min-h-[100px] resize-y`}
                  aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} />
                {errors.message && <p id="message-error" className="mt-1.5 text-xs text-red-400">{errors.message}</p>}
              </div>
              <Button type="submit" variant="accent" className="w-full" disabled={status === "submitting"}>
                {status === "submitting" ? (
                  <><Loader2 size={15} className="animate-spin" />Sending…</>
                ) : (
                  "Send Message"
                )}
              </Button>
            </>
          )}
        </motion.form>
      </div>
    </section>
  );
}
