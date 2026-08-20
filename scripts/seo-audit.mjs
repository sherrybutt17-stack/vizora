import puppeteer from "puppeteer";

/**
 * Title / meta / heading sweep across every URL in the sitemap.
 *
 * Checks the things that silently degrade a large templated site: titles that
 * truncate in the SERP, duplicate titles or descriptions across templated
 * routes, missing or multiple H1s, and missing canonicals.
 */
const BASE = "http://localhost:3000";
const res = await fetch(`${BASE}/sitemap.xml`);
const xml = await res.text();
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((m) => m[1].replace(/^https:\/\/vizora\.co/, BASE));

const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"], timeout: 120000, protocolTimeout: 180000 });
const page = await browser.newPage();
await page.setJavaScriptEnabled(false); // metadata is server-rendered

const rows = [];
for (const u of urls) {
  const r = await page.goto(u, { waitUntil: "domcontentloaded" });
  if (!r || r.status() !== 200) { rows.push({ u, status: r ? r.status() : 0 }); continue; }
  const d = await page.evaluate(() => ({
    title: document.title || "",
    desc: document.querySelector('meta[name="description"]')?.content || "",
    canonical: document.querySelector('link[rel="canonical"]')?.href || "",
    h1s: [...document.querySelectorAll("h1")].map((h) => h.textContent.trim()),
  }));
  rows.push({ u, status: 200, ...d });
}
await browser.close();

const path = (u) => u.replace(BASE, "") || "/";
const bad = { status: [], titleLong: [], titleShort: [], descLong: [], descShort: [], noDesc: [], h1: [], canon: [] };
const titles = new Map(), descs = new Map();

for (const r of rows) {
  if (r.status !== 200) { bad.status.push(`${path(r.u)} -> ${r.status}`); continue; }
  const tl = r.title.length, dl = r.desc.length;
  if (tl > 60) bad.titleLong.push(`${tl} ${path(r.u)}`);
  if (tl > 0 && tl < 25) bad.titleShort.push(`${tl} ${path(r.u)}`);
  if (!r.desc) bad.noDesc.push(path(r.u));
  else {
    if (dl > 160) bad.descLong.push(`${dl} ${path(r.u)}`);
    if (dl < 70) bad.descShort.push(`${dl} ${path(r.u)}`);
  }
  if (r.h1s.length !== 1) bad.h1.push(`${r.h1s.length} H1 ${path(r.u)}`);
  if (!r.canonical) bad.canon.push(path(r.u));
  titles.set(r.title, [...(titles.get(r.title) || []), path(r.u)]);
  descs.set(r.desc, [...(descs.get(r.desc) || []), path(r.u)]);
}

const dupT = [...titles].filter(([t, v]) => t && v.length > 1);
const dupD = [...descs].filter(([d, v]) => d && v.length > 1);

const show = (name, arr, limit = 12) => {
  console.log(`\n${name}: ${arr.length}`);
  arr.slice(0, limit).forEach((x) => console.log("   ", x));
  if (arr.length > limit) console.log(`    ... +${arr.length - limit} more`);
};
console.log(`audited ${rows.length} urls`);
show("non-200", bad.status);
show("title > 60 chars", bad.titleLong);
show("title < 25 chars", bad.titleShort);
show("missing description", bad.noDesc);
show("description > 160", bad.descLong);
show("description < 70", bad.descShort);
show("H1 count != 1", bad.h1);
show("missing canonical", bad.canon);
console.log(`\nduplicate titles: ${dupT.length}`);
dupT.slice(0, 8).forEach(([t, v]) => console.log(`    "${t.slice(0, 60)}" x${v.length}: ${v.slice(0,3).join(", ")}`));
console.log(`duplicate descriptions: ${dupD.length}`);
dupD.slice(0, 8).forEach(([d, v]) => console.log(`    "${d.slice(0, 60)}" x${v.length}: ${v.slice(0,3).join(", ")}`));
