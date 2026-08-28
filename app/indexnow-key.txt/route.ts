import { INDEXNOW_KEY } from "@/lib/ai/indexnow";

/**
 * Serves the IndexNow key. Hosting this at a URL on this domain is what
 * proves to the search engines that a submission came from someone who
 * controls the domain. See lib/ai/indexnow.ts.
 */
export const dynamic = "force-static";

export function GET() {
  return new Response(INDEXNOW_KEY, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
