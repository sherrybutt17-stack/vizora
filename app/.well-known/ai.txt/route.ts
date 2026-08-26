import { aiTxtBody, aiTxtHeaders } from "@/lib/ai/ai-txt";

/**
 * /.well-known/ai.txt — the conventional location. See lib/ai/ai-txt.ts for
 * why this and /ai.txt share one body.
 */
export const dynamic = "force-static";

export function GET() {
  return new Response(aiTxtBody(), { headers: aiTxtHeaders });
}
