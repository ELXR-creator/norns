import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactPaths } from "@/components/contact/ContactPaths";
import { site } from "@/content/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description: "Bring Norns a problem worth solving.",
  alternates: { canonical: "/contact/" },
};

/**
 * Tell us, or find us. Two routes into the same place: the form on the
 * left, and the other paths on the right, joined by one thread — composed
 * to fit one screen on desktop. The site footer stands down here: its
 * destinations are part of the page.
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
            <p className={styles.note}>Describe the problem, and let&rsquo;s solve it together.</p>
          </header>

          <ContactForm email={site.contactEmail} endpoint={site.formEndpoint || undefined} />
        </div>

        <ContactPaths />
      </div>
    </section>
  );
}
