import { capabilities } from "@/content/capabilities";
import { FormSequence } from "./FormSequence";
import styles from "./ProblemChapter.module.css";

const forms = capabilities.map((capability) => capability.name);

/**
 * Chapter — The Norns mentality.
 * The belief, then the demonstration: the form of the answer changes with
 * the problem, across all five disciplines.
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
          The answer might be a knowledge graph, a pipeline, an AI system, a product — or advice not to build at
          all. The form follows the problem.
        </p>
      </div>

      <FormSequence forms={forms} resolution="Whatever the problem requires." />
    </section>
  );
}
