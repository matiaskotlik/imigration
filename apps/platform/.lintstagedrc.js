const path = require('path')

const nextLintCommand = (filenames) =>
  `pnpm lint ${filenames.map((f) => `--file ${path.relative(process.cwd(), f)}`)}`

module.exports = {
  "**": ["pnpm format", nextLintCommand]
}

