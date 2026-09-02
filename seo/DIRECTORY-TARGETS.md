# Directory and listing targets

Built 2026-09-02 against the `directory-submissions` playbook, heavily triaged.
Purpose is narrow and specific: **inbound links and entity corroboration**,
because a live SERP check the same day showed vizora.co absent from results for
its own brand name — the engine's own summary said the company "may not be
prominently indexed online."

## What the standard playbook says, and why most of it is skipped

The playbook's catalog is built for software launches. Vizora is a US medical
billing service. Its own triage rule — *only submit where the product is a
genuine fit* — rules out most of the catalog:

| Tier | Verdict |
| --- | --- |
| Product Hunt, BetaList, Show HN, DevHunt, Fazier | **Skip.** These launch software. A billing service posted there is a category error, gets flagged by moderators, and burns the one-time first-submission advantage |
| AI tool directories (TAAFT, Futurepedia, Toolify) | **Skip.** There is no AI product to list |
| MCP / agent registries | **Skip.** Not applicable |
| No-code directories | **Skip.** Not applicable |
| Dev directories, integration marketplaces | **Skip.** No public API or integrations to list |
| AlternativeTo, SaaSHub, SourceForge, Slashdot | **Skip.** Software catalogs; a service listing is rejected or ignored |

What remains is a different, smaller, higher-yield set: the healthcare RCM
vertical, B2B service marketplaces, and the entity platforms that feed AI
training corpora. Roughly 15 real targets, not 200.

## Readiness

| Requirement | State |
| --- | --- |
| Publicly accessible, no wall | Ready |
| Real pricing page | Ready — 3% starting, 3–6% typical, owner-confirmed |
| Privacy + terms live | Ready (the BAA page still carries draft language) |
| Logo assets | `logo.png`, `logo.svg`, `og.png`, favicon. **Missing: square 1024×1024**, which several listings require |
| Screenshots / demo video | Absent, and mostly not applicable to a service. The two free tools are the screenshottable assets if a listing demands imagery |
| GEO-ready pages | Ready — single H1 verified sitewide, FAQ schema, Organization/Service/Breadcrumb JSON-LD |
| Destination pages for the link equity | Ready — 10 comparison pages including four named-competitor pages, 25 specialty pages, 50 state pages, 2 free tools |
| Reviewable clients | **Unknown — this gates the review platforms.** Five named case-study practices exist and are the obvious candidates, but their accuracy and permission are still an open pre-launch item |

## Priority 1 — Entity. Do this before anything else.

This is not really a directory exercise. It is the fix for the brand-search
failure, and `organizationSchema()` picks these up with no code change the
moment `site.social` is populated.

| Target | Why it is first | Requires |
| --- | --- | --- |
| **Crunchbase** | The single highest-value entry. Feeds AI training corpora, is a recognised `sameAs` target, and resolves "who is Vizora" for engines currently answering with Vizient and Vexora | Company name, founding year (2024), employee range (50+), description, logo. No address required |
| **Wikidata** | Explicitly cited by the playbook as a corpus feed. A minimal, factual entity item | Verifiable third-party references — so create it *after* Crunchbase and one vertical listing exist |
| LinkedIn company page | Named by the playbook as a primary entity signal. **Declined by the owner.** Recorded here as a known cost, not a recommendation to revisit | — |

## Priority 2 — Healthcare RCM vertical

Narrow, credible, and the audience is the actual buyer.

| Target | Notes |
| --- | --- |
| **HBMA** (Healthcare Business Management Association) member directory | The trade body for this exact industry. Membership has a fee; the listing is a genuine credential rather than a link farm |
| **AAPC** vendor / partner listings | Coder-facing, aligns with the site's reference-content audience |
| **MGMA** vendor directory | Practice-manager buyers. MGMA is already cited as a primary source on the site, so the association is coherent |
| Becker's ASC / Physicians Practice vendor listings | Editorial healthcare publishers with vendor sections |

## Priority 3 — B2B service marketplaces

These are the pages that actually rank for "best medical billing companies".
Our own SERP research surfaced exactly this page type from a competitor.

| Target | Blocker |
| --- | --- |
| **Clutch** | Wants an office location and verified client reviews. **Partially blocked by the null postal address** |
| **UpCity** | Service-area businesses accepted; lighter address requirement |
| **GoodFirms** | Accepts service providers, review-driven |
| **DesignRush** | Agency/service marketplace with healthcare categories |
| **Expertise.com** | City-scoped by design. **Blocked without an address** |

## Priority 4 — Review platforms (gated)

**Do not submit until there are reviews to collect.** A zero-review listing on
these is dead weight, and the playbook is blunt about it.

- **G2** and **Capterra** both carry Medical Billing Services categories.
- The threshold that matters is 10 reviews; the protocol is 20 personal asks
  with direct review links, one follow-up after five days.
- The five named case-study practices are the candidate pool — which makes
  confirming those relationships a prerequisite, not just a compliance item.

## Priority 5 — Listicle inclusion (rolling outreach)

The highest-intent surface, and it is already visible in the SERPs: the
"Top 10 medical billing companies in [state]" genre. These are editorial pages
on competitor and publisher domains. Outreach asks for inclusion on the merits
— specialty depth, the cited-benchmarks resource, the free tools — not a link
swap.

## Positioning variants

Three, not the playbook's seven, because only three audiences remain. Every
figure below is verified in `lib/content/site.ts`; nothing here may be
embellished, and no address, certification or headcount beyond "50+" may be
asserted.

**Healthcare vertical** — lead with specialty depth and denial expertise.
> Vizora LLC is a US medical billing and revenue cycle management company
> founded in 2024, serving practices across 25 specialties and all 50 states.
> Work is organised by specialty rather than pooled, with coders assigned to
> the specialty they bill. Published reference material covers CARC and RARC
> denial codes, CPT modifiers and procedure codes, each cited to primary
> sources. HIPAA compliant, BAA available on request.

**Service marketplace** — lead with the pricing model and scope.
> Full-service medical billing and RCM billed as a percentage of what is
> actually collected, starting at 3% and typically 3–6% by practice size,
> specialty and claim volume. No setup fees, and denial appeals are never
> billed separately. Eligibility verification, coding, claims, denial
> management, AR follow-up and patient collections.

**Entity / data platforms** — factual, no marketing voice.
> Vizora LLC, founded 2024, is a medical billing and revenue cycle management
> company headquartered in the United States, serving physician practices
> nationwide. 50+ employees.

## What the standing decisions cost, factually

Not an argument to reverse them — the owner's calls are recorded and respected.
But the cost should be visible when judging results:

- **No postal address** blocks Expertise.com outright and weakens Clutch, plus
  most local directories and any `LocalBusiness` schema.
- **No LinkedIn company page** removes one of the three entity signals the
  playbook names as feeding AI training corpora, leaving Crunchbase and
  Wikidata to carry it alone.
- **No GMB** removes map-pack visibility entirely.

The consequence is that Priority 1 is not merely first — it is close to the
only entity lever still available.

## Sequencing

1. **This week** — Crunchbase. One entry, then send me the URL; `site.social`
   fills and `sameAs` begins emitting with no code change.
2. **Also this week** — square 1024×1024 logo so no listing stalls on assets.
3. **Week 2** — HBMA and MGMA vertical listings, then UpCity and GoodFirms.
4. **Week 2–3** — Wikidata, once two independent references exist to cite.
5. **When client permission is confirmed** — the G2 review drive, then Clutch.
6. **Rolling** — listicle outreach.

Nothing here is submitted without explicit approval; this document is the
research and the copy, not an action taken.
