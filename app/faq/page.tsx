import { Container, Section, SectionHead, Eyebrow } from "@/components/ui";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FAQList } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { faqCategories, allFaqs } from "@/lib/content/faq";
import { pageMeta } from "@/lib/seo";
import { LAST_UPDATED, formatDate } from "@/lib/utils";
import { PageTransition } from "@/components/motion/ViewTransition";

export const metadata = pageMeta({
  title: "Medical Billing FAQ",
  description:
    "Answers on medical billing costs, denial rates, onboarding timelines, HIPAA compliance and what to expect from an outsourced billing partner.",
  path: "/faq",
  keywords: [
    "medical billing FAQ",
    "medical billing questions",
    "how does medical billing work",
    "outsourcing medical billing questions",
    "medical billing company questions to ask",
    "what does a medical billing company do",
  ],
});

const crumbs = [{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }];

export default function FaqPage() {
  return (
    <PageTransition>
      <JsonLd data={[breadcrumbSchema(crumbs), faqSchema(allFaqs)]} />
      <Breadcrumbs items={crumbs} />

      <Section className="scroll-rise pt-6">
        <Container>
          <SectionHead as="h1"
            eyebrow="Questions"
            title="Frequently asked questions"
            lead="Straight answers on pricing, denial rates, onboarding and compliance. Where a question turns on industry data, the source is named."
          />
          <p className="mt-6 text-center text-sm text-faint">
            Last updated {formatDate(LAST_UPDATED)}
          </p>

          <div className="mx-auto mt-16 max-w-4xl space-y-14">
            {faqCategories.map((cat) => (
              <div key={cat.slug} id={cat.slug} className="scroll-mt-28">
                <Eyebrow>{cat.name}</Eyebrow>
                <FAQList items={cat.items} className="mt-5" />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <FinalCTA
        title="Still have questions?"
        lead="Ask us directly. A free billing audit is also the fastest way to get specific answers about your own numbers."
      />
    </PageTransition>
  );
}
