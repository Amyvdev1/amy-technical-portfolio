import { candidateProfile, publicProjectEvidence } from "@/lib/productEvidence";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Check, ChevronDown, Github, Mail, MoveRight, Orbit, Sparkles } from "lucide-react";
import { Link } from "wouter";

const scenes = [
  {
    id: "01",
    label: "Signal intake",
    title: "Listen for the\nright question.",
    emphasis: "before the interface.",
    detail: "Every useful build starts by locating the real decision, the people affected, and the information that cannot be lost.",
    telemetry: ["INPUT / HUMAN", "CONTEXT / CAPTURED", "MODE / DISCOVERY"],
    short: "READ",
  },
  {
    id: "02",
    label: "System design",
    title: "Turn moving pieces\ninto a clear path.",
    emphasis: "with structure.",
    detail: "Interfaces, roles, states, and next actions become visible so a team can move without guessing what matters next.",
    telemetry: ["STATE / VISIBLE", "ROLES / MAPPED", "MODE / SYSTEM"],
    short: "SHAPE",
  },
  {
    id: "03",
    label: "Human guardrail",
    title: "Let automation carry\nthe repeatable work.",
    emphasis: "not the judgment.",
    detail: "AI-assisted workflows should reduce friction while keeping the moments that need human context, review, or care in view.",
    telemetry: ["AI / ASSISTED", "REVIEW / ACTIVE", "MODE / GUARDED"],
    short: "STEER",
  },
  {
    id: "04",
    label: "Confident handoff",
    title: "Make the next move\nobvious.",
    emphasis: "for the next person.",
    detail: "The work is complete when the result is understandable, testable, and ready to continue without rebuilding its context from zero.",
    telemetry: ["OUTPUT / READY", "HANDOFF / CLEAR", "MODE / DELIVERED"],
    short: "MOVE",
  },
];

const projects = [
  ...publicProjectEvidence.map((project) => ({
    id: project.index,
    kind: project.type,
    name: project.name,
    description: project.detail,
    stack: project.stack,
    href: `/projects/${project.slug}`,
    code: "PUBLIC CODE SAMPLE",
  })),
  {
    id: "04",
    kind: "WORKFLOW SURFACE",
    name: "RelayOps",
    description: "A focused interactive study for making task ownership, approval moments, and state changes easy to understand.",
    stack: "React · TypeScript · Workflow design",
    href: "/projects/relayops",
    code: "INTERACTIVE STUDY",
  },
];

function useScrollProgress(reference: React.RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const node = reference.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const range = Math.max(node.offsetHeight - window.innerHeight, 1);
      setProgress(Math.max(0, Math.min(1, -rect.top / range)));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [reference]);

  return progress;
}

