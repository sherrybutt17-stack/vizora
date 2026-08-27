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

/**
 * A question phrased the way a person or an AI assistant would ask it, with a
 * self-contained answer.
 *
 * Field names match `Faq` in lib/schema.tsx so the array passes straight into
 * `faqSchema()` with no mapping layer to drift out of sync.
 */
export type PostFaq = { question: string; answer: string };

export type BlogPost = {
  slug: string;
  title: string;
  /**
   * Shorter title for the SERP, where `title` would truncate.
   *
   * These titles are written to be read on the page and 25 of 34 run past the
   * ~60 characters a result line shows. Shortening the headline itself would
   * throw away the specifics that make it worth clicking, so the two are
   * separated: `title` stays the H1, `metaTitle` is what Google displays.
   * Keep it under 51 characters — `pageMeta` appends " | Vizora".
   */
  metaTitle?: string;
  excerpt: string;
  category: string;
  published: string;
  updated: string;
  readingMinutes: number;
  /** Answer-first summary — the extractable passage. */
  answer: string;
  sections: PostSection[];
  /**
   * Rendered as a visible FAQ block and emitted as FAQPage JSON-LD.
   *
   * Both matter and for different reasons: the visible block is what Google
   * requires before it will honour the markup, and the markup is what lets an
   * assistant lift a single answer without parsing the whole article. Answers
   * are written to stand alone — an answer that says "as described above" is
   * useless the moment it is extracted.
   */
  faq?: PostFaq[];
  /**
   * Primary sources this post rests on, as `external.ts` ref ids.
   *
   * The post template has always required citations, but they were written
   * into the prose as publisher names with no href — which is a claim the
   * reader cannot check and a link an answer engine cannot follow. These
   * render as real outbound links alongside the article.
   */
  sources?: string[];
  /** Internal links this post should push authority to. */
  relatedServices: string[];
  relatedSpecialties?: string[];
  featured?: boolean;
};
