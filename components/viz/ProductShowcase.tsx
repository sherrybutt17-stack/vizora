"use client";

import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { CheckCircle2, Clock3, AlertTriangle, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * A looping, self-animating dashboard.
 *
 * This is deliberately vector and DOM rather than a video file. It stays sharp
 * on every display, weighs a few KB against several MB, needs no poster frame
 * or codec fallback, respects prefers-reduced-motion, and stays readable to
 * screen readers and crawlers — none of which is true of an embedded MP4.
 */

type Status = "submitted" | "scrubbing" | "paid" | "denied" | "appealed";

const STATUS_META: Record<Status, { label: string; className: string; Icon: typeof CheckCircle2 }> = {
  scrubbing: { label: "Scrubbing",  className: "text-blue bg-blue/10 ring-blue/25",       Icon: Clock3 },
  submitted: { label: "Submitted",  className: "text-muted bg-surface-3 ring-border",      Icon: Clock3 },
  denied:    { label: "Denied",     className: "text-danger bg-danger/10 ring-danger/25",  Icon: AlertTriangle },
  appealed:  { label: "Appealing",  className: "text-warning bg-warning/10 ring-warning/25", Icon: TrendingUp },
  paid:      { label: "Paid",       className: "text-positive bg-positive/10 ring-positive/25", Icon: CheckCircle2 },
};

const ROWS = [
  { id: "CLM-40881", payer: "Blue Cross", cpt: "93306", amount: 412, arc: ["scrubbing", "submitted", "paid"] },
  { id: "CLM-40882", payer: "Aetna",      cpt: "99214", amount: 168, arc: ["submitted", "denied", "appealed", "paid"] },
  { id: "CLM-40883", payer: "UnitedHealth", cpt: "29881", amount: 1_240, arc: ["scrubbing", "submitted", "paid"] },
  { id: "CLM-40884", payer: "Medicare",   cpt: "45380", amount: 386, arc: ["submitted", "paid"] },
  { id: "CLM-40885", payer: "Cigna",      cpt: "90837", amount: 142, arc: ["scrubbing", "denied", "appealed", "paid"] },
] as const;

const SERIES = [38, 42, 40, 51, 49, 58, 63, 61, 72, 78, 86, 94];

export function ProductShowcase({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => setTick((t) => t + 1), 1600);
    return () => window.clearInterval(id);
  }, [reduced]);

  const statuses = useMemo(
    () =>
      ROWS.map((r, i) => {
        if (reduced) return r.arc[r.arc.length - 1] as Status;
        const step = Math.max(0, tick - i);
        return r.arc[Math.min(step, r.arc.length - 1)] as Status;
      }),
    [tick, reduced],
  );

  const collected = statuses.reduce(
    (sum, st, i) => (st === "paid" ? sum + ROWS[i].amount : sum),
    0,
  );

  const w = 560, h = 128, max = Math.max(...SERIES);
  const pts = SERIES.map((v, i) => [
    (i / (SERIES.length - 1)) * w,
    h - (v / max) * (h - 14) - 7,
  ] as const);
  const line = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");

  return (
    <div className={cn("border-sheen glass grain relative overflow-hidden rounded-2xl shadow-lift", className)}>
      {/* chrome bar */}
      <div className="flex items-center gap-2 border-b border-border/70 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-danger/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-warning/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-positive/60" />
        <p className="ml-2 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-faint">
          vizora · claims workspace
        </p>
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-positive/10 px-2 py-0.5 font-mono text-[0.58rem] font-600 text-positive ring-1 ring-positive/25">
          <span className="relative flex h-1.5 w-1.5">
            {!reduced && <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-positive" />}
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-positive" />
          </span>
          LIVE
        </span>
      </div>

      <div className="p-4 sm:p-5">
        {/* KPI row */}
        <div className="grid grid-cols-3 gap-2.5">
          {[
            { label: "Collected today", value: `$${collected.toLocaleString("en-US")}`, tone: "text-accent" },
            { label: "Clean claim rate", value: "97%", tone: "text-positive" },
            { label: "Days in AR", value: "24", tone: "text-blue" },
          ].map((k) => (
            <div key={k.label} className="rounded-xl border border-border/70 bg-bg/40 p-3">
              <p className={cn("font-mono text-base font-700 tabular-nums sm:text-lg", k.tone)}>{k.value}</p>
              <p className="mt-0.5 text-[0.6rem] leading-tight text-faint sm:text-[0.65rem]">{k.label}</p>
            </div>
          ))}
        </div>

        {/* chart */}
        <div className="mt-4 rounded-xl border border-border/70 bg-bg/40 p-3">
          <svg viewBox={`0 0 ${w} ${h}`} className="w-full" role="img"
            aria-label="Collections trending upward across twelve months">
            <defs>
              <linearGradient id="ps-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#14B8A6" stopOpacity="0.30" />
                <stop offset="100%" stopColor="#14B8A6" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="ps-line" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#3080FF" />
                <stop offset="55%" stopColor="#2EC4B6" />
                <stop offset="100%" stopColor="#14B8A6" />
              </linearGradient>
            </defs>
            {[0.3, 0.65].map((f) => (
              <line key={f} x1="0" x2={w} y1={h * f} y2={h * f} stroke="#1E293B" strokeWidth="1" />
            ))}
            <path d={`${line} L${w},${h} L0,${h} Z`} fill="url(#ps-fill)" />
            <path
              d={line} fill="none" stroke="url(#ps-line)" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round"
              className={reduced ? undefined : "animate-draw"}
              style={reduced ? undefined : { strokeDasharray: 1200, strokeDashoffset: 1200 }}
            />
            <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="4.5" fill="#2EC4B6" />
            {!reduced && (
              <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="4.5"
                fill="none" stroke="#2EC4B6" strokeWidth="1.5" className="animate-pulse-ring"
                style={{ transformOrigin: `${pts[pts.length - 1][0]}px ${pts[pts.length - 1][1]}px` }} />
            )}
          </svg>
        </div>

        {/* claim rows cycling through real statuses */}
        <div className="mt-4 space-y-1.5">
          {ROWS.map((r, i) => {
            const st = statuses[i];
            const meta = STATUS_META[st];
            return (
              <div key={r.id}
                className="flex items-center gap-2.5 rounded-lg border border-border/60 bg-bg/40 px-3 py-2 text-[0.7rem]">
                <span className="font-mono text-faint">{r.id}</span>
                <span className="hidden truncate text-muted sm:inline">{r.payer}</span>
                <span className="ml-auto font-mono text-faint">{r.cpt}</span>
                <span className="font-mono tabular-nums text-ink-2">${r.amount.toLocaleString("en-US")}</span>
                <span className={cn(
                  "inline-flex min-w-[5.4rem] items-center justify-center gap-1 rounded-full px-2 py-0.5 font-500 ring-1 transition-colors duration-500",
                  meta.className,
                )}>
                  <meta.Icon className="h-3 w-3" />
                  {meta.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
