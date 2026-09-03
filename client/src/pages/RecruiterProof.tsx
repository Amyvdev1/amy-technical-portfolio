import { ArrowLeft, ArrowUpRight, Check, ChevronRight, Code2, ExternalLink, FileCheck2, Github, ShieldCheck, TerminalSquare } from "lucide-react";
import { Link } from "wouter";

const proofCards = [
  {
    index: "01",
    title: "ForgeFlow AI Automation",
    type: "FULL-STACK CODE SAMPLE",
    stack: "React · TypeScript · FastAPI · SQLite · Docker · CI",
    detail: "A reviewable workflow control-plane demo with validated inputs, persisted runs, an optional Gemini adapter, a deterministic fallback, and an explicit human-review checkpoint.",
    source: "https://github.com/Amyvdev1/forgeflow-ai-automation",
    action: "Open ForgeFlow source",
    proof: ["Typed API contracts", "Persisted run history", "Backend tests + frontend checks"],
  },
  {
    index: "02",
    title: "ClearRoute API",
    type: "BACKEND CODE SAMPLE",
    stack: "Python · FastAPI · Pydantic · REST · pytest",
    detail: "A focused workflow API demonstration organized around validation, constrained task states, role-gated demo transitions, and audit-friendly events.",
    source: "https://github.com/Amyvdev1/clearrout-api",
    action: "Open ClearRoute source",
    proof: ["Versioned REST routes", "Explicit legal transition graph", "Five focused API tests"],
  },
  {
    index: "03",
    title: "AccessPath Console",
    type: "ACCESSIBLE FRONTEND PRACTICE",
    stack: "React · TypeScript · Semantic HTML · Vitest · axe",
    detail: "A keyboard-first workboard built to practice semantic structure, labelled validation, live status feedback, responsive layouts, and automated accessibility regression checks.",
    source: "https://github.com/Amyvdev1/accessible-workflow-console",
    action: "Open AccessPath source",
    proof: ["Keyboard-operable controls", "Visible focus + feedback", "Focused accessibility checks"],
  },
];

const liveTopics = [
  {
    label: "TRACE",
    title: "Follow a request end to end",
    detail: "Walk through a React input, FastAPI route, validation boundary, SQLite record, response state, and interface feedback in ForgeFlow.",
  },
  {
    label: "TEST",
    title: "Run the verification path",
    detail: "Explain the existing test commands, show what each focused test covers, and distinguish regression evidence from production certification.",
  },
  {
    label: "CHANGE",
    title: "Make a scoped improvement live",
    detail: "Implement a small validation, state, or UI change in a public sample, then explain the tradeoff and how it would be tested.",
  },
  {
    label: "DESIGN",
    title: "Discuss production next steps",
    detail: "Describe what would be added for durable data, real auth/RBAC, secret handling, observability, retries, rate limits, and cloud delivery—without claiming it is already present.",
  },
];

function ProofCard({ card }: { card: (typeof proofCards)[number] }) {
  return (
    <article className="recruiter-proof-card">
      <div className="proof-card-top"><span>PROOF / {card.index}</span><i /><span>{card.type}</span></div>
      <div className="proof-card-head"><div className="proof-card-index">{card.index}</div><div><h2>{card.title}</h2><p>{card.stack}</p></div></div>
      <p className="proof-card-detail">{card.detail}</p>
      <ul>{card.proof.map((item) => <li key={item}><Check size={14} /> {item}</li>)}</ul>
      <a href={card.source} target="_blank" rel="noreferrer" className="proof-card-link">{card.action} <ExternalLink size={15} /></a>
    </article>
  );
}

