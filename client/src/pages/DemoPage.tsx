import { ArrowLeft, ArrowUpRight, Check, ChevronRight, Clock3, Code2, FileCheck2, LockKeyhole, MoreHorizontal, Plus, ShieldCheck, Sparkles, UserRound } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "wouter";

const projectData = {
  relayops: {
    eyebrow: "01 / Workflow operations",
    title: "RelayOps",
    subtitle: "A visible path from request to approval.",
    description: "An interactive personal demo exploring how a small operations team can see task ownership, reviews, and state changes without losing the why behind the work.",
    stack: ["React", "TypeScript", "Workflow architecture", "Human approvals"],
    question: "How might a lean team reduce invisible handoffs without automating away human judgment?",
  },
  "clearrout-api": {
    eyebrow: "02 / Backend systems",
    title: "ClearRoute API",
    subtitle: "A task contract with clear boundaries.",
    description: "A sanitized personal backend demo for role-aware task workflows. It focuses on validation, clear task states, scoped access, and a small audit event surface.",
    stack: ["Python", "FastAPI", "Pydantic", "API design"],
    question: "What minimum contract makes a workflow API reliable enough for an interface and human reviewers?",
  },
  "clientflow-studio": {
    eyebrow: "03 / Customer operations",
    title: "ClientFlow Studio",
    subtitle: "Keep the context beside the next action.",
    description: "An interactive personal demo for organizing incoming leads, relevant context, and human follow-up. It keeps the workflow lightweight while making ownership and next steps explicit.",
    stack: ["React", "TypeScript", "Product UX", "Customer operations"],
    question: "How can a lightweight workspace help a team follow up with context rather than just a status label?",
  },
} as const;

type ProjectSlug = keyof typeof projectData;

function Shell({ children }: { children: React.ReactNode }) {
  return <div className="demo-shell"><header className="demo-header"><Link href="/" className="back-link"><ArrowLeft size={17} /> Portfolio home</Link><span className="demo-wordmark">AV / systems & software</span><a href="mailto:amyv.dev@gmail.com">Contact <ArrowUpRight size={14} /></a></header>{children}</div>;
}

function RelayOpsDemo() {
  const [approved, setApproved] = useState(false);
  const [selected, setSelected] = useState("Copy review");
  const tasks = [
    { title: "Define response path", owner: "AV", status: "Done" },
    { title: "Copy review", owner: "MK", status: approved ? "Approved" : "In review" },
    { title: "Schedule handoff", owner: "JT", status: "Queued" },
  ];
  return <div className="product-frame relay-frame"><aside><div className="mini-brand"><span>R</span>RelayOps</div><p className="sidebar-label">Workspace</p><a className="side-active"><LayersIcon /> Workboard</a><a><FileCheck2 size={16} /> Approvals <b>1</b></a><a><Clock3 size={16} /> Activity</a><div className="side-bottom"><div className="avatar">AV</div><div><strong>Amy Villa</strong><small>Builder view</small></div></div></aside><section className="product-main"><div className="product-topline"><div><span className="mini-eyebrow">OPERATIONS / W38</span><h3>Member onboarding refresh</h3></div><button className="icon-button"><MoreHorizontal size={19} /></button></div><div className="workflow-strip"><span className="flow-complete"><Check size={14} /> Brief</span><i /><span className="flow-active">Review</span><i /><span>Approval</span><i /><span>Handoff</span></div><div className="task-columns">{["Planned", "In review", "Ready to hand off"].map((column) => <div className="kanban-column" key={column}><div className="column-title"><span>{column}</span><em>{column === "Planned" ? 1 : column === "In review" ? 1 : 1}</em></div>{tasks.filter((_, i) => (column === "Planned" ? i === 0 : column === "In review" ? i === 1 : i === 2)).map((task) => <button onClick={() => setSelected(task.title)} className={`task-card ${selected === task.title ? "task-selected" : ""}`} key={task.title}><small>{task.status}</small><strong>{task.title}</strong><div><span>{task.owner}</span><Clock3 size={13} /></div></button>)}</div>)}</div></section><aside className="detail-panel"><div className="detail-top"><span>Task detail</span><button className="icon-button">×</button></div><p className="detail-state">{approved ? "APPROVED" : "NEEDS REVIEW"}</p><h3>{selected}</h3><p className="detail-copy">Review the message against the customer question, the current guidelines, and the next action the team needs.</p><div className="detail-meta"><p><UserRound size={15} /> Owner <b>MK</b></p><p><Clock3 size={15} /> Due <b>Today</b></p><p><ShieldCheck size={15} /> Approval <b>Required</b></p></div><button onClick={() => setApproved(!approved)} className={`approve-button ${approved ? "approved" : ""}`}>{approved ? <><Check size={16} /> Approved</> : <><FileCheck2 size={16} /> Approve handoff</>}</button></aside></div>;
}

function LayersIcon() { return <span className="layers-glyph">◈</span>; }

