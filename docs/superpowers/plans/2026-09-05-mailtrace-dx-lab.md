# MailTrace DX Lab Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a public Next.js developer-debugging product that traces a simulated email lifecycle through signed webhook events, idempotency, structured observability, and deterministic domain diagnostics.

**Architecture:** A Next.js 16 App Router application keeps UI, route handlers, business services, and SQLite persistence deliberately separate. Server route handlers are thin adapters; reusable logic lives in focused `lib/` modules with explicit types and error contracts. The product never sends real email or performs live DNS in v1; deterministic fixtures make the complete debugging workflow reproducible and testable.

**Tech Stack:** Next.js 16, React 19, strict TypeScript, Node runtime route handlers, SQLite (`better-sqlite3`), Zod, Vitest, React Testing Library, Playwright, pnpm, GitHub Actions.

**Spec:** `docs/superpowers/specs/2026-09-05-mailtrace-dx-lab-design.md`

## Global Constraints

- New public repository: `Amyvdev1/mailtrace-dx-lab`.
- Execution prerequisite: the empty GitHub repository must exist before Task 1; the current connector can edit repositories but cannot create one.
- Next.js App Router, React 19, strict TypeScript.
- TypeScript enables `strict`, `noUncheckedIndexedAccess`, `noUnusedLocals`, and `noUnusedParameters`.
- Node runtime route handlers only; no Edge runtime for SQLite or HMAC paths.
- Webhook body hard limit: **64 KiB** before parsing.
- Webhook replay tolerance: **5 minutes (300,000 ms)**.
- Webhook signatures: HMAC-SHA256 over `${timestamp}.${rawBody}` using constant-time comparison.
- Duplicate provider event IDs return HTTP `200` with `status: "duplicate"`; duplicates are not API errors.
- No real email sending, live DNS lookup, Resend API integration, customer data, production traffic, or scale claims.
- No Docker in v1.
- No large component framework; keep dependency surface small.
- Business logic stays out of React components and route handlers.
- Every behavior change starts with a failing test.

---

## File map

```text
app/
  api/
    diagnostics/domain/route.ts
    traces/route.ts
    traces/[id]/route.ts
    webhooks/events/route.ts
  traces/[id]/page.tsx
  layout.tsx
  page.tsx
  globals.css
components/
  create-trace-form.tsx
  trace-list.tsx
  trace-summary.tsx
  event-timeline.tsx
  event-inspector.tsx
  api-error-panel.tsx
  domain-diagnostics.tsx
fixtures/
  domains.ts
  webhooks.ts
lib/
  api-error.ts
  db.ts
  domain-diagnostics.ts
  event-normalization.ts
  idempotency.ts
  logger.ts
  repository.ts
  signatures.ts
  status-transitions.ts
  trace-service.ts
  webhook-service.ts
  types.ts
  request-id.ts
scripts/
  reset-test-db.mjs
  verify-repository.mjs
  verify-build-budget.mjs
tests/
  unit/*.test.ts
  integration/*.test.ts
  components/*.test.tsx
e2e/
  trace-debugging.spec.ts
docs/CODE_TOUR.md
.github/workflows/ci.yml
.env.example
README.md
```

---

### Task 1: Bootstrap the strict Next.js repository and verification baseline

**Files:** Create `package.json`, `tsconfig.json`, `next.config.ts`, `eslint.config.mjs`, `vitest.config.ts`, `vitest.setup.ts`, `playwright.config.ts`, `.gitignore`, `.env.example`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `scripts/verify-repository.mjs`, `.github/workflows/ci.yml`; test `tests/unit/repository-hygiene.test.ts`.

**Interfaces:** Scripts `lint`, `typecheck`, `test`, `test:run`, `test:e2e`, `build`, `verify:repo`; environment variable `MAILTRACE_WEBHOOK_SECRET`.

- [ ] **Step 1: Create the minimum package manifest**

