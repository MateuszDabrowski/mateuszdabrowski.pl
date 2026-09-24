/**
 * Salesforce product names that follow the renames.
 *
 * Write a marker in any doc: :product[Data Cloud], :product[MCE] or
 * :product[data-360]. The label can be any name, abbreviation, alias or id
 * listed in src/data/productNames.json. At build time every marker becomes
 * the product's display name (its newest name unless "display" says
 * otherwise), or its abbreviation when the label was an abbreviation.
 *
 * Every marker gets a dotted underline with the full name history on hover,
 * focus or tap, newest name first, one name per line. Only the first marker of
 * each product is in the keyboard tab order: later ones take focus on tap or
 * click, so a page that says MCE thirty times does not add thirty tab stops.
 *
 * The first marker of each product on a page also gets a bracket naming the
 * other form and the name readers still search for:
 * "Marketing Cloud Engagement (MCE, formerly Salesforce Marketing Cloud)" or
 * "MCE (Marketing Cloud Engagement, formerly Salesforce Marketing Cloud)".
 * That puts the old name in the visible text for search engines, on-site
 * search and agents. Write the marker without your own "(MCE)" after it.
 * Where a bracket would read badly (before "'s", inside a compound noun),
 * write :product[Data 360]{bare} and the next marker carries it instead.
 *
 * A name several products share ("Salesforce Marketing Cloud": MCE's old name,
 * the product family's old name) needs the product spelled out:
 * :product[Salesforce Marketing Cloud]{of=mce}. Without it the build warns and
 * prints the name as written.
 *
 * :product[AppExchange]{as-written} keeps the name exactly as written, with
 * the underline and tooltip but no renaming and no bracket. It is for old
 * names in history ("announced as Einstein Personalization") and Salesforce
 * labels that kept an old name ("Data Cloud Architect").
 *
 * Plain text is never touched: history ("rebranded from Data Cloud") and
 * Salesforce labels that kept an old name ("Data Cloud Architect") stay as
 * written. In headings a marker becomes plain text, but a rename there still
 * changes the heading's anchor, so avoid markers in headings.
 *
 * `npm run mark-products` (./mark.mjs) adds markers to existing text.
 *
 * Runs before Docusaurus's own remark plugins, so headings and the table of
 * contents see the resolved name. llms-txt and structured-data reuse the
 * same functions for the markdown copies and the schema.org markup.
 */
const logger = require('@docusaurus/logger').default;
const { products } = require('../../src/data/productNames.json');

const MARKER = 'product';

function prepare(product) {
    const display = product.names.find((n) => n.name === (product.display || product.names[product.names.length - 1].name));
    if (!display) throw new Error(`[product-names] ${product.id}: display "${product.display}" is not one of its names.`);
    if (product.popular && !product.names.some((n) => n.name === product.popular)) {
        throw new Error(`[product-names] ${product.id}: popular "${product.popular}" is not one of its names.`);
    }
    // Newest first, one name per line: "» Data 360 - 2025", then "› Data Cloud - 2023".
    const line = (n) => `${n.name}${n.short ? ` (${n.short})` : ''}${n.from ? ` - ${n.from.slice(0, 4)}` : ''}`;
    const history = [...product.names].reverse().map((n, i) => `${i === 0 ? '»' : '›'} ${line(n)}`).join('\n');
    return {
        ...product,
        display,
        shorts: new Set(product.names.map((n) => n.short).filter(Boolean).map((s) => s.toLowerCase())),
        history,
        alternateNames: product.names.map((n) => n.name).filter((name) => name !== display.name),
    };
}

/** Every id, name, abbreviation and alias, lower-cased, to the products using it. */
const byId = new Map();
const index = new Map();
const prepared = products.map(prepare);
for (const product of prepared) byId.set(product.id, product);
// A product family lists what it contains instead of a name history, so it reads as
// a family and not as one more product: "Salesforce Marketing ecosystem includes:",
// then each group's main product with its sub-products indented under it.
for (const family of prepared.filter((product) => product.includes)) {
    const lines = family.includes.flatMap((group) => (Array.isArray(group) ? group : [group]).map((id, position) => {
        const member = byId.get(id);
        if (!member) throw new Error(`[product-names] ${family.id}: includes unknown product "${id}".`);
        const indent = position === 0 ? '' : '  ';
        return `${indent}› ${member.display.name}${member.display.short ? ` (${member.display.short})` : ''}`;
    }));
    family.history = [`${family.display.name} ecosystem includes:`, ...lines].join('\n');
}
for (const product of prepared) {
    const keys = [product.id, ...product.names.flatMap((n) => [n.name, n.short]), ...(product.aliases || [])].filter(Boolean);
    for (const key of new Set(keys.map((k) => k.toLowerCase()))) {
        index.set(key, [...(index.get(key) || []), product]);
    }
}

