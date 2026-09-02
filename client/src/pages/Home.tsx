import { useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";
import { ArrowDownRight, ArrowUpRight, CheckCircle2, Code2, Compass, Database, GitBranch, Layers3, Orbit, ShieldCheck, Sparkles } from "lucide-react";
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
  { icon: Code2, title: "Product surfaces", text: "Responsive React and TypeScript interfaces that turn complex work into an understandable next move." },
  { icon: GitBranch, title: "Workflow logic", text: "Ownership, state, approvals, and handoffs are designed into the product—not added after." },
  { icon: Database, title: "API foundations", text: "Structured validation, explicit data contracts, traceability, and dependable system boundaries." },
  { icon: Sparkles, title: "AI with guardrails", text: "Practical automations and prompt-driven work designed around review, clarity, and control." },
  { icon: ShieldCheck, title: "Quality signals", text: "Testable flows, documented boundaries, and interfaces built for confident collaboration." },
  { icon: Layers3, title: "Bilingual delivery", text: "Native English and Spanish communication across technical, operational, and customer-facing work." },
];

const galleryChapters = [
  { number: "01", label: "Context", title: "Listen before you build.", detail: "A request is never just a list of features. It contains priorities, people, constraints, and a decision that needs to become visible.", note: "Read the signal." },
  { number: "02", label: "System", title: "Give work a place to live.", detail: "Roles, state, and the next action should be easy to find. A useful interface turns operational noise into a path someone can follow.", note: "Shape the system." },
  { number: "03", label: "Guardrails", title: "Keep judgment in the loop.", detail: "The best automation removes repetitive work without erasing the moments where human context changes the outcome.", note: "Place the guardrail." },
  { number: "04", label: "Handoff", title: "Make the next move obvious.", detail: "The work is not finished when a screen is designed. It is finished when the next person can act with confidence and context.", note: "Deliver the handoff." },
];

