"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";
import { Button, Card, Container, Section, SectionHead, Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { cn } from "@/lib/utils";

const TIERS = [
  { amount: "$250", label: "Solo practice", detail: "1–2 providers" },
  { amount: "$350", label: "Small group", detail: "3–5 providers" },
  { amount: "$500", label: "Large group", detail: "6+ providers" },
];

const STEPS = [
  { n: "1", title: "Submit a referral", body: "Share your colleague's details using the form below." },
  { n: "2", title: "We reach out", body: "Our team contacts the practice within one business day." },
  { n: "3", title: "They come on board", body: "The referred practice becomes a Vizora client." },
  { n: "4", title: "You get paid", body: "Your referral bonus is issued within 30 days of their first billing cycle." },
];

const TERMS = [
  "The referred practice must be new to Vizora and not previously contacted by us.",
  "Rewards are paid within 30 days of the referred practice's first completed billing cycle.",
  "The referred practice must sign a minimum six-month agreement.",
  "Rewards are paid by check or direct deposit.",
  "Program terms may change; current participants are notified of any modifications.",
];

export function ReferralForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTouched(true);
    const data = new FormData(e.currentTarget);
    const next: Record<string, string> = {};
    const required: [string, string][] = [
      ["yourName", "Please enter your name."],
      ["yourEmail", "Please enter your email."],
      ["contactName", "Please enter their name."],
      ["contactEmail", "Please enter their email."],
      ["practiceName", "Please enter their practice name."],
    ];
    for (const [field, msg] of required) {
      const v = String(data.get(field) ?? "").trim();
      if (!v) next[field] = msg;
      else if (field.toLowerCase().includes("email") && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) {
        next[field] = "Please enter a valid email address.";
      }
    }
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setSubmitting(true);
    router.push("/thank-you");
  }

  const input = (name: string) =>
    cn(
      "h-12 w-full rounded-xl border bg-surface px-4 text-[0.95rem] text-ink placeholder:text-faint focus:outline-none transition-colors",
      touched && errors[name] ? "border-danger" : "border-border focus:border-accent/60",
    );

  return (
    <Section className="pt-10">
      <Container>
        <SectionHead as="h1"
          eyebrow="Referral program"
          title="Refer a practice, earn up to $500"
          lead="If Vizora has worked for you, the colleagues you'd recommend us to are exactly the practices we want. Here's what that's worth."
        />

        <div className="mx-auto mt-16 grid max-w-3xl gap-4 sm:grid-cols-3">
          {TIERS.map((t, i) => (
            <Reveal key={t.amount} delay={i * 0.07}>
              <Card hover={false} className="h-full text-center">
                <p className="font-mono text-3xl font-700 text-accent">{t.amount}</p>
                <p className="mt-3 font-500 text-ink">{t.label}</p>
                <p className="mt-1 text-sm text-muted">{t.detail}</p>
              </Card>
            </Reveal>
          ))}
        </div>
        <p className="mt-5 text-center text-sm text-faint">
          Plus additional bonuses for multiple referrals in a calendar year.
        </p>

        <div className="mx-auto mt-20 max-w-5xl">
          <Eyebrow>How it works</Eyebrow>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s) => (
              <Card key={s.n} className="h-full">
                <span className="font-mono text-sm font-700 text-accent">{s.n}</span>
                <h3 className="mt-3 font-600 leading-snug">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
              </Card>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-20 grid max-w-5xl gap-10 lg:grid-cols-[1.25fr_0.75fr]">
          <Card hover={false} className="p-7 sm:p-9">
            <h2 className="text-xl font-600">Submit a referral</h2>
            <form onSubmit={onSubmit} noValidate className="mt-7 space-y-6">
              <fieldset>
                <legend className="mb-4 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-accent">
                  Your information
                </legend>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Your name" required error={touched ? errors.yourName : undefined}>
                    <input name="yourName" className={input("yourName")} placeholder="Dr. Jane Smith" />
                  </Field>
                  <Field label="Your email" required error={touched ? errors.yourEmail : undefined}>
                    <input name="yourEmail" type="email" className={input("yourEmail")} placeholder="jane@practice.com" />
                  </Field>
                  <Field label="Your phone">
                    <input name="yourPhone" type="tel" className={input("yourPhone")} placeholder="(555) 123-4567" />
                  </Field>
                </div>
              </fieldset>

              <fieldset>
                <legend className="mb-4 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-accent">
                  Who you&rsquo;re referring
                </legend>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Their name" required error={touched ? errors.contactName : undefined}>
                    <input name="contactName" className={input("contactName")} placeholder="Dr. Alex Rivera" />
                  </Field>
                  <Field label="Their email" required error={touched ? errors.contactEmail : undefined}>
                    <input name="contactEmail" type="email" className={input("contactEmail")} placeholder="alex@clinic.com" />
                  </Field>
                  <Field label="Their phone">
                    <input name="contactPhone" type="tel" className={input("contactPhone")} placeholder="(555) 987-6543" />
                  </Field>
                  <Field label="Their practice name" required error={touched ? errors.practiceName : undefined}>
                    <input name="practiceName" className={input("practiceName")} placeholder="Rivera Internal Medicine" />
                  </Field>
                </div>
              </fieldset>

              <Field label="Anything we should know" hint="Optional">
                <textarea name="notes" rows={4}
                  className="w-full rounded-xl border border-border bg-surface p-4 text-[0.95rem] leading-relaxed text-ink placeholder:text-faint focus:border-accent/60 focus:outline-none"
                  placeholder="What are they struggling with?" />
              </Field>

              <Button type="submit" size="lg" disabled={submitting}>
                {submitting ? (<><Loader2 className="h-4 w-4 animate-spin" /> Sending…</>) : "Submit referral"}
              </Button>
            </form>
          </Card>

          <Card hover={false} className="h-fit">
            <Eyebrow>Program terms</Eyebrow>
            <ul className="mt-4 space-y-3">
              {TERMS.map((t) => (
                <li key={t} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Container>
    </Section>
  );
}

function Field({
  label, children, required, hint, error,
}: {
  label: string; children: React.ReactNode; required?: boolean; hint?: string; error?: string;
}) {
  return (
    <div>
      <label className="mb-2 flex items-baseline gap-2 text-sm font-500 text-ink">
        {label}
        {required && <span className="text-accent" aria-hidden="true">*</span>}
        {hint && <span className="text-xs font-400 text-faint">{hint}</span>}
      </label>
      {children}
      {error && <p role="alert" className="mt-1.5 text-xs text-danger">{error}</p>}
    </div>
  );
}
