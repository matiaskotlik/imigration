declare module 'eslint-plugin-canonical' {
  import type { Linter } from 'eslint';

  export const configs: {
    'flat/recommended': { rules: Linter.RulesRecord };
  };
}

declare module 'eslint-plugin-markdown' {
  import type { Linter } from 'eslint';

  export const configs: {
    recommended: { rules: Linter.RulesRecord };
  };
}

declare module 'eslint-plugin-promise' {
  import type { Linter } from 'eslint';

  export const configs: {
    'flat/recommended': { rules: Linter.RulesRecord };
  };
}
