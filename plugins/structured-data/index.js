/**
 * schema.org TechArticle markup for every article page.
 *
 * After the build, this plugin writes a JSON-LD block into the <head> of each
 * doc page under options.articlePaths. The block names the author by the @id
 * of the Person on the About page, carries the licence, and dates the article:
 * dateModified from the doc's last commit (as the page footer shows it) and
 * datePublished from the commit that first added the file.
 *
 * It writes into the built HTML, not through React, because the first-commit
 * date only exists at build time and crawlers read the static HTML anyway.
 * Page bundles stay the same size.
 */
const fs = require('fs/promises');
const path = require('path');
const { execFile } = require('child_process');
const { promisify } = require('util');

const { productsInSource } = require('../product-names');

const run = promisify(execFile);
const DOCS_PLUGIN = 'docusaurus-plugin-content-docs';

/** The public page path: docs permalinks carry no trailing slash. */
const pagePath = (permalink) => `${permalink.replace(/\/+$/, '')}/`;

/** Date of the commit that first added the file, following renames. */
async function firstCommitDate(file, cwd) {
    try {
        const { stdout } = await run('git', ['log', '--follow', '--diff-filter=A', '--format=%aI', '--', file], { cwd });
        const dates = stdout.trim().split('\n').filter(Boolean);
        return dates.length ? dates[dates.length - 1] : undefined;
    } catch {
        return undefined;
    }
}

/** Runs fn over items, at most `limit` at a time. */
async function mapLimited(items, limit, fn) {
    const results = [];
    let next = 0;
    const worker = async () => {
        while (next < items.length) {
            const idx = next;
            next += 1;
            results[idx] = await fn(items[idx]);
        }
    };
    await Promise.all(Array.from({ length: limit }, worker));
    return results;
}

module.exports = function structuredDataPlugin(context, options) {
    const {
        person,
        license,
        articlePaths = ['/docs/'],
        exclude = [],
    } = options;
    const siteUrl = context.siteConfig.url.replace(/\/+$/, '');
    const defaultImage = context.siteConfig.themeConfig.image;
    const excluded = exclude.map(pagePath);

    return {
        name: 'structured-data',

        async postBuild({ outDir, plugins }) {
            const docs = plugins
                .filter((plugin) => plugin.name === DOCS_PLUGIN)
                .flatMap((plugin) => plugin.content.loadedVersions.flatMap((version) => version.docs))
                .filter((doc) => !doc.unlisted && !doc.draft)
                .filter((doc) => {
                    const page = pagePath(doc.permalink);
                    return articlePaths.some((prefix) => page.startsWith(prefix)) && !excluded.includes(page);
                });

            const author = { '@type': 'Person', '@id': person.id, name: person.name, url: person.url };

            await mapLimited(docs, 8, async (doc) => {
                const file = path.join(outDir, pagePath(doc.permalink), 'index.html');
                const html = await fs.readFile(file, 'utf8');
                if (html.includes('"@type":"TechArticle"')) return;

                const url = siteUrl + pagePath(doc.permalink);
                const image = doc.frontMatter.image || defaultImage;
                const sourcePath = doc.source.replace(/^@site\//, '');
                const published = await firstCommitDate(sourcePath, context.siteDir);
                // Products marked with :product[...], with every other name they had.
                const about = productsInSource(await fs.readFile(path.join(context.siteDir, sourcePath), 'utf8'))
                    .map((product) => ({ '@type': 'Thing', name: product.display.name, alternateName: product.alternateNames }));
                const article = {
                    '@context': 'https://schema.org',
                    '@type': 'TechArticle',
                    '@id': `${url}#article`,
                    headline: doc.title,
                    description: doc.description || undefined,
                    url,
                    mainEntityOfPage: url,
                    image: image ? `${siteUrl}/${image.replace(/^\//, '')}` : undefined,
                    datePublished: published,
                    dateModified: doc.lastUpdatedAt ? new Date(doc.lastUpdatedAt).toISOString() : undefined,
                    inLanguage: 'en',
                    keywords: doc.tags.length ? doc.tags.map((tag) => tag.label) : undefined,
                    about: about.length ? about : undefined,
                    author,
                    publisher: author,
                    license,
                    isAccessibleForFree: true,
                };
                // "<" escaped so no string in the data can close the script tag.
                const json = JSON.stringify(article).replace(/</g, '\\u003c');
                const tag = `<script type="application/ld+json">${json}</script>`;
                await fs.writeFile(file, html.replace('</head>', `${tag}</head>`));
            });
        },
    };
};
