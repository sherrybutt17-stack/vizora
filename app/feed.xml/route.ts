import { site } from "@/lib/content/site";
import { posts } from "@/lib/content/blog";
import type { BlogPost } from "@/lib/content/blog-types";
import { aiJsonHeaders } from "@/lib/ai/json-headers";

/**
 * /feed.xml — RSS 2.0 over the blog.
 *
 * Two reasons it exists. A feed is the conventional freshness signal: it tells
 * a crawler what changed and when, without re-fetching the archive. And it is
 * how anything that syndicates — readers, aggregators, answer engines watching
 * for new material — subscribes rather than polls.
 *
 * `description` carries the post's answer-first summary rather than a teaser,
 * because the summary is the part written to stand alone.
 */
export const dynamic = "force-static";

/** RSS is XML: five characters must be escaped or the feed fails to parse. */
function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** RSS 2.0 requires RFC 822 dates, not the ISO strings posts are authored in. */
function rfc822(date: string) {
  return new Date(`${date}T09:00:00Z`).toUTCString();
}

export function GET() {
  const sorted = [...posts].sort(
    (a: BlogPost, b: BlogPost) => Date.parse(b.published) - Date.parse(a.published),
  );

  const items = sorted
    .map(
      (p: BlogPost) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${site.url}/blog/${p.slug}</link>
      <guid isPermaLink="true">${site.url}/blog/${p.slug}</guid>
      <description>${esc(p.answer)}</description>
      <category>${esc(p.category)}</category>
      <pubDate>${rfc822(p.published)}</pubDate>
    </item>`,
    )
    .join("\n");

  const latest = sorted[0]?.updated ?? sorted[0]?.published;

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(site.name)} — Medical billing and revenue cycle</title>
    <link>${site.url}/blog</link>
    <description>${esc(site.description)}</description>
    <language>en-us</language>
    <lastBuildDate>${rfc822(latest)}</lastBuildDate>
    <atom:link href="${site.url}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      ...aiJsonHeaders,
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
