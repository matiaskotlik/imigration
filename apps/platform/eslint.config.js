import baseConfig from '@repo/eslint-config/base';
import typescriptConfig from '@repo/eslint-config/typescript';
import nextConfig from '@repo/eslint-config/next';

export default [
  ...baseConfig,
   ...nextConfig
];
