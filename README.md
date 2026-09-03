# Amy Villa — Signal Engine Portfolio

> **Software Developer · AI Automation · Workflow Systems**

[Live portfolio](https://amy-villa-signal-gallery.vercel.app/) · [LinkedIn](https://www.linkedin.com/in/amy-villa-5830aa433/) · [GitHub profile](https://github.com/Amyvdev1) · [Contact Amy](mailto:amyv.dev@gmail.com)

A cinematic **React + TypeScript** portfolio that presents four independent software studies. Each study focuses on a practical systems question: how to make state, ownership, review, accessibility, and the next action visible to the people using an interface.

The site is part portfolio and part interactive product narrative. Its scroll-driven Signal Engine introduction, project exhibits, and stateful UI demonstrations are designed and built as inspectable front-end work—not as screenshots or static mockups.

## What this repository demonstrates

| Area | Evidence in this repository | Why it matters |
|---|---|---|
| **Interface architecture** | React components, Wouter routing, responsive layout, error boundary, and theme foundation | Interfaces stay organized as the project grows beyond a single page |
| **Workflow design** | RelayOps, ClientFlow, and Signal Lab simulations with explicit stages, approvals, ownership, and handoffs | Operations become easier to understand when state and next actions are visible |
| **Accessibility practice** | Native controls, labels, inline validation, focus styles, alert/status feedback, and the AccessPath study | Interaction feedback remains available beyond a pointer-only path |
| **Technical storytelling** | Scroll progress, chapter navigation, visual telemetry, project catalog, and live links to code samples | A recruiter can quickly see both product thinking and source-level implementation |
| **Deployment readiness** | Vite build configuration, Express static-serving shell, and Vercel configuration | The portfolio has a documented path from source to a static-hosted web experience |

## Selected exhibits

| Exhibit | Built experience | Primary tools | Source / walkthrough |
|---|---|---|---|
| **RelayOps** | Local interactive workboard that makes tasks, owner initials, approvals, and handoffs visible | React, TypeScript, workflow design | [Open study](https://amy-villa-signal-gallery.vercel.app/projects/relayops) |
| **ClearRoute API** | Portfolio walkthrough for a separately maintained API sample focused on task contracts and state changes | FastAPI, Pydantic, pytest | [Open study](https://amy-villa-signal-gallery.vercel.app/projects/clearrout-api) · [Source](https://github.com/Amyvdev1/clearrout-api) |
| **ClientFlow Studio** | Local customer-operations interface for leads, context, notes, and next actions | React, TypeScript, product UX | [Open study](https://amy-villa-signal-gallery.vercel.app/projects/clientflow-studio) |
| **AccessPath Console** | Accessibility-practice workboard with semantic structure, keyboard-first controls, form recovery, and live status feedback | React, TypeScript, semantic HTML, axe | [Open study](https://amy-villa-signal-gallery.vercel.app/projects/accesspath-console) · [Source](https://github.com/Amyvdev1/accessible-workflow-console) |

## Code map

The main implementation areas are deliberately separated so the portfolio is easy to review.

| Source area | What it does |
|---|---|
| [`client/src/App.tsx`](client/src/App.tsx) | Declares the client routes for the home experience, Signal Lab, project studies, and not-found state; wraps the application with resilience and UI providers. |
| [`client/src/pages/Home.tsx`](client/src/pages/Home.tsx) | Defines the Signal Engine scene data and selected-project catalog. Tracks scroll progress, active chapters, cursor-based visual drift, and the interactive engine core. |
| [`client/src/pages/DemoPage.tsx`](client/src/pages/DemoPage.tsx) | Resolves project routes and contains the local RelayOps, ClearRoute walkthrough, and ClientFlow interactive surfaces. |
| [`client/src/pages/SignalLab.tsx`](client/src/pages/SignalLab.tsx) | Models a staged workflow simulation with active, completed, and pending state plus run/reset controls. |
| [`client/src/components/AccessPathCaseStudy.tsx`](client/src/components/AccessPathCaseStudy.tsx) | Implements the accessibility-focused workboard and form behavior, including validation, associated errors, alert feedback, and polite status announcements. |
| [`client/src/index.css`](client/src/index.css) | Provides the visual system, responsive breakpoints, motion rules, focus treatment, and the Signal Engine composition. |
| [`server/index.ts`](server/index.ts) and [`vercel.json`](vercel.json) | Supply the static serving fallback and production build/output configuration. |

Read the detailed [code tour](docs/CODE_TOUR.md) for behavior-level explanations and evidence boundaries.

## Run locally

```bash
pnpm install
pnpm dev
```

For a production build:

```bash
pnpm check
pnpm build
```

## Evidence boundary

Every exhibit is a **self-directed portfolio demonstration** using sample data. These interfaces do not represent client work, user data, a commercial deployment, or measured business outcomes. ClearRoute API is maintained in its own repository. AccessPath practices implementation patterns and automated checks; it does not claim formal WCAG or Section 508 conformance.

## Contact

Amy is open to software development, AI automation, implementation, technical operations, and product-supporting opportunities.

**[amyv.dev@gmail.com](mailto:amyv.dev@gmail.com)** · [LinkedIn](https://www.linkedin.com/in/amy-villa-5830aa433/) · [GitHub](https://github.com/Amyvdev1)
