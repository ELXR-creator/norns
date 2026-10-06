import { NornsMark } from "@/components/brand/NornsMark";
import { bookingUrl, profiles, site } from "@/content/site";
import styles from "./ContactPaths.module.css";

type Glyph = "write" | "talk" | "know" | "work";
type Route = {
  key: Glyph;
  label: string;
  links: { label: string; href: string; external: boolean }[];
};

/**
 * The other ways in, organised by intention rather than by platform.
 * A route with no destinations is left out entirely.
 */
function routes(): Route[] {
  const out = (p: { label: string; href: string }) => ({ ...p, external: true });
  const all: Route[] = [
    {
      key: "write",
      label: "Write",
      links: [{ label: site.contactEmail, href: `mailto:${site.contactEmail}`, external: false }],
    },
    {
      key: "talk",
      label: "Talk",
      links: bookingUrl ? [{ label: "Book a time", href: bookingUrl, external: true }] : [],
    },
    {
      key: "know",
      label: "Socials",
      links: [profiles.linkedin, profiles.github].filter((p) => p.href).map(out),
    },
    {
      key: "work",
      label: "Let’s work together",
      links: [profiles.upwork, profiles.contra].filter((p) => p.href).map(out),
    },
  ];
  return all.filter((route) => route.links.length);
}

/**
 * Small line-drawn symbols from the same geometry as the mark: points,
 * hairlines, and the mark's 43° diagonal.
 */
function RouteGlyph({ kind }: { kind: Glyph }) {
  return (
    <svg className={styles.glyph} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {kind === "write" ? (
        // A point, and the line it begins.
        <>
          <circle cx="4.5" cy="12" r="1.75" className={styles.dot} />
          <path d="M9.5 12H21" />
        </>
      ) : kind === "talk" ? (
        // Two points, held by one arc.
        <>
          <circle cx="4.5" cy="15.5" r="1.75" className={styles.dot} />
          <circle cx="19.5" cy="15.5" r="1.75" className={styles.dot} />
          <path d="M4.5 15.5a7.5 7.5 0 0 1 15 0" />
        </>
      ) : kind === "know" ? (
        // An open node, splitting outward.
        <>
          <circle cx="6.5" cy="12" r="2.75" />
          <path d="M9 10.6 16.5 3.6M9 13.4l7.5 7" />
        </>
      ) : (
        // Two lines converging, continuing as one.
        <>
          <path d="M3 5l7.5 7L3 19M10.5 12H21" />
          <circle cx="10.5" cy="12" r="1.5" className={styles.dot} />
        </>
      )}
    </svg>
  );
}

/**
 * Find us: the paths into Norns that are not the form.
 *
 * Desktop — the mark at the head of one thread; each route branches off
 * it, and the form's own thread joins it at the foot.
 * Phones — one continuing path down the page, ending on the mark.
 */
export function ContactPaths() {
  const list = routes();

  return (
    <nav className={styles.paths} aria-labelledby="find-us" data-reveal>
      <span className={styles.trunk} aria-hidden="true" />

      <div className={styles.head}>
        <NornsMark className={styles.origin} />
        <h2 id="find-us" className="meta">
          Or find us
        </h2>
      </div>

      <ul className={styles.routes}>
        {list.map((route, i) => (
          <li
            key={route.key}
            className={styles.route}
            style={{ "--i": i } as React.CSSProperties}
          >
            <svg className={styles.branch} viewBox="0 0 44 20" aria-hidden="true" focusable="false">
              <path d="M.5 0C.5 12 8 19.5 20 19.5H44" pathLength={1} />
            </svg>
            <RouteGlyph kind={route.key} />
            <p className={`meta ${styles.label}`}>{route.label}</p>
            <ul className={styles.links}>
              {route.links.map((link) => (
                <li key={link.href}>
                  <a
                    className={`link ${styles.out}`}
                    href={link.href}
                    {...(link.external ? { target: "_blank", rel: "noopener" } : {})}
                  >
                    {link.label}
                    {link.external ? (
                      <>
                        <span className="arrow" aria-hidden="true">
                          ↗
                        </span>
                        <span className="sr-only">(opens in a new tab)</span>
                      </>
                    ) : null}
                  </a>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      {/* Where the form's thread arrives (desktop), and where the path ends
          (phones). */}
      <span className={styles.end} aria-hidden="true" />
      <NornsMark className={styles.terminus} />
    </nav>
  );
}
