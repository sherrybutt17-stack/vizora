import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // `/index` served the homepage on its own URL — same title, same content,
      // not in the sitemap. Google reported it under "Duplicate without
      // user-selected canonical". The page did emit a canonical to the root,
      // but a 308 removes the ambiguity rather than asking Google to resolve it.
      { source: "/index", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
