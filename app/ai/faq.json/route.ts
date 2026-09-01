import { site } from "@/lib/content/site";
import { allFaqs } from "@/lib/content/faq";
import { services } from "@/lib/content/services";
import { specialties } from "@/lib/content/specialties";
import { denialCodeDetails } from "@/lib/content/denial-code-details";
import { modifiers } from "@/lib/content/modifiers";
import { SITE_UPDATED } from "@/lib/utils";
import { aiJsonHeaders } from "@/lib/ai/json-headers";

/**
 * /ai/faq.json — every question-and-answer pair on the site, flattened.
 *
 * The same content is already emitted as FAQPage JSON-LD on the page it
 * belongs to. This endpoint exists because an answer engine deciding whether
 * to cite us should not have to crawl 250 pages to find out what we can
 * actually answer. Each entry carries `source`, so a citation can point at the
 * page the answer lives on rather than at this file.
 *
 * Built by concatenating the same arrays the pages render from. Adding an FAQ
 * anywhere on the site puts it here with no further work.
 */
export const dynamic = "force-static";

type Entry = { question: string; answer: string; topic: string; source: string };

export function GET() {
  const entries: Entry[] = [
    ...allFaqs.map((f) => ({
      question: f.question,
      answer: f.answer,
      topic: "General",
      source: `${site.url}/faq`,
    })),
    ...services.flatMap((s) =>
      s.faqs.map((f) => ({
        question: f.question,
        answer: f.answer,
        topic: s.name,
        source: `${site.url}/services/${s.slug}`,
      })),
    ),
    ...specialties.flatMap((s) =>
      s.faqs.map((f) => ({
        question: f.question,
        answer: f.answer,
        topic: `${s.name} billing`,
        source: `${site.url}/specialties/${s.slug}`,
      })),
    ),
    ...denialCodeDetails.flatMap((d) =>
      d.faqs.map((f) => ({
        question: f.question,
        answer: f.answer,
        topic: `Denial code ${d.code}`,
        source: `${site.url}/denial-codes/${d.code.toLowerCase()}`,
      })),
    ),
    ...modifiers.flatMap((m) =>
      m.faqs.map((f) => ({
        question: f.question,
        answer: f.answer,
        topic: `Modifier ${m.code}`,
        source: `${site.url}/modifiers/${m.code.toLowerCase()}`,
      })),
    ),
  ];

  return Response.json(
    {
      name: site.name,
      url: site.url,
      description: `Every published question and answer from ${site.name}, covering medical billing, revenue cycle management, denial codes, CPT modifiers and specialty billing.`,
      count: entries.length,
      attribution: `${site.name} (${site.url})`,
      updated: SITE_UPDATED,
      faqs: entries,
    },
    { headers: aiJsonHeaders },
  );
}
