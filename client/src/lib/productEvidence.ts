export type CandidateProfile = {
  languages: string;
  focus: string;
};

export type PublicProjectEvidence = {
  index: string;
  slug: string;
  name: string;
  type: string;
  stack: string;
  detail: string;
  source: string;
  action: string;
  signals: readonly string[];
};

export type LiveReviewTopic = {
  label: string;
  title: string;
  detail: string;
};

export const candidateProfile: CandidateProfile = {
  languages: "Native English + Spanish",
  focus: "AI Automation & Technical Solutions Engineer",
};

export const publicProjectEvidence: readonly PublicProjectEvidence[] = [
  {
    index: "01",
    slug: "forgeflow-ai-automation",
    name: "ForgeFlow AI Automation",
    type: "AI AUTOMATION SYSTEM",
    stack: "React · TypeScript · FastAPI · SQLite · Docker · CI",
    detail:
      "A reviewable automation system that makes validated inputs, execution state, persisted history, fallback behavior, and the human decision point visible instead of hiding them behind a black box.",
    source: "https://github.com/Amyvdev1/forgeflow-ai-automation",
    action: "Inspect ForgeFlow source",
    signals: [
      "Typed API contracts",
      "Persisted run history",
      "Visible fallback behavior",
      "Explicit human review",
      "Backend + interface checks",
      "GitHub Actions CI",
    ],
  },
  {
    index: "02",
    slug: "clearrout-api",
    name: "ClearRoute API",
    type: "API DESIGN + WORKFLOW STATE",
    stack: "Python · FastAPI · Pydantic · REST · pytest",
    detail:
      "A focused API sample built around typed validation, explicit task-state transitions, predictable error contracts, and audit-friendly events for an interface or integration consumer.",
    source: "https://github.com/Amyvdev1/clearrout-api",
    action: "Inspect ClearRoute source",
    signals: [
      "Typed request validation",
      "Explicit transition graph",
      "403 / 404 / 409 / 422 contracts",
      "Audit-friendly events",
      "Focused API tests",
    ],
  },
  {
    index: "03",
    slug: "accesspath-console",
    name: "AccessPath Console",
    type: "PRODUCT ENGINEERING + ACCESSIBILITY",
    stack: "React · TypeScript · Semantic HTML · Vitest · axe",
    detail:
      "A keyboard-first workboard focused on recovery: semantic structure, visible focus, labelled validation, live status feedback, responsive layouts, and targeted accessibility regression checks.",
    source: "https://github.com/Amyvdev1/accessible-workflow-console",
    action: "Inspect AccessPath source",
    signals: [
      "Keyboard-operable controls",
      "Validation recovery",
      "Visible focus + status",
      "Responsive product surface",
      "Focused accessibility checks",
    ],
  },
] as const;

export const liveReviewTopics: readonly LiveReviewTopic[] = [
  {
    label: "TRACE",
    title: "Trace product state end to end",
    detail:
      "Follow a React input through validation, the FastAPI route, SQLite persistence, the returned execution state, and the UI feedback that explains what happened.",
  },
  {
    label: "FAIL",
    title: "Inspect the failure and recovery path",
    detail:
      "Show how ForgeFlow distinguishes deterministic execution, optional provider use, and a degraded fallback so a user can understand the result instead of guessing.",
  },
  {
    label: "TEST",
    title: "Run the verification path",
    detail:
      "Run focused tests, type checks, and production builds, then explain what each check proves and what it intentionally does not prove.",
  },
  {
    label: "CHANGE",
    title: "Make a scoped product improvement live",
    detail:
      "Change a validation rule, API state, recovery message, or interface behavior, then explain the product tradeoff and the regression check that should protect it.",
  },
];
