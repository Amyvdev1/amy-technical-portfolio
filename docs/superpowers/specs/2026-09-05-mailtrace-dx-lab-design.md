# MailTrace DX Lab Design

Date: 2026-09-05
Planning branch: `mailtrace-dx-lab-design`

## Goal

Create a new public engineering project that gives a Resend reviewer concrete, inspectable evidence of product engineering and developer-experience work in the exact problem space the role cares about: email lifecycle visibility, webhook debugging, domain diagnostics, API behavior, failure recovery, and trustworthy observability.

The project is not intended to imitate Resend’s product or claim production scale. It is a deliberately scoped developer-facing debugging product that demonstrates how Amy designs and implements a reliable interface around asynchronous message events.

## Why this project

The current portfolio already shows strong React/TypeScript product craft, accessibility, API thinking, failure-state UX, CI discipline, and full-stack work through ForgeFlow. The largest evidence gaps for the Resend Product Engineer role are:

- Next.js experience,
- TypeScript/Node server-side work,
- email/webhook/domain debugging flows,
- observability-oriented product design,
- end-to-end browser tests on a developer-facing workflow.

MailTrace DX Lab should close those gaps with one cohesive, testable project instead of adding disconnected examples.

## Product concept

MailTrace DX Lab is a local developer console for tracing one outbound message through a simulated delivery lifecycle.

A user can:

1. create a test message trace,
2. inspect the generated request and message identifiers,
3. receive signed webhook events through a local API route,
4. see delivery events appear in chronological order,
5. inspect raw payloads and normalized event data,
6. understand retry/idempotency behavior,
7. inspect a domain-diagnostics panel with SPF/DKIM/DMARC-style sample records,
8. reproduce failures with deterministic fixtures,
9. see recovery guidance when a webhook signature, event ordering, or DNS record is invalid.

The product should feel like a small developer tool, not a marketing site.

## Scope

### In scope

- Next.js App Router
- React 19
- strict TypeScript
- Node runtime route handlers
- local SQLite persistence
- message traces
- signed webhook ingestion
- event normalization
- correlation IDs
- idempotency keys
- retry metadata
- event timeline
- raw payload inspector
- domain diagnostics using deterministic sample DNS records
- visible error/recovery states
- Vitest unit/integration tests
- Playwright end-to-end tests
- GitHub Actions CI
- concise technical documentation and code tour

### Out of scope

- sending real email through a third-party provider
- real customer data
- real DNS lookups in the first version
- background queues or external brokers
- multi-user authentication
- production infrastructure
- external monitoring vendors
- Docker in v1; ForgeFlow already demonstrates container delivery and MailTrace should stay focused on developer debugging
- claims of production reliability, throughput, or deliverability

This keeps the project reviewable in one sitting.

## Technical stack

- **Framework:** Next.js 16 with App Router
- **UI:** React 19
- **Language:** TypeScript with `strict`, `noUncheckedIndexedAccess`, `noUnusedLocals`, and `noUnusedParameters`
- **Server:** Next.js route handlers on the Node runtime
- **Persistence:** SQLite through a minimal driver and a small repository layer
- **Validation:** Zod
- **Testing:** Vitest + React Testing Library for unit/component tests, Playwright for browser E2E
- **Styling:** CSS Modules or a small global CSS layer; no large component framework
- **CI:** GitHub Actions
- **Package manager:** pnpm

The dependency surface should remain intentionally small.

## Architecture

```text
Browser
  │
  ▼
Next.js product UI
  ├── Trace list
  ├── Trace detail / timeline
  ├── Raw event inspector
  ├── Retry + idempotency diagnostics
  └── Domain diagnostics
        │
        ▼
Next.js route handlers (Node runtime)
  ├── POST /api/traces
  ├── GET  /api/traces
  ├── GET  /api/traces/:id
  ├── POST /api/webhooks/events
  └── POST /api/diagnostics/domain
        │
        ▼
Application services
  ├── trace service
  ├── webhook verification service
  ├── event normalization service
  ├── idempotency service
  └── domain diagnostics service
        │
        ▼
SQLite repository layer
```

## Data model

### MessageTrace

```ts
type MessageTrace = {
  id: string;
  requestId: string;
  messageId: string;
  recipient: string;
  subject: string;
  status: "queued" | "sent" | "delivered" | "bounced" | "complained" | "failed";
  createdAt: string;
  updatedAt: string;
};
```

### DeliveryEvent

```ts
type DeliveryEvent = {
  id: string;
  traceId: string;
  providerEventId: string;
  type: "sent" | "delivered" | "bounced" | "complained" | "failed";
  occurredAt: string;
  receivedAt: string;
  retryAttempt: number;
  signatureValid: boolean;
  rawPayload: string;
};
```

