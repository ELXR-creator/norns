import Link from "next/link";
import { elsewhere, legal, site } from "@/content/site";
import { Threads } from "./Threads";
import styles from "./Epilogue.module.css";

/**
 * The epilogue — the last scene of the site, and its footer.
 *
 * Three threads, past, present and future, run down from separate
 * points and converge into one axis. Where they meet, they become a
 * single brighter line (three faint strokes overlapping), pointing at the
 * statement the whole page has been building towards. Then a pause, and
 * the name.
 *
 * The opening said: the future isn't predicted, it's constructed.
 * The ending answers: build what is needed. Norns.
 */
export function Epilogue() {
  return (
    <section className={styles.epilogue} aria-labelledby="epilogue-title" data-final>
      <div className="container">
        <Threads className={styles.threads}>
          <svg className={styles.art} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
            {/* Past and future descend, then bend towards the present's axis. */}
            <path className={styles.thread} d="M10 0 V58 C10 80 50 74 50 96 V100" />
            <path className={styles.thread} d="M50 0 V100" />
            <path className={styles.thread} d="M90 0 V58 C90 80 50 74 50 96 V100" />
          </svg>
          {/* Phones: the threads run down the left edge as a braid, meet,
              then sweep to the centre of the statement. */}
          <svg className={styles.artPhone} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
            <path className={styles.thread} d="M1.5 0 V62 C1.5 72 4 72 4 80 C4 92 50 88 50 100" />
            <path className={styles.thread} d="M4 0 V80 C4 92 50 88 50 100" />
            <path className={styles.thread} d="M6.5 0 V62 C6.5 72 4 72 4 80 C4 92 50 88 50 100" />
          </svg>

          <ol className={styles.labels} aria-hidden="true">
            <li className="meta">Past</li>
            <li className="meta">Present</li>
            <li className="meta">Future</li>
          </ol>

          <p className={`${styles.line} ${styles.lineWas}`} data-reveal>
            What was shapes what is.
          </p>
          <p className={`${styles.line} ${styles.lineIs}`} data-reveal>
            What is shapes what comes next.
          </p>
        </Threads>

        <h2 id="epilogue-title" className={styles.statement} data-reveal>
          Build what is needed.
        </h2>

        <div className={styles.invitation} data-reveal>
          <p className={styles.question}>Have a problem worth solving?</p>
          <Link href="/contact/" className={`link ${styles.talk}`} prefetch={false}>
            Talk to Norns <span className="arrow arrow--right" aria-hidden="true">→</span>
          </Link>
        </div>

        <div className={styles.titleCard}>
          <p className={styles.wordmark} data-reveal>
            {site.name}
          </p>
        </div>

        <footer className={styles.colophon}>
          <p className="meta">
            © {site.year} {site.legalName}
          </p>
          <ul className={styles.colophonLinks}>
            {legal.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className={`meta ${styles.colophonLink}`} prefetch={false}>
                  {item.label}
                </Link>
              </li>
            ))}
            {elsewhere.map((item) => (
              <li key={item.label}>
                <a href={item.href} className={`meta ${styles.colophonLink}`} target="_blank" rel="noopener">
                  {item.label} <span aria-hidden="true">↗</span>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </footer>
      </div>
    </section>
  );
}
