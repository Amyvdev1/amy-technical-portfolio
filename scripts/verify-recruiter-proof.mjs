import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const read = (relativePath) => readFileSync(resolve(root, relativePath), "utf8");
const checks = [
  ["client/src/pages/RecruiterProof.tsx", "ForgeFlow AI Automation"],
  ["client/src/pages/RecruiterProof.tsx", "https://github.com/Amyvdev1/forgeflow-ai-automation"],
  ["client/src/pages/DemoPage.tsx", '"forgeflow-ai-automation"'],
  ["client/src/pages/Home.tsx", "ForgeFlow AI Automation"],
  ["client/src/App.tsx", "RecruiterProof"],
];

for (const [file, expected] of checks) {
  if (!read(file).includes(expected)) {
    throw new Error(`Expected ${file} to include: ${expected}`);
  }
}

for (const file of ["client/src/index.css", "client/src/pages/Home.tsx", "client/src/pages/SignalLab.tsx"]) {
  if (read(file).includes("/manus-storage/")) {
    throw new Error(`Unportable Manus storage reference found in ${file}`);
  }
}

const html = read("client/index.html");
if (html.includes("maximum-scale=") || html.includes("VITE_ANALYTICS")) {
  throw new Error("Portfolio entrypoint contains an accessibility or internal-runtime regression.");
}

console.log("Recruiter proof route, public-source links, and portable asset checks passed.");
