/* eslint-disable global-require */
module.exports = {
    title: 'Mateusz Dąbrowski',
    tagline: 'Automate Marketing Automation',
    url: 'https://mateuszdabrowski.pl',
    baseUrl: '/',
    favicon: 'img/favicon.ico',
    organizationName: 'MateuszDabrowski',
    projectName: 'mateuszdabrowski.pl',
    customFields: {
        description: 'My name is Mateusz, and I automate marketing automation. Let the code do our job',
    },
    themeConfig: {
        image: 'img/logotyp-og.png', // Default image for meta tag
        announcementBar: {
            id: 'announcementBar',
            content:
                '🚧 Website under development. If you found any bugs or have a feedback, please share <a href="https://github.com/MateuszDabrowski/mateuszdabrowski.pl/issues" title="Github Issues">here</a>. Thanks! 🚧',
            backgroundColor: '#F6B355',
            textColor: '#00001F',
        },
        navbar: {
            logo: {
                alt: 'Mateusz Dąbrowski Logo',
                src: 'img/logo-horizontal-light-2x.png',
                srcDark: 'img/logo-horizontal-dark-2x.png',
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
                    className: 'header-linkedin-link',
                    'aria-label': 'LinkedIn Profile',
                },
                {
                    href: 'https://github.com/MateuszDabrowski',
                    position: 'right',
                    className: 'header-github-link',
                    'aria-label': 'GitHub repository',
                },
            ],
        },
        prism: {
            defaultLanguage: 'javascript',
            theme: require('prism-react-renderer/themes/github'),
            darkTheme: require('prism-react-renderer/themes/vsDark'),
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
                    title: 'Legal',
                    items: [
                        {
                            label: 'Second Doc',
                            to: 'docs/doc2/',
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
                    editUrl: 'https://github.com/MateuszDabrowski/mateuszdabrowski.pl/edit/master/',
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
                sitemap: {},
            },
        ],
    ],
};
