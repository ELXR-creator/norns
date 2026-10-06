import { caseStudies, products } from "@/content/work";
import { ProductSlot } from "./ProductSlot";
import styles from "./WorkChapter.module.css";

/**
 * Chapter — Work.
 * Two kinds of evidence: products Norns builds and operates, and client
 * engagements written up as problem → reasoning → result.
 */
export function WorkChapter() {
  return (
    <section id="work" className={styles.work} data-chapter="Work" aria-labelledby="work-title" tabIndex={-1}>
      <div className="container">
        <header className={styles.head}>
          <p className={`meta ${styles.eyebrow}`}>Selected work</p>
          <h2 id="work-title" className={styles.title} data-reveal>
            Evidence, not claims.
          </h2>
          <p className={styles.note} data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
            Norns builds its own products as well as working with clients — so the advice comes from people who
            ship.
          </p>
        </header>

        <div className={styles.group}>
          <div className={styles.groupHead}>
            <h3 className={styles.groupTitle}>Products</h3>
            <p className="meta">Built and operated by Norns</p>
          </div>
          <ol className={styles.products}>
            {products.map((product) => (
              <li key={product.id} data-reveal="fade">
                <ProductSlot product={product} />
              </li>
            ))}
          </ol>
        </div>

        <div className={styles.group}>
          <div className={styles.groupHead}>
            <h3 className={styles.groupTitle}>Client work</h3>
            <p className="meta">Case studies</p>
          </div>

          {caseStudies.length ? (
            <ol className={styles.cases}>
              {caseStudies.map((study) => (
                <li key={study.id} className={styles.case} data-reveal="fade">
                  <p className={`meta ${styles.caseMeta}`}>
                    <span>{study.industry}</span>
                    <span>{study.year}</span>
                  </p>
                  <h4 className={styles.caseTitle}>{study.problem}</h4>
                  <p className={styles.caseApproach}>{study.approach}</p>
                  <ul className={styles.outcomes}>
                    {study.outcomes.map((outcome) => (
                      <li key={outcome}>{outcome}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          ) : (
            <p className={styles.empty} data-reveal="fade">
              Client case studies are published here as engagements complete — anonymised where a client requires
              it. Each one shows the problem, the reasoning, the architecture and the measured result.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
