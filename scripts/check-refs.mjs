import { readFileSync } from "node:fs";

/**
 * Static check that every citation mapping in lib/content/citations.ts points
 * at something that exists.
 *
 * Three failure modes this catches, all of which have happened:
 *  - a ref id that does not exist in external.ts (typo, or a ref renamed)
 *  - a glossary or specialty slug that was guessed rather than looked up
 *  - a denial code or modifier code that is not in the dataset
 *
 * Deliberately regex over source rather than importing the TypeScript: this
 * runs before a build and must not depend on one.
 */
const read = (p) => readFileSync(new URL(`../${p}`, import.meta.url), "utf8");
const all = (src, re) => [...src.matchAll(re)].map((m) => m[1]);

// Scan only the externalRefs array. `externalCategories` above it also has
// `id:` keys at the same indent, and a mapping citing "regulation" as if it
// were a source would otherwise pass this check.
const externalSrc = read("lib/content/external.ts");
const refsArray = externalSrc.slice(externalSrc.indexOf("export const externalRefs"));
const refIds = new Set(all(refsArray, /^    id: "([^"]+)"/gm));
const denialCodes = new Set(all(read("lib/content/denial-codes.ts"), /\{ code: "([^"]+)"/g));
const modifierCodes = new Set(all(read("lib/content/modifiers.ts"), /^    code: "([^"]+)"/gm));
const specialtySlugs = new Set(all(read("lib/content/specialties.ts"), /^    slug: "([^"]+)"/gm));

// Glossary slugs are derived from `term` via slugify(), same rule as lib/utils.
const slugify = (s) =>
  s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
const glossarySlugs = new Set(
  all(read("lib/content/glossary.ts"), /^    term: "([^"]+)"/gm).map(slugify),
);

const serviceSlugs = new Set(all(read("lib/content/services.ts"), /^\s{2,4}slug: "([^"]+)"/gm));

const src = read("lib/content/citations.ts");
const problems = [];

// The cross-reference arrays on each denial code and modifier entry. These are
// hand-written slugs and every category of them has been wrong at least once,
// which is why they are checked rather than trusted.
const crossRefs = [
  ["denial-code-details.ts", "lib/content/denial-code-details.ts"],
  ["modifiers.ts", "lib/content/modifiers.ts"],
];
for (const [label, path] of crossRefs) {
  const body = read(path);
  const field = (name) =>
    [...body.matchAll(new RegExp(`^    ${name}: \\[([^\\]]*)\\]`, "gm"))].flatMap((m) =>
      all(m[1], /"([^"]+)"/g),
    );
  for (const t of new Set(field("relatedTerms")))
    if (!glossarySlugs.has(t)) problems.push(`${label}: relatedTerms not a glossary slug: ${t}`);
  for (const sv of new Set(field("relatedServices")))
    if (!serviceSlugs.has(sv)) problems.push(`${label}: relatedServices not a service slug: ${sv}`);
  for (const c of new Set(field("relatedCodes")))
    if (!denialCodes.has(c) && !modifierCodes.has(c))
      problems.push(`${label}: relatedCodes not a known code: ${c}`);
  for (const m of new Set(field("relatedModifiers")))
    if (!modifierCodes.has(m)) problems.push(`${label}: relatedModifiers not a modifier: ${m}`);
}

// Every quoted id inside a ref-id array position must resolve.
for (const [, list] of src.matchAll(/:\s*\[([^\]]*)\]/g)) {
  for (const id of all(list, /"([^"]+)"/g)) {
    if (!refIds.has(id)) problems.push(`unknown ref id: ${id}`);
  }
}

const keysOf = (name) => {
  const m = src.match(new RegExp(`const ${name}[^=]*=\\s*\\{([\\s\\S]*?)\\n\\};`));
  if (!m) return [];
  return all(m[1], /^\s{2}"?([A-Za-z0-9-]+)"?:\s*\[/gm);
};

for (const k of keysOf("denialOverrides"))
  if (!denialCodes.has(k)) problems.push(`denialOverrides key not a denial code: ${k}`);
for (const k of keysOf("modifierOverrides"))
  if (!modifierCodes.has(k)) problems.push(`modifierOverrides key not a modifier: ${k}`);
for (const k of keysOf("glossaryOverrides"))
  if (!glossarySlugs.has(k)) problems.push(`glossaryOverrides key not a glossary slug: ${k}`);
for (const k of keysOf("specialtyOverrides"))
  if (!specialtySlugs.has(k)) problems.push(`specialtyOverrides key not a specialty slug: ${k}`);

console.log(
  `refs=${refIds.size} denials=${denialCodes.size} modifiers=${modifierCodes.size} ` +
    `glossary=${glossarySlugs.size} specialties=${specialtySlugs.size}`,
);
if (problems.length) {
  console.error(`\n${problems.length} problem(s):`);
  for (const p of problems) console.error(`  ✗ ${p}`);
  process.exit(1);
}
// Coverage: a page type where some entries fall through to no refs at all is
// the failure this whole exercise exists to prevent.
const arrays = [...src.matchAll(/:\s*\[([^\]]*)\]/g)].map((m) => all(m[1], /"([^"]+)"/g).length);
const min = Math.min(...arrays);
const avg = (arrays.reduce((a, b) => a + b, 0) / arrays.length).toFixed(1);
console.log(`mappings=${arrays.length} refs/page min=${min} avg=${avg}`);
if (min < 2) {
  console.error("✗ a mapping cites fewer than 2 sources");
  process.exit(1);
}
console.log("✓ every citation mapping resolves");
