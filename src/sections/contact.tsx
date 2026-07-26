"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Loader2,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  ArrowUpRight,
  Copy,
  Check,
  User,
  AtSign,
  Tag,
  MessageSquare,
  Send,
  ShieldCheck,
} from "lucide-react";
import { siteConfig } from "@/data/site";
import { Button } from "@/components/ui/button";

type Status = "idle" | "submitting" | "success" | "error";

const contactItems = [
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.links.email,
    href: `mailto:${siteConfig.links.email}`,
    copy: siteConfig.links.email,
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/Waheedulislam",
    href: siteConfig.links.github,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/waheedul-islam",
    href: siteConfig.links.linkedin,
  },
  { icon: MapPin, label: "Location", value: siteConfig.location, href: undefined },
];

const MAP_QUERY = encodeURIComponent(siteConfig.location);
const MAP_URL = `https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`;
const MAP_EMBED_URL = `https://www.google.com/maps?q=${MAP_QUERY}&z=12&output=embed`;

const MESSAGE_MAX = 600;

const fieldBase =
  "w-full rounded-xl border bg-foreground/[0.02] py-2.5 pl-10 pr-3.5 text-[14.5px] text-foreground outline-none transition-[border-color,box-shadow,background-color] duration-200 ease-smooth placeholder:text-faint focus:bg-foreground/[0.035] focus:ring-[3px]";

/** Fields share one look; the error state only swaps the ring/border colour. */
function fieldClass(hasError?: boolean) {
  return `${fieldBase} ${
    hasError
      ? "border-red-400/70 focus:border-red-400 focus:ring-red-400/[0.14]"
      : "border-border-strong focus:border-accent focus:ring-accent/[0.14]"
  }`;
}

const labelClass =
  "mb-1.5 block font-mono text-[10.5px] font-medium uppercase tracking-[0.12em] text-faint";

/** Icon parked inside a field; lights up with the accent while the input has focus. */
const fieldIconClass =
  "pointer-events-none absolute left-3.5 text-faint transition-colors duration-200 peer-focus:text-accent";

