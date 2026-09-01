import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const usd = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

export const compactUsd = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(n);

import lastmod from "./content/lastmod.json";

export type LastmodGroup = keyof typeof lastmod;

/**
 * The real last-modified date for a route group, derived from git by
 * `scripts/gen-lastmod.mjs` — the same source the sitemap uses.
 *
 * This replaces a hardcoded site-wide constant. That constant fed
 * `dateModified`, `datePublished` and `lastReviewed` in every page's JSON-LD,
 * so on 2026-09-01 /glossary/carc told crawlers it had been modified that day
 * while its own sitemap entry said 2026-08-27 and git said 2026-08-20. A page
 * contradicting its own sitemap is the exact failure the sitemap fix removed
 * one layer up, and the reasoning there applies here: a demonstrably wrong
 * date is a reason to distrust the field everywhere it appears.
 */
export const lastUpdated = (group: LastmodGroup) =>
  // UTC, not the raw local-offset string. `app/sitemap.ts` passes the same
  // value through `new Date()`, which serialises as UTC, so slicing the raw
  // string here made a commit at 01:30 +05:00 render as 2026-09-01 on the page
  // and 2026-08-31 in the sitemap — the two layers disagreeing about the same
  // timestamp, which is the problem this whole change exists to remove.
  new Date(lastmod[group]).toISOString().slice(0, 10);

/**
 * Newest date across the whole site.
 *
 * For endpoints that describe the site as a whole rather than one page —
 * llms.txt, llms-full.txt, the /ai/*.json documents — where the honest answer
 * is "the most recent change to anything they cover".
 */
export const SITE_UPDATED = new Date(Object.values(lastmod).slice().sort().at(-1)!)
  .toISOString()
  .slice(0, 10);

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
