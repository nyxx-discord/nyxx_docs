// @ts-check

//#region Types
/**
 * @typedef DocusaurusSearchLocalOptions
 * @property {boolean} [indexDocs=true] Whether to index docs.
 * @property {boolean} [indexBlog=true] Whether to index blog.
 * @property {boolean} [indexPages=false] Whether to index pages.
 * @property {string|string[]} [docsRouteBasePath='/docs'] Base route path(s) of docs. Slash at beginning is not required.
 * @property {string|string[]} [blogRouteBasePath='/blog'] Base route path(s) of blog. Slash at beginning is not required.
 * @property {string|string[]} [language='en'] All [lunr-languages](https://github.com/MihaiValentin/lunr-languages) supported languages.
 * @property {boolean} [hashed=false] Whether to add a hashed query when fetching index (based on the content hash of all indexed `*.md` in {@link DocusaurusSearchLocalOptions.docsDir `docsDir`} and {@link DocusaurusSearchLocalOptions.blogDir `blogDir`} if applicable).
 * @property {string|string[]} [docsDir='docs'] The dir(s) of docs to get the content hash, it's relative to the dir of your project.
 * @property {string|string[]} [blogDir='blog'] Just like the {@link DocusaurusSearchLocalOptions.docsDir `docsDir`} but applied to blog.
 * @property {boolean} [removeDefaultStopWordFilter=false] Sometimes people (E.g., us) want to keep the English stop words as indexed, since they maybe are relevant in programming docs.
 * @property {boolean} [highlightSearchTermsOnTargetPage=false] Highlight search terms on target page.
 * @property {number} [searchResultLimits=8] Limit the search results.
 * @property {number} [searchResultContextMaxLength=50] Set the max length of characters of each search result to show.
 * @property {{[key: string]: string}} [translations] Set translations of this theme.
 * @property {string|RegExp|(string | RegExp)[]} [ignoreFiles] Set the match rules to ignore some files.
 */
//#endregion

const lightCodeTheme = require('prism-react-renderer/themes/vsLight');
const darkCodeTheme = require('prism-react-renderer/themes/vsDark');
const creationYear = 2016;
const dev = process.env.NODE_ENV === 'dev';
const url = dev ? process.env.DEV_URL : process.env.PROD_URL;
const {
  REPO_NAME_DEV: repoDev,
  BRANCH_NAME_DEV: branchDev,
  REPO_NAME_PROD: repoProd,
  REPO_BRANCH_PROD: branchProd,
} = process.env;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'nyxx Documentation',
  tagline: 'A documentation for the nyxx Discord library',
  url,
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/icons/favicon.ico',
  organizationName: 'nyxx-discord',
  projectName: 'nyxx',
  deploymentBranch: 'main',

  plugins: [
    [
      '@easyops-cn/docusaurus-search-local',
      /**@type {DocusaurusSearchLocalOptions} */ ({
        hashed: true,
        language: ['en'],
        indexBlog: false,
      }),
    ],
    [
      '@docusaurus/plugin-pwa',
      /**@type {Partial<import('@docusaurus/plugin-pwa').PluginOptions & {  id: string }>} */ ({
        debug: dev,
        offlineModeActivationStrategies: [
          'appInstalled',
          'standalone',
          'queryString',
        ],
        pwaHead: [
          {
            tagName: 'link',
            rel: 'manifest',
            href: '/manifest.json',
          },
        ],
      }),
    ],
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),

          editUrl: `https://github.com/${dev ? repoDev : repoProd}/tree/${
            dev ? branchDev : branchProd
          }/`,
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        theme: {
          customCss: require.resolve('./src/css/global.css'),
        },

        blog: false,
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/Nyxx_Squared.png',
      colorMode: {
        defaultMode: 'dark',
      },
      metadata: [
        {
          name: 'keywords',
          content: 'discord, bot, bot-framework, nyxx',
        },
        {
          name: 'language',
          content: 'EN',
        },
        {
          name: 'theme-color',
          content: '#5a65f3',
        },
      ],
      navbar: {
        title: 'nyxx Docs',
        logo: {
          alt: 'Nyxx Logo',
          src: 'img/Nyxx_Squared.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Tutorial',
          },
          {
            href: 'https://github.com/nyxx-discord/nyxx',
            label: 'GitHub',
            position: 'right',
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'light',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Getting Started',
                to: '/docs/intro',
              },
              {
                label: 'Pub Docs',
                href: 'https://pub.dev/documentation/nyxx/latest',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://discord.gg/nyxx',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/nyxx-discord/nyxx',
              },
              {
                label: 'nyxx_interactions',
                href: 'https://github.com/nyxx-discord/nyxx_interactions',
              },
              {
                label: 'nyxx_commands',
                href: 'https://github.com/nyxx-discord/nyxx_commands',
              },
              {
                label: 'nyxx_sharding',
                href: 'https://github.com/nyxx-discord/nyxx_sharding',
              },
            ],
          },
        ],
        copyright: `Copyright © ${creationYear} - ${new Date().getFullYear()} nyxx.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['dart'],
      },
    }),
};

module.exports = config;
