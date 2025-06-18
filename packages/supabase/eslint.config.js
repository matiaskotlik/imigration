import baseConfig from '@repo/eslint-config/base';
import nextConfig from '@repo/eslint-config/next';

export default [{ ignores: ['**/gen'] }, ...baseConfig, ...nextConfig];
