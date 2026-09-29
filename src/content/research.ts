/**
 * The Norns archive: research, essays, notes.
 *
 * Nothing is presented as published unless `href` points to a real page.
 * Entries without it are listed honestly as unpublished and are not links.
 */

export type ResearchKind = "Research" | "Essay" | "Note";

export type ResearchEntry = {
  id: string;
  /** Archive number — shown as N / 001. */
  number: string;
  title: string;
  kind: ResearchKind;
  /** Set only when the piece exists. */
  href?: string;
  /** Reading time in minutes — only for published pieces. */
  minutes?: number;
};

export const research: ResearchEntry[] = [
  {
    id: "intelligence-needs-structure",
    number: "001",
    title: "Intelligence needs structure.",
    kind: "Research",
  },
  {
    id: "accountability-changes-software",
    number: "002",
    title: "Why accountability changes software.",
    kind: "Note",
  },
  {
    id: "systems-that-survive",
    number: "003",
    title: "Building systems that survive their creators.",
    kind: "Essay",
  },
];
