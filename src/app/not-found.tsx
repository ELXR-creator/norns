import Link from "next/link";

export default function NotFound() {
  return (
    <section className="plain" aria-labelledby="nf-title">
      <div className="container plain__layout">
        <header className="plain__head">
          <p className="meta">404</p>
          <h1 id="nf-title" className="plain__title">
            Nothing has been built here.
          </h1>
        </header>
        <div className="plain__body">
          <Link href="/" className="link">
            Return to Norns <span className="arrow arrow--right" aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
