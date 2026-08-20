import puppeteer from "puppeteer";
const b = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 900 });
await p.goto("http://localhost:3000/", { waitUntil: "networkidle0" });

// slow, human-like scroll
await p.evaluate(async () => {
  await new Promise((res) => {
    let y = 0;
    const step = () => {
      window.scrollBy(0, 300);
      y += 300;
      if (y < document.body.scrollHeight) setTimeout(step, 120);
      else res();
    };
    step();
  });
});
await new Promise(r => setTimeout(r, 2500));

const info = await p.$$eval("[data-countup]", (els) =>
  els.map((e) => {
    const r = e.getBoundingClientRect();
    // walk up to find a motion wrapper and read its opacity
    let n = e, op = null;
    for (let i = 0; i < 8 && n; i++) {
      const o = getComputedStyle(n).opacity;
      if (o !== "1") { op = o; break; }
      n = n.parentElement;
    }
    return {
      want: e.getAttribute("data-countup"),
      got: e.textContent.trim(),
      top: Math.round(r.top),
      wrapperOpacity: op,
    };
  })
);
console.table(info);
await b.close();