### IdempotencyRecord

```ts
type IdempotencyRecord = {
  key: string;
  route: string;
  responseHash: string;
  createdAt: string;
};
```

### DomainDiagnostic

```ts
type DomainDiagnostic = {
  domain: string;
  spf: DiagnosticCheck;
  dkim: DiagnosticCheck;
  dmarc: DiagnosticCheck;
  overall: "healthy" | "warning" | "error";
};

type DiagnosticCheck = {
  status: "pass" | "warning" | "fail";
  record: string;
  explanation: string;
  nextAction: string;
};
```

## Core product flows

### 1. Create a trace

The user creates a local test message with recipient and subject.

The server generates:

- a trace ID,
- request ID,
- message ID,
- initial `queued` state,
- persisted trace record.

The response exposes identifiers clearly because the product is designed for debugging.

### 2. Ingest a webhook

`POST /api/webhooks/events` receives a signed payload with:

- timestamp,
- signature,
- provider event ID,
- message ID,
- event type,
- occurred timestamp,
- retry attempt.

The route:

1. rejects request bodies larger than **64 KiB** before parsing,
2. validates the schema,
3. verifies an HMAC signature,
4. rejects webhook timestamps more than **5 minutes** away from server time,
5. checks idempotency using provider event ID,
6. finds the trace by message ID,
7. stores the raw and normalized event,
8. updates the trace status,
9. returns a structured result describing whether the event was accepted or duplicate.

A duplicate webhook is an idempotent success: return HTTP `200` with `{ status: "duplicate" }` and do not create a second event.

### 3. Inspect an event timeline

The trace detail view renders:

- request/message IDs,
- current status,
- ordered delivery events,
- arrival delay (`receivedAt - occurredAt`),
- retry count,
- signature state,
- raw payload toggle.

Out-of-order events should remain visible rather than silently reordered without explanation. The UI can sort by occurred time while also marking late arrival.

### 4. Diagnose webhook failures

The UI must make these states explicit:

- invalid signature,
- expired timestamp,
- duplicate event,
- unknown message ID,
- malformed payload,
- unsupported event type.

Each failure should include a developer-facing next action. Duplicate events are displayed as a non-destructive informational state, not an error.

### 5. Diagnose domain configuration

The first version uses deterministic sample DNS records, not live network calls.

The user enters a domain and selects or receives a fixture representing:

- healthy records,
- missing SPF,
- invalid DKIM selector,
- weak/missing DMARC.

The result explains the record, status, why it matters, and the next action. The UI must state clearly that this is a deterministic diagnostic fixture, not a live DNS query.

## Error contracts

API errors use one shape:

```ts
type ApiError = {
  error: {
    code: string;
    message: string;
    nextAction?: string;
    requestId: string;
  };
};
```

Expected error codes include:

- `INVALID_REQUEST`
- `INVALID_SIGNATURE`
- `STALE_WEBHOOK`
- `PAYLOAD_TOO_LARGE`
- `TRACE_NOT_FOUND`
- `UNSUPPORTED_EVENT`

Duplicate events do **not** use `ApiError`; they return HTTP `200` with a structured duplicate result.

The UI should render the code, readable explanation, and recovery guidance where appropriate.

## Status transition rules

The trace status is derived from persisted events using these explicit rules:

- `queued` → `sent`, `failed`, or `bounced`
- `sent` → `delivered`, `failed`, or `bounced`
- `delivered` → `complained`
- `failed`, `bounced`, and `complained` are terminal
- late events remain visible in the timeline even when they do not replace a terminal trace status

This makes out-of-order event handling inspectable instead of hiding it inside route code.

## Security boundaries

The project demonstrates practical defensive patterns without claiming production security certification.

Required:

- HMAC-SHA256 verification with `timingSafeEqual`,
- **5-minute** timestamp tolerance for replay resistance,
- no secret committed to the repository,
- `.env.example`,
- **64 KiB** maximum webhook request body,
- Zod validation before business logic,
- raw payloads rendered as escaped text only, never injected as HTML,
- clear local-demo boundary in documentation.

## Observability model

The project must make troubleshooting visible without adding an external observability vendor.

Each API request should have a request ID. Important application events should produce structured log objects in development/test paths, for example:

```ts
{
  level: "info",
  event: "webhook.accepted",
  requestId,
  traceId,
  providerEventId,
  retryAttempt,
}
```

The trace detail page is the product-facing observability surface. It should expose what a developer needs to answer:

