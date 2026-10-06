import Link from "next/link";
import { elsewhere, index, legal, site } from "@/content/site";
import { publicProducts } from "@/content/work";
import styles from "./Footer.module.css";

/**
 * Two quiet lines that close the page. On the homepage they sit inside the
 * final screen, under the completed mark, so the page ends on one frame.
 * Groups appear only when they have something real to list.
 */
export function Footer() {
  const groups = [
    { title: "Index", items: index.map(({ label, href }) => ({ label, href, external: false })) },
    { title: "Products", items: publicProducts.map((p) => ({ label: p.name, href: p.href, external: true })) },
    { title: "Elsewhere", items: elsewhere.map(({ label, href }) => ({ label, href, external: true })) },
  ].filter((group) => group.items.length > 0);

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.primary}>
          <Link href="/" className={styles.wordmark} prefetch={false}>
            {site.name}
          </Link>

          {groups.map((group) => (
            <nav key={group.title} className={styles.group} aria-label={group.title}>
              <ul className={styles.links}>
                {group.items.map((item) => (
                  <li key={item.label}>
                    {item.external ? (
                      <a href={item.href} className={styles.item} target="_blank" rel="noopener">
                        {item.label}
                        <span className={styles.out} aria-hidden="true">
                          ↗
                        </span>
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
        </div>

        <div className={styles.base}>
          <p className="meta">
            © {site.year} {site.legalName}
          </p>
          <a className={`meta ${styles.baseLink}`} href={`mailto:${site.contactEmail}`}>
            {site.contactEmail}
          </a>
          <ul className={styles.legal}>
            {legal.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className={`meta ${styles.baseLink}`} prefetch={false}>
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
