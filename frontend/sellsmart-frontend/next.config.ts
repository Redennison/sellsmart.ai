import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/', // The URL to redirect from
        destination: '/landing', // The URL to redirect to
        permanent: true, // Set true for 301 redirect, false for 302
      },
    ];
  },
};

export default nextConfig;
