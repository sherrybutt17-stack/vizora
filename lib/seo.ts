import type { Metadata } from "next";
import { site } from "./content/site";


/**
 * Trim a meta description to what a search engine will actually show.
 *
 * Google cuts descriptions around 155–160 characters. Doing it here means the
 * cut lands on a word boundary rather than mid-word, and that the tag we ship
 * matches what is displayed. Applied centrally in `pageMeta` so no template or
 * hand-written description can exceed it — several did, including two that
 * used `.slice(0, 165)` and truncated mid-word.
 */
export function clampDescription(text: string, max = 155) {
  const t = text.trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : max).replace(/[,;:.\u2014-]+$/, "")}…`;
}

export function pageMeta({
  title,
  description,
  path,
  keywords,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}): Metadata {
  const url = `${site.url}${path}`;
  // The brand suffix is applied once, by `title.template` in the root layout.
  // Appending it here as well produced "... | Vizora | Vizora" on every page
  // but the homepage — which wasted ~9 characters of the SERP title and pushed
  // 63 pages past the ~60-character truncation point.
  const fullTitle = title;
  const desc = clampDescription(description);
  return {
    title: fullTitle,
    description: desc,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${site.name}`,
      description: desc,
      url,
      siteName: site.name,
      type: "website",
      locale: "en_US",
    },
    twitter: { card: "summary_large_image", title: `${title} | ${site.name}`, description: desc },
  };
}
