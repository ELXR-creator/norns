import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { bookingUrl, site } from "@/content/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description: "Bring Norns a problem worth solving.",
  alternates: { canonical: "/contact/" },
};

export default function ContactPage() {
  return (
    <section className={styles.contact} data-chapter="Contact" aria-labelledby="contact-title">
      <div className={`container ${styles.layout}`}>
        <header className={styles.head}>
          <p className="meta">Contact</p>
          <h1 id="contact-title" className={styles.title}>
            Tell us what you&rsquo;re trying to solve.
          </h1>
          <p className={styles.note}>Describe the problem, not the solution you have in mind.</p>
          <p className={styles.direct}>
            <span className="meta">Or write directly</span>
            <a className="link" href={`mailto:${site.contactEmail}`}>
              {site.contactEmail}
            </a>
          </p>
          {bookingUrl ? (
            <p className={styles.direct}>
              <span className="meta">Or book a call</span>
              <a className="link" href={bookingUrl} target="_blank" rel="noopener">
                Choose a time <span className="arrow" aria-hidden="true">↗</span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </p>
          ) : null}
        </header>

        <ContactForm email={site.contactEmail} />
      </div>
    </section>
  );
}
