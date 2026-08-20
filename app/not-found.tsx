import Link from "next/link";
import { Button, Container, Section } from "@/components/ui";

export default function NotFound() {
  return (
    <Section className="pt-24">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <p className="font-mono text-6xl font-700 text-accent">404</p>
          <h1 className="mt-6 text-[clamp(1.9rem,4vw,2.6rem)] font-600">Page not found</h1>
          <p className="mt-4 leading-relaxed text-muted">
            That page doesn&rsquo;t exist, or it has moved. Try one of these instead.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="/">Go to homepage</Button>
            <Button href="/services" variant="secondary">Browse services</Button>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm">
            {[
              ["Specialties", "/specialties"],
              ["Locations", "/locations"],
              ["Denial code lookup", "/tools/denial-code-lookup"],
              ["RCM benchmarks", "/resources/rcm-benchmarks"],
              ["Contact", "/contact"],
            ].map(([label, href]) => (
              <Link key={href} href={href} className="text-accent underline underline-offset-4 hover:text-accent-2">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
