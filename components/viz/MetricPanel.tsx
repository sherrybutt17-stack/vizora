"use client";

import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { CountUp } from "@/components/motion";
import { performance as perf } from "@/lib/content/stats";

/**
 * Hero visual. The service Vizora sells is abstract, so the first screen shows
 * the outcome as instrumentation rather than describing it in prose.
 */

const SERIES = [12, 19, 16, 27, 24, 35, 41, 38, 52, 58, 71, 84];

export function MetricPanel() {
  const reduced = useReducedMotion();
  const max = Math.max(...SERIES);
  const w = 520;
  const h = 150;
  const step = w / (SERIES.length - 1);

  const points = SERIES.map((v, i) => [i * step, h - (v / max) * (h - 16) - 8] as const);
  const line = points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const area = `${line} L${w},${h} L0,${h} Z`;

  const tiles = [
    { ...perf.cleanClaimRate, tone: "text-accent" },
    { ...perf.arDays, tone: "text-blue" },
    { ...perf.denialRecovery, tone: "text-positive" },
  ];

  return (
    <div className="ring-gradient relative overflow-hidden rounded-2xl bg-surface/80 p-5 shadow-lift backdrop-blur-xl sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-faint">
            Collections — trailing 12 months
          </p>
          <p className="mt-1 font-display text-2xl font-600 text-ink">
            <CountUp value="+38%" /> <span className="text-sm font-400 text-muted">vs. baseline</span>
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-positive/10 px-2.5 py-1 font-mono text-[0.65rem] font-600 text-positive ring-1 ring-positive/25">
          ● LIVE
        </span>
      </div>

      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" role="img"
        aria-label="Line chart showing collections trending upward over twelve months">
        <defs>
          <linearGradient id="mp-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#14B8A6" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#14B8A6" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="mp-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#3080FF" />
            <stop offset="100%" stopColor="#2EC4B6" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((f) => (
          <line key={f} x1="0" x2={w} y1={h * f} y2={h * f} stroke="#1E293B" strokeWidth="1" />
        ))}
        <path d={area} fill="url(#mp-fill)" />
        <path
          d={line}
          fill="none"
          stroke="url(#mp-line)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={reduced ? undefined : "animate-draw"}
          style={reduced ? undefined : { strokeDasharray: 1400, strokeDashoffset: 1400 }}
        />
        <circle cx={points[points.length - 1][0]} cy={points[points.length - 1][1]} r="4" fill="#2EC4B6" />
      </svg>

      <div className="mt-5 grid grid-cols-3 gap-3 border-t border-border pt-5">
        {tiles.map((t) => (
          <div key={t.label}>
            <p className={`font-mono text-xl font-700 ${t.tone}`}>
              <CountUp value={t.value} />
            </p>
            <p className="mt-0.5 text-[0.7rem] leading-tight text-faint">{t.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
