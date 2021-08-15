module.exports = {
    snippets: [
        {
            type: 'doc',
            id: 'docs-and-snippets',
        },
        {
            type: 'category',
            label: 'SSJS',
            items: [
                'ssjs/ssjs-if-and-switch',
                'ssjs/ssjs-loops',
                'ssjs/debugging-ssjs',
                'ssjs/ssjs-style-guide',
                'ssjs/ssjs-vs-ampscript-performance',
                {
                    'SSJS Use Cases': ['usecase/sfmc-cloud-apps', 'usecase/engage-with-countdown', 'usecase/tailor-with-data'],
                },
                {
                    'SSJS Snippets': [
                        'ssjs/ssjs-snippet-ampscript-in-ssjs',
                        'ssjs/ssjs-snippet-mobileconnect-phone-change',
                        'ssjs/ssjs-snippet-ssjs-script-template'
                    ],
                },
            ],
        },
        {
            type: 'category',
            label: 'JavaScript',
            items: [
                'js/js-if-and-switch',
                'js/js-loops',
                {
                    'JS Use Cases': ['usecase/engage-with-countdown', 'usecase/tailor-with-data'],
                },
            ],
        },
        {
            type: 'category',
            label: 'AMPScript',
            items: [
                'ampscript/ampscript-style-guide',
                'ssjs/ssjs-vs-ampscript-performance',
                {
                    'AMPScript Use Cases': [
                        'usecase/sfmc-cloud-apps',
                    ],
                },
                {
                    'AMPScript Snippets': [
                        'ssjs/ssjs-snippet-ampscript-in-ssjs',
                    ],
                },

            ],
        },
        {
            type: 'category',
            label: 'SFMC SQL',
            items: [
                'sql/sfmc-sql-basics',
                'sql/sfmc-sql-select',
                'sql/sfmc-sql-from',
                'sql/sfmc-sql-join',
                'sql/sfmc-sql-where',
                'sql/sfmc-sql-like',
                'sql/sfmc-sql-string-functions',
                'sql/sfmc-sql-date-functions',
                'sql/sfmc-sql-numeric-functions',
                'sql/sfmc-sql-conversion-functions',
                'sql/sfmc-sql-aggregate-functions',
                'sql/sfmc-sql-style-guide',
                {
                    'SQL Snippets': [
                        'sql/sfmc-sql-snippet-debugging-email-sends',
                        'sql/sfmc-sql-snippet-debugging-value-length',
                        'sql/sfmc-sql-snippet-enhanced-send-log'
                    ],
                },
            ],
        },
        {
            type: 'category',
            label: 'SFMC Config',
            items: [
                'config/sfmc-config-permissions',
                'config/sfmc-config-system-data-views',
                'config/sfmc-config-features-on-demand',
                'config/sfmc-config-behavioral-triggers',
            ],
        },
    ],
};
