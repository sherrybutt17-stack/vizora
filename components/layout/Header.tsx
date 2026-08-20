"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X, Phone } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Button, Container } from "@/components/ui";
import { serviceNav, toolsNav, featuredSpecialties, learnNav, compareNav } from "@/lib/content/nav";
import { site } from "@/lib/content/site";
import { cn } from "@/lib/utils";

/**
 * The two mega-menu panels. A type rather than an object: the labels and hrefs
 * are written in the JSX below, so the object's values were never read — only
 * its keys, as the union for `open`.
 */
type MenuKey = "services" | "resources";

export function Header() {
  const [open, setOpen] = useState<MenuKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close everything on navigation. Adjusted during render rather than in an
  // effect: React re-runs this component immediately with the reset state,
  // before paint, so a mega menu can never be seen open on the new route.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(null);
    setMobileOpen(false);
  }

  // Escape closes; click outside closes the mega menu
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(null); setMobileOpen(false); }
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  // Lock scroll behind the mobile sheet
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const linkCls = (href: string) =>
    cn(
      "text-sm font-500 transition-colors",
      pathname.startsWith(href) && href !== "/" ? "text-ink" : "text-muted hover:text-ink",
    );

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-600 focus:text-[#04211e]"
      >
        Skip to content
      </a>

      <header
        // Anchors the header during route view transitions: the CSS for
        // `site-header` suppresses its animation so page content slides
        // beneath it rather than the whole viewport moving.
        style={{ viewTransitionName: "site-header" }}
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-bg/80 backdrop-blur-xl backdrop-saturate-150 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-border after:to-transparent"
            : "",
        )}
      >
        <Container>
          <nav ref={navRef} className="flex h-[4.5rem] items-center justify-between gap-6">
            <Link href="/" aria-label={`${site.name} home`} transitionTypes={["nav-back"]} className="shrink-0">
              <Logo />
            </Link>

            {/* Desktop nav */}
            <div className="hidden items-center gap-7 lg:flex">
              <button
                onClick={() => setOpen(open === "services" ? null : "services")}
                aria-expanded={open === "services"}
                className={cn("flex items-center gap-1", linkCls("/services"))}
              >
                Services
                <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", open === "services" && "rotate-180")} />
              </button>
              <Link href="/specialties" transitionTypes={["nav-forward"]} className={linkCls("/specialties")}>Specialties</Link>
              <Link href="/locations" transitionTypes={["nav-forward"]} className={linkCls("/locations")}>Locations</Link>
              <Link href="/case-studies" transitionTypes={["nav-forward"]} className={linkCls("/case-studies")}>Results</Link>
              <Link href="/pricing" transitionTypes={["nav-forward"]} className={linkCls("/pricing")}>Pricing</Link>
              <button
                onClick={() => setOpen(open === "resources" ? null : "resources")}
                aria-expanded={open === "resources"}
                className={cn("flex items-center gap-1", linkCls("/blog"))}
              >
                Resources
                <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", open === "resources" && "rotate-180")} />
              </button>
            </div>

            <div className="hidden items-center gap-3 lg:flex">
              <a href={site.phoneHref} className="flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink">
                <Phone className="h-3.5 w-3.5" />
                {site.phone}
              </a>
              <Button href="/contact" size="md">Get free audit</Button>
            </div>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="rounded-lg p-2 text-ink lg:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </nav>
        </Container>

        {/* Mega menu */}
        {open && (
          <div className="absolute inset-x-0 top-full hidden border-y border-border bg-bg-soft/95 shadow-2xl backdrop-blur-xl lg:block">
            <Container>
              {open === "services" ? (
                <div className="grid grid-cols-12 gap-8 py-8">
                  <div className="col-span-3">
                    <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-accent">Our services</p>
                    <h3 className="mt-3 text-xl font-600 leading-snug">End-to-end revenue cycle</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      Twelve services covering every stage where revenue is earned, delayed or lost.
                    </p>
                    <Link href="/services" transitionTypes={["nav-forward"]} className="mt-4 inline-block text-sm font-500 text-accent hover:text-accent-2">
                      View all services →
                    </Link>
                  </div>
                  <div className="col-span-9 grid grid-cols-3 gap-x-6 gap-y-1">
                    {serviceNav.map((s) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        className="group rounded-lg px-3 py-2.5 transition-colors hover:bg-surface-2"
                      >
                        <span className="block text-sm font-500 text-ink group-hover:text-accent">{s.label}</span>
                        <span className="mt-0.5 block text-xs leading-snug text-faint">{s.description}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-12 gap-8 py-8">
                  <div className="col-span-5">
                    <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-accent">Free tools</p>
                    <div className="mt-4 space-y-1">
                      {toolsNav.map((t) => (
                        <Link key={t.href} href={t.href} transitionTypes={["nav-forward"]} className="group block rounded-lg px-3 py-2.5 transition-colors hover:bg-surface-2">
                          <span className="block text-sm font-500 text-ink group-hover:text-accent">{t.label}</span>
                          <span className="mt-0.5 block text-xs text-faint">{t.description}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="col-span-4">
                    <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-accent">Specialties</p>
                    <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1.5">
                      {featuredSpecialties.map((s) => (
                        <Link key={s.href} href={s.href} transitionTypes={["nav-forward"]} className="text-sm text-muted transition-colors hover:text-accent">
                          {s.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="col-span-3">
                    <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-accent">Learn</p>
                    <div className="mt-4 space-y-1.5">
                      {learnNav.map((l) => (
                        <Link key={l.href} href={l.href} transitionTypes={["nav-forward"]} className="block text-sm text-muted hover:text-accent">
                          {l.label}
                        </Link>
                      ))}
                    </div>
                    <p className="mt-5 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-accent">Compare</p>
                    <div className="mt-3 space-y-1.5">
                      {compareNav.map((l) => (
                        <Link key={l.href} href={l.href} transitionTypes={["nav-forward"]} className="block text-xs leading-snug text-faint hover:text-accent">
                          {l.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </Container>
          </div>
        )}
      </header>

      {/* Mobile sheet */}
      {mobileOpen && (
        <div className="fixed inset-0 top-[4.5rem] z-40 overflow-y-auto border-t border-border bg-bg lg:hidden">
          <Container className="py-6">
            <MobileGroup title="Services" links={serviceNav} />
            <MobileGroup title="Tools" links={toolsNav} />
            <div className="mt-6 space-y-1 border-t border-border pt-6">
              {[
                { label: "Specialties", href: "/specialties" },
                { label: "Locations", href: "/locations" },
                { label: "Case studies", href: "/case-studies" },
                { label: "Pricing", href: "/pricing" },
                { label: "Compare options", href: "/compare" },
                { label: "Glossary", href: "/glossary" },
                { label: "All resources", href: "/resources" },
                { label: "Blog", href: "/blog" },
                { label: "FAQ", href: "/faq" },
                { label: "About", href: "/about" },
              ].map((l) => (
                <Link key={l.href} href={l.href} transitionTypes={["nav-forward"]} className="block py-2.5 text-[0.95rem] font-500 text-ink">
                  {l.label}
                </Link>
              ))}
            </div>
            <div className="mt-6 flex flex-col gap-3 border-t border-border pt-6">
              <Button href="/contact" size="lg" className="w-full">Get free billing audit</Button>
              <a href={site.phoneHref} className="flex items-center justify-center gap-2 py-2 text-sm text-muted">
                <Phone className="h-4 w-4" /> {site.phone}
              </a>
            </div>
          </Container>
        </div>
      )}
    </>
  );
}

function MobileGroup({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div className="mb-6">
      <p className="mb-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-accent">{title}</p>
      <div className="grid grid-cols-2 gap-x-4">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="py-2 text-sm text-muted">{l.label}</Link>
        ))}
      </div>
    </div>
  );
}
