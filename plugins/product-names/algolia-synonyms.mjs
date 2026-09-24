/**
 * Turns src/data/productNames.json into Algolia synonyms, so a search for an
 * old product name finds pages that now show the current one ("Interaction
 * Studio" finds Marketing Cloud Personalization pages).
 *
 *   npm run algolia-synonyms      write algolia-synonyms.json
 *
 * Import: Algolia dashboard > Search > index "mateuszdabrowski" > Configuration
 * > Synonyms > the arrow next to Add Synonyms > Upload. Object IDs are stable,
 * so a new upload updates the same entries. Run it again after changing the
 * data file.
 *
 * Rules:
 * - One two-way synonym set per product: its names, aliases and abbreviations.
 * - Abbreviations shorter than 3 letters are left out ("IS", "MI", "SP"): as
 *   search words they match too much. mark.mjs uses the same limit.
 * - Ambiguous names and names shared by two products are left out: the site
 *   uses them for the family or for a feature brand ("Einstein").
 * - ONE_WAY lists the ambiguous names that still mean one product when
 *   someone types them into search. They widen that search to the product's
 *   current name, and not the other way round.
 * - The family entry (Salesforce Marketing) is left out: it is an umbrella.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const siteDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const data = JSON.parse(fs.readFileSync(path.join(siteDir, 'src/data/productNames.json'), 'utf8'));
const outFile = path.join(siteDir, 'algolia-synonyms.json');

const ONE_WAY = {
    SFMC: 'mce',
    'Salesforce Marketing Cloud': 'mce',
    'Agentforce Marketing': 'mcn',
};

const terms = (product) =>
    [...product.names.flatMap((n) => [n.name, n.short]), ...(product.aliases || []), product.popular].filter(
        (term) => term && term.length >= 3,
    );

// Terms used by more than one product
const owners = new Map();
for (const product of data.products) {
    for (const term of new Set(terms(product))) owners.set(term, (owners.get(term) || 0) + 1);
}

const synonyms = [];
for (const product of data.products) {
    if (product.includes) continue;
    const set = [...new Set(terms(product))].filter(
        (term) => !(product.ambiguous || []).includes(term) && owners.get(term) === 1,
    );
    if (set.length > 1) synonyms.push({ objectID: `product-${product.id}`, type: 'synonym', synonyms: set });
}

for (const [input, id] of Object.entries(ONE_WAY)) {
    const product = data.products.find((p) => p.id === id);
    const current = product.names.at(-1);
    const target = product.display || current.name;
    const abbreviation = product.names.find((n) => n.name === target)?.short;
    synonyms.push({
        objectID: `one-way-${input.toLowerCase().replace(/\s+/g, '-')}`,
        type: 'oneWaySynonym',
        input,
        synonyms: [target, abbreviation].filter(Boolean),
    });
}

fs.writeFileSync(outFile, `[\n${synonyms.map((s) => JSON.stringify(s)).join(',\n')}\n]\n`);
console.log(`${synonyms.length} synonym entries written to ${path.relative(siteDir, outFile)}`);
