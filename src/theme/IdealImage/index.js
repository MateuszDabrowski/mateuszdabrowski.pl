/**
 * Replaces the plugin-ideal-image component with a plain responsive <img>.
 *
 * The plugin still resizes each image and encodes it as WebP
 * (plugins/ideal-image-webp-adapter.js). Its original component cannot show a
 * WebP-only set: it keeps WebP for browsers it has tested and needs a PNG for
 * the server render, so the build failed. A native <img> with srcset, lazy
 * loading and fixed dimensions covers what it did without the JavaScript, and
 * the static HTML now carries the real image and alt text for readers that
 * never run scripts.
 */
import React from 'react';

export default function IdealImage({ img, alt, style, ...rest }) {
    const imgStyle = { width: '100%', height: 'auto', ...style };
    // Dev server (disableInDev): the import is the original file URL.
    if (typeof img === 'string' || 'default' in img) {
        const src = typeof img === 'string' ? img : img.default;
        return <img src={src} alt={alt} loading="lazy" decoding="async" style={imgStyle} {...rest} />;
    }
    const largest = img.src.images.reduce((a, b) => (b.width > a.width ? b : a));
    return (
        <img
            src={largest.path}
            srcSet={img.src.srcSet}
            sizes="(max-width: 996px) 100vw, 800px"
            width={largest.width}
            height={largest.height}
            alt={alt}
            loading="lazy"
            decoding="async"
            style={imgStyle}
            {...rest}
        />
    );
}
