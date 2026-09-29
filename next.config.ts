import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      // Old site's About page; the homepage now covers it.
      { source: "/about", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
