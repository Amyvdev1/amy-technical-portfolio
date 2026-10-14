import { Link, useRoute } from "wouter";
import { useEffect } from "react";
import "./reliability-study.css";

const studies = {
  "webhook-trust-lab": {
    name: "Webhook Trust Lab",
    category: "APPLICATION SECURITY / DEVELOPER EDUCATION",
    title: "A valid signature is only the beginning.",
    lead: "Follow one event from signed bytes to a completed local action. A focused security case study that makes authenticity, freshness, event identity, and transaction boundaries inspectable.",
    repo: "https://github.com/Amyvdev1/webhook-trust-lab",
    poster: "media/desktop.png",
    video: "media/walkthrough-with-music.mp4",
    duration: "2 min 24 sec",
    facts: ["Python + SQLite", "39 tests passed", "9 recorded scenarios"],
    steps: [
      ["01 / AUTHENTICATE", "Start with the exact bytes", "Verify the HMAC over the raw body and signed metadata before parsing JSON. A changed byte, timestamp, or event identity changes the authentication decision."],
      ["02 / ESTABLISH FRESHNESS", "A signature has no memory", "An authentic message can be replayed. A signed timestamp limits its acceptance window; a persistent event record answers a separate question about prior processing."],
      ["03 / COMMIT", "Keep the local decision together", "Record the event and its simulated effect in one SQLite transaction. Inspect duplicate delivery, conflicting IDs, concurrent requests, and exceptions before commit."],
    ],
    evidence: "Local verification: 39 deterministic tests passed on Windows with Python 3.14 and 3.12. Hosted verification: GitHub Actions passed on Ubuntu and Windows with Python 3.11 and 3.14. The dated records include source hashes, a fresh-copy check, nine executed scenarios, and browser verification. Inspect the repository for the latest CI status.",
    boundary: "This is an independent reference implementation. Its effect is a row in the same SQLite database—not a payment or remote API call. It does not establish provider compatibility, production adoption, or exactly-once external effects.",
    links: [
      ["Explore the recorded evidence", "/project-media/webhook-trust-lab/site/index.html"],
      ["Read the threat model", "https://github.com/Amyvdev1/webhook-trust-lab/blob/main/docs/threat-model.md"],
      ["Inspect the tests", "https://github.com/Amyvdev1/webhook-trust-lab/blob/main/test_webhook_security.py"],
    ],
    command: "python -m unittest -v\npython demo.py",
  },
  "olostep-integration-reliability-lab": {
    name: "Olostep Integration Reliability Lab",
    category: "API RELIABILITY / DEVELOPER EXPERIENCE",
    title: "Completed does not always mean complete.",
    lead: "An independent reference workflow for the operational layer after the first successful API request: asynchronous batches, pagination, retrieval, partial results, recovery, and an evidence trail.",
    repo: "https://github.com/Amyvdev1/olostep-integration-reliability-lab",
    poster: "poster.png",
    video: "walkthrough-with-music.mp4",
    duration: "1 min 50 sec",
    facts: ["Python · Standard Library", "42 tests passed", "9 offline scenarios", "1 bounded live check"],
    steps: [
      ["01 / FOLLOW THE LIFECYCLE", "Make progress explicit", "Submit a batch, preserve its identity, poll within a deadline, traverse result pages, and retrieve content. Reconcile requested items against the results instead of trusting a terminal status alone."],
      ["02 / RECOVER DELIBERATELY", "Retry the right operation", "Inspect timeouts, transient read failures, missing content, cursor loops, and partial results. Batch creation is attempted once; an uncertain outcome requires reconciliation before another submission."],
      ["03 / EXPLAIN THE EVIDENCE", "Separate fixtures from observations", "Nine scenarios model failure behavior offline. A separate live batch verified two public URLs, cursor traversal, matching identities, and two Markdown retrievals on October 14, 2026."],
    ],
    evidence: "The public repository includes automated tests, Windows/Linux CI, a checkpoint-based recovery path, and sanitized live observations. The two-URL live check completed with no failed or unresolved items and no retries. Usage fields were null, so cost remains unknown.",
    boundary: "Independent work, not an official Olostep integration or endorsement. The recording uses fixtures. One live compatibility check does not establish general reliability, load capacity, credit pricing, public webhook delivery, or production adoption.",
    links: [
      ["Read the live compatibility report", "https://github.com/Amyvdev1/olostep-integration-reliability-lab/blob/main/docs/live-compatibility.md"],
      ["Inspect the workflow", "https://github.com/Amyvdev1/olostep-integration-reliability-lab/blob/main/lab/runner.py"],
      ["Follow the walkthrough guide", "https://github.com/Amyvdev1/olostep-integration-reliability-lab/blob/main/docs/walkthrough.md"],
    ],
    command: "python -m unittest discover -s tests -v\npython -m lab --scenario partial\npython -m lab --serve",
  },
} as const;