export default function Home() {
  const shellRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLElement>(null);
  const [booting, setBooting] = useState(true);
  const [coreEngaged, setCoreEngaged] = useState(false);
  const progress = useScrollProgress(storyRef);
  const activeScene = Math.min(scenes.length - 1, Math.floor(progress * scenes.length));
  const scene = scenes[activeScene];
  const progressPercent = Math.round(progress * 100);

  const runtime = useMemo(() => ({
    journey: `${String(activeScene + 1).padStart(2, "0")} / ${String(scenes.length).padStart(2, "0")}`,
    coordinates: `${String(25 + activeScene * 13).padStart(3, "0")}.${String(76 - activeScene * 8).padStart(2, "0")}`,
  }), [activeScene]);

  useEffect(() => {
    const timer = window.setTimeout(() => setBooting(false), 1650);
    const root = shellRef.current;
    const setPointer = (event: PointerEvent) => {
      if (!root || event.pointerType === "touch") return;
      root.style.setProperty("--engine-x", `${(event.clientX / window.innerWidth) * 100}%`);
      root.style.setProperty("--engine-y", `${(event.clientY / window.innerHeight) * 100}%`);
      root.style.setProperty("--engine-drift-x", `${((event.clientX / window.innerWidth) - 0.5) * 2}`);
      root.style.setProperty("--engine-drift-y", `${((event.clientY / window.innerHeight) - 0.5) * 2}`);
    };
    window.addEventListener("pointermove", setPointer, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("pointermove", setPointer);
    };
  }, []);

  useEffect(() => {
    const root = shellRef.current;
    if (!root) return;
    root.style.setProperty("--signal-progress", `${progress}`);
    root.style.setProperty("--signal-scene", `${activeScene + 1}`);
  }, [activeScene, progress]);

  const jumpToScene = (index: number) => {
    const story = storyRef.current;
    if (!story) return;
    const range = Math.max(story.offsetHeight - window.innerHeight, 1);
    const destination = story.offsetTop + range * ((index + 0.04) / scenes.length);
    window.scrollTo({ top: destination, behavior: "smooth" });
  };

  const activateCore = () => {
    setCoreEngaged(true);
    window.setTimeout(() => setCoreEngaged(false), 1150);
  };

  return (
    <div ref={shellRef} className={`engine-experience scene-${activeScene + 1} ${coreEngaged ? "core-engaged" : ""} ${booting ? "engine-booting" : "engine-live"}`}>
      <div className="engine-preloader" aria-hidden="true">
        <div className="preloader-mark"><span>AV</span><i /><i /></div>
        <div className="preloader-copy"><span>INITIALIZING SIGNAL ENGINE</span><b>100%</b><i /></div>
      </div>

      <header className="engine-header">
        <a href="#top" className="engine-brand" aria-label="Amy Villa homepage"><span>AV</span><b>Amy Villa</b><em>product systems</em></a>
        <div className="engine-header-center"><i /><span>PRODUCT ENGINEERING PORTFOLIO / 2026</span><i /></div>
        <div className="engine-header-actions"><Link href="/recruiter-proof" className="engine-proof-link">RECRUITER PROOF</Link><a href="mailto:amyv.dev@gmail.com" className="engine-contact">START A CONVERSATION <ArrowUpRight size={15} /></a></div>
      </header>

      <main id="top">
        <section ref={storyRef} className="signal-engine-story" aria-label="Signal Engine scroll experience">
          <div className="signal-engine-sticky">
            <div className="engine-visual" aria-hidden="true">
              <div className="engine-image" />
              <div className="engine-vignette" />
              <div className="engine-grid" />
              <div className="engine-radar" />
              <div className="engine-beam beam-one" /><div className="engine-beam beam-two" />
              <button className="engine-core-rings" type="button" onClick={activateCore} aria-label="Activate the Signal Engine core"><i /><i /><i /><i /><b /></button>
              <div className="engine-scan-line" />
              <div className="engine-lens" />
              <div className="engine-noise" />
            </div>

            <aside className="engine-hud hud-left" aria-hidden="true">
              <div className="hud-unit"><span>AMY VILLA</span><b>AV / 01</b></div>
              <div className="hud-rule" />
              <div className="hud-stack"><span>SCENE</span><b>{runtime.journey}</b><span>AXIS</span><b>{runtime.coordinates}</b></div>
              <div className="hud-vertical">SIGNAL ENGINE · PRODUCT SYSTEMS</div>
            </aside>

            <div className="engine-topline" aria-hidden="true"><span>LIVE SIGNAL</span><i /><b>{scene.label.toUpperCase()}</b><span>SCROLL TO SCRUB</span></div>

            <section className="engine-scene-copy" aria-live="polite">
              <div className="scene-message" key={scene.id}>
                <div className="scene-count"><span>{scene.id}</span><i /><small>{scene.label}</small></div>
                <h1>{scene.title.split("\n").map((line) => <span key={line}>{line}</span>)}<em>{scene.emphasis}</em></h1>
                <p>{scene.detail}</p>
                <div className="scene-tags">{scene.telemetry.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </div>
            </section>

            <div className="engine-telemetry" aria-label="Live project telemetry">
              <div className="telemetry-row"><span>CORE STATE</span><b>{scene.short}</b></div>
              <div className="telemetry-row"><span>SCROLL DATA</span><b>{String(progressPercent).padStart(3, "0")}%</b></div>
              <div className="telemetry-pulse"><i /><span>SYSTEM / RESPONSIVE</span></div>
            </div>

            <nav className="engine-chapter-nav" aria-label="Signal Engine chapters">
              {scenes.map((item, index) => <button type="button" key={item.id} className={index === activeScene ? "active" : ""} onClick={() => jumpToScene(index)} aria-label={`Go to scene ${item.id}: ${item.label}`}><span>{item.id}</span><b>{item.short}</b></button>)}
            </nav>

            <div className="engine-scroll-note"><span>SCROLL TO ADVANCE</span><ChevronDown size={16} /><span>{String(progressPercent).padStart(3, "0")}</span></div>
          </div>
        </section>

        <section className="signal-manifesto">
          <div className="manifesto-marquee" aria-hidden="true"><div><span>FROM AMBIGUITY TO SIGNAL</span><i>✦</i><span>FROM AMBIGUITY TO SIGNAL</span><i>✦</i><span>FROM AMBIGUITY TO SIGNAL</span></div></div>
          <div className="manifesto-visual"><img src="https://cdn.jsdelivr.net/gh/Amyvdev1/amy-villa-portfolio-assets@main/public-assets/signal-engine-interface.jpg" alt="" /><div className="manifesto-reticle"><i /><i /><i /><b>AV</b></div></div>
          <div className="manifesto-copy">
            <p className="engine-eyebrow"><i /> WHAT THIS WORK IS ABOUT</p>
            <h2>Built for the moment<br />a team needs to <em>move.</em></h2>
            <p>I build product engineering studies around a simple belief: a useful interface should make system state, failure behavior, and the next action understandable without forcing the user to reconstruct the context.</p>
            <div className="manifesto-signature"><span>01</span><p>Product judgment<br />made inspectable.</p><MoveRight size={21} /></div>
          </div>
        </section>

        <section id="work" className="systems-deck">
          <div className="deck-topbar"><p><i /> INSPECTABLE TECHNICAL WORK</p><span>04 INDEPENDENT STUDIES</span></div>
          <div className="deck-heading"><h2>Work that makes<br /><em>the signal useful.</em></h2><p>Begin with ForgeFlow for an inspectable full-stack product sample, then follow the API and accessibility studies. Shared typed evidence keeps this catalog aligned with the recruiter review path.</p></div>
          <div className="system-cards">
            {projects.map((project, index) => (
              <Link href={project.href} className={`system-card card-${index + 1}`} key={project.name}>
                <div className="card-top"><span>EXHIBIT / {project.id}</span><i><b /></i><span>{project.code}</span></div>
                <div className="card-field" aria-hidden="true"><div className="card-field-grid" /><i /><i /><i /><b><span>{project.id}</span></b><div className="card-coordinates">SYS.{project.id}<br />READY</div></div>
                <div className="card-copy"><p>{project.kind}</p><h3>{project.name}<ArrowUpRight size={21} /></h3><span>{project.description}</span></div>
                <div className="card-bottom"><span>{project.stack}</span><b>OPEN STUDY <MoveRight size={16} /></b></div>
              </Link>
            ))}
          </div>
        </section>

        <section className="panther-protocol">
          <div className="protocol-noise" aria-hidden="true" />
          <div className="protocol-copy"><p className="engine-eyebrow"><i /> THE PANTHER PROTOCOL</p><h2>Move with precision.<br /><em>Not just speed.</em></h2><p>A product is strongest when it can respond without losing its place. That means clear state, intentional guardrails, and a visible path forward.</p><div className="protocol-list"><span><Check size={15} /> Human judgment remains visible</span><span><Check size={15} /> Ownership stays clear</span><span><Check size={15} /> Systems communicate their next move</span></div></div>
          <div className="protocol-visual" aria-hidden="true"><div className="protocol-grid" /><div className="protocol-target"><i /><i /><i /><b /></div><img src="https://cdn.jsdelivr.net/gh/Amyvdev1/amy-villa-portfolio-assets@main/public-assets/nocturne-panther-hunt.png" alt="" /><span>TRACKING / SYSTEM INTENT</span></div>
        </section>

        <section className="capability-matrix">
          <div className="matrix-sidebar"><p>OPERATING<br />CAPABILITIES</p><span>02 / 02</span></div>
          <div className="matrix-main"><div className="matrix-heading"><p className="engine-eyebrow"><i /> THE BUILD LAYER</p><h2>Capability is more<br />than a <em>tool list.</em></h2></div><div className="matrix-grid"><article><span>01</span><h3>Product surfaces</h3><p>Responsive React and TypeScript interfaces that make a complicated next move easier to understand.</p></article><article><span>02</span><h3>Workflow logic</h3><p>Ownership, state, review points, and handoffs designed into the product instead of added after.</p></article><article><span>03</span><h3>API foundations</h3><p>Structured validation, explicit contracts, traceable events, and dependable system boundaries.</p></article><article><span>04</span><h3>Failure & recovery</h3><p>Fallback state, validation feedback, and recovery paths designed so users can understand what happened and what to do next.</p></article><article><span>05</span><h3>Quality signals</h3><p>Testable flows, documented boundaries, and details built for confident collaboration.</p></article><article><span>06</span><h3>Bilingual delivery</h3><p>Native English and Spanish communication in technical, operational, and customer-facing settings.</p></article></div></div>
        </section>

        <section id="contact" className="engine-outro">
          <div className="outro-orbit" aria-hidden="true"><i /><i /><i /><b>AV</b></div>
          <div className="outro-copy"><p className="engine-eyebrow"><i /> OPEN TO OPPORTUNITIES</p><h2>Let&apos;s build the<br /><em>next clear move.</em></h2><p>Open to product engineering, developer experience, frontend, and full-stack product roles where interface craft and system behavior both matter.</p><div className="outro-actions"><a href="mailto:amyv.dev@gmail.com">amyv.dev@gmail.com <ArrowUpRight size={18} /></a><Link href="/recruiter-proof">Recruiter Fast Path <ArrowUpRight size={16} /></Link></div></div>
          <div className="outro-meta"><span>{candidateProfile.location.toUpperCase()}</span><span>US WORK AUTHORIZED</span><span>NATIVE ENGLISH / SPANISH</span><a href="https://github.com/Amyvdev1" target="_blank" rel="noreferrer"><Github size={15} /> PUBLIC GITHUB</a></div>
        </section>
      </main>

      <footer className="engine-footer"><span>© 2026 AMY VILLA</span><span>PRODUCT ENGINEERING / PERSONAL PORTFOLIO</span><a href="mailto:amyv.dev@gmail.com"><Mail size={13} /> CONTACT</a></footer>
    </div>
  );
}