export function Contact() {
  const [status, setStatus] = React.useState<Status>("idle");
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [copied, setCopied] = React.useState(false);
  const [messageLength, setMessageLength] = React.useState(0);

  React.useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(t);
  }, [copied]);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(siteConfig.links.email);
      setCopied(true);
    } catch {
      // Clipboard blocked (insecure origin / permission) — the mailto link still works.
    }
  }

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
      setMessageLength(0);
    }, 900);
  }

  return (
    <section id="contact" className="section-y relative overflow-hidden">
      {/* Ambient wash — accent on one side, teal on the other, both drifting slowly. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-24 h-[380px] w-[380px] animate-drift-a rounded-full bg-accent/10 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-48 bottom-0 h-[340px] w-[340px] animate-drift-b rounded-full bg-teal/10 blur-[130px]"
      />

      <div className="container-px relative grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12 lg:items-start">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
        >
          <div className="section-eyebrow">Contact</div>
          <h2 className="max-w-[13ch] font-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.08] tracking-[-0.035em]">
            Let&apos;s Build{" "}
            <span className="bg-gradient-to-br from-accent via-accent to-teal bg-clip-text text-transparent">
              Something Great
            </span>{" "}
            Together
          </h2>
          <p className="mt-4 max-w-[52ch] leading-7 text-muted-foreground">
            I&apos;m always interested in Frontend, Backend, Full Stack, Internship, Freelance, and
            exciting software engineering opportunities.
          </p>

          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {contactItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.42, delay: 0.06 * i }}
                  className="group relative"
                >
                  <div className="relative flex h-full items-center gap-3 overflow-hidden rounded-2xl border border-border bg-card/80 p-3.5 shadow-[0_12px_24px_-20px_hsl(var(--foreground)/0.5)] transition-[transform,border-color,box-shadow] duration-200 ease-smooth group-hover:-translate-y-1 group-hover:border-accent/60 group-hover:shadow-glow">
                    {/* Light sweep on hover */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(105deg,transparent,hsl(var(--accent)/0.14),transparent)] transition-transform duration-700 ease-smooth group-hover:translate-x-full"
                    />
                    <span className="relative flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-accent/[0.12] text-accent ring-1 ring-inset ring-accent/20 transition-transform duration-200 ease-smooth group-hover:scale-105">
                      <Icon size={16} />
                    </span>
                    <div className="relative min-w-0 flex-1">
                      <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-faint">
                        {item.label}
                      </p>
                      <p className="truncate text-sm font-semibold">{item.value}</p>
                    </div>

                    {item.copy ? (
                      <button
                        type="button"
                        onClick={copyEmail}
                        aria-label={copied ? "Email copied" : "Copy email address"}
                        className="relative z-10 flex h-8 w-8 flex-none items-center justify-center rounded-lg border border-border-strong bg-background/70 text-muted-foreground transition-[color,border-color,transform] duration-200 ease-smooth hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                      >
                        {copied ? <Check size={14} className="text-ok" /> : <Copy size={14} />}
                      </button>
                    ) : item.href ? (
                      <ArrowUpRight
                        size={16}
                        aria-hidden="true"
                        className="relative flex-none text-faint opacity-0 transition-[opacity,transform] duration-200 ease-smooth group-hover:-translate-y-0.5 group-hover:text-accent group-hover:opacity-100"
                      />
                    ) : null}
                  </div>

                  {/* Stretched link so the whole card is clickable without nesting the copy button inside an <a>. */}
                  {item.href && (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${item.label}: ${item.value}`}
                      className="absolute inset-0 rounded-2xl"
                    />
                  )}
                </motion.li>
              );
            })}
          </ul>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="group relative mt-5 overflow-hidden rounded-2xl border border-border bg-card shadow-[0_20px_38px_-24px_hsl(var(--foreground)/0.55)] transition-[border-color,box-shadow] duration-300 ease-smooth hover:border-accent/40 hover:shadow-glow"
          >
            <iframe
              title={`Map of ${siteConfig.location}`}
              src={MAP_EMBED_URL}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[240px] w-full border-0 grayscale transition duration-500 ease-smooth group-hover:grayscale-0 sm:h-[265px]"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background via-background/75 to-transparent" />
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-foreground/[0.04]" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl border border-accent/30 bg-background/90 text-accent shadow-glow backdrop-blur">
                  <MapPin size={18} />
                </span>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">Based in</p>
                  <p className="text-sm font-semibold">{siteConfig.location}</p>
                </div>
              </div>
              <a
                href={MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${siteConfig.location} in Google Maps`}
                className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-xl border border-border-strong bg-background/90 text-muted-foreground backdrop-blur transition-[color,border-color,transform] duration-200 ease-smooth hover:-translate-y-0.5 hover:border-accent hover:text-accent"
              >
                <ExternalLink size={16} />
              </a>
            </div>
          </motion.div>
        </motion.div>

        <div className="space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="flex items-center justify-between gap-4 rounded-2xl border border-accent/20 bg-gradient-to-r from-accent/[0.11] via-card to-teal/[0.08] px-4 py-3 shadow-card"
          >
            <div className="flex min-w-0 items-center gap-3">
              <span className="relative flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-accent/[0.13] text-teal ring-1 ring-inset ring-accent/20">
                <span className="absolute h-2.5 w-2.5 animate-ping rounded-full bg-teal/60" />
                <span className="relative h-2 w-2 rounded-full bg-teal" />
              </span>
              <div>
                <p className="text-sm font-semibold">Available for new opportunities</p>
                <p className="mt-0.5 text-xs text-muted-foreground">Open to freelance, internship and full-time roles.</p>
              </div>
            </div>
            <span className="hidden rounded-full border border-teal/25 bg-teal/10 px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.1em] text-teal sm:inline-flex">
              Open
            </span>
          </motion.div>

          {/* Gradient hairline frame around the form — 1px padding wrapper, card sits inside. */}
          <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-[1.45rem] bg-[linear-gradient(150deg,hsl(var(--accent)/0.45),hsl(var(--border))_45%,hsl(var(--accent-2)/0.35))] p-px shadow-lift"
        >
          <form
            onSubmit={handleSubmit}
            noValidate
            className="relative overflow-hidden space-y-4 rounded-[1.4rem] bg-card p-5 sm:p-8"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-0 top-0 h-32 w-32 -translate-y-1/2 translate-x-1/2 rounded-full bg-accent/15 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 left-0 h-28 w-28 -translate-x-1/2 translate-y-1/2 rounded-full bg-teal/10 blur-3xl"
            />

            <div className="relative mb-7 flex items-start gap-3.5 border-b border-border pb-6">
              <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent/70 text-accent-foreground shadow-glow">
                <Sparkles size={18} />
              </span>
              <div className="min-w-0">
                <p className="font-display text-xl font-semibold tracking-[-0.02em]">Send a message</p>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  Tell me a little about your idea or opportunity.
                </p>
              </div>
            </div>

            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
                className="relative flex flex-col items-center gap-2.5 px-2.5 py-[34px] text-center"
              >
                <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-ok/10">
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 animate-ping-ring rounded-full bg-ok/20"
                  />
                  <CheckCircle2 className="relative text-ok" size={30} />
                </span>
                <p className="mt-1 font-display text-base font-semibold">Message sent</p>
                <p className="text-sm text-muted-foreground">
                  Thanks for reaching out — I&apos;ll reply within a day.
                </p>
                <Button variant="outline" size="sm" onClick={() => setStatus("idle")} type="button" className="mt-2">
                  Send another
                </Button>
              </motion.div>
            ) : (
              <>
                <div className="relative">
                  <label htmlFor="name" className={labelClass}>
                    Full Name
                  </label>
                  <div className="relative flex items-center">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Your name"
                      className={`peer ${fieldClass(!!errors.name)}`}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    <User size={15} className={fieldIconClass} aria-hidden="true" />
                  </div>
                  {errors.name && (
                    <p id="name-error" className="mt-1.5 text-xs text-red-400">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <label htmlFor="email" className={labelClass}>
                    Email Address
                  </label>
                  <div className="relative flex items-center">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      className={`peer ${fieldClass(!!errors.email)}`}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    <AtSign size={15} className={fieldIconClass} aria-hidden="true" />
                  </div>
                  {errors.email && (
                    <p id="email-error" className="mt-1.5 text-xs text-red-400">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <label htmlFor="subject" className={labelClass}>
                    Subject
                  </label>
                  <div className="relative flex items-center">
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="What's this about?"
                      className={`peer ${fieldClass()}`}
                    />
                    <Tag size={15} className={fieldIconClass} aria-hidden="true" />
                  </div>
                </div>

                <div className="relative">
                  <div className="flex items-baseline justify-between">
                    <label htmlFor="message" className={labelClass}>
                      Message
                    </label>
                    <span
                      className={`mb-1.5 font-mono text-[10.5px] tabular-nums ${
                        messageLength > MESSAGE_MAX ? "text-red-400" : "text-faint"
                      }`}
                    >
                      {messageLength}/{MESSAGE_MAX}
                    </span>
                  </div>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      maxLength={MESSAGE_MAX}
                      placeholder="Tell me about your project…"
                      onChange={(e) => setMessageLength(e.target.value.length)}
                      className={`peer ${fieldClass(!!errors.message)} min-h-[110px] resize-y`}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "message-error" : undefined}
                    />
                    <MessageSquare
                      size={15}
                      className={`${fieldIconClass} top-3`}
                      aria-hidden="true"
                    />
                  </div>
                  {errors.message && (
                    <p id="message-error" className="mt-1.5 text-xs text-red-400">
                      {errors.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="accent"
                  size="lg"
                  className="group/btn relative w-full overflow-hidden"
                  disabled={status === "submitting"}
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send
                        size={15}
                        className="transition-transform duration-200 ease-smooth group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                      />
                    </>
                  )}
                </Button>

                <p className="relative flex items-center justify-center gap-1.5 pt-0.5 text-[11.5px] text-faint">
                  <ShieldCheck size={13} aria-hidden="true" />
                  Your details stay private — I usually reply within 24 hours.
                </p>
              </>
            )}
          </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
