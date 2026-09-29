import Link from "next/link";
import styles from "./InvitationChapter.module.css";

/**
 * Chapter 07 — Selective consulting.
 * Not a services list. A door, for a problem worth bringing.
 */
export function InvitationChapter() {
  return (
    <section className={styles.invitation} aria-labelledby="invitation-title">
      <div className={`container ${styles.layout}`}>
        <h2 id="invitation-title" className={styles.title} data-reveal>
          Have a problem worth solving?
        </h2>
        <div className={styles.body} data-reveal style={{ "--reveal-delay": "150ms" } as React.CSSProperties}>
          <p className={styles.text}>
            We occasionally work with organizations on problems that require a different way of thinking.
          </p>
          <Link href="/contact/" className={`link ${styles.cta}`} prefetch={false}>
            Talk to Norns <span className="arrow arrow--right" aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
