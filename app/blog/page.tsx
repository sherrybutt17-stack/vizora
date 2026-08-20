import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Section, SectionHead, Card, Badge } from "@/components/ui";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Reveal } from "@/components/motion";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { JsonLd, breadcrumbSchema, itemListSchema } from "@/lib/schema";
import { posts, featuredPost } from "@/lib/content/blog";
import { pageMeta } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { PageTransition } from "@/components/motion/ViewTransition";

export const metadata = pageMeta({
  title: "Medical Billing Resources & Insights",
  description:
    "Practical guides on denial management, revenue cycle management, clean claim rates, credentialing, AR aging and coding updates — with cited industry data.",
  path: "/blog",
  keywords: [
    "medical billing blog",
    "revenue cycle management articles",
    "denial management tips",
    "medical coding updates",
    "healthcare billing news",
    "how to reduce claim denials",
  ],
});

const crumbs = [{ name: "Home", path: "/" }, { name: "Resources", path: "/blog" }];

export default function BlogPage() {
  const rest = posts.filter((p) => p.slug !== featuredPost.slug);
  return (
    <PageTransition>
      <JsonLd data={[
        breadcrumbSchema(crumbs),
        itemListSchema(posts.map((p) => ({ name: p.title, path: `/blog/${p.slug}` })), "Articles"),
      ]} />
      <Breadcrumbs items={crumbs} />

      <Section className="pt-6">
        <Container>
          <SectionHead as="h1"
            eyebrow="Resources"
            title="Guides to the parts of billing that actually cost money"
            lead="Written for practice owners and administrators, with every industry figure traced to its source."
          />

          <Reveal className="mt-14">
            <Link href={`/blog/${featuredPost.slug}`} transitionTypes={["nav-forward"]} className="group block">
              <Card className="p-7 sm:p-10">
                <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                  <div>
                    <Badge tone="accent" className="mb-4">Featured · {featuredPost.category}</Badge>
                    <h2 className="text-[clamp(1.6rem,3.4vw,2.3rem)] font-600 leading-tight group-hover:text-accent">
                      {featuredPost.title}
                    </h2>
                    <p className="mt-4 leading-relaxed text-muted">{featuredPost.excerpt}</p>
                    <p className="mt-5 text-sm text-faint">
                      Updated {formatDate(featuredPost.updated)} · {featuredPost.readingMinutes} min read
                    </p>
                    <span className="mt-6 inline-flex items-center gap-1.5 font-500 text-accent">
                      Read article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                  <blockquote className="rounded-xl border border-accent/20 bg-accent/[0.05] p-6 text-[0.95rem] leading-relaxed text-ink-2">
                    {featuredPost.answer}
                  </blockquote>
                </div>
              </Card>
            </Link>
          </Reveal>

          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 0.06}>
                <Link href={`/blog/${p.slug}`} transitionTypes={["nav-forward"]} className="group block h-full">
                  <Card className="flex h-full flex-col">
                    <Badge className="self-start">{p.category}</Badge>
                    <h2 className="mt-4 text-lg font-600 leading-snug group-hover:text-accent">
                      {p.title}
                    </h2>
                    <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted">{p.excerpt}</p>
                    <p className="mt-5 text-xs text-faint">
                      {formatDate(p.updated)} · {p.readingMinutes} min read
                    </p>
                  </Card>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <FinalCTA />
    </PageTransition>
  );
}
