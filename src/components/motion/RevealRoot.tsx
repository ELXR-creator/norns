"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Holds back elements marked [data-reveal] until they enter the viewport.
 *
 * Content is visible by default and only hidden once this has run, so the
 * page never depends on JavaScript to be readable. Anything already on
 * screen at mount is marked revealed before the class is applied, so there
 * is no flash.
 */
export function RevealRoot() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const root = document.documentElement;
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-revealed])"));
    const viewport = window.innerHeight;

    const pending = nodes.filter((node) => {
      const rect = node.getBoundingClientRect();
      const onScreen = rect.top < viewport * 0.92 && rect.bottom > 0;
      if (onScreen) node.dataset.revealed = "";
      return !onScreen;
    });

    root.classList.add("reveal-ready");

    if (!("IntersectionObserver" in window)) {
      pending.forEach((node) => (node.dataset.revealed = ""));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.revealed = "";
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    pending.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
