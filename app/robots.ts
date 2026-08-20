import type { MetadataRoute } from "next";
import { site } from "@/lib/content/site";

/**
 * AI crawlers are explicitly allowed.
 *
 * This is deliberate and load-bearing: if GPTBot, PerplexityBot, ClaudeBot or
 * Google-Extended are blocked, those platforms cannot cite this site in an
 * answer. Blocking them protects nothing here — the content is public
 * marketing material whose entire purpose is to be found and quoted.
 *
 * The distinction drawn below is search-and-cite versus train-only. A crawler
 * that retrieves a page to answer a live question sends attribution and
 * sometimes a reader; a crawler that vacuums text into a training corpus
 * returns neither. The first is allowed, the second is not.
 */
const AI_SEARCH_BOTS = [
  "GPTBot",            // OpenAI
  "OAI-SearchBot",     // ChatGPT search
  "ChatGPT-User",      // ChatGPT user-initiated fetch
  "PerplexityBot",
  "Perplexity-User",
  "ClaudeBot",         // Anthropic
  "anthropic-ai",
  "Claude-User",
  "Claude-SearchBot",
  "Google-Extended",   // Gemini grounding / AI Overviews
  "Googlebot",
  "Googlebot-Image",
  "Bingbot",           // Copilot, via Bing
  "Applebot",
  "Applebot-Extended",
  "meta-externalagent",
  "meta-externalfetcher",
  "Amazonbot",
  "cohere-ai",
  "cohere-training-data-crawler",
  "DuckAssistBot",
  "MistralAI-User",
  "YouBot",
  "Diffbot",
  "AndiBot",
  "PhindBot",
];

/**
 * Bulk training crawlers. Blocking these costs no citations because they do
 * not power a surface that cites anything.
 */
const TRAINING_ONLY_BOTS = ["CCBot", "Bytespider", "ImagesiftBot", "Omgilibot", "Omgili"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // /thank-you is a post-submission confirmation with no standalone value
        // and would otherwise compete for brand queries.
        disallow: ["/thank-you"],
      },
      ...AI_SEARCH_BOTS.map((userAgent) => ({ userAgent, allow: "/" })),
      ...TRAINING_ONLY_BOTS.map((userAgent) => ({ userAgent, disallow: "/" })),
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
