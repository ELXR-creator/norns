import { site } from "@/content/site";
import styles from "./AboutChapter.module.css";

/**
 * Chapter — About.
 * The organization speaks first. Engagements are founder-led, so the
 * person leading them is named plainly, with the experience behind it.
 */
export function AboutChapter() {
  return (
    <section id="about" className={styles.about} data-chapter="About" aria-labelledby="about-title" tabIndex={-1}>
      <div className={`container ${styles.layout}`}>
        <p className={`meta ${styles.eyebrow}`}>About</p>

        <div className={styles.body}>
          <h2 id="about-title" className={styles.title} data-reveal>
            Norns is a product, data and intelligence consultancy.
          </h2>
          <p className={styles.text} data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
            We work where product, data, knowledge and AI meet: understanding the business problem, designing the
            architecture, and building what it needs. Alongside client work, Norns builds and operates its own
            products.
          </p>

          <dl className={styles.facts} data-reveal="fade">
            <div className={styles.fact}>
              <dt className="meta">Leadership</dt>
              <dd>
                Founded and led by {site.founder}, whose background is in enterprise knowledge graphs, ontology
                engineering and data systems. Engagements are led by the founder directly.
              </dd>
            </div>
            <div className={styles.fact}>
              <dt className="meta">Disciplines</dt>
              <dd>Knowledge · Data · Intelligence · Products · Advisory</dd>
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
