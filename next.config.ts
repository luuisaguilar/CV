import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // Three.js / R3F needs to be transpiled
  transpilePackages: ["three"],
};

export default withNextIntl(nextConfig);
