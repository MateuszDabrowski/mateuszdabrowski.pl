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
    markdown: {
        mermaid: true,
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
        // announcementBar: {
        //     id: 'announcementBar',
        //     content:
        //         '🧑🏻‍💻 <a href="/docs/webinars/sfmc-webinar-account-architecture/" style="text-decoration: none">Webinar covering SFMC Account Architecture considerations incoming - 28 Jan 2023 - register <span style="text-decoration: underline;">here</span>.</a> 🧑🏻‍💻',
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
                        {
                            label: 'Interaction Studio',
                            to: 'docs/category/interaction-studio-snippets/',
                        },
                    ],
                },
                {
                    label: 'Webinars',
                    to: 'docs/category/sfmc-webinars/',
                    position: 'left',
                    items: [
                        {
                            label: 'SFMC Account Architecture',
                            to: 'docs/webinars/sfmc-webinar-account-architecture',
                        },
                        {
                            label: 'Architecting Web Solutions',
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
                    href: 'https://www.linkedin.com/in/mateusz-dabrowski-pl',
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
        mermaid: {
            theme: { light: 'neutral', dark: 'dark' },
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
                        {
                            label: 'Interaction Studio',
                            to: 'docs/category/interaction-studio-snippets/',
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
                    /* SFMC Config restructure */
                    {
                        from: ['/docs/sql/sfmc-sql-snippet-enhanced-send-log/', '/docs/usecase/sfmc-enhanced-send-log/'],
                        to: '/docs/config/sfmc-enhanced-send-log/',
                    },
                    {
                        from: ['/docs/config/sfmc-config-behavioral-triggers/', '/docs/usecase/sfmc-behavioral-triggers/'],
                        to: '/docs/config/sfmc-behavioral-triggers/',
                    },
                    {
                        from: ['/docs/usecase/sfmc-contact-deletion/'],
                        to: '/docs/config/sfmc-contact-deletion/',
                    },
                    {
                        from: ['/docs/usecase/sfmc-code-resource/'],
                        to: '/docs/config/sfmc-code-resource/',
                    },
                    {
                        from: ['/docs/appexchange/sfmc-appexchange-overview/', '/docs/config/sfmc-config-appexchange-solutions/'],
                        to: '/docs/config/sfmc-appexchange-solutions/',
                    },
                    {
                        from: ['/docs/config/sfmc-config-permissions/'],
                        to: '/docs/js/snippets/export-import-document-sfmc-roles/',
                    },
                    {
                        from: ['/docs/config/sfmc-permissions/'],
                        to: '/docs/js/snippets/export-import-document-sfmc-roles/',
                    },
                    {
                        from: ['/docs/config/sfmc-config-system-data-views/'],
                        to: '/docs/config/sfmc-system-data-views/',
                    },
                    {
                        from: ['/docs/config/sfmc-config-features-on-demand/'],
                        to: '/docs/config/sfmc-features-on-demand/',
                    },
                    /* SFMC Snippets restructure */
                    {
                        from: ['/docs/ideas/engage-with-countdown/', '/ideas/engage-with-countdown/', '/docs/usecase/engage-with-countdown/'],
                        to: '/docs/js/snippets/engage-with-countdown/',
                    },
                    {
                        from: ['/docs/ideas/tailor-with-data/', '/ideas/tailor-with-data/', '/docs/usecase/tailor-with-data/'],
                        to: '/docs/js/snippets/tailor-with-data/',
                    },
                    {
                        from: ['/docs/ssjs/ssjs-snippet-ampscript-in-ssjs/'],
                        to: '/docs/ssjs/snippets/ampscript-in-ssjs/',
                    },
                    {
                        from: ['/docs/ssjs/ssjs-snippet-mobileconnect-phone-change/'],
                        to: '/docs/ssjs/snippets/ssjs-mobileconnect-phone-change/',
                    },
                    {
                        from: ['/docs/ssjs/ssjs-snippet-ssjs-script-template/'],
                        to: '/docs/ssjs/snippets/ssjs-script-template/',
                    },
                    {
                        from: ['/docs/js/js-snippet-export-import-document-sfmc-roles/'],
                        to: '/docs/js/snippets/export-import-document-sfmc-roles/',
                    },
                    {
                        from: ['/docs/sql/sfmc-sql-snippet-debugging-email-sends/'],
                        to: '/docs/sql/snippets/sfmc-sql-debugging-email-sends/',
                    },
                    {
                        from: ['/docs/sql/sfmc-sql-snippet-debugging-value-length/'],
                        to: '/docs/sql/snippets/sfmc-sql-debugging-value-length/',
                    },
                    {
                        from: ['/docs/usecase/sfmc-cloud-apps/', '/docs/usecase/sfmc-cloud-page-apps/'],
                        to: '/docs/ssjs/snippets/sfmc-cloud-page-apps/',
                    },
                    /* Category pages restructure */
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
                    {
                        from: ['/docs/category/sfmc-use-cases/'],
                        to: '/docs/category/sfmc-config/',
                    },
                    {
                        from: ['/docs/interaction-studio/'],
                        to: '/docs/category/interaction-studio/',
                    },
                    /* Ideas restructure */
                    {
                        from: ['/ideas/', '/sites/ideas/'],
                        to: '/sites/ideas/marketing-cloud-ideas/',
                    },
                ],
            },
        ],
        '@docusaurus/theme-mermaid',
    ],
};
