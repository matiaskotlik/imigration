/// <reference types="./types.d.ts" />

import eslintJs from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig([
  {
    languageOptions: {
      parser: tsParser,
      parserOptions: { projectService: true },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
  },
  eslintJs.configs.recommended,
  // @ts-expect-error typescript-eslint types do not match eslint
  tseslint.configs.strictTypeChecked,
  // @ts-expect-error typescript-eslint types do not match eslint
  tseslint.configs.stylisticTypeChecked,
  {
    rules: {
      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksVoidReturn: false,
        },
      ],
    },
  },
]);
