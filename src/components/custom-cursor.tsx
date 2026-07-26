"use client";

import * as React from "react";

// A trailing custom cursor: the dot snaps to the pointer instantly, the ring
// eases toward it (lerp) for a smooth follow effect. Skipped entirely on
// touch devices and when the user has reduced-motion enabled.
export function CustomCursor() {
  const dotRef = React.useRef<HTMLDivElement>(null);
  const ringRef = React.useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = React.useState(false);

  React.useEffect(() => {
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(!isCoarse && !reducedMotion);
  }, []);

  React.useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let raf = 0;
    let visible = false;

    function onMove(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot!.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%,-50%)`;
      if (!visible) {
        dot!.style.opacity = "1";
        ring!.style.opacity = "1";
        visible = true;
      }
    }

    function onLeave() {
      dot!.style.opacity = "0";
      ring!.style.opacity = "0";
      visible = false;
    }

    function tick() {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      ring!.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(tick);
    }

    const hoverSelector = "a, button, input, textarea, [role='button']";
    function onOver(e: MouseEvent) {
      if ((e.target as Element)?.closest?.(hoverSelector)) ring!.classList.add("hovering");
    }
    function onOut(e: MouseEvent) {
      if ((e.target as Element)?.closest?.(hoverSelector)) ring!.classList.remove("hovering");
    }

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-[34px] w-[34px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/35 bg-accent/[0.05] opacity-0 transition-[width,height,border-color,background-color,opacity] duration-200 ease-smooth [&.hovering]:h-[52px] [&.hovering]:w-[52px] [&.hovering]:border-accent [&.hovering]:bg-accent/10"
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent opacity-0 shadow-[0_0_8px_hsl(var(--accent))] transition-opacity duration-200"
      />
      <style jsx global>{`
        body {
          cursor: none;
        }
        a, button, input, textarea, [role="button"] {
          cursor: none;
        }
      `}</style>
    </>
  );
}