function ClearRouteDemo() {
  const [tab, setTab] = useState("Create task");
  const request = `POST /v1/tasks\nAuthorization: Bearer ••••••\n\n{\n  "title": "Review workspace copy",\n  "owner_id": "usr_18",\n  "state": "in_review",\n  "requires_approval": true\n}`;
  const response = `{\n  "id": "tsk_204",\n  "state": "in_review",\n  "audit_event": "evt_91",\n  "next_action": "approval_required"\n}`;
  return <div className="api-frame"><aside className="api-nav"><div className="mini-brand"><span>C</span>ClearRoute</div><p>API REFERENCE</p>{["Overview", "Authentication", "Tasks", "Audit events"].map((x) => <a key={x} className={x === "Tasks" ? "api-active" : ""}>{x}</a>)}<div className="api-version">v0.1 <span>Personal demo</span></div></aside><section className="api-docs"><p className="mini-eyebrow">TASKS</p><h3>Create a task</h3><p>Creates a workflow task with a clear owner, state, and approval requirement.</p><div className="endpoint"><span className="method">POST</span><code>/v1/tasks</code></div><div className="api-tabs">{["Create task", "Response", "Validation"].map((item) => <button onClick={() => setTab(item)} className={tab === item ? "tab-active" : ""} key={item}>{item}</button>)}</div><div className="code-window"><div className="code-bar"><span /><span /><span /><b>{tab === "Response" ? "201 Created" : "application/json"}</b></div><pre>{tab === "Response" ? response : tab === "Validation" ? "title: required string\nowner_id: required user identifier\nstate: planned | in_review | approved\nrequires_approval: boolean\n\nInvalid state transitions return 422." : request}</pre></div></section><aside className="api-rail"><div className="rail-card"><LockKeyhole size={18} /><h4>Role-aware access</h4><p>A task belongs to an organization context and a role determines what it can change.</p></div><div className="rail-card"><FileCheck2 size={18} /><h4>Audit-friendly</h4><p>A state change can return an event reference for a visible history.</p></div><div className="rail-card"><Sparkles size={18} /><h4>Designed for a UI</h4><p>Explicit states keep a client interface predictable and reviewable.</p></div></aside></div>;
}

function ClientFlowDemo() {
  const [stage, setStage] = useState<"New" | "Qualified" | "Follow-up">("New");
  const [note, setNote] = useState("");
  const leads = [
    { name: "Maya Chen", type: "Implementation", stage: "New", color: "pink" },
    { name: "Jordan Ellis", type: "Product inquiry", stage: "Qualified", color: "blue" },
    { name: "Samira Khan", type: "Support request", stage: "Follow-up", color: "gold" },
  ];
  const selected = leads.find((lead) => lead.stage === stage) ?? leads[0];
  return <div className="client-frame"><header><div className="mini-brand"><span>CF</span>ClientFlow</div><div className="client-search">Search workspace… <kbd>⌘ K</kbd></div><button className="new-lead"><Plus size={15} /> New lead</button><div className="avatar">AV</div></header><aside className="client-sidebar"><p>WORKSPACE</p><a className="client-active"><UserRound size={16} /> Leads <b>3</b></a><a><Clock3 size={16} /> Follow-ups</a><a><FileCheck2 size={16} /> Notes</a><hr /><p>VIEWS</p><a>My active work</a><a>Needs a next step</a></aside><main className="client-main"><div className="client-main-top"><div><span className="mini-eyebrow">LEADS / ACTIVE</span><h3>Keep the why with the work.</h3></div><div className="filter-tabs">{(["New", "Qualified", "Follow-up"] as const).map((item) => <button onClick={() => setStage(item)} className={stage === item ? "filter-active" : ""} key={item}>{item}</button>)}</div></div><div className="lead-grid">{leads.map((lead) => <button key={lead.name} onClick={() => setStage(lead.stage as typeof stage)} className={`lead-card ${stage === lead.stage ? "lead-selected" : ""}`}><div className={`lead-avatar ${lead.color}`}>{lead.name.split(" ").map(x => x[0]).join("")}</div><div><span>{lead.type}</span><strong>{lead.name}</strong><small>{lead.stage === "New" ? "First reply needed" : lead.stage === "Qualified" ? "Context captured" : "Follow-up due today"}</small></div><ChevronRight size={16} /></button>)}</div><section className="client-detail"><div><p className="mini-eyebrow">CURRENT CONTEXT</p><h4>{selected.name}</h4><p>{selected.type} · <b>{selected.stage}</b></p></div><div className="context-columns"><article><span>What matters</span><p>Looking for a clear starting point and the right technical context before the next conversation.</p></article><article><span>Next action</span><p>{stage === "New" ? "Send a focused first response" : stage === "Qualified" ? "Share relevant project context" : "Confirm next conversation"}</p></article></div><label>Add a handoff note<textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Capture what the next person needs to know…" /></label><button className="save-note">Save context <ArrowUpRight size={15} /></button></section></main></div>;
}

export default function DemoPage() {
  const { slug } = useParams<{ slug: ProjectSlug }>();
  const project = projectData[slug as ProjectSlug];
  if (!project) return <Shell><main className="missing-page"><h1>Project not found.</h1><Link href="/">Return home</Link></main></Shell>;
  return <Shell><main className="demo-page"><section className="demo-intro"><p className="eyebrow"><span /> {project.eyebrow}</p><h1>{project.title}</h1><h2>{project.subtitle}</h2><p>{project.description}</p><div className="demo-stack">{project.stack.map((item) => <span key={item}>{item}</span>)}</div></section><section className="showcase-wrap">{slug === "relayops" ? <RelayOpsDemo /> : slug === "clearrout-api" ? <ClearRouteDemo /> : <ClientFlowDemo />}</section><section className="project-rationale"><div><p className="eyebrow"><span /> Design question</p><h3>{project.question}</h3></div><div><p className="eyebrow"><span /> Evidence boundary</p><p>This is a self-directed portfolio demonstration. It does not represent client work, a public product, user data, or production outcomes.</p><a href="mailto:amyv.dev@gmail.com">Request a walkthrough <ArrowUpRight size={16} /></a></div></section></main></Shell>;
}
