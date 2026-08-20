import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/* ---------------------------------------------------------------- Container */
export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full min-w-0 max-w-7xl px-4 sm:px-6 lg:px-8", className)}>{children}</div>;
}

/* ------------------------------------------------------------------ Section */
export function Section({
  className, children, id,
}: { className?: string; children: ReactNode; id?: string }) {
  return (
    <section id={id} className={cn("py-20 sm:py-28 lg:py-32", className)}>
      {children}
    </section>
  );
}

/* ------------------------------------------------------------------ Eyebrow */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn(
      "font-mono text-[0.68rem] font-600 uppercase tracking-[0.2em] text-accent",
      className,
    )}>
      {children}
    </p>
  );
}

/* --------------------------------------------------------------- SectionHead */
export function SectionHead({
  eyebrow, title, lead, align = "center", className, as: Heading = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "center" | "left";
  className?: string;
  /**
   * Heading level. Defaults to h2 because most SectionHeads introduce a
   * section within a page — but when a SectionHead IS the page title (every
   * hub and static page uses it that way) it must be `h1`, or the page ships
   * with no H1 at all. That was true of 21 pages before this prop existed.
   */
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn(
      "flex flex-col gap-4",
      align === "center" ? "mx-auto max-w-3xl text-center items-center" : "max-w-3xl",
      className,
    )}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Heading className="text-display-md font-600">{title}</Heading>
      {lead && (
        <p className={cn("lead text-muted", align === "center" && "mx-auto")}>{lead}</p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------- Button */
type ButtonProps = {
  href?: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
};

const buttonBase =
  "group/btn relative inline-flex items-center justify-center gap-2 rounded-full font-500 whitespace-nowrap " +
  "transition-all duration-200 ease-spring active:translate-y-0 active:scale-[0.985] " +
  "disabled:opacity-50 disabled:pointer-events-none";

const buttonVariants = {
  // The inset highlight is what stops a flat fill reading as a coloured
  // rectangle — it gives the button a top edge catching the same light as
  // every raised surface on the page.
  primary:
    "bg-accent text-[#04211e] font-600 shadow-[0_1px_0_0_rgba(255,255,255,0.35)_inset,0_10px_30px_-12px_rgba(20,184,166,0.7)] " +
    "hover:bg-accent-2 hover:-translate-y-0.5 hover:shadow-[0_1px_0_0_rgba(255,255,255,0.4)_inset,0_18px_44px_-14px_rgba(20,184,166,0.85)]",
  secondary:
    "bg-surface-2 text-ink ring-1 ring-border shadow-[0_1px_0_0_rgba(255,255,255,0.06)_inset] " +
    "hover:bg-surface-3 hover:ring-accent/40 hover:-translate-y-0.5",
  ghost: "text-ink-2 hover:text-ink hover:bg-surface-2",
};

const buttonSizes = { md: "h-11 px-5 text-sm", lg: "h-13 px-7 text-[0.95rem]" };

export function Button({
  href, children, variant = "primary", size = "md", className, type = "button", onClick, disabled,
}: ButtonProps) {
  const classes = cn(buttonBase, buttonVariants[variant], buttonSizes[size], className);
  // Primary CTAs lean toward the cursor. Handled by one delegated listener in
  // <Magnetic>, so this stays a data attribute rather than a client boundary.
  const magnetic = variant === "primary" ? { "data-magnetic": "" } : {};
  if (href) {
    const external = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
    if (external) return <a href={href} className={classes} {...magnetic}>{children}</a>;
    return <Link href={href} className={classes} {...magnetic}>{children}</Link>;
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes} {...magnetic}>
      {children}
    </button>
  );
}

/* --------------------------------------------------------------------- Card */
export function Card({
  className, children, hover = true, raised = false, as: As = "div",
}: {
  className?: string;
  children: ReactNode;
  hover?: boolean;
  /** Elevated material with a specular top edge. Use for the one or two cards
   *  that should read as the subject of a section, not for every card — the
   *  effect is only elevation if something else is lower. */
  raised?: boolean;
  as?: "div" | "article" | "li";
}) {
  return (
    <As className={cn(
      "relative min-w-0 rounded-2xl border border-border p-5 sm:p-6",
      raised ? "surface-raised edge-light border-border-soft" : "bg-surface",
      hover && "transition-all duration-300 ease-spring hover:border-accent/30 hover:-translate-y-1",
      hover && !raised && "hover:bg-surface-2",
      className,
    )}>
      {children}
    </As>
  );
}

/* -------------------------------------------------------------------- Badge */
export function Badge({
  children, className, tone = "default",
}: {
  children: ReactNode;
  className?: string;
  tone?: "default" | "accent" | "positive";
}) {
  const tones = {
    default: "bg-surface-2 text-muted ring-border",
    accent: "bg-accent/10 text-accent ring-accent/25",
    positive: "bg-positive/10 text-positive ring-positive/25",
  };
  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-500 ring-1",
      tones[tone], className,
    )}>
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------- Prose */
export function Prose({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn(
      "space-y-4 text-[1.02rem] leading-[1.75] text-ink-2",
      "[&_a]:text-accent [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-accent-2",
      "[&_strong]:text-ink [&_strong]:font-600",
      className,
    )}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------- Table */
export function DataTable({
  headers, rows, className,
}: { headers: string[]; rows: (string | ReactNode)[][]; className?: string }) {
  return (
    <div className={cn("overflow-x-auto rounded-xl border border-border", className)}>
      {/* `table-rise` gives each row its own scroll timeline so the table
          assembles as it enters the viewport. CSS-only — see globals.css. */}
      <table className="table-rise w-full min-w-[32rem] border-collapse text-sm">
        <thead>
          <tr className="bg-surface-2">
            {headers.map((h) => (
              <th key={h} className="px-4 py-3 text-left font-600 text-ink whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-border">
              {row.map((cell, j) => (
                <td key={j} className={cn("px-4 py-3 align-top", j === 0 ? "text-ink font-500" : "text-muted")}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
