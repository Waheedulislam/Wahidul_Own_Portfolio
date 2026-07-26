"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { siteConfig } from "@/data/site";

const WELCOME = "Welcome to my portfolio website";
const TAGLINE = "Creating Websites That Feel Alive.";

/** How long the progress bar takes to fill, in ms. */
const DURATION = 3200;
/** Per-character delay for the typewriter. */
const TYPE_SPEED = 52;
/** Wait for the welcome line to finish staggering in before typing starts. */
const TYPE_DELAY = 700;
/** Pause on the finished frame before the reveal. */
const HOLD = 550;

const EASE_SMOOTH = [0.22, 0.61, 0.36, 1] as const;
const EASE_REVEAL = [0.76, 0, 0.24, 1] as const;

const SOCIALS = [
  { href: siteConfig.links.github, label: "GitHub", icon: Github },
  { href: siteConfig.links.linkedin, label: "LinkedIn", icon: Linkedin },
  { href: `mailto:${siteConfig.links.email}`, label: "Email", icon: Mail },
];

/** Keys that shouldn't dismiss the overlay, so it stays keyboard-navigable. */
const NON_SKIP_KEYS = new Set(["Tab", "Shift", "Control", "Alt", "Meta"]);

function statusFor(progress: number) {
  if (progress < 35) return "Initializing";
  if (progress < 70) return "Loading assets";
  if (progress < 96) return "Preparing interface";
  return "Ready";
}

