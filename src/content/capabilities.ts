/**
 * What Norns does, in five areas.
 *
 * Each area leads with the problem it answers, then the work it involves.
 * Technologies are deliberately absent from the headline copy: clients buy
 * outcomes, not stacks. Mark the area currently leading acquisition with
 * `lead: true` — today that is Knowledge, Norns' deepest specialism.
 */

export type Capability = {
  id: string;
  name: string;
  /** The problem this area answers, in one or two sentences. */
  problem: string;
  /** Typical work — short, plain, outcome-shaped. */
  work: string[];
  lead?: boolean;
};

export const capabilities: Capability[] = [
  {
    id: "knowledge",
    name: "Knowledge",
    lead: true,
    problem:
      "When meaning is scattered across systems and people, nothing built on top can be trusted. We make it explicit: models, graphs and semantic layers that applications and AI can rely on.",
    work: [
      "Ontology and knowledge architecture",
      "Knowledge graph development",
      "Semantic integration and entity resolution",
      "Validation and data contracts (SHACL)",
      "Enterprise semantic layers and graph APIs",
      "GraphRAG and AI provenance",
    ],
  },
  {
    id: "data",
    name: "Data",
    problem:
      "Most intelligence problems are data problems first. We design the pipelines, models and integrations that make data reliable enough to build on.",
    work: [
      "Data pipelines and automation",
      "Data modelling and database architecture",
      "Integrations, APIs and migrations",
      "Data quality and governance",
      "Metadata and schema mapping",
    ],
  },
  {
    id: "intelligence",
    name: "Intelligence",
    problem:
      "AI that is grounded in your knowledge, evaluated against your reality and wired into real workflows — not a demo that fails in week two.",
    work: [
      "RAG and GraphRAG systems",
      "AI assistants and agents",
      "Document intelligence and extraction",
      "Semantic search",
      "AI workflow automation",
      "Evaluation and provenance",
    ],
  },
  {
    id: "products",
    name: "Products",
    problem:
      "Ideas only matter once someone can use them. We take business problems and turn them into working digital products.",
    work: [
      "MVPs and SaaS products",
      "AI applications",
      "Internal tools and admin systems",
      "Web applications and APIs",
      "Prototypes and product redesigns",
    ],
  },
  {
    id: "advisory",
    name: "Advisory",
    problem:
      "The most expensive mistakes are made before anything is built. We help you decide what to build, how, and what not to build at all.",
    work: [
      "Technical and product discovery",
      "System and data architecture",
      "AI readiness and knowledge graph feasibility",
      "Build-vs-buy and vendor evaluation",
      "MVP scoping and roadmaps",
    ],
  },
];
