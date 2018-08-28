const fs = require('fs');
const readline = require('readline');

const readByLine = (path, onLine, onClose) =>
  new Promise((resolve, reject) => {
    const instream = fs.createReadStream(path);
    instream.on('error', error => {
      reject(error);
    });

    const rl = readline.createInterface({
      input: instream,
      output: process.stdout,
      terminal: false,
    });

    rl.on('line', line => {
      if (typeof onLine === 'function') {
        onLine(line);
      }
    });

    rl.on('close', () => {
      if (typeof onClose === 'function') {
        onClose();
      }

      resolve();
    });
  });

module.exports = readByLine;
