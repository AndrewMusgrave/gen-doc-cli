const parseLine = () => {
  let output = [];
  let currentBlock = {};
  let parseDoc = false;
  let longSection = '';
  let longKey;
  const getOutput = () => output;
  const handleLine = line => {
    if (line.match(/\/\*\*/)) parseDoc = true;
    if (line.match(/\*\//)) {
      output.push(currentBlock);
      currentBlock = {};
      parseDoc = false;
    }

    if (parseDoc) {
      const [, key, value] = line.match(/\*\s?@([^\s]+)\s?(.*)/) || [];
      if (key && value) {
        longKey = '';
        longSection = '';
        currentBlock[key] = value;
      }

      if (longKey) {
        const [, content] = line.match(/\*\s?(.*)/) || [];
        longSection += `\n${content}`;
        currentBlock[longKey] = longSection;
      }

      if (key && !value) {
        longKey = key;
      }
    }
  };

  return {
    getOutput,
    handleLine,
  };
};

module.exports = parseLine;
