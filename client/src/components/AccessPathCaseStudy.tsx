import { Check, Code2, Eye, Keyboard, Send, ShieldCheck } from "lucide-react";
import { useState } from "react";

export default function AccessPathCaseStudy() {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("Ready for a keyboard-first review.");

  const submit = () => {
    const value = title.trim();
    if (value.length < 4) {
      setError("Enter at least 4 characters to create a review request.");
      setStatus("The request was not created. Review the visible form error.");
      return;
    }
    setError("");
    setTitle("");
    setStatus(`Review request “${value}” created in the New state.`);
  };

  return (
    <div className="accesspath-case" aria-label="AccessPath Console personal accessibility practice demonstration">
      <aside className="accesspath-side">
        <div className="accesspath-mark"><span>AP</span><b>AccessPath</b></div>
        <p>WORKSPACE</p>
        <a className="accesspath-active"><Code2 size={15} /> Requests</a>
        <a><ShieldCheck size={15} /> Practice checks</a>
        <a><Eye size={15} /> Review notes</a>
        <div className="accesspath-side-note"><Keyboard size={14} /><span>Native controls<br />Visible focus</span></div>
      </aside>
      <section className="accesspath-main">
        <header><div><p className="mini-eyebrow">PERSONAL ACCESSIBILITY PRACTICE</p><h3>A clear next step, for every user.</h3></div><span className="accesspath-status"><i /> REVIEW READY</span></header>
        <div className="accesspath-board">
          <section aria-label="Request groups">
            <div className="accesspath-columns">
              {["New", "In review", "Ready"].map((label, index) => <article key={label}><header><span>{label}</span><b>1</b></header><button type="button" className={index === 1 ? "accesspath-request selected" : "accesspath-request"}><small>{index === 1 ? "HIGH" : "STANDARD"}</small><strong>{index === 0 ? "Confirm handoff details" : index === 1 ? "Review service update" : "Publish approved notice"}</strong><span>REQ-{109 + index} · Owner: AV</span></button></article>)}
            </div>
          </section>
          <aside className="accesspath-detail"><p className="mini-eyebrow">SELECTED REQUEST</p><h4>Review service update</h4><dl><div><dt>Owner</dt><dd>Amy V.</dd></div><div><dt>Status</dt><dd>In review</dd></div><div><dt>Pattern</dt><dd>Native button</dd></div></dl><button type="button">Move to next status <Send size={13} /></button></aside>
        </div>
        <form onSubmit={(event) => { event.preventDefault(); submit(); }} noValidate>
          <label htmlFor="accesspath-title">Create review request</label>
          <div><input id="accesspath-title" value={title} onChange={(event) => { setTitle(event.target.value); if (error) setError(""); }} aria-invalid={Boolean(error)} aria-describedby={error ? "accesspath-error accesspath-help" : "accesspath-help"} placeholder="e.g., Review service update" /><button type="submit">Create</button></div>
          <p id="accesspath-help">Named label, visible focus, and associated recovery guidance.</p>
          {error && <p id="accesspath-error" role="alert" className="accesspath-error">{error}</p>}
          <p className="accesspath-live" role="status" aria-live="polite">{status}</p>
        </form>
      </section>
      <aside className="accesspath-proof"><p>IMPLEMENTATION SIGNALS</p><div><Keyboard size={16} /><span>Keyboard-operable<br />native controls</span></div><div><Eye size={16} /><span>Visible focus<br />and labelled regions</span></div><div><Check size={16} /><span>Automated axe<br />regression test</span></div></aside>
    </div>
  );
}
