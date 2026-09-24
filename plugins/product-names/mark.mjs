/**
 * Marks current Salesforce product names in the docs with :product[...]
 * (rendering: ./index.js, data: src/data/productNames.json).
 *
 *   npm run mark-products                    dry run over docs/ and sites/faq/
 *   npm run mark-products -- --apply         write the changes
 *   npm run mark-products -- docs/a.mdx      only the listed files
 *
 * Rules, learned while marking the site in September 2026:
 * - Current names and abbreviations (3+ letters) get a plain marker, which
 *   renders the display name. Old names get :product[...]{as-written}: the
 *   tooltip without renaming, because they are usually history or Salesforce
 *   labels that kept the old name ("Data Cloud Architect"). A current name in
 *   a rename sentence ("renamed X", "became X") also stays as written.
 * - Names listed as "ambiguous" in the data file, and names more than one
 *   product uses, are never marked here: the site also uses them for the
 *   product family or a feature brand. Mark those by hand, with {of=<id>}.
 * - Headings, code, link URLs, front matter, component attributes, "Name
 *   history" lines and in-page outline links (they mirror headings) are skipped.
 * - Phrases listed in keepAsWritten (talk titles, licence tiers, menu paths)
 *   are skipped.
 * - A hand-written "(MCE)" or "(formerly X)" after a name is dropped, because
 *   the first marker prints its own.
 * - The first marker of a product gets {bare} when it sits inside brackets or
 *   before "'s", so its bracket moves to the next mention.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkMdx from 'remark-mdx';
import remarkGfm from 'remark-gfm';
import remarkDirective from 'remark-directive';
import remarkFrontmatter from 'remark-frontmatter';
import remarkComment from '@slorber/remark-comment';

const siteDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const args = process.argv.slice(2);
const apply = args.includes('--apply');
const { products, keepAsWritten = [] } = JSON.parse(fs.readFileSync(path.join(siteDir, 'src/data/productNames.json'), 'utf8'));
const parser = unified().use(remarkParse).use(remarkMdx).use(remarkGfm).use(remarkDirective).use(remarkFrontmatter).use(remarkComment);

const productOf = new Map();
const current = new Set();
const forms = [];
for (const product of products) {
    const display = product.names.find((n) => n.name === (product.display || product.names[product.names.length - 1].name));
    const ambiguous = new Set(product.ambiguous || []);
    for (const n of product.names) {
        for (const form of [n.name, n.short]) {
            if (form && form.length >= 3 && !ambiguous.has(form)) forms.push(form);
        }
    }
    for (const alias of product.aliases || []) if (!ambiguous.has(alias)) forms.push(alias);
    current.add(display.name);
    if (display.short) current.add(display.short);
    for (const key of [product.id, ...product.names.flatMap((n) => [n.name, n.short]), ...(product.aliases || [])].filter(Boolean)) {
        const k = key.toLowerCase();
        // A name more than one product uses is never marked automatically: it needs {of=<id>} by hand.
        productOf.set(k, productOf.has(k) && productOf.get(k) !== product.id ? null : product.id);
    }
}
// Names that are never marked still take part in matching, so "Salesforce Marketing Cloud"
// is consumed whole and its "Salesforce Marketing" part cannot be marked on its own.
const blocked = new Set([
    ...products.flatMap((product) => product.ambiguous || []),
    ...forms.filter((form) => !productOf.get(form.toLowerCase())),
]);
forms.splice(0, forms.length, ...new Set([...forms.filter((form) => productOf.get(form.toLowerCase())), ...blocked]));
forms.sort((a, b) => b.length - a.length);
const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const NAME = new RegExp(`(?<![\\w:\\-.@])(${forms.map(escape).join('|')})(?![\\w\\-])`, 'g');
const RENAME_BEFORE = /(renamed|rebranded|became|announced as)\s+(to\s+|as\s+)?(the\s+)?$/i;
const LEAD = /^(formerly known as|formerly called|formerly|previously known as|previously called|previously|also known as|aka)\s+/i;
const SKIP = new Set(['heading', 'yaml', 'code', 'inlineCode', 'mdxjsEsm', 'mdxFlowExpression', 'mdxTextExpression', 'textDirective', 'leafDirective', 'image', 'imageReference', 'definition', 'html']);
const MARKER = /:product\[([^\]]+)\](\{[^}]*\})?/g;

/** "(MCE)" or "(formerly known as AppExchange)" naming only the same product. */
function redundantBracket(after, id) {
    const m = /^\s?\(([^()]{1,80})\)/.exec(after);
    if (!m) return null;
    const parts = m[1].split(/,\s*/).map((part) => part.trim().replace(LEAD, ''));
    return parts.every((part) => productOf.get(part.toLowerCase()) === id) ? m[0] : null;
}

