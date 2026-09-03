# Signal Engine Portfolio — Code Tour

This guide explains the role of the major code areas in the portfolio. It is written for recruiters and engineers who want to move from the visual site to the implementation decisions behind it.

## Application shell and routes

[`client/src/App.tsx`](../client/src/App.tsx) is the routing boundary. It maps the main Signal Engine narrative to `/`, the interactive Signal Lab to `/signal-lab`, and the product studies to `/projects/:slug`. The application is wrapped with an error boundary, a dark-default theme provider, tooltip support, and toast infrastructure so shared UI behavior is centralized rather than duplicated in individual pages.

## Signal Engine narrative

[`client/src/pages/Home.tsx`](../client/src/pages/Home.tsx) holds two content models: `scenes` for the four scroll chapters and `projects` for the selected exhibits. The component calculates scroll progress relative to the story section, derives the active scene, writes visual values into CSS custom properties, and supports direct chapter navigation with smooth scrolling. Pointer movement adjusts decorative visual drift for non-touch pointers. The core activation button toggles a local visual state without changing navigation or persistent data.

The result is an art-directed portfolio experience whose copy, telemetry labels, chapter controls, and project cards are driven from structured local data instead of repeated markup.

## Interactive studies

[`client/src/pages/DemoPage.tsx`](../client/src/pages/DemoPage.tsx) takes the route slug and selects the right study data and interactive surface. `RelayOpsDemo` models a narrow approval workflow. `ClientFlowDemo` uses React state to switch among lead stages and retain a local handoff note. The ClearRoute section is a UI walkthrough for the separate API repository. These are local demonstrations, so refreshing the browser resets their UI state.

[`client/src/pages/SignalLab.tsx`](../client/src/pages/SignalLab.tsx) uses local state to represent a staged workflow. Its run/reset controls move a scenario through visible completed, active, and pending stages. The language deliberately preserves a human-review checkpoint when the simulation reaches its prepared-handoff outcome.

## Accessibility implementation study

[`client/src/components/AccessPathCaseStudy.tsx`](../client/src/components/AccessPathCaseStudy.tsx) is a focused accessibility-oriented interface. The form trims input, rejects titles shorter than four characters, adds `aria-invalid` and `aria-describedby` when validation fails, and exposes the recovery message through `role="alert"`. Successful submission clears the field and updates a polite `role="status"` message. Native buttons, heading structure, labelled regions, and visible focus treatment support a keyboard-operable interface pattern.

The separate [AccessPath Console repository](https://github.com/Amyvdev1/accessible-workflow-console) contains the standalone executable sample and its automated checks.

## Visual system and hosting shell

[`client/src/index.css`](../client/src/index.css) contains the visual language: typography, dark surfaces, scene composition, responsive transformations, and motion rules. It includes reduced-motion handling so nonessential animation can be minimized by user preference.

[`server/index.ts`](../server/index.ts) serves the static output and returns the application shell for client-side routes. [`vite.config.ts`](../vite.config.ts) defines the project’s client root and build destination, while [`vercel.json`](../vercel.json) declares the install, build, and output settings for static deployment.

## Deliberate boundaries

The portfolio demonstrates source-level React and TypeScript implementation, interaction architecture, and documented deployment configuration. It does not claim that the local demos are customer-facing products, that their sample state persists, that the portfolio’s map component has a configured production integration, or that the project has formal accessibility certification. The code samples are designed to show how Amy approaches clear interfaces and system boundaries.