export default function RecruiterProof() {
  return (
    <div className="recruiter-proof-page">
      <header className="proof-page-header">
        <Link href="/" className="proof-back"><ArrowLeft size={16} /> Portfolio home</Link>
        <span>AMY VILLA / TECHNICAL REVIEW</span>
        <a href="mailto:amyv.dev@gmail.com">Contact <ArrowUpRight size={14} /></a>
      </header>

      <main>
        <section className="proof-hero">
          <div className="proof-orbit proof-orbit-one" aria-hidden="true" /><div className="proof-orbit proof-orbit-two" aria-hidden="true" />
          <div className="proof-hero-copy">
            <p className="proof-eyebrow"><i /> RECRUITER FAST PATH</p>
            <h1>Evidence before<br /><em>assumptions.</em></h1>
            <p className="proof-intro">A concise, reviewable path through Amy Villa&apos;s public technical work. Start with source code, inspect the documented limits, and use a live conversation to test how she thinks through a system.</p>
            <div className="proof-hero-actions"><a href="#samples">Review code samples <ChevronRight size={16} /></a><a href="https://github.com/Amyvdev1" target="_blank" rel="noreferrer"><Github size={16} /> GitHub profile</a></div>
          </div>
          <aside className="proof-eligibility" aria-label="Candidate overview">
            <p>CANDIDATE SNAPSHOT</p>
            <div><span>LOCATION</span><b>Miami, FL / Remote</b></div>
            <div><span>LANGUAGES</span><b>Native English + Spanish</b></div>
            <div><span>AUTHORIZATION</span><b>U.S. work authorized</b></div>
            <div><span>FOCUS</span><b>Software · AI automation · workflows</b></div>
          </aside>
        </section>

        <section className="proof-context">
          <p className="proof-eyebrow"><i /> EXPERIENCE CONTEXT</p>
          <div><h2>3+ years of hands-on work<br />across <em>digital systems.</em></h2><p>Experience includes AI-assisted workflow design, digital-system and content operations, CRM-related process organization, bilingual delivery, and independent technical project development. This is intentionally not presented as three years of formal full-stack employment.</p></div>
          <div className="proof-context-note"><ShieldCheck size={19} /><p><b>Clear scope, stronger trust.</b> Every repository is labelled as a personal code sample or practice study. Public code demonstrates implementation choices; it does not claim client outcomes, production users, or enterprise scale.</p></div>
        </section>

        <section id="samples" className="proof-samples">
          <div className="proof-section-heading"><p className="proof-eyebrow"><i /> INSPECTABLE TECHNICAL WORK</p><h2>Start where the<br /><em>evidence is strongest.</em></h2><p>Each project has readable documentation, setup instructions, code-tour context, and explicitly stated boundaries. ForgeFlow is the best first sample for full-stack and AI-workflow discussions.</p></div>
          <div className="proof-card-grid">{proofCards.map((card) => <ProofCard key={card.title} card={card} />)}</div>
        </section>

        <section className="proof-live">
          <div className="proof-live-mark" aria-hidden="true"><TerminalSquare size={28} /><span>LIVE<br />SCREEN</span></div>
          <div><p className="proof-eyebrow"><i /> TECHNICAL CONVERSATION</p><h2>What Amy can<br /><em>walk through live.</em></h2><p>A stronger candidate conversation is not a list of tools. It is a concrete explanation of a build, the decisions behind it, and the next tradeoffs to solve.</p></div>
          <div className="proof-live-grid">{liveTopics.map((topic) => <article key={topic.label}><span>{topic.label}</span><h3>{topic.title}</h3><p>{topic.detail}</p></article>)}</div>
        </section>

        <section className="proof-boundary">
          <div><p className="proof-eyebrow"><i /> HONEST ENGINEERING SIGNAL</p><h2>What is implemented.<br /><em>What comes next.</em></h2></div>
          <div className="proof-boundary-columns"><article><Code2 size={19} /><h3>Implemented in public work</h3><p>Responsive React/TypeScript interfaces; FastAPI and REST foundations; structured validation; local persistence; documented workflow state; optional AI with a deterministic fallback; Docker; focused tests; and GitHub Actions CI in ForgeFlow.</p></article><article><FileCheck2 size={19} /><h3>Production next steps, not claims</h3><p>Real authentication and authorization, durable multi-user storage, migrations, secrets management, retries, rate limits, logs/metrics/traces, health checks, cloud deployment, and operational monitoring.</p></article></div>
        </section>

        <section className="proof-cta"><p className="proof-eyebrow"><i /> READY FOR REVIEW</p><h2>Open the code.<br /><em>Ask the hard questions.</em></h2><p>For a role where transparent engineering judgment matters, Amy welcomes a focused technical conversation about the choices and boundaries in these public samples.</p><div><a href="https://github.com/Amyvdev1/forgeflow-ai-automation" target="_blank" rel="noreferrer">Start with ForgeFlow <ArrowUpRight size={17} /></a><a href="mailto:amyv.dev@gmail.com">amyv.dev@gmail.com <ArrowUpRight size={17} /></a></div></section>
      </main>
    </div>
  );
}
