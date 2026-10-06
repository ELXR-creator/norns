"use client";

import { useId, useRef, useState } from "react";
import styles from "./ContactForm.module.css";

type Fields = { name: string; email: string; organization: string; problem: string };
type Status = "idle" | "sending" | "sent" | "error";

/**
 * Four questions, and the one that matters is the last.
 *
 * With a form endpoint (Formspree), the message is delivered to Norns
 * directly and the visitor stays on the page. Without one, the form falls
 * back to composing an email in the visitor's own mail client — and says so.
 */
export function ContactForm({ email, endpoint }: { email: string; endpoint?: string }) {
  const id = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [sender, setSender] = useState("");
  const confirmationRef = useRef<HTMLDivElement>(null);

  const composeEmail = (data: Fields) => {
    const from = data.organization ? `${data.name}, ${data.organization}` : data.name;
    const subject = `A problem worth solving — ${from}`;
    const signature = [data.name, data.organization, data.email].filter(Boolean);
    const body = [data.problem, "", "—", ...signature].join("\n");
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData) as Fields;

    if (!endpoint) {
      composeEmail(data);
      setStatus("sent");
      return;
    }

    setStatus("sending");
    formData.set("_subject", `A problem worth solving — ${data.organization || data.name}`);
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error(`Form service responded ${response.status}`);
      setSender(data.name);
      setStatus("sent");
      form.reset();
      requestAnimationFrame(() => confirmationRef.current?.focus());
    } catch {
      setStatus("error");
    }
  };

  if (endpoint && status === "sent") {
    return (
      <div ref={confirmationRef} className={styles.confirmation} tabIndex={-1} role="status">
        <p className="meta">Received</p>
        <p className={styles.thanks}>
          Thank you{sender ? `, ${sender}` : ""}. Your message is with Norns.
        </p>
        <p className={styles.hint}>Replies come from {email}.</p>
      </div>
    );
  }

  return (
    <form
      className={styles.form}
      action={endpoint ?? `mailto:${email}`}
      method="post"
      encType={endpoint ? undefined : "text/plain"}
      onSubmit={onSubmit}
      aria-busy={status === "sending"}
    >
      <div className={`${styles.field} ${styles.half}`}>
        <label className="meta" htmlFor={`${id}-name`}>
          Name
        </label>
        <input className={styles.input} id={`${id}-name`} name="name" type="text" autoComplete="name" required />
      </div>

      <div className={`${styles.field} ${styles.half}`}>
        <label className="meta" htmlFor={`${id}-email`}>
          Email
        </label>
        <input className={styles.input} id={`${id}-email`} name="email" type="email" autoComplete="email" required />
      </div>

      <div className={`${styles.field} ${styles.full}`}>
        <label className="meta" htmlFor={`${id}-org`}>
          Organization <span className={styles.optional}>— optional</span>
        </label>
        <input className={styles.input} id={`${id}-org`} name="organization" type="text" autoComplete="organization" />
      </div>

      <div className={`${styles.field} ${styles.full}`}>
        <label className="meta" htmlFor={`${id}-problem`}>
          What are you trying to solve?
        </label>
        <textarea className={`${styles.input} ${styles.area}`} id={`${id}-problem`} name="problem" rows={4} required />
      </div>

      {/* Spam trap: invisible to people, filled in by bots. */}
      {endpoint ? (
        <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className={styles.trap} aria-hidden="true" />
      ) : null}

      <div className={styles.actions}>
        <button type="submit" className={`link ${styles.submit}`} disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send to Norns"}{" "}
          <span className="arrow arrow--right" aria-hidden="true">
            →
          </span>
        </button>
        <p className={styles.hint} aria-live="polite">
          {status === "error" ? (
            <span className={styles.error}>
              The message didn&rsquo;t go through. Please try again, or write to {email}.
            </span>
          ) : endpoint ? (
            `Delivered directly to ${email}.`
          ) : status === "sent" ? (
            `Your email client should now be open with the message addressed to ${email}.`
          ) : (
            "Opens your email client with the message ready to send."
          )}
        </p>
      </div>
    </form>
  );
}
