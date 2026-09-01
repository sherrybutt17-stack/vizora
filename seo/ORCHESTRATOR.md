# SEO orchestrator

The coordination layer over [SKILL-REGISTRY.md](SKILL-REGISTRY.md) and
[SKILL-MATRIX.csv](SKILL-MATRIX.csv). Every job has an owner, evidence, and a
way to tell whether it worked.

Written 2026-09-01, immediately after the CPT build shipped.

---

## The one fact that sets build order

Search Console, 166 queries / 1,793 impressions, read 2026-08-31 — median
position by page type:

| Cluster | Impressions | Median position |
| --- | ---: | ---: |
| Location | 1,094 | 87.7 |
| Glossary | 364 | 83.9 |
| **Denial codes** | 124 | **21.0** |
| Modifiers | 36 | 58.2 |
| CPT codes | 25 | 68.0 (with no CPT page existing) |

**Build order follows winnability, not volume.** Specific technical reference
queries against weak SERPs rank on this domain; broad commercial queries do
not. Location pages at 1,094 impressions and position 88 are an authority
ceiling, not a content problem — do not spend effort there.

This principle has been tested once and held. Commit 786a5fd cancelled 136
denial-code pages on a volume reading; commit 577a163 reversed that after the
position data arrived, and those pages are now live.

---

## Job queue

### 1. CPT reference — DONE 2026-09-01

**What** 26 CPT pages plus a hub at `/cpt-codes`.
**Why** Ranking 58–74 for `cpt 96413` and `98941` with no page in existence,
and 132 CPT codes named across `specialties.ts` with nowhere to link.
**How** Typed data module → route → hub → sitemap, llms.txt, llms-full.txt,
nav, lastmod, citations, check-refs.
**Who** In-house data modules; verification by in-house scripts.
**Dependencies** None.
**Risk** Thin content across same-family codes; AMA descriptor copyright.
**Expected impact** Movement on already-impressed CPT queries within 2–6 weeks.
**Validation, measured** 8-word shingle overlap median 15.4% / max 24.7%
against a 35% bar; 1,174–1,401 words per page; 0 orphans; 0 duplicate titles;
445 sitemap URLs; 26 URLs accepted by IndexNow.

### 2a. First audit round — DONE 2026-09-02

**What** Four specialists run against the live site; six defects fixed, two
recommendations declined with reasons (conflict policy 6 and 7).
**Evidence** Every finding was re-verified against the live site or the source
before any change: the 404 robots conflict on four route shapes, the
`/services/../specialties/…` Service url on 75 pages, Organization properties
on the Service node, a $3.00 USD price published for a 3% rate, a `speakable`
selector on 53 pages with no matching element, and build-strategy commentary
rendered as body copy on one CPT page.
**Also fixed** The `LAST_UPDATED` constant that fed every page's schema dates
now reads the same git-derived `lastmod.json` the sitemap uses, across 29
consumers, with hub and standalone pages given their own groups rather than
inheriting the site-wide `core` date.
**Validation** 17 pages carrying a schema date agree with their sitemap entry;
the sitemap now spans six distinct dates instead of one.
**Note on the specialists themselves** Three of four hit their turn limits
mid-analysis and returned unusable fragments, having spent their budget on
shell exploration. Two produced strong reports only after being told to stop
fetching and report from what they had. If this pattern repeats, instruct them
to reserve turns for the report at spawn time.

### 2. Specialist system — DONE 2026-09-01

**What** This registry, matrix and orchestrator; claude-seo installed manually.
**Why** To put an owner on every SEO task and stop skill selection being ad hoc.
**Risk** A generic skill overwriting hand-built assets — see conflict policy.
**Validation** `claude-seo doctor` reports ready; `settings.json` carries no
hooks; the incumbent `seo-audit` skill survived the install intact.

### 3. Measure the CPT and denial builds — BLOCKED

**What** Are the 190 denial pages and 26 CPT pages actually indexed, and did
CPT positions move off 58–74?
**Why** Every subsequent build decision depends on this answer. It is also the
capability the whole claude-seo install was justified by.
**How** `claude-seo run gsc_inspect.py <url> --site-url sc-domain:vizora.co`
for indexation, `gsc_query.py` for position deltas.
**Who** claude-seo `seo-google`.
**Dependencies** **Google credentials — needs the owner.** Either a service
account JSON added as a user on the GSC property, or an OAuth
`client_secret.json` plus a browser flow. Config path:
`~/.config/claude-seo/google-api.json`.
**When** As soon as credentials exist; positions need ~2–6 weeks to settle.
**Risk** Low.
**Expected impact** Decides job 4.

### 4. RARC code reference — QUEUED, gated on job 3

**What** Long-form pages for the RARC codes that appear on real remittances.
**Why** Same query shape as the denial pages that rank at median 21. The site
has 3 RARC pages (MA130, N130, N657) and one referenced code with no page
(N290); MDClarity has 1,092.
**How** Extend `denial-code-details.ts`; the route, sitemap and checks already
handle RARC codes — they are in the same dataset.
**Dependencies** Job 3 confirms denial pages are indexed and ranking.
**Risk** Volume per code is low; the bet is aggregate long-tail capture.
**Validation** Same bars: ~450 words minimum, shingle overlap under 35%,
0 orphans, IndexNow submission after deploy.

