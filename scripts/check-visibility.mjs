/**
 * The leading indicators, in the order they must fire.
 *
 * Rankings are a lagging signal — by the time they move, the causes are weeks
 * old. These are the checks that tell you whether the chain is progressing,
 * and each one gates the next:
 *
 *   1. an Archive capture appears   (something on the open web links here)
 *   2. pages enter the index        (Google decides we are worth storing)
 *   3. impressions                  (we appear for queries)      — GSC only
 *   4. clicks                       (we appear high enough)      — GSC only
 *
 * Steps 1 and 2 are checkable from here without any account. Run weekly:
 *   node scripts/check-visibility.mjs
 *
 * Baseline on 2026-09-01, before the first guest-post pitch was answered:
 * zero archive captures in 15 months, and the exact-phrase test returning
 * nothing. Both should change before rankings do.
 */
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";

const get = async (url, timeout = 45000) => {
  const res = await fetch(url, { headers: { "user-agent": UA }, signal: AbortSignal.timeout(timeout) });
  return res.text();
};

console.log("Vizora visibility check\n" + "=".repeat(52));

// ── 1. Archive captures — a proxy for "does anything link here" ────────────
// archive.org crawls by following links from the open web, so a capture of a
// site nobody links to essentially does not happen.
try {
  const cdx = await get(
    "https://web.archive.org/cdx/search/cdx?url=vizora.co*&from=20250101&output=json&fl=timestamp&limit=200",
  );
  const rows = JSON.parse(cdx);
  const n = Array.isArray(rows) && rows.length > 1 ? rows.length - 1 : 0;
  console.log(`\n1. Archive captures since 2025:  ${n}`);
  console.log(n === 0
    ? "   ✗ still zero — nothing on the open web links here yet"
    : `   ✓ ${n} capture(s) — something is linking. First real signal.`);
} catch {
  console.log("\n1. Archive captures: could not check (archive.org unreachable)");
}

// ── 2. Indexation — an exact phrase that exists only on our page ──────────
// Chosen because it is 12 words of ordinary prose that no other page would
// coincidentally contain. If the page is indexed, this finds it.
const NEEDLE = "would have produced twenty separate investigations of the same single cause";
console.log(`\n2. Indexation probe`);
console.log(`   phrase: "${NEEDLE.slice(0, 46)}…"`);
console.log(`   source: /denial-codes/co-16`);
console.log(`   → Search that exact phrase in quotes on Google and Bing.`);
console.log(`     No vizora.co result = still not indexed.`);
console.log(`     This is the single clearest free signal we have.`);

// ── 3. Is the page still serving the phrase we are testing for? ───────────
// A test that silently stops matching the live page tells you nothing.
try {
  const html = await get("https://vizora.co/denial-codes/co-16");
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
  console.log(
    text.includes(NEEDLE)
      ? "   ✓ phrase still present on the live page — probe is valid"
      : "   ✗ PHRASE NO LONGER ON THE PAGE — pick a new probe, this test is dead",
  );
} catch {
  console.log("   ? could not fetch the page to confirm the probe");
}

// ── 4. Crawler-facing basics that must not regress ────────────────────────
console.log("\n3. Crawl surface");
for (const [label, url] of [
  ["sitemap.xml", "https://vizora.co/sitemap.xml"],
  ["robots.txt", "https://vizora.co/robots.txt"],
  ["indexnow key", "https://vizora.co/indexnow-key.txt"],
]) {
  try {
    const res = await fetch(url, { headers: { "user-agent": UA }, signal: AbortSignal.timeout(20000) });
    const extra = label === "sitemap.xml" ? ` (${(await res.text()).split("<loc>").length - 1} URLs)` : "";
    console.log(`   ${res.status === 200 ? "✓" : "✗"} ${label.padEnd(14)} ${res.status}${extra}`);
  } catch {
    console.log(`   ✗ ${label.padEnd(14)} unreachable`);
  }
}

console.log("\n" + "=".repeat(52));
console.log("Nothing below step 1 moves until step 1 does.");