export default function ReliabilityStudy() {
  const [, params] = useRoute("/projects/:slug");
  const slug = params?.slug === "olostep-integration-reliability-lab" ? params.slug : "webhook-trust-lab";
  const study = studies[slug];
  const base = `/project-media/${slug}/`;
  useEffect(() => {
    const previous = document.title;
    document.title = `${study.name} — Amy V.`;
    window.scrollTo(0, 0);
    return () => { document.title = previous; };
  }, [study.name]);
  return <div className="reliability-study">
    <header className="rs-nav"><Link href="/">← Portfolio</Link><span>AMY V. / FIELD NOTES</span><Link href="/recruiter-proof">Engineering evidence ↗</Link></header>
    <main>
      <section className="rs-intro"><p className="rs-eyebrow">{study.category}</p><p className="rs-name">{study.name}</p><h1>{study.title}</h1><p className="rs-lead">{study.lead}</p><ul className={`rs-facts${slug === "olostep-integration-reliability-lab" ? " rs-facts--stacked" : ""}`} aria-label="Project facts">{study.facts.map(fact => <li key={fact}>{fact}</li>)}</ul><div className="rs-actions"><a className="rs-primary" href="#walkthrough">Watch the walkthrough ↓</a><a href={study.repo} target="_blank" rel="noreferrer">Explore the source ↗</a></div></section>
      <section id="walkthrough" className="rs-film"><div className="rs-section-label"><h2>The decisions, made visible.</h2><span>{study.duration} / ORIGINAL MUSIC</span></div><video key={slug} controls playsInline preload="none" poster={base + study.poster} aria-label={`${study.name} recorded walkthrough with instrumental music`}><source src={base + study.video} type="video/mp4"/>Your browser does not support this video. <a href={base + study.video}>Download the walkthrough</a>.</video><div className="rs-film-note"><p>Recorded local walkthrough · instrumental soundtrack · no voiceover. The written walkthrough below explains the same core decisions.</p><a href={base + study.video} download>Download video ↓</a></div></section>
      <section className="rs-chapters" aria-label="Written walkthrough">{study.steps.map(([number,title,body]) => <article key={number}><p className="rs-eyebrow">{number}</p><h2>{title}</h2><p>{body}</p></article>)}</section>
      <section className="rs-evidence"><div><p className="rs-eyebrow">EVIDENCE / BOUNDARIES</p><h2>Know what the result proves.</h2><p>{study.evidence}</p><p className="rs-boundary">{study.boundary}</p></div><div className="rs-inspect"><h3>Inspect it yourself</h3><pre><code>{study.command}</code></pre><nav aria-label="Project resources">{study.links.map(([label,href]) => <a key={href} href={href}>{label} ↗</a>)}<a href={`${study.repo}/actions`}>Check GitHub Actions ↗</a></nav></div></section>
      <section className="rs-next"><p className="rs-eyebrow">CONTINUE EXPLORING</p><Link href={`/projects/${slug === "webhook-trust-lab" ? "olostep-integration-reliability-lab" : "webhook-trust-lab"}`}>{slug === "webhook-trust-lab" ? "Olostep Integration Reliability Lab" : "Webhook Trust Lab"} →</Link></section>
    </main><footer>Independent engineering and developer education by Amy V.</footer>
  </div>;
}
