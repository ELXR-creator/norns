import { site } from "@/content/site";
import styles from "./CompanyChapter.module.css";

/**
 * Chapter 08 — Company.
 * The organization speaks. The person leading it is named, once, plainly.
 */
export function CompanyChapter() {
  return (
    <section id="company" className={styles.company} data-chapter="Company" aria-labelledby="company-title" tabIndex={-1}>
      <div className={`container ${styles.layout}`}>
        <p className={`meta ${styles.eyebrow}`}>Company</p>

        <div className={styles.body}>
          <h2 id="company-title" className={styles.title} data-reveal>
            Norns is an independent technology company.
          </h2>
          <p className={styles.text} data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
            We create products, systems and research around problems we believe are worth solving.
          </p>

          <dl className={styles.facts} data-reveal="fade">
            <div className={styles.fact}>
              <dt className="meta">Leadership</dt>
              <dd>Founded and led by {site.founder}.</dd>
            </div>
            <div className={styles.fact}>
              <dt className="meta">Entity</dt>
              <dd>{site.legalName}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
