/**
 * Work built at Norns.
 *
 * Every product is equal in status and is allowed its own visual universe.
 * A slot is either `private` (reserved — shown without name, visual or link)
 * or `public` (fully described). Converting a slot is a change to one object.
 *
 * Example of a public entry, once a product is ready to be shown:
 *
 *   {
 *     id: "skema",
 *     index: "01",
 *     year: 2026,
 *     visibility: "public",
 *     name: "Skema",
 *     summary: "One sentence on the problem it solves.",
 *     href: "https://skema.global",
 *     cta: "Enter Skema",
 *     universe: {
 *       ground: "#…", ink: "#…", accent: "#…",
 *       fontFamily: "…",          // optional
 *     },
 *     visual: { src: "/work/skema/cover.webp", alt: "…" },
 *   }
 */

export type ProductUniverse = {
  /** Background of the product's world. */
  ground: string;
  /** Primary text colour inside that world. */
  ink: string;
  /** The product's own accent. */
  accent?: string;
  /** Optional product typeface (must be loaded by the product entry). */
  fontFamily?: string;
};

type WorkBase = {
  id: string;
  index: string;
  year: number;
};

export type PrivateWork = WorkBase & {
  visibility: "private";
};

export type PublicWork = WorkBase & {
  visibility: "public";
  name: string;
  summary: string;
  href?: string;
  cta?: string;
  universe: ProductUniverse;
  visual?: { src: string; alt: string };
  /** The product's own logo, shown beside its name. */
  logo?: { src: string; alt: string };
  /** A live page shown in the frame, scaled down, for reference. */
  embed?: { src: string; title: string };
};

export type WorkEntry = PrivateWork | PublicWork;

export const work: WorkEntry[] = [
  {
    id: "skema",
    index: "01",
    year: 2026,
    visibility: "public",
    name: "Skema",
    summary:
      "A schema-governance platform: AI drafts schema changes from your documents, machines validate them, at least two parties sign each one, and every decision is kept with its evidence — so your data model becomes a governed, versioned, auditable shared language.",
    href: "https://skema.world/",
    cta: "Enter Skema",
    universe: { ground: "#16070d", ink: "#f4eef0", accent: "#8a1f43" },
    logo: { src: "/work/skema/logo.png", alt: "" },
  },
  { id: "work-02", index: "02", year: 2026, visibility: "private" },
];

/**
 * Product links for the footer. A product appears there only once it is
 * public and has somewhere meaningful to go.
 */
export const publicProducts = work.filter(
  (entry): entry is PublicWork & { href: string } =>
    entry.visibility === "public" && Boolean(entry.href),
);
