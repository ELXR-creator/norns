/**
 * Builds a single, self-contained preview of the homepage from the static
 * export in ./out: the real HTML and CSS, fonts embedded, scripts removed.
 *
 * The result is the page as it renders without JavaScript — every chapter
 * fully visible, the scroll sequence as a still list, the mark complete.
 * The Index menu, the contact page and the reveal animations need the full
 * site (`npm run dev`).
 *
 * Usage: npm run build && npm run preview:build
 * Output: preview/index.html (written as a page fragment: <title>, <style>
 * and body content, ready to publish as a hosted preview).
 */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const out = join(root, "out");
const html = readFileSync(join(out, "index.html"), "utf8");

// --- Styles: inline every stylesheet, embedding fonts as data URIs. -------
const stylesheets = [...html.matchAll(/<link rel="stylesheet" href="([^"]+)"/g)].map((m) => m[1]);
let css = stylesheets
  .map((href) => {
    const file = join(out, href);
    return readFileSync(file, "utf8").replace(/url\(([^)]+\.woff2)\)/g, (_, rel) => {
      const font = readFileSync(join(dirname(file), rel));
      return `url(data:font/woff2;base64,${font.toString("base64")})`;
    });
  })
  .join("\n");

// The font variables are scoped to classes on <html>; the preview has no
// <html> of its own, so move them to :root.
const htmlClasses = (html.match(/<html[^>]*class="([^"]+)"/)?.[1] ?? "").split(/\s+/).filter(Boolean);
for (const cls of htmlClasses) css = css.split(`.${cls}`).join(":root");

// --- Body: no scripts, internal links made local to the preview. ----------
let body = html.match(/<body[^>]*>([\s\S]*)<\/body>/)?.[1] ?? "";
body = body
  .replace(/<script\b[\s\S]*?<\/script>/g, "")
  .replace(/<div hidden="">[\s\S]*?<\/div>/, "")
  .replace(/href="\/#([\w-]+)"/g, 'href="#$1"')
  .replace(/href="\/"/g, 'href="#main"')
  .replace(/href="\/(contact|privacy)\/"/g, 'href="#preview-note"');

const note = `
<aside id="preview-note" class="preview-note">
  <div class="container">
    <p class="meta">Preview</p>
    <p>This is a still preview of the Norns homepage. The Index menu, scroll animations, contact page
    and privacy page work in the full site — run it locally with <code>npm run dev</code>.</p>
  </div>
</aside>`;
body = body.replace(/<footer/, `${note}<footer`);

const previewCss = `
/* Preview only: the Index needs JavaScript, so it is hidden here. */
:root { color-scheme: dark; }
button[aria-controls="index"], #index { display: none !important; }
.preview-note { padding-block: var(--s-8); border-top: var(--hairline) solid var(--c-line); background: var(--c-void); color: var(--c-text-2); }
.preview-note .container { display: grid; row-gap: var(--s-3); max-width: var(--page-max); }
.preview-note p:last-child { max-width: 60ch; }
.preview-note code { font-family: var(--font-mono); color: var(--c-paper); }
`;

const page = `<title>Norns</title>
<meta name="description" content="Still preview of the Norns homepage.">
<style>
${css}
${previewCss}
</style>
${body.trim()}
`;

mkdirSync(join(root, "preview"), { recursive: true });
writeFileSync(join(root, "preview", "index.html"), page);
console.log(`preview/index.html — ${(Buffer.byteLength(page) / 1024).toFixed(0)} KB`);
