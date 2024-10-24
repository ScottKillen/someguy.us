const moduleName = require('../helpers/moduleName');

const body = (src, className) => {
  if (!src) {
    throw new Error('src is required');
  }

  if (!className) {
    throw new Error('className is required');
  }

  return `<img src="${src}" class="${className}" />`;
};

module.exports = {
  name: moduleName(__filename),
  body,
};
