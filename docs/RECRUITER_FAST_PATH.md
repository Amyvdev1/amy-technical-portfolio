# Recruiter Fast Path

This guide is a concise route through Amy Villa’s public technical work for software development, AI automation, workflow systems, implementation, and technical-operations conversations.

> **Evidence boundary:** The projects listed below are independently built public code samples or practice studies. They demonstrate implementation decisions and do not claim client work, production users, enterprise scale, formal certifications, or outcomes that are not documented in the repository.

## Start here: ForgeFlow AI Automation

[ForgeFlow AI Automation](https://github.com/Amyvdev1/forgeflow-ai-automation) is the most relevant sample for a full-stack and AI-automation conversation. It contains a React and TypeScript dashboard, a FastAPI service, Pydantic contracts, local SQLite persistence, optional Gemini invocation, a deterministic fallback, Docker/Compose configuration, and a GitHub Actions verification workflow.

A reviewer can inspect the [code tour](https://github.com/Amyvdev1/forgeflow-ai-automation/blob/main/docs/CODE_TOUR.md), run the documented test and build commands, and ask Amy to trace an input through validation, persistence, an execution mode, and UI feedback. The README deliberately distinguishes implemented behavior from production controls not yet implemented.

## Backend foundation: ClearRoute API

[ClearRoute API](https://github.com/Amyvdev1/clearrout-api) is a small FastAPI workflow sample. It focuses on typed inputs, task-state transitions, role-gated demonstration logic, and audit-friendly events. Its README and code tour explain the intentionally limited in-memory implementation and its focused tests.

A useful interview prompt is: “How would you turn this demonstration into a durable, authenticated, concurrent service?” Amy can discuss the next engineering steps—database persistence, transactions, identity/authentication, RBAC, idempotency, error handling, and observability—without representing those additions as already implemented.

## Frontend and accessibility practice: AccessPath Console

[AccessPath Console](https://github.com/Amyvdev1/accessible-workflow-console) is a React and TypeScript practice project that concentrates on keyboard-operable controls, semantic landmarks, clear validation feedback, live status messaging, responsive presentation, and focused axe/Vitest checks.

The project is an accessibility-practice sample. Its documented checks support regression testing; they do not claim complete WCAG or Section 508 conformance. A valuable screen exercise is a keyboard-only walkthrough followed by a discussion of issues automated checks may not detect.

## Experience context

Amy’s resume uses **3+ years of hands-on experience across digital systems, AI-assisted workflows, content operations, CRM-related process organization, and independent technical project development**. The paid freelance engagement listed there is Management Services RT LLC, January 2023–October 2025. This is not presented as three years of formal full-stack employment.

## What Amy can demonstrate live

1. Run and explain focused tests and build/type-check commands for a selected project.
2. Trace a request through a React interface, FastAPI endpoint, validation model, local persistence, response state, and UI update.
3. Explain the optional AI path, deterministic fallback, and why human review remains visible in ForgeFlow.
4. Make a small scoped change, explain its tradeoffs, and identify the corresponding test or quality check.
5. Separate currently implemented behavior from a production roadmap including auth/RBAC, durable data, secrets, rate limits, retries, observability, health checks, and cloud delivery.

## Contact

- **Portfolio:** [amy-villa-signal-gallery.vercel.app](https://amy-villa-signal-gallery.vercel.app/)
- **Recruiter proof route:** [amy-villa-signal-gallery.vercel.app/recruiter-proof](https://amy-villa-signal-gallery.vercel.app/recruiter-proof)
- **GitHub:** [github.com/Amyvdev1](https://github.com/Amyvdev1)
- **LinkedIn:** [linkedin.com/in/amy-villa-5830aa433](https://www.linkedin.com/in/amy-villa-5830aa433/)
- **Email:** [amyv.dev@gmail.com](mailto:amyv.dev@gmail.com)
