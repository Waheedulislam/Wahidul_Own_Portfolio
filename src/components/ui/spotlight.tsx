"use client";

import * as React from "react";

/**
 * Tracks the pointer inside a card and writes its position to `--mx` / `--my`.
 * Pair with <Spotlight /> rendered as a child of the same element.
 */
export function useSpotlight() {
  return React.useCallback((event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }, []);
}

/** Radial accent highlight that fades in while the pointer is over the card. */
export function Spotlight({ size = 480 }: { size?: number }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[1] opacity-0 transition-opacity duration-300 ease-smooth group-hover:opacity-100"
      style={{
        background: `radial-gradient(${size}px circle at var(--mx, 50%) var(--my, 0%), hsl(var(--accent) / 0.16), transparent 68%)`,
      }}
    />
  );
}
