"use client";

import { useId, useRef, useState } from "react";
import styles from "./ContactForm.module.css";

type Fields = { name: string; email: string; organization: string; problem: string };
type Required = "name" | "email" | "problem";
type Errors = Partial<Record<Required, string>>;
type Status = "idle" | "sending" | "sent" | "error";

const ORDER: Required[] = ["name", "email", "problem"];

function validate(data: Fields): Errors {
  const errors: Errors = {};
  if (!data.name?.trim()) errors.name = "Tell us who is writing.";
  if (!data.email?.trim()) errors.email = "Needed, so we can reply.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()))
    errors.email = "This address looks incomplete.";
  if (!data.problem?.trim()) errors.problem = "A few sentences about the problem is enough.";
  return errors;
}

/**
 * Three short questions, then the one that matters.
 *
 * With a form endpoint (Formspree), the message is delivered to Norns
 * directly and the visitor stays on the page. Without one, the form falls
 * back to composing an email in the visitor's own mail client — and says so.
 */
export function ContactForm({ email, endpoint }: { email: string; endpoint?: string }) {
  const id = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [sender, setSender] = useState("");
  const [height, setHeight] = useState<number>();
  const confirmationRef = useRef<HTMLDivElement>(null);

  const fieldId = (name: string) => `${id}-${name}`;

  const composeEmail = (data: Fields) => {
    const from = data.organization ? `${data.name}, ${data.organization}` : data.name;
    const subject = `A problem worth solving — ${from}`;
    const signature = [data.name, data.organization, data.email].filter(Boolean);
    const body = [data.problem, "", "—", ...signature].join("\n");
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const clearError = (name: string) => {
    if (!(name in errors)) return;
    setErrors((current) => {
      const next = { ...current };
      delete next[name as Required];
      return next;
    });
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData) as Fields;

    const found = validate(data);
    setErrors(found);
    const first = ORDER.find((key) => found[key]);
    if (first) {
      document.getElementById(fieldId(first))?.focus();
      return;
    }

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
      // Hold the composition still while the form gives way.
      setHeight(form.offsetHeight);
      setSender(data.name.trim().split(/\s+/)[0] ?? "");
      setStatus("sent");
      requestAnimationFrame(() => confirmationRef.current?.focus());
    } catch {
      setStatus("error");
    }
  };

  // The thread that carries the message across to the paths (desktop).
  const thread = <span className={styles.thread} aria-hidden="true" />;

  if (endpoint && status === "sent") {
    return (
      <div
        ref={confirmationRef}
        className={styles.confirmation}
        style={height ? { minHeight: height } : undefined}
        tabIndex={-1}
        role="status"
        data-sent
      >
        <div className={styles.received}>
          <p className={styles.receivedTitle}>Received.</p>
          <p className={styles.receivedNote}>
            {sender ? `Thank you, ${sender}. ` : ""}We&rsquo;ll take it from here.
          </p>
          <p className="meta">The reply will come from {email}</p>
        </div>
        <div className={styles.actions}>
          <p className={`meta ${styles.delivered}`}>Delivered</p>
          {thread}
        </div>
      </div>
    );
  }

  const errorCount = Object.keys(errors).length;

  const describe = (name: Required) => (errors[name] ? `${fieldId(name)}-error` : undefined);
  const fieldError = (name: Required) =>
    errors[name] ? (
      <p id={`${fieldId(name)}-error`} className={styles.fieldError}>
        {errors[name]}
      </p>
    ) : null;

  return (
    <form
      className={styles.form}
      action={endpoint ?? `mailto:${email}`}
      method="post"
      encType={endpoint ? undefined : "text/plain"}
      onSubmit={onSubmit}
      onInput={(event) => clearError((event.target as HTMLInputElement).name)}
      noValidate
      aria-busy={status === "sending"}
    >
      <div className={styles.details}>
        <div className={styles.field} data-invalid={errors.name ? "" : undefined}>
          <label className="meta" htmlFor={fieldId("name")}>
            Your name
          </label>
          <input
            className={styles.input}
            id={fieldId("name")}
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={describe("name")}
          />
          {fieldError("name")}
        </div>

        <div className={styles.field} data-invalid={errors.email ? "" : undefined}>
          <label className="meta" htmlFor={fieldId("email")}>
            Where can we reach you?
          </label>
          <input
            className={styles.input}
            id={fieldId("email")}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={describe("email")}
          />
          {fieldError("email")}
        </div>

        <div className={styles.field}>
          <label className="meta" htmlFor={fieldId("organization")}>
            Organization <span className={styles.optional}>— optional</span>
          </label>
          <input
            className={styles.input}
            id={fieldId("organization")}
            name="organization"
            type="text"
            autoComplete="organization"
          />
        </div>
      </div>

      <div className={`${styles.field} ${styles.problem}`} data-invalid={errors.problem ? "" : undefined}>
        <label className={styles.problemLabel} htmlFor={fieldId("problem")}>
          What are you trying to solve?
        </label>
        <textarea
          className={`${styles.input} ${styles.area}`}
          id={fieldId("problem")}
          name="problem"
          rows={5}
          required
          aria-invalid={errors.problem ? true : undefined}
          aria-describedby={describe("problem")}
        />
        {fieldError("problem")}
      </div>

      {/* Spam trap: invisible to people, filled in by bots. */}
      {endpoint ? (
        <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className={styles.trap} aria-hidden="true" />
      ) : null}

      <div className={styles.send}>
        <div className={styles.actions}>
          <button type="submit" className={`link ${styles.submit}`} disabled={status === "sending"} data-send>
            {status === "sending" ? "Sending…" : "Send to Norns"}{" "}
            <span className="arrow arrow--right" aria-hidden="true">
              →
            </span>
          </button>
          {thread}
        </div>
        <p className={styles.hint} aria-live="polite">
          {errorCount ? (
            <span className={styles.error}>
              {errorCount === 1 ? "One field needs" : `${errorCount === 2 ? "Two" : "Three"} fields need`} attention.
            </span>
          ) : status === "error" ? (
            <span className={styles.error}>
              Not sent — the connection failed. Your message is still here; try again, or write to {email}.
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
