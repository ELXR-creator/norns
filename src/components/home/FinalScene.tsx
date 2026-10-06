"use client";

import { useEffect, useRef } from "react";
import { NornsMark } from "@/components/brand/NornsMark";
import { EndCredits } from "@/components/site/EndCredits";
import { site } from "@/content/site";
import styles from "./FinalScene.module.css";

/** 0 → 1 between two points of progress, eased at both ends. */
const ease = (p: number, from: number, to: number) => {
  const t = Math.min(Math.max((p - from) / (to - from), 0), 1);
  return t * t * (3 - 2 * t);
};

/**
 * The last scene of the site: the name, distilled into the symbol.
 *
 * One sticky frame, scrolled through natively. NORNS arrives first, filling
 * the upper half; it dissolves from its foot upward while the symbol grows
 * out of near-invisibility to own the frame. Only then do the end credits
 * appear. The site began with the symbol; it ends with it.
 *
 * Scroll progress is written as a handful of eased CSS variables; CSS does
 * the drawing. Without scripting, or with reduced motion, the scene is a
 * still sequence: name, symbol, credits.
 */
export function FinalScene() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const runway = rect.height - window.innerHeight;
      const p = runway > 0 ? Math.min(Math.max(-rect.top / runway, 0), 1) : 1;
      el.style.setProperty("--p", p.toFixed(4));
      el.style.setProperty("--word", ease(p, 0.14, 0.68).toFixed(4));
      el.style.setProperty("--mark", ease(p, 0.1, 0.8).toFixed(4));
      const credits = ease(p, 0.86, 0.99);
      el.style.setProperty("--credits", credits.toFixed(4));
      // Links are only clickable once they can be seen.
      el.toggleAttribute("data-credits", credits > 0.5);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);


  return (
    <div ref={ref} className={styles.scene}>
      <div className={styles.stage}>
        {/* A faint, oversized outline of the mark — the drawing the site
            opened with — so the whole frame belongs to the symbol. */}
        <NornsMark variant="contour" className={styles.echo} />

        <p className={styles.word} aria-hidden="true">
          {site.name}
        </p>


        <div className={styles.mark}>
          <NornsMark className={styles.symbol} label={site.name} />
        </div>

        <footer className={styles.credits}>
          <EndCredits />
        </footer>
      </div>
    </div>
  );
}
