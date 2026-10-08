import { ArrowUpRight, Code2, FileCheck2, ShieldCheck } from "lucide-react";

import type { DeveloperToolEvidence } from "@/lib/productEvidence";

export default function DeveloperToolStudy({
  project,
}: {
  project: DeveloperToolEvidence;
}) {
  const node = project.runtime === "node";

  return (
    <main className="demo-page">
      <section className="demo-intro">
        <p className="eyebrow">
          <span /> {project.index} /{" "}
          {node
            ? "AI Economics & Decision Systems"
            : "Developer Experience & Agent Tools"}
        </p>

        <h1 style={{ overflowWrap: "anywhere" }}>{project.name}</h1>
        <h2>{project.question}</h2>
        <p>{project.detail}</p>

        <div className="demo-stack">
          {project.stack.split(" Â· ").map(item => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>

      {project.preview && (
        <figure
          style={{ maxWidth: 1200, margin: "0 auto 3rem", padding: "0 1.5rem" }}
        >
          <img
            src={project.preview}
            alt={`${project.name} local dashboard`}
            width={1440}
            height={1000}
            loading="lazy"
            decoding="async"
            style={{ width: "100%", height: "auto", borderRadius: 12 }}
          />
          <figcaption>
            Actual local application preview. Run the source to explore the
            interactive dashboard.
          </figcaption>
        </figure>
      )}

      <section
        className="showcase-wrap"
        aria-label={`${project.name} engineering walkthrough`}
      >
        <div className="api-frame forgeflow-frame">
          <aside className="api-nav">
            <div className="mini-brand" style={{ overflowWrap: "anywhere" }}>
              <span>{project.index}</span>
              {project.name}
            </div>
            <p>ENGINEERING STUDY</p>
            <div className="api-version">
              Open source <span>Run locally</span>
            </div>
          </aside>

          <section className="api-docs">
            <p className="mini-eyebrow">INPUT / DECISION / EVIDENCE</p>
            <h3>Follow the implementation.</h3>

            <ol>
              {project.workflow.map(step => (
                <li key={step}>{step}</li>
              ))}
            </ol>

            <h4>Reproduce the local application</h4>

            <div className="code-window">
              <div className="code-bar">
                <span />
                <span />
                <span />
                <b>
                  {node
                    ? "Node 24 · local application"
                    : "Python 3.12 · isolated environment"}
                </b>
              </div>
              <pre>
                {node
                  ? `git clone ${project.source}.git\ncd ${project.slug}\nnpm ci\nnpm test\nnpm run build\nnpm start`
                  : `git clone ${project.source}.git\ncd ${project.slug}\npython -m venv .venv\n# Activate .venv for your shell\npython -m pip install -r requirements.txt\npython -m pytest\npython -m uvicorn app.main:app --reload`}
              </pre>
            </div>

            <p>
              Open localhost:{project.port ?? 8000} after starting the server.
              This case study documents an application you run locally.
            </p>
          </section>

          <aside className="api-rail">
            <div className="rail-card">
              <Code2 size={18} />
              <h4>Inspect the code</h4>
              <a href={project.source} target="_blank" rel="noreferrer">
                Repository <ArrowUpRight size={14} />
              </a>
            </div>

            <div className="rail-card">
              <FileCheck2 size={18} />
              <h4>Review verification</h4>
              <a
                href={`${project.source}/actions/workflows/verify.yml`}
                target="_blank"
                rel="noreferrer"
              >
                Latest CI results <ArrowUpRight size={14} />
              </a>
              <p>
                {node
                  ? "Domain tests, production build, and browser checks."
                  : "Tests and Python compilation."}{" "}
                CI does not certify production readiness.
              </p>
            </div>

            <div className="rail-card">
              <ShieldCheck size={18} />
              <h4>Engineering signals</h4>
              <ul>
                {project.signals.map(signal => (
                  <li key={signal}>{signal}</li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="project-rationale">
        <div>
          <p className="eyebrow">
            <span /> Evidence boundary
          </p>
          <h3>What this implementation proves.</h3>
          <p>{project.boundary}</p>
        </div>
        <div>
          <p className="eyebrow">
            <span /> Review the decisions
          </p>
          <a
            href={`${project.source}/blob/main/docs/${node ? "architecture.md" : "ARCHITECTURE.md"}`}
            target="_blank"
            rel="noreferrer"
          >
            Architecture notes <ArrowUpRight size={16} />
          </a>
          <a
            href={`${project.source}/tree/main/tests`}
            target="_blank"
            rel="noreferrer"
          >
            Regression tests <ArrowUpRight size={16} />
          </a>
          {node && (
            <>
              <a
                href={`${project.source}/blob/main/docs/engineering-note.md`}
                target="_blank"
                rel="noreferrer"
              >
                {project.articleTitle ?? "Engineering article"}{" "}
                <ArrowUpRight size={16} />
              </a>
              <a
                href={`${project.source}/blob/main/docs/walkthrough.md`}
                target="_blank"
                rel="noreferrer"
              >
                Walkthrough <ArrowUpRight size={16} />
              </a>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
