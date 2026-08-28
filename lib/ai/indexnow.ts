/**
 * IndexNow — push new and changed URLs straight into Bing's index.
 *
 * Why this exists. ChatGPT's search runs on Bing. A citation check on
 * 2026-08-28 showed ChatGPT answering "what does CO-97 mean" by citing four
 * sources — Sprypt, Adonis, MBW RCM and X12 — while vizora.co appeared
 * nowhere in the results for that query at all. The page is not weaker than
 * theirs; it had never been submitted anywhere, so nothing knew it existed.
 *
 * IndexNow closes that gap without an account or a verification step: hosting
 * the key file at a URL on this host IS the ownership proof. Bing, Yandex,
 * Seznam and Naver all consume the same ping.
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