```json
{
  "name": "mailtrace-dx-lab",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint . --max-warnings=0",
    "typecheck": "tsc --noEmit",
    "test": "vitest",
    "test:run": "vitest run",
    "test:e2e": "playwright test",
    "verify:repo": "node scripts/verify-repository.mjs"
  },
  "dependencies": {
    "better-sqlite3": "^12.2.0",
    "next": "^16.0.0",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "zod": "^4.1.0"
  },
  "devDependencies": {
    "@playwright/test": "^1.55.0",
    "@testing-library/jest-dom": "^6.8.0",
    "@testing-library/react": "^16.3.0",
    "@types/better-sqlite3": "^7.6.13",
    "@types/node": "^24.3.0",
    "@types/react": "^19.1.0",
    "@types/react-dom": "^19.1.0",
    "eslint": "^9.35.0",
    "eslint-config-next": "^16.0.0",
    "jsdom": "^26.1.0",
    "typescript": "^5.9.0",
    "vitest": "^3.2.0"
  },
  "packageManager": "pnpm@10.4.1",
  "engines": { "node": ">=22" }
}
```

- [ ] **Step 2: Enable strict compiler guards**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "es2023"],
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noEmit": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 3: Write the first repository-hygiene test**

```ts
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const packageJson = readFileSync("package.json", "utf8");
const tsconfig = readFileSync("tsconfig.json", "utf8");

describe("repository baseline", () => {
  it("keeps runtime dependencies focused", () => {
    expect(packageJson).toContain('"next"');
    expect(packageJson).toContain('"better-sqlite3"');
    expect(packageJson).not.toContain("@radix-ui/");
  });
  it("fails on unchecked indexes and unused code", () => {
    expect(tsconfig).toContain('"noUncheckedIndexedAccess": true');
    expect(tsconfig).toContain('"noUnusedLocals": true');
    expect(tsconfig).toContain('"noUnusedParameters": true');
  });
});
```

- [ ] **Step 4: Run verification**

```bash
pnpm install
pnpm test:run
pnpm typecheck
pnpm lint
```

Expected: tests pass and the shell compiles without warnings.

- [ ] **Step 5: Add CI and commit**

CI order: checkout -> Node 22 -> pnpm 10.4.1 -> frozen install -> lint -> typecheck -> tests -> build.

```bash
git add .
git commit -m "chore: bootstrap strict MailTrace Next.js project"
```

---

### Task 2: Define domain contracts, canonical errors, request IDs, and status transitions

**Files:** Create `lib/types.ts`, `lib/api-error.ts`, `lib/request-id.ts`, `lib/status-transitions.ts`; test `tests/unit/types.test.ts`, `tests/unit/status-transitions.test.ts`.

**Interfaces:** `MessageTrace`, `DeliveryEvent`, `WebhookEventInput`, `DomainDiagnostic`, `ApiError`, `createTraceSchema`, `webhookEventSchema`, `nextTraceStatus()`, `createApiError()`.

- [ ] **Step 1: Write failing status tests**

```ts
import { describe, expect, it } from "vitest";
import { nextTraceStatus } from "@/lib/status-transitions";

describe("nextTraceStatus", () => {
  it("advances queued -> sent -> delivered", () => {
    expect(nextTraceStatus("queued", "sent")).toBe("sent");
    expect(nextTraceStatus("sent", "delivered")).toBe("delivered");
  });
  it("does not regress delivered to sent", () => {
    expect(nextTraceStatus("delivered", "sent")).toBe("delivered");
  });
  it("lets bounce/complaint override delivered", () => {
    expect(nextTraceStatus("delivered", "bounced")).toBe("bounced");
    expect(nextTraceStatus("delivered", "complained")).toBe("complained");
  });
});
```

- [ ] **Step 2: Run RED**

```bash
pnpm vitest run tests/unit/status-transitions.test.ts
```

Expected: missing-module failure.

- [ ] **Step 3: Implement status transitions**

