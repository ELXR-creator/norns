import Link from "next/link";
import styles from "./InvitationChapter.module.css";

/**
 * Chapter — Start a project.
 * A door for a problem worth bringing, not a sales pitch.
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
            Start with the problem, not the solution you have in mind. If Norns isn&rsquo;t the right fit, we will
            say so.
          </p>
          <Link href="/contact/" className={`link ${styles.cta}`} prefetch={false}>
            Start a project <span className="arrow arrow--right" aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
