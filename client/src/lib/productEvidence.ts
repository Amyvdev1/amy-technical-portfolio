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
  runtime?: "node";
  port?: number;
  preview?: string;
  articleTitle?: string;
};

export const developerTools: readonly DeveloperToolEvidence[] = [
  {
    index: "04",
    slug: "dx-orbit",
    name: "DX Orbit",
    type: "API DEVELOPER EXPERIENCE",
    stack: "Python · FastAPI · OpenAPI · YAML · pytest",
    detail:
      "Turn an OpenAPI document into an explainable scorecard across clarity, recovery, authentication, SDK readiness, eventing, and agent readiness. Compare revisions and export a Markdown report.",
    source: "https://github.com/Amyvdev1/dx-orbit",
    action: "Inspect DX Orbit source",
    signals: [
      "Deterministic scoring",
      "Traceable findings",
      "JSON/YAML upload",
      "Before/after comparison",
      "API regression tests",
    ],
    question:
      "How can API integration friction become an inspectable contract review?",
    boundary:
      "Contract analysis using explicit rules. Scores do not measure real developer behavior or certify API security. Projects and reports are not persisted.",
    workflow: [
      "Upload an OpenAPI JSON or YAML document",
      "Inspect category scores and actionable findings",
      "Compare revisions and export the report",
    ],
  },
  {
    index: "05",
    slug: "tooltrust",
    name: "ToolTrust",
    type: "AGENT TOOL RELIABILITY",
    stack: "Python · FastAPI · JSON Schema · pytest",
    detail:
      "Review tool contracts and replay the path through argument validation, permissions, human confirmation, and simulated execution. Make the reason an action stops visible.",
    source: "https://github.com/Amyvdev1/tooltrust",
    action: "Inspect ToolTrust source",
    signals: [
      "JSON Schema argument validation",
      "Permission checks",
      "Human confirmation",
      "Readable execution traces",
      "No external execution",
    ],
    question:
      "Can a tool call fail clearly before it crosses a permission or confirmation boundary?",
    boundary:
      "A deterministic tool-design lab. All execution is simulated; it does not run an autonomous agent or enforce identity-based production authorization.",
    workflow: [
      "Inspect the tool schema and risk findings",
      "Replay valid and invalid arguments",
      "Review the validation, permission, and confirmation trace",
    ],
  },
  {
    index: "06",
    slug: "devstart",
    name: "DevStart",
    type: "DEVELOPER ONBOARDING",
    stack: "Python · FastAPI · Pydantic · pytest",
    detail:
      "Practice six API integration scenarios, recover from intentional failures, and inspect session completion, first-attempt success, and recovery metrics.",
    source: "https://github.com/Amyvdev1/devstart",
    action: "Inspect DevStart source",
    signals: [
      "Authentication recovery",
      "Validation guidance",
      "Bounded retry strategies",
      "Session benchmarks",
      "Six deterministic scenarios",
    ],
    question:
      "Does an API error tell a developer enough to make the next attempt succeed?",
    boundary:
      "Local training scenarios, not research with real users. Sessions are stored in memory and reset when the service restarts.",
    workflow: [
      "Start a session and select a scenario",
      "Submit an attempt and read recovery guidance",
      "Correct the request and inspect the session benchmark",
    ],
  },
  {
    index: "07",
    slug: "hookforge",
    name: "HookForge",
    type: "WEBHOOK RELIABILITY",
    stack: "Python · FastAPI · HMAC · pytest",
    detail:
      "Simulate duplicate, invalid, retried, and out-of-order webhook deliveries. Compare receiver capabilities and inspect how each delivery affects the final state.",
    source: "https://github.com/Amyvdev1/hookforge",
    action: "Inspect HookForge source",
    signals: [
      "Signature checks",
      "Duplicate protection",
      "Stale-event rejection",
      "Bounded simulations",
      "Delivery-by-delivery traces",
    ],
    question:
      "Does a receiver preserve correct state when deliveries arrive twice or out of order?",
    boundary:
      "An in-process simulation. It does not probe external receivers, measure network latency, or prove production delivery reliability.",
    workflow: [
      "Choose receiver capabilities and a failure scenario",
      "Run a bounded delivery simulation",
      "Inspect accepted, rejected, and stale events",
    ],
  },
  {
    index: "08",
    slug: "signaldesk",
    name: "SignalDesk",
    type: "DOCUMENTATION INTELLIGENCE",
    stack: "Python · FastAPI · Pydantic · pytest",
    detail:
      "Group documentation feedback by step, language, and version. Prioritize actionable friction, resolve feedback, and export a GitHub-compatible issue draft.",
    source: "https://github.com/Amyvdev1/signaldesk",
    action: "Inspect SignalDesk source",
    signals: [
      "Feedback taxonomy",
      "Weighted priorities",
      "Completed-item filtering",
      "Issue draft export",
      "Reader-to-maintainer workflow",
    ],
    question:
      "Which documentation change should a maintainer investigate next, and why?",
    boundary:
      "Included feedback is fictional. Metrics describe submitted feedback, not measured user completion or abandonment. Records are held in memory; issue export does not post to GitHub.",
    workflow: [
      "Review fictional or locally submitted feedback",
      "Investigate the prioritized friction queue",
      "Export an issue draft and resolve the item",
    ],
  },
] as const;

