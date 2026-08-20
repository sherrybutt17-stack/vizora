import puppeteer from "puppeteer";

/**
 * Internal link graph audit.
 *
 * Finds two things that quietly cap a large templated site:
 *  - orphans: pages in the sitemap that nothing links to, so crawlers reach
 *    them only via the sitemap and they accrue no internal authority.
 *  - broken internal links: hrefs that 404.
 *
 * Also reports click depth from the homepage, since anything deeper than 3
 * is materially harder to get crawled and ranked.
 */
const BASE = "http://localhost:3000";
const xml = await (await fetch(`${BASE}/sitemap.xml`)).text();
const sitemap = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map(m => m[1].replace(/^https:\/\/vizora\.co/, "") || "/");

const b = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"], timeout: 120000, protocolTimeout: 180000 });
const p = await b.newPage();
await p.setJavaScriptEnabled(false);

const linksFrom = new Map();
for (const path of sitemap) {
  await p.goto(BASE + path, { waitUntil: "domcontentloaded" });
  const hrefs = await p.evaluate(() =>
    [...document.querySelectorAll("a[href]")]
      .map(a => a.getAttribute("href"))
      .filter(h => h && h.startsWith("/") && !h.startsWith("//"))
      .map(h => h.split("#")[0].split("?")[0])
      .filter(Boolean)
  );
  linksFrom.set(path, [...new Set(hrefs)]);
}
await b.close();

const inbound = new Map(sitemap.map(u => [u, 0]));
const allTargets = new Set();
for (const [, hrefs] of linksFrom) for (const h of hrefs) {
  allTargets.add(h);
  if (inbound.has(h)) inbound.set(h, inbound.get(h) + 1);
}

// click depth via BFS from "/"
const depth = new Map([["/", 0]]);
let frontier = ["/"];
while (frontier.length) {
  const next = [];
  for (const cur of frontier) for (const h of linksFrom.get(cur) || []) {
    if (!depth.has(h) && inbound.has(h)) { depth.set(h, depth.get(cur) + 1); next.push(h); }
  }
  frontier = next;
}

const orphans = [...inbound].filter(([, n]) => n === 0).map(([u]) => u);
const weak = [...inbound].filter(([, n]) => n > 0 && n <= 2).map(([u, n]) => `${n} ${u}`);
const deep = [...depth].filter(([, d]) => d > 3).map(([u, d]) => `d${d} ${u}`);
const unreached = sitemap.filter(u => !depth.has(u));
const broken = [...allTargets].filter(h => !inbound.has(h));

const show = (n, a, lim = 12) => {
  console.log(`\n${n}: ${a.length}`);
  a.slice(0, lim).forEach(x => console.log("   ", x));
  if (a.length > lim) console.log(`    ... +${a.length - lim} more`);
};
console.log(`crawled ${sitemap.length} sitemap urls`);
show("ORPHANS (0 inbound internal links)", orphans);
show("unreachable from / by internal links", unreached);
show("click depth > 3", deep);
show("weak (1-2 inbound links)", weak, 8);
show("internal hrefs not in sitemap (check for 404s)", broken);