export function Preloader() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = React.useState(true);
  const [progress, setProgress] = React.useState(0);
  const [typed, setTyped] = React.useState("");
  const [showSkip, setShowSkip] = React.useState(false);

  // One-shot guard so skipping can't race the timers.
  const finished = React.useRef(false);
  const finish = React.useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    setProgress(100);
    setTyped(TAGLINE);
    setVisible(false);
  }, []);

  // Reduced motion: no theatre — show the finished frame briefly, then leave.
  React.useEffect(() => {
    if (!reduceMotion) return;
    setTyped(TAGLINE);
    setProgress(100);
    const id = setTimeout(finish, 450);
    return () => clearTimeout(id);
  }, [reduceMotion, finish]);

  // Progress bar, driven by rAF so it stays in step with real elapsed time.
  React.useEffect(() => {
    if (reduceMotion) return;
    let raf = 0;
    let start: number | null = null;

    const tick = (now: number) => {
      if (start === null) start = now;
      const t = Math.min(1, (now - start) / DURATION);
      // easeOutCubic — decelerates near the end so it reads as real work
      setProgress(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setTimeout(finish, HOLD);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduceMotion, finish]);

  // Typewriter
  React.useEffect(() => {
    if (reduceMotion) return;
    let interval: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      let i = 0;
      interval = setInterval(() => {
        i += 1;
        setTyped(TAGLINE.slice(0, i));
        if (i >= TAGLINE.length) clearInterval(interval);
      }, TYPE_SPEED);
    }, TYPE_DELAY);

    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [reduceMotion]);

  // Let people out early — click anywhere or hit a key.
  React.useEffect(() => {
    if (!visible) return;
    const id = setTimeout(() => setShowSkip(true), 1100);
    const onKey = (e: KeyboardEvent) => {
      if (!NON_SKIP_KEYS.has(e.key)) finish();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", finish);
    return () => {
      clearTimeout(id);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", finish);
    };
  }, [visible, finish]);

  // Freeze the page behind the overlay so it can't be scrolled mid-animation.
  React.useEffect(() => {
    if (!visible) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          id="preloader"
          // Slides away like a curtain to reveal the site underneath
          exit={{ y: "-100%" }}
          transition={{ duration: 0.75, ease: EASE_REVEAL }}
          className="fixed inset-0 z-[300] flex items-center justify-center overflow-hidden bg-background px-6"
        >
          <div className="bg-grid absolute inset-0 animate-grid-drift" aria-hidden="true" />
          <div
            className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent blur-[120px]"
            style={{ opacity: "var(--aurora-2)" }}
            aria-hidden="true"
          />

          <motion.div
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: EASE_SMOOTH }}
            className="relative w-full max-w-[560px]"
          >
            {/* Technical corner frame */}
            {[
              "-left-4 -top-4 border-l border-t",
              "-right-4 -top-4 border-r border-t",
              "-bottom-4 -left-4 border-b border-l",
              "-bottom-4 -right-4 border-b border-r",
            ].map((pos) => (
              <motion.span
                key={pos}
                aria-hidden="true"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className={`absolute h-5 w-5 border-accent/40 ${pos}`}
              />
            ))}

            {/* Brand badge with a pulsing halo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="relative mb-7 inline-flex"
            >
              <span className="relative flex h-14 w-14 items-center justify-center rounded-xl border border-border-strong bg-card font-display text-lg font-semibold shadow-glow">
                <span className="text-gradient">{siteConfig.initials}</span>
                <span
                  aria-hidden="true"
                  className="absolute -inset-1.5 animate-ping-ring rounded-xl border border-accent/50"
                />
              </span>
            </motion.div>

            {/* Welcome line — wide tracking, flanking rules, letter-by-letter */}
            <div className="mb-4 flex items-center gap-3">
              <motion.span
                aria-hidden="true"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                className="h-px w-8 flex-none origin-left bg-gradient-to-r from-transparent to-accent"
              />
              <p className="font-mono text-[11.5px] font-medium uppercase tracking-[0.16em] text-accent sm:text-[12.5px]">
                {reduceMotion
                  ? WELCOME
                  : WELCOME.split("").map((ch, i) => (
                      <motion.span
                        key={`${ch}-${i}`}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.25 + i * 0.018 }}
                        className="inline-block"
                      >
                        {ch === " " ? " " : ch}
                      </motion.span>
                    ))}
              </p>
              <motion.span
                aria-hidden="true"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                className="h-px flex-1 origin-right bg-gradient-to-l from-transparent to-accent"
              />
            </div>

            {/* Typewriter. min-height reserves the wrapped lines so nothing
                below jumps as characters land. */}
            <h1 className="min-h-[2.3em] font-display text-[26px] font-semibold leading-[1.15] tracking-[-0.01em] sm:text-[32px]">
              <span className="text-gradient">{typed}</span>
              <span className="ml-1 inline-block h-[0.85em] w-[2px] animate-blink bg-accent align-middle" />
            </h1>

            {/* Progress */}
            <div className="mt-9">
              <div className="mb-3 flex items-end justify-between gap-4">
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
                  {statusFor(progress)}…
                </span>
                <span className="font-display text-[26px] font-semibold leading-none tabular-nums">
                  <span className="text-gradient">{String(progress).padStart(2, "0")}</span>
                  <span className="ml-0.5 text-[15px] text-accent">%</span>
                </span>
              </div>

              <div
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Loading portfolio"
                className="relative h-1 w-full rounded-full bg-foreground/10"
              >
                <div
                  className="relative h-full overflow-hidden rounded-full bg-gradient-to-r from-accent to-teal"
                  style={{ width: `${progress}%` }}
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent bg-[length:200%_100%]"
                  />
                </div>
                {/* Glowing head riding the leading edge */}
                <span
                  aria-hidden="true"
                  className="absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal shadow-[0_0_10px_2px_hsl(var(--accent-2)/0.75)]"
                  style={{ left: `${progress}%` }}
                />
              </div>
            </div>

            {/* Socials — stopPropagation so clicking a link doesn't also skip */}
            <div
              className="mt-9 flex items-center gap-4 border-t border-border pt-6"
              onPointerDown={(e) => e.stopPropagation()}
            >
              <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-faint">
                Find me on
              </span>
              <div className="flex items-center gap-2.5">
                {SOCIALS.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <motion.a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.9 + i * 0.1, ease: "easeOut" }}
                      className="flex h-[38px] w-[38px] items-center justify-center rounded-md border border-border-strong bg-card text-muted-foreground transition-[color,border-color,transform,box-shadow] duration-200 ease-smooth hover:-translate-y-0.5 hover:border-accent hover:text-accent hover:shadow-glow"
                    >
                      <Icon size={16} />
                    </motion.a>
                  );
                })}
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: showSkip ? 1 : 0 }}
              transition={{ duration: 0.4 }}
              className="mt-6 font-mono text-[10.5px] tracking-wide text-faint"
            >
              Click or press any key to skip
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
