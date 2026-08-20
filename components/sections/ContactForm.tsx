"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Loader2, Lock } from "lucide-react";
import { Button } from "@/components/ui";
import { specialties } from "@/lib/content/specialties";
import { cn } from "@/lib/utils";

/**
 * Validation and states are real; submission is not wired to any backend by
 * design — it redirects to /thank-you. No data is stored or transmitted.
 *
 * The pain-point checkboxes are a qualification device: they tell a sales
 * conversation where to start, and they make the visitor articulate the
 * problem to themselves, which lifts completion.
 */

const PAIN_POINTS = [
  "Claim denials are too high",
  "Aging AR we can't chase",
  "Billing staff turnover or vacancy",
  "Slow reimbursement / cash flow",
  "Credentialing delays",
  "No visibility into performance",
];

const COLLECTIONS = [
  "Under $50k / month",
  "$50k – $150k / month",
  "$150k – $500k / month",
  "$500k – $1M / month",
  "Over $1M / month",
];

type Errors = Partial<Record<"name" | "email" | "phone" | "specialty", string>>;

export function ContactForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState(false);

  function validate(data: FormData): Errors {
    const next: Errors = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const specialty = String(data.get("specialty") ?? "");

    if (name.length < 2) next.name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) next.email = "Please enter a valid email address.";
    if (phone.replace(/\D/g, "").length < 10) next.phone = "Please enter a valid phone number.";
    if (!specialty) next.specialty = "Please select your specialty.";
    return next;
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTouched(true);
    const data = new FormData(e.currentTarget);
    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = document.querySelector<HTMLElement>(`[data-field="${Object.keys(found)[0]}"]`);
      first?.scrollIntoView({ block: "center", behavior: "smooth" });
      first?.focus();
      return;
    }
    setSubmitting(true);
    router.push("/thank-you");
  }

  const fieldCls = (err?: string) =>
    cn(
      "h-12 w-full rounded-xl border bg-surface px-4 text-[0.95rem] text-ink placeholder:text-faint focus:outline-none transition-colors",
      err ? "border-danger focus:border-danger" : "border-border focus:border-accent/60",
    );

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid min-w-0 gap-5 sm:grid-cols-2">
        <Field label="Full name" required error={touched ? errors.name : undefined}>
          <input data-field="name" name="name" type="text" autoComplete="name"
            placeholder="Dr. Jane Smith" className={fieldCls(touched ? errors.name : undefined)} />
        </Field>
        <Field label="Practice name" hint="Optional">
          <input name="practice" type="text" autoComplete="organization"
            placeholder="Smith Family Medicine" className={fieldCls()} />
        </Field>
        <Field label="Email address" required error={touched ? errors.email : undefined}>
          <input data-field="email" name="email" type="email" autoComplete="email"
            placeholder="jane@practice.com" className={fieldCls(touched ? errors.email : undefined)} />
        </Field>
        <Field label="Phone number" required error={touched ? errors.phone : undefined}>
          <input data-field="phone" name="phone" type="tel" autoComplete="tel"
            placeholder="(555) 123-4567" className={fieldCls(touched ? errors.phone : undefined)} />
        </Field>
      </div>

      <div className="grid min-w-0 gap-5 sm:grid-cols-2">
        <Field label="Specialty" required error={touched ? errors.specialty : undefined}>
          <select data-field="specialty" name="specialty"
            className={cn(fieldCls(touched ? errors.specialty : undefined), "cursor-pointer")} defaultValue="">
            <option value="" disabled>Select your specialty</option>
            {specialties.map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}
            <option value="other">Other</option>
          </select>
        </Field>
        <Field label="Monthly collections" hint="Helps us size the audit">
          <select name="collections" className={cn(fieldCls(), "cursor-pointer")} defaultValue="">
            <option value="">Prefer not to say</option>
            {COLLECTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>
      </div>

      <fieldset>
        <legend className="mb-3 text-sm font-500 text-ink">
          What&rsquo;s driving this? <span className="font-400 text-faint">Select any that apply</span>
        </legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {PAIN_POINTS.map((p) => (
            <label key={p}
              className="flex cursor-pointer items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3 text-sm text-muted transition-colors hover:border-accent/30 hover:text-ink has-[:checked]:border-accent/50 has-[:checked]:bg-accent/[0.06] has-[:checked]:text-ink">
              <input type="checkbox" name="painPoints" value={p}
                className="h-4 w-4 shrink-0 rounded border-border accent-[#14B8A6]" />
              {p}
            </label>
          ))}
        </div>
      </fieldset>

      <Field label="Anything else" hint="Optional">
        <textarea name="message" rows={4} placeholder="Tell us about your practice and where billing is hurting…"
          className="w-full rounded-xl border border-border bg-surface p-4 text-[0.95rem] leading-relaxed text-ink placeholder:text-faint focus:border-accent/60 focus:outline-none" />
      </Field>

      <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" disabled={submitting} className="sm:w-auto">
          {submitting ? (<><Loader2 className="h-4 w-4 animate-spin" /> Sending…</>) : "Request my free billing audit"}
        </Button>
        <p className="flex items-center gap-2 text-xs text-faint">
          <Lock className="h-3.5 w-3.5 shrink-0" />
          Your information is kept confidential. We respond within one business day.
        </p>
      </div>
    </form>
  );
}

function Field({
  label, children, required, hint, error,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  hint?: string;
  error?: string;
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
