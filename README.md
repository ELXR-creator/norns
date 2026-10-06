# norns.ltd

The website of Norns.

Next.js (App Router), TypeScript and plain CSS. Exported as a static site — no server required.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static output in ./out
npm run lint
npm run typecheck
npm run preview:build   # after build: one self-contained preview page in ./preview
```

`preview/index.html` is a still, script-free copy of the homepage (fonts embedded) for sharing
without running the site. Regenerate it after content changes.

## Structure

```
brand/                     Source brand assets (not served)
  norns-mark-original.png  The official raster master — keep untouched
  norns-mark-traced.svg    Vector trace of the master (99.7% pixel overlap)
src/brand/mark.ts          The mark's path data — the one place to swap in an official SVG
src/content/               Everything that changes: site facts, work, research
src/components/home/       The homepage chapters, in page order
src/components/site/       Navigation + Index, footer
src/components/motion/     Two small primitives: reveal on entry, focus band
src/app/globals.css        Design tokens (colour, type, space, motion, layers) and base styles
```

## Common changes

All content lives in `src/content/`. Components never need editing for a content change.

| To change | Edit |
| --- | --- |
| Positioning line, promise, contact email | `site.ts` |
| The five capability areas, and which one leads | `capabilities.ts` |
| Packaged engagements (name, fit, duration, outputs) | `engagements.ts` |
| Products (status, link, own visual universe) | `work.ts` → `products` |
| Client case studies | `work.ts` → `caseStudies` |
| Insights / research entries | `research.ts` |
| Index menu and footer links | `site.ts` → `index`, `elsewhere`, `legal` |

**Add a case study.** Append to `caseStudies` in `work.ts` once an engagement is complete and the
client has agreed (anonymise if needed). Write it as problem → approach → measured outcomes. The
empty-state message disappears automatically.

**Launch a product.** Give it an `href` (it then appears in the footer and gets an "Enter" link),
and a `universe` once it has its own identity — its colours and type take over its frame.

**Publish an insight.** Add `href` (and `minutes`) to an entry in `research.ts` once the piece
exists. Until then it is listed as unpublished and is not a link.

**Replace the mark with an official vector.** Update `MARK_WIDTH`, `MARK_HEIGHT` and
`MARK_PATH` in `src/brand/mark.ts`, then regenerate `src/app/icon.svg`, `src/app/apple-icon.png`
and `public/og.png` from it.

**Contact.** The form composes an email in the visitor's own mail client to `site.contactEmail`;
there is no backend.

## Principles the code follows

- Content is visible without JavaScript. Scripts only ever hold things back to reveal them.
- `prefers-reduced-motion` removes motion; the scroll sequence becomes a still list.
- Nothing is presented as existing before it does: no invented clients, metrics or testimonials;
  products show their real status; unpublished insights are not clickable.
