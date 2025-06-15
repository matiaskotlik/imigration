declare module 'eslint-plugin-import-x' {
  import type { Linter } from 'eslint';

  export const flatConfigs: {
    'react-native': { rules: Linter.RulesRecord };
    recommended: { rules: Linter.RulesRecord };
    typescript: { rules: Linter.RulesRecord };
  };
}

declare module 'eslint-config-expo' {
  export default {};
}

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

declare module 'eslint-plugin-react' {
  import type { Linter } from 'eslint';

  export const configs: {
    flat: {
      recommended: {
        languageOptions: Linter.LanguageOptions;
        rules: Linter.RulesRecord;
      };
    };
  };
}

declare module 'eslint-plugin-jsx-a11y' {
  import type { Linter } from 'eslint';

  export const flatConfigs: {
    'react-native': { rules: Linter.RulesRecord };
    strict: { rules: Linter.RulesRecord };
  };
}