export const decisionSystems: readonly DeveloperToolEvidence[] = [
  {
    index: "09",
    slug: "agentledger-economics",
    name: "AgentLedger",
    type: "AI AGENT ECONOMICS",
    stack: "React · Node.js 24 · SQLite · Playwright",
    detail:
      "Trace model calls, retries, tool attempts and human review through a persistent decision ledger. Compare cost per successful outcome and risk-adjusted value while keeping unknown prices visible.",
    source: "https://github.com/Amyvdev1/agentledger-economics",
    action: "Inspect AgentLedger source",
    signals: [
      "Seven failure scenarios",
      "Unknown-cost propagation",
      "Retry-aware cost formulas",
      "Persistent run history",
      "14 tests + browser verification",
    ],
    question: "When does an agent workflow become economically rational?",
    boundary:
      "Costs and external latency are estimates; outcomes come from deterministic local scenarios. No live models or tools run, and fixture frequencies are not a production distribution.",
    workflow: [
      "Define workflow steps, cost rates and a recovery policy",
      "Run scenarios and inspect costs, review and failure outcomes",
      "Compare the human baseline and export the evidence ledger",
    ],
    runtime: "node",
    port: 4311,
    preview: "/project-previews/agentledger-economics.png",
    articleTitle: "Why cost per successful outcome beats cost per model call",
  },
  {
    index: "10",
    slug: "trustboundary-agent-controls",
    name: "TrustBoundary",
    type: "AGENT PERMISSIONS + APPROVALS",
    stack: "React · Node.js 24 · JSON Schema · SQLite · Playwright",
    detail:
      "Evaluate a tool request against versioned permissions, scopes, budgets and human approvals before simulated execution. Retain idempotent results and replay the original policy decision.",
    source: "https://github.com/Amyvdev1/trustboundary-agent-controls",
    action: "Inspect TrustBoundary source",
    signals: [
      "26 adversarial evaluation cases",
      "Argument-bound approvals",
      "Expiring confirmation gates",
      "Duplicate side-effect protection",
      "Policy-aware replay",
    ],
    question:
      "What must be true before an agent crosses a side-effect boundary?",
    boundary:
      "Local policy and execution simulation. Caller-supplied roles are test inputs, not authenticated identities. No invoices, messages or external records are created; production security is not claimed.",
    workflow: [
      "Register a tool with a schema, risk and versioned policy",
      "Evaluate requests and approve exact arguments when required",
      "Inspect denials, duplicates and policy-version replay",
    ],
    runtime: "node",
    port: 4312,
    preview: "/project-previews/trustboundary-agent-controls.png",
    articleTitle: "Why approval must bind to arguments and policy version",
  },
  {
    index: "11",
    slug: "evidencegraph-decision-workspace",
    name: "EvidenceGraph",
    type: "RESEARCH PROVENANCE",
    stack: "React · Node.js 24 · Evidence graphs · SQLite · Playwright",
    detail:
      "Connect sources to claims, contradictions and human decisions. Keep freshness, missing evidence and confidence visible, and preserve the evidence snapshot behind each decision memo.",
    source: "https://github.com/Amyvdev1/evidencegraph-decision-workspace",
    action: "Inspect EvidenceGraph source",
    signals: [
      "Supporting + contradicting evidence",
      "Source freshness",
      "Human-approved suggestions",
      "Decision snapshots",
      "Structural citation validation",
    ],
    question:
      "Why should someone trust a conclusion, and what would change it?",
    boundary:
      "Included evidence is synthetic. Citation checks validate URL structure and graph references, not remote availability or source truth. Local heuristic suggestions require human approval.",
    workflow: [
      "Catalog sources and connect evidence to explicit claims",
      "Inspect unsupported claims, contradictions and stale sources",
      "Finalize a human decision with its evidence and uncertainty",
    ],
    runtime: "node",
    port: 4313,
    preview: "/project-previews/evidencegraph-decision-workspace.png",
    articleTitle: "A citation is a path, not a guarantee",
  },
  {
    index: "12",
    slug: "workflowroi-automation-economics",
    name: "WorkflowROI",
    type: "AUTOMATION DECISION SUPPORT",
    stack: "React · Node.js 24 · Cost models · SQLite · Playwright",
    detail:
      "Compare manual, partial and AI-assisted workflows using review time, adoption, maintenance and error losses. Inspect payback and sensitivity, including when the right decision is not to automate.",
    source: "https://github.com/Amyvdev1/workflowroi-automation-economics",
    action: "Inspect WorkflowROI source",
    signals: [
      "Three operating modes",
      "Risk-adjusted savings",
      "Break-even + first-year value",
      "Adoption and error sensitivity",
      "Explicit assumptions",
    ],
    question: "Does automation earn its implementation and operating cost?",
    boundary:
      "All economic outputs are forecasts under user-supplied assumptions. No production savings, adoption or error rates were measured. Confidence labels are human estimates, not calibrated probabilities.",
    workflow: [
      "Define labor, review, adoption, error and implementation assumptions",
      "Compare operating modes and their risk-adjusted cost",
      "Explore sensitivity and export a decision recommendation",
    ],
    runtime: "node",
    port: 4314,
    preview: "/project-previews/workflowroi-automation-economics.png",
    articleTitle: "When the right automation recommendation is do not automate",
  },
  {
    index: "13",
    slug: "developerjourney-observatory",
    name: "DeveloperJourney Observatory",
    type: "ONBOARDING + RECOVERY ANALYTICS",
    stack: "React · Node.js 24 · Event analytics · SQLite · Playwright",
    detail:
      "Follow synthetic developers from quickstart to first success. Compare documentation versions, classify recovery and drop-offs, and link prioritized improvements to a privacy-safe event trail.",
    source: "https://github.com/Amyvdev1/developerjourney-observatory",
    action: "Inspect DeveloperJourney source",
    signals: [
      "Deterministic journey fixtures",
      "First-success and recovery metrics",
      "Documentation comparisons",
      "Strict privacy field allowlist",
      "Evidence-linked recommendations",
    ],
    question:
      "Where does onboarding lose momentum, and what helps a developer recover?",
    boundary:
      "Synthetic onboarding sessions only. Timing is fixture-defined, not observed human behavior. No real developers, credentials, external API requests or production analytics are collected.",
    workflow: [
      "Run reproducible journeys for two documentation versions",
      "Inspect first-success timing, error recovery and drop-offs",
      "Export findings linked to synthetic session evidence",
    ],
    runtime: "node",
    port: 4315,
    preview: "/project-previews/developerjourney-observatory.png",
    articleTitle: "Measure recovery without collecting credentials",
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
  ...decisionSystems,
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
