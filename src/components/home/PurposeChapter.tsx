import styles from "./PurposeChapter.module.css";

const path = ["Products", "Systems", "Infrastructure", "Research"];

/**
 * Chapter 05 — Purpose. The quiet chapter.
 * A progression that ends in an open question, because today's categories
 * do not define what comes after them.
 */
export function PurposeChapter() {
  return (
    <section className={styles.purpose} aria-labelledby="purpose-title">
      <div className="container">
        <h2 id="purpose-title" className={styles.title} data-reveal>
          <span className={styles.dim}>The method changes.</span>{" "}
          <span className={styles.bright}>The purpose doesn&rsquo;t.</span>
        </h2>

        <div className={styles.pathWrap} data-reveal="fade">
          <ol className={styles.path} aria-label="Products, systems, infrastructure, research — and what is not yet known">
            {path.map((step, i) => (
              <li key={step} className={styles.step} style={{ "--i": i } as React.CSSProperties}>
                <span className={styles.word}>{step}</span>
                <span className={styles.rule} aria-hidden="true" />
              </li>
            ))}
            <li className={styles.open} style={{ "--i": path.length } as React.CSSProperties}>
              <span aria-hidden="true">?</span>
            </li>
          </ol>
        </div>

        <p className={styles.support} data-reveal>
          We build according to what the problem demands.
        </p>
      </div>
    </section>
  );
}
