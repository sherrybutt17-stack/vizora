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

export type { BlogPost, PostSection } from "./blog-types";

import type { BlogPost } from "./blog-types";
import { posts } from "./posts";

export const author = {
  name: "Vizora Clinical Revenue Team",
  // PLACEHOLDER — replace with a named, credentialed reviewer before launch.
  // Named authorship with real credentials is a meaningful E-E-A-T signal;
  // a faceless "team" byline is the weakest possible attribution.
  reviewer: "Reviewed by a CPC-credentialed coding lead",
  bio: "Certified professional coders and revenue cycle specialists working across 42 medical specialties.",
};

export { posts };

export const postMap = new Map(posts.map((p: BlogPost) => [p.slug, p]));
export const getPost = (slug: string) => postMap.get(slug);
export const postSlugs = posts.map((p: BlogPost) => p.slug);
export const featuredPost = posts.find((p: BlogPost) => p.featured) ?? posts[0];
export const categories = Array.from(new Set(posts.map((p: BlogPost) => p.category)));
