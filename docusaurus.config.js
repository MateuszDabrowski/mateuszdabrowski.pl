/* eslint-disable global-require */
module.exports = {
    title: 'Mateusz Dąbrowski',
    tagline: 'Automate Marketing Automation',
    url: 'https://mateuszdabrowski.pl',
    baseUrl: '/',
    trailingSlash: true,
    favicon: 'img/favicon.ico',
    organizationName: 'MateuszDabrowski',
    projectName: 'mateuszdabrowski.pl',
    customFields: {
        description: 'Automate marketing automation. let code = do("our job").',
        keywords: [
            'Mateusz',
            'Dąbrowski',
            'mateuszdabrowski',
            'Eloqua',
            'Oracle Eloqua',
            'Marketing Cloud',
            'Salesforce Marketing Cloud',
            'SFMC',
            'Configuration',
            'AMPScript',
            'SSJS',
            'SQL',
            'JS',
            'JavaScript',
            'Developer',
        ],
    },
    themeConfig: {
        image: 'img/logotyp-og.png', // Default image for meta tag
        // announcementBar: {
        //     id: 'announcementBar',
        //     content:
        //         '🚧 Search currently doesn\'t work - check full list of docs & articles <a href="https://mateuszdabrowski.pl/docs/">here</a> 🚧',
        //     backgroundColor: '#F6B355',
        //     textColor: '#00001F',
        // },
        navbar: {
            logo: {
                alt: 'Mateusz Dąbrowski Logo',
                src: 'img/logo-horizontal-light-2x.png',
                srcDark: 'img/logo-horizontal-dark-2x.png',
            },
            items: [
                {
                    label: 'Docs & Snippets',
                    to: 'docs',
                    activeBasePath: 'docs',
                    position: 'left',
                },
                {
                    label: 'Ideas',
                    to: 'sites/ideas',
                    position: 'left',
                },
                {
                    label: 'Toolset',
                    to: 'sites/my-toolset',
                    position: 'left',
                },
                {
                    href: 'https://www.linkedin.com/in/mateusz-dabrowski-marketing/',
                    position: 'right',
                    className: 'header-linkedin-link',
                    'aria-label': 'LinkedIn Profile',
                },
                {
                    href: 'https://trailblazer.me/id/madabrowski',
                    position: 'right',
                    className: 'header-salesforce-link',
                    'aria-label': 'Trailblazer Profile',
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
                    title: 'Docs & Snippets',
                    items: [
                        {
                            label: 'SSJS',
                            to: 'docs/ssjs/ssjs-if-and-switch',
                        },
                        {
                            label: 'JavaScript',
                            to: 'docs/js/js-if-and-switch',
                        },
                        {
                            label: 'AMPScript',
                            to: 'docs/ampscript/ampscript-style-guide',
                        },
                        {
                            label: 'SFMC SQL',
                            to: 'docs/sql/sfmc-sql-basics',
                        },
                        {
                            label: 'SFMC Config',
                            to: 'docs/config/sfmc-config-features-on-demand',
                        },
                    ],
                },
                {
                    title: 'About',
                    items: [
                        {
                            label: 'Toolset',
                            to: 'sites/my-toolset',
                        },
                        {
                            label: 'Ideas',
                            to: 'sites/ideas',
                        },
                    ],
                },
                {
                    title: 'Legal',
                    items: [
                        {
                            label: 'Licence & Attribution',
                            to: 'sites/licence',
                        },
                        {
                            label: 'Privacy',
                            to: 'sites/privacy',
                        },
                    ],
                },
            ],
        },
        gtag: {
            trackingID: 'GTM-N46LB5K',
            anonymizeIP: true,
        },
        // algolia: {
        //     apiKey: '3fbd31ec489532e5020df55b3410e6e6',
        //     indexName: 'mateuszdabrowski',
        //     placeholder: 'Search Docs & Snipptes',
        // },
    },
    presets: [
        [
            '@docusaurus/preset-classic',
            {
                docs: {
                    path: 'docs',
                    routeBasePath: 'docs',
                    include: ['**/*.md', '**/*.mdx'],
                    sidebarPath: require.resolve('./docs/docsSidebar.js'),
                    showLastUpdateAuthor: true,
                    showLastUpdateTime: true,
                    editUrl: 'https://github.com/MateuszDabrowski/mateuszdabrowski.pl/edit/master/',
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
                sitemap: {
                    changefreq: 'weekly',
                    priority: 0.5,
                },
            },
        ],
    ],
    plugins: [
        [
            '@docusaurus/plugin-content-docs',
            {
                id: 'sites',
                path: 'sites',
                routeBasePath: 'sites',
                include: ['**/*.md', '**/*.mdx'],
                sidebarPath: require.resolve('./sidebars.json'),
                showLastUpdateAuthor: true,
                showLastUpdateTime: true,
                editUrl: 'https://github.com/MateuszDabrowski/mateuszdabrowski.pl/edit/master/',
            },
        ],
        [
            '@docusaurus/plugin-ideal-image',
            {
                quality: 70,
                max: 1030, // max resized image's size.
                min: 640, // min resized image's size. if original is lower, use that size.
                steps: 2, // the max number of images generated between min and max (inclusive)
            },
        ],
        [
            '@docusaurus/plugin-client-redirects', // Works only on production
            {
                redirects: [
                    {
                        from: ['/docs/ideas/engage-with-countdown', '/ideas/engage-with-countdown'],
                        to: '/docs/usecase/engage-with-countdown',
                    },
                    {
                        from: ['/docs/ideas/tailor-with-data', '/ideas/tailor-with-data'],
                        to: '/docs/usecase/tailor-with-data',
                    },
                    {
                        from: ['/ideas'],
                        to: '/sites/ideas',
                    },
                ],
            },
        ],
    ],
    onBrokenLinks: 'warn',
};
