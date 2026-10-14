export const reviewPaths = [
  {
    slug: "api-documentation",
    number: "01",
    title: "API Documentation",
    question: "Can a reader get from setup to a result they understand?",
    summary:
      "A first request, an interrupted workflow, and the decisions documentation needs to explain.",
    outcome:
      "Follow a runnable quickstart, interpret partial results, and inspect the evidence behind recovery guidance.",
    steps: [
      {
        name: "HookForge SDK",
        task: "Make the first request",
        detail:
          "Start the local API, build the generated client, and distinguish duplicate delivery from event ordering.",
        evidence:
          "A fresh-clone guide with Windows and macOS/Linux commands, expected results, and eight local HTTP checks.",
        boundary:
          "Real local HTTP; simulated webhook receiver behavior. No external delivery.",
        source: "hookforge-sdk",
        doc: "docs/quickstart.md",
        label: "Run the quickstart",
        study: "hookforge",
      },
      {
        name: "Olostep Reliability Lab",
        task: "Recover without starting over",
        detail:
          "Follow a batch through polling, pagination and retrieval. Stop at a deadline, then resume from a checkpoint.",
        evidence:
          "Offline scenarios, a recovery guide, and a separately documented bounded live compatibility check.",
        boundary:
          "Simulated failures are distinct from live observations. A completed batch can still produce partial data.",
        source: "olostep-integration-reliability-lab",
        doc: "README.md#try-a-recovery",
        label: "Follow the recovery",
        study: "olostep-integration-reliability-lab",
      },
      {
        name: "DX Orbit",
        task: "Review the contract",
        detail:
          "Connect documentation gaps to explicit OpenAPI checks and explainable findings.",
        evidence:
          "Source, rule-based analysis, and exported findings that a developer can inspect.",
        boundary:
          "A score describes the configured rules; it does not certify an API or measure developer satisfaction.",
        source: "dx-orbit",
        doc: "README.md",
        label: "Inspect the analysis",
        study: "dx-orbit",
      },
    ],
  },
  {
    slug: "security-writing",
    number: "02",
    title: "Security Writing",
    question: "Can a security claim survive a closer look?",
    summary:
      "From signed bytes to a trust decision: reproduce behavior, examine boundaries, explain the consequence.",
    outcome:
      "Separate authentication, freshness, duplicate detection and permissions without treating them as interchangeable guarantees.",
    steps: [
      {
        name: "Webhook Trust Lab",
        task: "Reproduce the central claim",
        detail:
          "See why a valid signature does not make an event new, then inspect the local transaction that prevents a repeated effect.",
        evidence:
          "Runnable tests, recorded scenarios, and explicit rollback and concurrency behavior.",
        boundary:
          "The effect is an SQLite row. This is a custom teaching protocol, not a vendor integration or a payment system.",
        source: "webhook-trust-lab",
        doc: "README.md#fresh-clone-quickstart",
        label: "Run the security lab",
        study: "webhook-trust-lab",
      },
      {
        name: "Threat model & evidence",
        task: "Challenge the explanation",
        detail:
          "Trace the assets, actors and assumptions. Compare each claim with the test or implementation that supports it.",
        evidence:
          "A public threat model and a claims-and-evidence record for the same implementation.",
        boundary:
          "Local verification does not establish production security, throughput or resistance to every threat.",
        source: "webhook-trust-lab",
        doc: "docs/claims-and-evidence.md",
        label: "Inspect the evidence",
        study: "webhook-trust-lab",
      },
      {
        name: "ToolTrust",
        task: "Extend the reasoning to tools",
        detail:
          "Inspect how schemas, permissions and confirmation decisions affect a simulated tool call.",
        evidence:
          "Readable validation traces and structured reasons for stopping an action.",
        boundary:
          "A deterministic design lab; it does not enforce production identity or run an autonomous agent.",
        source: "tooltrust",
        doc: "README.md",
        label: "Explore tool decisions",
        study: "tooltrust",
      },
    ],
  },
  {
    slug: "developer-education",
    number: "03",
    title: "Developer Education",
    question: "Does the explanation help someone decide what to do next?",
    summary:
      "Small experiments, visible outcomes, and a guided route from an error to recovery.",
    outcome:
      "Move from observing a failure to explaining a recovery decision, then examine how onboarding friction can be measured.",
    steps: [
      {
        name: "HookForge SDK",
        task: "Teach one distinction at a time",
        detail:
          "Run two short examples: duplicate delivery in order, then a newer event arriving before an older one.",
        evidence:
          "Executable examples with an expected-results table and troubleshooting steps.",
        boundary:
          "The receiver is simulated. The examples teach distinct decisions, not production webhook operation.",
        source: "hookforge-sdk",
        doc: "docs/quickstart.md#4-explain-two-different-reliability-decisions",
        label: "Try the two examples",
        study: "hookforge",
      },
      {
        name: "Olostep guided walkthrough",
        task: "Explain the next action",
        detail:
          "Follow the workflow and identify when to inspect a partial report, retry a read, or resume an existing batch.",
        evidence:
          "A local console and a public walkthrough guide connected to the same runner.",
        boundary:
          "Offline scenarios illustrate client policy; they are not recordings of provider incidents.",
        source: "olostep-integration-reliability-lab",
        doc: "docs/walkthrough.md",
        label: "Read the walkthrough",
        study: "olostep-integration-reliability-lab",
      },
      {
        name: "DeveloperJourney Observatory",
        task: "Measure the learning path",
        detail:
          "Compare synthetic onboarding journeys and connect friction or recovery findings to a documentation improvement.",
        evidence:
          "Journey events, before/after analysis, and recommendations linked to the included fixtures.",
        boundary:
          "Synthetic benchmark evidence only; no claim about real users or production adoption.",
        source: "developerjourney-observatory",
        doc: "README.md",
        label: "Inspect the journeys",
        study: "developerjourney-observatory",
      },
    ],
  },
] as const;
