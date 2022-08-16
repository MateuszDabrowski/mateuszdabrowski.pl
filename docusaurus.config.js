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
    onBrokenLinks: 'warn',
    onBrokenMarkdownLinks: 'warn',
    customFields: {
        description: 'Personal website focused on making the most out of Salesforce Marketing Cloud. let code = do("our job").',
        keywords: [
            'Mateusz Dąbrowski',
            'mateuszdabrowski',
            'Marketing Cloud',
            'Salesforce Marketing Cloud',
            'SFMC',
            'JavaScript',
            'AMPScript',
            'SSJS',
            'SQL',
            'JS',
        ],
    },
    themeConfig: {
        image: 'img/og/og-image-base.png', // Default image for meta tag
        defaultMode: 'dark',
        respectPrefersColorScheme: true,
        metadata: [
            { name: 'author', content: 'Mateusz Dąbrowski' },
            { name: 'theme-color', content: '#212121' },
            { name: 'msapplication-TileColor', content: '#F6B355' },
        ],
        // announcementBar: {
        //     id: 'announcementBar',
        //     content:
        //         '☁️  <a href="https://nominations.salesforcemvps.com/s/" style="text-decoration: none">Do you know someone in the #TrailblazerCommunity who goes above and beyond to help others? Nominations for the 2022 Salesforce MVP class are <span style="text-decoration:underline">open</span></a> ☁️',
        //     backgroundColor: '#0176d3',
        //     textColor: '#fffffe',
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
                    items: [
                        {
                            label: 'Zen of SFMC',
                            type: 'doc',
                            docId: 'zen-of-sfmc',
                        },
                        {
                            label: 'SSJS',
                            to: 'docs/category/ssjs/',
                        },
                        {
                            label: 'JavaScript',
                            to: 'docs/category/javascript/',
                        },
                        {
                            label: 'AMPScript',
                            to: 'docs/category/ampscript/',
                        },
                        {
                            label: 'SFMC SQL',
                            to: 'docs/category/sfmc-sql/',
                        },
                        {
                            label: 'SFMC Config',
                            to: 'docs/category/sfmc-config/',
                        },
                        {
                            label: 'SFMC Use Cases',
                            to: 'docs/category/sfmc-use-cases/',
                        },
                    ],
                },
                {
                    label: 'Tags',
                    to: 'docs/tags',
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
                    href: 'https://www.linkedin.com/in/mateusz-dabrowski-marketing',
                    position: 'right',
                    className: 'header-linkedin-link',
                    'aria-label': 'LinkedIn Profile',
                },
                {
                    href: 'https://twitter.com/MDabrowskiPL',
                    position: 'right',
                    className: 'header-twitter-link',
                    'aria-label': 'Twitter Profile',
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
                            to: 'docs/category/ssjs/',
                        },
                        {
                            label: 'JavaScript',
                            to: 'docs/category/javascript/',
                        },
                        {
                            label: 'AMPScript',
                            to: 'docs/category/ampscript/',
                        },
                        {
                            label: 'SFMC SQL',
                            to: 'docs/category/sfmc-sql/',
                        },
                        {
                            label: 'SFMC Config',
                            to: 'docs/category/sfmc-config/',
                        },
                        {
                            label: 'SFMC Use Cases',
                            to: 'docs/category/sfmc-use-cases/',
                        },
                    ],
                },
                {
                    title: 'About',
                    items: [
                        {
                            label: 'Zen of SFMC',
                            to: 'docs/zen-of-sfmc',
                        },
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
        algolia: {
            appId: 'F4XVDD6BM8',
            apiKey: 'd7932184e92b94d052fab9cea784b13f',
            indexName: 'mateuszdabrowski',
            placeholder: 'Search Docs & Snipptes',
            contextualSearch: true,
        },
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
                gtag: {
                    trackingID: 'GTM-N46LB5K',
                    anonymizeIP: true,
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
                max: 1030,      // max resized image's size.
                min: 640,       // min resized image's size. if original is lower, use that size.
                steps: 2,       // the max number of images generated between min and max (inclusive)
            },
        ],
        [
            '@docusaurus/plugin-client-redirects', // Works only on production
            {
                redirects: [
                    {
                        from: ['/docs/sql/sfmc-sql-snippet-enhanced-send-log'],
                        to: '/docs/usecase/sfmc-enhanced-send-log',
                    },
                    {
                        from: ['/docs/ideas/engage-with-countdown', '/ideas/engage-with-countdown'],
                        to: '/docs/usecase/engage-with-countdown',
                    },
                    {
                        from: ['/docs/ideas/tailor-with-data', '/ideas/tailor-with-data'],
                        to: '/docs/usecase/tailor-with-data',
                    },
                    {
                        from: ['/docs/usecase/sfmc-cloud-apps'],
                        to: '/docs/usecase/sfmc-cloud-page-apps',
                    },
                    {
                        from: ['/docs/appexchange/sfmc-appexchange-overview'],
                        to: '/docs/config/sfmc-config-appexchange-solutions',
                    },
                    {
                        from: ['/ideas'],
                        to: '/sites/ideas',
                    },
                    {
                        from: ['/docs/sql'],
                        to: '/docs/category/sfmc-sql/',
                    },
                    {
                        from: ['/docs/ssjs'],
                        to: '/docs/category/ssjs/',
                    },
                ],
            },
        ],
    ],
    onBrokenLinks: 'warn',
};
