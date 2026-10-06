import { FocusBand } from "@/components/motion/FocusBand";
import styles from "./ApproachChapter.module.css";

const stages = [
  {
    label: "Discovery",
    line: "We advise.",
    detail: "Find the real problem before designing a solution: who has it, what it costs, what changes if it is solved.",
  },
  {
    label: "Architecture",
    line: "We architect.",
    detail: "Weigh the options and make the decisions — including what should not be built.",
  },
  {
    label: "Delivery",
    line: "We build.",
    detail: "Ship the working system, then measure whether it did what it was meant to.",
  },
];

/**
 * Chapter — Approach.
 *
 * Three statements stepping across the grid, left to right, as an
 * engagement moves from understanding to delivery. Only the stage in
 * focus is fully lit.
 */
export function ApproachChapter() {
  return (
    <section id="approach" className={styles.approach} data-chapter="Approach" aria-label="Approach" tabIndex={-1}>
      <FocusBand as="ol" className={`container ${styles.list}`}>
        {stages.map((stage, i) => (
          <li key={stage.label} className={styles.stage} data-focus>
            <p className={`meta ${styles.label}`}>
              <span className={styles.ordinal}>{String(i + 1).padStart(2, "0")}</span>
              {stage.label}
            </p>
            <h2 className={styles.line}>{stage.line}</h2>
            <p className={styles.detail}>{stage.detail}</p>
          </li>
        ))}
      </FocusBand>
    </section>
  );
}
