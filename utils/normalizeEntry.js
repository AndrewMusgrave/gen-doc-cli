const normalizeEntry = entry => {
  if (Array.isArray(entry)) {
    return entry;
  }

  return [entry];
};

module.exports = normalizeEntry;
