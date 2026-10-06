import { research } from "@/content/research";
import styles from "./InsightsChapter.module.css";

/**
 * Chapter — Insights.
 * Architecture breakdowns, project lessons, research and notes from real
 * work. An archive, not a blog. Entries that are not yet published say so, and
 * are not links.
 */
export function InsightsChapter() {
  return (
    <section id="insights" className={styles.insights} data-chapter="Insights" aria-labelledby="insights-title" tabIndex={-1}>
      <div className={`container ${styles.layout}`}>
        <header className={styles.head}>
          <p className="meta">Archive</p>
          <h2 id="insights-title" className={styles.title} data-reveal>
            Insights
          </h2>
          <p className={styles.note} data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
            Architecture breakdowns, lessons from engagements, research and notes. Written from real work, published
            when it is ready.
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
