import { services } from "./services";
import { specialties } from "./specialties";
import { comparisons } from "./comparisons";

export type NavLink = { label: string; href: string; description?: string };

export const primaryNav: NavLink[] = [
  { label: "Services", href: "/services" },
  { label: "Specialties", href: "/specialties" },
  { label: "Locations", href: "/locations" },
  { label: "Results", href: "/case-studies" },
  { label: "Pricing", href: "/pricing" },
  { label: "Resources", href: "/blog" },
];

export const serviceNav: NavLink[] = services.map((s) => ({
  label: s.short,
  href: `/services/${s.slug}`,
  description: s.blurb,
}));

/** Featured on the mega-menu; the hub links to the rest. */
export const featuredSpecialties: NavLink[] = specialties
  .slice(0, 8)
  .map((s) => ({ label: s.name, href: `/specialties/${s.slug}` }));

export const toolsNav: NavLink[] = [
  { label: "Revenue Leak Calculator", href: "/tools/revenue-leak-calculator", description: "See what denials cost your practice each year" },
  { label: "Denial Code Lookup", href: "/tools/denial-code-lookup", description: "Plain-English CARC and RARC explanations" },
  { label: "RCM Benchmarks", href: "/resources/rcm-benchmarks", description: "Cited industry benchmarks with sources" },
  { label: "CPT Modifiers Explained", href: "/modifiers", description: "When each modifier applies — and when it does not" },
  { label: "Medical Billing Glossary", href: "/glossary", description: "Every term defined, with the distinction that matters" },
];

/** Editorial and decision-support content. Kept separate from tools so the
 *  mega-menu can distinguish "do something" from "understand something". */
export const learnNav: NavLink[] = [
  { label: "Comparisons", href: "/compare", description: "In-house vs outsourced, and four more decisions" },
  { label: "Blog", href: "/blog", description: "Denial reduction and revenue cycle operations" },
  { label: "Case studies", href: "/case-studies", description: "Measured results, named practices" },
  { label: "FAQ", href: "/faq", description: "The questions practices ask before signing" },
  { label: "All resources", href: "/resources", description: "Tools, references and primary sources" },
];

/** Top comparison pages, surfaced in nav because they carry the highest intent. */
export const compareNav: NavLink[] = comparisons.slice(0, 4).map((c) => ({
  label: c.title,
  href: `/compare/${c.slug}`,
}));

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Services",
    links: services.slice(0, 8).map((s) => ({ label: s.short, href: `/services/${s.slug}` })),
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Case studies", href: "/case-studies" },
      { label: "Pricing", href: "/pricing" },
      { label: "Referral program", href: "/referral" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Revenue Leak Calculator", href: "/tools/revenue-leak-calculator" },
      { label: "Denial Code Lookup", href: "/tools/denial-code-lookup" },
      { label: "RCM Benchmarks", href: "/resources/rcm-benchmarks" },
      { label: "CPT Modifiers", href: "/modifiers" },
      { label: "Glossary", href: "/glossary" },
      { label: "Comparisons", href: "/compare" },
      { label: "All resources", href: "/resources" },
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "HIPAA Compliance", href: "/hipaa" },
      { label: "Business Associate Agreement", href: "/baa" },
    ],
  },
];
