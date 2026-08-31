import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

/**
 * Fail if the committed lastmod map is stale.
 *
 * The map is generated from git, so it goes out of date the moment content or
 * a template is committed without regenerating it. That is exactly how the
 * previous hardcoded constant drifted ten days behind reality while the site
 * shipped daily — the failure is silent, and a wrong lastmod is worse than
 * none because it teaches crawlers to ignore the field.
 *
 * Regenerate with: node scripts/gen-lastmod.mjs
 */
const GROUPS = JSON.parse(
  readFileSync(new URL("../lib/content/lastmod.json", import.meta.url), "utf8"),
);

// Must mirror gen-lastmod.mjs. Kept as a literal rather than shared so this
// check fails loudly if the two drift, instead of agreeing on a wrong answer.
const SOURCES = {
  home: ["app/page.tsx"],
  services: ["lib/content/services.ts", "app/services/[slug]/page.tsx"],
  specialties: ["lib/content/specialties.ts", "app/specialties/[slug]/page.tsx", "components/sections/PrimarySources.tsx"],
  locations: ["lib/content/locations.ts", "app/locations/[state]/page.tsx"],
  glossary: ["lib/content/glossary.ts", "app/glossary/[term]/page.tsx", "components/sections/PrimarySources.tsx"],
  denialCodes: ["lib/content/denial-code-details.ts", "lib/content/denial-codes.ts", "app/denial-codes/[code]/page.tsx", "components/sections/CodeIndex.tsx"],
  modifiers: ["lib/content/modifiers.ts", "app/modifiers/[modifier]/page.tsx", "components/sections/CodeIndex.tsx"],
  cptCodes: ["lib/content/cpt-codes.ts", "app/cpt-codes/[code]/page.tsx", "components/sections/CodeIndex.tsx"],
  compare: ["lib/content/comparisons.ts", "app/compare/[slug]/page.tsx"],
  caseStudies: ["lib/content/case-studies.ts", "app/case-studies/[slug]/page.tsx"],
  blogTemplate: ["app/blog/[slug]/page.tsx"],
  core: ["lib/content/site.ts", "app/layout.tsx"],
};

const lastCommit = (p) => {
  try {
    return execFileSync("git", ["log", "-1", "--format=%cI", "--", p], { encoding: "utf8" }).trim();
  } catch {
    return "";
  }
};

// The generator reads committed history, so running it before `git commit`
// records the PREVIOUS commit's date — a one-commit lag that is exactly the
// silent staleness this check exists to catch. Regenerate and amend, or commit
// the refreshed map separately.
const dirty = (() => {
  try {
    return execFileSync("git", ["status", "--porcelain", "--", ...Object.values(SOURCES).flat()], {
      encoding: "utf8",
    }).trim();
  } catch {
    return "";
  }
})();
if (dirty) {
  console.error("✗ uncommitted changes to dated sources — commit first, then regenerate:\n" + dirty);
  process.exit(1);
}

const stale = [];
for (const [group, paths] of Object.entries(SOURCES)) {
  const actual = paths.map(lastCommit).filter(Boolean).sort().pop();
  const declared = GROUPS[group];
  if (!declared) {
    stale.push(`${group}: missing from lastmod.json`);
  } else if (actual && Date.parse(actual) > Date.parse(declared)) {
    stale.push(`${group}: declared ${declared.slice(0, 10)}, actual ${actual.slice(0, 10)}`);
  }
}

console.log(`checked ${Object.keys(SOURCES).length} route groups`);
if (stale.length) {
  console.error(`\n${stale.length} stale:`);
  for (const s of stale) console.error(`  ✗ ${s}`);
  console.error("\nRun: node scripts/gen-lastmod.mjs");
  process.exit(1);
}
console.log("✓ sitemap lastmod is current");
