# SEO skill registry

Every skill evaluated for this site, with the evidence behind the verdict.
Compiled 2026-09-01. Scores are out of 10 per dimension, 50 overall.

The governing rule is the one the brief states: **use the minimum number of
skills that produces the best result.** A skill earns a place only where it
does something this repo's own scripts cannot. On most rows below, the
in-house script wins — it knows this site's sitemap, templates and content
modules, and it is the thing that has actually moved the numbers so far.

---

## Installed

### claude-seo — AgriciDaniel/claude-seo

| Field | Value |
| --- | --- |
| Repository | AgriciDaniel/claude-seo |
| URL | https://github.com/AgriciDaniel/claude-seo |
| Purpose | 25 SEO sub-skills + 18 specialist agents + 53 Python scripts |
| SEO specialty | Technical, E-E-A-T, schema, GEO, backlinks, Google APIs |
| Version | v2.2.5 (commit a1480c7) |
| Stars | 15,946 |
| Last update | 2026-08-26 |
| Quality score | Technical 9 · Capability 9 · Maintenance 9 · Safety 8 · Compatibility 9 = **44/50** |
| Security score | **8/10** — see review below |
| Installed? | Yes, 2026-09-01, **manual install** (not plugin) |
| Used for | GSC URL Inspection, GSC query, E-E-A-T review, schema validation, drift baselines |
| Dependencies | Python ≥3.10, Playwright Chromium (optional), Google API client libs |

**Security review performed before installing** (the brief requires it):

- `PRIVACY.md` — no telemetry, no usage tracking, no third-party calls in the
  free tier. Extensions call vendor APIs only when explicitly invoked.
- `install.sh` — writes only to `~/.claude/skills/*` and `~/.claude/agents/`.
  No sudo, no curl-piped execution, temp dir cleaned. No `settings.json` write.
- `hooks/hooks.json` — ships a **PostToolUse hook matching `Edit|Write`** that
  runs `validate-schema.py` on every edited file and can block with exit code 2.
  The script itself is benign (JSON-LD placeholder and validity checks) but the
  blast radius is every project on this machine, and it duplicates checks
  `lib/schema.tsx` already enforces. **This is why the install is manual: the
  manual path never registers the hook.** Verified after install —
  `~/.claude/settings.json` had no `hooks` key.
- MIT licensed, CI green, 410 tests, SECURITY.md present.

**Two install-time findings worth recording:**

1. **Name collision.** claude-seo ships a sub-skill named `seo-audit`, which is
   also the name of an installed marketingskills skill. `install.sh` does a
   plain `cp -r` and overwrote it. The incumbent was backed up beforehand and
   restored; claude-seo's version now lives at `seo-full-audit` (its
   frontmatter `name:` was updated to match). Its internals reference the
   `/seo audit` command rather than the directory, so the rename is safe.
   **Re-running `install.sh` will overwrite `seo-audit` again — back it up first.**
2. **Python floor.** It requires ≥3.10; this machine had only 3.9.6, no
   Homebrew, pyenv, uv or conda. Resolved by installing `uv` (0.12.7, to
   `~/.local/bin`, shell profile untouched) and CPython 3.13.15, then setting
   `env.CLAUDE_SEO_PYTHON` in `~/.claude/settings.json`. `claude-seo doctor`
   reports Runtime ready · Python 3.13 · Chromium ready. Note the uv installer
   skipped its own checksum verification because macOS has `shasum` rather than
   `sha256sum`.

### geo-optimizer — Auriti-Labs/geo-optimizer-skill

| Field | Value |
| --- | --- |
| URL | https://github.com/Auriti-Labs/geo-optimizer-skill |
| Purpose | AI-search citability audit, 0–100 across 8 categories |
| Version | installed 2026-08-27 · CLI in `~/.geo-optimizer-venv` |
| Stars | 746 · updated 2026-08-31 |
| Quality score | 8 · 8 · 9 · 8 · 8 = **41/50** · Security **8/10** |
| Installed? | Yes — **keep, and it stays the GEO scorekeeper** |
| Used for | The measured 83 → 91 baseline. Continuity matters more than a second opinion. |
| Notes | **Never run `geo fix --apply` here** — it overwrites hand-built robots.txt, llms.txt and JSON-LD with generic versions. Its `negative_penalty` keyword-density flag fires on 216 of 250 pages and is treated as a false positive. |

