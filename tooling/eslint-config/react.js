import eslintPluginReact from "eslint-plugin-react";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";
import globals from "globals";

/** @type {Awaited<import('typescript-eslint').Config>} */
export default tseslint.config([
  {
    files: ["**/*.?([cm])[jt]s?(x)"],
    plugins: {
      react: eslintPluginReact,
      reactHooks: eslintPluginReactHooks,
    },
    extends: [
      eslintPluginReact.configs.all,
      eslintPluginReactHooks.configs["recommended-latest"],
    ],
    languageOptions: {
      ...eslintPluginReact.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
  },
]);