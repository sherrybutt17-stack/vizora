import { notFound } from "next/navigation";
import Link from "next/link";
import { Container, Section, Badge, DataTable, Eyebrow } from "@/components/ui";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { RelatedContent } from "@/components/sections/RelatedContent";
import { JsonLd, articleSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { getPost, postSlugs, posts, author } from "@/lib/content/blog";
import { getService } from "@/lib/content/services";
import { getSpecialty } from "@/lib/content/specialties";
import { pageMeta } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { PageTransition } from "@/components/motion/ViewTransition";

export function generateStaticParams() {
  return postSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  return pageMeta({ title: p.title, description: p.excerpt, path: `/blog/${p.slug}` });
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Resources", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ];

  const related = post.relatedServices
    .map((s) => getService(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  // `relatedSpecialties` was declared on the type and set on a post, but never
  // rendered — so specialty-targeted articles pushed no authority to the
  // specialty pages they were written to support.
  const relatedSpecialties = (post.relatedSpecialties ?? [])
    .map((s) => getSpecialty(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  /**
   * "Keep reading" picks the three posts *following* this one in the sorted
   * list, wrapping at the end.
   *
   * The previous `posts.slice(0, 3)` returned the three newest posts on every
   * article, so those three collected every internal link on the blog and
   * older posts received none. A rotating window gives each post exactly three
   * inbound links from its siblings, which is what makes internal link equity
   * distribute rather than pool.
   */
  const idx = posts.findIndex((p) => p.slug === post.slug);
  const more = [1, 2, 3]
    .map((n) => posts[(idx + n) % posts.length])
    .filter((p) => p && p.slug !== post.slug);

  return (
    <PageTransition>
      <JsonLd data={[
        breadcrumbSchema(crumbs),
        articleSchema({
          title: post.title,
          excerpt: post.excerpt,
          slug: post.slug,
          published: post.published,
          updated: post.updated,
          authorName: author.name,
        }),
        // Only emitted when the post actually renders a visible FAQ block.
        // FAQPage markup describing questions absent from the page is a
        // structured-data violation, so the two are kept in one condition.
        ...(post.faq?.length ? [faqSchema(post.faq)] : []),
      ]} />
      <Breadcrumbs items={crumbs} />

      <article>
        <Section className="scroll-rise pb-0 pt-4">
          <Container>
            <div className="mx-auto max-w-3xl">
              <Badge tone="accent">{post.category}</Badge>
              <h1 className="mt-5 text-[clamp(2.1rem,4.6vw,3.2rem)] font-600 leading-[1.08]">
                {post.title}
              </h1>
              <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-faint">
                <span>{author.name}</span>
                <span aria-hidden="true">·</span>
                <span>Updated {formatDate(post.updated)}</span>
                <span aria-hidden="true">·</span>
                <span>{post.readingMinutes} min read</span>
              </div>

              {/* Answer-first block — the passage most likely to be quoted */}
              <div className="mt-9 rounded-xl border border-accent/25 bg-accent/[0.05] p-6">
                <p className="text-[1.05rem] leading-relaxed text-ink-2">{post.answer}</p>
              </div>
            </div>
          </Container>
        </Section>

        <Section className="scroll-rise">
          <Container>
            <div className="mx-auto max-w-3xl">
              {post.sections.map((section) => (
                <section key={section.heading} className="mt-12 first:mt-0">
                  <h2 className="text-[clamp(1.4rem,2.6vw,1.85rem)] font-600 leading-snug">
                    {section.heading}
                  </h2>
                  <div className="mt-5 space-y-4 text-[1.02rem] leading-[1.75] text-ink-2">
                    {section.body.map((para) => (
                      <p key={para.slice(0, 40)}>{para}</p>
                    ))}
                  </div>
                  {section.list && (
                    <ul className="mt-6 space-y-3">
                      {section.list.map((item) => (
                        <li key={item.slice(0, 40)} className="flex gap-3 leading-relaxed text-ink-2">
                          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.table && (
                    <DataTable className="mt-6" headers={section.table.headers} rows={section.table.rows} />
                  )}
                </section>
              ))}

              {post.faq?.length ? (
                <section className="mt-14">
                  <h2 className="text-[clamp(1.4rem,2.6vw,1.85rem)] font-600 leading-snug">
                    Frequently asked questions
                  </h2>
                  <dl className="mt-6 space-y-4">
                    {post.faq.map((f) => (
                      <div
                        key={f.question}
                        className="rounded-xl border border-border bg-surface p-5"
                      >
                        <dt className="font-600 leading-snug text-ink">{f.question}</dt>
                        <dd className="mt-2.5 leading-[1.75] text-ink-2">{f.answer}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
              ) : null}

              <footer className="mt-14 rounded-xl border border-border bg-surface p-6">
                <Eyebrow>About the author</Eyebrow>
                <p className="mt-3 font-500 text-ink">{author.name}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{author.bio}</p>
                <p className="mt-3 text-xs text-faint">{author.reviewer}</p>
              </footer>
            </div>
          </Container>
        </Section>
      </article>

      <RelatedContent
        title="Services referenced in this article"
        links={[
          ...related.map((r) => ({ label: r.name, href: `/services/${r.slug}`, description: r.blurb })),
          ...relatedSpecialties.map((r) => ({
            label: `${r.name} billing`,
            href: `/specialties/${r.slug}`,
            description: r.blurb,
          })),
        ]}
      />

      <Section className="scroll-rise border-t border-border bg-bg-soft">
        <Container>
          <h2 className="text-xl font-600">Keep reading</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {more.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group rounded-xl border border-border bg-surface p-5 transition-all hover:-translate-y-1 hover:border-accent/30"
              >
                <p className="text-xs text-faint">{p.category}</p>
                <p className="mt-2 font-500 leading-snug text-ink group-hover:text-accent">{p.title}</p>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <FinalCTA />
    </PageTransition>
  );
}
