import { Button, Container, Section } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { site } from "@/lib/content/site";

/**
 * Closing call to action.
 *
 * Treated as a single composed moment rather than a strip: one light source
 * from above, a fading hairline instead of a hard border, and grain over the
 * gradient so the large dark fill does not band. It is the last thing on
 * every page, so it is worth the extra layer.
 */
export function FinalCTA({
  title = "Find out what your denials are costing you",
  lead = "A free billing audit reviews your denial rate, AR aging and clean claim rate against industry benchmarks. Takes about two minutes to request. No sales pitch.",
  cta = "Get your free billing audit",
}: {
  title?: string;
  lead?: string;
  cta?: string;
}) {
  return (
    <Section className="relative overflow-hidden">
      <hr className="rule-fade absolute inset-x-0 top-0" aria-hidden="true" />
      <div className="beam pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="bg-aurora pointer-events-none absolute inset-0 opacity-45" aria-hidden="true" />
      <div className="grain pointer-events-none absolute inset-0" aria-hidden="true" />

      <Container className="relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-display-md font-600">{title}</h2>
          <p className="mx-auto mt-5 max-w-xl text-[1.05rem] leading-[1.62] text-muted">{lead}</p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/contact" size="lg">{cta}</Button>
            <Button href="/tools/revenue-leak-calculator" variant="secondary" size="lg">
              Estimate your revenue leak
            </Button>
          </div>
          <p className="mt-7 text-xs text-faint">
            No setup fees · You pay when we collect · Pricing from {site.pricing.startingRate} of net collections
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
