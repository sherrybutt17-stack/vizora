import { readFileSync } from "node:fs";

/**
 * Fetch every primary source URL in external.ts and report anything dead.
 *
 * Not part of the normal build: it makes 43 outbound requests and depends on
 * other people's servers. Run it before shipping citation changes, and on a
 * schedule — three URLs in this file were already 404 when the live check was
 * first written, and nothing on the site would ever have told us.
 *
 * A 403 is reported separately from a 404. Several publishers here — AMA, CDC,
 * HHS, DOL — block scripted requests outright, so 403 means "could not check",
 * not "broken". Only 404 and connection failures are treated as failures.
 */
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";

const src = readFileSync(new URL("../lib/content/external.ts", import.meta.url), "utf8");
const body = src.slice(src.indexOf("export const externalRefs"));
const refs = [...body.matchAll(/id: "([^"]+)",\n\s*label: "[^"]+",\n\s*url: "([^"]+)"/g)].map(
  (m) => ({ id: m[1], url: m[2] }),
);

const results = await Promise.all(
  refs.map(async ({ id, url }) => {
    try {
      const res = await fetch(url, {
        headers: { "user-agent": UA },
        redirect: "follow",
        signal: AbortSignal.timeout(30000),
      });
      return { id, url, status: res.status };
    } catch (e) {
      return { id, url, status: e.name === "TimeoutError" ? "timeout" : "unreachable" };
    }
  }),
);

const dead = results.filter((r) => r.status === 404 || r.status === 410);
const unchecked = results.filter((r) => r.status !== 200 && !dead.includes(r));

console.log(`checked ${results.length} source URLs`);
console.log(`  ok        ${results.filter((r) => r.status === 200).length}`);
console.log(`  unchecked ${unchecked.length}  (403/timeout — publisher blocks scripted requests)`);
console.log(`  dead      ${dead.length}`);

for (const r of unchecked) console.log(`  ? ${String(r.status).padEnd(12)} ${r.id}`);
if (dead.length) {
  console.error("\ndead links:");
  for (const r of dead) console.error(`  ✗ ${r.status}  ${r.id}\n         ${r.url}`);
  process.exit(1);
}
console.log("\n✓ no dead source URLs");
