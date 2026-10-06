import { candidateProfile } from "@/lib/productEvidence";

const rows = [
  ["LANGUAGES", candidateProfile.languages],
  ["FOCUS", candidateProfile.focus],
] as const;

export default function CandidateSnapshot() {
  return (
    <aside className="proof-eligibility" aria-label="Candidate overview">
      <p>CANDIDATE SNAPSHOT</p>
      {rows.map(([label, value]) => (
        <div key={label}>
          <span>{label}</span>
          <b>{value}</b>
        </div>
      ))}
    </aside>
  );
}
