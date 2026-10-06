import { FocusBand } from "@/components/motion/FocusBand";
import styles from "./TimeChapter.module.css";

const moments = [
  { when: "Past", line: "Learn from what was." },
  { when: "Present", line: "Build what is needed." },
  { when: "Future", line: "Shape what comes next." },
];

/**
 * Chapter 02 — Time.
 *
 * Three statements, set one after another and stepping across the grid, so
 * the page itself moves forward in time. Only the present is fully lit.
 */
export function TimeChapter() {
  return (
    <section className={styles.time} aria-label="Past, present and future">
      <FocusBand as="ol" className={`container ${styles.list}`}>
        {moments.map((moment, i) => (
          <li key={moment.when} className={styles.moment} data-focus>
            <p className={`meta ${styles.when}`}>
              <span className={styles.ordinal}>{String(i + 1).padStart(2, "0")}</span>
              {moment.when}
            </p>
            <h2 className={styles.line}>{moment.line}</h2>
          </li>
        ))}
      </FocusBand>
    </section>
  );
}
