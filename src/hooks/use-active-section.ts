"use client";

import * as React from "react";

/** Height of the sticky navbar — sections start below it, so the "current"
 *  section is the last one whose top has passed this line. */
const NAV_OFFSET = 64;

/**
 * Scroll-spy for the in-page nav. Takes section ids (without the `#`) in
 * document order and returns the one the reader is currently looking at.
 *
 * Uses scroll position rather than IntersectionObserver ratios: sections here
 * vary wildly in height, and a ratio-based pick makes short sections (Education)
 * lose to tall ones (Projects) even when they fill the viewport.
 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = React.useState(ids[0] ?? "");

  React.useEffect(() => {
    let frame = 0;

    const compute = () => {
      frame = 0;
      const line = window.scrollY + NAV_OFFSET + 1;

      // Bottom of the page: the last section can be too short to ever reach
      // the line, so claim it once we're scrolled all the way down.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) {
        setActive(ids[ids.length - 1] ?? "");
        return;
      }

      let current = ids[0] ?? "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top + window.scrollY <= line) current = id;
      }
      setActive(current);
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids]);

  return active;
}
