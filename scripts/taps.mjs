import puppeteer from "puppeteer";
const BASE = "http://localhost:3000";
const paths = process.argv.slice(2);
const b = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
const page = await b.newPage();
await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
for (const p of paths) {
  await page.goto(BASE + p, { waitUntil: "domcontentloaded" });
  await new Promise(r => setTimeout(r, 400));
  const bad = await page.evaluate(() => {
    const out = [];
    for (const el of document.querySelectorAll("a,button,input,select,[role=button]")) {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      if (r.height >= 24 && r.width >= 24) continue;
      out.push({
        tag: el.tagName, h: Math.round(r.height), w: Math.round(r.width),
        cls: (el.className || "").toString().slice(0, 60),
        text: (el.textContent || "").trim().slice(0, 30),
        parent: el.parentElement?.tagName + "." + (el.parentElement?.className || "").toString().slice(0, 40),
      });
    }
    return out.slice(0, 12);
  });
  console.log("\n##", p, `(${bad.length} shown)`);
  for (const x of bad) console.log(`  ${x.tag} ${x.w}x${x.h} "${x.text}" | ${x.cls} | in ${x.parent}`);
}
await b.close();
