import { capabilities } from "@/content/capabilities";
import styles from "./CapabilitiesChapter.module.css";

/**
 * Chapter — Capabilities.
 * Five areas, each led by the problem it answers. A register, not a grid of
 * service cards.
 */
export function CapabilitiesChapter() {
  return (
    <section
      id="capabilities"
      className={styles.capabilities}
      data-chapter="Capabilities"
      aria-labelledby="capabilities-title"
      tabIndex={-1}
    >
      <div className="container">
        <header className={styles.head}>
          <p className="meta">Capabilities</p>
          <h2 id="capabilities-title" className={styles.title} data-reveal>
            Five disciplines. <span>One problem at a time.</span>
          </h2>
        </header>

        <ol className={styles.list}>
          {capabilities.map((capability, i) => (
            <li key={capability.id} className={styles.row} data-reveal="fade">
              <p className={`meta ${styles.number}`}>{String(i + 1).padStart(2, "0")}</p>
              <div className={styles.nameCell}>
                <h3 className={styles.name}>{capability.name}</h3>
                {capability.lead ? <p className={`meta ${styles.lead}`}>Specialism</p> : null}
              </div>
              <p className={styles.problem}>{capability.problem}</p>
              <ul className={styles.work} aria-label={`${capability.name} — typical work`}>
                {capability.work.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
