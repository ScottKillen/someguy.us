const moduleName = require('../helpers/moduleName');
const { EXCLUDED_TAGS } = require('../constants');

module.exports = {
  name: moduleName(__filename),
  body: (collectionApi) => {
    const tagsMap = new Map();
    collectionApi.getAll().forEach((item) => {
      if (!item.data.tags) return;
      item.data.tags
        .filter((tag) => !EXCLUDED_TAGS.includes(tag))
        .forEach((tag) => {
          tagsMap.set(tag, (tagsMap.get(tag) || 0) + 1);
        });
    });
    return Array.from(tagsMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15) // Limit to the first 15 elements
      .map((entry) => entry[0]);
  },
};
