/* eslint-disable global-require */

// Prism theme import
const { themes } = require('prism-react-renderer');
const lightTheme = themes.github;
const darkTheme = themes.vsDark;

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
    onBrokenAnchors: 'warn',
    customFields: {
        description: 'Personal website focused on making the most out of Marketing Automation. let code = do("our job").',
        keywords: [
            'Mateusz Dąbrowski',
            'mateuszdabrowski',
            'Marketing Automation',
            'Salesforce',
            'Marketing Cloud',
            'Marketing Cloud Engagement',
            'Salesforce Marketing Cloud',
            'Salesforce Marketing Cloud Next',
            'Salesforce Marketing Cloud Engagement',
            'Interaction Studio',
            'Marketing Cloud Personalization',
            'Salesforce Personalization',
            'SFMC',
            'MCE',
            'Agentforce',
            'JavaScript',
            'AMPScript',
            'SSJS',
            'SQL',
            'JS',
        ],
    },
    markdown: {
        format: 'mdx',
        mermaid: true,
        hooks: {
            onBrokenMarkdownLinks: 'warn',
            onBrokenMarkdownImages: 'warn',
        }
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
                'Big website restructuring ongoing - if you find a broken link <a href="https://www.linkedin.com/in/mateusz-dabrowski-pl/" style="text-decoration: underline">please let me know</a>',
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
                    label: 'Docs & Snippets',
                    to: 'docs',
                    activeBasePath: 'docs',
                    position: 'left',
                    items: [
                        {
                            label: 'Marketing Cloud Engagement',
                            to: 'docs/category/salesforce/marketing-cloud-engagement',
                        },
                        {
                            label: 'Marketing Cloud Personalization',
                            to: 'docs/category/salesforce/marketing-cloud-personalization/',
                        },
                        {
                            label: 'JavaScript',
                            to: 'docs/category/javascript/',
                        },
                    ],
                },
                {
                    label: 'Webinars',
                    to: 'docs/category/webinars/',
                    position: 'left',
                    items: [
                        {
                            label: 'MCE Account Architecture',
                            to: 'docs/salesforce/marketing-cloud-engagement/config/webinars/mce-account-architecture',
                        },
                        {
                            label: 'Salesforce Data in Journey Builder',
                            to: 'docs/salesforce/marketing-cloud-engagement/config/webinars/mce-salesforce-data-in-journey-builder',
                        },
                        {
                            label: 'Architecting MCE Web Solutions',
                            to: 'docs/salesforce/marketing-cloud-engagement/config/webinars/mce-architecting-web-solutions',
                        },
                        {
                            label: 'MCE Cloud Page Apps',
                            to: 'docs/salesforce/marketing-cloud-engagement/config/webinars/mce-cloud-page-apps',
                        },
                    ],
                },
                {
                    label: 'FAQ',
                    to: 'sites/category/faq',
                    activeBasePath: 'sites/faq',
                    position: 'left',
                    items: [
                        {
                            label: 'How to get Marketing Cloud Demo Account',
                            to: 'sites/faq/salesforce/how-to-get-sfmc-hands-on-experience/',
                        },
                        {
                            label: 'How to get Salesforce Certification Vouchers',
                            to: 'sites/faq/salesforce/how-to-get-sf-certification-vouchers/',
                        },
                    ]
                },
                {
                    label: 'Ideas',
                    to: 'sites/category/ideas',
                    activeBasePath: 'sites/ideas',
                    position: 'left',
                    items: [
                        {
                            label: 'Marketing Cloud Engagement',
                            to: 'sites/ideas/salesforce/marketing-cloud-engagement-ideas/',
                        },
                        {
                            label: 'Marketing Cloud Personalization',
                            to: 'sites/ideas/salesforce/marketing-cloud-personalization-ideas/',
                        },
                    ]
                },
                {
                    label: 'Tags',
                    to: 'docs/tags',
                    position: 'left',
                },
                {
                    label: 'Newsletter',
                    to: 'sites/newsletter',
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
            theme: lightTheme,
            darkTheme: darkTheme,
            additionalLanguages: ['sql', 'json'],
        },
        mermaid: {
            theme: { light: 'neutral', dark: 'dark' },
        },
        footer: {
            style: 'dark',
            links: [
                {
                    title: 'MC Engagement Docs',
                    items: [
                        {
                            label: 'Zen of SFMC',
                            to: 'docs/salesforce/marketing-cloud-engagement/zen-of-marketing-cloud',
                        },
                        {
                            label: 'Config',
                            to:  'docs/category/salesforce/marketing-cloud-engagement/config/',
                        },
                        {
                            label: 'SQL',
                            to: 'docs/category/salesforce/marketing-cloud-engagement/sql/',
                        },
                        {
                            label: 'SSJS',
                            to: 'docs/category/salesforce/marketing-cloud-engagement/ssjs/',
                        },
                        {
                            label: 'AMPScript',
                            to: 'docs/category/salesforce/marketing-cloud-engagement/ampscript/',
                        },
                    ],
                },
                {
                    title: 'Other Docs',
                    items: [
                        {
                            label: 'MC Personalization',
                            to: 'docs/category/salesforce/marketing-cloud-personalization/',
                        },
                        {
                            label: 'JavaScript',
                            to: 'docs/category/javascript/',
                        },
                    ],
                },
                {
                    title: 'My',
                    items: [
                        {
                            label: 'Newsletter',
                            to: 'sites/newsletter',
                        },
                        {
                            label: 'Webinars',
                            to: 'docs/category/webinars',
                        },
                        {
                            label: 'Toolset',
                            to: 'sites/my-toolset',
                        },
                        {
                            label: 'Ideas',
                            to: 'sites/category/ideas',
                        },
                        {
                            label: 'FAQ',
                            to: 'sites/category/faq',
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
            insights: true,
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
                        from: ['/docs/zen-of-sfmc/', '/docs/salesforce/marketing-cloud-engagement/zen-of-sfmc'],
                        to: '/docs/salesforce/marketing-cloud-engagement/zen-of-marketing-cloud',
                    },
                    /* SF MCE Config Restructure */
                    {
                        from: ['/docs/sql/sfmc-sql-snippet-enhanced-send-log/', '/docs/usecase/sfmc-enhanced-send-log/', '/docs/config/sfmc-enhanced-send-log/'],
                        to: '/docs/salesforce/marketing-cloud-engagement/config/enhanced-send-log/',
                    },
                    {
                        from: ['/docs/config/sfmc-config-behavioral-triggers/', '/docs/usecase/sfmc-behavioral-triggers/', '/docs/config/sfmc-behavioral-triggers/'],
                        to: '/docs/salesforce/marketing-cloud-engagement/config/behavioral-triggers/',
                    },
                    {
                        from: ['/docs/usecase/sfmc-contact-deletion/', '/docs/config/sfmc-contact-deletion/'],
                        to: '/docs/salesforce/marketing-cloud-engagement/config/contact-deletion/',
                    },
                    {
                        from: ['/docs/usecase/sfmc-code-resource/', '/docs/config/sfmc-code-resource/'],
                        to: '/docs/salesforce/marketing-cloud-engagement/config/code-resource/',
                    },
                    {
                        from: ['/docs/appexchange/sfmc-appexchange-overview/', '/docs/config/sfmc-config-appexchange-solutions/', '/docs/config/sfmc-appexchange-solutions/'],
                        to: '/docs/salesforce/marketing-cloud-engagement/config/appexchange-solutions/',
                    },
                    {
                        from: ['/docs/config/sfmc-config-system-data-views/', '/docs/config/sfmc-system-data-views/'],
                        to: '/docs/salesforce/marketing-cloud-engagement/config/system-data-views/',
                    },
                    {
                        from: ['/docs/config/sfmc-mobile-connect-data-views/'],
                        to: '/docs/salesforce/marketing-cloud-engagement/config/mobile-connect-data-views/',
                    },
                    {
                        from: ['/docs/config/sfmc-config-features-on-demand/', '/docs/config/sfmc-features-on-demand/'],
                        to: '/docs/salesforce/marketing-cloud-engagement/config/features-on-demand/',
                    },
                    {
                        from: ['/docs/config/sfmc-mcc-integration-patterns/'],
                        to: '/docs/salesforce/marketing-cloud-engagement/config/mcc-integration-patterns/',
                    },
                      {
                        from: ['/docs/config/sfmc-config-permissions/', '/docs/config/sfmc-permissions/', '/docs/js/js-snippet-export-import-document-sfmc-roles/', '/docs/js/snippets/export-import-document-sfmc-roles/'],
                        to: '/docs/salesforce/marketing-cloud-engagement/config/export-import-document-sfmc-roles/',
                    },
                    /* SF MCE AMPScript Restructure */
                    {
                        from: ['/docs/ampscript/ampscript-style-guide/'],
                        to: '/docs/salesforce/marketing-cloud-engagement/ampscript/ampscript-style-guide/',
                    },
                    /* SF MCE SSJS Restructure */
                    {
                        from: ['/docs/ssjs/ssjs-snippet-ampscript-in-ssjs/', '/docs/ssjs/snippets/ampscript-in-ssjs/'],
                        to: '/docs/salesforce/marketing-cloud-engagement/ssjs/snippets/ampscript-in-ssjs/',
                    },
                    {
                        from: ['/docs/ssjs/ssjs-snippet-mobileconnect-phone-change/', '/docs/ssjs/snippets/ssjs-mobileconnect-phone-change/'],
                        to: '/docs/salesforce/marketing-cloud-engagement/ssjs/snippets/ssjs-mobileconnect-phone-change/',
                    },
                    {
                        from: ['/docs/ssjs/ssjs-snippet-ssjs-script-template/', '/docs/ssjs/snippets/ssjs-script-template/'],
                        to: '/docs/salesforce/marketing-cloud-engagement/ssjs/snippets/ssjs-script-template/',
                    },
                    {
                        from: ['/docs/usecase/sfmc-cloud-apps/', '/docs/usecase/sfmc-cloud-page-apps/', '/docs/ssjs/snippets/sfmc-cloud-page-apps/'],
                        to: '/docs/salesforce/marketing-cloud-engagement/ssjs/snippets/sfmc-cloud-page-apps/',
                    },
                    {
                        from: ['/docs/ssjs/debugging-ssjs/'],
                        to: '/docs/salesforce/marketing-cloud-engagement/ssjs/debugging-ssjs/',
                    },
                    {
                        from: ['/docs/ssjs/ssjs-if-and-switch/'],
                        to: '/docs/salesforce/marketing-cloud-engagement/ssjs/ssjs-if-and-switch/',
                    },
                    {
                        from: ['/docs/ssjs/ssjs-loops/'],
                        to: '/docs/salesforce/marketing-cloud-engagement/ssjs/ssjs-loops/',
                    },
                    {
                        from: ['/docs/ssjs/ssjs-style-guide/'],
                        to: '/docs/salesforce/marketing-cloud-engagement/ssjs/ssjs-style-guide/',
                    },
                    {
                        from: ['/docs/ssjs/ssjs-vs-ampscript-performance/'],
                        to: '/docs/salesforce/marketing-cloud-engagement/ssjs/ssjs-vs-ampscript-performance/',
                    },
                    /* SF MCE SQL Restructure */
                    {
                        from: ['/docs/sql/sfmc-sql-aggregate-functions/'],
                        to: '/docs/salesforce/marketing-cloud-engagement/sql/sql-aggregate-functions/',
                    },
                    {
                        from: ['/docs/sql/sfmc-sql-basics/'],
                        to: '/docs/salesforce/marketing-cloud-engagement/sql/sql-basics/',
                    },
                    {
                        from: ['/docs/sql/sfmc-sql-case/'],
                        to: '/docs/salesforce/marketing-cloud-engagement/sql/sql-case/',
                    },
                    {
                        from: ['/docs/sql/sfmc-sql-conversion-functions/'],
                        to: '/docs/salesforce/marketing-cloud-engagement/sql/sql-conversion-functions/',
                    },
                    {
                        from: ['/docs/sql/sfmc-sql-date-functions/'],
                        to: '/docs/salesforce/marketing-cloud-engagement/sql/sql-date-functions/',
                    },
                    {
                        from: ['/docs/sql/sfmc-sql-from/'],
                        to: '/docs/salesforce/marketing-cloud-engagement/sql/sql-from/',
                    },
                    {
                        from: ['/docs/sql/sfmc-sql-join/'],
                        to: '/docs/salesforce/marketing-cloud-engagement/sql/sql-join/',
                    },
                     {
                        from: ['/docs/sql/sfmc-sql-like/'],
                        to: '/docs/salesforce/marketing-cloud-engagement/sql/sql-like/',
                    },
                    {
                        from: ['/docs/sql/sfmc-sql-null-functions/'],
                        to: '/docs/salesforce/marketing-cloud-engagement/sql/sql-null-functions/',
                    },
                    {
                        from: ['/docs/sql/sfmc-sql-numeric-functions/'],
                        to: '/docs/salesforce/marketing-cloud-engagement/sql/sql-numeric-functions/',
                    },
                    {
                        from: ['/docs/sql/sfmc-sql-select/'],
                        to: '/docs/salesforce/marketing-cloud-engagement/sql/sql-select/',
                    },
                    {
                        from: ['/docs/sql/sfmc-sql-string-functions/'],
                        to: '/docs/salesforce/marketing-cloud-engagement/sql/sql-string-functions/',
                    },
                    {
                        from: ['/docs/sql/sfmc-sql-style-guide/'],
                        to: '/docs/salesforce/marketing-cloud-engagement/sql/sql-style-guide/',
                    },
                    {
                        from: ['/docs/sql/sfmc-sql-where/'],
                        to: '/docs/salesforce/marketing-cloud-engagement/sql/sql-where/',
                    },
                    {
                        from: ['/docs/sql/sfmc-sql-snippet-debugging-email-sends/', '/docs/sql/snippets/sfmc-sql-debugging-email-sends/'],
                        to: '/docs/salesforce/marketing-cloud-engagement/sql/snippets/sql-debugging-email-sends/',
                    },
                    {
                        from: ['/docs/sql/sfmc-sql-snippet-debugging-value-length/', '/docs/sql/snippets/sfmc-sql-debugging-value-length/'],
                        to: '/docs/salesforce/marketing-cloud-engagement/sql/snippets/sql-debugging-value-length/',
                    },
                    /* JS Snippets restructure */
                    {
                        from: ['/docs/ideas/engage-with-countdown/', '/ideas/engage-with-countdown/', '/docs/usecase/engage-with-countdown/'],
                        to: '/docs/js/snippets/engage-with-countdown/',
                    },
                    {
                        from: ['/docs/ideas/tailor-with-data/', '/ideas/tailor-with-data/', '/docs/usecase/tailor-with-data/'],
                        to: '/docs/js/snippets/tailor-with-data/',
                    },
                    /* Interaction Studio rename */
                    {
                        from: ['/docs/interaction-studio/is-catalog-architecture/', '/docs/interaction-studio/mcp-catalog-architecture/'],
                        to: '/docs/salesforce/marketing-cloud-personalization/catalog-architecture/',
                    },
                    {
                        from: ['/docs/interaction-studio/is-open-time-email/', '/docs/interaction-studio/mcp-open-time-email/'],
                        to: '/docs/salesforce/marketing-cloud-personalization/open-time-email/',
                    },
                    {
                        from: ['/docs/interaction-studio/snippets/is-catalog-etl-metadata-viewer/', '/docs/interaction-studio/snippets/mcp-catalog-etl-metadata-viewer/'],
                        to: '/docs/salesforce/marketing-cloud-personalization/snippets/catalog-etl-metadata-viewer/',
                    },
                    {
                        from: ['/docs/interaction-studio/mcp-serverside-code-basics/'],
                        to: '/docs/salesforce/marketing-cloud-personalization/serverside-code-basics/',
                    },
                    {
                        from: ['/docs/interaction-studio/mcp-serverside-code-context/'],
                        to: '/docs/salesforce/marketing-cloud-personalization/serverside-code-context/',
                    },
                    {
                        from: ['/docs/interaction-studio/mcp-serverside-code-properties/'],
                        to: '/docs/salesforce/marketing-cloud-personalization/serverside-code-properties/',
                    },
                    /* Category pages restructure */
                    {
                        from: ['/docs/category/marketing-cloud-engagement/'],
                        to: '/docs/category/salesforce/marketing-cloud-engagement/',
                    },
                    {
                        from: ['/docs/sql/', '/docs/category/sfmc-sql/'],
                        to: '/docs/category/salesforce/marketing-cloud-engagement/sql/',
                    },
                    {
                        from: ['/docs/category/-sql-snippets/'],
                        to: '/docs/category/salesforce/marketing-cloud-engagement/sql/snippets/',
                    },
                    {
                        from: ['/docs/ssjs/',  '/docs/category/ssjs/'],
                        to: '/docs/category/salesforce/marketing-cloud-engagement/ssjs/',
                    },
                    {
                        from: ['/docs/category/-ssjs-snippets/'],
                        to: '/docs/category/salesforce/marketing-cloud-engagement/ssjs/snippets/',
                    },
                    {
                        from: ['/docs/category/ampscript/'],
                        to: '/docs/category/salesforce/marketing-cloud-engagement/ampscript/',
                    },
                                        {
                        from: ['/docs/category/sfmc-use-cases/', '/docs/category/sfmc-config/'],
                        to: '/docs/category/salesforce/marketing-cloud-engagement/config/',
                    },
                    {
                        from: ['/docs/sfmc-webinars/', '/docs/category/sfmc-webinars/'],
                        to: '/docs/category/salesforce/marketing-cloud-engagement/webinars/',
                    },
                    {
                        from: ['/docs/interaction-studio/', '/docs/category/interaction-studio/', '/docs/category/mc-personalization/'],
                        to: '/docs/category/salesforce/marketing-cloud-personalization/',
                    },
                    {
                        from: ['/docs/category/serverside-code/', '/docs/category/-serverside-code/'],
                        to: '/docs/category/salesforce/marketing-cloud-personalization/serverside-code/',
                    },
                    {
                        from: ['/docs/category/interaction-studio-snippets/', '/docs/category/-mc-personalization-snippets/'],
                        to: '/docs/category/salesforce/marketing-cloud-personalization/snippets/',
                    },
                    /* Ideas restructure */
                    {
                        from: ['/ideas/', '/sites/ideas/', '/sites/ideas/marketing-cloud-ideas/'],
                        to: '/sites/ideas/salesforce/marketing-cloud-engagement-ideas/',
                    },
                    {
                        from: ['/sites/ideas/mc-personalization-ideas/', '/sites/ideas/interaction-studio-ideas/'],
                        to: '/sites/ideas/salesforce/marketing-cloud-personalization-ideas/',
                    },
                    /* Webinars restructure */
                    {
                        from: ['/docs/webinars/sfmc-webinar-account-architecture', '/docs/salesforce/marketing-cloud-engagement/config/webinars/sfmc-webinar-account-architecture'],
                        to: '/docs/salesforce/marketing-cloud-engagement/config/webinars/mce-account-architecture',
                    },
                    {
                        from: ['/docs/webinars/sfmc-webinar-salesforce-data-in-journey-builder', '/docs/salesforce/marketing-cloud-engagement/config/webinars/sfmc-webinar-salesforce-data-in-journey-builder'],
                        to: '/docs/salesforce/marketing-cloud-engagement/config/webinars/mce-salesforce-data-in-journey-builder',
                    },
                    {
                        from: ['/docs/webinars/sfmc-webinar-architecting-web-solutions', '/docs/salesforce/marketing-cloud-engagement/config/webinars/sfmc-webinar-architecting-web-solutions'],
                        to: '/docs/salesforce/marketing-cloud-engagement/config/webinars/mce-architecting-web-solutions',
                    },
                    {
                        from: ['/docs/webinars/sfmc-webinar-cloud-page-apps', '/docs/salesforce/marketing-cloud-engagement/config/webinars/sfmc-webinar-cloud-page-apps'],
                        to: '/docs/salesforce/marketing-cloud-engagement/config/webinars/mce-cloud-page-apps',
                    },
                     /* FAQ pages restructure */
                     {
                        from: ['/sites/faq/how-to-get-sfmc-hands-on-experience/'],
                        to: '/sites/faq/salesforce/how-to-get-sfmc-hands-on-experience/',
                    },
                    {
                        from: ['/sites/faq/how-to-get-sf-certification-vouchers/'],
                        to:'/sites/faq/salesforce/how-to-get-sf-certification-vouchers/',
                    },
                ],
            },
        ],
        '@docusaurus/theme-mermaid',
    ],
};
