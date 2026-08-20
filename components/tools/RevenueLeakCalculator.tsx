"use client";

import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button, Card } from "@/components/ui";
import { industry } from "@/lib/content/stats";
import { usd, compactUsd } from "@/lib/utils";

/**
 * No competitor in this category ships an interactive calculator — verified
 * across the ranking medical billing sites. It is the most linkable asset on
 * the site and the strongest conversion element, because it turns an abstract
 * problem into a specific dollar figure for the visitor's own practice.
 *
 * Every constant below traces to a cited source in lib/content/stats.ts.
 */

const REWORK_COST = 57.23;   // Premier Inc., 2023
const OVERTURN_RATE = 0.7;   // Premier Inc., 2023
const AVOIDABLE = 0.84;      // Optum, 2023

type Field = {
  id: "claims" | "value" | "denialRate";
  label: string;
  hint: string;
  min: number;
  max: number;
  step: number;
  format: (n: number) => string;
};

const FIELDS: Field[] = [
  { id: "claims", label: "Claims submitted per month", hint: "Across all providers", min: 50, max: 5000, step: 50, format: (n) => n.toLocaleString("en-US") },
  { id: "value", label: "Average claim value", hint: "Allowed amount, not billed charge", min: 50, max: 2000, step: 25, format: usd },
  { id: "denialRate", label: "Current denial rate", hint: "First-pass denials, if known", min: 2, max: 35, step: 1, format: (n) => `${n}%` },
];

export function RevenueLeakCalculator({ compact = false }: { compact?: boolean }) {
  const [values, setValues] = useState({ claims: 600, value: 220, denialRate: 12 });

  const result = useMemo(() => {
    const monthlyDenials = values.claims * (values.denialRate / 100);
    const annualDenials = monthlyDenials * 12;
    const deniedValue = annualDenials * values.value;

    // Recoverable = the share that would be overturned if every denial were
    // actually worked. Practices rarely work them all; that gap is the leak.
    const recoverable = deniedValue * OVERTURN_RATE;
    const reworkBurden = annualDenials * REWORK_COST;
    const preventable = annualDenials * AVOIDABLE;

    return { annualDenials, deniedValue, recoverable, reworkBurden, preventable };
  }, [values]);

  return (
    <Card hover={false} className={compact ? "p-6" : "p-6 sm:p-8"}>
      <div className="grid min-w-0 gap-8 lg:grid-cols-2 lg:gap-10">
        {/* Inputs */}
        <div className="min-w-0 space-y-7">
          {FIELDS.map((f) => (
            <div key={f.id}>
              <div className="flex items-baseline justify-between gap-3">
                <label htmlFor={f.id} className="text-sm font-500 text-ink">{f.label}</label>
                <output htmlFor={f.id} className="font-mono text-lg font-700 text-accent">
                  {f.format(values[f.id])}
                </output>
              </div>
              <input
                id={f.id}
                type="range"
                min={f.min}
                max={f.max}
                step={f.step}
                value={values[f.id]}
                onChange={(e) => setValues((v) => ({ ...v, [f.id]: Number(e.target.value) }))}
                className="range-control mt-2 w-full cursor-pointer accent-[#14B8A6]"
                aria-describedby={`${f.id}-hint`}
              />
              <p id={`${f.id}-hint`} className="mt-1.5 text-xs text-faint">{f.hint}</p>
            </div>
          ))}
        </div>

        {/* Result */}
        <div className="flex min-w-0 flex-col justify-between rounded-xl border border-accent/25 bg-gradient-to-b from-accent/[0.07] to-transparent p-5 sm:p-6">
          <div>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-faint">
              Estimated annual revenue at risk
            </p>
            <p className="mt-2 font-display text-[clamp(2.2rem,6vw,3.4rem)] font-700 leading-none text-accent">
              {compactUsd(result.deniedValue)}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              From roughly <strong className="text-ink">{Math.round(result.annualDenials).toLocaleString("en-US")}</strong> denied
              claims a year. Around <strong className="text-ink">{compactUsd(result.recoverable)}</strong> of that is typically
              recoverable on appeal — and about{" "}
              <strong className="text-ink">{Math.round(result.preventable).toLocaleString("en-US")}</strong> of those denials
              were avoidable in the first place.
            </p>

            <dl className="mt-6 space-y-2.5 border-t border-border pt-5 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Recoverable on appeal</dt>
                <dd className="font-mono font-600 text-positive">{usd(result.recoverable)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Annual cost just to rework them</dt>
                <dd className="font-mono font-600 text-ink">{usd(result.reworkBurden)}</dd>
              </div>
            </dl>
          </div>

          <div className="mt-7">
            <Button href="/contact" size="lg" className="w-full">
              Get your free billing audit <ArrowRight className="h-4 w-4" />
            </Button>
            <p className="mt-3 text-center text-xs text-faint">Takes 2 minutes. No sales pitch.</p>
          </div>
        </div>
      </div>

      <p className="mt-7 border-t border-border pt-5 text-xs leading-relaxed text-faint">
        <strong className="text-muted">Method:</strong> denied claim volume × average claim value.
        Recovery applies Premier Inc.&rsquo;s finding that ~70% of denied claims are overturned when appealed
        ({industry.overturnRate.dataYear}); rework cost uses Premier&rsquo;s {usd(REWORK_COST)} per contested claim; the
        avoidable share uses Optum&rsquo;s 84% figure ({industry.avoidable.dataYear}). This is an estimate for
        orientation, not a quote — a billing audit measures your actual numbers.
      </p>
    </Card>
  );
}
