/**
 * Packaged engagements — the productised way into Norns.
 *
 * Each has a fixed shape: who it is for, how long it takes, what you leave
 * with. Prices are agreed per engagement after a first conversation and
 * are not published while they are still being calibrated.
 *
 * Durations assume founder-led delivery alongside other commitments.
 * Revisit them as delivery data accumulates.
 */

export type Engagement = {
  id: string;
  name: string;
  /** The situation that makes this the right starting point. */
  forWhen: string;
  duration: string;
  outputs: string[];
};

export const engagements: Engagement[] = [
  {
    id: "discovery-sprint",
    name: "Discovery Sprint",
    forWhen: "You have an idea or a problem and need to know what to build — or whether to build at all.",
    duration: "2 weeks",
    outputs: [
      "Problem and stakeholder map",
      "Options with trade-offs",
      "Recommended architecture",
      "Scoped plan and estimate",
    ],
  },
  {
    id: "kg-architecture-sprint",
    name: "Knowledge Graph Architecture Sprint",
    forWhen: "You need a knowledge graph or semantic layer and want to start from the right model.",
    duration: "3 weeks",
    outputs: [
      "Domain model and competency questions",
      "Ontology v1 with validation shapes",
      "Target architecture",
      "Implementation roadmap",
    ],
  },
  {
    id: "ontology-health-check",
    name: "Ontology Health Check",
    forWhen: "You already have an ontology or graph, and it is getting harder to trust, extend or query.",
    duration: "1–2 weeks",
    outputs: [
      "Modelling and consistency review",
      "Validation coverage report",
      "Query and performance findings",
      "Prioritised fixes",
    ],
  },
  {
    id: "graphrag-prototype-sprint",
    name: "GraphRAG Prototype Sprint",
    forWhen: "You want AI answers grounded in your own knowledge — and evidence it works before you commit.",
    duration: "4 weeks",
    outputs: [
      "Working prototype on your data",
      "Knowledge model and retrieval design",
      "Evaluation set and results",
      "Path to production",
    ],
  },
];
