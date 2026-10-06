/**
 * Work at Norns — two kinds of evidence.
 *
 * PRODUCTS are built and operated by Norns. They prove Norns can own a
 * product, not only advise on one. Each may bring its own visual universe.
 *
 * CASE STUDIES are client engagements, written as business problem →
 * reasoning → architecture → execution → measurable result. Anonymise the
 * client where needed; never publish one without the client's agreement.
 * Nothing is listed until it is true.
 */

/* --- Products ------------------------------------------------------------ */

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

export type Product = {
  id: string;
  index: string;
  name: string;
  summary: string;
  /** Honest, current state — e.g. "In development", "Private beta", "Live". */
  status: string;
  year: number;
  /** Only once there is somewhere meaningful to go. */
  href?: string;
  cta?: string;
  /** Only once the product has its own identity. */
  universe?: ProductUniverse;
  visual?: { src: string; alt: string };
};

export const products: Product[] = [
  {
    id: "skema",
    index: "01",
    name: "Skema",
    summary:
      "Semantic infrastructure for governed schemas, knowledge graphs and provenance — knowledge that AI systems can rely on.",
    status: "In development",
    year: 2026,
  },
  {
    id: "forgeos",
    index: "02",
    name: "ForgeOS",
    summary: "An accountability system for challenges, proof, teams and progression.",
    status: "In development",
    year: 2026,
  },
];

/** Products shown in the footer: public, and with somewhere to go. */
export const linkedProducts = products.filter((p): p is Product & { href: string } => Boolean(p.href));

/* --- Case studies -------------------------------------------------------- */

export type CaseStudy = {
  id: string;
  /** e.g. "Financial services", "Manufacturing". */
  industry: string;
  /** Client name, or a description when anonymised ("A European insurer"). */
  client: string;
  /** The business problem, stated as the client would recognise it. */
  problem: string;
  /** What Norns designed and delivered, in one sentence. */
  approach: string;
  /** Measured results only — e.g. "Manual reconciliation cut from 3 days to 2 hours". */
  outcomes: string[];
  capabilities: string[];
  year: number;
};

/**
 * Add engagements here as they complete. Full write-ups keep the same
 * internal shape: problem, context, constraints, discovery, options,
 * decision, architecture, execution, outcome, lessons, reusable IP.
 */
export const caseStudies: CaseStudy[] = [];
