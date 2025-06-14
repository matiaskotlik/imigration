import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@repo/api', '@repo/pdfme-plugins'],
};

export default nextConfig;
