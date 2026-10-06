import type { NextConfig } from "next";

/**
 * Served from a sub-path (e.g. GitHub Pages at /norns) until a custom domain
 * is attached. The deploy workflow sets PAGES_BASE_PATH; locally it is empty.
 */
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  devIndicators: false,
  agentRules: false,
};

export default nextConfig;
