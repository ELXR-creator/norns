import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactPaths } from "@/components/contact/ContactPaths";
import { legal, site } from "@/content/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description: "Bring Norns a problem worth solving.",
  alternates: { canonical: "/contact/" },
};

/**
 * Tell us, or find us. Two routes into the same place: the form on the
 * left, and the other paths on the right, joined by one thread. The site
 * footer stands down here — its destinations are part of the page.
 */
export default function ContactPage() {
  return (
    <section className={styles.contact} data-chapter="Contact" data-contact aria-labelledby="contact-title">
      <div className={`container ${styles.layout}`}>
        <div className={styles.tell}>
          <header className={styles.head}>
            <p className="meta">Tell us</p>
            <h1 id="contact-title" className={styles.title}>
              <span>Tell us what</span> <span>you&rsquo;re trying</span> <span>to solve.</span>
            </h1>
            <p className={styles.note}>Describe the problem, not the solution you have in mind.</p>
          </header>

          <ContactForm email={site.contactEmail} endpoint={site.formEndpoint || undefined} />
        </div>

        <ContactPaths />

        <footer className={styles.credits}>
          <p className="meta">
            © {site.year} {site.legalName}
          </p>
          <ul className={styles.legal}>
            {legal.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className={`meta ${styles.small}`} prefetch={false}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </footer>
      </div>
    </section>
  );
}
