import { execSync } from 'node:child_process';

export const languages = [
  {
    aceMode: 'text',
    extensions: ['.py'],
    liguistLanguageId: 303,
    name: 'Python',
    parsers: ['black'],
    tmScope: 'source.py',
    vscodeLanguageIds: ['python'],
  },
];

export const parsers = {
  black: {
    astFormat: 'black',
    parse(text) {
      return text;
    },
  },
};

export const printers = {
  black: {
    print(path, options) {
      let black;
      try {
        black = execSync('which black', { encoding: 'utf8' }).trimEnd();
      } catch {
        // If black is not installed, we use pipx to run it
        black = 'pipx run black';
      }

      return execSync(`${black} -q -l ${options.printWidth} -`, {
        encoding: 'utf8',
        input: path.node,
      });
    },
  },
};