/**
 * The product a marker means: its of= id, or the only product using the label.
 * Returns { product } or { candidates } when the label is shared or unknown.
 */
function resolve(label, of) {
    if (of) return { product: byId.get(of), candidates: [] };
    const found = index.get(label.trim().toLowerCase()) || [];
    return found.length === 1 ? { product: found[0], candidates: found } : { product: undefined, candidates: found };
}

const labelOf = (node) => (node.children || []).map((child) => child.value ?? labelOf(child)).join('');

/**
 * Replaces :product[...] markers in an mdast tree.
 *
 * @param {object} tree - mdast root.
 * @param {object} options - mode 'html' (dotted span for the site) or 'text'
 *   (plain words for the markdown copies), and onUnknown(label, node).
 */
function transformProductNames(tree, { mode = 'html', onUnknown = () => {} } = {}) {
    const introduced = new Set();
    const tabbable = new Set();
    const render = (node, inHeading, inLink) => {
        const label = labelOf(node);
        const { product, candidates } = resolve(label, node.attributes?.of);
        if (!product) {
            onUnknown(label, candidates.map((c) => c.id), node.attributes?.of);
            return [{ type: 'text', value: label }];
        }
        const tooltip = (text, tabIndex) => ({
            type: 'mdxJsxTextElement',
            name: 'span',
            attributes: [
                { type: 'mdxJsxAttribute', name: 'className', value: 'product-name' },
                // Inside a link the link takes focus. Elsewhere the first mention joins the tab
                // order and later ones are focusable by tap or click only (-1).
                ...(inLink ? [] : [{ type: 'mdxJsxAttribute', name: 'tabIndex', value: tabIndex }]),
                { type: 'mdxJsxAttribute', name: 'data-history', value: product.history },
            ],
            children: [{ type: 'text', value: text }],
        });
        if (node.attributes && 'as-written' in node.attributes) {
            const text = label.trim();
            return inHeading || mode === 'text' ? [{ type: 'text', value: text }] : [tooltip(text, '-1')];
        }
        const short = product.shorts.has(label.trim().toLowerCase()) && product.display.short;
        const name = short ? product.display.short : product.display.name;
        if (inHeading) return [{ type: 'text', value: name }];

        const bare = Boolean(node.attributes && 'bare' in node.attributes);
        const needsIntro = !bare && !introduced.has(product.id);
        const firstOnPage = !tabbable.has(product.id);
        tabbable.add(product.id);
        let intro = '';
        if (needsIntro) {
            introduced.add(product.id);
            const otherForm = short ? product.display.name : product.display.short;
            const formerly = product.popular && product.popular !== product.display.name ? `formerly ${product.popular}` : null;
            const parts = [otherForm, formerly].filter(Boolean);
            if (parts.length) intro = ` (${parts.join(', ')})`;
        }
        if (mode === 'text') return [{ type: 'text', value: name + intro }];
        const span = tooltip(name, firstOnPage ? '0' : '-1');
        return intro ? [span, { type: 'text', value: intro }] : [span];
    };
    const walk = (parent, inHeading, inLink) => {
        if (!parent.children) return;
        parent.children = parent.children.flatMap((child) => {
            if (child.type === 'textDirective' && child.name === MARKER) return render(child, inHeading, inLink);
            walk(child, inHeading || child.type === 'heading', inLink || child.type === 'link');
            return [child];
        });
    };
    walk(tree, false, false);
}

/** Remark plugin for the docs instances (beforeDefaultRemarkPlugins). */
function remarkProductNames() {
    return (tree, file) => transformProductNames(tree, {
        mode: 'html',
        onUnknown: (label, ids, of) => logger.warn(ids.length > 1
            ? `[product-names] "${label}" names several products (${ids.join(', ')}) in ${file.path}. Add {of=<id>} to the marker.`
            : `[product-names] Unknown product "${of || label}" in ${file.path}. Add it to src/data/productNames.json or fix the marker.`),
    });
}

/** Products marked anywhere in an MDX source, for schema.org "about". */
function productsInSource(source) {
    const found = new Map();
    for (const [, label, attrs = ''] of source.matchAll(/:product\[([^\]]+)\](\{[^}]*\})?/g)) {
        const { product } = resolve(label, /\bof=([\w-]+)/.exec(attrs)?.[1]);
        if (product) found.set(product.id, product);
    }
    return [...found.values()];
}

module.exports = { remarkProductNames, transformProductNames, productsInSource };
