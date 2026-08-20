import puppeteer from "puppeteer";
const b = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
const page = await b.newPage();
await page.setViewport({ width: 320, height: 700 });
for (const path of ["/", "/tools/revenue-leak-calculator", "/contact"]) {
  await page.goto("http://localhost:3000" + path, { waitUntil: "networkidle0" });
  await new Promise(r=>setTimeout(r,400));
  const res = await page.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const out = [];
    const clipped = (el) => {
      let n = el.parentElement;
      while (n) {
        const o = getComputedStyle(n);
        if (/hidden|clip|auto|scroll/.test(o.overflowX)) return true;
        n = n.parentElement;
      }
      return false;
    };
    document.querySelectorAll("body *").forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.width === 0) return;
      if (r.right <= vw + 1 && r.left >= -1) return;
      if (getComputedStyle(el).position === "fixed") return;
      if (clipped(el)) return;
      out.push(`${el.tagName.toLowerCase()}.${(el.className?.toString?.()||"").slice(0,60)} w=${Math.round(r.width)} right=${Math.round(r.right)}`);
    });
    return { vw, scrollW: document.documentElement.scrollWidth, out: out.slice(0,6) };
  });
  console.log(`\n${path}  vw=${res.vw} scrollWidth=${res.scrollW}`);
  res.out.forEach(o => console.log("   " + o));
  if (!res.out.length) console.log("   (no unclipped offenders — overflow may come from a clipped ancestor)");
}
await b.close();