### marketingskills — coreyhaines31/marketingskills (48 skills)

| Field | Value |
| --- | --- |
| URL | https://github.com/coreyhaines31/marketingskills |
| Purpose | Strategy and writing across the whole marketing surface |
| Stars | 46,322 · updated 2026-08-28 |
| Quality score | 7 · 7 · 9 · 10 · 10 = **43/50** · Security **10/10** (markdown only, no executable code) |
| Installed? | Yes — keep |
| Used for | `ai-seo`, `seo-audit`, `schema`, `programmatic-seo`, `content-strategy` as methodology |

---

## Evaluated and rejected

| Skill | Stars | Updated | Score | Verdict and reason |
| --- | ---: | --- | ---: | --- |
| Bhanunamikaze/Agentic-SEO-Skill | 880 | 2026-07-23 | 39/50 | **Alternate.** Genuinely capable — 30+ Python analysers, clean multi-IDE installer, `.env` loader with no network calls. Rejected only for ~90% functional overlap with claude-seo. Reconsider if claude-seo is ever removed. |
| seo-skills/seo-audit-skill | 406 | 2026-08-31 | 36/50 | **Reject.** 108 audit rules, but ships an Electron app and a local database. Heavy surface for something `scripts/seo-audit.mjs` already does against this site's own sitemap. |
| zubair-trabzada/geo-seo-claude | 9,958 | 2026-08-31 | 36/50 | **Reject.** Agency-oriented — prospect CRM, white-label branding config. Its GEO scorer would fork the 83→91 baseline into two incompatible numbers. Rule 7: do not run two scoring systems on one site. |
| Thibaultbm/claude-seo-geo | 15 | 2026-08-31 | 30/50 | **Reject.** 15 stars, 1 fork, created 2026-06-10. No community, no evidence of use. Named in the brief as a candidate; the numbers do not support it. |
| Ryze-AI-Adgent/open-seo-mcp-skills | 187 | 2026-08-31 | — | **Defer.** Requires paid API accounts. |
| seranking/seo-skills | 129 | 2026-06-25 | — | **Defer.** Requires an SE Ranking subscription. |
| zubair-trabzada/dataforseo-claude | 147 | 2026-05-20 | — | **Defer.** Requires DataForSEO credits. |

The three deferred rows are all keyword-volume and SERP-data tools. They are
deferred on a deliberate decision, not an oversight: every build decision on
this site so far has been made from **measured Search Console position data**
rather than estimated volume, and the one time volume-style reasoning was used
it produced commit 786a5fd, which cancelled 136 denial-code pages that position
data then showed were winnable. Revisit only if a decision genuinely turns on
volume for a query this domain has no impressions for.

---

## In-house tooling (the incumbent that keeps winning)

| Script | What it does that no installed skill does |
| --- | --- |
| `scripts/seo-audit.mjs` | Title/meta/H1/canonical sweep over the site's own 445-URL sitemap |
| `scripts/link-audit.mjs` | Orphans, click depth and reachability across the real internal link graph |
| `scripts/thin-content-audit.sh` | Uniqueness bar for the programmatic page types |
| `scripts/check-refs.mjs` | Every cross-reference and citation mapping resolves before a build |
| `scripts/check-lastmod.mjs` | Fails when the sitemap's lastmod map goes stale |
| `scripts/check-source-urls.mjs` | Dead primary-source citation detection |
| `scripts/indexnow-submit.mjs` | Submits from the **live** sitemap, refusing URLs that would 404 |
| `scripts/check-visibility.mjs` | Leading indicators, in the order they must fire |
