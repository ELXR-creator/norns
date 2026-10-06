import Link from "next/link";
import { NornsMark } from "@/components/brand/NornsMark";
import { site } from "@/content/site";
import styles from "./Hero.module.css";

/**
 * Chapter 01 — Arrival.
 *
 * The mark is present only as a drawing: its outline, far too large to be
 * seen whole. It is built later in the page. The brand statement leads;
 * the line beneath says plainly what Norns does and how to begin.
 */
export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.field} aria-hidden="true">
        <NornsMark variant="contour" className={styles.drawing} />
      </div>

      <div className={`container ${styles.inner}`}>
        <p className={`meta ${styles.eyebrow}`}>{site.positioning}</p>
        <h1 id="hero-title" className={styles.title}>
          <span className={styles.line}>
            <span className={styles.dim}>{site.statement[0]}</span>
          </span>{" "}
          <span className={styles.line}>
            <span className={styles.bright}>{site.statement[1]}</span>
          </span>
        </h1>

        <div className={styles.foot}>
          <p className={styles.lead}>{site.promise}</p>
          <p className={styles.actions}>
            <span className={styles.motto}>We advise. We architect. We build.</span>
            <Link href="/contact/" className="link" prefetch={false}>
              Start a project <span className="arrow arrow--right" aria-hidden="true">→</span>
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
