import Link from "next/link";
import { engagements } from "@/content/engagements";
import styles from "./EngagementsChapter.module.css";

/**
 * Chapter — Engagements.
 * Fixed-shape ways to begin. Each says when it fits, how long it takes and
 * what the client leaves with.
 */
export function EngagementsChapter() {
  return (
    <section
      id="engagements"
      className={styles.engagements}
      data-chapter="Engagements"
      aria-labelledby="engagements-title"
      tabIndex={-1}
    >
      <div className="container">
        <header className={styles.head}>
          <p className="meta">Engagements</p>
          <h2 id="engagements-title" className={styles.title} data-reveal>
            Ways to begin.
          </h2>
          <p className={styles.note} data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
            Fixed scope, fixed price, agreed after a first conversation. Larger builds start from a Discovery Sprint,
            so the estimate is based on evidence rather than guesswork.
          </p>
        </header>

        <ol className={styles.grid}>
          {engagements.map((engagement, i) => (
            <li key={engagement.id} className={styles.item} data-reveal="fade">
              <article className={styles.engagement} aria-labelledby={`${engagement.id}-name`}>
                <p className={`meta ${styles.top}`}>
                  <span>E / {String(i + 1).padStart(2, "0")}</span>
                  <span className={styles.duration}>{engagement.duration}</span>
                </p>
                <h3 id={`${engagement.id}-name`} className={styles.name}>
                  {engagement.name}
                </h3>
                <p className={styles.forWhen}>{engagement.forWhen}</p>
                <div className={styles.outputs}>
                  <p className="meta">You leave with</p>
                  <ul>
                    {engagement.outputs.map((output) => (
                      <li key={output}>{output}</li>
                    ))}
                  </ul>
                </div>
              </article>
            </li>
          ))}
        </ol>

        <p className={styles.cta} data-reveal="fade">
          <Link href="/contact/" className="link" prefetch={false}>
            Discuss an engagement <span className="arrow arrow--right" aria-hidden="true">→</span>
          </Link>
        </p>
      </div>
    </section>
  );
}
