import { existsSync, readdirSync, readFileSync } from "node:fs";
import { extname, resolve } from "node:path";
import { gzipSync } from "node:zlib";

const root = resolve(import.meta.dirname, "..");
const publicDir = resolve(root, "dist", "public");
const assetsDir = resolve(publicDir, "assets");
const indexPath = resolve(publicDir, "index.html");

if (!existsSync(assetsDir) || !existsSync(indexPath)) {
  throw new Error("Production assets are missing. Run `pnpm build` before the bundle budget check.");
}

const budgets = {
  ".js": { raw: 300 * 1024, gzip: 95 * 1024, label: "JavaScript" },
  ".css": { raw: 180 * 1024, gzip: 45 * 1024, label: "CSS" },
};

const initialJavaScriptBudget = {
  raw: 240 * 1024,
  gzip: 78 * 1024,
};

const formatKiB = (bytes) => `${(bytes / 1024).toFixed(2)} KiB`;
const measure = (contents) => ({
  raw: contents.byteLength,
  gzip: gzipSync(contents).byteLength,
});

let hasFailure = false;

for (const [extension, budget] of Object.entries(budgets)) {
  const files = readdirSync(assetsDir).filter((file) => extname(file) === extension);

  if (files.length === 0) {
    throw new Error(`No ${budget.label} assets found in ${assetsDir}`);
  }

  const totals = files.reduce(
    (accumulator, file) => {
      const result = measure(readFileSync(resolve(assetsDir, file)));
      accumulator.raw += result.raw;
      accumulator.gzip += result.gzip;
      return accumulator;
    },
    { raw: 0, gzip: 0 },
  );

  const rawOk = totals.raw <= budget.raw;
  const gzipOk = totals.gzip <= budget.gzip;

  console.log(
    `${budget.label}: ${formatKiB(totals.raw)} raw / ${formatKiB(totals.gzip)} gzip ` +
      `(budget ${formatKiB(budget.raw)} raw / ${formatKiB(budget.gzip)} gzip)`,
  );

  if (!rawOk || !gzipOk) {
    hasFailure = true;
    console.error(
      `${budget.label} bundle exceeds the portfolio budget. Review new dependencies, duplicated code, or oversized styles before merging.`,
    );
  }
}

const indexHtml = readFileSync(indexPath, "utf8");
const entryMatch = indexHtml.match(/<script[^>]+type=["']module["'][^>]+src=["']\/?assets\/([^"']+\.js)["']/i);

if (!entryMatch) {
  throw new Error("Could not identify the production module entry from dist/public/index.html.");
}

const entryFile = entryMatch[1];
const entryPath = resolve(assetsDir, entryFile);
if (!existsSync(entryPath)) {
  throw new Error(`Production entry referenced by index.html does not exist: ${entryFile}`);
}

const entrySize = measure(readFileSync(entryPath));
console.log(
  `Initial JavaScript: ${formatKiB(entrySize.raw)} raw / ${formatKiB(entrySize.gzip)} gzip ` +
    `(budget ${formatKiB(initialJavaScriptBudget.raw)} raw / ${formatKiB(initialJavaScriptBudget.gzip)} gzip)`,
);

if (
  entrySize.raw > initialJavaScriptBudget.raw ||
  entrySize.gzip > initialJavaScriptBudget.gzip
) {
  hasFailure = true;
  console.error(
    "Initial JavaScript exceeds the route-loading budget. Check for eager secondary routes or newly added heavy dependencies.",
  );
}

const javascriptFiles = readdirSync(assetsDir).filter((file) => extname(file) === ".js");
const secondaryChunks = javascriptFiles.filter((file) => file !== entryFile);

if (secondaryChunks.length < 4) {
  hasFailure = true;
  console.error(
    `Expected lazy route chunks, but only found ${secondaryChunks.length} non-entry JavaScript chunks.`,
  );
} else {
  console.log(`Route splitting: ${secondaryChunks.length} secondary JavaScript chunks detected.`);
}

if (hasFailure) {
  process.exitCode = 1;
} else {
  console.log("Production bundle budgets and route-splitting checks passed.");
}
