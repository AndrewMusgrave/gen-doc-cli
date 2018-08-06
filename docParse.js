const { writeFileSync } = require('fs');
const { sep } = require('path');
const mkdirSync = require('fs-mkdirp-sync');
const readdir = require('readdir-sync-recursive');
const parseFile = require('./utils/parseFile');
const normalizeEntry = require('./utils/normalizeEntry');

const parseFileWithOutput = output => {
  return file => {
    parseFile(file, output);
  };
};

const docParse = ({ entry, output }) => {
  const rawDirPath = output.split(sep);
  rawDirPath.pop();
  const dirPath = rawDirPath.join(sep);
  mkdirSync(dirPath);
  writeFileSync(output, '');

  const entryPoints = normalizeEntry(entry);
  for (let i = 0, length = entryPoints.length; i < length; i++) {
    readdir(entryPoints[i], null, parseFileWithOutput(output));
  }
};

module.exports = docParse;
