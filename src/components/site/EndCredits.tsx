import Link from "next/link";
import { NornsMark } from "@/components/brand/NornsMark";
import { elsewhere, index, legal, site } from "@/content/site";
import { publicProducts } from "@/content/work";
import styles from "./EndCredits.module.css";

/**
 * The end credits: every way onward, set as two quiet lines.
 * Pages first, then profiles; then copyright, address and legal.
 * Used under the final symbol on the homepage and as the footer elsewhere
 * (where the small symbol leads, since there is no large one above it).
 */
export function EndCredits({ withMark = false }: { withMark?: boolean }) {
  const outward = [
    ...publicProducts.map((p) => ({ label: p.name, href: p.href })),
    ...elsewhere,
  ];

  return (
    <div className={styles.credits}>
      <div className={styles.primary}>
        {withMark ? (
          <Link href="/" className={styles.home} aria-label={`${site.name}, home`} prefetch={false}>
            <NornsMark className={styles.mark} />
          </Link>
        ) : null}

        <nav aria-label="Pages" className={styles.pages}>
          <ul className={styles.list}>
            {index.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className={styles.item} prefetch={false}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {outward.length ? (
          <nav aria-label="Elsewhere" className={styles.elsewhere}>
            <ul className={styles.list}>
              {outward.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className={styles.item} target="_blank" rel="noopener">
                    {item.label}
                    <span className={styles.out} aria-hidden="true">
                      ↗
                    </span>
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </div>

      <div className={styles.secondary}>
        <p className="meta">
          © {site.year} {site.legalName}
        </p>
        <a className={`meta ${styles.small}`} href={`mailto:${site.contactEmail}`}>
          {site.contactEmail}
        </a>
        <ul className={styles.legal}>
          {legal.map((item) => (
            <li key={item.label}>
              <Link href={item.href} className={`meta ${styles.small}`} prefetch={false}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
