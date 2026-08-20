import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/**
 * Outbound link to a primary source.
 *
 * Deliberately NOT nofollow. Linking to CMS, X12 or MGMA when we cite them is
 * a quality signal, not a leak — and a claim that names its source without
 * letting you check it is worth less than no claim at all.
 *
 * `noopener` is set for the security reason, not the SEO one.
 */
export function ExternalLink({
  href,
  children,
  className,
  showIcon = true,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  showIcon?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className={cn(
        // `inline`, not `inline-flex`: these sit inside sentences and captions,
        // and an inline-flex link breaks the line box it is supposed to belong
        // to — it also loses the WCAG 2.5.8 "inline target" exemption, which
        // only applies to targets constrained by surrounding line-height.
        "inline underline decoration-dotted underline-offset-4 transition-colors hover:text-accent",
        className,
      )}
    >
      {children}
      {showIcon && (
        <ArrowUpRight className="ml-0.5 inline h-3 w-3 align-[-0.08em] opacity-70" aria-hidden="true" />
      )}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
