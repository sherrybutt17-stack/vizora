import { readFileSync } from "node:fs";

/**
 * Submit every sitemap URL to IndexNow.
 *
 * Run after a deploy that adds or materially changes pages. Bing is the index
 * behind ChatGPT search, and it crawls a sitemap on its own schedule — on
 * 2026-08-25 it had discovered 217 of what by 2026-08-28 were 278 URLs. Until
 * a page is in the index it cannot be cited, however good it is.
 *
 *   node scripts/indexnow-submit.mjs                  # submit everything
 *   node scripts/indexnow-submit.mjs --only /blog/    # submit a path prefix
 *   node scripts/indexnow-submit.mjs --dry-run        # print, submit nothing
 *
 * Reads the LIVE sitemap, not the local build, because submitting a URL that
 * is not yet deployed teaches the crawler that this host serves 404s.
 */
const src = readFileSync(new URL("../lib/ai/indexnow.ts", import.meta.url), "utf8");
const pick = (name) => src.match(new RegExp(`${name} = "([^"]+)"`))?.[1];
const KEY = pick("INDEXNOW_KEY");
const KEY_PATH = pick("INDEXNOW_KEY_PATH");
const ENDPOINT = pick("INDEXNOW_ENDPOINT");
if (!KEY || !KEY_PATH || !ENDPOINT) throw new Error("could not read indexnow config");

const HOST = "vizora.co";
const BASE = `https://${HOST}`;
const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const only = args[args.indexOf("--only") + 1];

// The key file has to be live and serving the key, or every submission 403s.
const keyRes = await fetch(`${BASE}${KEY_PATH}`);
const served = (await keyRes.text()).trim();
if (keyRes.status !== 200 || served !== KEY) {
  console.error(`✗ key file at ${BASE}${KEY_PATH} returned ${keyRes.status}` +
    (keyRes.status === 200 ? ` and did not match the key` : "") +
    `\n  Deploy before submitting — the engines fetch this to verify ownership.`);
  process.exit(1);
}
console.log(`✓ key file verified at ${BASE}${KEY_PATH}`);

const xml = await (await fetch(`${BASE}/sitemap.xml`)).text();
let urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (only) urls = urls.filter((u) => u.replace(BASE, "").startsWith(only));
if (!urls.length) {
  console.error(`✗ no URLs matched${only ? ` --only ${only}` : ""}`);
  process.exit(1);
}
console.log(`  ${urls.length} URL(s) to submit${only ? ` (filtered: ${only})` : ""}`);

if (dryRun) {
  for (const u of urls.slice(0, 10)) console.log(`    ${u}`);
  if (urls.length > 10) console.log(`    … and ${urls.length - 10} more`);
  console.log("\n(dry run — nothing submitted)");
  process.exit(0);
}

// The spec allows 10,000 per request; batches of 1000 keep the payload small
// enough that a failure is cheap to retry.
const BATCH = 1000;
let submitted = 0;
for (let i = 0; i < urls.length; i += BATCH) {
  const urlList = urls.slice(i, i + BATCH);
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${BASE}${KEY_PATH}`, urlList }),
  });
  const label = `batch ${i / BATCH + 1} (${urlList.length} URLs)`;
  if (res.status === 200 || res.status === 202) {
    submitted += urlList.length;
    console.log(`  ✓ ${label} accepted (${res.status})`);
  } else {
    // 403 = key not verified, 422 = URLs do not match the host, 429 = throttled.
    console.error(`  ✗ ${label} failed: ${res.status} ${await res.text()}`);
    process.exit(1);
  }
}
console.log(`\n✓ ${submitted} URL(s) submitted to IndexNow`);
console.log("  Shared with Bing, Yandex, Seznam and Naver. Indexing is not instant,");
console.log("  but discovery is — the crawlers no longer have to find these on their own.");
