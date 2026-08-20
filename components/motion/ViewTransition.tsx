import * as React from "react";
import type { ComponentType, ReactNode } from "react";

/** A class name, or a map of transition type -> class name. */
type TransitionValue = string | Record<string, string>;

export type ViewTransitionProps = {
  children?: ReactNode;
  /** Shared identity. Elements with the same name on both pages morph. */
  name?: string;
  enter?: TransitionValue;
  exit?: TransitionValue;
  share?: TransitionValue;
  update?: TransitionValue;
  default?: TransitionValue;
};

/**
 * React's `<ViewTransition>`, typed and guarded.
 *
 * Two reasons this indirection exists rather than importing from "react"
 * directly at each call site:
 *
 *  1. `@types/react` does not declare `ViewTransition` yet, so a direct named
 *     import fails typecheck. The runtime export is real — Next aliases "react"
 *     to its vendored canary build, which exports it in both the client and
 *     the react-server condition.
 *  2. If a future runtime drops it, rendering `undefined` as a component
 *     throws and takes the whole page down. Falling back to a passthrough
 *     means the site renders normally and simply does not animate — which is
 *     the same degradation browsers without View Transitions API support get.
 */
const Impl = (React as unknown as { ViewTransition?: ComponentType<ViewTransitionProps> })
  .ViewTransition;

const Passthrough: ComponentType<ViewTransitionProps> = ({ children }) => <>{children}</>;

export const ViewTransition: ComponentType<ViewTransitionProps> = Impl ?? Passthrough;

/**
 * Directional page wrapper. Applied per `page.tsx` — never in a layout, since
 * layouts persist across navigation and their enter/exit never fire.
 */
const DIRECTIONAL = {
  "nav-forward": "nav-forward",
  "nav-back": "nav-back",
  default: "none",
} as const;

export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter={DIRECTIONAL} exit={DIRECTIONAL} default="none">
      {children}
    </ViewTransition>
  );
}
