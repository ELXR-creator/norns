"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./FormSequence.module.css";

type FormSequenceProps = {
  forms: string[];
  /** The final state: not another category, but the principle. */
  resolution: string;
};

/**
 * One word, replaced as the reader scrolls. The method changes; the
 * question underneath it does not.
 *
 * With scripting (html.js) and motion allowed, the list is staged in a
 * sticky frame. Otherwise it is simply a list — the same content, still.
 */
export function FormSequence({ forms, resolution }: FormSequenceProps) {
  const steps = [...forms, resolution];
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;

    const measure = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const runway = rect.height - window.innerHeight;
      if (runway <= 0) return;
      const progress = Math.min(Math.max(-rect.top / runway, 0), 0.9999);
      setActive(Math.floor(progress * steps.length));
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
    };
  }, [steps.length]);

  const count = String(steps.length).padStart(2, "0");

  return (
    <div ref={ref} className={styles.sequence} style={{ "--steps": steps.length } as React.CSSProperties}>
      <div className={styles.stage}>
        <div className={`container ${styles.frame}`}>
          <div className={styles.head} aria-hidden="true">
            <span className="meta">Method</span>
            <span className={`meta ${styles.counter}`}>
              <span className={styles.current}>{String(active + 1).padStart(2, "0")}</span> / {count}
            </span>
          </div>

          <ol className={styles.words}>
            {steps.map((word, i) => {
              const state = i < active ? "past" : i === active ? "active" : "next";
              const isResolution = i === steps.length - 1;
              return (
                <li
                  key={word}
                  className={isResolution ? `${styles.word} ${styles.resolution}` : styles.word}
                  data-state={state}
                >
                  {word}
                </li>
              );
            })}
          </ol>

          <div className={styles.progress} aria-hidden="true">
            {steps.map((word, i) => (
              <span key={word} className={styles.tick} data-on={i <= active || undefined} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
