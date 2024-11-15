const moduleName = require('../helpers/moduleName');
const tagList = require('./tagList');

module.exports = {
  name: moduleName(__filename),
  body: (collectionApi) => {
    const allTags = tagList.body(collectionApi);
    return allTags.slice(0, 15); // Limit to the first 15 elements
  },
};
