module.exports = {
    docs: [
        {
            type: 'doc',
            id: 'zen-of-sfmc',
        },
        {
            type: 'category',
            label: 'SSJS',
            link: {
                type: 'generated-index',
                title: 'SSJS',
                description: 'SSJS is an XX-century version of JavaScript paired with proprietary libraries created by Salesforce. It is one of the programmatic tools useful to leverage Marketing Cloud to its fullest potential. I am creating this documentation to make my (and hopefully also yours) work easier.',
                keywords: ['Marketing Cloud', 'SSJS'],
                image: 'img/og/og-image-ssjs.png',
            },
            items: [
                'ssjs/ssjs-if-and-switch',
                'ssjs/ssjs-loops',
                'ssjs/debugging-ssjs',
                'ssjs/ssjs-style-guide',
                'ssjs/ssjs-vs-ampscript-performance',
                {
                    type: 'link',
                    label: '» SSJS Snippets',
                    href: '/docs/category/ssjs-snippets/',
                },
                {
                    type: 'link',
                    label: '» Official SSJS Docs',
                    href: 'https://developer.salesforce.com/docs/marketing/marketing-cloud/guide/ssjs_serverSideJavaScript.html',
                },
            ],
        },
        {
            type: 'category',
            label: 'JavaScript',
            link: {
                type: 'generated-index',
                title: 'JavaScript',
                description: 'In this part, I am gathering selected elements of modern vanilla JavaScript that I find helpful for marketing technologists. Expect guides on asynchronous calls to API and backend resources, form-focused DOM manipulation and playing with data objects.',
                keywords: ['JavaScript', 'JS'],
                image: 'img/og/og-image-js.png',
            },
            items: [
                'js/js-if-and-switch',
                'js/js-loops',
                'js/js-dom',
                {
                    type: 'link',
                    label: '» JS Snippets',
                    href: '/docs/category/js-snippets/',
                },
            ],
        },
        {
            type: 'category',
            label: 'AMPScript',
            link: {
                type: 'generated-index',
                title: 'AMPScript',
                description: 'AMPScript is a proprietary scripting language in Salesforce Marketing Cloud along with SSJS. Out of the two, it is simpler and more performant, but too limited for complex solutions. Good starting point for marketers without development experience. Best option for scripting in messaging.',
                keywords: ['Marketing Cloud', 'AMPScript'],
                image: 'img/og/og-image-ampscript.png',
            },
            items: [
                'ampscript/ampscript-style-guide',
                'ssjs/ssjs-vs-ampscript-performance',
                {
                    type: 'link',
                    label: '» AMPScript Snippets',
                    href: '/docs/category/ampscript-snippets/',
                },
                {
                    type: 'link',
                    label: '» Official AMPScript Docs',
                    href: 'https://developer.salesforce.com/docs/marketing/marketing-cloud/guide/ampscript.html',
                },
            ],
        },
        {
            type: 'category',
            label: 'SFMC SQL',
            link: {
                type: 'generated-index',
                title: 'SFMC SQL',
                description: 'To fully leverage the Salesforce Marketing Cloud Data Extensions and Automation Studio, SQL is a must-have. Here I gathered both the language basics and some of the most valuable snippets to copy and paste shamelessly.',
                keywords: ['Marketing Cloud, SQL'],
                image: 'img/og/og-image-sql.png',
            },
            items: [
                'sql/sfmc-sql-basics',
                'sql/sfmc-sql-select',
                'sql/sfmc-sql-from',
                'sql/sfmc-sql-join',
                'sql/sfmc-sql-where',
                'sql/sfmc-sql-case',
                'sql/sfmc-sql-like',
                'sql/sfmc-sql-string-functions',
                'sql/sfmc-sql-date-functions',
                'sql/sfmc-sql-numeric-functions',
                'sql/sfmc-sql-conversion-functions',
                'sql/sfmc-sql-aggregate-functions',
                'sql/sfmc-sql-null-functions',
                'sql/sfmc-sql-style-guide',
                {
                    type: 'link',
                    label: '» SQL Snippets',
                    href: '/docs/category/sfmc-sql-snippets/',
                },
            ],
        },
        {
            type: 'category',
            label: 'SFMC Config',
            link: {
                type: 'generated-index',
                title: 'SFMC Config',
                description: 'Many things in Salesforce Marketing Cloud aren\'t coding but have a massive impact on the code. Permissions. System Data Views. Configuration options. Here I focus on the most important ones that are crucial for Marketing Cloud developers.',
                keywords: ['Marketing Cloud', 'Configuration'],
                image: 'img/og/og-image-sfmc-config.png',
            },
            items: [
                'config/sfmc-system-data-views',
                'config/sfmc-mobile-connect-data-views',
                'config/sfmc-mcc-integration-patterns',
                'config/sfmc-code-resource',
                'config/sfmc-contact-deletion',
                'config/sfmc-enhanced-send-log',
                'config/sfmc-behavioral-triggers',
                'config/sfmc-appexchange-solutions',
                'config/sfmc-features-on-demand',
                'config/sfmc-permissions',

            ],
        },
        {
            type: 'category',
            label: 'Interaction Studio',
            link: {
                type: 'generated-index',
                title: 'Interaction Studio',
                description: 'Interaction Studio (Salesforce Marketing Cloud Personalization) is a cross-channel real-time hyper-personalisation engine in Salesforce Marketing Cloud. Behind that cool-looking description is a powerful tool that lets your company adapt every point of contact to each person. Neat!',
                keywords: ['Marketing Cloud', 'Interaction Studio', 'Personalisation'],
                image: 'img/og/og-image-interaction-studio.png',
            },
            items: [
                'interaction-studio/is-catalog-architecture',
                'interaction-studio/is-open-time-email',
                {
                    type: 'link',
                    label: '» Interaction Studio Snippets',
                    href: '/docs/category/interaction-studio-snippets/',
                },
                {
                    type: 'link',
                    label: '» Official IS Business Docs',
                    href: 'https://help.salesforce.com/s/articleView?id=sf.mc_pers.htm',
                },
                {
                    type: 'link',
                    label: '» Official IS Developer Docs',
                    href: 'https://developer.salesforce.com/docs/marketing/personalization/guide/get-started.html',
                },
            ],
        },
    ],
    snippets: [
        {
            type: 'category',
            label: 'SSJS Snippets',
            link: {
                type: 'generated-index',
                title: 'SFMC SSJS Snippets',
                description: 'Ready-to-use Salesforce Marketing Cloud SSJS Snippets.',
                keywords: ['Marketing Cloud', 'SSJS'],
                image: 'img/og/og-image-sfmc-ssjs-snippets.png',
            },
            items: [
                'ssjs/snippets/ssjs-script-template',
                'ssjs/snippets/sfmc-cloud-page-apps',
                'ssjs/snippets/ssjs-mobileconnect-phone-change',
                'ssjs/snippets/ampscript-in-ssjs',
                {
                    type: 'link',
                    label: '» SSJS Docs',
                    href: '/docs/category/ssjs/',
                },
            ],
        },
        {
            type: 'category',
            label: 'JS Snippets',
            link: {
                type: 'generated-index',
                title: 'JS Snippets',
                description: 'Ready-to-use JavaScript Snippets.',
                keywords: ['JavaScript', 'JS'],
                image: 'img/og/og-image-js-snippets.png',
            },
            items: [
                'js/snippets/tailor-with-data',
                'js/snippets/engage-with-countdown',
                'js/snippets/export-import-document-sfmc-roles',
                {
                    type: 'link',
                    label: '» JS Docs',
                    href: '/docs/category/javascript/',
                },
            ],
        },
        {
            type: 'category',
            label: 'AMPScript Snippets',
            link: {
                type: 'generated-index',
                title: 'SFMC AMPScript Snippets',
                description: 'Ready-to-use Salesforce Marketing Cloud AMPScript Snippets.',
                keywords: ['Marketing Cloud', 'AMPScript'],
                image: 'img/og/og-image-sfmc-ampscript-snippets.png',
            },
            items: [
                'ssjs/snippets/ampscript-in-ssjs',
                {
                    type: 'link',
                    label: '» AMPScript Docs',
                    href: '/docs/category/ampscript/',
                },
            ],
        },
        {
            type: 'category',
            label: 'SFMC SQL Snippets',
            link: {
                type: 'generated-index',
                title: 'SFMC SQL Snippets',
                description: 'Ready-to-use Salesforce Marketing Cloud SQL Snippets.',
                keywords: ['Marketing Cloud', 'SQL'],
                image: 'img/og/og-image-sfmc-sql-snippets.png',
            },
            items: [
                'sql/snippets/sfmc-sql-debugging-email-sends',
                'sql/snippets/sfmc-sql-debugging-value-length',
                {
                    type: 'link',
                    label: '» SQL Docs',
                    href: '/docs/category/sfmc-sql/',
                },
            ],
        },
        {
            type: 'category',
            label: 'Interaction Studio Snippets',
            link: {
                type: 'generated-index',
                title: 'Interaction Studio Snippets',
                description: 'Ready-to-use Interaction Studio (Salesforce Marketing Cloud Personalization) Snippets.',
                keywords: ['Marketing Cloud', 'Interaction Studio', 'Personalisation'],
                image: 'img/og/og-image-interaction-studio-snippets.png',
            },
            items: [
                'interaction-studio/snippets/is-catalog-etl-metadata-viewer',
                {
                    type: 'link',
                    label: '» Interaction Studio Docs',
                    href: '/docs/category/interaction-studio/',
                },
            ],
        },
    ],
    webinars: [
        {
            type: 'category',
            label: 'SFMC Webinars',
            link: {
                type: 'generated-index',
                title: 'SFMC Webinars',
                description: 'My sessions on various aspects of Marketing Cloud with summary, recordings, slides, snippets and articles. All-in-one, all for free.',
                keywords: ['Marketing Cloud', 'Webinar'],
                image: 'img/og/og-image-webinars.png',
            },
            items: [
                'webinars/sfmc-webinar-account-architecture',
                'webinars/sfmc-webinar-architecting-web-solutions',
                'webinars/sfmc-webinar-cloud-page-apps',
            ],
        },
    ],
};