export default function Home() {
  const shellRef = useRef<HTMLDivElement>(null);
  const corridorRef = useRef<HTMLElement>(null);
  const huntTimerRef = useRef<number | null>(null);
  const huntStartedRef = useRef(false);
  const [booting, setBooting] = useState(true);
  const [activeChapter, setActiveChapter] = useState(0);
  const [huntStage, setHuntStage] = useState<"waiting" | "tracking" | "revealed">("waiting");

  useEffect(() => {
    const timer = window.setTimeout(() => setBooting(false), 1450);
    const root = shellRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) setHuntStage("revealed");

    const setPointer = (event: PointerEvent) => {
      if (!root || reduceMotion || event.pointerType === "touch") return;
      root.style.setProperty("--mouse-x", `${(event.clientX / window.innerWidth) * 100}%`);
      root.style.setProperty("--mouse-y", `${(event.clientY / window.innerHeight) * 100}%`);
      root.style.setProperty("--tilt-x", `${((event.clientY / window.innerHeight) - 0.5) * -1}`);
      root.style.setProperty("--tilt-y", `${((event.clientX / window.innerWidth) - 0.5)}`);
    };

    const setScroll = () => {
      if (!root) return;
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      root.style.setProperty("--scroll-shift", `${Math.min(window.scrollY, 1600) * 0.05}px`);
      root.style.setProperty("--scroll-progress", `${Math.min((window.scrollY / maxScroll) * 100, 100)}%`);
    };
    setScroll();
    window.addEventListener("pointermove", setPointer, { passive: true });
    window.addEventListener("scroll", setScroll, { passive: true });
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );
    document.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("pointermove", setPointer);
      window.removeEventListener("scroll", setScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    return () => {
      if (huntTimerRef.current) window.clearTimeout(huntTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const updateChapter = () => {
      const corridor = corridorRef.current;
      if (!corridor) return;
      const rect = corridor.getBoundingClientRect();
      const travel = Math.max(corridor.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(-rect.top / travel, 0), 0.9999);
      setActiveChapter(Math.min(galleryChapters.length - 1, Math.floor(progress * galleryChapters.length)));
    };
    updateChapter();
    window.addEventListener("scroll", updateChapter, { passive: true });
    window.addEventListener("resize", updateChapter);
    return () => {
      window.removeEventListener("scroll", updateChapter);
      window.removeEventListener("resize", updateChapter);
    };
  }, []);

  const tiltCard = (event: ReactPointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType === "touch") return;
    const card = event.currentTarget;
    const bounds = card.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    card.style.setProperty("--card-rotate-x", `${-y * 4}deg`);
    card.style.setProperty("--card-rotate-y", `${x * 5}deg`);
    card.style.setProperty("--glow-x", `${((event.clientX - bounds.left) / bounds.width) * 100}%`);
    card.style.setProperty("--glow-y", `${((event.clientY - bounds.top) / bounds.height) * 100}%`);
  };

  const resetCard = (event: ReactPointerEvent<HTMLAnchorElement>) => {
    event.currentTarget.style.setProperty("--card-rotate-x", "0deg");
    event.currentTarget.style.setProperty("--card-rotate-y", "0deg");
  };

  const releaseGallery = () => {
    if (huntStage === "revealed") {
      document.getElementById("work")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    if (huntStartedRef.current) return;
    huntStartedRef.current = true;
    setHuntStage("tracking");
    huntTimerRef.current = window.setTimeout(() => {
      setHuntStage("revealed");
      window.setTimeout(() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth", block: "start" }), 420);
    }, 2200);
  };

  const trackPanther = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = Math.min(Math.max(((event.clientX - bounds.left) / bounds.width) * 100, 5), 95);
    const y = Math.min(Math.max(((event.clientY - bounds.top) / bounds.height) * 100, 13), 88);
    event.currentTarget.style.setProperty("--hunt-x", `${x}%`);
    event.currentTarget.style.setProperty("--hunt-y", `${y}%`);
    event.currentTarget.style.setProperty("--panther-x", `${Math.max(x, 62)}%`);
    releaseGallery();
  };

  return (
    <div ref={shellRef} className={`portfolio-shell signal-architecture nocturne-gallery ${booting ? "is-booting" : "is-live"}`}>
      <div className="signal-loader" aria-hidden="true">
        <div className="loader-core"><span>AV</span><i /></div>
        <div className="loader-copy"><p>INITIALIZING / SIGNAL ARCHITECTURE</p><div><span /><b>100%</b></div></div>
      </div>
      <div className="gallery-curtain curtain-left" aria-hidden="true" />
      <div className="gallery-curtain curtain-right" aria-hidden="true" />
      <div className="signal-cursor" aria-hidden="true" />
      <div className="signal-noise" aria-hidden="true" />
      <div className="scroll-index" aria-hidden="true"><span>01</span><i><b /></i><span>06</span></div>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Amy Villa home">
          <span className="brand-mark">AV</span>
          <span>Amy Villa <em>— the nocturne gallery</em></span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#gallery">The gallery</a>
          <a href="/signal-lab">Signal Lab</a>
          <a href="#approach">Method</a>
          <a href="#evidence">Evidence</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="header-link" href="mailto:amyv.dev@gmail.com">Start a conversation <ArrowUpRight size={15} /></a>
      </header>

      <main id="top">
        <section className="hero signal-hero">
          <div className="hero-image" />
          <div className="hero-grid" />
          <div className="hero-beam" aria-hidden="true" />
          <div className="hero-frame frame-one" aria-hidden="true" /><div className="hero-frame frame-two" aria-hidden="true" />
          <div className="signal-sphere" aria-hidden="true"><i /><i /><i /></div>
          <div className="signal-orbit" aria-hidden="true"><Orbit size={21} /><span>signal / 01</span></div>
          <div className="hero-content" data-reveal>
            <p className="eyebrow"><span /> The Nocturne Gallery · Miami / Remote</p>
            <h1 aria-label="Where systems become clear."><span>Where</span><span>systems</span><span>become <i>clear.</i></span></h1>
            <p className="hero-copy">A portfolio of product surfaces, workflow systems, and practical automation foundations—made for teams that want to move from a fuzzy request to a confident next move.</p>
            <div className="hero-signal-row" aria-label="Core specialties">
              <span>React · TypeScript</span><span>Python · FastAPI</span><span>AI workflows</span>
            </div>
            <div className="hero-actions">
              <a className="button-primary" href="#gallery">Enter the gallery <ArrowDownRight size={17} /></a>
              <a className="hero-lab-link" href="/signal-lab"><Sparkles size={14} /> Try Signal Lab</a>
              <a className="button-quiet" href="mailto:amyv.dev@gmail.com">amyv.dev@gmail.com <ArrowUpRight size={15} /></a>
            </div>
          </div>
          <div className="hero-note hero-telemetry" data-reveal>
            <span>CURATOR’S NOTE</span>
            <p>Each piece is a public study in clarity: how work becomes visible, reviewable, and ready for the next person.</p>
            <div><b>US</b><small>work authorized</small><b>EN / ES</b><small>native communication</small></div>
          </div>
          <a className="scroll-pulse" href="#gallery"><span /><small>Scroll to discover</small></a>
        </section>

        <section className="proof-rail" aria-label="Technical portfolio evidence" data-reveal>
          <div><strong>2+ years</strong><span>freelance workflow delivery</span></div>
          <div><strong>3 demos</strong><span>interactive product systems</span></div>
          <div><strong>3 tests</strong><span>automated API checks</span></div>
          <a href="https://github.com/Amyvdev1" target="_blank" rel="noreferrer">Inspect public GitHub <ArrowUpRight size={15} /></a>
        </section>

        <section ref={corridorRef} id="gallery" className="gallery-corridor" aria-label="A guided product-thinking gallery">
          <div className={`gallery-stage stage-${activeChapter + 1}`}>
            <div className="corridor-backdrop" aria-hidden="true"><i className="corridor-sweep" /><i className="corridor-arch arch-a" /><i className="corridor-arch arch-b" /><i className="corridor-arch arch-c" /><i className="corridor-signal" /></div>
            <div className="corridor-meta"><span>THE NOCTURNE GALLERY</span><span>CHAPTER {galleryChapters[activeChapter].number} / 04</span></div>
            <div className="corridor-progress" aria-hidden="true">{galleryChapters.map((chapter, index) => <span key={chapter.number} className={index <= activeChapter ? "is-past" : ""}>{chapter.number}</span>)}</div>
            <div className="chapter-stack">
              {galleryChapters.map((chapter, index) => (
                <article key={chapter.number} className={index === activeChapter ? "chapter-card is-active" : "chapter-card"} aria-hidden={index !== activeChapter}>
                  <p><span>{chapter.number}</span> {chapter.label}</p>
                  <h2>{chapter.title}</h2>
                  <div className="chapter-rule" />
                  <p className="chapter-detail">{chapter.detail}</p>
                  <small>{chapter.note}</small>
                </article>
              ))}
            </div>
            <div className="corridor-side-note"><span>SCROLL TO WALK THE ROOM</span><i /><span>CONTEXT / SYSTEM / GUARDRAILS / HANDOFF</span></div>
            <div className="corridor-signature"><span>AV</span><p>Independent work,<br />intentionally made.</p></div>
          </div>
        </section>

        <div className="gallery-ticker" aria-label="Portfolio themes"><div><span>Clarity at the handoff</span><i>✦</i><span>Useful systems</span><i>✦</i><span>Human judgment stays visible</span><i>✦</i><span>Independent work, honestly labeled</span><i>✦</i><span>Clarity at the handoff</span><i>✦</i><span>Useful systems</span><i>✦</i></div></div>

        <section
          id="hunt"
          className={`panther-hunt hunt-${huntStage}`}
          aria-label="An interactive invitation to enter the project gallery"
          onPointerMove={trackPanther}
          onPointerDown={releaseGallery}
          style={{ "--hunt-x": "76%", "--hunt-y": "48%", "--panther-x": "76%" } as CSSProperties}
        >
          <div className="hunt-field" aria-hidden="true"><i /><i /><i /><b /></div>
          <div className="hunt-copy">
            <p className="eyebrow"><span /> The curator&apos;s companion</p>
            <h2>Follow the<br /><i>signal.</i></h2>
            <p>Move through the room. Nocturne&apos;s panther reads your cursor as a living point of light—and unlocks the work when it reaches it.</p>
            <button type="button" onClick={releaseGallery} className="hunt-button">
              {huntStage === "waiting" ? "Begin the hunt" : huntStage === "tracking" ? "Signal acquired" : "Enter the exhibits"}
              <ArrowDownRight size={17} />
            </button>
          </div>
          <div className="hunt-stage" aria-hidden="true">
            <div className="hunt-target"><img src="https://raw.githubusercontent.com/Amyvdev1/amy-technical-portfolio/main/public-assets/nocturne-panther-crest.png" alt="" /><span>cursor signal</span></div>
            <div className="hunt-path"><i /><i /><i /><i /></div>
            <img className="hunt-panther" src="https://raw.githubusercontent.com/Amyvdev1/amy-technical-portfolio/main/public-assets/nocturne-panther-hunt.png" alt="" />
            <div className="hunt-flash" />
          </div>
          <p className="hunt-status" aria-live="polite"><span>{huntStage === "waiting" ? "01" : huntStage === "tracking" ? "02" : "03"}</span>{huntStage === "waiting" ? "Move the cursor to begin" : huntStage === "tracking" ? "Nocturne is tracking the signal" : "The exhibits are ready"}</p>
        </section>

        <section id="work" className={`work-section ${huntStage === "revealed" ? "is-revealed" : ""}`}>
          <div className="section-head" data-reveal>
            <div>
              <p className="eyebrow"><span /> Selected independent work</p>
              <h2>A gallery of<br /><i>useful systems.</i></h2>
            </div>
            <p>Each piece frames a product question, an intentional interface, and an honest boundary around what the independent demo proves.</p>
          </div>
          <div className="project-list">
            {projects.map((project, index) => (
              <Link key={project.slug} href={`/projects/${project.slug}`} className={`project-card ${project.accent} ${huntStage === "revealed" ? "is-visible" : ""}`} data-reveal onPointerMove={tiltCard} onPointerLeave={resetCard} style={{ "--reveal-delay": `${index * 85}ms` } as CSSProperties}>
                <div className="project-card-top"><span>EXHIBIT / {project.number}</span><span className="status-dot">Independent demo</span></div>
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
                <div className="project-footer"><span>{project.outcome}</span><span>Open case study →</span></div>
              </Link>
            ))}
          </div>
        </section>

        <section id="approach" className="approach-section signal-method">
          <div className="approach-image" data-reveal>
            <div className="signal-illustration" aria-hidden="true"><i /><i /><i /><i /></div>
            <div className="method-badge"><Compass size={16} /> From ambiguity to signal</div><span className="image-scan" />
          </div>
          <div className="approach-copy" data-reveal>
            <p className="eyebrow"><span /> Behind the canvas</p>
            <h2>Design the decision,<br /><i>not just the screen.</i></h2>
            <p>A useful product does more than look polished. It makes responsibility, context, guardrails, and the next action easy to find—so the work can move without losing human judgment.</p>
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

        <section id="evidence" className="evidence-section" data-reveal>
          <span className="evidence-orb-landing" aria-hidden="true" />
          <div className="evidence-mark"><span>AV</span><i /></div>
          <div>
            <p className="eyebrow"><span /> The proof layer</p>
            <h2>Proof belongs<br /><i>in the margins.</i></h2>
            <p>Every project here is labeled honestly. The work shows how I think about interfaces, API contracts, state, validation, review points, and the human side of an operational system.</p>
          </div>
          <div className="evidence-checks">
            <p><CheckCircle2 size={17} /> Independent demos clearly labeled</p>
            <p><CheckCircle2 size={17} /> Public code sample and automated tests</p>
            <p><CheckCircle2 size={17} /> Native English and Spanish delivery</p>
          </div>
        </section>

        <section id="contact" className="contact-section" data-reveal>
          <div>
            <p className="eyebrow"><span /> Contact</p>
            <h2>The next useful<br /><i>signal starts here.</i></h2>
          </div>
          <div className="contact-right">
            <p>Open to software development, AI automation, technical operations, implementation, and product-supporting opportunities.</p>
            <a className="contact-email" href="mailto:amyv.dev@gmail.com">amyv.dev@gmail.com <ArrowUpRight size={20} /></a>
            <a className="contact-linkedin" href="https://www.linkedin.com/in/amy-villa-5830aa433/" target="_blank" rel="noreferrer">LinkedIn profile <ArrowUpRight size={15} /></a>
          </div>
        </section>
      </main>

      <footer><span>© 2026 Amy Villa</span><span>Miami, Florida · Native English & Spanish</span><span>The Nocturne Gallery / personal portfolio</span></footer>
    </div>
  );
}
