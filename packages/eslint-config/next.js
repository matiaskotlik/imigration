import { FlatCompat } from '@eslint/eslintrc';

import baseConfig from './base.js';
import { fileURLToPath } from 'url';
import path from 'path';

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  ...baseConfig,
  ...compat.extends('plugin:@next/next/core-web-vitals'),
];
