"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { index, site } from "@/content/site";
import styles from "./Navigation.module.css";

/**
 * Norns                                   Index +
 *
 * The bar stays quiet. The only thing it volunteers is where you are:
 * sections that carry a `data-chapter` name appear beside the wordmark.
 */
export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [chapter, setChapter] = useState("");
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  const close = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) toggleRef.current?.focus({ preventScroll: true });
  }, []);

  // Close whenever the route changes.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing to navigation
    setOpen(false);
  }, [pathname]);

  // While open: lock scroll, make the page behind inert, handle Escape.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const behind = [
      document.querySelector(".skip-link"),
      document.getElementById("main"),
      document.querySelector("footer"),
    ].filter(
      (el): el is HTMLElement => el instanceof HTMLElement,
    );

    // Hold the layout still when the scrollbar disappears.
    root.style.setProperty("--scrollbar-width", `${window.innerWidth - root.clientWidth}px`);
    root.dataset.indexOpen = "";
    behind.forEach((el) => (el.inert = true));
    const focusTimer = window.setTimeout(() => firstLinkRef.current?.focus({ preventScroll: true }), 120);

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      delete root.dataset.indexOpen;
      root.style.removeProperty("--scrollbar-width");
      behind.forEach((el) => (el.inert = false));
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  // Track the named chapter crossing the middle of the viewport.
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-chapter]"));
    if (!sections.length || !("IntersectionObserver" in window)) return;

    const active = new Set<HTMLElement>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) active.add(el);
          else active.delete(el);
        });
        const current = sections.find((el) => active.has(el));
        setChapter(current?.dataset.chapter ?? "");
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  /**
   * In-page destinations: close first, then travel, so the scroll lock is
   * released before the page moves. Focus follows the reader.
   */
  const onNavigate = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const [path, hash] = href.split("#");
    const samePage = hash && (path === "" || path === "/") && pathname === "/";
    if (!samePage) {
      setOpen(false);
      return;
    }
    event.preventDefault();
    setOpen(false);
    requestAnimationFrame(() => {
      const target = document.getElementById(hash);
      if (!target) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      target.focus({ preventScroll: true });
      history.replaceState(null, "", `#${hash}`);
    });
  };

  return (
    <>
      <header className={styles.bar} data-open={open || undefined}>
        <div className={`container ${styles.inner}`}>
          <p className={styles.identity}>
            <Link href="/" className={styles.wordmark} aria-label={`${site.name}, home`}>
              {site.name}
            </Link>
            {chapter && !open ? (
              <span key={chapter} className={styles.chapter} aria-hidden="true">
                <span className={styles.slash}>/</span>
                {chapter}
              </span>
            ) : null}
          </p>

          <button
            ref={toggleRef}
            type="button"
            className={styles.toggle}
            aria-expanded={open}
            aria-controls="index"
            onClick={() => (open ? close() : setOpen(true))}
          >
            <span>Index</span>
            <span className={styles.glyph} aria-hidden="true" />
          </button>
        </div>
      </header>

      <div id="index" className={styles.overlay} data-open={open || undefined} inert={!open}>
        <div className={`container ${styles.overlayInner}`}>
          <nav aria-label="Index" className={styles.overlayNav}>
            <ol className={styles.list}>
              {index.map((item, i) => (
                <li key={item.href} className={styles.item} style={{ "--i": i } as React.CSSProperties}>
                  <Link
                    ref={i === 0 ? firstLinkRef : undefined}
                    href={item.href}
                    className={styles.entry}
                    onClick={(event) => onNavigate(event, item.href)}
                  >
                    <span className={`meta ${styles.number}`}>{String(i + 1).padStart(2, "0")}</span>
                    <span className={styles.label}>{item.label}</span>
                    {item.note ? <span className={`meta ${styles.note}`}>{item.note}</span> : null}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>

          <div className={styles.overlayFoot}>
            <p className={styles.statement}>
              <span>{site.statement[0]}</span> <span>{site.statement[1]}</span>
            </p>
            <p className="meta">{site.domain}</p>
          </div>
        </div>
      </div>
    </>
  );
}
