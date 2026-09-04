# Resend Product Engineering Portfolio Design

Date: 2026-09-04
Branch: `resend-product-engineering-portfolio`

## Goal

Reposition Amy Villa’s public portfolio from a broad “software / AI automation / workflow systems” presentation into a sharper product-engineering and developer-experience portfolio that is credible for API-first companies such as Resend, while preserving factual accuracy and the existing live experience until the new branch is verified.

The portfolio should make a technical reviewer conclude quickly that Amy can build polished React/TypeScript product surfaces, reason about API behavior, make failure and system state understandable, test critical paths, and explain implementation boundaries clearly.

## Success criteria

1. The repository presents one coherent story: **Product Engineer · Developer Experience · React · TypeScript · APIs**.
2. Public location is consistent with the current application context: **Spain (CET/CEST)**, while U.S. work authorization can remain a separate factual eligibility note when relevant.
3. Internal design-review and generation-history artifacts are removed from the public root.
4. The recruiter fast path prioritizes product judgment, API UX, debugging, failure states, reliability, accessibility, and inspectable code.
5. ForgeFlow remains the lead technical sample, but the surrounding copy frames it as product-engineering evidence rather than an “AI automation” identity.
6. The main portfolio gains automated behavior tests for recruiter-critical UI, not only source-string verification.
7. CI must remain green on the feature branch before any merge to `main`.
8. No unsupported production, scale, customer, revenue, or seniority claims are added.

## Recommended approach

### Approach selected: recruiter-first refactor with bounded technical cleanup

Preserve the existing visual system and the current application architecture. Do not rebuild the portfolio from scratch. Improve the parts that affect recruiter interpretation most:

- positioning and copy,
- recruiter-proof route,
- root repository hygiene,
- critical-path tests,
- dependency hygiene where safely verifiable,
- deployment documentation.

This approach has the best risk/reward ratio because the current portfolio already has a distinctive visual identity and working React/TypeScript code. A total redesign would consume time without materially improving the strongest hiring signals.

## Information architecture

### Public identity

Primary title:

**Product Engineer · Developer Experience**

Primary technical line:

**React · TypeScript · APIs · Reliable Product Interfaces**

Positioning statement:

> I build developer-facing product experiences that make system state, errors, fallback behavior, and the next action easy to understand.

Secondary strengths:

- API behavior and integration boundaries
- reliable UI state and error feedback
- workflow/state modeling
- accessibility and keyboard interaction
- testing, type checking, CI, and reproducible builds
- bilingual English/Spanish communication

### Recruiter fast path

The `/recruiter-proof` route should answer four questions in under one minute:

1. What can Amy build?
2. What code should I inspect first?
3. What product/engineering decisions can she explain live?
4. What is implemented versus future production work?

ForgeFlow remains first. ClearRoute and AccessPath remain supporting samples.

## Product-engineering emphasis

### ForgeFlow

Frame the project around:

- clear execution state,
- API contracts,
- visible fallback behavior,
- persisted history,
- human review,
- product trust,
- reproducible local delivery.

Do not lead with “Gemini” or “AI agents.” AI remains one implementation detail inside a broader product/reliability story.

### ClearRoute

Frame around API UX:

- typed request validation,
- predictable state transitions,
- explicit `403` / `404` / `409` / `422` behavior where documented,
- audit-friendly events,
- integration boundaries.

### AccessPath

Frame around product craft:

- keyboard operability,
- validation recovery,
- live status,
- visible focus,
- responsive behavior,
- focused regression checks.

## Repository hygiene

Remove internal review/history artifacts from the public root after confirming they are not required by build or CI:

- `AAA_visual_quality_notes.txt`
- `RECRUITER_PROOF_VISUAL_REVIEW.md`
- `SIGNAL_ARCHITECTURE_REVIEW.txt`
- `SIGNAL_ENGINE_REVIEW.md`

These are internal process notes rather than user-facing engineering documentation.

Do not delete source, build, deployment, or technical documentation without dependency/use verification.

## Location and eligibility consistency

Replace recruiter-facing `Miami, FL / Remote` copy with:

**Spain · CET/CEST · Remote**

Where eligibility is useful, keep a separate line:

**U.S. work authorized · no employer sponsorship required for U.S. employment**

Do not imply that U.S. remote roles can be performed from Spain when a company requires physical U.S. presence.

## Testing strategy

Follow test-driven development for behavior changes.

### New recruiter-critical tests

Add focused Vitest/React Testing Library coverage for:

1. RecruiterProof renders the new Spain/CET location and product-engineering focus.
2. RecruiterProof exposes ForgeFlow as the first technical sample.
3. Home exposes a visible recruiter-proof navigation path.
4. Critical route content remains renderable without runtime failure.

Existing source verification remains useful but should no longer be the only portfolio-specific check.

### CI

CI should run, in order:

1. locked dependency install,
2. targeted tests,
3. TypeScript check,
4. recruiter-proof verification,
5. production build.

The branch is not merged unless all checks pass.

## Dependency cleanup

Audit before removal. Only remove packages that are demonstrably unused by repository code and build configuration.

Priority candidates are generic UI/scaffolding dependencies that do not participate in any imported production or test path. Because this repo contains a broad UI component directory, package removal must be evidence-based, not cosmetic.

A smaller dependency surface is desirable, but not at the cost of breaking the portfolio.

## Deployment

Do not change the live deployment architecture in the first pass unless the branch demonstrates a simpler verified path.

First priority is recruiter-facing clarity and test coverage. A second pass may simplify the current asset-shell workflow into a direct repository-to-Vercel deployment if it can be verified without disrupting the production portfolio.

## README changes

The repository README should become concise and product-engineering oriented:

1. what the product demonstrates,
2. direct live/recruiter links,
3. strongest technical evidence,
4. local run and verification commands,
5. architecture/code map,
6. one short evidence-boundary section,
7. contact.

Reduce repeated disclaimers. Keep one explicit boundary section so the repo remains trustworthy without sounding defensive.

## GitHub profile alignment

The separate profile repository `Amyvdev1/Amyvdev1` should be updated after the portfolio branch is verified so that it no longer says Miami and uses the same Product Engineer / Developer Experience story.

That profile change is a separate repository mutation and should not be bundled into the portfolio PR until the portfolio copy is finalized.

## Non-goals

- Do not fabricate professional years of full-stack employment.
- Do not fabricate Resend-specific work or claim use of Resend APIs unless actually implemented.
- Do not add production-scale, revenue, customer, security-certification, or performance claims without evidence.
- Do not rebuild the entire visual identity.
- Do not merge unverified changes directly to `main`.

## Rollout

1. Create and work on `resend-product-engineering-portfolio`.
2. Add failing recruiter-critical tests first.
3. Update recruiter-facing copy and location.
4. Tighten README and recruiter fast path.
5. Remove verified internal artifacts.
6. Audit dependencies and remove only proven-unused packages.
7. Run tests, typecheck, recruiter verification, and production build.
8. Open a PR with screenshots/verification notes if available.
9. Review the diff and CI before merging.
10. After merge, update the GitHub profile README to match.
