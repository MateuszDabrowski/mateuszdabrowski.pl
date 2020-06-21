module.exports = {
    title: 'Mateusz Dąbrowski',
    tagline: 'Website under construction',
    url: 'https://mateuszdabrowski.pl',
    baseUrl: '/',
    favicon: 'img/favicon.ico',
    organizationName: 'MateuszDabrowski',
    projectName: 'mateuszdabrowski.pl',
    themeConfig: {
        navbar: {
            title: 'mateuszdabrowski.pl',
            logo: {
                alt: 'Mateusz Dąbrowski Logo',
                src: 'img/logo.svg',
            },
            links: [
                {
                    to: 'docs/',
                    activeBasePath: 'docs',
                    label: 'Snippets',
                    position: 'left',
                },
                {
                    to: 'docs/',
                    activeBasePath: 'docs',
                    label: 'Ideas',
                    position: 'left',
                },
                {
                    to: 'docs/',
                    activeBasePath: 'docs',
                    label: 'Toolset',
                    position: 'left',
                },
                {
                    href: 'https://www.linkedin.com/in/mateusz-dabrowski-marketing/',
                    label: 'LinkedIn',
                    position: 'right',
                },
                {
                    href: 'https://github.com/MateuszDabrowski',
                    label: 'GitHub',
                    position: 'right',
                },
            ],
        },
        footer: {
            style: 'dark',
            links: [
                {
                    title: 'Docs',
                    items: [
                        {
                            label: 'Style Guide',
                            to: 'docs/',
                        },
                        {
                            label: 'Second Doc',
                            to: 'docs/doc2/',
                        },
                    ],
                },
                {
                    title: 'About',
                    items: [
                        {
                            label: 'Second Doc',
                            to: 'docs/doc2/',
                        },
                    ],
                },
                {
                    title: 'More',
                    items: [
                        {
                            label: 'GitHub',
                            href: 'https://github.com/MateuszDabrowski',
                        },
                    ],
                },
            ],
        },
    },
    presets: [
        [
            '@docusaurus/preset-classic',
            {
                docs: {
                    path: 'docs',
                    routeBasePath: 'docs',
                    homePageId: 'doc1',
                    include: ['**/*.md', '**/*.mdx'],
                    sidebarPath: require.resolve('./sidebars.js'),
                    showLastUpdateAuthor: true,
                    showLastUpdateTime: true,
                    editUrl: 'https://github.com/MateuszDabrowski/mateuszdabrowski.github.io/edit/master/',
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
                sitemap: {},
            },
        ],
    ],
};
