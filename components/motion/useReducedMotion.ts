"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

const getSnapshot = () => window.matchMedia(QUERY).matches;

/** Motion is assumed during SSR; the client corrects it on hydration. */
const getServerSnapshot = () => false;

/**
 * Whether the visitor has asked for reduced motion.
 *
 * Local rather than imported from framer-motion. This hook was the only thing
 * five of the six motion components actually used from that package, and it
 * was pulling a ~118KB chunk onto the critical path of every page — where it
 * competed with the hero paint for main-thread time. This file buys that back.
 *
 * `useSyncExternalStore` rather than useState + useEffect: matchMedia is
 * exactly the external store this hook is designed for, so there is no
 * setState-in-effect and no extra render pass on mount. It also gives a real
 * server snapshot, so the markup React renders on the server and the first
 * client render agree.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
