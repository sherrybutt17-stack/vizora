"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

/**
 * Latches true once the element has entered the viewport — OR once it has
 * been scrolled past entirely.
 *
 * That second condition matters. A plain `isIntersecting` observer can miss an
 * element completely when the user flicks the scroll wheel or restores a saved
 * scroll position, because the browser coalesces observer callbacks and the
 * element can travel through the viewport between two of them. When that
 * happens with `once: true`, the element never animates: counters freeze at
 * zero and reveal-wrapped sections stay at opacity 0 — invisible content, not
 * just a missing animation.
 *
 * Checking `boundingClientRect.top < 0` catches the miss, because the observer
 * still reports the exit even when it never reported the entry.
 */
export function useHasBeenSeen<T extends Element>(
  ref: RefObject<T | null>,
  { margin = "-40px", disabled = false }: { margin?: string; disabled?: boolean } = {},
) {
  const [seen, setSeen] = useState(false);
  // True when the element was already within the viewport on first paint, so
  // the caller can render the final state directly instead of fading in
  // content the visitor can already see.
  const [immediate, setImmediate] = useState(false);
  const done = useRef(false);

  /* eslint-disable react-hooks/set-state-in-effect --
     These setState calls resolve state from a DOM measurement
     (getBoundingClientRect) that is only available after layout, so it cannot
     be derived during render. The effect is subscribing to an external system
     — viewport intersection — which is exactly the case the rule exempts; the
     synchronous calls are the "already on screen at mount" fast path.
     Restructuring this is not cosmetic: the resolve-on-exit and failsafe paths
     below exist because a missed observer callback leaves real content
     invisible, not merely unanimated. */
  useEffect(() => {
    if (disabled) { setImmediate(true); setSeen(true); return; }
    const el = ref.current;
    if (!el || done.current) return;

    // Already above the fold on load, or restored mid-page: resolve immediately.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      done.current = true;
      setImmediate(true);
      setSeen(true);
      return;
    }
    if (rect.bottom <= 0) {
      done.current = true;
      setImmediate(true);
      setSeen(true);
      return;
    }

    const resolve = () => {
      if (done.current) return;
      done.current = true;
      setSeen(true);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      clearTimeout(failsafe);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting || entry.boundingClientRect.top < 0) resolve();
      },
      { rootMargin: margin },
    );
    observer.observe(el);

    // Second line of defence. Under very fast scrolling the browser can
    // coalesce observer callbacks and skip an element entirely, so we also
    // check position directly on scroll.
    function onScroll() {
      const r = el!.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) resolve();
      else if (r.bottom <= 0) resolve();
    }
    window.addEventListener("scroll", onScroll, { passive: true });

    // Last resort (2.5s, just past the 1.6s animation). Whatever happens, content must never stay hidden and a
    // counter must never sit at zero forever.
    const failsafe = window.setTimeout(resolve, 2500);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      clearTimeout(failsafe);
    };
  }, [ref, margin, disabled]);
  /* eslint-enable react-hooks/set-state-in-effect */

  return { seen, immediate };
}
