import { createJiti } from 'jiti';

const jiti = createJiti(import.meta.url);

// Import env files to validate at build time. Use jiti so we can load .ts files in here.
await jiti.import('./src/env');

/** @type {import("next").NextConfig} */
const nextConfig = {
  /** Enable hot reloading for local packages without a build step */
  transpilePackages: ['@repo/api', '@repo/pdfme-plugins', '@repo/supabase'],
};

export default nextConfig;
