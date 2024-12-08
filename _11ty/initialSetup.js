const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const markdownItFootnote = require('markdown-it-footnote');
const bracketedSpans = require('markdown-it-bracketed-spans');
const markdownItAttrs = require('markdown-it-attrs');
const kbd = require('markdown-it-kbd');
const mark = require('markdown-it-mark');
const slugify = require('slugify');
const abbr = require('markdown-it-abbr');
const markdownItContainer = require('markdown-it-container');
const markdownItIns = require('markdown-it-ins');
const alerts = require('markdown-it-alerts');
const toc = require('markdown-it-toc-done-right');
const {
  ASSETS_FOLDER,
  SCRIPTS_FOLDER,
  SLUGIFY_CONFIG,
} = require('./constants');

const MARKDOWN_IT_OPTIONS = {
  html: true,
  typographer: true,
  tabIndex: false,
};

const MARKDOWN_IT_ANCHOR_OPTIONS = {
  slugify: (s) => slugify(s, SLUGIFY_CONFIG),
  tabIndex: false,
  decamelize: false,
};

module.exports = function (eleventyConfig) {
  eleventyConfig.setLibrary(
    'md',
    markdownIt(MARKDOWN_IT_OPTIONS)
      .use(markdownItAnchor, MARKDOWN_IT_ANCHOR_OPTIONS)
      .use(markdownItFootnote)
      .use(kbd)
      .use(alerts)
      .use(mark)
      .use(bracketedSpans)
      .use(markdownItAttrs)
      .use(toc)
      .use(abbr)
      .use(markdownItContainer, 'epigraph')
      .use(markdownItContainer, 'footer')
      .use(markdownItIns),
  );

  eleventyConfig.addPassthroughCopy({
    [ASSETS_FOLDER]: './',
    [SCRIPTS_FOLDER]: './/js',
  });
};
