const buildNextLintCommand = (filenames) =>
  `next lint --fix --cache-location .cache/.eslintcache --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`;

module.exports = {
  '*': ['pnpm format --ignore-unknown --', buildNextLintCommand],
};