function markNames(source) {
    const tree = parser.parse(source);
    const kept = keepAsWritten.flatMap((phrase) => {
        const ranges = [];
        for (let i = source.indexOf(phrase); i !== -1; i = source.indexOf(phrase, i + 1)) ranges.push([i, i + phrase.length]);
        return ranges;
    });
    const edits = [];
    const walk = (node) => {
        if (SKIP.has(node.type)) return;
        if (node.type === 'link' && node.url.startsWith('#')) return;
        if (node.type === 'paragraph' && /^Name history/i.test(node.children?.[0]?.children?.[0]?.value || '')) return;
        if (node.type === 'text' && node.position) {
            const start = node.position.start.offset;
            const end = node.position.end.offset;
            let consumedTo = -1;
            for (const match of source.slice(start, end).matchAll(NAME)) {
                const from = start + match.index;
                if (from < consumedTo) continue;
                if (kept.some(([a, b]) => from >= a && from < b)) continue;
                const id = productOf.get(match[1].toLowerCase());
                let to = from + match[1].length;
                if (blocked.has(match[1])) {
                    consumedTo = to;
                    continue;
                }
                const asWritten = !current.has(match[1]) || RENAME_BEFORE.test(source.slice(Math.max(0, from - 40), from));
                if (asWritten) {
                    consumedTo = to;
                    edits.push({ from, to, text: `:product[${match[1]}]{as-written}` });
                    continue;
                }
                const bracket = redundantBracket(source.slice(to, to + 90), id);
                if (bracket && to + bracket.length <= end) to += bracket.length;
                consumedTo = to;
                edits.push({ from, to, text: `:product[${match[1]}]` });
            }
        }
        for (const child of node.children || []) walk(child);
    };
    walk(tree);
    let out = source;
    for (const edit of edits.sort((a, b) => b.from - a.from)) out = out.slice(0, edit.from) + edit.text + out.slice(edit.to);
    return { out, count: edits.length };
}

/** Adds {bare} to first markers inside brackets or before "'s", until none is left. */
function bareAwkwardFirsts(source) {
    let text = source;
    let added = 0;
    for (;;) {
        const seen = new Set();
        let inCode = false;
        let offset = 0;
        let insertAt = -1;
        for (const line of text.split('\n')) {
            if (line.trimStart().startsWith('```')) inCode = !inCode;
            if (!inCode && !line.trimStart().startsWith('#')) {
                for (const m of line.matchAll(MARKER)) {
                    const id = /\bof=([\w-]+)/.exec(m[2] || '')?.[1] || productOf.get(m[1].trim().toLowerCase());
                    if (!id || /\b(bare|as-written)\b/.test(m[2] || '') || seen.has(id)) continue;
                    seen.add(id);
                    const before = line.slice(0, m.index).replace(/\]\([^)]*\)/g, '').replace(MARKER, '$1');
                    const open = (before.match(/\(/g) || []).length - (before.match(/\)/g) || []).length;
                    const after = line.slice(m.index + m[0].length);
                    if (open > 0 || /^['’]s\b/.test(after)) {
                        insertAt = offset + m.index + m[0].length;
                        break;
                    }
                }
            }
            if (insertAt !== -1) break;
            offset += line.length + 1;
        }
        if (insertAt === -1) return { out: text, added };
        text = `${text.slice(0, insertAt)}{bare}${text.slice(insertAt)}`;
        added += 1;
    }
}

const listed = args.filter((arg) => !arg.startsWith('--'));
const files = listed.length ? listed : [
    ...fs.readdirSync(path.join(siteDir, 'docs'), { recursive: true }).filter((f) => f.endsWith('.mdx')).map((f) => path.join('docs', f)),
    ...fs.readdirSync(path.join(siteDir, 'sites/faq'), { recursive: true }).filter((f) => f.endsWith('.mdx')).map((f) => path.join('sites/faq', f)),
].sort();

let total = 0;
for (const rel of files) {
    const file = path.resolve(siteDir, rel);
    const source = fs.readFileSync(file, 'utf8');
    let marked;
    try {
        marked = markNames(source);
    } catch (error) {
        console.log(`skipped, does not parse: ${rel} (${error.message})`);
        continue;
    }
    const { out, added } = bareAwkwardFirsts(marked.out);
    if (!marked.count && !added) continue;
    parser.parse(out); // throws rather than write a file the build cannot read
    total += marked.count;
    console.log(`${String(marked.count).padStart(4)} new markers, ${added} {bare}  ${path.relative(siteDir, file)}`);
    if (apply) fs.writeFileSync(file, out);
}
console.log(`${apply ? 'Written' : 'Dry run, nothing written'}: ${total} new markers.${apply || !total ? '' : ' Add --apply to write them.'}`);