```ts
export type TraceStatus = "queued" | "sent" | "delivered" | "bounced" | "complained" | "failed";
const terminalOverrides = new Set<TraceStatus>(["bounced", "complained", "failed"]);
const rank: Record<TraceStatus, number> = { queued: 0, sent: 1, delivered: 2, failed: 3, bounced: 4, complained: 5 };

export function nextTraceStatus(current: TraceStatus, incoming: Exclude<TraceStatus, "queued">) {
  if (terminalOverrides.has(incoming)) return incoming;
  return rank[incoming] > rank[current] ? incoming : current;
}
```

- [ ] **Step 4: Add Zod schemas**

```ts
export const createTraceSchema = z.object({
  recipient: z.string().email().max(320),
  subject: z.string().trim().min(1).max(200),
});

export const webhookEventSchema = z.object({
  providerEventId: z.string().min(1).max(128),
  messageId: z.string().min(1).max(128),
  type: z.enum(["sent", "delivered", "bounced", "complained", "failed"]),
  occurredAt: z.string().datetime(),
  retryAttempt: z.number().int().min(0).max(20),
});
```

- [ ] **Step 5: Implement canonical API error**

```ts
export function createApiError(code: string, message: string, requestId: string, nextAction?: string) {
  return { error: { code, message, requestId, ...(nextAction ? { nextAction } : {}) } };
}
```

- [ ] **Step 6: Run tests and commit**

```bash
pnpm vitest run tests/unit/types.test.ts tests/unit/status-transitions.test.ts
git add lib tests/unit
git commit -m "feat: define trace contracts and status rules"
```

---

### Task 3: Implement HMAC verification and replay defense

**Files:** Create `lib/signatures.ts`; test `tests/unit/signatures.test.ts`.

**Interfaces:** `signWebhook(rawBody, timestamp, secret): string`, `verifyWebhookSignature(input)` returning `{ok:true}` or `{ok:false, code, message, nextAction}`.

- [ ] **Step 1: Write failing signature tests**

```ts
const secret = "test_secret_123";
const now = 1_800_000_000_000;
const body = JSON.stringify({ providerEventId: "evt_1" });

it("accepts a valid HMAC inside the replay window", () => {
  const timestamp = String(now);
  const signature = signWebhook(body, timestamp, secret);
  expect(verifyWebhookSignature({ rawBody: body, timestamp, signature, secret, now })).toEqual({ ok: true });
});

it("rejects a timestamp older than five minutes", () => {
  const timestamp = String(now - 300_001);
  const signature = signWebhook(body, timestamp, secret);
  const result = verifyWebhookSignature({ rawBody: body, timestamp, signature, secret, now });
  expect(result.ok).toBe(false);
  if (!result.ok) expect(result.code).toBe("STALE_WEBHOOK");
});
```

- [ ] **Step 2: Run RED**

```bash
pnpm vitest run tests/unit/signatures.test.ts
```

- [ ] **Step 3: Implement constant-time verification**

```ts
import { createHmac, timingSafeEqual } from "node:crypto";
const REPLAY_WINDOW_MS = 300_000;

export function signWebhook(rawBody: string, timestamp: string, secret: string) {
  return createHmac("sha256", secret).update(`${timestamp}.${rawBody}`).digest("hex");
}
```

`verifyWebhookSignature` must reject non-numeric/stale timestamps before comparing a 32-byte HMAC with `timingSafeEqual`.

- [ ] **Step 4: Run tests and commit**

```bash
pnpm vitest run tests/unit/signatures.test.ts
git add lib/signatures.ts tests/unit/signatures.test.ts
git commit -m "feat: verify signed webhooks with replay defense"
```

---

### Task 4: Build SQLite persistence, trace creation, and idempotency

**Files:** Create `lib/db.ts`, `lib/repository.ts`, `lib/idempotency.ts`, `lib/trace-service.ts`; test `tests/integration/trace-repository.test.ts`, `tests/integration/idempotency.test.ts`.

