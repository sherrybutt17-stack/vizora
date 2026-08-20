# Vizora — Medical Billing & RCM Website

Dark, statically-generated marketing site for a medical billing / revenue cycle
management company. Next.js 16 (App Router) + TypeScript + Tailwind CSS v4.

```bash
npm run dev     # http://localhost:3000
npm run build   # static export of all 169 routes
npm run start   # serve the production build
```

## Architecture

Content lives in **typed data modules** under `lib/content/`, never inline in JSX.
One source of truth drives the rendered page, `generateStaticParams`, internal
links and the JSON-LD simultaneously — so a copy edit updates the page, its
structured data and its inbound internal links together.

| File | Purpose |
| --- | --- |
| `lib/content/site.ts` | Company identity and contact details. **Every placeholder is marked `// PLACEHOLDER`.** |
| `lib/content/stats.ts` | Every number on the site. See "Statistics policy" below. |
| `lib/content/services.ts` | 12 services |
| `lib/content/specialties.ts` | 25 specialties with real CPT codes, denial patterns, payer notes |
| `lib/content/locations.ts` | 50 states with Medicaid program, MAC jurisdiction, expansion status |
| `lib/content/denial-codes.ts` | 40 CARC/RARC codes powering the lookup tool |
| `lib/content/comparisons.ts` | 10 comparison pages, incl. named-competitor pages |
| `lib/content/posts/` | 9 full articles, one module per post |
| `lib/schema.tsx` | JSON-LD generated from the content modules |

## Statistics policy

`lib/content/stats.ts` is the only place external numbers may be defined, and each
carries its publisher, dataset and **data year** (not publication year). The
`CitedFigure` component renders the source alongside the figure — a bare number
cannot be displayed.

The file ends with a `REJECTED` block listing claims deliberately excluded because
they have no verifiable primary source, including "50–65% of denied claims are
never reworked", "90% of denials are preventable" and "$118 to rework a claim"
(2016 data still quoted as current). **Do not reintroduce them.** They are also
published, with reasoning, at `/resources/rcm-benchmarks` — which is a genuine
differentiator, since no competitor does this.

## Before launch — required

1. **Replace every `// PLACEHOLDER` in `lib/content/site.ts`** — phone, email,
   domain, founding year, social URLs. Currently the reference site's dummy data.
2. **Add a postal address.** `site.address` is `null`, so `schema.tsx` omits the
   `PostalAddress` block rather than fabricating one. Local SEO and
   `LocalBusiness` schema are not viable until a real address exists.
3. **Verify every certification claim** in `site.ts` (`certifications`). SOC 2
   Type II, ISO 27001, HITRUST and PCI DSS are carried over from the reference
   site and are **unverified** (`verified: false`). Publishing an unearned one is
   a material misrepresentation. Remove any not currently held, then delete the
   warning block on `/about`.
4. **Confirm the testimonials and case studies.** Named practices and result
   figures came from the reference site. Confirm accuracy and written permission —
   performance claims in healthcare marketing carry real legal exposure.
5. **Replace the legal pages with counsel-approved text.** `/privacy`, `/terms`,
   `/hipaa` and `/baa` are structural drafts and say so on the page. Not binding.
6. ~~Set real pricing~~ — DONE (2026-08-20). Owner-confirmed at 3% starting,
   3–6% typical. Set in `lib/content/site.ts`; `/pricing`, `llms.txt`,
   `llms-full.txt` and the FAQ derive from it. `public/pricing.md` is static
   and was updated alongside. Note the industry-typical 4–8% still quoted in
   blog and pricing-model comparison content is a MARKET figure, not ours —
   the two are deliberately different and should not be reconciled.
7. **Name a credentialed content reviewer** in `lib/content/blog.ts` (`author`).
   A faceless "team" byline is the weakest possible E-E-A-T signal.

## Lead forms

`ContactForm` and the referral form validate client-side and `router.push('/thank-you')`.
**No backend, no storage, no email** — by design. To wire one up, add the call in
the `onSubmit` handler before the redirect.

## SEO / AEO

- All 169 routes statically prerendered (`○`/`●`, zero `ƒ`)
- `app/robots.ts` explicitly **allows** GPTBot, PerplexityBot, ClaudeBot,
  Google-Extended, OAI-SearchBot and Bingbot. Blocking these prevents citation.
  CCBot (training-only) is blocked.
- `public/llms.txt` and `public/pricing.md` for AI agents
- JSON-LD: Organization + ProfessionalService, Service, FAQPage, BreadcrumbList,
  Article, ItemList, WebSite
- `FAQPage` schema on every service, specialty and **state** page — three of the
  four leading competitors ship none

## Lighthouse

| | Perf | A11y | Best practices | SEO |
| --- | --- | --- | --- | --- |
| Desktop | 100 | 100 | 100 | 100 |
| Mobile | 91 | 100 | 100 | 100 |

Mobile LCP is ~3.5s under Lighthouse's simulated slow-4G + 4× CPU throttle, driven
mostly by a 458ms localhost TTFB. On a CDN this drops substantially; re-measure
against the deployed site rather than `next start`.

## Programmatic SEO guardrail

State and specialty pages are the organic engine and the place thin content is
most punished. Re-run the uniqueness check after adding pages:

```bash
bash scripts/thin-content-audit.sh   # requires `npm run start` on :3000
```

Current: specialty pages **91–92% distinct** at sentence level, state pages **81%**.
Anything below ~60% means the data module needs more genuine per-page substance
before shipping — not more template.
