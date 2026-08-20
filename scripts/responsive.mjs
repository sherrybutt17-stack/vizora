import puppeteer from "puppeteer";
const BASE = "http://localhost:3000";
const VIEWPORTS = [
  { name: "mobile-sm", w: 320, h: 700 },
  { name: "mobile",    w: 390, h: 844 },
  { name: "tablet",    w: 768, h: 1024 },
  { name: "laptop",    w: 1280, h: 800 },
  { name: "desktop",   w: 1440, h: 900 },
  { name: "wide",      w: 1920, h: 1080 },
];
const PAGES = ["/", "/services", "/specialties/cardiology", "/locations/texas",
  "/pricing", "/tools/revenue-leak-calculator", "/tools/denial-code-lookup",
  "/case-studies", "/blog/what-is-revenue-cycle-management", "/contact",
  "/glossary", "/glossary/days-in-ar", "/compare",
  "/compare/in-house-vs-outsourced-medical-billing", "/resources", "/sitemap"];

const b = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
let bad = 0;
for (const vp of VIEWPORTS) {
  const page = await b.newPage();
  await page.setViewport({ width: vp.w, height: vp.h });
  const rows = [];
  for (const path of PAGES) {
    await page.goto(BASE + path, { waitUntil: "domcontentloaded", timeout: 40000 });
    await new Promise(r => setTimeout(r, 350));
    const r = await page.evaluate(() => {
      const de = document.documentElement;
      const overflow = de.scrollWidth - de.clientWidth;
      const offenders = [];
      if (overflow > 1) {
        document.querySelectorAll("body *").forEach(el => {
          const rect = el.getBoundingClientRect();
          if (rect.width > 0 && (rect.right > de.clientWidth + 1 || rect.left < -1)) {
            const cs = getComputedStyle(el);
            if (cs.position === "fixed") return;
            // only report the element itself, not every ancestor
            if (offenders.some(o => el.contains(o.node))) return;
            offenders.push({ node: el, tag: el.tagName.toLowerCase(),
              cls: (el.className?.toString?.()||"").slice(0,70),
              right: Math.round(rect.right) });
          }
        });
      }
      // tap-target check on small screens (WCAG 2.5.8, 24x24 minimum).
      //
      // Two exclusions, both of which the success criterion itself grants:
      //   - Visually hidden controls (the skip link) render at 1x1 until
      //     focused, at which point they are full size. Counting them meant
      //     every page reported a phantom failure.
      //   - "Inline": a target inside a sentence, whose size is constrained by
      //     the line-height of the surrounding text, is exempt. A source
      //     citation inside a figcaption qualifies; a link in a navigation
      //     list does not.
      let tiny = 0;
      if (de.clientWidth < 500) {
        const hidden = (el) => {
          const cs = getComputedStyle(el);
          return cs.clipPath !== "none" || cs.visibility === "hidden" || el.closest(".sr-only");
        };
        const inlineInSentence = (el) => {
          if (getComputedStyle(el).display !== "inline") return false;
          const parent = el.parentElement;
          if (!parent) return false;
          // Sentence context = the parent holds text beyond this target alone.
          const own = (el.textContent || "").trim();
          const all = (parent.textContent || "").trim();
          return all.length > own.length + 3;
        };
        document.querySelectorAll("a,button").forEach(el => {
          const r = el.getBoundingClientRect();
          if (r.width === 0 || r.height === 0) return;
          if (r.height >= 24 && r.width >= 24) return;
          if (hidden(el) || inlineInSentence(el)) return;
          tiny++;
        });
      }
      return { overflow, offenders: offenders.slice(0,3).map(o=>`${o.tag}.${o.cls} (right:${o.right})`), tiny };
    });
    if (r.overflow > 1) { rows.push(`   ✗ ${path}  overflow +${r.overflow}px  ${r.offenders.join(" | ")}`); bad++; }
    else if (r.tiny > 0) { rows.push(`   ⚠ ${path}  ${r.tiny} small tap targets`); }
  }
  console.log(`\n${vp.name} (${vp.w}px)` + (rows.length ? "" : "  ✓ all clean"));
  rows.forEach(x => console.log(x));
  await page.close();
}
console.log(`\n=== ${bad} overflow failure(s) ===`);
await b.close();