**Interfaces:** `createTrace()`, `listTraces()`, `getTraceWithEvents()`, `findTraceByMessageId()`, `insertDeliveryEvent()`, `hasProviderEvent()`, `updateTraceStatus()`; DB path from `MAILTRACE_DB_PATH`.

- [ ] **Step 1: Write failing persistence test**

```ts
it("creates debugging identifiers and persists queued state", () => {
  const trace = createTrace({ recipient: "dev@example.com", subject: "Receipt" });
  expect(trace.requestId).toMatch(/^req_/);
  expect(trace.messageId).toMatch(/^msg_/);
  expect(trace.status).toBe("queued");
  expect(getTraceWithEvents(trace.id)?.trace.messageId).toBe(trace.messageId);
});
```

- [ ] **Step 2: Run RED**

```bash
MAILTRACE_DB_PATH=.tmp/test.db pnpm vitest run tests/integration/trace-repository.test.ts
```

- [ ] **Step 3: Implement SQLite schema**

```sql
CREATE TABLE IF NOT EXISTS traces (
  id TEXT PRIMARY KEY,
  request_id TEXT NOT NULL UNIQUE,
  message_id TEXT NOT NULL UNIQUE,
  recipient TEXT NOT NULL,
  subject TEXT NOT NULL,
  status TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS delivery_events (
  id TEXT PRIMARY KEY,
  trace_id TEXT NOT NULL REFERENCES traces(id) ON DELETE CASCADE,
  provider_event_id TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL,
  occurred_at TEXT NOT NULL,
  received_at TEXT NOT NULL,
  retry_attempt INTEGER NOT NULL,
  signature_valid INTEGER NOT NULL,
  raw_payload TEXT NOT NULL
);
```

- [ ] **Step 4: Generate IDs with `crypto.randomUUID()`**

```ts
const id = `trace_${randomUUID()}`;
const requestId = `req_${randomUUID()}`;
const messageId = `msg_${randomUUID()}`;
```

- [ ] **Step 5: Test provider-event uniqueness**

The first insert succeeds; replaying the same `providerEventId` is detected before a second insert.

- [ ] **Step 6: Run tests and commit**

```bash
MAILTRACE_DB_PATH=.tmp/test.db pnpm vitest run tests/integration
git add lib tests/integration
git commit -m "feat: persist traces and idempotent delivery events"
```

---

### Task 5: Implement event normalization, logging, and webhook ingestion

**Files:** Create `lib/event-normalization.ts`, `lib/webhook-service.ts`, `lib/logger.ts`, `fixtures/webhooks.ts`; test `tests/unit/event-normalization.test.ts`, `tests/integration/webhook-service.test.ts`.

**Interfaces:** `normalizeWebhookEvent()`, `ingestWebhook()`.

```ts
type WebhookIngestionResult =
  | { status: "accepted"; requestId: string; traceId: string; event: DeliveryEvent }
  | { status: "duplicate"; requestId: string; providerEventId: string }
  | { status: "rejected"; requestId: string; error: ApiError["error"] };
```

- [ ] **Step 1: Write failing accepted/duplicate tests**

```ts
it("stores a valid event and updates trace status", () => {
  const trace = createTrace({ recipient: "dev@example.com", subject: "Receipt" });
  const fixture = makeSignedWebhook({ messageId: trace.messageId, type: "delivered", providerEventId: "evt_1" });
  expect(ingestWebhook(fixture).status).toBe("accepted");
  expect(getTraceWithEvents(trace.id)?.trace.status).toBe("delivered");
});

it("returns duplicate without inserting a second event", () => {
  const trace = createTrace({ recipient: "dev@example.com", subject: "Receipt" });
  const fixture = makeSignedWebhook({ messageId: trace.messageId, type: "delivered", providerEventId: "evt_1" });
  expect(ingestWebhook(fixture).status).toBe("accepted");
  expect(ingestWebhook(fixture).status).toBe("duplicate");
  expect(getTraceWithEvents(trace.id)?.events).toHaveLength(1);
});
```

