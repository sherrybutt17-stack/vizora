import Link from "next/link";
import { ShieldCheck, Phone, Mail, Clock } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/ui";
import { footerNav } from "@/lib/content/nav";
import { specialties } from "@/lib/content/specialties";
import { statesByRegion, REGIONS } from "@/lib/content/locations";
import { site, certifications } from "@/lib/content/site";

export function Footer() {
  const year = new Date().getFullYear();
  const byRegion = statesByRegion();
  return (
    <footer className="mt-auto border-t border-border bg-bg-soft">
      <Container className="py-14">
        <div className="footer-stagger grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Built to help healthcare practices simplify billing, reduce administrative
              burden, and improve revenue visibility.
            </p>
            <div className="mt-5 space-y-2 text-sm">
              <a href={site.phoneHref} className="flex items-center gap-2 text-muted transition-colors hover:text-accent">
                <Phone className="h-3.5 w-3.5 shrink-0" /> {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className="flex items-center gap-2 text-muted transition-colors hover:text-accent">
                <Mail className="h-3.5 w-3.5 shrink-0" /> {site.email}
              </a>
              <p className="flex items-center gap-2 text-faint">
                <Clock className="h-3.5 w-3.5 shrink-0" /> {site.hours}
              </p>
            </div>
          </div>

          {footerNav.map((group) => (
            <div key={group.title} className="lg:col-span-2">
              <h3 className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-faint">
                {group.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-muted transition-colors hover:text-accent">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Deep internal linking.
            Programmatic pages die as orphans — a page reachable only from its
            own hub gets crawled late and passed almost no authority. Every
            specialty and every state is linked from every page on the site
            through this block, which is the cheapest structural fix there is. */}
        <div className="mt-14 border-t border-border pt-10">
          <details className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-500 text-ink marker:hidden">
              <span>Browse all specialties and locations</span>
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-faint transition-colors group-hover:text-accent">
                {specialties.length} specialties · 50 states
              </span>
            </summary>

            <div className="mt-8 space-y-9">
              <div>
                <h3 className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-faint">
                  Specialties
                </h3>
                <ul className="link-list mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-3 lg:grid-cols-5">
                  {specialties.map((sp) => (
                    <li key={sp.slug}>
                      <Link href={`/specialties/${sp.slug}`} className="text-[0.8rem] text-muted transition-colors hover:text-accent">
                        {sp.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {REGIONS.map((region) => (
                <div key={region}>
                  <h3 className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-faint">
                    {region}
                  </h3>
                  <ul className="link-list mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-3 lg:grid-cols-5">
                    {byRegion[region].map((st) => (
                      <li key={st.slug}>
                        <Link href={`/locations/${st.slug}`} className="text-[0.8rem] text-muted transition-colors hover:text-accent">
                          {st.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </details>
        </div>

        <div className="mt-12 flex flex-wrap gap-2.5 border-t border-border pt-8">
          {certifications.slice(0, 5).map((c) => (
            <span
              key={c.label}
              title={c.detail}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-500 text-muted"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-accent" />
              {c.label}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-border pt-8 text-xs text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {site.name}. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Link href="/sitemap" className="transition-colors hover:text-accent">Sitemap</Link>
            <a href="/llms.txt" className="transition-colors hover:text-accent">llms.txt</a>
            <a href="/pricing.md" className="transition-colors hover:text-accent">pricing.md</a>
            <span className="hidden sm:inline">HIPAA-conscious billing support</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
