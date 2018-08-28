const { readFileSync, writeFileSync } = require('fs');
const readByLine = require('./readByLine');
const parseLine = require('./parseLine');

const parseFile = (file, dirPath) => {
  const { getOutput, handleLine } = parseLine();
  readByLine(file, handleLine)
    .then(() => {
      const data = readFileSync(dirPath, 'utf8');
      let json;
      if (data) {
        json = JSON.parse(data);
      } else {
        json = [];
      }

      const output = getOutput().filter(doc =>
        Boolean(Object.keys(doc).length)
      );
      if (output.length) {
        json.push(...output);
        json = JSON.stringify(json, null, 2);
        writeFileSync(dirPath, json);
      }
    })
    .catch(error => console.log('Error parsing file: error'));
};

module.exports = parseFile;
