const moduleName = require('../helpers/moduleName');

const body = (id, svgClass) => {
  if (!id) {
    throw new Error('id is required');
  }

  if (!svgClass) {
    throw new Error('svgClass is required');
  }

  return `<svg class="${svgClass}"><use xlink:href="#icon-${id}" /></svg>`;
};

module.exports = {
  name: moduleName(__filename),
  body,
};
