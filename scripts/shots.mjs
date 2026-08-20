import puppeteer from "puppeteer";
const b = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
for (const [name, w, h] of [["desktop",1440,900],["laptop",1280,800],["mobile",390,844]]) {
  const p = await b.newPage();
  await p.setViewport({ width: w, height: h, deviceScaleFactor: 2 });
  await p.goto("http://localhost:3000/", { waitUntil: "networkidle0" });
  await new Promise(r=>setTimeout(r,2600));
  await p.screenshot({ path: `/tmp/qa/home-${name}.png` });
  await p.close();
}
await b.close();
console.log("shots captured");
