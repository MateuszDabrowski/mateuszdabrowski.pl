/**
 * Responsive copies of the app screenshots.
 *
 * The homepage, the Apps page and the app pages show screenshots taken at
 * device resolution (an iPad shot is 2752 px wide) in columns a few hundred
 * pixels wide. For every image under the paths in `include`, this plugin
 * writes smaller copies as AVIF and WebP at the widths in `widths`, never
 * wider than the source, and src/components/ResponsiveImage.jsx serves them
 * through srcset. The source files stay as they are.
 *
 * The copies go to `outDir` (gitignored), which docusaurus.config.js lists in
 * staticDirectories, so `npm start` and the build both serve them. Each file
 * name carries a hash of its source and the encoder settings, so:
 * - a replaced screenshot gets new URLs and no CDN serves the old picture,
 * - an unchanged screenshot is not encoded again on the next run,
 * - copies of removed or replaced screenshots are deleted.
 *
 * A new screenshot needs an `npm start` restart or a build to get its copies.
 * Until then the component shows the source file.
 */
const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');
const sharp = require('sharp');

const PLUGIN_NAME = 'image-variants';
const SOURCE_TYPES = /\.(webp|png|jpe?g)$/i;

async function exists(file) {
    try {
        await fs.access(file);
        return true;
    } catch {
        return false;
    }
}

/** Every image file under a static path, which may be a folder or one file. */
async function listImages(root) {
    const stat = await fs.stat(root).catch(() => null);
    if (!stat) return [];
    if (stat.isFile()) return SOURCE_TYPES.test(root) ? [root] : [];
    const entries = await fs.readdir(root, { withFileTypes: true });
    const nested = await Promise.all(entries.map((entry) => listImages(path.join(root, entry.name))));
    return nested.flat();
}

/** Every file under a folder, for the clean-up of stale copies. */
async function listFiles(root) {
    const entries = await fs.readdir(root, { withFileTypes: true }).catch(() => []);
    const nested = await Promise.all(entries.map((entry) => {
        const full = path.join(root, entry.name);
        return entry.isDirectory() ? listFiles(full) : [full];
    }));
    return nested.flat();
}

module.exports = function imageVariantsPlugin(context, options) {
    const {
        include = [],
        widths = [480, 960, 1440, 1920, 2560],
        outDir = '.image-variants',
        avifQuality = 55,
        webpQuality = 80,
    } = options;
    const staticDir = path.join(context.siteDir, 'static');
    const outRoot = path.join(context.siteDir, outDir);
    const variantsDir = path.join(outRoot, 'img', 'variants');
    const settings = JSON.stringify({ widths, avifQuality, webpQuality });
    const encoders = {
        avif: (image) => image.avif({ quality: avifQuality, effort: 5 }),
        webp: (image) => image.webp({ quality: webpQuality, effort: 6 }),
    };

    return {
        name: PLUGIN_NAME,

        async loadContent() {
            const sources = (await Promise.all(include.map((entry) => listImages(path.join(staticDir, entry))))).flat();
            const images = {};
            const expected = new Set();
            let written = 0;
            for (const source of sources) {
                const buffer = await fs.readFile(source);
                const { width, height } = await sharp(buffer).metadata();
                const hash = crypto.createHash('sha1').update(buffer).update(settings).digest('hex').slice(0, 10);
                // img/apple/strum/A.webp -> img/variants/apple/strum/A.<hash>.<width>.<format>
                const relative = path.relative(path.join(staticDir, 'img'), source).replace(SOURCE_TYPES, '');
                const top = Math.min(width, Math.max(...widths));
                const sizes = [...widths.filter((w) => w < top), top];
                const entry = { width, height };
                for (const format of Object.keys(encoders)) {
                    entry[format] = [];
                    for (const w of sizes) {
                        const file = path.join(variantsDir, `${relative}.${hash}.${w}.${format}`);
                        expected.add(file);
                        if (!(await exists(file))) {
                            await fs.mkdir(path.dirname(file), { recursive: true });
                            await encoders[format](sharp(buffer).resize({ width: w })).toFile(file);
                            written += 1;
                        }
                        entry[format].push([`/${path.relative(outRoot, file).split(path.sep).join('/')}`, w]);
                    }
                }
                images[`/${path.relative(staticDir, source).split(path.sep).join('/')}`] = entry;
            }
            const stale = (await listFiles(variantsDir)).filter((file) => !expected.has(file));
            await Promise.all(stale.map((file) => fs.unlink(file)));
            if (written || stale.length) {
                console.log(`[${PLUGIN_NAME}] ${sources.length} images: ${written} copies written, ${stale.length} stale copies removed.`);
            }
            return { images };
        },

        async contentLoaded({ content, actions }) {
            actions.setGlobalData(content);
        },
    };
};
