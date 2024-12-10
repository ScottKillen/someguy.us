const markdownIt = require('markdown-it');

const abbrPlugin = require('markdown-it-abbr');
const alertsPlugin = require('markdown-it-alerts');
const anchorPlugin = require('markdown-it-anchor');
const attrsPlugin = require('markdown-it-attrs');
const bracketedSpansPlugin = require('markdown-it-bracketed-spans');
const containerPlugin = require('markdown-it-container');
const footnotePlugin = require('markdown-it-footnote');
const insPlugin = require('markdown-it-ins');
const kbdPlugin = require('markdown-it-kbd');
const markPlugin = require('markdown-it-mark');
const tocPlugin = require('markdown-it-toc-done-right');

const slugify = require('slugify');

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

const MARKDOWN_IT_TOC_OPTIONS = {
  linkClass:
    'link-body-emphasis link-offset-2 link-underline-opacity-25 link-underline-opacity-75-hover',
};

module.exports = function (eleventyConfig) {
  eleventyConfig.setLibrary(
    'md',
    markdownIt(MARKDOWN_IT_OPTIONS)
      .use(abbrPlugin)
      .use(alertsPlugin)
      .use(anchorPlugin, MARKDOWN_IT_ANCHOR_OPTIONS)
      .use(attrsPlugin)
      .use(bracketedSpansPlugin)
      .use(containerPlugin, 'epigraph')
      .use(containerPlugin, 'footer')
      .use(footnotePlugin)
      .use(insPlugin)
      .use(kbdPlugin)
      .use(markPlugin)
      .use(tocPlugin, MARKDOWN_IT_TOC_OPTIONS),
  );

  eleventyConfig.addPassthroughCopy({
    [ASSETS_FOLDER]: './',
    [SCRIPTS_FOLDER]: './/js',
  });
};
