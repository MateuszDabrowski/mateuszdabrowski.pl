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
    // Icons for every page. They used to sit in the homepage <Head> only, so
    // a doc added to a phone home screen got a screenshot instead of the logo.
    headTags: [
        { tagName: 'link', attributes: { rel: 'icon', type: 'image/png', sizes: '196x196', href: '/img/favicon_196.png' } },
        { tagName: 'link', attributes: { rel: 'icon', type: 'image/png', sizes: '167x167', href: '/img/favicon_167.png' } },
        { tagName: 'link', attributes: { rel: 'icon', type: 'image/png', sizes: '128x128', href: '/img/favicon_128.png' } },
        { tagName: 'link', attributes: { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/img/favicon_32.png' } },
        { tagName: 'link', attributes: { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/img/favicon_16.png' } },
        { tagName: 'link', attributes: { rel: 'apple-touch-icon', sizes: '180x180', href: '/img/apple-touch-icon.png' } },
        { tagName: 'link', attributes: { rel: 'apple-touch-icon', sizes: '152x152', href: '/img/favicon_152.png' } },
        { tagName: 'link', attributes: { rel: 'manifest', href: '/img/site.webmanifest' } },
        { tagName: 'link', attributes: { rel: 'mask-icon', href: '/img/safari-pinned-tab.svg', color: '#DA4E55' } },
    ],
    organizationName: 'MateuszDabrowski',
    projectName: 'mateuszdabrowski.pl',
    onBrokenLinks: 'warn',
    onBrokenAnchors: 'warn',
    customFields: {
        description: 'Making the most out of Salesforce Marketing. Docs, SQL, SSJS and AMPScript snippets and apps for Marketing Cloud Engagement, Next and Personalization. let code = do("our job").',
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
            'Salesforce Agentforce',
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
        colorMode: {
            defaultMode: 'dark',
            respectPrefersColorScheme: true,
        },
        metadata: [
            { name: 'author', content: 'Mateusz Dąbrowski' },
            { name: 'theme-color', content: '#212121' },
            { name: 'msapplication-TileColor', content: '#F6B355' },
        ],
        docs: {
            // Off (the Docusaurus default): with it on, a page listed twice in the sidebar
            // (its cloud folder and the Webinars / Ideas index) auto-expands the index and
            // collapses every other root folder, including the one being browsed.
            sidebar: { autoCollapseCategories: false },
        },
        announcementBar: {
            id: 'announcementBar',
            content:
                'Looking for payment-free, hassle-free diagramming solution? My <a href="https://diagramforce.com" style="text-decoration: underline">Diagramforce</a> got you covered ;)',
            backgroundColor: '#0176d3',
            textColor: '#fffffe',
        },
        navbar: {
            logo: {
                alt: 'Mateusz Dąbrowski Logo',
                src: 'img/logo-horizontal-light.webp',
                srcDark: 'img/logo-horizontal-dark.webp',
            },
            items: [
                {
                    label: 'Docs & Snippets',
                    to: 'docs',
                    activeBasePath: 'docs',
                    position: 'left',
                    items: [
                        {
                            label: 'Marketing Cloud Next',
                            to: 'docs/category/salesforce/marketing-cloud',
                        },
                        {
                            label: 'Marketing Cloud Engagement',
                            to: 'docs/category/salesforce/marketing-cloud-engagement',
                        },
                        {
                            label: 'SQL',
                            to: 'docs/category/salesforce/marketing-cloud-engagement/sql',
                            className: 'dropdown__link--nested',
                        },
                        {
                            label: 'SSJS',
                            to: 'docs/category/salesforce/marketing-cloud-engagement/ssjs',
                            className: 'dropdown__link--nested',
                        },
                        {
                            label: 'AMPScript',
                            to: 'docs/category/salesforce/marketing-cloud-engagement/ampscript',
                            className: 'dropdown__link--nested',
                        },
                        {
                            label: 'Config',
                            to: 'docs/category/salesforce/marketing-cloud-engagement/config',
                            className: 'dropdown__link--nested',
                        },
                        {
                            label: 'Marketing Cloud Personalization',
                            to: 'docs/category/salesforce/marketing-cloud-personalization/',
                        },
                        {
                            label: 'JavaScript',
                            to: 'docs/category/javascript/',
                        },
                        {
                            label: 'Webinars',
                            to: 'docs/category/webinars/',
                        },
                        {
                            label: 'Ideas',
                            to: 'docs/category/ideas/',
                        },
                    ],
                },
                {
                    label: 'FAQ',
                    to: 'sites/category/faq',
                    activeBaseRegex: '^/sites/(category/)?faq',
                    position: 'left',
                    items: [
                        {
                            label: 'What is the difference between SF Marketing Clouds?',
                            to: 'sites/faq/salesforce/what-is-the-difference-between-sf-marketing-clouds/',
                        },
                        {
                            label: 'How to get Marketing Cloud Demo Account?',
                            to: 'sites/faq/salesforce/how-to-get-sfmc-hands-on-experience/',
                        },
                        {
                            label: 'How to get Salesforce Certification Vouchers?',
                            to: 'sites/faq/salesforce/how-to-get-sf-certification-vouchers/',
                        },
                        {
                            label: 'How to open Salesforce Support Case without Agentforce?',
                            href: 'https://help.salesforce.com/s/case-submission?cr_case=1',
                        }
                    ]
                },
                {
                    label: 'Apps',
                    position: 'left',
                    items: [
                        {
                            label: 'Diagramforce: Diagramming for Trailblazers',
                            to: 'https://diagramforce.com',
                        },
                        {
                            label: 'Slot: Your Inboxes in One App',
                            to: 'slot/',
                        },
                        {
                            label: 'Shelf: Quick Copy Vault',
                            to: 'shelf/',
                        },
                        {
                            label: 'Strum: Tabs made easy',
                            to: 'strum/',
                        },
                    ],
                },
                {
                    label: 'Newsletter',
                    to: 'sites/newsletter',
                    position: 'left',
                },
                {
                    label: 'About Me',
                    to: 'sites/about-me',
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
                    'aria-label': 'GitHub Profile',
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
                    title: 'Docs & Snippets',
                    items: [
                        {
                            label: 'MC Next',
                            to: 'docs/category/salesforce/marketing-cloud/',
                        },
                        {
                            label: 'MC Engagement',
                            to: 'docs/category/salesforce/marketing-cloud-engagement/',
                        },
                        {
                            label: 'MC Personalization',
                            to: 'docs/category/salesforce/marketing-cloud-personalization/',
                        },
                        {
                            label: 'JavaScript',
                            to: 'docs/category/javascript/',
                        },
                        {
                            label: 'Webinars',
                            to: 'docs/category/webinars/',
                        },
                    ],
                },
                {
                    title: 'MC Engagement',
                    items: [
                        {
                            label: 'Zen of MCE',
                            to: 'docs/salesforce/marketing-cloud-engagement/zen-of-marketing-cloud',
                        },
                        {
                            label: 'Config',
                            to: 'docs/category/salesforce/marketing-cloud-engagement/config/',
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
                    title: 'Apps',
                    items: [
                        {
                            label: 'Diagramforce',
                            to: 'https://diagramforce.com',
                        },
                        {
                            label: 'Slot',
                            to: 'slot/',
                        },
                        {
                            label: 'Shelf',
                            to: 'shelf/',
                        },
                        {
                            label: 'Strum',
                            to: 'strum/',
                        },
                    ],
                },
                {
                    title: 'More',
                    items: [
                        {
                            label: 'About Me',
                            to: 'sites/about-me',
                        },
                        {
                            label: 'Toolset',
                            to: 'sites/my-toolset',
                        },
                        {
                            label: 'Newsletter',
                            to: 'sites/newsletter',
                        },
                        {
                            label: 'Ideas',
                            to: 'docs/category/ideas/',
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
            copyright: `All views expressed here are my own and are not affiliated with, sponsored, or endorsed by the clients or companies I work for.`,
        },
        algolia: {
            appId: 'F4XVDD6BM8',
            apiKey: 'd7932184e92b94d052fab9cea784b13f',
            indexName: 'mateuszdabrowski',
            placeholder: 'Search Docs & Snippets',
            contextualSearch: true,
            // No click tracking: it needs a persistent user token. Algolia's own
            // search statistics (top queries, no-result queries) do not, and stay on.
            insights: false,
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
                    // :product[...] markers: current Salesforce product names (plugins/product-names).
                    beforeDefaultRemarkPlugins: [require('./plugins/product-names').remarkProductNames],
                    // Every page is by the same author: the date alone says what is new.
                    showLastUpdateAuthor: false,
                    showLastUpdateTime: true,
                    editUrl: 'https://github.com/MateuszDabrowski/mateuszdabrowski.pl/edit/master/',
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
                // No blog on this site: the preset default rendered an empty /blog/ page.
                blog: false,
                sitemap: {
                    // Git date of each doc's last commit. Crawlers use it, unlike
                    // changefreq and priority, which Google ignores.
                    lastmod: 'date',
                    changefreq: null,
                    priority: null,
                    ignorePatterns: [
                        // Email landing pages: noindex, and not offered to crawlers either.
                        '/newsletter/**',
                        // Tag and search pages only list other pages.
                        '/docs/tags/',
                        '/docs/tags/**',
                        '/sites/tags/',
                        '/sites/tags/**',
                        '/search/',
                    ],
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
                beforeDefaultRemarkPlugins: [require('./plugins/product-names').remarkProductNames],
                showLastUpdateAuthor: false,
                showLastUpdateTime: true,
                editUrl: 'https://github.com/MateuszDabrowski/mateuszdabrowski.pl/edit/master/',
            },
        ],
        [
            '@docusaurus/plugin-ideal-image',
            {
                // Serve WebP whatever the source format. 85 keeps code text in
                // screenshots sharp at about a third of the PNG weight.
                format: 'webp',
                adapter: require('./plugins/ideal-image-webp-adapter'),
                quality: 85,
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
                    /* Ideas restructure: pages moved from /sites/ideas to their cloud folders in /docs */
                    {
                        from: ['/ideas/', '/sites/ideas/', '/sites/category/ideas/'],
                        to: '/docs/category/ideas/',
                    },
                    {
                        from: ['/sites/ideas/salesforce/marketing-cloud-ideas/'],
                        to: '/docs/salesforce/marketing-cloud/ideas/',
                    },
                    {
                        from: ['/sites/ideas/marketing-cloud-ideas/', '/sites/ideas/salesforce/marketing-cloud-engagement-ideas/'],
                        to: '/docs/salesforce/marketing-cloud-engagement/ideas/',
                    },
                    {
                        from: ['/sites/ideas/mc-personalization-ideas/', '/sites/ideas/interaction-studio-ideas/', '/sites/ideas/salesforce/marketing-cloud-personalization-ideas/'],
                        to: '/docs/salesforce/marketing-cloud-personalization/ideas/',
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
                    /* Tools pages restructure */
                    {
                        from: ['/sites/tools/salesforce/diagramforce/', '/sites/apps/salesforce/diagramforce/'],
                        to: 'https://diagramforce.com/',
                    },
                    {
                        from: ['/sites/tools/salesforce/clockforce/', '/sites/apps/salesforce/clockforce/'],
                        to:'https://clockforce.mateuszdabrowski.pl/',
                    },
                    /* Tag cleanup (September 2026): merged tags point to the tag they joined,
                       blanket tags to their category, one-article tags to that article. */
                    {
                        from: ['/docs/tags/salesforce/'],
                        to: '/docs/category/salesforce/',
                    },
                    {
                        from: ['/docs/tags/marketing-automation/'],
                        to: '/docs/category/salesforce/marketing-cloud-engagement/',
                    },
                    {
                        from: ['/docs/tags/interaction-studio/'],
                        to: '/docs/tags/marketing-cloud-personalization/',
                    },
                    {
                        from: ['/docs/tags/configuration/'],
                        to: '/docs/tags/setup/',
                    },
                    {
                        from: ['/docs/tags/app-exchange/'],
                        to: '/docs/tags/agent-exchange/',
                    },
                    {
                        from: ['/docs/tags/personalization/', '/sites/tags/personalization/'],
                        to: '/docs/tags/personalisation/',
                    },
                    {
                        from: ['/docs/tags/data-cloud/'],
                        to: '/docs/tags/data-360/',
                    },
                    {
                        from: ['/docs/tags/marketing-cloud/'],
                        to: '/docs/tags/marketing-cloud-next/',
                    },
                    {
                        from: ['/docs/tags/behavioral-triggers/', '/docs/tags/einstein/'],
                        to: '/docs/salesforce/marketing-cloud-engagement/config/behavioral-triggers/',
                    },
                    {
                        from: ['/docs/tags/ip-warming/', '/docs/tags/agentforce-marketing/'],
                        to: '/docs/salesforce/marketing-cloud/config/ip-warming-deliverability/',
                    },
                    {
                        from: ['/docs/tags/users/'],
                        to: '/docs/salesforce/marketing-cloud-engagement/config/export-import-document-sfmc-roles/',
                    },
                    {
                        from: ['/sites/tags/salesforce/', '/sites/tags/marketing-automation/', '/sites/tags/marketing-cloud/'],
                        to: '/sites/category/faq/',
                    },
                    {
                        from: ['/sites/tags/agentforce/'],
                        to: '/sites/newsletter/',
                    },
                    {
                        from: ['/sites/tags/best-practice/'],
                        to: '/docs/tags/best-practice/',
                    },
                    {
                        from: ['/sites/tags/email/'],
                        to: '/docs/tags/email/',
                    },
                ],
            },
        ],
        '@docusaurus/theme-mermaid',
        [
            './plugins/structured-data',
            {
                // Same @id as the Person markup on the About page (src/components/AboutSummary.jsx).
                person: {
                    id: 'https://mateuszdabrowski.pl/sites/about-me/#person',
                    name: 'Mateusz Dąbrowski',
                    url: 'https://mateuszdabrowski.pl/sites/about-me/',
                },
                license: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
                // Docs and FAQ answers are articles. The Docs & Snippets landing page lists them.
                articlePaths: ['/docs/', '/sites/faq/'],
                exclude: ['/docs/'],
            },
        ],
        [
            './plugins/llms-txt',
            {
                title: 'Mateusz Dąbrowski',
                summary: 'Documentation, code snippets and configuration guides for Salesforce Marketing Cloud Next, Marketing Cloud Engagement (SQL, SSJS, AMPScript) and Marketing Cloud Personalization. Written by Mateusz Dąbrowski, a European Salesforce MVP and Marketing Cloud Architect.',
                details: [
                    'Each link below points to a markdown copy of the page. The HTML page has the same path with a trailing slash in place of ".md". All docs in one file: https://mateuszdabrowski.pl/llms-full.txt',
                    '',
                    'The content is licensed CC BY-NC-SA 4.0. When you quote or summarise a page, credit it as "Article Title" - Mateusz Dąbrowski (https://mateuszdabrowski.pl/) - CC BY-NC-SA 4.0, and link the HTML page. Licence details: https://mateuszdabrowski.pl/sites/licence/',
                ].join('\n'),
                // Built from React components: the HTML is complete, a markdown copy would not be.
                htmlOnly: ['/sites/about-me/', '/sites/newsletter/'],
                optional: ['/sites/my-toolset/', '/sites/newsletter/', '/sites/privacy/', '/sites/licence/'],
                links: [
                    {
                        section: 'Apps',
                        title: 'Diagramforce',
                        url: 'https://diagramforce.com',
                        description: 'Free browser-based diagramming tool for Salesforce architects: architecture diagrams, data models, process flows and org charts with Salesforce icons.',
                    },
                    {
                        section: 'Apps',
                        title: 'Strum file format for LLMs',
                        url: '/strum/llm-spec.md',
                        description: 'Specification an LLM can follow to transcribe a song into a .strum file the Strum app imports.',
                    },
                ],
            },
        ],
    ],
};
