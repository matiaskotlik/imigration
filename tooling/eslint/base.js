import { FlatCompat } from '@eslint/eslintrc';
import { fileURLToPath } from 'url';
import path from 'path';

import eslintJS from '@eslint/js';
import eslintPluginMarkdown from 'eslint-plugin-markdown';
import eslintPluginNode from 'eslint-plugin-n';
import eslintPluginPerfectionist from 'eslint-plugin-perfectionist';
import eslintPluginPromise from 'eslint-plugin-promise';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactPerf from 'eslint-plugin-react-perf';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports';
import eslintPluginVitest from 'eslint-plugin-vitest';
import globals from 'globals';
import eslintTS from 'typescript-eslint';
import eslintPluginJsxA11y from 'eslint-plugin-jsx-a11y';
import eslintPluginCanonical from 'eslint-plugin-canonical';
import eslintConfigTurbo from 'eslint-config-turbo/flat';

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  eslintJS.configs.recommended,
  ...eslintTS.configs.strictTypeChecked,
  ...eslintTS.configs.stylisticTypeChecked,
  eslintPluginNode.configs['flat/recommended-module'],
  // @ts-expect-error, untyped import
  eslintPluginPromise.configs['flat/recommended'],
  eslintPluginUnicorn.configs.recommended,
  eslintPluginPerfectionist.configs['recommended-alphabetical'],
  eslintPluginReact.configs.flat.recommended,
  eslintPluginReactPerf.configs.flat.recommended,
  eslintPluginJsxA11y.flatConfigs.recommended,
  ...compat.extends('plugin:react-hooks/recommended'),
  ...eslintConfigTurbo,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.serviceworker,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 'latest',
        parser: '@typescript-eslint/parser',
        project: true,
      },
    },
    plugins: {
      canonical: eslintPluginCanonical,
      markdown: eslintPluginMarkdown,
      'unused-imports': eslintPluginUnusedImports,
    },
    rules: {
      '@typescript-eslint/array-type': ['error', { default: 'array' }],
      '@typescript-eslint/consistent-indexed-object-style': 'error',
      '@typescript-eslint/consistent-type-definitions': ['warn', 'type'],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          custom: { match: false, regex: '^I[A-Z]' },
          format: ['PascalCase'],
          selector: 'interface',
        },
      ],
      '@typescript-eslint/no-extra-non-null-assertion': 'error',
      '@typescript-eslint/no-floating-promises': [
        'error',
        { ignoreIIFE: true, ignoreVoid: true },
      ],
      '@typescript-eslint/no-for-in-array': 'error',
      '@typescript-eslint/no-inferrable-types': 'error',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-redundant-type-constituents': 'warn',
      '@typescript-eslint/no-require-imports': 'warn',
      '@typescript-eslint/no-this-alias': 'error',
      '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
      '@typescript-eslint/no-unnecessary-condition': 'error',
      '@typescript-eslint/no-unnecessary-qualifier': 'warn',
      '@typescript-eslint/no-unnecessary-type-arguments': 'error',
      '@typescript-eslint/no-unused-expressions': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/no-useless-constructor': 'warn',
      '@typescript-eslint/no-useless-empty-export': 'warn',
      '@typescript-eslint/prefer-as-const': 'warn',
      '@typescript-eslint/prefer-for-of': 'warn',
      '@typescript-eslint/prefer-includes': 'warn',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/require-await': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/switch-exhaustiveness-check': 'warn',
      curly: 'error',
      eqeqeq: 'error',
      'n/no-extraneous-import': 'error',
      'n/no-missing-import': 'off',
      'n/no-process-exit': 'error',
      'n/no-unsupported-features/node-builtins': 'off',
      'n/hashbang': [
        'error',
        {
          executableMap: {
            '.js': 'node',
            '.ts': 'ts-node',
          },
        },
      ],
      'no-unused-vars': 'off',
      'object-shorthand': 'error',
      'perfectionist/sort-imports': 'off',
      'prefer-const': ['error', { destructuring: 'all' }],
      'prefer-destructuring': 'error',
      'prefer-template': 'warn',
      'react-perf/jsx-no-new-function-as-prop': 'off',
      'react-perf/jsx-no-new-object-as-prop': 'off',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'tailwindcss/classnames-order': 'off',
      'tailwindcss/no-custom-classname': 'off',
      'unicorn/catch-error-name': 'off',
      'unicorn/explicit-length-check': 'off',
      'unicorn/no-array-callback-reference': 'off',
      'unicorn/no-array-for-each': 'off',
      'unicorn/no-array-reduce': 'off',
      'unicorn/no-null': 'off',
      'unicorn/no-process-exit': 'off',
      'unicorn/no-useless-undefined': 'off',
      'unicorn/prefer-module': 'off',
      'unicorn/prefer-string-raw': 'off',
      'unicorn/prevent-abbreviations': 'off',
      'unused-imports/no-unused-imports': 'error',
      'import/no-named-as-default-member': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['**/*.md'],
    processor: 'markdown/markdown',
  },
  {
    files: ['**/*.md/*.{ts,js,mts,mjs,cjs,cts,tsx,jsx,mtsx,mjsx}'],
    processor: 'markdown/markdown',
  },
  {
    files: ['**/*.tsx'],
    ignores: ['**/coverage', '**/gen'],
    rules: {
      '@typescript-eslint/no-misused-promises': 'off',
    },
  },
  {
    files: [
      '**/*.{spec,test}.{ts,tsx}',
      '**/{tests,test,__tests__,__mock__,__mocks__,testing}/*.ts',
    ],
    plugins: {
      vitest: eslintPluginVitest,
    },
    rules: {
      ...eslintPluginVitest.configs.recommended.rules,
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-confusing-void-expression': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-implied-eval': 'off',
      '@typescript-eslint/no-magic-numbers': 'off',
      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksVoidReturn: false,
        },
      ],
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/prefer-as-const': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/unbound-method': 'off',
      'unicorn/error-message': 'off',
      'unicorn/no-await-expression-member': 'off',
    },
  },
  {
    ignores: [
      '**/.next',
      '**/.turbo',
      '**/__tmp__',
      '**/_next',
      '**/node_modules',
      '**/target',
      '**/gen',
      '**/coverage',
      '**/.coverage',
    ],
  },
];
