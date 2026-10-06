import Link from "next/link";
import { NornsMark } from "@/components/brand/NornsMark";
import { elsewhere, index, legal, site } from "@/content/site";
import styles from "./FinalChapter.module.css";

/**
 * Chapter 09 — Completion, and the way out.
 *
 * The mark, seen only as a drawing at the start of the page, is built here:
 * filled from left to right — the loop behind, the N, the loop ahead. Once
 * it is complete, its loops hold the footer: what is here on the left,
 * where to go next on the right. The thing that was constructed becomes
 * the thing you move through.
 */
export function FinalChapter() {
  return (
    <section className={styles.final} aria-labelledby="final-title" data-final>
      <div className={`container ${styles.inner}`}>
        <div className={styles.stage} data-reveal="fade">
          <NornsMark variant="contour" className={styles.contour} />
          <NornsMark variant="solid" className={styles.solid} label={site.name} />

          <nav className={`${styles.loop} ${styles.behind}`} aria-label="Footer index">
            <p className={`meta ${styles.loopLabel}`}>Index</p>
            <ul className={styles.loopList}>
              {index.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className={styles.loopLink} prefetch={false}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {elsewhere.length ? (
            <nav className={`${styles.loop} ${styles.ahead}`} aria-label="Elsewhere">
              <p className={`meta ${styles.loopLabel}`}>Elsewhere</p>
              <ul className={styles.loopList}>
                {elsewhere.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className={styles.loopLink} target="_blank" rel="noopener">
                      {item.label}
                      <span className={styles.out} aria-hidden="true">
                        ↗
                      </span>
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
        </div>

        <h2 id="final-title" className={styles.title}>
          Build what is needed.
        </h2>

        <footer className={styles.base}>
          <p className="meta">
            © {site.year} {site.legalName}
          </p>
          <a className={`meta ${styles.baseLink}`} href={`mailto:${site.contactEmail}`}>
            {site.contactEmail}
          </a>
          {legal.map((item) => (
            <Link key={item.label} href={item.href} className={`meta ${styles.baseLink}`} prefetch={false}>
              {item.label}
            </Link>
          ))}
        </footer>
      </div>
    </section>
  );
}
