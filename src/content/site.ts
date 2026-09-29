/**
 * Site-wide facts. Change values here, not in components.
 */

export const site = {
  name: "Norns",
  legalName: "Norns Ltd.",
  domain: "norns.ltd",
  url: "https://norns.ltd",
  title: "Norns — Building What Comes Next",
  description:
    "Norns is an independent technology company building products, systems and research around problems worth solving.",
  statement: ["The future isn't predicted.", "It's constructed."] as const,
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
  { label: "Work", href: "/#work", note: "Things being built" },
  { label: "Research", href: "/#research", note: "The archive" },
  { label: "Company", href: "/#company", note: "Norns Ltd." },
  { label: "Contact", href: "/contact/", note: "Bring a problem" },
];

/**
 * External profiles. Leave empty until they exist; the footer only renders
 * what is listed here.
 */
export const elsewhere: NavItem[] = [];

export const legal: NavItem[] = [{ label: "Privacy", href: "/privacy/" }];
