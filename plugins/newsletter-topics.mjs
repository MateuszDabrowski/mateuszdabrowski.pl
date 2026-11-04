/**
 * Writes the topics for the newsletter page's form to
 * src/data/newsletter-topics.json, from the Topics tab Sling writes, through
 * the script's action=topicList (D653). `npm run deploy` runs this first, so
 * the form has the list in its HTML and reads nothing when the page opens. A
 * change to the list in Sling reaches the form with the next site deploy.
 *
 * A failed read keeps the last list and never stops a deploy. A stale list
 * does no harm, as the form decides only the keys it showed that are still on
 * the live tab at the confirmation click. Every other key keeps the person's
 * older state (D655).
 */
import { readFileSync, writeFileSync } from 'node:fs';

const FILE = new URL('../src/data/newsletter-topics.json', import.meta.url);
const TIMEOUT_MS = 30000; // a cold start plus the sheet takes 3 to 5 s, so this is plenty
const KEY_RE = /^[a-z_][a-z0-9_]*$/; // Sling's key shape (D629)
// Read as text, as package.json declares no module type for that file.
const [, ENDPOINT] = readFileSync(new URL('../src/data/newsletter.js', import.meta.url), 'utf8').match(/endpoint: '([^']+)'/);

async function readList() {
    const res = await fetch(ENDPOINT, {
        method: 'POST',
        body: new URLSearchParams({ action: 'topicList' }),
        signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    const data = await res.json();
    const usable = data.ok && Array.isArray(data.topics) && data.topics.every((topic) => KEY_RE.test(topic.key) && topic.label);
    if (!usable) throw new Error(`the script answered ${JSON.stringify(data).slice(0, 200)}`);
    return data.topics.map(({ key, label }) => ({ key, label }));
}

const last = readFileSync(FILE, 'utf8');
let list;
try {
    list = await readList().catch(() => readList()); // one more try: on 2026-10-25 a read failed and the next one worked
} catch (error) {
    console.warn(`[newsletter-topics] WARNING: could not read the list (${error.message}). Keeping the last one: ${JSON.parse(last).length} topics.`);
    process.exit(0);
}

const next = `${JSON.stringify(list, null, 2)}\n`;
if (next === last) {
    console.log(`[newsletter-topics] ${list.length} topics, unchanged.`);
} else {
    writeFileSync(FILE, next);
    console.log(`[newsletter-topics] ${list.length} topics written to src/data/newsletter-topics.json. Commit it.`);
}
