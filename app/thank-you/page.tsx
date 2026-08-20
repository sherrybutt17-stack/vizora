import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button, Container, Section, Card } from "@/components/ui";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/content/site";
import { PageTransition } from "@/components/motion/ViewTransition";

export const metadata = {
  ...pageMeta({
    title: "Thank You",
    description: "We've received your request and will be in touch within one business day.",
    path: "/thank-you",
  }),
  robots: { index: false, follow: true },
};

const NEXT_STEPS = [
  { step: "01", title: "We review your details", body: "A billing specialist reviews what you shared and prepares specific questions about your specialty and payer mix." },
  { step: "02", title: "We reach out within one business day", body: "A short call to understand your current setup and confirm what data we'd need to run the audit." },
  { step: "03", title: "You get the audit findings", body: "A written summary of your denial rate, AR aging and clean claim rate against benchmarks — yours to keep either way." },
];

export default function ThankYouPage() {
  return (
    <PageTransition>
    <Section className="pt-16">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <CheckCircle2 className="mx-auto h-14 w-14 text-accent" />
          <h1 className="mt-7 text-[clamp(2rem,4.4vw,3rem)] font-600 leading-tight">
            Thanks — we&rsquo;ve got it
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Your request is in. A billing specialist will be in touch within one business day.
            If it&rsquo;s urgent, call us at{" "}
            <a href={site.phoneHref} className="text-accent underline underline-offset-4">{site.phone}</a>.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl gap-5 md:grid-cols-3">
          {NEXT_STEPS.map((s) => (
            <Card key={s.step} hover={false} className="h-full">
              <span className="font-mono text-sm font-700 text-accent">{s.step}</span>
              <h2 className="mt-3 font-600 leading-snug">{s.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
            </Card>
          ))}
        </div>

        <div className="mx-auto mt-14 max-w-2xl rounded-2xl border border-border bg-surface p-8 text-center">
          <h2 className="text-lg font-600">While you wait</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Our benchmarks page shows where your numbers should sit, and the denial code lookup
            explains the codes you&rsquo;re seeing on remittances right now.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="/resources/rcm-benchmarks" variant="secondary">See RCM benchmarks</Button>
            <Button href="/tools/denial-code-lookup" variant="secondary">Denial code lookup</Button>
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-faint">
          <Link href="/" className="text-accent underline underline-offset-4">Back to homepage</Link>
        </p>
      </Container>
    </Section>
    </PageTransition>
  );
}
