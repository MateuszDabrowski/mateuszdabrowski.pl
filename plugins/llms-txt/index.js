/**
 * Markdown copies of the docs for AI assistants and agents.
 *
 * After the build this plugin writes, next to the HTML:
 * - /llms.txt: an index of every page with its description, grouped by the
 *   sidebars (format: https://llmstxt.org).
 * - a .md copy of every doc page at the page path with ".md" in place of the
 *   trailing slash: /docs/.../sql-basics/ -> /docs/.../sql-basics.md
 * - /llms-full.txt: all doc copies in one file.
 *
 * The copies come from the MDX source, not the HTML, because the source has
 * what the HTML lacks for a reader without JavaScript: Mermaid diagrams (drawn
 * in the browser only) and clean code blocks. Each MDX component becomes
 * plain markdown: Tabs become one bold label per tab followed by its content,
 * Image becomes a markdown image, Button a link, admonitions a quote. Unknown
 * components keep their children and lose the wrapper.
 *
 * Pages built mostly from React components (options.htmlOnly) get no copy;
 * llms.txt links their HTML, which is server-rendered and complete.
 *
 * The markdown libraries are the ones Docusaurus itself parses MDX with, so
 * the plugin adds no dependency.
 */
const fs = require('fs/promises');
const path = require('path');
const {
    unwrapMdxCodeBlocks,
    escapeMarkdownHeadingIds,
    admonitionTitleToDirectiveLabel,
} = require('@docusaurus/utils');

const { transformProductNames } = require('../product-names');

const PLUGIN_NAME = 'llms-txt';
const DOCS_PLUGIN = 'docusaurus-plugin-content-docs';
const PAGES_PLUGIN = 'docusaurus-plugin-content-pages';
const ADMONITIONS = ['note', 'tip', 'info', 'warning', 'danger', 'caution', 'important', 'secondary', 'success'];
// Components that render nothing useful as text.
const DROP = new Set(['Head', 'DocCardList', 'Countdown', 'AboutJsonLd', 'script', 'style', 'iframe', 'NewsletterForm', 'Form']);

/** /docs/a/b/ -> /docs/a/b.md */
function markdownPath(permalink) {
    return `${permalink.replace(/\/+$/, '') || '/index'}.md`;
}

/**
 * The public page path. Docs metadata keeps permalinks without the trailing
 * slash that trailingSlash: true adds to the built URL, so links and list
 * lookups go through this.
 */
function pagePath(permalink) {
    return `${permalink.replace(/\/+$/, '')}/`;
}

/** Docs from every docs plugin instance, minus drafts and unlisted pages. */
function collectDocs(plugins) {
    return plugins
        .filter((plugin) => plugin.name === DOCS_PLUGIN)
        .flatMap((plugin) => plugin.content.loadedVersions.flatMap((version) => version.docs.map((doc) => ({
            ...doc,
            pluginId: plugin.options.id,
            version,
        }))))
        .filter((doc) => !doc.unlisted && !doc.draft);
}

async function loadLibraries() {
    const [
        { unified },
        { default: remarkParse },
        { default: remarkMdx },
        { default: remarkGfm },
        { default: remarkDirective },
        { default: remarkFrontmatter },
        { default: remarkComment },
        { default: remarkStringify },
        { toString },
    ] = await Promise.all([
        import('unified'),
        import('remark-parse'),
        import('remark-mdx'),
        import('remark-gfm'),
        import('remark-directive'),
        import('remark-frontmatter'),
        import('@slorber/remark-comment'),
        import('remark-stringify'),
        import('mdast-util-to-string'),
    ]);
    const parser = unified()
        .use(remarkParse)
        .use(remarkMdx)
        .use(remarkGfm)
        .use(remarkDirective)
        .use(remarkFrontmatter)
        .use(remarkComment);
    const stringifier = unified()
        .use(remarkGfm)
        .use(remarkDirective)
        .use(remarkStringify, { bullet: '-', fences: true, listItemIndent: 'one', rule: '-' });
    return { parser, stringifier, toString };
}

