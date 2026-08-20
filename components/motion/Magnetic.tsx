"use client";

import { useEffect } from "react";

/**
 * Magnetic pull on primary buttons — they lean toward the cursor as it
 * approaches, then spring back on exit.
 *
 * Mounted once, globally, rather than wrapping each button in a client
 * component. That matters for two reasons: `Button` stays a server component
 * (no client boundary pushed into every page that renders a CTA), and the
 * whole effect costs exactly one delegated pointer listener for the entire
 * site instead of one per button.
 *
 * The listener early-returns unless the pointer is actually over a magnetic
 * element, so the common case is a single comparison. Movement is written
 * straight to the node inside a rAF — no React state, so nothing re-renders.
 *
 * Skipped entirely for coarse pointers (there is no hover on a touchscreen)
 * and for anyone who has asked for reduced motion.
 */
const STRENGTH = 0.28;
const MAX_OFFSET = 7;

export function Magnetic() {
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || still.matches) return;

    let active: HTMLElement | null = null;
    let frame = 0;
    let px = 0;
    let py = 0;

    const apply = () => {
      frame = 0;
      if (!active) return;
      const r = active.getBoundingClientRect();
      const dx = (px - (r.left + r.width / 2)) * STRENGTH;
      const dy = (py - (r.top + r.height / 2)) * STRENGTH;
      const clamp = (n: number) => Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, n));
      active.style.transform = `translate3d(${clamp(dx).toFixed(2)}px, ${clamp(dy).toFixed(2)}px, 0)`;
    };

    const onOver = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.("[data-magnetic]") as HTMLElement | null;
      if (el === active) return;
      release();
      active = el;
      if (active) active.style.transition = "transform 0.12s linear";
    };

    const onMove = (e: PointerEvent) => {
      if (!active) return;
      px = e.clientX;
      py = e.clientY;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    function release() {
      if (!active) return;
      // Longer, eased return so letting go feels like a spring rather than a cut.
      active.style.transition = "transform 0.45s cubic-bezier(0.34, 1.4, 0.64, 1)";
      active.style.transform = "";
      active = null;
    }

    const onOut = (e: PointerEvent) => {
      if (!active) return;
      const to = e.relatedTarget as Element | null;
      if (to && to.closest?.("[data-magnetic]") === active) return;
      release();
    };

    document.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerout", onOut, { passive: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      release();
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerout", onOut);
    };
  }, []);

  return null;
}
