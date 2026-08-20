/**
 * Blog post shape, split out from blog.ts so individual post modules can
 * import the type without importing the post index — which would be a
 * cycle, since the index imports every post.
 */

export type PostSection = {
  heading: string;
  body: string[];
  /** Optional list rendered after the body paragraphs. */
  list?: string[];
  /** Optional simple table. */
  table?: { headers: string[]; rows: string[][] };
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  published: string;
  updated: string;
  readingMinutes: number;
  /** Answer-first summary — the extractable passage. */
  answer: string;
  sections: PostSection[];
  /** Internal links this post should push authority to. */
  relatedServices: string[];
  relatedSpecialties?: string[];
  featured?: boolean;
};
