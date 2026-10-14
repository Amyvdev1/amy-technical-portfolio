import { Link, useRoute } from "wouter";
import { useEffect } from "react";
import { reviewPaths } from "@/lib/reviewPaths";
import ReviewPaths from "@/components/ReviewPaths";
import NotFound from "./NotFound";
import "./review-paths.css";

export default function ReviewPath() {
  const [, params] = useRoute("/explore/:slug");
  const path = reviewPaths.find(item => item.slug === params?.slug);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    const previous = document.title;
    document.title = path ? `${path.title} — Amy V` : "Path not found — Amy V";
    return () => {
      document.title = previous;
    };
  }, [path]);
  if (!path) return <NotFound />;
  return (
    <div className="review-page">
      <a className="path-skip" href="#path-steps">
        Skip to the review steps
      </a>
      <header className="path-header">
        <Link href="/">AMY V / SELECTED WORK</Link>
        <Link href="/recruiter-proof">All engineering evidence ↗</Link>
      </header>
      <main>
        <section className="path-hero">
          <p className="path-eyebrow">REVIEW PATH / {path.number}</p>
          <h1>{path.title}</h1>
          <p className="path-question">{path.question}</p>
          <p>{path.summary}</p>
          <div className="path-outcome">
            <span className="path-eyebrow">WHAT YOU CAN EVALUATE</span>
            <p>{path.outcome}</p>
          </div>
          <a className="path-start" href="#path-steps">
            Start with the first example ↓
          </a>
        </section>
        <ol className="path-steps" id="path-steps">
          {path.steps.map((step, i) => (
            <li key={step.task} className="path-step">
              <div className="path-step-index" aria-hidden="true">
                0{i + 1}
              </div>
              <div className="path-step-body">
                <p className="path-eyebrow">{step.name}</p>
                <h2>{step.task}</h2>
                <p>{step.detail}</p>
                <dl>
                  <dt>Inspect</dt>
                  <dd>{step.evidence}</dd>
                  <dt>Scope</dt>
                  <dd>{step.boundary}</dd>
                </dl>
                <div className="path-step-links">
                  <a
                    href={`https://github.com/Amyvdev1/${step.source}/blob/main/${step.doc}`}
                  >
                    {step.label} ↗
                  </a>
                  <Link href={`/projects/${step.study}`}>
                    Portfolio walkthrough →
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ol>
        <aside className="path-finish">
          <p className="path-eyebrow">A USEFUL CONVERSATION STARTS HERE</p>
          <h2>
            Pick a decision.
            <br />
            <em>Ask why it exists.</em>
          </h2>
          <p>
            Which assumption would change in your environment? What would need
            to be measured before production? These projects make those
            questions visible.
          </p>
          <a href="mailto:amyv.dev@gmail.com">Discuss the work ↗</a>
        </aside>
        <ReviewPaths />
      </main>
      <footer className="path-footer">
        Independent work by Amy V. Public source and evidence only.
      </footer>
    </div>
  );
}
