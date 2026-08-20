"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { Button } from "@/components/ui";

/** Appears once the visitor is past the fold. Dismissible for the session. */
export function StickyCTA() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 900);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const hidden = dismissed || !show || pathname === "/contact" || pathname === "/thank-you";
  if (hidden) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg/92 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-5 py-3 sm:px-8">
        <p className="flex-1 text-sm text-ink-2">
          <span className="font-600 text-ink">Find your revenue leaks.</span>{" "}
          <span className="hidden sm:inline">Free billing audit — takes 2 minutes, no sales pitch.</span>
        </p>
        <Button href="/contact" size="md" className="shrink-0">Get free audit</Button>
        <button
          onClick={() => setDismissed(true)}
          aria-label="Dismiss"
          className="shrink-0 rounded-lg p-1.5 text-faint transition-colors hover:text-ink"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
