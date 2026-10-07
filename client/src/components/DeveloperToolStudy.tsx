import { ArrowUpRight, Code2, FileCheck2, ShieldCheck } from "lucide-react";
import type { DeveloperToolEvidence } from "@/lib/productEvidence";

export default function DeveloperToolStudy({ project }: { project: DeveloperToolEvidence }) {
  return <main className="demo-page">
    <section className="demo-intro">
      <p className="eyebrow"><span /> {project.index} / Developer Experience &amp; Agent Tools</p>
      <h1>{project.name}</h1><h2>{project.question}</h2><p>{project.detail}</p>
      <div className="demo-stack">{project.stack.split(" · ").map(item => <span key={item}>{item}</span>)}</div>
    </section>
    <section className="showcase-wrap" aria-label={`${project.name} engineering walkthrough`}>
      <div className="api-frame forgeflow-frame">
        <aside className="api-nav"><div className="mini-brand"><span>{project.index}</span>{project.name}</div><p>ENGINEERING STUDY</p><div className="api-version">Open source <span>Run locally</span></div></aside>
        <section className="api-docs">
          <p className="mini-eyebrow">INPUT / DECISION / EVIDENCE</p><h3>Follow the implementation.</h3>
          <ol>{project.workflow.map(step => <li key={step}>{step}</li>)}</ol>
          <h4>Reproduce the local application</h4>
          <div className="code-window"><div className="code-bar"><span /><span /><span /><b>Python 3.12 · isolated environment</b></div><pre>{`git clone ${project.source}.git\ncd ${project.slug}\npython -m venv .venv\n# macOS/Linux: source .venv/bin/activate\n# Windows PowerShell: .\\.venv\\Scripts\\Activate.ps1\npython -m pip install -r requirements.txt\npython -m pytest\npython -m uvicorn app.main:app --reload`}</pre></div>
          <p>Open localhost:8000 after starting the server. This page describes the project; the Python application runs locally.</p>
        </section>
        <aside className="api-rail">
          <div className="rail-card"><Code2 size={18} /><h4>Inspect the code</h4><a href={project.source} target="_blank" rel="noreferrer">Repository <ArrowUpRight size={14} /></a></div>
          <div className="rail-card"><FileCheck2 size={18} /><h4>Review verification</h4><a href={`${project.source}/actions/workflows/verify.yml`} target="_blank" rel="noreferrer">Latest CI results <ArrowUpRight size={14} /></a><p>Tests and Python compilation. CI does not certify production readiness.</p></div>
          <div className="rail-card"><ShieldCheck size={18} /><h4>Engineering signals</h4><ul>{project.signals.map(signal => <li key={signal}>{signal}</li>)}</ul></div>
        </aside>
      </div>
    </section>
    <section className="project-rationale"><div><p className="eyebrow"><span /> Evidence boundary</p><h3>What this implementation proves.</h3><p>{project.boundary}</p></div><div><p className="eyebrow"><span /> Review the decisions</p><a href={`${project.source}/blob/main/docs/ARCHITECTURE.md`} target="_blank" rel="noreferrer">Architecture notes <ArrowUpRight size={16} /></a><a href={`${project.source}/tree/main/tests`} target="_blank" rel="noreferrer">Regression tests <ArrowUpRight size={16} /></a></div></section>
  </main>;
}
