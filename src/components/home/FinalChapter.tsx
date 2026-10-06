import { NornsMark } from "@/components/brand/NornsMark";
import { site } from "@/content/site";
import styles from "./FinalChapter.module.css";

/**
 * Chapter 09 — Completion.
 *
 * The mark, seen only as a drawing at the start of the page, is built here:
 * filled from left to right — the loop behind, the N, the loop ahead.
 */
export function FinalChapter() {
  return (
    <section className={styles.final} aria-labelledby="final-title" data-final>
      <div className={`container ${styles.inner}`}>
        <div className={styles.mark} data-reveal="fade">
          <NornsMark variant="contour" className={styles.contour} />
          <NornsMark variant="solid" className={styles.solid} label={site.name} />
        </div>
        <h2 id="final-title" className={styles.title}>
          Build what is needed.
        </h2>
      </div>
    </section>
  );
}
