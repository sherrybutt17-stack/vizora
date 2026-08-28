/**
 * IndexNow — push new and changed URLs straight into Bing's index.
 *
 * Why this exists. ChatGPT's search runs on Bing. A citation check on
 * 2026-08-28 showed ChatGPT answering "what does CO-97 mean" by citing four
 * sources — Sprypt, Adonis, MBW RCM and X12 — while vizora.co appeared
 * nowhere in the results for that query at all. The page is not weaker than
 * theirs; it had never been submitted anywhere, so nothing knew it existed.
 *
 * CORRECTION (2026-08-28): an earlier version of this comment, and the commit
 * that introduced it, claimed the site had never been submitted to Bing. That
 * was wrong. It is verified in Bing Webmaster Tools and the sitemap has been
 * submitted since 2026-08-20. The mistake was inferring "no Bing account" from
 * `site.verification.bing` being empty — that field only covers HTML meta-tag
 * verification, and this domain was verified by another method.
 *
 * The real gap is staleness, not absence. Bing last crawled the sitemap on
 * 2026-08-25 and had discovered 217 URLs; the sitemap now carries 278. Every
 * page shipped since — the 25 new denial codes and all three pillars — is
 * invisible to it until it re-crawls on its own schedule.
 *
 * IndexNow is what removes that wait. It needs no account and no separate
 * verification step: hosting the key file at a URL on this host IS the
 * ownership proof. Bing, Yandex, Seznam and Naver all consume the same ping.
 *
 * The key is public by design — do not treat it as a secret. Its only job is
 * to prove that whoever submitted the URLs controls this host, which is
 * demonstrated by serving it from this host.
 */
export const INDEXNOW_KEY = "5a8286e312c95ddeef4737eba7133c46";

/**
 * Served from a fixed path rather than from `${KEY}.txt`, so the key lives in
 * exactly one place and the file cannot drift out of sync with it. The spec
 * allows this via `keyLocation`; a key at the root authorises every URL on
 * the host, since authorisation is by path prefix.
 */
export const INDEXNOW_KEY_PATH = "/indexnow-key.txt";

/** Any participating engine shares submissions with the others. */
export const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";
