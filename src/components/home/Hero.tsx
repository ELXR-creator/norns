import { NornsMark } from "@/components/brand/NornsMark";
import { site } from "@/content/site";
import styles from "./Hero.module.css";

/**
 * Chapter 01 — Arrival.
 *
 * The mark is present only as a drawing: its outline, far too large to be
 * seen whole. It is built later in the page.
 */
export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.field} aria-hidden="true">
        <NornsMark variant="contour" className={styles.drawing} />
      </div>

      <div className={`container ${styles.inner}`}>
        <h1 id="hero-title" className={styles.title}>
          <span className={styles.line}>
            {/* On phones this line is set as two: "The future / isn't predicted." */}
            <span className={styles.dim}>
              <span className={styles.phoneBreak}>The future</span> isn&apos;t predicted.
            </span>
          </span>{" "}
          <span className={styles.line}>
            <span className={styles.bright}>{site.statement[1]}</span>
          </span>
        </h1>

        <p className={styles.lead}>We build systems for what comes next.</p>
      </div>
    </section>
  );
}
