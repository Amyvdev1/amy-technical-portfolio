import CandidateSnapshot from "@/components/CandidateSnapshot";
import {
  liveReviewTopics,
  publicProjectEvidence,
  type PublicProjectEvidence,
} from "@/lib/productEvidence";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  ChevronRight,
  Code2,
  ExternalLink,
  FileCheck2,
  Github,
  ShieldCheck,
  TerminalSquare,
} from "lucide-react";
import { Link } from "wouter";

function ProofCard({ card }: { card: PublicProjectEvidence }) {
  return (
    <article className="recruiter-proof-card">
      <div className="proof-card-top">
        <span>PROOF / {card.index}</span>
        <i />
        <span>{card.type}</span>
      </div>
      <div className="proof-card-head">
        <div className="proof-card-index">{card.index}</div>
        <div>
          <h2>{card.name}</h2>
          <p>{card.stack}</p>
        </div>
      </div>
      <p className="proof-card-detail">{card.detail}</p>
      <ul>
        {card.signals.map((signal) => (
          <li key={signal}>
            <Check size={14} /> {signal}
          </li>
        ))}
      </ul>
      <a
        href={card.source}
        target="_blank"
        rel="noreferrer"
        className="proof-card-link"
      >
        {card.action} <ExternalLink size={15} />
      </a>
    </article>
  );
}

export default function RecruiterProof() {
  return (
    <div className="recruiter-proof-page">
      <header className="proof-page-header">
        <Link href="/" className="proof-back">
          <ArrowLeft size={16} /> Portfolio home
        </Link>
        <span>AMY VILLA / PRODUCT ENGINEERING REVIEW</span>
        <a href="mailto:amyv.dev@gmail.com">
          Contact <ArrowUpRight size={14} />
        </a>
      </header>

      <main>
        <section className="proof-hero">
          <div className="proof-orbit proof-orbit-one" aria-hidden="true" />
          <div className="proof-orbit proof-orbit-two" aria-hidden="true" />
          <div className="proof-hero-copy">
            <p className="proof-eyebrow">
              <i /> RECRUITER FAST PATH
            </p>
            <h1>
              Product signals before
              <br />
              <em>assumptions.</em>
            </h1>
            <p className="proof-intro">
              A concise path through public React, TypeScript, and API work.
              Start with the code, inspect how system state and failure behavior
              are communicated, then use a live conversation to test product
              judgment and engineering tradeoffs.
            </p>
            <div className="proof-hero-actions">
              <a href="#samples">
                Review code samples <ChevronRight size={16} />
              </a>
              <a
                href="https://github.com/Amyvdev1"
                target="_blank"
                rel="noreferrer"
              >
                <Github size={16} /> GitHub profile
              </a>
            </div>
          </div>
          <CandidateSnapshot />
        </section>

        <section className="proof-context">
          <p className="proof-eyebrow">
            <i /> PRODUCT ENGINEERING CONTEXT
          </p>
          <div>
            <h2>
              Build the interface.
              <br />
              Make the system <em>explain itself.</em>
            </h2>
            <p>
              My strongest public work sits where product craft meets system
              behavior: responsive interfaces, typed API boundaries, explicit
              state, useful failure feedback, accessible recovery paths, and
              verification that keeps the experience reviewable as it changes.
            </p>
          </div>
          <div className="proof-context-note">
            <ShieldCheck size={19} />
            <p>
              <b>Evidence over labels.</b> The repositories below are
              self-directed code samples with source, setup instructions, tests,
              and explicit implementation boundaries. They show how I build and
              reason; they do not claim production scale or customer outcomes
              that are not documented.
            </p>
          </div>
        </section>

        <section id="samples" className="proof-samples">
          <div className="proof-section-heading">
            <p className="proof-eyebrow">
              <i /> INSPECTABLE PRODUCT ENGINEERING
            </p>
            <h2>
              Start where the
              <br />
              <em>signal is strongest.</em>
            </h2>
            <p>
              ForgeFlow is the fastest route into my full-stack thinking: typed
              requests, persisted execution state, visible fallback behavior,
              human review, tests, and CI. ClearRoute goes deeper on API
              contracts; AccessPath focuses on recovery and accessible product
              feedback.
            </p>
          </div>
          <div className="proof-card-grid">
            {publicProjectEvidence.map((card) => (
              <ProofCard key={card.name} card={card} />
            ))}
          </div>
        </section>

        <section className="proof-live">
          <div className="proof-live-mark" aria-hidden="true">
            <TerminalSquare size={28} />
            <span>
              LIVE
              <br />SCREEN
            </span>
          </div>
          <div>
            <p className="proof-eyebrow">
              <i /> TECHNICAL CONVERSATION
            </p>
            <h2>
              What I can
              <br />
              <em>walk through live.</em>
            </h2>
            <p>
              A useful engineering screen should reveal how someone thinks, not
              just what tools appear on a resume. These are concrete review paths
              through the public code.
            </p>
          </div>
          <div className="proof-live-grid">
            {liveReviewTopics.map((topic) => (
              <article key={topic.label}>
                <span>{topic.label}</span>
                <h3>{topic.title}</h3>
                <p>{topic.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="proof-boundary">
          <div>
            <p className="proof-eyebrow">
              <i /> ENGINEERING BOUNDARY
            </p>
            <h2>
              What ships in the sample.
              <br />
              <em>What I would harden next.</em>
            </h2>
          </div>
          <div className="proof-boundary-columns">
            <article>
              <Code2 size={19} />
              <h3>Implemented and reviewable</h3>
              <p>
                Responsive React/TypeScript interfaces; FastAPI and REST
                foundations; structured validation; local persistence; explicit
                workflow state; optional provider execution with a deterministic
                fallback; Docker; focused tests; and GitHub Actions CI.
              </p>
            </article>
            <article>
              <FileCheck2 size={19} />
              <h3>Production hardening, not portfolio claims</h3>
              <p>
                Real identity and authorization, durable multi-user storage,
                migrations, secrets, idempotency, retries, rate limits,
                logs/metrics/traces, health checks, cloud delivery, and
                operational monitoring are the next production concerns I would
                design for based on the system requirements.
              </p>
            </article>
          </div>
        </section>

        <section className="proof-cta">
          <p className="proof-eyebrow">
            <i /> READY FOR REVIEW
          </p>
          <h2>
            Open the code.
            <br />
            <em>Ask the hard questions.</em>
          </h2>
          <p>
            I am looking for product-engineering work where developer experience,
            API behavior, clear failure states, and careful interface craft all
            matter. The public samples are built to make that conversation
            concrete.
          </p>
          <div>
            <a
              href="https://github.com/Amyvdev1/forgeflow-ai-automation"
              target="_blank"
              rel="noreferrer"
            >
              Start with ForgeFlow <ArrowUpRight size={17} />
            </a>
            <a href="mailto:amyv.dev@gmail.com">
              amyv.dev@gmail.com <ArrowUpRight size={17} />
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
