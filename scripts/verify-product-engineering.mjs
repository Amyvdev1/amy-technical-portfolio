import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const read = (relativePath) => readFileSync(resolve(root, relativePath), "utf8");

const forbiddenRootArtifacts = [
  "AAA_visual_quality_notes.txt",
  "RECRUITER_PROOF_VISUAL_REVIEW.md",
  "SIGNAL_ARCHITECTURE_REVIEW.txt",
  "SIGNAL_ENGINE_REVIEW.md",
];

for (const artifact of forbiddenRootArtifacts) {
  if (existsSync(resolve(root, artifact))) {
    throw new Error(`Internal review artifact is still public: ${artifact}`);
  }
}

const recruiterProof = read("client/src/pages/RecruiterProof.tsx");
if (recruiterProof.includes("Miami, FL / Remote")) {
  throw new Error("Recruiter proof still contains the old Miami location.");
}

const viteConfig = read("vite.config.ts");
for (const marker of ["vitePluginManusRuntime", "vitePluginManusDebugCollector", "vitePluginStorageProxy"]) {
  if (viteConfig.includes(marker)) {
    throw new Error(`Internal runtime scaffolding remains in Vite config: ${marker}`);
  }
}

const errorBoundary = read("client/src/components/ErrorBoundary.tsx");
if (errorBoundary.includes("this.state.error?.stack")) {
  throw new Error("Production error UI still exposes stack traces.");
}

console.log("Product engineering portfolio hygiene checks passed.");
