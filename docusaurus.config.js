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
            'Interaction Studio',
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
        docs: {
            sidebar: { autoCollapseCategories: true, },
        },
        announcementBar: {
            id: 'announcementBar',
            content:
                '🛠️ <a href="https://www.linkedin.com/in/mateusz-dabrowski-marketing/" style="text-decoration: none">Due to site restructuring there might be some broken links. If you find any - please <span style="text-decoration: underline;">let me know</span>.</a> 🛠️',
            backgroundColor: '#0176d3',
            textColor: '#fffffe',
        },
        navbar: {
            logo: {
                alt: 'Mateusz Dąbrowski Logo',
                src: 'img/logo-horizontal-light-2x.png',
                srcDark: 'img/logo-horizontal-dark-2x.png',
            },
            items: [
                {
                    label: 'Docs',
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
                        {
                            label: 'Interaction Studio',
                            to: 'docs/category/interaction-studio/',
                        },
                    ],
                },
                {
                    label: 'Snippets',
                    to: 'docs',
                    activeBasePath: 'docs',
                    position: 'left',
                    items: [
                        {
                            label: 'SSJS',
                            to: 'docs/category/ssjs-snippets/',
                        },
                        {
                            label: 'JavaScript',
                            to: 'docs/category/js-snippets/',
                        },
                        {
                            label: 'AMPScript',
                            to: 'docs/category/ampscript-snippets/',
                        },
                        {
                            label: 'SFMC SQL',
                            to: 'docs/category/sfmc-sql-snippets/',
                        },
                    ],
                },
                {
                    label: 'Webinars',
                    to: 'docs/category/sfmc-webinars/',
                    position: 'left',
                    items: [
                        {
                            label: 'Architecting Web Solutions ',
                            to: 'docs/webinars/sfmc-webinar-architecting-web-solutions',
                        },
                        {
                            label: 'Cloud Page Apps',
                            to: 'docs/webinars/sfmc-webinar-cloud-page-apps',
                        },
                    ],
                },
                {
                    label: 'Ideas',
                    to: 'sites/category/ideas',
                    activeBasePath: 'sites/ideas',
                    position: 'left',
                    items: [
                        {
                            label: 'Marketing Cloud',
                            to: 'sites/ideas/marketing-cloud-ideas/',
                        },
                        {
                            label: 'Interaction Studio',
                            to: 'sites/ideas/interaction-studio-ideas/',
                        },
                    ]
                },
                {
                    label: 'Tags',
                    to: 'docs/tags',
                    position: 'left',
                },
                {
                    href: 'https://www.linkedin.com/in/mateusz-dabrowski-marketing',
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
                    title: 'Docs',
                    items: [
                        {
                            label: 'Zen of SFMC',
                            to: 'docs/zen-of-sfmc',
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
                        {
                            label: 'Interaction Studio',
                            to: 'docs/category/interaction-studio/',
                        },
                    ],
                },
                {
                    title: 'Snippets',
                    items: [
                        {
                            label: 'SSJS',
                            to: 'docs/category/ssjs-snippets/',
                        },
                        {
                            label: 'JavaScript',
                            to: 'docs/category/js-snippets/',
                        },
                        {
                            label: 'AMPScript',
                            to: 'docs/category/ampscript-snippets/',
                        },
                        {
                            label: 'SFMC SQL',
                            to: 'docs/category/sfmc-sql-snippets/',
                        },
                    ],
                },
                {
                    title: 'My',
                    items: [

                        {
                            label: 'Webinars',
                            to: 'docs/category/sfmc-webinars',
                        },
                        {
                            label: 'Toolset',
                            to: 'sites/my-toolset',
                        },
                        {
                            label: 'Ideas',
                            to: 'sites/category/ideas',
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
                sidebarPath: require.resolve('./sites/sitesSidebar.js'),
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
                        from: ['/docs/sql/sfmc-sql-snippet-enhanced-send-log/'],
                        to: '/docs/usecase/sfmc-enhanced-send-log/',
                    },
                    {
                        from: ['/docs/config/sfmc-config-behavioral-triggers/'],
                        to: '/docs/usecase/sfmc-behavioral-triggers/',
                    },
                    {
                        from: ['/docs/ideas/engage-with-countdown/', '/ideas/engage-with-countdown/', '/docs/usecase/engage-with-countdown/'],
                        to: '/docs/js/snippets/js-snippet-engage-with-countdown/',
                    },
                    {
                        from: ['/docs/ideas/tailor-with-data/', '/ideas/tailor-with-data/', '/docs/usecase/tailor-with-data/'],
                        to: '/docs/js/snippets/js-snippet-tailor-with-data/',
                    },
                    {
                        from: ['/docs/ssjs/ssjs-snippet-ampscript-in-ssjs/'],
                        to: '/docs/ssjs/snippets/ssjs-snippet-ampscript-in-ssjs/',
                    },
                    {
                        from: ['/docs/ssjs/ssjs-snippet-mobileconnect-phone-change/'],
                        to: '/docs/ssjs/snippets/ssjs-snippet-mobileconnect-phone-change/',
                    },
                    {
                        from: ['/docs/ssjs/ssjs-snippet-ssjs-script-template/'],
                        to: '/docs/ssjs/snippets/ssjs-snippet-ssjs-script-template/',
                    },
                    {
                        from: ['/docs/js/js-snippet-export-import-document-sfmc-roles/'],
                        to: '/docs/js/snippets/js-snippet-export-import-document-sfmc-roles/',
                    },
                    {
                        from: ['/docs/sql/sfmc-sql-snippet-debugging-email-sends/'],
                        to: '/docs/sql/snippets/sfmc-sql-snippet-debugging-email-sends/',
                    },
                    {
                        from: ['/docs/sql/sfmc-sql-snippet-debugging-value-length/'],
                        to: '/docs/sql/snippets/sfmc-sql-snippet-debugging-value-length/',
                    },
                    {
                        from: ['/docs/usecase/sfmc-cloud-apps/'],
                        to: '/docs/usecase/sfmc-cloud-page-apps/',
                    },
                    {
                        from: ['/docs/appexchange/sfmc-appexchange-overview/'],
                        to: '/docs/config/sfmc-config-appexchange-solutions/',
                    },
                    {
                        from: ['/ideas/', '/sites/ideas/'],
                        to: '/sites/ideas/marketing-cloud-ideas/',
                    },
                    {
                        from: ['/docs/sql/'],
                        to: '/docs/category/sfmc-sql/',
                    },
                    {
                        from: ['/docs/ssjs/'],
                        to: '/docs/category/ssjs/',
                    },
                    {
                        from: ['/docs/sfmc-webinars/'],
                        to: '/docs/category/sfmc-webinars/',
                    },
                ],
            },
        ],
    ],
};
