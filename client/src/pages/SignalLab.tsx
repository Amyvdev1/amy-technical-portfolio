import { useEffect, useState } from "react";
import { ArrowLeft, ArrowUpRight, BrainCircuit, CheckCircle2, ChevronRight, CircleDot, LockKeyhole, Mail, Play, RotateCcw, ShieldCheck, SlidersHorizontal, Sparkles, Terminal } from "lucide-react";
import { Link } from "wouter";

const scenarios = [
  { id: "intake", code: "01", name: "Client intake", description: "Turn a scattered request into a structured, reviewable handoff.", signal: "Context → action" },
  { id: "approval", code: "02", name: "Approval flow", description: "Make decision points, ownership, and exceptions explicit.", signal: "State → confidence" },
  { id: "followup", code: "03", name: "Follow-up system", description: "Keep the right next action visible without losing the human context.", signal: "Timing → momentum" },
];

const stages = [
  { name: "Read the signal", detail: "Extract context, constraints, and the actual decision.", icon: BrainCircuit },
  { name: "Shape the system", detail: "Turn ambiguity into roles, actions, and visible state.", icon: SlidersHorizontal },
  { name: "Place the guardrail", detail: "Add review moments where judgment should stay human.", icon: LockKeyhole },
  { name: "Deliver the handoff", detail: "Make the next person’s action clear, traceable, and calm.", icon: ShieldCheck },
];

export default function SignalLab() {
  const [scenario, setScenario] = useState(scenarios[0]);
  const [running, setRunning] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    if (!running) return;
    const interval = window.setInterval(() => {
      setActiveStep((current) => {
        if (current >= stages.length - 1) {
          window.clearInterval(interval);
          window.setTimeout(() => setRunning(false), 720);
          return current;
        }
        return current + 1;
      });
    }, 610);
    return () => window.clearInterval(interval);
  }, [running]);

  const runSystem = () => {
    setActiveStep(0);
    setRunning(true);
  };

  const resetSystem = () => {
    setRunning(false);
    setActiveStep(-1);
  };

  return (
    <div className="lab-shell nocturne-lab">
      <div className="lab-ambient ambient-one" aria-hidden="true" /><div className="lab-ambient ambient-two" aria-hidden="true" />
      <header className="lab-header">
        <Link href="/" className="lab-back"><ArrowLeft size={15} /> Back to portfolio</Link>
        <div className="lab-title"><span>AV</span> Signal Lab <i>/ nocturne gallery</i></div>
        <a href="mailto:amyv.dev@gmail.com" className="lab-mail"><Mail size={14} /> Contact Amy</a>
      </header>

      <main className="lab-main">
        <section className="lab-intro">
          <div>
            <p className="lab-eyebrow"><CircleDot size={12} /> An interactive product-thinking demonstration</p>
            <h1>Move from noise<br />to a <i>useful signal.</i></h1>
          </div>
          <p>This is not a claim about production software. It is a small working concept that shows how I approach a messy operational problem: understand the signal, make the system legible, preserve judgment, and create a better handoff.</p>
        </section>

        <section className="lab-console" aria-label="Interactive workflow demonstration">
          <aside className="scenario-rail">
            <p>SELECT A WORKFLOW</p>
            {scenarios.map((item) => (
              <button key={item.id} onClick={() => { setScenario(item); resetSystem(); }} className={scenario.id === item.id ? "scenario-choice selected" : "scenario-choice"}>
                <span>{item.code}</span><strong>{item.name}</strong><small>{item.signal}</small>
              </button>
            ))}
            <div className="rail-foot"><Sparkles size={14} /> Concept demonstrator<br /><span>Designed and built independently</span></div>
          </aside>

          <div className="lab-canvas">
            <div className="canvas-topbar"><span><Terminal size={14} /> SIGNAL / WORKFLOW ENGINE</span><span className={running ? "run-state running" : "run-state"}>{running ? "PROCESSING" : activeStep === stages.length - 1 ? "READY" : "STANDBY"}</span></div>
            <div className="scenario-brief">
              <div><p>ACTIVE PROMPT / {scenario.code}</p><h2>{scenario.name}</h2></div>
              <p>{scenario.description}</p>
            </div>
            <div className="flow-path">
              {stages.map((stage, index) => {
                const Icon = stage.icon;
                const state = index < activeStep ? "complete" : index === activeStep ? "active" : "";
                return (
                  <div key={stage.name} className={`flow-step ${state}`}>
                    <div className="flow-node"><Icon size={19} /><span>{String(index + 1).padStart(2, "0")}</span></div>
                    <div><h3>{stage.name}</h3><p>{stage.detail}</p></div>
                    {index !== stages.length - 1 && <i className="flow-connector"><b /></i>}
                  </div>
                );
              })}
            </div>
            <div className="flow-actions">
              <button className="run-button" onClick={runSystem} disabled={running}><Play size={15} fill="currentColor" /> {running ? "Running the system" : "Run the system"}</button>
              <button className="reset-button" onClick={resetSystem}><RotateCcw size={14} /> Reset</button>
              <div className="outcome-chip"><CheckCircle2 size={14} /> {activeStep === stages.length - 1 ? "Handoff prepared" : "Human review stays in the loop"}</div>
            </div>
          </div>
        </section>

        <section className="lab-principles">
          <div className="portrait-panel"><img src="https://cdn.jsdelivr.net/gh/Amyvdev1/amy-villa-portfolio-assets@main/public-assets/amy-operator-portrait.png" alt="Amy Villa" /><div className="portrait-tag"><span>AMY VILLA</span><small>BUILDING FOR CLARITY</small></div></div>
          <div className="principles-copy">
            <p className="lab-eyebrow"><CircleDot size={12} /> The differentiator</p>
            <h2>Good systems make people feel <i>more capable.</i></h2>
            <p>I care about the details that make a workflow actually usable: the missing context, unclear ownership, invisible state, or automatic step that still needs a human to decide. That is where thoughtful software earns trust.</p>
            <div className="principle-list">
              <div><span>01</span><p><strong>Clarity first.</strong> Every screen should answer: what is happening, who owns it, and what matters next?</p></div>
              <div><span>02</span><p><strong>Automation with a reason.</strong> Automate repetition; keep review where context changes the outcome.</p></div>
              <div><span>03</span><p><strong>Proof in the details.</strong> Validation, visible states, documentation, and tests make collaboration safer.</p></div>
            </div>
          </div>
        </section>

        <section className="lab-close">
          <div><p className="lab-eyebrow"><CircleDot size={12} /> Let’s build something useful</p><h2>Looking for someone who<br /><i>cares about the handoff?</i></h2></div>
          <a href="mailto:amyv.dev@gmail.com">Start a conversation <ArrowUpRight size={19} /></a>
        </section>
      </main>
    </div>
  );
}
