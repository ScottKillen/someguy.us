const fg = require('fast-glob');
const path = require('path');
const fs = require('fs');

module.exports = async function () {
  const iconFolder = path.resolve(__dirname, '../../src/icons/');
  const svgIcons = await fg('**/*.svg', { cwd: iconFolder });
  const iconData = svgIcons.map((name) => {
    const slug = path.parse(name).name;
    const id = `${slug}-icon`;
    const source = fs.readFileSync(path.resolve(iconFolder, name), {
      encoding: 'utf8',
    });
    const symbol = source
      .replace('<svg', `<symbol id="${id}"`)
      .replace('</svg>', '</symbol>');
    return { name, source, symbol, slug, id };
  });
  return iconData;
};
