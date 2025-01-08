const packageJson = require('../../package.json');

module.exports = {
  // ---------------------------------------------------------------------------
  // Information about your site
  // ---------------------------------------------------------------------------
  site: {
    // Site title. Used in many places, including meta title,
    // OpenGraph tags and feeds.
    // Can also be used anywhere on the site as a Nunjucks variable:
    // {{ siteConfig.site.logo }}
    title: 'SomeGuy.us',
    // Site description. Used in many places, including meta title,
    // OpenGraph tags and feeds.
    // It is also used as a fallback description if no custom description
    // is provided for a page / post.
    description: 'The personal site of Scott Killen (Just some guy™)',
    // Production URL. Used by 'alwaysProductionUrl' filter.
    // If none is provided, relative paths will be used
    // and in some cases (like sitemap.xml) that is TOTALLY NOT what you want
    url: process.env.URL || 'https://someguy.us/',
    // Image used as a site logo. If none is provided, site title as text
    // will be displayed as fallback.
    // If you opt for text fallback, you may want to adjust
    // $menuBreakpoint variable in _variables.scss
    // so that site title and menu items remain within a single line.
    logo: '/images/logo.png',
    // Generator information to display in <html> tag and the site footer.
    // Absolutely optional, but it will make Zach Leatherman happy :)
    // Also, it makes you eligible to be featured on Speedlify:
    // https://www.11ty.dev/speedlify/
    generator: {
      name: 'Eleventy',
      version: packageJson.dependencies['@11ty/eleventy'].replace('^', ''),
      url: 'https://11ty.dev',
    },
  },
  // ---------------------------------------------------------------------------
  // Information about YOU, the site author
  // ---------------------------------------------------------------------------
  author: {
    // Your name. Self-explanatory I guess?
    // And you can use it anywhere on the site as {{ siteConfig.author.name }}
    name: 'Scott Killen',
    url: 'https://scottkillen.com/',
    // Your fediverse links (e.g. Mastodon). You can provide more than one.
    // For the first account in this array your site will generate
    // .well-known/webfinger file for you so that you'll be searchable
    // on Mastodon as @your_username@your_site_domain.example.org.
    // ALL links provided here will be added to <head> section of your site
    // with a rel='me' attribute and fediverse:creator tag so that you can
    // verify their ownership on Mastodon and other services that use this
    // method of verification.
    fediverse: [
      {
        username: 'scottkillen',
        server: 'mastodon.social',
        url: 'https://mastodon.social/@scottkillen',
      },
    ],
  },
  // ---------------------------------------------------------------------------
  // Pages linked in the footer on the right side
  // ---------------------------------------------------------------------------
  metaPages: [
    {
      url: 'https://github.com/ScottKillen',
      title: 'GitHub',
      icon: 'github',
    },
    {
      url: 'https://www.flickr.com/photos/scottkillen',
      title: 'Flickr',
      icon: 'flickr',
    },
    {
      url: 'https://open.spotify.com/user/sdkillen',
      title: 'Spotify',
      icon: 'spotify',
    },
    {
      url: 'https://portfolio.pixelfed.social/scottkillen',
      title: 'Pixelfed',
      icon: 'pixelfed',
    },
    {
      url: 'https://mastodon.social/@scottkillen',
      title: 'Mastodon',
      icon: 'mastodon',
    },
    {
      url: 'https://x.com/scottkillen',
      title: 'X',
      icon: 'x',
    },
    {
      url: 'https://killen.omg.lol/',
      title: 'omg',
      icon: 'location-smile',
    },
  ],
  // ---------------------------------------------------------------------------
  // Default settings for OpenGraph functionality (tags and generated images)
  // ---------------------------------------------------------------------------
  opengraph: {
    type: 'website',
    // Default image to use when none is specified
    image: '/images/share-1200x600.jpg',
    // Opt-in to automatic generation of OpenGraph images
    // If disabled, default images will be used
    // If enabled, make sure you _like_ the way they look like
    // (build the site and find the images in _site/images/share folder)
    // To modify what generated OG images look like
    // edit content/_data/utils/og-image.njk
    enableImageGeneration: true,
    // Background color for auto-generated OpenGraph images
    ogImageBackgroundColor: '#6610f2',
    // Text color for for auto-generated OpenGraph images
    ogImageTextColor: '#f8f9fa',
  },
  // ---------------------------------------------------------------------------
  // Default settings for X graph tags
  // ---------------------------------------------------------------------------
  x: {
    card: 'summary_large_image',
    image: '/images/share-1200x600.jpg',
    site: '@scottkillen',
  },
  // ---------------------------------------------------------------------------
  // Settings for post tags
  // ---------------------------------------------------------------------------
  tags: {
    // URL prefix for tag pages. If you set 'tag' as your tag prefix,
    // your tag pages will look like this: https://yoursite.org/tag/foo
    pageUrlPrefix: 'tags',
    // How many posts should be visible on tag pages until pagination is used?
    postsPerPage: 10,
  },
  // ---------------------------------------------------------------------------
  // Settings for PWA
  // ---------------------------------------------------------------------------
  manifestJson: {
    // Default theme color for PWA application. Affects how the OS displays
    // the site
    themeColor: '#6610f2',
  },
  // ---------------------------------------------------------------------------
  // Settings for post share buttons
  //
  // Possible options:
  // mastodon, x, linkedin, facebook, hackernews, clipboard
  //
  // 'clipboard' is an option to copy the article URL to user's clipboard
  //
  // You can remove or reorder items in this array to affect which of these
  // are available on the post page. If this array is empty, share section
  // won't be displayed at all.
  // ---------------------------------------------------------------------------
  shareButtons: [
    'mastodon',
    'x',
    //    'linkedin',
    'facebook',
    //    'hackernews',
    'clipboard',
  ],
  // ---------------------------------------------------------------------------
  // Date formats used on the site (mostly somewhere around post contents).
  // ---------------------------------------------------------------------------
  dateFormats: {
    // Example: Oct 1, 1970
    readable: 'LLL d, yyyy',
    // Example: October 1, 1970
    fullReadable: 'LLLL d, yyyy',
  },
  // ---------------------------------------------------------------------------
  // Settings for RSS feeds (Atom)
  // ---------------------------------------------------------------------------
  feed: {
    stylesheet: {
      // URL of the XSLT stylesheet used when RSS feed XML file is displayed
      // in browser
      url: '/feed.xsl',
      // Color of the links on the site. Since XSLT stylesheet is a separate
      // entity from the rest of the site styling, it has to be
      // specified manually
      baseColor: '#6610f2',
    },
    // Settings for RSS feed displaying post excerpts
    excerpts: {
      // Title of RSS feed displaying post excerpts
      title: 'RSS feed (excerpts)',
      // Path of RSS feed displaying post excerpts
      path: '/excerpts.xml',
      // How many posts should be presented in excerpts-only RSS feed?
      limit: 10,
    },
    // Settings for RSS feed displaying full post contents
    full: {
      // Title of RSS feed displaying full post contents
      title: 'RSS feed (full articles)',
      // Path of RSS feed displaying only post excerpts
      path: '/full.xml',
      // How many posts should be presented in full-post-contents RSS feed?
      limit: 10,
    },
  },
  // ---------------------------------------------------------------------------
  // Settings for JSON feeds.
  // JSON feeds in this site follow JSON Feed Version 1.1 specification:
  // https://www.jsonfeed.org/version/1.1/
  // ---------------------------------------------------------------------------
  json: {
    // Settings for JSON feed displaying post excerpts only
    excerpts: {
      // Title of JSON feed displaying post excerpts
      title: 'JSON feed (excerpts)',
      // Path of JSON feed displaying post excerpts
      // used as permalink in the template
      path: '/excerpts.json',
      // How many posts should be presented in excerpts-only JSON feed?
      limit: 10,
    },
    // Settings for JSON feed displaying full post contents
    full: {
      // Title of JSON feed displaying full post contents
      title: 'JSON feed (full articles)',
      // Path of JSON feed displaying full post contents,
      // used as permalink in the template
      path: '/full.json',
      // How many posts should be presented in full-post-contents JSON feed?
      limit: 10,
    },
  },
  // ---------------------------------------------------------------------------
  // Setttings for Twtxt.txt
  // Twtxt is a text-file-based protocol used as a microblogging platform
  // More information: https://github.com/buckket/twtxt
  // You can also check out https://yarn.social/ which extends Twtxt format
  // and provides web-based user-friendly interface
  // ---------------------------------------------------------------------------
  twtxt: {
    // Your nickname on Twtxt
    nick: 'scottkillen',
    // Path to Twtxt file, used as permalink in the template
    path: '/twtxt.txt',
    // Path to your Twtxt avatar
    avatar: '/images/twtxt-avatar.png',
    // Separator used in Twtxt post contents between a title and a link
    separator: ' - ',
    // How many posts should be displayed in Twtxt file?
    limit: 100,
    // Title of your Twtxt.txt file used on /subscribe/ page
    title: 'twtxt.txt (titles and links)',
  },
  // ---------------------------------------------------------------------------
  // Site icons, used mostly for PWA manifest
  // ---------------------------------------------------------------------------
  icons: {
    ico: '/favicon.ico',
    svg: '/favicon.svg',
    i192: '/icon-192.png',
    i512: '/icon-512.png',
  },
};
