"use client";

import { useEffect, useRef } from "react";

/**
 * Draws the epilogue's three threads in step with the reader's scroll:
 * the further into the ending, the further the threads have run.
 *
 * Writes one CSS variable (--draw, 0 → 1) on its container. Without
 * scripting, or with reduced motion, the threads are simply complete.
 */
export function Threads({ className, children }: { className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;

    const measure = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Begins as the threads enter the lower part of the screen; complete
      // once their meeting point has risen past the middle.
      const start = vh * 0.9;
      const end = vh * 0.45;
      const progress = (start - rect.top) / (rect.height + start - end);
      el.style.setProperty("--draw", String(Math.min(Math.max(progress, 0), 1)));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      el.style.removeProperty("--draw");
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
