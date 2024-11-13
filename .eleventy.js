const {
  initialSetup,
  layoutAliases,
  collections,
  shortcodes,
  filters,
  plugins,
  constants,
  events,
} = require('./_11ty');
const minifyHTML = require('./_11ty/transforms/minifyHTML');
const minifyJS = require('./_11ty/transforms/minifyJS');
const minifyJSON = require('./_11ty/transforms/minifyJSON');
const minifyXML = require('./_11ty/transforms/minifyXML');
const passthroughFiles = require('./content/_data/passthroughFiles');

module.exports = function (eleventyConfig) {
  // --- Initial config

  initialSetup(eleventyConfig);

  // --- Layout aliases

  Object.entries(layoutAliases).forEach(([name, path]) => {
    eleventyConfig.addLayoutAlias(name, path);
  });

  // --- Collections

  Object.values(collections).forEach(({ name, body }) => {
    eleventyConfig.addCollection(name, body);
  });

  // --- Transformations

  eleventyConfig.addTransform('minifyHTML', minifyHTML);
  eleventyConfig.addTransform('minifyJSON', minifyJSON);
  eleventyConfig.addTransform('minifyXML', minifyXML);
  eleventyConfig.addTransform('minifyJS', minifyJS);

  // --- Filters

  Object.values(filters).forEach(({ name, body }) => {
    eleventyConfig.addFilter(name, body);
  });

  // --- Shortcodes

  Object.values(shortcodes).forEach(({ name, body }) => {
    eleventyConfig.addShortcode(name, body);
  });

  eleventyConfig.addShortcode('icon', function icon(name, kwargs) {
    this.ctx.page.icons ||= new Set();
    this.ctx.page.icons.add(name);
    // eslint-disable-next-line no-unused-vars
    const { __keywords, ...attrs } = kwargs ?? {};
    const attributes = Object.entries(attrs)
      .map(([name, value]) => `${name}="${value}"`)
      .join(' ');
    return `<svg ${attributes}><use href="#${name}-icon"></use></svg>`;
  });

  eleventyConfig.addShortcode('img', function img(url, kwargs) {
    // eslint-disable-next-line no-unused-vars
    const { __keywords, ...attrs } = kwargs ?? {};
    const attributes = Object.entries(attrs)
      .map(([name, value]) => `${name}="${value}"`)
      .join(' ');
    return `<img src="${url}" ${attributes} />`;
  });

  // --- Plugins

  Object.values(plugins).forEach(({ body, options }) => {
    eleventyConfig.addPlugin(body, options && options);
  });

  // - Passthough copy
  eleventyConfig.addPassthroughCopy(passthroughFiles);

  // --- After build events

  if (events.after.length > 0) {
    Object.values(events.after).forEach((afterBuildEvent) => {
      eleventyConfig.on('eleventy.after', afterBuildEvent);
    });
  }

  // --- Consolidating everything under content folder

  return {
    dir: {
      input: constants.CONTENT_FOLDER,
    },
    templateFormats: ['md', 'njk'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
  };
};
