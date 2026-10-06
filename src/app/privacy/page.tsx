import type { Metadata } from "next";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How norns.ltd handles information.",
  alternates: { canonical: "/privacy/" },
};

export default function PrivacyPage() {
  return (
    <article className="plain" aria-labelledby="privacy-title">
      <div className="container plain__layout">
        <header className="plain__head">
          <p className="meta">Legal</p>
          <h1 id="privacy-title" className="plain__title">
            Privacy
          </h1>
          <p className="meta">Last updated September 2026</p>
        </header>

        <div className="plain__body">
          <h2>This website</h2>
          <p>
            {site.domain} does not use cookies, analytics or advertising trackers, and does not ask you to create an
            account.
          </p>
          <p>
            Like any website, it is served by a hosting provider that may keep standard technical logs — such as IP
            address, browser type and time of request — for security and reliability.
          </p>

          <h2>When you contact us</h2>
          <p>
            If you write to {site.name}, we receive what you choose to send: typically your name, email address,
            organization and a description of the problem. We use it to read, consider and reply to your message. We
            do not sell it or use it for marketing.
          </p>
          <p>
            Messages sent through the contact form are delivered by Formspree, a form-processing service, which
            stores them on our behalf so they reach our inbox.
          </p>

          <h2>Questions</h2>
          <p>
            Write to <a className="link" href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a> to ask what we
            hold about you or to have it deleted.
          </p>
        </div>
      </div>
    </article>
  );
}
