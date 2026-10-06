import { work } from "@/content/work";
import { WorkSlot } from "./WorkSlot";
import styles from "./WorkChapter.module.css";

/**
 * Chapter 04 — Work.
 * Norns contains worlds. Until each is ready to be entered, its place is
 * held open — deliberately, and without pretending.
 */
export function WorkChapter() {
  return (
    <section id="work" className={styles.work} data-chapter="Work" aria-labelledby="work-title" tabIndex={-1}>
      <div className="container">
        <header className={styles.head}>
          <p className={`meta ${styles.eyebrow}`}>Selected work</p>
          <h2 id="work-title" className={styles.title} data-reveal>
            Things being built at Norns.
          </h2>
          <p className={styles.note} data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
            Each product is its own world. They will be shown when they are ready to be entered.
          </p>
        </header>

        <ol className={styles.slots}>
          {work.map((entry) => (
            <li key={entry.id} className={styles.item} data-reveal="fade">
              <WorkSlot entry={entry} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
