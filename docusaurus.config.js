// @ts-check

const lightCodeTheme = require("prism-react-renderer/themes/vsLight");
const darkCodeTheme = require("prism-react-renderer/themes/vsDark");
const creationYear = 2016;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Nyxx Documentation",
  tagline: "A documentation for the Nyxx Discord library",
  url: "https://nyxx.l7ssha.xyz/",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "nyxx-discord",
  projectName: "nyxx",

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),

          editUrl:
            "https://github.com/nyxx-discord/nyxx_docs/tree/main/",
        },
        blog: {
          showReadingTime: true,
          editUrl:
            "https://github.com/nyxx-discord/nyxx_docs/tree/main/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "Nyxx Docs",
        logo: {
          alt: "Nyxx Logo",
          src: "img/Nyxx_Logo.svg",
        },
        items: [
          {
            type: "doc",
            docId: "intro",
            position: "left",
            label: "Tutorial",
          },
          { to: "/blog", label: "Blog", position: "left" },
          {
            href: "https://github.com/nyxx-discord/nyxx",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "light",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Tutorial",
                to: "/docs/intro",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Discord",
                href: "https://discordapp.com/invite/nyxx",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "Blog",
                to: "/blog",
              },
              {
                label: "GitHub",
                href: "https://github.com/nyxx-discord/nyxx",
              },
            ],
          },
        ],
        copyright: `Copyright © ${creationYear} - ${new Date().getFullYear()} Nyxx.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ["dart"],
      },
    }),
};

module.exports = config;
