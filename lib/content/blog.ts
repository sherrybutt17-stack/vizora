/**
 * Blog module — the public surface every consumer imports.
 *
 * Post bodies live one-per-module under `posts/`; the type lives in
 * `blog-types.ts`. This file keeps the same exports it always had, so the
 * sitemap, llms.txt, the blog index and the post route were unaffected by that
 * split.
 *
 * Structure of a post is deliberate: every one opens with a direct 40-60 word
 * answer (`answer`), which is the passage most likely to be extracted and
 * quoted by an AI assistant, then develops the topic in sections with headings
 * phrased the way people actually search.
 */

export type { BlogPost, PostSection, PostFaq } from "./blog-types";

import type { BlogPost } from "./blog-types";
import { posts } from "./posts";

export const author = {
  name: "Vizora Clinical Revenue Team",
  // PLACEHOLDER — replace with a named, credentialed reviewer when one is
  // available to name. Named authorship with real credentials is a meaningful
  // E-E-A-T signal; a faceless "team" byline is the weakest possible
  // attribution. Deliberately does NOT name a certifying body or credential:
  // the owner confirmed coders are certified but did not confirm which body,
  // and naming one unverified is the same class of claim as the SOC 2 and
  // ISO 27001 certifications removed from site.ts.
  reviewer: "Reviewed by a certified coding lead",
  bio: "Certified coders and revenue cycle specialists working across 25 medical specialties.",
};

export { posts };

export const postMap = new Map(posts.map((p: BlogPost) => [p.slug, p]));
export const getPost = (slug: string) => postMap.get(slug);
export const postSlugs = posts.map((p: BlogPost) => p.slug);
export const featuredPost = posts.find((p: BlogPost) => p.featured) ?? posts[0];
export const categories = Array.from(new Set(posts.map((p: BlogPost) => p.category)));

/**
 * Posts tagged to a specialty, for the "related reading" block on
 * /specialties/[slug].
 *
 * This is the return leg of a link that previously only ever pointed one way.
 * Specialty pages are the commercial targets; posts are what earns the links.
 * Without this, authority collected by an article had no path to the page it
 * was written to support.
 */
export const getPostsForSpecialty = (slug: string) =>
  posts.filter((p: BlogPost) => p.relatedSpecialties?.includes(slug));
