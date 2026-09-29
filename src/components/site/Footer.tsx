import Link from "next/link";
import { elsewhere, index, legal, site } from "@/content/site";
import { publicProducts } from "@/content/work";
import styles from "./Footer.module.css";

/**
 * Useful, not cinematic. Columns appear only when they have something real
 * to list — products once public, profiles once they exist.
 */
export function Footer() {
  const columns = [
    { title: "Index", items: index.map(({ label, href }) => ({ label, href, external: false })) },
    { title: "Products", items: publicProducts.map((p) => ({ label: p.name, href: p.href, external: true })) },
    { title: "Elsewhere", items: elsewhere.map(({ label, href }) => ({ label, href, external: true })) },
  ].filter((column) => column.items.length > 0);

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.identity}>
          <Link href="/" className={styles.wordmark}>
            {site.name}
          </Link>
          <p className={styles.line}>An independent technology company.</p>
        </div>

        {columns.map((column) => (
          <nav key={column.title} className={styles.column} aria-label={column.title}>
            <p className={`meta ${styles.columnTitle}`}>{column.title}</p>
            <ul className={styles.links}>
              {column.items.map((item) => (
                <li key={item.href}>
                  {item.external ? (
                    <a href={item.href} className={styles.item} target="_blank" rel="noopener">
                      {item.label} <span aria-hidden="true">↗</span>
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  ) : (
                    <Link href={item.href} className={styles.item} prefetch={false}>
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className={styles.base}>
          <p className="meta">
            © {site.year} {site.legalName}
          </p>
          <ul className={styles.legal}>
            {legal.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={`meta ${styles.legalLink}`} prefetch={false}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
