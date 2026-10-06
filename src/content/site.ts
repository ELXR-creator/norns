/**
 * Site-wide facts. Change values here, not in components.
 */

export const site = {
  name: "Norns",
  legalName: "Norns Ltd.",
  domain: "norns.ltd",
  url: "https://norns.ltd",
  title: "Norns — Product, Data & Intelligence",
  description:
    "Norns helps organizations turn complex ideas and data into intelligent products and systems. We advise, architect and build.",
  statement: ["The future isn't predicted.", "It's constructed."] as const,
  /** What Norns is, in one line. */
  positioning: "Product. Data. Intelligence.",
  /** What Norns does, in one sentence. */
  promise: "We help organizations turn complex ideas and data into intelligent products and systems.",
  founder: "Piyush Jha",
  year: 2026,
  /**
   * The inbox that receives enquiries from /contact.
   * TODO(norns): confirm this address exists before launch.
   */
  contactEmail: "hello@norns.ltd",
} as const;

export type NavItem = { label: string; href: string; note?: string };

/** The Index. Order is the order of the page. */
export const index: NavItem[] = [
  { label: "Capabilities", href: "/#capabilities", note: "What we do" },
  { label: "Engagements", href: "/#engagements", note: "Ways to begin" },
  { label: "Work", href: "/#work", note: "Products and case studies" },
  { label: "Insights", href: "/#insights", note: "Notes and research" },
  { label: "About", href: "/#about", note: "Norns Ltd." },
  { label: "Contact", href: "/contact/", note: "Start a project" },
];

/**
 * External profiles. Leave empty until they exist; the footer only renders
 * what is listed here.
 */
export const elsewhere: NavItem[] = [];

export const legal: NavItem[] = [{ label: "Privacy", href: "/privacy/" }];
