/** @type {import('prettier').Config} */
const prettierConfig = {
  plugins: [
    "@repo/prettier-config/plugins/prettier-plugin-tailwindcss",
    "@repo/prettier-config/plugins/prettier-plugin-sql",
    "@repo/prettier-config/plugins/prettier-plugin-toml",
    "@repo/prettier-config/plugins/prettier-plugin-packagejson",
    "@repo/prettier-config/plugins/prettier-plugin-sh",
    "@repo/prettier-config/plugins/prettier-plugin-black",
  ],
  trailingComma: "es5",
  semi: true,
  singleQuote: true,
  jsxSingleQuote: true,
};

/** @type {import('prettier-plugin-tailwindcss').PluginOptions} */
const prettierPluginTailwindConfig = {
  tailwindFunctions: ["clsx", "cva", "cn", "twc", "tw", "style"],
  tailwindAttributes: ["className"],
};

/** @type {import('prettier-plugin-sql').SqlBaseOptions} */
const prettierPluginSqlConfig = {
  language: "postgresql",
  keywordCase: "lower",
  dataTypeCase: "lower",
  functionCase: "lower",
  identifierCase: "lower",
};

export default {
  ...prettierConfig,
  ...prettierPluginTailwindConfig,
  ...prettierPluginSqlConfig,
};
