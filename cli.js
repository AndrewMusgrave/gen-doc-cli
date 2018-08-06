#!/usr/bin/env node
const docParse = require('./docParse');
const [, , ...args] = process.argv;

const helpMessage = () => {
  const message = `
    Useage: gendoc option argument ...
    Generate documentation from from tags
    /**
     *  @author Andrew Musgrave
     *  @see gendoc
     *  @since 0.1.0
     *  @example
     *    gendoc -e src\\components -o docs.json
     */

        -h  --help          display help message
        -e  --entry         entry point path
        -o  --output        output path
    `;

  return message;
};

const unknownArg = arg => {
  const message = `
        ${arg} is not a supported argument
    `;

  return message;
};

const logRed = message => {
  console.log('\x1b[31m', message);
};

const logCyan = message => {
  console.log('\x1b[36m', message);
};

const doubleOr = (value, a, b) => {
  return value === a || value === b;
};

const settings = {};

for (let i = 0, length = args.length; i < length; i++) {
  const currentArg = args[i];

  if (doubleOr(currentArg, '-h', '--help')) {
    logCyan(helpMessage());
    process.exit(0);
  } else if (doubleOr(currentArg, '-e', '--entry')) {
    settings.entry = args[++i];
  } else if (doubleOr(currentArg, '-o', '--output')) {
    settings.output = args[++i];
  } else {
    logRed(unknownArg(currentArg));
    process.exit(0);
  }
}

docParse(settings);
