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
        description: 'Automate marketing automation. let code = do("our job").',
        keywords: [
            'mateusz',
            'dąbrowski',
            'mateuszdabrowski',
            'eloqua',
            'oracle eloqua',
            'marketing cloud',
            'salesforce marketing cloud',
            'sfmc',
            'SSJS',
            'Developer',
        ],
    },
    themeConfig: {
        image: 'img/logotyp-og.png', // Default image for meta tag
        announcementBar: {
            id: 'announcementBar',
            content:
                '🚧 Website under development. If you found any bug or have a feedback, please share <a href="https://github.com/MateuszDabrowski/mateuszdabrowski.pl/issues" title="Github Issues">here</a>. Thanks! 🚧',
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
                    to: 'docs/ssjs',
                    activeBasePath: 'docs',
                    label: 'Snippets',
                    position: 'left',
                },
                {
                    to: 'docs/engage-with-countdown',
                    activeBasePath: 'docs',
                    label: 'Ideas',
                    position: 'left',
                },
                {
                    href: 'https://www.linkedin.com/in/mateusz-dabrowski-marketing/',
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
                    title: 'Read',
                    items: [
                        {
                            label: 'Snippets',
                            to: 'docs/ssjs',
                        },
                        {
                            label: 'Ideas',
                            to: 'docs/engage-with-countdown',
                        },
                    ],
                },
                {
                    title: 'About',
                    items: [
                        {
                            label: 'Toolset',
                            to: 'docs/toolset',
                        },
                    ],
                },
                {
                    title: 'Legal',
                    items: [
                        {
                            label: 'Licence & Attribution',
                            to: 'docs/licence',
                        },
                        {
                            label: 'Privacy',
                            to: 'docs/privacy',
                        },
                    ],
                },
            ],
        },
        googleAnalytics: {
            trackingID: 'UA-121919433-1',
            anonymizeIP: true,
        },
        // algolia: {
        //     apiKey: '',
        //     indexName: '',
        //     algoliaOptions: {},
        // },
    },
    presets: [
        [
            '@docusaurus/preset-classic',
            {
                docs: {
                    path: 'docs',
                    routeBasePath: 'docs',
                    homePageId: 'ssjs',
                    include: ['**/*.md', '**/*.mdx'],
                    sidebarPath: require.resolve('./sidebars.js'),
                    showLastUpdateAuthor: true,
                    showLastUpdateTime: true,
                    editUrl: 'https://github.com/MateuszDabrowski/mateuszdabrowski.pl/edit/master/',
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
                sitemap: {
                    cacheTime: 600 * 1000, // 600 sec - cache purge period
                    changefreq: 'weekly',
                    priority: 0.5,
                },
            },
        ],
    ],
};
