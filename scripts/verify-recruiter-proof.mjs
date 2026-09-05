import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const read = (relativePath) => readFileSync(resolve(root, relativePath), "utf8");

const checks = [
  ["client/src/lib/productEvidence.ts", "Product Engineer · Developer Experience"],
  ["client/src/lib/productEvidence.ts", "Spain · CET/CEST · Remote"],
  ["client/src/lib/productEvidence.ts", "ForgeFlow AI Automation"],
  ["client/src/lib/productEvidence.ts", "https://github.com/Amyvdev1/forgeflow-ai-automation"],
  ["client/src/pages/RecruiterProof.tsx", "publicProjectEvidence"],
  ["client/src/pages/RecruiterProof.tsx", "CandidateSnapshot"],
  ["client/src/pages/Home.tsx", "publicProjectEvidence"],
  ["client/src/pages/Home.tsx", "RECRUITER PROOF"],
  ["client/src/pages/DemoPage.tsx", '"forgeflow-ai-automation"'],
  ["client/src/App.tsx", "RecruiterProof"],
  ["client/index.html", "Product Engineer · Developer Experience"],
];

for (const [file, expected] of checks) {
  if (!read(file).includes(expected)) {
    throw new Error(`Expected ${file} to include: ${expected}`);
  }
}

for (const file of [
  "client/src/index.css",
  "client/src/pages/Home.tsx",
  "client/src/pages/SignalLab.tsx",
  "vite.config.ts",
]) {
  if (read(file).includes("/manus-storage/")) {
    throw new Error(`Unportable internal storage reference found in ${file}`);
  }
}

const html = read("client/index.html");
if (html.includes("maximum-scale=") || html.includes("VITE_ANALYTICS")) {
  throw new Error("Portfolio entrypoint contains an accessibility or internal-runtime regression.");
}

console.log("Recruiter proof, shared product evidence, source links, and portability checks passed.");