- [ ] **Step 2: Run RED**

```bash
MAILTRACE_DB_PATH=.tmp/test.db MAILTRACE_WEBHOOK_SECRET=test_secret pnpm vitest run tests/integration/webhook-service.test.ts
```

- [ ] **Step 3: Implement ingestion order**

Signature/timestamp verification -> JSON parse -> Zod validation -> duplicate check -> trace lookup -> normalization -> persistence -> status transition -> structured log.

Log shape:

```ts
logEvent({ level: "info", event: "webhook.accepted", requestId, traceId: trace.id, providerEventId: parsed.providerEventId, retryAttempt: parsed.retryAttempt });
```

- [ ] **Step 4: Add invalid-signature and unknown-message tests**

Expected codes: `INVALID_SIGNATURE`, `TRACE_NOT_FOUND`.

- [ ] **Step 5: Commit**

```bash
git add lib fixtures tests
git commit -m "feat: ingest observable webhook events"
```

---

### Task 6: Expose thin Next.js API routes with exact HTTP semantics

**Files:** Create `app/api/traces/route.ts`, `app/api/traces/[id]/route.ts`, `app/api/webhooks/events/route.ts`; test `tests/integration/api-routes.test.ts`.

**HTTP contracts:** `POST /api/traces` 201; `GET /api/traces` 200; detail 200/404; webhook accepted 202, duplicate 200, malformed 400, invalid signature 401, unknown trace 404, stale webhook 408, body >64 KiB 413.

- [ ] **Step 1: Write failing 64 KiB test**

```ts
it("returns 413 before parsing an oversized webhook", async () => {
  const request = new Request("http://localhost/api/webhooks/events", {
    method: "POST",
    headers: { "content-length": String(64 * 1024 + 1) },
    body: "x".repeat(64 * 1024 + 1),
  });
  const response = await POST(request);
  expect(response.status).toBe(413);
});
```

- [ ] **Step 2: Run RED**

```bash
pnpm vitest run tests/integration/api-routes.test.ts
```

- [ ] **Step 3: Implement route boundary**

```ts
export const runtime = "nodejs";
const MAX_WEBHOOK_BYTES = 64 * 1024;
```

Check both `content-length` and `Buffer.byteLength(await request.text(), "utf8")` before JSON parsing. Route handlers delegate to services and contain no SQL/status-transition logic.

- [ ] **Step 4: Run integration suite and commit**

```bash
MAILTRACE_DB_PATH=.tmp/test.db MAILTRACE_WEBHOOK_SECRET=test_secret pnpm vitest run tests/integration
git add app/api tests/integration
git commit -m "feat: expose trace and webhook API contracts"
```

---

### Task 7: Add deterministic SPF/DKIM/DMARC diagnostics

**Files:** Create `fixtures/domains.ts`, `lib/domain-diagnostics.ts`, `app/api/diagnostics/domain/route.ts`; test `tests/unit/domain-diagnostics.test.ts`.

**Interfaces:** `diagnoseDomainFixture(fixtureId, domain)`; fixture IDs `healthy`, `missing-spf`, `invalid-dkim`, `weak-dmarc`.

- [ ] **Step 1: Write RED test**

```ts
it("returns actionable missing-SPF state", () => {
  const result = diagnoseDomainFixture("missing-spf", "example.dev");
  expect(result.spf.status).toBe("fail");
  expect(result.spf.nextAction).toMatch(/SPF/i);
  expect(result.overall).toBe("error");
});
```

- [ ] **Step 2: Implement immutable deterministic fixtures**

```ts
export const domainFixtures = {
  healthy: {
    spf: "v=spf1 include:_spf.example.dev -all",
    dkim: "v=DKIM1; k=rsa; p=MIIBIjANBgkqh-demo-key",
    dmarc: "v=DMARC1; p=quarantine; rua=mailto:dmarc@example.dev"
  },
  "missing-spf": {
    spf: "",
    dkim: "v=DKIM1; k=rsa; p=MIIBIjANBgkqh-demo-key",
    dmarc: "v=DMARC1; p=quarantine"
  }
} as const;
```

