"use client";

import { useEffect, useRef } from "react";

type FocusBandProps = {
  as?: "div" | "ol" | "ul";
  className?: string;
  children: React.ReactNode;
};

/**
 * Lights the child marked [data-focus] that is crossing the middle of the
 * viewport; the others recede. What is present is bright; what has passed,
 * or has not yet come, is dim.
 *
 * Until this mounts, every child is fully lit.
 */
export function FocusBand({ as: Tag = "div", className, children }: FocusBandProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || !("IntersectionObserver" in window)) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-focus]"));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) el.dataset.present = "";
          else delete el.dataset.present;
        }
      },
      { rootMargin: "-42% 0px -42% 0px" },
    );

    items.forEach((el) => observer.observe(el));
    root.dataset.focusReady = "";
    return () => {
      observer.disconnect();
      delete root.dataset.focusReady;
    };
  }, []);

  return (
    <Tag ref={ref as React.Ref<never>} className={className}>
      {children}
    </Tag>
  );
}
