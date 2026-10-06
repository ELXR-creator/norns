import type { WorkEntry } from "@/content/work";
import styles from "./WorkSlot.module.css";

/**
 * A place in the Norns body of work.
 *
 * Private slots are reserved space: no name, no picture, no link — nothing
 * that is not yet true. Public entries bring their own universe (colours,
 * type, imagery) through CSS variables scoped to the slot, while the Norns
 * frame around them stays constant.
 */
export function WorkSlot({ entry }: { entry: WorkEntry }) {
  const label = `Work ${entry.index}`;

  if (entry.visibility === "private") {
    return (
      <article className={styles.slot} data-visibility="private" aria-label={`${label}, private`}>
        <div className={styles.frame} aria-hidden="true">
          <span className={styles.corners} />
          <span className={`meta ${styles.reserved}`}>Not yet public</span>
        </div>
        <p className={styles.caption}>
          <span className="meta">Work / {entry.index}</span>
          <span className={`meta ${styles.status}`}>Private</span>
          <span className={`meta ${styles.year}`}>{entry.year}</span>
        </p>
      </article>
    );
  }

  const { universe } = entry;
  const universeStyle = {
    "--u-ground": universe.ground,
    "--u-ink": universe.ink,
    "--u-accent": universe.accent ?? universe.ink,
    "--u-font": universe.fontFamily ?? "var(--font-sans)",
  } as React.CSSProperties;

  return (
    <article className={styles.slot} data-visibility="public" style={universeStyle} aria-labelledby={`${entry.id}-name`}>
      <div className={styles.frame}>
        {entry.visual ? (
          // eslint-disable-next-line @next/next/no-img-element -- static export, pre-optimised assets
          <img className={styles.visual} src={entry.visual.src} alt={entry.visual.alt} loading="lazy" decoding="async" />
        ) : null}
      </div>
      <div className={styles.caption}>
        <span className="meta">Work / {entry.index}</span>
        <h3 id={`${entry.id}-name`} className={styles.name}>
          {entry.name}
        </h3>
        <p className={styles.summary}>{entry.summary}</p>
        {entry.href ? (
          <a className={`link ${styles.enter}`} href={entry.href} target="_blank" rel="noopener">
            {entry.cta ?? `Enter ${entry.name}`} <span className="arrow" aria-hidden="true">↗</span>
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        ) : null}
      </div>
    </article>
  );
}
