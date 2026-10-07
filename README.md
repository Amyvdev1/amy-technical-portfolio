# Amy Villa — AI Automation & Technical Solutions Portfolio

> **AI Automation & Technical Solutions Engineer**  
> **API-driven automation · Developer-facing systems · Product engineering**

[GitHub profile](https://github.com/Amyvdev1) · [Email](mailto:amyv.dev@gmail.com)

I build **API-driven automation and developer-facing systems that make complex workflows easier to implement, debug, and operate**.

This repository is the evidence interface around a set of public engineering studies. It is designed for three review depths: a fast recruiter scan, a deeper hiring-manager walkthrough, and source-level technical review through GitHub, tests, CI, and code paths.

## Review paths

| Path | Time | What to inspect |
|---|---:|---|
| **Recruiter** | ~2 min | Specialization, strongest systems, core capabilities, contact |
| **Hiring manager** | 5–10 min | Architecture, tradeoffs, failure states, testing, implementation boundaries |
| **Technical reviewer** | As needed | Public repositories, code paths, tests, CI, and reproducible local demos |

## Start here

| System | What it demonstrates | Public evidence |
|---|---|---|
| **[MailTrace DX Lab](https://github.com/Amyvdev1/Amyvdev1-mailtrace-dx-lab)** | Developer observability · webhook reliability · API debugging | HMAC, replay resistance, idempotency, retries, event ordering, raw payloads, SQLite, strict TypeScript, Playwright |
| **[ForgeFlow AI Automation](https://github.com/Amyvdev1/forgeflow-ai-automation)** | AI automation systems | Structured execution, optional AI provider, deterministic fallback, persisted state, human review, FastAPI |
| **Signal Engine — this repository** | Technical narrative · evidence interface | React/TypeScript, tested interaction state, recruiter path, product/system explanation |
| **[ClearRoute API](https://github.com/Amyvdev1/clearrout-api)** | API design · workflow state | Pydantic validation, explicit transitions, role rules, audit events, predictable error contracts |
| **[AccessPath Console](https://github.com/Amyvdev1/accessible-workflow-console)** | Product engineering · accessibility | Keyboard UX, semantic HTML, validation recovery, live feedback, axe/Vitest checks |

## Developer Experience & Agent Tools

Five public Python/FastAPI projects extend the portfolio's engineering evidence:

| Project | Review focus | Source |
| --- | --- | --- |
| DX Orbit | Explainable OpenAPI scorecards, revision comparison, and report export | [Repository](https://github.com/Amyvdev1/dx-orbit) |
| ToolTrust | JSON Schema argument validation, permissions, and confirmation traces | [Repository](https://github.com/Amyvdev1/tooltrust) |
| DevStart | API onboarding scenarios and explicit recovery guidance | [Repository](https://github.com/Amyvdev1/devstart) |
| HookForge | Duplicate delivery, stale-event rejection, and webhook failure simulation | [Repository](https://github.com/Amyvdev1/hookforge) |
| SignalDesk | Actionable documentation feedback and issue draft export | [Repository](https://github.com/Amyvdev1/signaldesk) |

The website includes source-backed case studies at `/projects/<project-name>`.
The Python applications run locally; the site does not claim to host their APIs.
Each case study documents its limitations and links to tests and CI results.

## Portfolio architecture

```text
Browser
  │
  ▼
React + TypeScript evidence interface
  ├── Home / specialization + technical work
  ├── Recruiter Fast Path
  ├── Interactive project studies
  └── Signal Lab
        │
        └── public engineering repositories
             ├── MailTrace: observability + reliability
             ├── ForgeFlow: AI automation systems
             ├── ClearRoute: API contracts + workflow state
             └── AccessPath: accessibility + recovery
```

## Main code map

| Path | Responsibility |
|---|---|
| [`client/src/App.tsx`](client/src/App.tsx) | Application routing and resilience boundary |
| [`client/src/lib/productEvidence.ts`](client/src/lib/productEvidence.ts) | Typed candidate and project evidence used across recruiter-facing surfaces |
| [`client/src/lib/signalEngine.ts`](client/src/lib/signalEngine.ts) | Pure, tested scene/progress navigation math |
| [`client/src/pages/Home.tsx`](client/src/pages/Home.tsx) | AI Automation & Technical Solutions hero, project catalog, and evidence actions |
| [`client/src/pages/RecruiterProof.tsx`](client/src/pages/RecruiterProof.tsx) | Fast review path for engineering evidence and implementation conversations |
| [`client/src/pages/DemoPage.tsx`](client/src/pages/DemoPage.tsx) | Interactive project-study surfaces |
| [`client/src/pages/SignalLab.tsx`](client/src/pages/SignalLab.tsx) | Stateful workflow simulation |
| [`scripts/verify-product-engineering.mjs`](scripts/verify-product-engineering.mjs) | Recruiter-signal, privacy, portability, and repository-hygiene checks |
| [`scripts/verify-recruiter-proof.mjs`](scripts/verify-recruiter-proof.mjs) | Shared evidence and review-path checks |
| [`scripts/verify-build-budget.mjs`](scripts/verify-build-budget.mjs) | Production JavaScript/CSS bundle budgets |
| [`.github/workflows/verify.yml`](.github/workflows/verify.yml) | Tests → hygiene → typecheck → recruiter proof → build → bundle budgets |

## Key product decisions

- **Specialization is immediate.** The first scene communicates AI Automation & Technical Solutions instead of making a reviewer infer the positioning after several scroll states.
- **Evidence is source-first.** Strong claims point to public repositories, tests, CI, or documented implementation boundaries.
- **Failure behavior is part of the story.** The linked systems expose degraded state, validation errors, retry behavior, or recovery paths instead of presenting only success cases.
- **Human judgment remains visible.** Automation is presented as a system with review points, not as unsupported autonomy.
- **Different repositories prove different skills.** Observability, AI automation, API design, and accessibility are intentionally separated instead of repeated as variations of the same tutorial.

## Verification

```bash
pnpm install --frozen-lockfile
pnpm test:portfolio
pnpm verify:product-engineering
pnpm check
pnpm verify:recruiter-proof
pnpm build
pnpm verify:bundle
```

The pull-request workflow runs the same critical path. The production bundle guard caps total JavaScript at **300 KiB raw / 95 KiB gzip** and CSS at **180 KiB raw / 45 KiB gzip** so performance regressions become visible during review.

## Deployment status

The Vercel project `amy-villa-signal-gallery` is connected to this repository. Pushes to `main` build the source at the repository root using `pnpm build`, with output in `dist/public` and SPA rewrites from `vercel.json`. The legacy `vercel-shell` directory is not the deployment source. Check the Vercel status on the exact commit before claiming a change is live.

## Engineering notes

The `/notes` collection extends the existing AV visual identity with long-form implementation essays. Each article has a decision diagram, source and test links, keyboard-accessible contents navigation, and explicit distinctions between lab behavior and production requirements.

- `/notes/valid-is-not-authorized`: ToolTrust's schema, permission, and confirmation boundaries.
- `/notes/webhooks-out-of-order`: HookForge's separate duplicate and stale-event protections.
- `/notes/errors-that-explain`: actionable API errors through DX Orbit and DevStart.

Article metadata lives in `client/src/lib/engineeringNotes.ts`; content and reading layout live in `client/src/pages/EngineeringNotes.tsx`. The article route is loaded separately from the homepage.

## Run locally

```bash
pnpm install --frozen-lockfile
pnpm dev
```

## Candidate context

**AI Automation & Technical Solutions Engineer**  
**Native English + Spanish · Remote collaboration**

My paid freelance experience includes digital systems, AI-assisted workflows, process organization, bilingual delivery, and remote operational handoffs. The software repositories here are self-directed public engineering work; I do not present that history as years of formal full-stack employment.

## Evidence boundary

These projects use sample data and demonstrate implementation choices and engineering judgment. They do not claim production users, enterprise scale, customer outcomes, formal security certification, accessibility compliance, or production experience beyond what the repositories explicitly document.

## Contact

**Amy Villa** · [amyv.dev@gmail.com](mailto:amyv.dev@gmail.com) · [GitHub](https://github.com/Amyvdev1)
