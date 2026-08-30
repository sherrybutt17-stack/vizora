import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";

/**
 * Generate real `lastmod` dates for the sitemap, from git.
 *
 * The sitemap previously stamped every URL with one hardcoded constant. On
 * 2026-08-30 that constant said 2026-08-20, which meant 278 pages claimed they
 * had not changed in ten days of daily shipping — and the 25 denial-code pages
 * and three pillars added on the 27th and 28th claimed a date from before they
 * existed.
 *
 * That is worse than omitting lastmod. Crawlers use it to decide whether a
 * re-crawl is worth it, and a demonstrably wrong value is a reason to ignore
 * the field across the whole sitemap.
 *
 * A page's real date is the most recent change to anything that renders it:
 * its content data AND its template. Both are tracked here.
 *
 * Run before building when content or templates change:
 *   node scripts/gen-lastmod.mjs
 *
 * `scripts/check-lastmod.mjs` fails if the committed output is stale.
 */
const lastCommit = (path) => {
  try {
    const out = execFileSync("git", ["log", "-1", "--format=%cI", "--", path], {
      encoding: "utf8",
    }).trim();
    return out || null;
  } catch {
    return null;
  }
};

/** Most recent commit date across several files. */
const newest = (paths) => {
  const dates = paths.map(lastCommit).filter(Boolean).sort();
  return dates.length ? dates[dates.length - 1] : new Date(0).toISOString();
};

// Each route group is dated by every file that determines what it renders.
// Shared components that appear on every page (PrimarySources, CodeIndex) are
// included where they materially change the page body.
const GROUPS = {
  home: ["app/page.tsx"],
  services: ["lib/content/services.ts", "app/services/[slug]/page.tsx"],
  specialties: [
    "lib/content/specialties.ts",
    "app/specialties/[slug]/page.tsx",
    "components/sections/PrimarySources.tsx",
  ],
  locations: ["lib/content/locations.ts", "app/locations/[state]/page.tsx"],
  glossary: [
    "lib/content/glossary.ts",
    "app/glossary/[term]/page.tsx",
    "components/sections/PrimarySources.tsx",
  ],
  denialCodes: [
    "lib/content/denial-code-details.ts",
    "lib/content/denial-codes.ts",
    "app/denial-codes/[code]/page.tsx",
    "components/sections/CodeIndex.tsx",
  ],
  modifiers: [
    "lib/content/modifiers.ts",
    "app/modifiers/[modifier]/page.tsx",
    "components/sections/CodeIndex.tsx",
  ],
  compare: ["lib/content/comparisons.ts", "app/compare/[slug]/page.tsx"],
  caseStudies: ["lib/content/case-studies.ts", "app/case-studies/[slug]/page.tsx"],
  // Blog posts carry their own editorial `updated` date, which is a human
  // review date and a better signal than a commit timestamp. Not derived here.
  blogTemplate: ["app/blog/[slug]/page.tsx"],
  core: ["lib/content/site.ts", "app/layout.tsx"],
};

const map = Object.fromEntries(Object.entries(GROUPS).map(([k, v]) => [k, newest(v)]));

writeFileSync(
  new URL("../lib/content/lastmod.json", import.meta.url),
  `${JSON.stringify(map, null, 2)}\n`,
);

console.log("wrote lib/content/lastmod.json");
for (const [k, v] of Object.entries(map)) console.log(`  ${k.padEnd(14)} ${v.slice(0, 10)}`);
