"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./WorkSlot.module.css";

/** The width the product's page is rendered at before being scaled down. */
const PAGE_WIDTH = 1440;

/**
 * A product's live landing page, shown in its frame as a reference.
 *
 * It is rendered at desktop width and scaled to fit, so the frame shows
 * the real page rather than a screenshot of it. It is a picture, not a
 * second browser: it takes no pointer or keyboard input, and the whole
 * frame opens the product instead. Until it has loaded, the product's
 * logo holds the frame.
 */
export function WorkEmbed({
  src,
  title,
  href,
  logo,
}: {
  src: string;
  title: string;
  href?: string;
  logo?: string;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const fit = () => {
      const scale = frame.clientWidth / PAGE_WIDTH;
      frame.style.setProperty("--embed-scale", String(scale));
      frame.style.setProperty("--embed-h", `${frame.clientHeight / scale}px`);
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  const body = (
    <>
      {logo ? (
        // eslint-disable-next-line @next/next/no-img-element -- static export, pre-sized asset
        <img className={styles.placeholder} src={logo} alt="" width={96} height={96} />
      ) : null}
      <iframe
        className={styles.embed}
        src={src}
        title={title}
        loading="lazy"
        tabIndex={-1}
        aria-hidden="true"
        sandbox="allow-scripts allow-same-origin"
        referrerPolicy="no-referrer"
        data-loaded={loaded || undefined}
        onLoad={() => setLoaded(true)}
        style={{ width: PAGE_WIDTH }}
      />
    </>
  );

  return (
    <div ref={frameRef} className={`${styles.frame} ${styles.live}`}>
      {href ? (
        <a className={styles.cover} href={href} target="_blank" rel="noopener" tabIndex={-1} aria-hidden="true">
          {body}
        </a>
      ) : (
        body
      )}
    </div>
  );
}
