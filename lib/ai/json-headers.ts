/**
 * Shared response headers for the /ai/*.json discovery endpoints.
 *
 * `Access-Control-Allow-Origin: *` is deliberate — these files exist to be
 * fetched by agents and tools running from other origins. There is nothing
 * private in them; every value is already rendered on a public page.
 */
export const aiJsonHeaders = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "public, max-age=3600, s-maxage=86400",
  "Access-Control-Allow-Origin": "*",
};
