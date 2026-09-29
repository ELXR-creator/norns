# norns.ltd

The website of Norns.

Next.js (App Router), TypeScript and plain CSS. Exported as a static site — no server required.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static output in ./out
npm run lint
npm run typecheck
```

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

**Publish a product.** In `src/content/work.ts`, change a slot from `visibility: "private"` to
`"public"` and give it a `name`, `summary`, `href`, `cta` and a `universe` (its own ground,
ink, accent and optional typeface). The slot renders in the product's colours inside the Norns
frame, and the product appears in the footer automatically.

**Publish research.** In `src/content/research.ts`, add `href` (and `minutes`) to an entry once
the piece exists. Until then it is listed as unpublished and is not a link.

**Add a profile link.** Add it to `elsewhere` in `src/content/site.ts`; the footer column
appears when the list is non-empty.

**Replace the mark with an official vector.** Update `MARK_WIDTH`, `MARK_HEIGHT` and
`MARK_PATH` in `src/brand/mark.ts`, then regenerate `src/app/icon.svg`, `src/app/apple-icon.png`
and `public/og.png` from it.

**Contact address.** `site.contactEmail` in `src/content/site.ts`. The contact form composes an
email in the visitor's own mail client; there is no backend.

## Principles the code follows

- Content is visible without JavaScript. Scripts only ever hold things back to reveal them.
- `prefers-reduced-motion` removes motion; the scroll sequence becomes a still list.
- Nothing is presented as existing before it does: private work has no name or link,
  unpublished research is not clickable.