- What happened?
- In what order?
- Which identifier connects the request to the event?
- Was the webhook authentic?
- Was it retried or duplicated?
- What should I do next?

## UX principles

1. **State before decoration.** Status and identifiers are always easy to find.
2. **Failure is a first-class state.** Invalid and duplicate events are visible, not hidden.
3. **Raw + normalized views.** Developers can inspect original payload and product interpretation.
4. **Next action is explicit.** Error states explain what to fix.
5. **No fake production chrome.** The app is polished but labels its local/demo boundaries.
6. **Keyboard and screen-reader usability.** Interactive controls use native semantics and visible focus.

## Testing strategy

Follow test-driven development.

### Unit tests

- HMAC verification accepts valid signature.
- HMAC verification rejects invalid signature.
- stale timestamp beyond 5 minutes is rejected.
- event normalization maps each supported event type.
- duplicate provider event ID returns duplicate result without creating another event.
- status transition rules preserve terminal status and allow `delivered` → `complained`.
- domain diagnostic fixtures return expected check status and next action.

### API integration tests

- creating a trace persists IDs and initial state.
- valid webhook stores an event and updates the trace.
- duplicate webhook returns HTTP `200` with duplicate status and remains idempotent.
- unknown message ID returns `TRACE_NOT_FOUND`.
- request body over 64 KiB returns `PAYLOAD_TOO_LARGE`.
- invalid payload returns `INVALID_REQUEST`.
- invalid signature returns `INVALID_SIGNATURE`.
- stale webhook returns `STALE_WEBHOOK`.

### Component tests

- trace summary exposes identifiers and status.
- timeline marks late/out-of-order arrival.
- raw payload inspector is collapsed by default and accessible by keyboard.
- error card shows code and next action.
- duplicate state is informative rather than styled as destructive failure.

### Playwright E2E

1. create a trace,
2. open trace detail,
3. trigger a deterministic signed delivery fixture,
4. observe timeline update,
5. inspect raw payload,
6. replay the same event,
7. see duplicate/idempotency state,
8. run a broken domain fixture and see actionable diagnostics.

## CI requirements

Every pull request must run:

1. `pnpm install --frozen-lockfile`
2. `pnpm lint`
3. `pnpm typecheck`
4. `pnpm test`
5. `pnpm test:e2e`
6. `pnpm build`

The project should not merge if any step fails.

## Repository structure

```text
mailtrace-dx-lab/
  app/
    api/
      diagnostics/domain/route.ts
      traces/route.ts
      traces/[id]/route.ts
      webhooks/events/route.ts
    traces/[id]/page.tsx
    page.tsx
  components/
    trace-list.tsx
    trace-summary.tsx
    event-timeline.tsx
    event-inspector.tsx
    error-panel.tsx
    domain-diagnostics.tsx
  lib/
    api-error.ts
    db.ts
    domain-diagnostics.ts
    event-normalization.ts
    idempotency.ts
    logger.ts
    repository.ts
    signatures.ts
    trace-service.ts
    types.ts
  tests/
    integration/
    unit/
  e2e/
    trace-debugging.spec.ts
  fixtures/
    webhooks.ts
    domains.ts
  docs/
    CODE_TOUR.md
  .github/workflows/ci.yml
  .env.example
  README.md
```

Files should stay focused. Business logic belongs in `lib/`, not route handlers or React components.

## Portfolio integration

After the new project is verified:

1. add MailTrace DX Lab to `publicProjectEvidence` as project `01`,
2. move ForgeFlow to `02`, ClearRoute to `03`, AccessPath to `04`,
3. update RecruiterProof intro to lead with developer debugging/observability,
4. update README and recruiter fast path,
5. update the Resend CV project order,
6. use MailTrace as the primary answer for Resend’s UX/product challenge question.

The portfolio should never claim the project uses Resend’s API or is affiliated with Resend.

## Success criteria

The project is ready to use in the Resend application only when:

- the core debugging flow works locally,
- all unit/integration/component/E2E tests pass,
- CI is green,
- the README has exact run/verify instructions,
- no secrets or internal generation artifacts are public,
- the project has clear evidence boundaries,
- a reviewer can understand the architecture in under five minutes,
- a reviewer can reproduce the main debugging flow in under ten minutes,
- the portfolio links to the verified repository,
- the CV describes only implemented, inspectable behavior.

## Non-goals and truthfulness constraints

Do not claim:

- real email delivery,
- Resend integration,
- production traffic,
- customer usage,
- enterprise scale,
- real deliverability metrics,
- real DNS resolution unless later explicitly implemented,
- years of professional Next.js experience based on this sample.

The purpose is to demonstrate engineering judgment and product execution, not manufacture credentials.
