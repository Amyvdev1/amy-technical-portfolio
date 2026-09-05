import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const read = (relativePath) => readFileSync(resolve(root, relativePath), "utf8");

const forbiddenArtifacts = [
  "AAA_visual_quality_notes.txt",
  "RECRUITER_PROOF_VISUAL_REVIEW.md",
  "SIGNAL_ARCHITECTURE_REVIEW.txt",
  "SIGNAL_ENGINE_REVIEW.md",
  "components.json",
  "template.json",
  "patches/wouter@3.7.1.patch",
  "server/index.ts",
  "client/src/components/ui",
  "docs/superpowers",
];

for (const artifact of forbiddenArtifacts) {
  if (existsSync(resolve(root, artifact))) {
    throw new Error(`Unused or internal scaffold is still public: ${artifact}`);
  }
}

const recruiterProof = read("client/src/pages/RecruiterProof.tsx");
if (recruiterProof.includes("Miami, FL / Remote")) {
  throw new Error("Recruiter proof still contains the old Miami location.");
}

const home = read("client/src/pages/Home.tsx");
for (const helper of ["getScrollProgress", "getSceneIndex", "getSceneDestination"]) {
  if (!home.includes(helper)) {
    throw new Error(`Home no longer uses the tested Signal Engine helper: ${helper}`);
  }
}

for (const stalePattern of [
  "Math.floor(progress * scenes.length)",
  "(index + 0.04) / scenes.length",
]) {
  if (home.includes(stalePattern)) {
    throw new Error(`Home reintroduced duplicated Signal Engine math: ${stalePattern}`);
  }
}

const app = read("client/src/App.tsx");
for (const marker of [
  "lazy(secondaryRouteLoaders.recruiterProof)",
  "lazy(secondaryRouteLoaders.signalLab)",
  "lazy(secondaryRouteLoaders.demoPage)",
  "lazy(secondaryRouteLoaders.notFound)",
  "<Suspense",
]) {
  if (!app.includes(marker)) {
    throw new Error(`Secondary route loading optimization is missing: ${marker}`);
  }
}

for (const eagerImport of [
  'import RecruiterProof from "./pages/RecruiterProof"',
  'import SignalLab from "./pages/SignalLab"',
  'import DemoPage from "./pages/DemoPage"',
  'import NotFound from "@/pages/NotFound"',
]) {
  if (app.includes(eagerImport)) {
    throw new Error(`Secondary route became eager again: ${eagerImport}`);
  }
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

const packageJson = read("package.json");
const forbiddenPackageMarkers = [
  "vite-plugin-manus-runtime",
  "@builder.io/vite-plugin-jsx-loc",
  "@radix-ui/",
  "express",
  "patchedDependencies",
  "@hookform/resolvers",
  "next-themes",
  "recharts",
  "sonner",
];

for (const marker of forbiddenPackageMarkers) {
  if (packageJson.includes(marker)) {
    throw new Error(`Package surface still contains unused scaffold dependency: ${marker}`);
  }
}

console.log("Product engineering portfolio hygiene checks passed.");
