import { FormSequence } from "./FormSequence";
import styles from "./ProblemChapter.module.css";

const forms = ["Software", "Infrastructure", "Intelligence", "Robotics", "Research"];

/**
 * Chapter 03 — The Norns mentality.
 * The belief, then the demonstration: the form changes, the problem stays.
 */
export function ProblemChapter() {
  return (
    <section className={styles.problem} aria-labelledby="problem-title">
      <div className={`container ${styles.intro}`}>
        <h2 id="problem-title" className={styles.title} data-reveal>
          <span className={styles.dim}>We don&rsquo;t begin with a product.</span>{" "}
          <span className={styles.bright}>We begin with a problem.</span>
        </h2>
        <p className={styles.support} data-reveal style={{ "--reveal-delay": "150ms" } as React.CSSProperties}>
          Norns builds technology around problems worth solving. The form follows the problem.
        </p>
      </div>

      <FormSequence forms={forms} resolution="Whatever the problem requires." />
    </section>
  );
}
