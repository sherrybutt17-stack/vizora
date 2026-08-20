"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "./useReducedMotion";

/**
 * Thin gradient progress bar pinned under the header.
 *
 * Previously framer-motion's `useScroll` + `useSpring`. This does the same job
 * by writing `transform` straight to the node from a rAF loop — no React state,
 * so no re-render on scroll, and no dependency. The lerp reproduces the spring's
 * easing: the bar chases the true scroll position rather than snapping to it,
 * which is what made the original feel considered.
 */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    let current = 0;

    const target = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      if (max <= 0) return 0;
      return Math.min(Math.max(doc.scrollTop / max, 0), 1);
    };

    const tick = () => {
      const to = target();
      current += (to - current) * 0.18;
      // Settle exactly rather than approaching forever, so the loop can stop.
      if (Math.abs(to - current) < 0.0005) current = to;
      el.style.transform = `scaleX(${current})`;
      frame = current === to ? 0 : requestAnimationFrame(tick);
    };

    const schedule = () => { if (!frame) frame = requestAnimationFrame(tick); };

    current = target();
    el.style.transform = `scaleX(${current})`;
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{ transform: "scaleX(0)" }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-blue via-accent-2 to-accent"
    />
  );
}
