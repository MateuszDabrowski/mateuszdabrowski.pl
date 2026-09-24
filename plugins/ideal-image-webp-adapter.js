/**
 * Sharp adapter for @docusaurus/plugin-ideal-image that encodes every resized
 * image as WebP.
 *
 * The stock adapter only applies `quality` to JPEG and returns PNG bytes for
 * anything else, even with `format: 'webp'` set (the file gets a .webp name
 * but stays a PNG). The article images are PNG screenshots and diagrams, so
 * the stock adapter shipped them at full PNG weight: the 1030 px SQL JOIN
 * cheat sheet came out larger than its source.
 *
 * Same interface as @docusaurus/responsive-loader/sharp.
 */
const sharp = require('sharp');

module.exports = (imagePath) => {
    const image = sharp(imagePath);
    return {
        metadata: () => image.metadata(),
        resize: ({ width, options }) => new Promise((resolve, reject) => {
            let resized = image.clone().resize(width, null);
            if (options.background) {
                resized = resized.flatten({ background: options.background });
            }
            resized
                .webp({ quality: options.quality, effort: 6 })
                .toBuffer((err, data, { height }) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({ data, width, height });
                    }
                });
        }),
    };
};