UI/docs must say these are fixtures, never live DNS.

- [ ] **Step 3: Run tests and commit**

```bash
pnpm vitest run tests/unit/domain-diagnostics.test.ts
git add fixtures/domains.ts lib/domain-diagnostics.ts app/api/diagnostics/domain/route.ts tests/unit/domain-diagnostics.test.ts
git commit -m "feat: add deterministic domain diagnostics"
```

---

### Task 8: Build the developer-facing trace UI and recovery states

**Files:** Create `components/create-trace-form.tsx`, `trace-list.tsx`, `trace-summary.tsx`, `event-timeline.tsx`, `event-inspector.tsx`, `api-error-panel.tsx`, `domain-diagnostics.tsx`, `app/traces/[id]/page.tsx`; modify `app/page.tsx`, `app/globals.css`; tests under `tests/components/`.

**Interfaces:** Components accept domain types; timeline marks late arrival when `receivedAt - occurredAt > 2000ms`; payload inspector uses native `<details><summary>`.

- [ ] **Step 1: Write failing summary/timeline tests**

```tsx
it("keeps request and message IDs visible", () => {
  render(<TraceSummary trace={traceFixture} />);
  expect(screen.getByText(traceFixture.requestId)).toBeVisible();
  expect(screen.getByText(traceFixture.messageId)).toBeVisible();
});

it("marks an event that arrived late", () => {
  render(<EventTimeline events={[lateEventFixture]} />);
  expect(screen.getByText(/late arrival/i)).toBeVisible();
});
```

- [ ] **Step 2: Write failing raw-payload test**

The `<details>` is closed by default; opening its `<summary>` reveals the exact persisted raw payload.

- [ ] **Step 3: Implement UI hierarchy**

Status + correlation IDs -> timeline -> retry/signature metadata -> raw payload -> recovery error -> domain diagnostics.

- [ ] **Step 4: Add focus and reduced-motion CSS**

```css
:focus-visible { outline: 2px solid currentColor; outline-offset: 3px; }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { scroll-behavior: auto !important; transition-duration: .01ms !important; animation-duration: .01ms !important; }
}
```

- [ ] **Step 5: Run tests and commit**

```bash
pnpm vitest run tests/components
git add components app tests/components
git commit -m "feat: build developer debugging console"
```

---

### Task 9: Add deterministic event controls and complete browser E2E

**Files:** Create `app/api/demo/events/route.ts`, `e2e/trace-debugging.spec.ts`, `scripts/reset-test-db.mjs`; modify `fixtures/webhooks.ts`, `components/trace-summary.tsx`, `playwright.config.ts`.

**Interface:** `POST /api/demo/events` builds a signed fixture and passes it through the same `ingestWebhook()` path; it never inserts directly.

- [ ] **Step 1: Write E2E RED flow**

```ts
test("debugs accepted, duplicate, raw payload, and domain failure states", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Recipient").fill("dev@example.com");
  await page.getByLabel("Subject").fill("Receipt test");
  await page.getByRole("button", { name: /create trace/i }).click();
  await expect(page.getByText(/request id/i)).toBeVisible();
  await page.getByRole("button", { name: /simulate delivered/i }).click();
  await expect(page.getByText("delivered", { exact: false })).toBeVisible();
  await page.getByRole("button", { name: /replay event/i }).click();
  await expect(page.getByText(/duplicate/i)).toBeVisible();
  await page.getByText(/inspect raw payload/i).click();
  await expect(page.locator("pre")).toContainText("providerEventId");
  await page.getByLabel("Domain fixture").selectOption("missing-spf");
  await page.getByRole("button", { name: /run diagnostics/i }).click();
  await expect(page.getByText(/missing spf/i)).toBeVisible();
});
```

