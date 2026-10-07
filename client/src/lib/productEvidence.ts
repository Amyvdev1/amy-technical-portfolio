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

export type DeveloperToolEvidence = PublicProjectEvidence & {
  question: string;
  boundary: string;
  workflow: readonly string[];
};

export const developerTools: readonly DeveloperToolEvidence[] = [
  {
    index: "04", slug: "dx-orbit", name: "DX Orbit", type: "API DEVELOPER EXPERIENCE",
    stack: "Python · FastAPI · OpenAPI · YAML · pytest",
    detail: "Turn an OpenAPI document into an explainable scorecard across clarity, recovery, authentication, SDK readiness, eventing, and agent readiness. Compare revisions and export a Markdown report.",
    source: "https://github.com/Amyvdev1/dx-orbit", action: "Inspect DX Orbit source",
    signals: ["Deterministic scoring", "Traceable findings", "JSON/YAML upload", "Before/after comparison", "API regression tests"],
    question: "How can API integration friction become an inspectable contract review?",
    boundary: "Contract analysis using explicit rules. Scores do not measure real developer behavior or certify API security. Projects and reports are not persisted.",
    workflow: ["Upload an OpenAPI JSON or YAML document", "Inspect category scores and actionable findings", "Compare revisions and export the report"],
  },
  {
    index: "05", slug: "tooltrust", name: "ToolTrust", type: "AGENT TOOL RELIABILITY",
    stack: "Python · FastAPI · JSON Schema · pytest",
    detail: "Review tool contracts and replay the path through argument validation, permissions, human confirmation, and simulated execution. Make the reason an action stops visible.",
    source: "https://github.com/Amyvdev1/tooltrust", action: "Inspect ToolTrust source",
    signals: ["JSON Schema argument validation", "Permission checks", "Human confirmation", "Readable execution traces", "No external execution"],
    question: "Can a tool call fail clearly before it crosses a permission or confirmation boundary?",
    boundary: "A deterministic tool-design lab. All execution is simulated; it does not run an autonomous agent or enforce identity-based production authorization.",
    workflow: ["Inspect the tool schema and risk findings", "Replay valid and invalid arguments", "Review the validation, permission, and confirmation trace"],
  },
  {
    index: "06", slug: "devstart", name: "DevStart", type: "DEVELOPER ONBOARDING",
    stack: "Python · FastAPI · Pydantic · pytest",
    detail: "Practice six API integration scenarios, recover from intentional failures, and inspect session completion, first-attempt success, and recovery metrics.",
    source: "https://github.com/Amyvdev1/devstart", action: "Inspect DevStart source",
    signals: ["Authentication recovery", "Validation guidance", "Bounded retry strategies", "Session benchmarks", "Six deterministic scenarios"],
    question: "Does an API error tell a developer enough to make the next attempt succeed?",
    boundary: "Local training scenarios, not research with real users. Sessions are stored in memory and reset when the service restarts.",
    workflow: ["Start a session and select a scenario", "Submit an attempt and read recovery guidance", "Correct the request and inspect the session benchmark"],
  },
  {
    index: "07", slug: "hookforge", name: "HookForge", type: "WEBHOOK RELIABILITY",
    stack: "Python · FastAPI · HMAC · pytest",
    detail: "Simulate duplicate, invalid, retried, and out-of-order webhook deliveries. Compare receiver capabilities and inspect how each delivery affects the final state.",
    source: "https://github.com/Amyvdev1/hookforge", action: "Inspect HookForge source",
    signals: ["Signature checks", "Duplicate protection", "Stale-event rejection", "Bounded simulations", "Delivery-by-delivery traces"],
    question: "Does a receiver preserve correct state when deliveries arrive twice or out of order?",
    boundary: "An in-process simulation. It does not probe external receivers, measure network latency, or prove production delivery reliability.",
    workflow: ["Choose receiver capabilities and a failure scenario", "Run a bounded delivery simulation", "Inspect accepted, rejected, and stale events"],
  },
  {
    index: "08", slug: "signaldesk", name: "SignalDesk", type: "DOCUMENTATION INTELLIGENCE",
    stack: "Python · FastAPI · Pydantic · pytest",
    detail: "Group documentation feedback by step, language, and version. Prioritize actionable friction, resolve feedback, and export a GitHub-compatible issue draft.",
    source: "https://github.com/Amyvdev1/signaldesk", action: "Inspect SignalDesk source",
    signals: ["Feedback taxonomy", "Weighted priorities", "Completed-item filtering", "Issue draft export", "Reader-to-maintainer workflow"],
    question: "Which documentation change should a maintainer investigate next, and why?",
    boundary: "Included feedback is fictional. Metrics describe submitted feedback, not measured user completion or abandonment. Records are held in memory; issue export does not post to GitHub.",
    workflow: ["Review fictional or locally submitted feedback", "Investigate the prioritized friction queue", "Export an issue draft and resolve the item"],
  },
] as const;

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
  ...developerTools,
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
