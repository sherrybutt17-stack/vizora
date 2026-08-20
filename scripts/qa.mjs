import puppeteer from "puppeteer";

const BASE = "http://localhost:3000";
const PAGES = process.argv[2] ? [process.argv[2]] : [
  "/", "/services", "/services/denial-management", "/specialties",
  "/specialties/cardiology", "/locations/texas", "/case-studies",
  "/pricing", "/tools/revenue-leak-calculator", "/tools/denial-code-lookup",
  "/resources/rcm-benchmarks", "/blog", "/blog/what-is-revenue-cycle-management",
  "/faq", "/about", "/contact", "/referral", "/thank-you",
  "/glossary", "/glossary/days-in-ar", "/glossary/carc",
  "/compare", "/compare/in-house-vs-outsourced-medical-billing",
  "/compare/denial-management-vs-denial-prevention",
  "/resources", "/sitemap",
];

// Server-rendered text of every element carrying data-countup, in order.
async function ssrCounters(path) {
  const html = await (await fetch(BASE + path)).text();
  return [...html.matchAll(/data-countup="([^"]*)"/g)].map((m) =>
    m[1].replace(/&amp;/g, "&").replace(/&#x27;/g, "'"),
  );
}

const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
let issues = 0;

for (const path of PAGES) {
  const found = [];
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  page.on("console", (m) => {
    if (m.type() !== "error" && m.type() !== "warning") return;
    const t = m.text();
    if (/React DevTools/.test(t)) return;
    found.push(`[console.${m.type()}] ${t.slice(0, 160)}`);
  });
  page.on("pageerror", (e) => found.push(`[pageerror] ${String(e).slice(0, 160)}`));
  page.on("requestfailed", (r) => found.push(`[failed] ${r.url().replace(BASE, "")}`));

  try {
    await page.goto(BASE + path, { waitUntil: "networkidle0", timeout: 45000 });
    await page.evaluate(async () => {
      await new Promise((res) => {
        let y = 0;
        const step = () => {
          window.scrollBy(0, 500);
          y += 500;
          if (y < document.body.scrollHeight + 1500) setTimeout(step, 55);
          else res();
        };
        step();
      });
    });
    await new Promise((r) => setTimeout(r, 3000)); // well past any animation

    const expected = await ssrCounters(path);
    const actual = await page.$$eval("[data-countup]", (els) =>
      els.map((e) => (e.textContent || "").trim()),
    );

    if (expected.length !== actual.length) {
      found.push(`[counter] count mismatch ssr=${expected.length} dom=${actual.length}`);
    } else {
      expected.forEach((exp, i) => {
        if (exp !== actual[i]) found.push(`[counter STUCK] expected "${exp}" but shows "${actual[i]}"`);
      });
    }
    // Re-read after another second: a value that is still changing is looping.
    await new Promise((r) => setTimeout(r, 1200));
    const second = await page.$$eval("[data-countup]", (els) => els.map((e) => (e.textContent || "").trim()));
    second.forEach((v, i) => {
      if (v !== actual[i]) found.push(`[counter LOOPING] index ${i}: "${actual[i]}" -> "${v}"`);
    });
  } catch (e) {
    found.push(`[harness] ${String(e).slice(0, 140)}`);
  }

  const uniq = [...new Set(found)];
  if (uniq.length) {
    console.log(`\n✗ ${path}  (${uniq.length})`);
    uniq.slice(0, 8).forEach((i) => console.log("   " + i));
    issues += uniq.length;
  } else console.log(`✓ ${path}`);
  await page.close();
}
console.log(`\n=== ${issues} issue(s) across ${PAGES.length} pages ===`);
await browser.close();