- [ ] **Step 2: Run RED**

```bash
pnpm test:e2e
```

- [ ] **Step 3: Implement deterministic event adapter through real ingestion path**

- [ ] **Step 4: Configure deterministic E2E env**

`MAILTRACE_DB_PATH=.tmp/e2e.db`, `MAILTRACE_WEBHOOK_SECRET=e2e_local_secret`.

- [ ] **Step 5: Run E2E and commit**

```bash
pnpm test:e2e
git add app/api/demo fixtures components e2e scripts playwright.config.ts
git commit -m "test: cover end-to-end email debugging workflow"
```

---

### Task 10: Finish CI, bundle budgets, documentation, and truthfulness guards

**Files:** Create `scripts/verify-build-budget.mjs`, `README.md`, `docs/CODE_TOUR.md`; modify `.github/workflows/ci.yml`, `.env.example`, `tests/unit/repository-hygiene.test.ts`.

**Budgets:** initial client JS <= **110 KiB gzip**; total CSS <= **35 KiB gzip**.

- [ ] **Step 1: Add truthfulness test**

```ts
it("does not claim real provider delivery or Resend integration", () => {
  const readme = readFileSync("README.md", "utf8");
  expect(readme).not.toMatch(/powered by Resend|Resend integration|production traffic/i);
  expect(readme).toMatch(/simulated|deterministic/i);
});
```

- [ ] **Step 2: Write README opening**

```md
# MailTrace DX Lab

A developer-facing Next.js/TypeScript debugging sample for tracing a **simulated** email lifecycle through signed webhook events, idempotency, retry metadata, correlation IDs, and deterministic domain diagnostics.

This project does **not** send real email, perform live DNS queries, use customer data, or integrate with Resend. It is an independent engineering sample built to make asynchronous failure and recovery behavior inspectable.
```

- [ ] **Step 3: Write 5-minute code tour**

Walk: CreateTraceForm -> `/api/traces` -> trace service -> repository -> trace page -> signed fixture -> `/api/webhooks/events` -> signatures -> webhook service -> repository -> status transition -> timeline.

- [ ] **Step 4: Final CI order**

Frozen install -> lint -> typecheck -> `test:run` -> install Playwright Chromium -> E2E -> build -> `verify:repo` -> bundle budget.

- [ ] **Step 5: Run release gate**

```bash
pnpm install --frozen-lockfile
pnpm lint
pnpm typecheck
MAILTRACE_DB_PATH=.tmp/release.db MAILTRACE_WEBHOOK_SECRET=release_local_secret pnpm test:run
pnpm test:e2e
pnpm build
pnpm verify:repo
node scripts/verify-build-budget.mjs
```

Expected: all exit 0.

- [ ] **Step 6: Commit**

```bash
git add .
git commit -m "docs: make MailTrace recruiter-review ready"
```

---

### Task 11: Integrate verified MailTrace evidence into the portfolio

**Files in `Amyvdev1/amy-technical-portfolio`:** modify `client/src/lib/productEvidence.ts`, `client/src/pages/RecruiterProof.tsx`, `README.md`, `docs/RECRUITER_FAST_PATH.md`, `docs/CODE_TOUR.md`, `client/src/lib/productEvidence.test.ts`, `scripts/verify-recruiter-proof.mjs`.

**Interfaces:** MailTrace becomes project `01` only after its own main CI is green; existing projects move to 02/03/04; no Resend affiliation claim.

- [ ] **Step 1: Branch from stable portfolio main**

```bash
git switch main
git pull --ff-only
git switch -c mailtrace-evidence-integration
```

- [ ] **Step 2: Write failing evidence-order test**

```ts
it("leads recruiter path with verified MailTrace evidence", () => {
  expect(publicProjectEvidence[0]?.name).toBe("MailTrace DX Lab");
  expect(publicProjectEvidence[0]?.source).toBe("https://github.com/Amyvdev1/mailtrace-dx-lab");
});
```

- [ ] **Step 3: Add verified evidence record**

