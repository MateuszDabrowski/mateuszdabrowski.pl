/**
 * Turns the client redirects in docusaurus.config.js into a Cloudflare Bulk
 * Redirects list, so old URLs answer with a real 301. GitHub Pages cannot send
 * a 301, so without the list an old URL returns 200 and a meta refresh page.
 *
 *   npm run redirects-csv                  write cloudflare-redirects.csv
 *   npm run redirects-csv -- --check       ask the live site for every old URL
 *
 * Import: Cloudflare dashboard > Manage Account > Configurations > Lists, a
 * list of type Redirect, then Import CSV. A Bulk Redirect Rule turns the list
 * on. After changing the redirects in the config, run this again and re-import.
 * The meta refresh pages stay in the build as a fallback.
 *
 * Rules:
 * - Every old path is listed with and without its trailing slash. Cloudflare
 *   does not document how it treats the slash, and GitHub Pages would
 *   otherwise add it with its own 301 first, making two hops.
 * - Sources have no scheme, so the redirect applies to http and https.
 * - A target that is itself an old path is followed to its final page.
 * - Local targets are checked against build/ when it exists: each must be a
 *   real page, not a missing path or another redirect page.
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const siteDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
const config = require(path.join(siteDir, 'docusaurus.config.js'));
const check = process.argv.includes('--check');
const outFile = path.join(siteDir, 'cloudflare-redirects.csv');

const plugin = config.plugins.find((p) => Array.isArray(p) && p[0] === '@docusaurus/plugin-client-redirects');
const { host } = new URL(config.url);
const withSlash = (p) => (p.endsWith('/') ? p : `${p}/`);
const isExternal = (to) => /^https?:\/\//.test(to);

// Old path (with slash) -> target as written in the config
const targets = new Map();
for (const { from, to } of plugin[1].redirects) {
    for (const source of [].concat(from)) targets.set(withSlash(source), isExternal(to) ? to : withSlash(to));
}

const problems = [];
function finalTarget(source) {
    const seen = [source];
    let to = targets.get(source);
    while (targets.has(to)) {
        if (seen.includes(to)) {
            problems.push(`loop: ${seen.join(' > ')}`);
            break;
        }
        seen.push(to);
        to = targets.get(to);
    }
    if (isExternal(to)) return to;
    const page = path.join(siteDir, 'build', to, 'index.html');
    if (fs.existsSync(path.join(siteDir, 'build'))) {
        if (!fs.existsSync(page)) problems.push(`missing page: ${source} > ${to}`);
        else if (/http-equiv="refresh"/.test(fs.readFileSync(page, 'utf8'))) problems.push(`target is a redirect: ${source} > ${to}`);
    }
    return `${config.url}${to}`;
}

const rows = [];
for (const source of [...targets.keys()].sort()) {
    const target = finalTarget(source);
    for (const variant of [source, source.replace(/\/$/, '')]) rows.push({ source: `${host}${variant}`, target });
}

if (problems.length) {
    console.error(problems.join('\n'));
    process.exit(1);
}

if (check) {
    let wrong = 0;
    for (const { source, target } of rows) {
        const res = await fetch(`https://${source}`, { redirect: 'manual' });
        const location = res.headers.get('location');
        if (res.status !== 301 || location !== target) {
            wrong++;
            console.log(`${res.status} ${source} > ${location || '(no location)'}`);
        }
    }
    console.log(`${rows.length - wrong} of ${rows.length} old URLs answer 301 to the right page.`);
} else {
    // Columns: source, target, status, preserve query string, include subdomains,
    // subpath matching, preserve path suffix. Cloudflare rejects a header row.
    fs.writeFileSync(outFile, rows.map(({ source, target }) => `${source},${target},301,TRUE,FALSE,FALSE,FALSE`).join('\n') + '\n');
    console.log(`${rows.length} redirects (${targets.size} old paths, with and without the slash) written to ${path.relative(siteDir, outFile)}`);
}
