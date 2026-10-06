# Recruiter Fast Path — Product Engineering / Developer Experience

This is the shortest route through Amy Villa’s public work for a product-engineering, developer-experience, frontend, API, or customer-facing technical conversation.

**Candidate:** Amy Villa  
**Work format:** Remote  
**Languages:** Native English + Spanish

## 1. Start with ForgeFlow

**[ForgeFlow AI Automation](https://github.com/Amyvdev1/forgeflow-ai-automation)** is the strongest first sample because it connects product behavior to system behavior.

The review path is concrete:

```text
React input
   ↓
FastAPI + Pydantic validation
   ↓
workflow execution
   ↓
SQLite run record
   ↓
explicit execution / fallback state
   ↓
UI feedback + human review point
```

### What to inspect

- typed request/response boundaries,
- persisted workflow/run history,
- deterministic behavior when optional provider execution is not available,
- visible degraded/fallback state,
- user-facing next action and review checkpoint,
- backend tests, interface checks, Docker, and GitHub Actions.

### Useful interview questions

- Why expose execution mode and fallback state to the user?
- What belongs in API validation versus interface validation?
- Which parts of the current local persistence model would change first for production concurrency?
- How would you add idempotency, retries, observability, and rate limits without making the happy path harder to understand?

## 2. Review API UX in ClearRoute

**[ClearRoute API](https://github.com/Amyvdev1/clearrout-api)** is a smaller backend sample centered on predictable integration behavior.

Look for:

- Pydantic input contracts,
- explicit legal task transitions,
- role-gated demonstration rules,
- audit-friendly events,
- documented `403`, `404`, `409`, and `422` consumer behavior,
- focused API tests.

A productive discussion is not “Can Amy write FastAPI?” It is: **Can she explain how an API consumer knows what went wrong and what can happen next?**

## 3. Review product recovery in AccessPath

**[AccessPath Console](https://github.com/Amyvdev1/accessible-workflow-console)** focuses on the interface details that often determine whether a product feels dependable.

Inspect:

- keyboard-operable controls,
- semantic structure,
- visible focus,
- labelled form errors and recovery,
- live status feedback,
- responsive layouts,
- targeted axe/Vitest regression checks.

The automated checks are regression evidence, not a claim of complete WCAG or Section 508 conformance.

## 4. Inspect the portfolio architecture

The **[Signal Engine portfolio](https://amy-villa-signal-gallery.vercel.app/)** is itself a React + TypeScript product surface. The **[Recruiter Fast Path](https://amy-villa-signal-gallery.vercel.app/recruiter-proof)** is designed to reduce the time from “candidate profile” to “inspectable technical evidence.”

Key implementation paths:

- [`client/src/lib/productEvidence.ts`](../client/src/lib/productEvidence.ts) — typed, shared recruiter/project evidence,
- [`client/src/pages/RecruiterProof.tsx`](../client/src/pages/RecruiterProof.tsx) — reviewer-facing technical path,
- [`client/src/pages/Home.tsx`](../client/src/pages/Home.tsx) — interactive product narrative,
- [`scripts/verify-product-engineering.mjs`](../scripts/verify-product-engineering.mjs) — hygiene/recruiter-signal verification,
- [`.github/workflows/verify.yml`](../.github/workflows/verify.yml) — PR verification pipeline.

## What Amy can demonstrate live

1. Trace a request from React input to API validation, persistence, result state, and interface feedback.
2. Trigger/explain a failure or fallback path and discuss what the user needs to know.
3. Run focused tests, type checking, recruiter checks, and a production build.
4. Make a scoped validation/UI/API change and identify the regression check that should protect it.
5. Separate what is implemented now from a production hardening plan covering auth/RBAC, durable storage, idempotency, retries, rate limits, secrets, logs/metrics/traces, health checks, and cloud delivery.

## Experience context

Amy has paid freelance experience across digital systems, AI-assisted workflows, process organization, bilingual delivery, CRM-related follow-up, and remote handoffs. The repositories above are self-directed public engineering work. They demonstrate implementation decisions and are not represented as years of formal full-stack employment or undocumented production outcomes.

## Contact

- **Email:** [amyv.dev@gmail.com](mailto:amyv.dev@gmail.com)
- **Portfolio:** [amy-villa-signal-gallery.vercel.app](https://amy-villa-signal-gallery.vercel.app/)
- **Recruiter path:** [amy-villa-signal-gallery.vercel.app/recruiter-proof](https://amy-villa-signal-gallery.vercel.app/recruiter-proof)
- **GitHub:** [github.com/Amyvdev1](https://github.com/Amyvdev1)
