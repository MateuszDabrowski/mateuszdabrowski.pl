/**
 * ResponsiveImage.jsx
 *
 * An <img> for a screenshot in static/, served from the AVIF and WebP copies
 * that plugins/image-variants writes. The browser picks the format it
 * supports and the smallest width that fills the space given in `sizes`. An
 * image the plugin has not processed (outside its `include` paths, or added
 * after `npm start`) falls back to a plain <img> of the source file.
 *
 * Props:
 *   src         - path of the source in static/, such as /img/apple/strum/A.webp
 *   fallbackSrc - URL for the plain <img> fallback (default: src), for a
 *                 cache-busting query string
 *   sizes       - the sizes attribute: how wide the image shows
 *   dimensions  - set width and height from the source, so the page keeps the
 *                 image's space before it loads (default: true). Turn it off
 *                 when CSS caps the height, or the image would stretch.
 *   any other prop goes to the <img>: alt, style, className, loading, role...
 */
import React from 'react';
import { usePluginData } from '@docusaurus/useGlobalData';

const toSrcSet = (list) => list.map(([url, width]) => `${url} ${width}w`).join(', ');

export function useImageVariants(src) {
  const { images = {} } = usePluginData('image-variants') ?? {};
  return images[`/${src.replace(/^\//, '').split('?')[0]}`];
}

export default function ResponsiveImage({ src, fallbackSrc, sizes = '100vw', dimensions = true, loading = 'lazy', ...imgProps }) {
  const entry = useImageVariants(src);
  if (!entry) {
    return <img src={fallbackSrc ?? src} loading={loading} decoding="async" {...imgProps} />;
  }
  // The plain src (for anything that ignores srcset) is the copy nearest 960 px.
  const fallback = entry.webp.find(([, width]) => width >= 960) ?? entry.webp[entry.webp.length - 1];
  return (
    // display: contents keeps the <img> the layout box, as if <picture> were not there.
    <picture style={{ display: 'contents' }}>
      <source type="image/avif" srcSet={toSrcSet(entry.avif)} sizes={sizes} />
      <img
        src={fallback[0]}
        srcSet={toSrcSet(entry.webp)}
        sizes={sizes}
        width={dimensions ? entry.width : undefined}
        height={dimensions ? entry.height : undefined}
        loading={loading}
        decoding="async"
        {...imgProps}
      />
    </picture>
  );
}