```ts
{
  index: "01",
  slug: "mailtrace-dx-lab",
  name: "MailTrace DX Lab",
  type: "DEVELOPER EXPERIENCE + OBSERVABILITY",
  stack: "Next.js · React · TypeScript · Node · SQLite · Vitest · Playwright",
  detail: "A developer-facing debugging sample that traces a simulated email lifecycle through signed webhook events, correlation IDs, idempotency, retry metadata, raw payload inspection, and deterministic domain diagnostics.",
  source: "https://github.com/Amyvdev1/mailtrace-dx-lab",
  action: "Inspect MailTrace source",
  signals: ["Signed webhook verification", "Idempotent event ingestion", "Request + message correlation IDs", "Visible retry and late-arrival state", "Deterministic SPF/DKIM/DMARC diagnostics", "Vitest + Playwright + CI"]
}
```

- [ ] **Step 4: Correct stale CODE_TOUR claims**

Remove references to the old theme provider, toast/tooltip infrastructure, `server/index.ts`, and map integration if absent from final main.

- [ ] **Step 5: Run portfolio release gate**

```bash
pnpm install --frozen-lockfile
pnpm test:portfolio
pnpm verify:product-engineering
pnpm check
pnpm verify:recruiter-proof
pnpm build
pnpm verify:bundle
```

- [ ] **Step 6: Commit and open separate PR**

```bash
git add .
git commit -m "feat: lead portfolio with MailTrace developer experience evidence"
```

---

### Task 12: Update Resend application artifacts only from verified code

**Files outside GitHub:** update Resend ATS CV, premium CV, and product-challenge answer.

- [ ] **Step 1: Re-audit published code as a recruiter**

Score only implemented evidence: Next.js/React, strict TypeScript, Node/server logic, API contracts, webhook/security reasoning, idempotency/retries, developer experience, observability UX, tests/CI, and truthfulness.

- [ ] **Step 2: Rewrite CV project block**

```text
MAILTRACE DX LAB — Developer Experience / Email Observability Sample
Next.js · React · TypeScript · Node · SQLite · Vitest · Playwright
• Built a developer-facing debugging console for a simulated email lifecycle, exposing request/message correlation IDs, event timelines, retry metadata, raw payloads, and actionable recovery states.
• Implemented HMAC-SHA256 webhook verification with a five-minute replay window, 64 KiB payload boundary, idempotent provider-event ingestion, and explicit API error contracts.
• Added deterministic SPF/DKIM/DMARC diagnostic fixtures, strict TypeScript, unit/integration/component tests, Playwright E2E, CI, and production build budgets.
```

Delete any bullet not supported by final code.

- [ ] **Step 3: Rewrite Resend UX challenge answer**

Core narrative:

> The hardest UX problem was not displaying an event timeline; it was deciding how much system detail to expose without making the developer reconstruct the system from raw logs. I designed the trace page around stable correlation IDs, normalized event state, late-arrival/retry markers, and a raw-payload disclosure so the common path stays readable while the original evidence remains one click away.

- [ ] **Step 4: Cross-artifact consistency check**

GitHub, portfolio, CV, and application must agree on Spain/CET, product-engineering positioning, project names, implemented features, no production/customer claims, and no Resend affiliation claim.

---

## Plan self-review result

- **Spec coverage:** all approved product flows, security boundaries, observability model, deterministic diagnostics, test levels, CI, portfolio integration, and truthfulness constraints map to explicit tasks.
- **Scope:** one cohesive new project plus a later portfolio integration PR; no provider, live DNS, auth, queue, Docker, or production infrastructure was added.
- **Type consistency:** core domain contracts are defined before persistence, service, route, UI, and E2E consumers.
- **No placeholders:** exact limits, status codes, commands, data flow, and representative test/implementation code are specified.
- **Risk controls:** the current green portfolio PR stays independent; MailTrace is not referenced by the portfolio or CV until MailTrace CI is green.
