import { existsSync, readdirSync, readFileSync } from "node:fs";
import { extname, resolve } from "node:path";
import { gzipSync } from "node:zlib";

const root = resolve(import.meta.dirname, "..");
const assetsDir = resolve(root, "dist", "public", "assets");

if (!existsSync(assetsDir)) {
  throw new Error("Production assets are missing. Run `pnpm build` before the bundle budget check.");
}

const budgets = {
  ".js": { raw: 300 * 1024, gzip: 95 * 1024, label: "JavaScript" },
  ".css": { raw: 180 * 1024, gzip: 45 * 1024, label: "CSS" },
};

const formatKiB = (bytes) => `${(bytes / 1024).toFixed(2)} KiB`;

let hasFailure = false;

for (const [extension, budget] of Object.entries(budgets)) {
  const files = readdirSync(assetsDir).filter((file) => extname(file) === extension);

  if (files.length === 0) {
    throw new Error(`No ${budget.label} assets found in ${assetsDir}`);
  }

  const totals = files.reduce(
    (accumulator, file) => {
      const contents = readFileSync(resolve(assetsDir, file));
      accumulator.raw += contents.byteLength;
      accumulator.gzip += gzipSync(contents).byteLength;
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

if (hasFailure) {
  process.exitCode = 1;
} else {
  console.log("Production bundle budgets passed.");
}
