# Amy Villa — Product Engineering Portfolio

> **Product Engineer · Developer Experience**  
> **React · TypeScript · APIs · Reliable Product Interfaces**

[Live portfolio](https://amy-villa-signal-gallery.vercel.app/) · [Recruiter Fast Path](https://amy-villa-signal-gallery.vercel.app/recruiter-proof) · [GitHub profile](https://github.com/Amyvdev1) · [Email](mailto:amyv.dev@gmail.com)

I build developer-facing product experiences that make **system state, errors, fallback behavior, and the next action easy to understand**.

This repository is the React + TypeScript portfolio shell around a set of public engineering studies. The strongest examples focus on product trust: typed boundaries, visible state, useful recovery, accessible interaction, and verification that a reviewer can run instead of taking claims on faith.

## Start here

| Review path | What to inspect | Product / engineering signal |
|---|---|---|
| **[ForgeFlow AI Automation](https://github.com/Amyvdev1/forgeflow-ai-automation)** | React/TypeScript dashboard, FastAPI, SQLite, Docker, tests, CI | Typed API contracts, persisted execution state, visible fallback behavior, explicit human review |
| **[ClearRoute API](https://github.com/Amyvdev1/clearrout-api)** | FastAPI, Pydantic, task-state rules, audit events, API tests | Predictable contracts, explicit transitions, integration errors, traceability |
| **[AccessPath Console](https://github.com/Amyvdev1/accessible-workflow-console)** | React/TypeScript, semantic HTML, keyboard behavior, axe/Vitest checks | Recovery, visible focus, validation feedback, live status, accessible product craft |
| **Signal Engine portfolio** | `Home.tsx`, `RecruiterProof.tsx`, product-state helpers, CI | Product storytelling, tested interaction math, responsive behavior, recruiter evidence architecture |

If you have only a few minutes, open the **[Recruiter Fast Path](https://amy-villa-signal-gallery.vercel.app/recruiter-proof)** and start with ForgeFlow.

## What this repository demonstrates

- **Product surfaces** — React and TypeScript interfaces that make complex state understandable.
- **Developer experience** — source-first documentation, predictable review paths, and clear implementation boundaries.
- **API UX** — validation, explicit state transitions, understandable errors, and consumer-oriented contracts across the linked backend samples.
- **Failure and recovery** — visible degraded/fallback states instead of silent or misleading success paths.
- **Accessibility practice** — keyboard-operable controls, semantic structure, focus treatment, validation recovery, and live status feedback.
- **Verification discipline** — behavior tests, type checking, recruiter-proof checks, production builds, bundle budgets, and GitHub Actions.

## Architecture

```text
Browser
  │
  ▼
React + TypeScript portfolio
  ├── Home / product narrative
  ├── Recruiter Fast Path
  ├── Interactive project studies
  └── Signal Lab
        │
        └── links to separately maintained public code samples
             ├── ForgeFlow: React + FastAPI + SQLite + Docker
             ├── ClearRoute: FastAPI + Pydantic + pytest
             └── AccessPath: React + TypeScript + accessibility checks
```

### Main code map

| Path | Responsibility |
|---|---|
| [`client/src/App.tsx`](client/src/App.tsx) | Application routing and resilience boundary |
| [`client/src/lib/productEvidence.ts`](client/src/lib/productEvidence.ts) | Typed recruiter-facing candidate and project evidence — one source of truth |
| [`client/src/lib/signalEngine.ts`](client/src/lib/signalEngine.ts) | Pure, tested scene/progress navigation math used by the cinematic home experience |
| [`client/src/pages/Home.tsx`](client/src/pages/Home.tsx) | Signal Engine narrative, project catalog, and interactive product surface |
| [`client/src/pages/RecruiterProof.tsx`](client/src/pages/RecruiterProof.tsx) | Fast technical review path for product/API conversations |
| [`client/src/pages/DemoPage.tsx`](client/src/pages/DemoPage.tsx) | Interactive project-study surfaces |
| [`client/src/pages/SignalLab.tsx`](client/src/pages/SignalLab.tsx) | Stateful workflow simulation |
| [`client/src/components/ErrorBoundary.tsx`](client/src/components/ErrorBoundary.tsx) | User-safe recovery for unexpected render failures |
| [`scripts/verify-product-engineering.mjs`](scripts/verify-product-engineering.mjs) | Repository hygiene and recruiter-signal regression checks |
| [`scripts/verify-build-budget.mjs`](scripts/verify-build-budget.mjs) | Production JS/CSS raw + gzip size budgets that guard against accidental re-bloat |
| [`.github/workflows/verify.yml`](.github/workflows/verify.yml) | Tests → hygiene checks → typecheck → recruiter verification → production build → bundle budgets |

## Run locally

```bash
pnpm install --frozen-lockfile
pnpm dev
```

## Verify

```bash
pnpm test:portfolio
pnpm verify:product-engineering
pnpm check
pnpm verify:recruiter-proof
pnpm build
pnpm verify:bundle
```

The pull-request workflow runs the same critical path before changes are considered ready to merge. The bundle guard currently caps total production JavaScript at **300 KiB raw / 95 KiB gzip** and CSS at **180 KiB raw / 45 KiB gzip** so performance regressions become visible during review.

## Product decisions worth discussing

A technical conversation can go deeper than a tool list. Useful review prompts include:

1. Why should an interface expose execution/fallback state instead of returning only a generated result?
2. Where should validation live when a React client and an API both need predictable behavior?
3. Which API errors should be recoverable in the interface, and how should the user understand the next action?
4. What does a portfolio-level local persistence boundary teach us — and what changes for multi-user production data?
5. Which accessibility failures are easy to automate, and which still require keyboard/manual review?
6. What would I add for production auth, idempotency, retries, observability, rate limiting, and incident debugging?

## Candidate context

**Remote collaboration**  
**Native English + Spanish**

My paid freelance experience includes digital systems, AI-assisted workflows, process organization, bilingual delivery, and remote operational handoffs. The software repositories here are self-directed public engineering work; I do not present that freelance history as years of formal full-stack employment.

## Evidence boundary

These projects use sample data and are built to demonstrate implementation choices and engineering judgment. They do not claim production users, enterprise scale, customer outcomes, formal security certification, or accessibility compliance beyond what the repositories explicitly document.

## Contact

**Amy Villa** · [amyv.dev@gmail.com](mailto:amyv.dev@gmail.com) · [GitHub](https://github.com/Amyvdev1) · [Live portfolio](https://amy-villa-signal-gallery.vercel.app/)
