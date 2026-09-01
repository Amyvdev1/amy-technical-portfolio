import { ArrowDownRight, ArrowUpRight, CheckCircle2, Code2, Database, GitBranch, Layers3, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "wouter";

const projects = [
  {
    number: "01",
    title: "RelayOps",
    label: "Workflow operations",
    description: "A focused task-and-approval workspace that makes ownership, state changes, and review moments visible.",
    stack: ["React", "TypeScript", "Workflow design"],
    outcome: "Interactive portfolio demo",
    slug: "relayops",
    accent: "cobalt",
  },
  {
    number: "02",
    title: "ClearRoute API",
    label: "Backend systems",
    description: "A role-aware task API concept built around input validation, audit-friendly events, and predictable handoffs.",
    stack: ["Python", "FastAPI", "Structured validation"],
    outcome: "Public code sample on GitHub",
    slug: "clearrout-api",
    accent: "warm",
  },
  {
    number: "03",
    title: "ClientFlow Studio",
    label: "Customer operations",
    description: "A lightweight interface for organizing leads, next actions, notes, and the context a team needs to follow through.",
    stack: ["React", "TypeScript", "Product UX"],
    outcome: "Interactive portfolio demo",
    slug: "clientflow-studio",
    accent: "teal",
  },
];

const capabilities = [
  { icon: Code2, title: "Product interfaces", text: "Responsive React and TypeScript surfaces that make complex work feel legible." },
  { icon: GitBranch, title: "Workflow design", text: "States, approval points, ownership, and next actions are part of the product." },
  { icon: Database, title: "API foundations", text: "Structured validation, data contracts, traceability, and predictable system behavior." },
  { icon: Sparkles, title: "AI-assisted operations", text: "Practical automations designed around human review, clarity, and control." },
  { icon: ShieldCheck, title: "Quality mindset", text: "Testable flows, documented boundaries, and interfaces built for confident handoffs." },
  { icon: Layers3, title: "Bilingual delivery", text: "Native English and Spanish communication across technical and operational work." },
];

export default function Home() {
  return (
    <div className="portfolio-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Amy Villa home">
          <span className="brand-mark">AV</span>
          <span>Amy Villa <em>— systems & software</em></span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#work">Selected work</a>
          <a href="#approach">Approach</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="header-link" href="mailto:amyv.dev@gmail.com">Let&apos;s talk <ArrowUpRight size={15} /></a>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-image" />
          <div className="hero-grid" />
          <div className="hero-content">
            <p className="eyebrow"><span /> Independent developer portfolio</p>
            <h1>Software that makes the <i>next step</i> obvious.</h1>
            <p className="hero-copy">I build full-stack product concepts, workflow systems, and practical interfaces for teams that need a clearer way to move work forward.</p>
            <div className="hero-signal-row" aria-label="Core specialties">
              <span>React · TypeScript</span><span>Python · FastAPI</span><span>Workflow systems</span>
            </div>
            <div className="hero-actions">
              <a className="button-primary" href="#work">See selected work <ArrowDownRight size={17} /></a>
              <a className="button-quiet" href="mailto:amyv.dev@gmail.com">amyv.dev@gmail.com <ArrowUpRight size={15} /></a>
            </div>
          </div>
          <div className="hero-note"><span>01—03</span><p>Personal portfolio demos. No client work or production outcomes are claimed.</p></div>
        </section>

        <section className="proof-rail" aria-label="Technical portfolio evidence">
          <div><strong>2+ years</strong><span>freelance digital workflow delivery</span></div>
          <div><strong>3 demos</strong><span>interactive systems in the portfolio</span></div>
          <div><strong>3 tests</strong><span>automated checks in ClearRoute API</span></div>
          <a href="https://github.com/Amyvdev1" target="_blank" rel="noreferrer">Public GitHub <ArrowUpRight size={15} /></a>
        </section>

        <section id="work" className="work-section">
          <div className="section-head">
            <div>
              <p className="eyebrow"><span /> Selected independent work</p>
              <h2>Three systems.<br /><i>One point of view.</i></h2>
            </div>
            <p>Each project is intentionally scoped to show a product decision, a working interface, and the system thinking behind it.</p>
          </div>
          <div className="project-list">
            {projects.map((project) => (
              <Link key={project.slug} href={`/projects/${project.slug}`} className={`project-card ${project.accent}`}>
                <div className="project-card-top"><span>{project.number}</span><span className="status-dot">Personal demo</span></div>
                <div className="project-visual" aria-hidden="true">
                  <span className="visual-orb orb-one" /><span className="visual-orb orb-two" /><span className="visual-line line-one" /><span className="visual-line line-two" />
                  <span className="visual-panel panel-a" /><span className="visual-panel panel-b" /><span className="visual-panel panel-c" />
                </div>
                <div className="project-card-body">
                  <p>{project.label}</p>
                  <h3>{project.title} <ArrowUpRight size={21} /></h3>
                  <p className="project-description">{project.description}</p>
                  <div className="chips">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
                </div>
                <div className="project-footer"><span>{project.outcome}</span><span>View project →</span></div>
              </Link>
            ))}
          </div>
        </section>

        <section id="approach" className="approach-section">
          <div className="approach-image" />
          <div className="approach-copy">
            <p className="eyebrow"><span /> How I work</p>
            <h2>Build the system,<br /><i>not just the screen.</i></h2>
            <p>Good software makes an important decision easy to understand. My work starts with the user&apos;s next action and follows the work through its handoff, guardrails, and feedback loop.</p>
            <div className="capability-grid">
              {capabilities.map(({ icon: Icon, title, text }) => (
                <article key={title}>
                  <Icon size={18} strokeWidth={1.6} />
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="evidence-section">
          <div className="evidence-mark"><span>AV</span><i /></div>
          <div>
            <p className="eyebrow"><span /> Builder profile</p>
            <h2>Build with intent.<br /><i>Ship with clarity.</i></h2>
            <p>Systems-minded developer building public technical evidence while pursuing opportunities in software development, automation, implementation, and technical operations.</p>
          </div>
          <div className="evidence-checks">
            <p><CheckCircle2 size={17} /> Independent demos clearly labeled</p>
            <p><CheckCircle2 size={17} /> Public code sample and automated tests</p>
            <p><CheckCircle2 size={17} /> U.S. work authorized; no sponsorship required</p>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div>
            <p className="eyebrow"><span /> Contact</p>
            <h2>Bring the unfinished<br /><i>problem.</i></h2>
          </div>
          <div className="contact-right">
            <p>I&apos;m open to opportunities in software development, AI automation, technical operations, and implementation.</p>
            <a className="contact-email" href="mailto:amyv.dev@gmail.com">amyv.dev@gmail.com <ArrowUpRight size={20} /></a>
            <a className="contact-linkedin" href="https://www.linkedin.com/in/amy-villa-5830aa433/" target="_blank" rel="noreferrer">LinkedIn profile <ArrowUpRight size={15} /></a>
          </div>
        </section>
      </main>

      <footer><span>© 2026 Amy Villa</span><span>Miami, Florida · Native English & Spanish</span><span>Designed as a personal portfolio</span></footer>
    </div>
  );
}
