# Resend Product Engineering Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the existing Signal Engine repository into a recruiter-ready Product Engineering / Developer Experience portfolio with stronger code hygiene, shared evidence data, tested recruiter-critical behavior, and consistent Spain-based positioning.

**Architecture:** Keep the current React/Vite visual system, but centralize candidate/project evidence in a typed module consumed by recruiter-facing components. Add repository-level verification and SSR-safe component tests, remove internal scaffolding/process artifacts, simplify Vite configuration, harden the error boundary, and tighten docs without changing the live `main` branch until CI is green.

**Tech Stack:** React 19, TypeScript, Vite, Vitest, Wouter, Node 22, GitHub Actions.

**Spec:** `docs/superpowers/specs/2026-09-04-resend-product-engineering-portfolio-design.md`

## Global Constraints

- Work only on `resend-product-engineering-portfolio` until verification is green.
- Public recruiter identity: `Product Engineer · Developer Experience`.
- Public location: `Spain · CET/CEST · Remote`.
- Keep U.S. work authorization as a separate factual eligibility statement.
- Do not add unsupported production, scale, customer, revenue, or seniority claims.
- ForgeFlow remains the first technical sample.
- Follow TDD for behavior changes: failing tests first, then minimal implementation.

---

### Task 1: Add failing recruiter-critical tests and repository hygiene checks

**Files:**
- Create: `client/src/lib/productEvidence.test.ts`
- Create: `scripts/verify-product-engineering.mjs`
- Modify: `package.json`
- Modify: `.github/workflows/verify.yml`

**Interfaces:**
- Consumes: current repository files.
- Produces: `pnpm test:portfolio` and `pnpm verify:product-engineering` verification commands.

- [ ] **Step 1: Write the failing evidence test**

```ts
import { describe, expect, it } from "vitest";
import { candidateProfile, publicProjectEvidence } from "./productEvidence";

describe("product engineering evidence", () => {
  it("presents the current candidate location and product engineering focus", () => {
    expect(candidateProfile.location).toBe("Spain · CET/CEST · Remote");
    expect(candidateProfile.focus).toBe("Product Engineer · Developer Experience");
  });

  it("keeps ForgeFlow as the first review path", () => {
    expect(publicProjectEvidence[0]?.name).toBe("ForgeFlow AI Automation");
    expect(publicProjectEvidence[0]?.signals).toContain("Visible fallback behavior");
  });
});
```

- [ ] **Step 2: Add a repository hygiene verifier that intentionally fails on current state**

```js
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const read = (path) => readFileSync(resolve(root, path), "utf8");

const forbiddenRootArtifacts = [
  "AAA_visual_quality_notes.txt",
  "RECRUITER_PROOF_VISUAL_REVIEW.md",
  "SIGNAL_ARCHITECTURE_REVIEW.txt",
  "SIGNAL_ENGINE_REVIEW.md",
];

for (const artifact of forbiddenRootArtifacts) {
  if (existsSync(resolve(root, artifact))) throw new Error(`Internal review artifact is still public: ${artifact}`);
}

const recruiterProof = read("client/src/pages/RecruiterProof.tsx");
if (recruiterProof.includes("Miami, FL / Remote")) throw new Error("Recruiter proof still contains the old Miami location.");

const viteConfig = read("vite.config.ts");
for (const marker of ["vitePluginManusRuntime", "vitePluginManusDebugCollector", "vitePluginStorageProxy"]) {
  if (viteConfig.includes(marker)) throw new Error(`Internal runtime scaffolding remains in Vite config: ${marker}`);
}

const errorBoundary = read("client/src/components/ErrorBoundary.tsx");
if (errorBoundary.includes("this.state.error?.stack")) throw new Error("Production error UI still exposes stack traces.");

console.log("Product engineering portfolio hygiene checks passed.");
```

- [ ] **Step 3: Wire commands into `package.json`**

Add:

```json
"test:portfolio": "vitest run client/src/lib/productEvidence.test.ts",
"verify:product-engineering": "node scripts/verify-product-engineering.mjs"
```

- [ ] **Step 4: Run the new checks in CI before typecheck**

Add after dependency installation:

```yaml
      - name: Run portfolio evidence tests
        run: pnpm test:portfolio
      - name: Verify product engineering hygiene
        run: pnpm verify:product-engineering
```

- [ ] **Step 5: Open a draft PR so GitHub Actions runs the failing tests**

Expected: FAIL because `productEvidence.ts` does not exist and current public artifacts/config violate the hygiene verifier.

---

### Task 2: Centralize candidate and project evidence, then refactor recruiter-facing UI

**Files:**
- Create: `client/src/lib/productEvidence.ts`
- Create: `client/src/components/CandidateSnapshot.tsx`
- Modify: `client/src/pages/RecruiterProof.tsx`
- Modify: `client/src/pages/Home.tsx`
- Modify: `client/index.html`

**Interfaces:**
- Produces: `candidateProfile`, `publicProjectEvidence`, `liveReviewTopics`.
- `CandidateSnapshot` renders `candidateProfile` without duplicating literal profile strings.

- [ ] **Step 1: Implement `productEvidence.ts` to satisfy the failing test**

Use typed immutable data with these exact public values:

```ts
export const candidateProfile = {
  location: "Spain · CET/CEST · Remote",
  languages: "Native English + Spanish",
  authorization: "U.S. work authorized · no employer sponsorship required",
  focus: "Product Engineer · Developer Experience",
} as const;
```

ForgeFlow must remain index 0 and include signals for typed API contracts, persisted run history, visible fallback behavior, human review, tests, and CI.

- [ ] **Step 2: Add `CandidateSnapshot.tsx`**

