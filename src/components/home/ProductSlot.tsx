import type { Product } from "@/content/work";
import styles from "./ProductSlot.module.css";

/**
 * A product built by Norns.
 *
 * Until a product has its own identity and imagery, its frame stays a
 * reserved drawing, hatched at the angle of the mark; its honest status
 * is stated in the caption. Once it has a `universe`, its colours and type take over
 * the frame through scoped CSS variables while the Norns caption stays.
 */
export function ProductSlot({ product }: { product: Product }) {
  const { universe } = product;
  const universeStyle = universe
    ? ({
        "--u-ground": universe.ground,
        "--u-ink": universe.ink,
        "--u-accent": universe.accent ?? universe.ink,
        "--u-font": universe.fontFamily ?? "var(--font-sans)",
      } as React.CSSProperties)
    : undefined;

  return (
    <article
      className={styles.slot}
      data-themed={universe ? "" : undefined}
      style={universeStyle}
      aria-labelledby={`${product.id}-name`}
    >
      <div className={styles.frame} aria-hidden={product.visual ? undefined : true}>
        {product.visual ? (
          // eslint-disable-next-line @next/next/no-img-element -- static export, pre-optimised assets
          <img className={styles.visual} src={product.visual.src} alt={product.visual.alt} loading="lazy" decoding="async" />
        ) : (
          <span className={styles.corners} />
        )}
      </div>

      <div className={styles.caption}>
        <p className={styles.metaRow}>
          <span className="meta">Product / {product.index}</span>
          <span className={`meta ${styles.status}`}>{product.status}</span>
          <span className={`meta ${styles.year}`}>{product.year}</span>
        </p>
        <h4 id={`${product.id}-name`} className={styles.name}>
          {product.name}
        </h4>
        <p className={styles.summary}>{product.summary}</p>
        {product.href ? (
          <a className={`link ${styles.enter}`} href={product.href} target="_blank" rel="noopener">
            {product.cta ?? `Enter ${product.name}`} <span className="arrow" aria-hidden="true">↗</span>
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        ) : null}
      </div>
    </article>
  );
}