/** Value of a JSX attribute: a string, true, { expression } or undefined. */
function attribute(node, name) {
    const found = (node.attributes || []).find((a) => a.type === 'mdxJsxAttribute' && a.name === name);
    if (!found) return undefined;
    if (found.value == null) return true;
    if (typeof found.value === 'string') return found.value;
    return { expression: found.value.value };
}

/** A string attribute, or a quoted string inside an expression. */
function stringAttribute(node, name) {
    const value = attribute(node, name);
    if (typeof value === 'string') return value;
    const quoted = value?.expression && /^\s*(['"`])([\s\S]*)\1\s*$/.exec(value.expression);
    return quoted ? quoted[2] : undefined;
}

const text = (value) => ({ type: 'text', value });
const paragraph = (children) => ({ type: 'paragraph', children });
const strong = (children) => ({ type: 'strong', children });

/**
 * Converts one MDX file to plain markdown.
 *
 * @param {object} doc - Docs plugin metadata: title, description, permalink, source.
 * @param {object} ctx - siteDir, siteUrl, libraries, and sourceToPermalink.
 * @return {Promise<string>} The markdown.
 */
async function convertDoc(doc, ctx) {
    const filePath = path.join(ctx.siteDir, doc.source.replace(/^@site\//, ''));
    let source = await fs.readFile(filePath, 'utf8');
    // Same preprocessing Docusaurus applies before its own MDX parse.
    source = unwrapMdxCodeBlocks(source);
    source = escapeMarkdownHeadingIds(source);
    source = admonitionTitleToDirectiveLabel(source, ADMONITIONS);

    const pageUrl = ctx.siteUrl + pagePath(doc.permalink);
    const imports = {};

    const resolveUrl = (url) => {
        if (!url || /^[a-z][a-z0-9+.-]*:/i.test(url) || url.startsWith('//')) return url;
        if (url.startsWith('#')) return pageUrl + url;
        const [pathname, hash] = url.split('#');
        const suffix = hash ? `#${hash}` : '';
        if (/\.mdx?$/.test(pathname)) {
            const candidates = pathname.startsWith('/')
                ? [path.join(ctx.siteDir, pathname), path.join(path.dirname(filePath), pathname)]
                : [path.resolve(path.dirname(filePath), pathname)];
            for (const candidate of candidates) {
                const permalink = ctx.sourceToPermalink.get(candidate);
                if (permalink) return ctx.siteUrl + pagePath(permalink) + suffix;
            }
            return ctx.siteUrl + pathname.replace(/\.mdx?$/, '/') + suffix;
        }
        if (pathname.startsWith('/')) return ctx.siteUrl + pathname.replace(/^\/static\//, '/') + suffix;
        return new URL(url, pageUrl).href;
    };

    /** Static file import path -> public URL: /static/img/a.png -> https://site/img/a.png */
    const assetUrl = (importPath) => ctx.siteUrl + importPath.replace(/^@site/, '').replace(/^\/?static\//, '/').replace(/^(?!\/)/, '/');

    const imageSource = (node) => {
        const img = attribute(node, 'img') ?? attribute(node, 'src');
        if (typeof img === 'string') return resolveUrl(img);
        const expression = img?.expression?.trim();
        if (!expression) return undefined;
        if (imports[expression]) return imports[expression];
        const required = /require\(\s*['"]([^'"]+)['"]\s*\)/.exec(expression);
        return required ? assetUrl(required[1]) : undefined;
    };

    let transformChildren;

    const convertTabs = (node) => {
        const labels = {};
        const values = attribute(node, 'values');
        for (const object of values?.expression?.match(/\{[^{}]*\}/g) || []) {
            const value = /value:\s*(['"`])(.*?)\1/.exec(object)?.[2];
            const label = /label:\s*(['"`])(.*?)\1/.exec(object)?.[2];
            if (value) labels[value] = label ?? value;
        }
        const out = [];
        for (const child of node.children) {
            if (child.type === 'mdxJsxFlowElement' && child.name === 'TabItem') {
                const value = stringAttribute(child, 'value');
                const label = stringAttribute(child, 'label') || labels[value] || value;
                if (label) out.push(paragraph([strong([text(label)])]));
                transformChildren(child);
                out.push(...child.children);
            } else {
                out.push(...convertNode(child)); // eslint-disable-line no-use-before-define
            }
        }
        return out;
    };

    const convertJsx = (node) => {
        const flow = node.type === 'mdxJsxFlowElement';
        // Phrasing content inside a flow position has to sit in a paragraph.
        const place = (nodes) => (flow ? [paragraph(nodes)] : nodes);
        const children = () => {
            transformChildren(node);
            return node.children;
        };
        const inline = () => children().flatMap((child) => (child.type === 'paragraph' ? child.children : [child]));

        if (DROP.has(node.name)) return [];
        switch (node.name) {
            case 'Tabs':
                return convertTabs(node);
            case 'LeadText': {
                const content = stringAttribute(node, 'content');
                // The copy opens with the description, and the lead text is usually the same sentence.
                if (!content || content.trim() === (doc.description || '').trim()) return [];
                return place([text(content)]);
            }
            case 'Button': {
                const link = stringAttribute(node, 'link');
                return link ? place([{ type: 'link', url: resolveUrl(link), children: [text(stringAttribute(node, 'text') || link)] }]) : [];
            }
            case 'ButtonRow': {
                const links = ['Left', 'Right']
                    .map((side) => [stringAttribute(node, `link${side}`), stringAttribute(node, `text${side}`)])
                    .filter(([link]) => link)
                    .flatMap(([link, label], idx) => [
                        ...(idx ? [text(' | ')] : []),
                        { type: 'link', url: resolveUrl(link), children: [text(label || link)] },
                    ]);
                return links.length ? place(links) : [];
            }
            case 'Image':
            case 'img': {
                const url = imageSource(node);
                return url ? place([{ type: 'image', url, alt: stringAttribute(node, 'alt') || '' }]) : [];
            }
            case 'YouTube': {
                const id = stringAttribute(node, 'videoId');
                const title = stringAttribute(node, 'title') || 'YouTube video';
                return id ? place([text('Video: '), { type: 'link', url: `https://www.youtube.com/watch?v=${id}`, children: [text(title)] }]) : [];
            }
            case 'Email': {
                // Same as the HTML before hydration: no harvestable address.
                const content = inline();
                if (content.length) return place(content);
                const user = stringAttribute(node, 'user');
                return user ? place([text(`${user} [at] ${stringAttribute(node, 'domain') || 'mateuszdabrowski.pl'}`)]) : [];
            }
            case 'Link':
            case 'a': {
                const href = stringAttribute(node, 'to') || stringAttribute(node, 'href');
                const content = inline();
                return href ? place([{ type: 'link', url: resolveUrl(href), children: content }]) : place(content);
            }
            case 'br':
                return flow ? [] : [{ type: 'break' }];
            case 'strong':
            case 'b':
                return place([strong(inline())]);
            case 'em':
            case 'i':
                return place([{ type: 'emphasis', children: inline() }]);
            case 'code':
                return place([{ type: 'inlineCode', value: ctx.toString(node) }]);
            default:
                return children();
        }
    };

    const convertNode = (node) => {
        switch (node.type) {
            case 'yaml':
            case 'toml':
            case 'mdxjsEsm':
            case 'mdxFlowExpression':
            case 'mdxTextExpression':
                return [];
            case 'mdxJsxFlowElement':
            case 'mdxJsxTextElement':
                return convertJsx(node);
            case 'containerDirective':
                if (ADMONITIONS.includes(node.name)) {
                    transformChildren(node);
                    const [first, ...rest] = node.children;
                    const hasLabel = first?.type === 'paragraph' && first.data?.directiveLabel;
                    const name = node.name.charAt(0).toUpperCase() + node.name.slice(1);
                    const heading = hasLabel ? [text(`${name}: `), ...first.children] : [text(name)];
                    return [{ type: 'blockquote', children: [paragraph([strong(heading)]), ...(hasLabel ? rest : node.children)] }];
                }
                break;
            case 'heading': {
                const last = node.children[node.children.length - 1];
                if (last?.type === 'text') last.value = last.value.replace(/\s*\{#[^}]*\}\s*$/, '');
                break;
            }
            case 'link':
            case 'image':
            case 'definition':
                node.url = resolveUrl(node.url);
                break;
            default:
                break;
        }
        if (node.children) transformChildren(node);
        return [node];
    };

    transformChildren = (parent) => {
        parent.children = parent.children.flatMap(convertNode);
    };

    const tree = ctx.parser.parse(source);
    // :product[...] markers become the current name, with "(formerly ...)" on first mention.
    transformProductNames(tree, { mode: 'text' });
    for (const node of tree.children) {
        if (node.type === 'mdxjsEsm') {
            for (const [, name, from] of node.value.matchAll(/import\s+(\w+)\s+from\s+['"]([^'"]+)['"]/g)) {
                if (/\.(png|jpe?g|webp|gif|svg)$/i.test(from)) imports[name] = assetUrl(from);
            }
        }
    }
    transformChildren(tree);
    const body = String(ctx.stringifier.stringify(tree)).replace(/\n{3,}/g, '\n\n').trim();

    const updated = doc.lastUpdatedAt ? new Date(doc.lastUpdatedAt).toISOString().slice(0, 10) : null;
    const header = [
        `# ${doc.title}`,
        doc.description ? `> ${doc.description}` : null,
        [
            `Source: ${pageUrl}`,
            'Author: Mateusz Dąbrowski',
            updated ? `Last updated: ${updated}` : null,
            'Licence: CC BY-NC-SA 4.0 (https://creativecommons.org/licenses/by-nc-sa/4.0/)',
        ].filter(Boolean).join('  \n'),
    ].filter(Boolean).join('\n\n');
    return `${header}\n\n${body}\n`;
}

/**
 * Groups docs by their sidebar category, in sidebar order. A doc listed twice
 * (its cloud folder and the Webinars or Ideas index) stays in the first group.
 */
function groupBySidebar(docs) {
    const byId = new Map(docs.map((doc) => [`${doc.pluginId}:${doc.id}`, doc]));
    const placed = new Set();
    const sections = [];
    // Pre-order: a category's section is pushed before its subcategories'.
    const walk = (items, trail, pluginId, linkedDocId) => {
        const section = { title: trail.join(' > ') || 'Docs', entries: [] };
        sections.push(section);
        const add = (id) => {
            const doc = byId.get(`${pluginId}:${id}`);
            if (doc && !placed.has(doc)) {
                placed.add(doc);
                section.entries.push(doc);
            }
        };
        if (linkedDocId) add(linkedDocId);
        for (const item of items) {
            if (item.type === 'category') {
                walk(item.items, [...trail, item.label], pluginId, item.link?.type === 'doc' ? item.link.id : undefined);
            } else if (item.type === 'doc' || item.type === 'ref') {
                add(item.id);
            }
        }
    };
    const versions = new Set(docs.map((doc) => doc.version));
    for (const version of versions) {
        const pluginId = docs.find((doc) => doc.version === version).pluginId;
        for (const sidebar of Object.values(version.sidebars || {})) walk(sidebar, [], pluginId);
    }
    return {
        sections: sections.filter((section) => section.entries.length),
        unplaced: docs.filter((doc) => !placed.has(doc)),
    };
}

module.exports = function llmsTxtPlugin(context, options) {
    const {
        title = context.siteConfig.title,
        summary = '',
        details = '',
        htmlOnly = [],
        optional = [],
        links = [],
    } = options;
    const siteUrl = context.siteConfig.url.replace(/\/+$/, '');

    return {
        name: PLUGIN_NAME,

        // The DocItem footer reads this to add <link rel="alternate"> only where a copy exists.
        async contentLoaded({ actions }) {
            actions.setGlobalData({ htmlOnly });
        },

        async postBuild({ outDir, plugins }) {
            const libraries = await loadLibraries();
            const docs = collectDocs(plugins);
            const sourceToPermalink = new Map(docs.map((doc) => [
                path.join(context.siteDir, doc.source.replace(/^@site\//, '')),
                doc.permalink,
            ]));
            const ctx = { siteDir: context.siteDir, siteUrl, sourceToPermalink, ...libraries };

            const htmlOnlyPaths = htmlOnly.map(pagePath);
            const withCopy = docs.filter((doc) => !htmlOnlyPaths.includes(pagePath(doc.permalink)));
            const copies = new Map();
            await Promise.all(withCopy.map(async (doc) => {
                const markdown = await convertDoc(doc, ctx);
                copies.set(doc, markdown);
                const file = path.join(outDir, markdownPath(doc.permalink));
                await fs.mkdir(path.dirname(file), { recursive: true });
                await fs.writeFile(file, markdown);
            }));

            const entry = (doc) => {
                const url = siteUrl + (copies.has(doc) ? markdownPath(doc.permalink) : pagePath(doc.permalink));
                return `- [${doc.title}](${url})${doc.description ? `: ${doc.description}` : ''}`;
            };
            const { sections, unplaced } = groupBySidebar(docs);
            const optionalPaths = optional.map(pagePath);
            const isOptional = (doc) => optionalPaths.includes(pagePath(doc.permalink));

            const pages = plugins
                .filter((plugin) => plugin.name === PAGES_PLUGIN)
                .flatMap((plugin) => plugin.content || [])
                .filter((page) => page.type === 'mdx' && !page.unlisted && page.frontMatter?.title);
            const extra = (section) => links
                .filter((link) => link.section === section)
                .map((link) => `- [${link.title}](${link.url.startsWith('/') ? siteUrl + link.url : link.url})${link.description ? `: ${link.description}` : ''}`);

            const lines = [`# ${title}`, ''];
            if (summary) lines.push(`> ${summary}`, '');
            if (details) lines.push(details.trim(), '');
            for (const section of sections) {
                const entries = section.entries.filter((doc) => !isOptional(doc));
                if (entries.length) lines.push(`## ${section.title}`, '', ...entries.map(entry), '');
            }
            const more = unplaced.filter((doc) => !isOptional(doc));
            if (more.length) lines.push('## More', '', ...more.map(entry), '');
            const apps = [
                ...extra('Apps'),
                ...pages.map((page) => `- [${page.frontMatter.title}](${siteUrl}${pagePath(page.permalink)})${page.frontMatter.description ? `: ${page.frontMatter.description}` : ''}`),
            ];
            if (apps.length) lines.push('## Apps', '', ...apps, '');
            const optionalDocs = docs.filter(isOptional);
            if (optionalDocs.length) lines.push('## Optional', '', ...optionalDocs.map(entry), '');
            await fs.writeFile(path.join(outDir, 'llms.txt'), lines.join('\n'));

            // Everything with a copy, in llms.txt order.
            const ordered = [...sections.flatMap((section) => section.entries), ...unplaced].filter((doc) => copies.has(doc) && !isOptional(doc));
            await fs.writeFile(
                path.join(outDir, 'llms-full.txt'),
                `${ordered.map((doc) => copies.get(doc).trim()).join('\n\n---\n\n')}\n`,
            );
        },
    };
};