Render LOCATION, LANGUAGES, AUTHORIZATION, and FOCUS from `candidateProfile` in the existing `proof-eligibility` structure.

- [ ] **Step 3: Refactor `RecruiterProof.tsx`**

Replace local `proofCards` and `liveTopics` duplication with imports from the shared evidence module. Lead with product-engineering language: API UX, failure states, recovery, observability, product trust, accessibility, testing, and developer-facing clarity.

- [ ] **Step 4: Refactor the first three `Home.tsx` project cards to use shared evidence**

Keep RelayOps local, but consume shared names/stacks/descriptions for ForgeFlow, ClearRoute, and AccessPath so recruiter-facing metadata cannot drift.

- [ ] **Step 5: Update page metadata**

Use:

```html
<meta name="description" content="Amy Villa is a product-focused software developer building React and TypeScript interfaces, API-driven workflows, and developer experiences that make system state and failure behavior clear." />
<title>Amy Villa — Product Engineer · Developer Experience</title>
```

- [ ] **Step 6: Run tests**

Expected: `pnpm test:portfolio` PASS.

---

### Task 3: Remove internal scaffolding and harden runtime behavior

**Files:**
- Modify: `vite.config.ts`
- Modify: `.gitignore`
- Modify: `client/src/components/ErrorBoundary.tsx`
- Delete if unreferenced: `client/src/components/ManusDialog.tsx`
- Delete if unreferenced: `client/src/const.ts`
- Delete if unreferenced: `shared/const.ts`
- Delete: `client/public/__manus__/debug-collector.js`

**Interfaces:**
- Vite remains React + Tailwind with the existing aliases and build output.
- ErrorBoundary retains reload recovery but never renders stack traces to end users.

- [ ] **Step 1: Simplify `vite.config.ts`**

Keep only `@vitejs/plugin-react`, `@tailwindcss/vite`, path aliases, build output, and a generic local development server. Remove the debug collector, storage proxy, Manus runtime plugin, Manus allowed-host entries, and builder JSX-location instrumentation.

- [ ] **Step 2: Harden ErrorBoundary**

Replace the stack trace block with concise recovery copy:

```tsx
<p className="text-sm text-muted-foreground text-center max-w-lg mb-6">
  The interface hit an unexpected state. Reload to start with a clean session; if it repeats, the failure can be reproduced from the public source and verification steps.
</p>
```

Keep the reload button. Do not display raw `Error.stack`.

- [ ] **Step 3: Remove proven-unused internal auth/login scaffolding**

Delete `ManusDialog.tsx`, `client/src/const.ts`, and `shared/const.ts` only after repository search confirms no imports outside those files.

- [ ] **Step 4: Remove the tracked debug collector and Manus-specific `.gitignore` entry**

The portfolio should no longer contain a public `client/public/__manus__` runtime artifact.

- [ ] **Step 5: Run hygiene verification**

Expected: `pnpm verify:product-engineering` still fails only for root review artifacts until Task 4; it must no longer fail on Vite config, location, or ErrorBoundary.

---

### Task 4: Clean public repository documentation and internal artifacts

**Files:**
- Modify: `README.md`
- Modify: `docs/RECRUITER_FAST_PATH.md`
- Modify: `scripts/verify-recruiter-proof.mjs`
- Delete: `AAA_visual_quality_notes.txt`
- Delete: `RECRUITER_PROOF_VISUAL_REVIEW.md`
- Delete: `SIGNAL_ARCHITECTURE_REVIEW.txt`
- Delete: `SIGNAL_ENGINE_REVIEW.md`

**Interfaces:**
- README becomes the concise public entrypoint.
- Recruiter fast path remains the evidence-first interview guide.

- [ ] **Step 1: Rewrite README around Product Engineering / Developer Experience**

Lead with:

```md
# Amy Villa — Product Engineering Portfolio

> **Product Engineer · Developer Experience**  
> React · TypeScript · APIs · Reliable Product Interfaces
```

Explain the strongest evidence, run/verify commands, architecture map, and one short evidence-boundary section. Remove the long direct-deployment explanation from the main README; link to technical docs if needed.

- [ ] **Step 2: Tighten `RECRUITER_FAST_PATH.md`**

Lead with API UX, failure states, recovery, testing, and product judgment. Keep factual experience context once, not repeatedly.

- [ ] **Step 3: Update `verify-recruiter-proof.mjs`**

Verify the shared evidence module and recruiter route rather than depending on duplicated literal project metadata in `Home.tsx`.

- [ ] **Step 4: Delete internal review artifacts**

Remove all four root review/history files listed above.

- [ ] **Step 5: Run repository hygiene verification**

Expected: `pnpm verify:product-engineering` PASS.

---

### Task 5: Verify branch, review diff, and prepare merge

**Files:**
- No new production files unless verification exposes a defect.

- [ ] **Step 1: Run full verification**

```bash
pnpm install --frozen-lockfile
pnpm test:portfolio
pnpm check
pnpm verify:recruiter-proof
pnpm verify:product-engineering
pnpm build
```

Expected: all PASS with no warnings that indicate runtime failure.

- [ ] **Step 2: Review PR diff for unsupported claims and accidental deletions**

Confirm ForgeFlow remains first, Spain location is consistent, no production-scale claims were introduced, and source/build/deployment files required by the app remain present.

- [ ] **Step 3: Convert the draft PR to ready only after CI is green**

Do not merge automatically. Present the verified PR for final review.

- [ ] **Step 4: After merge, align `Amyvdev1/Amyvdev1` profile README**

Update Miami to Spain/CET and use the same Product Engineer / Developer Experience positioning in a separate commit.