### 5. Brand entity — BLOCKED ON OWNER, not on code

**What** Populate `site.social` so `organizationSchema()` emits `sameAs`.
**Why** `brand_entity` is capped at 6–7/10, brand search returns Vizient /
Vizor / Vizibill, and `vizora meaning` ranks 7th. Roughly 3 GEO points per page
plus all head-term competitive ranking sit behind this.
**How** Two live public profiles — Crunchbase, Clutch or HBMA. Copy is written.
**Dependencies** Owner action. Standing decisions are no GMB, no LinkedIn, no
published street address; those are respected and simply hold the ceiling.
**Risk** None technical. The schema picks profiles up with no code change.

---

## Conflict policy

Rule 7 of the brief: when two skills disagree, compare and decide, then write
the decision down. These are the standing decisions.

1. **GEO scoring — geo-optimizer is authoritative.** claude-seo's `seo-geo` is
   a second lens for citability analysis only. Two scoring systems produce a
   number nobody can falsify, and the 83→91 baseline is worth more than a
   second opinion.
2. **Never let a skill regenerate `robots.txt`, `llms.txt`, `llms-full.txt` or
   JSON-LD.** These are hand-built, score at or near full marks, and are
   generated from the same content modules that render the pages. Specifically:
   never run `geo fix --apply` against this repo.
3. **No skill introduces a statistic.** `lib/content/stats.ts` is the only
   place external numbers may be defined, each with publisher and data year.
   Its `REJECTED` block lists claims excluded for having no verifiable primary
   source; they are not to be reintroduced because a skill suggests them.
4. **No fabricated entity data.** No invented `sameAs`, address, founding year,
   certification or named author to satisfy a checker. This codebase has
   already removed unverified SOC 2, ISO 27001 and founding-year claims.
5. **Keyword-density warnings are false positives here.** geo-optimizer's
   `negative_penalty` fires on 216 of 250 pages — `/locations/idaho` for
   "idaho". Deliberately not chased.
6. **`HowTo` schema stays, against the schema specialist's recommendation.**
   It was flagged for removal because Google retired HowTo rich results in
   2023. But schema.org has not deprecated the type, this site optimises for
   citation rather than Google rich results, and structured step data is
   plausibly useful to an LLM parsing a process. The cost of keeping it is
   about a kilobyte on three templates. Removing valid structured data because
   one consumer stopped rewarding it is the wrong trade for this site.
7. **The `data-answer` block stays tight, against the GEO specialist's
   recommendation.** It was flagged as too short — 17 to 49 words against a
   claimed 134 to 167 words that engines "pull whole". That range was asserted
   without a source, and the same report separately found that this site's
   FAQPage answers (35 to 75 words, self-contained, question-headed) are its
   strongest citable asset and already exist on every reference page. Widening
   the hero block would either duplicate the fix text already rendered below it
   or stretch a `speakable` region past the length speakable is for. The tight
   answer and the long FAQ answers serve different consumers, and the site
   already ships both.
8. **In-house scripts outrank generic equivalents** on any task where they
   already run, because they read this site's real sitemap and templates.

---

## Specialist handoff protocol

Every specialist — skill, agent or script — reports in this shape. Anything
missing a section is not a finding yet.

```
FINDINGS        What was discovered, stated as fact.
EVIDENCE        The measurement or source. A number and where it came from.
RECOMMENDATIONS What should change, ranked.
IMPLEMENTATION  The exact files and edits.
RISK            What could go wrong, and what it would cost.
VALIDATION      The command that proves it worked.
NEXT ACTION     Which specialist takes it from here.
```

Standing rules for every handoff:

- **Falsifiability.** A recommendation must come with the check that would show
  it failed. "Improves SEO" is not a finding.
- **No silent scope cuts.** If coverage was capped — top-N, sampled, one page
  type — say so in FINDINGS. Silent truncation reads as completeness.
- **Measure before and after on the same build.** A stale `next start` on port
  3000 will serve the previous build to every check; confirm with
  `lsof -nP -iTCP:3000 -sTCP:LISTEN`, and after changing what
  `generateStaticParams` returns, `rm -rf .next` before trusting any number.

---

## Standing verification suite

```bash
npx tsc --noEmit
node scripts/check-refs.mjs          # cross-references and citations resolve
rm -rf .next && npm run build        # clean build; the cache lies otherwise
bash scripts/thin-content-audit.sh   # uniqueness bar
node scripts/link-audit.mjs          # orphans, depth, reachability
node scripts/seo-audit.mjs           # titles, descriptions, canonicals, H1s
node scripts/gen-lastmod.mjs && node scripts/check-lastmod.mjs
# after deploy only:
node scripts/indexnow-submit.mjs --only /<new-path>/
geo audit --url https://vizora.co --format rich --save-history
```

Push uses SSH over port 443 — port 22 fails from this machine:

```bash
GIT_SSH_COMMAND="ssh -p 443" git push git@ssh.github.com:sherrybutt17-stack/vizora.git main
```
