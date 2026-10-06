"use client";

import { useId, useState } from "react";
import styles from "./ContactForm.module.css";

type Fields = { name: string; email: string; organization: string; problem: string };

/**
 * Four questions, and the one that matters is the last.
 *
 * There is no server behind this site, so the form composes an email to
 * Norns in the visitor's own mail client — and says so. Without scripting
 * the browser's native mailto submission is used.
 */
export function ContactForm({ email }: { email: string }) {
  const id = useId();
  const [composed, setComposed] = useState(false);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget)) as Fields;
    const from = data.organization ? `${data.name}, ${data.organization}` : data.name;
    const subject = `A problem worth solving — ${from}`;
    const signature = [data.name, data.organization, data.email].filter(Boolean);
    const body = [data.problem, "", "—", ...signature].join("\n");
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setComposed(true);
  };

  return (
    <form className={styles.form} action={`mailto:${email}`} method="post" encType="text/plain" onSubmit={onSubmit}>
      <div className={styles.field}>
        <label className="meta" htmlFor={`${id}-name`}>
          Name
        </label>
        <input className={styles.input} id={`${id}-name`} name="name" type="text" autoComplete="name" required />
      </div>

      <div className={styles.field}>
        <label className="meta" htmlFor={`${id}-email`}>
          Email
        </label>
        <input className={styles.input} id={`${id}-email`} name="email" type="email" autoComplete="email" required />
      </div>

      <div className={styles.field}>
        <label className="meta" htmlFor={`${id}-org`}>
          Organization <span className={styles.optional}>— optional</span>
        </label>
        <input className={styles.input} id={`${id}-org`} name="organization" type="text" autoComplete="organization" />
      </div>

      <div className={styles.field}>
        <label className="meta" htmlFor={`${id}-problem`}>
          What are you trying to solve?
        </label>
        <textarea className={`${styles.input} ${styles.area}`} id={`${id}-problem`} name="problem" rows={6} required />
      </div>

      <div className={styles.actions}>
        <button type="submit" className={`link ${styles.submit}`}>
          Send to Norns <span className="arrow arrow--right" aria-hidden="true">→</span>
        </button>
        <p className={styles.hint} id={`${id}-hint`} aria-live="polite">
          {composed
            ? `Your email client should now be open with the message addressed to ${email}.`
            : "Opens your email client with the message ready to send."}
        </p>
      </div>
    </form>
  );
}
