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
 * Profiles elsewhere. Paste a URL to publish one; an empty string keeps it
 * off the site, so nothing ever links to a profile that does not exist.
 * Order here is the order in the footer.
 *
 * Deliberately absent: Fiverr and bidding marketplaces — they signal
 * low-cost gig work and undercut the Norns positioning.
 */
export const profiles = {
  linkedin: { label: "LinkedIn", href: "" },
  github: { label: "GitHub", href: "" },
  upwork: { label: "Upwork", href: "" },
  contra: { label: "Contra", href: "" },
} satisfies Record<string, NavItem>;

export const elsewhere: NavItem[] = Object.values(profiles).filter((p) => p.href);

/**
 * A scheduling link (Cal.com, Calendly) for a first call. Shown on the
 * contact page beside the email address once set.
 */
export const bookingUrl = "";

export const legal: NavItem[] = [{ label: "Privacy", href: "/privacy/" }];
