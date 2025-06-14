import baseConfig from './base.js';
import eslintConfigExpo from 'eslint-config-expo/flat.js';

export default [
  ...eslintConfigExpo,
  ...baseConfig,
  {
    rules: {
      'react-perf/jsx-no-new-array-as-prop': 'off',
    },
  },
];
