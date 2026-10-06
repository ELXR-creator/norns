import { research } from "@/content/research";
import styles from "./ResearchChapter.module.css";

/**
 * Chapter 06 — Research.
 * An archive, not a blog. Entries that are not yet published say so, and
 * are not links.
 */
export function ResearchChapter() {
  return (
    <section id="research" className={styles.research} data-chapter="Research" aria-labelledby="research-title" tabIndex={-1}>
      <div className={`container ${styles.layout}`}>
        <header className={styles.head}>
          <p className="meta">Archive</p>
          <h2 id="research-title" className={styles.title} data-reveal>
            Research
          </h2>
          <p className={styles.note} data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
            Research, essays and technical notes from the work. Published when they are ready.
          </p>
        </header>

        <ol className={styles.archive} aria-label="Archive">
          {research.map((entry) => {
            const published = Boolean(entry.href);
            const body = (
              <>
                <span className={`meta ${styles.number}`}>N / {entry.number}</span>
                <span className={styles.entryTitle}>{entry.title}</span>
                <span className={`meta ${styles.kind}`}>{entry.kind}</span>
                <span className={`meta ${styles.status}`}>
                  {published && entry.minutes ? `${entry.minutes} min` : "Unpublished"}
                </span>
              </>
            );
            return (
              <li key={entry.id} className={styles.row} data-reveal="fade">
                {published ? (
                  <a href={entry.href} className={`${styles.entry} ${styles.published}`}>
                    {body}
                  </a>
                ) : (
                  <div className={styles.entry}>{body}</div>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
