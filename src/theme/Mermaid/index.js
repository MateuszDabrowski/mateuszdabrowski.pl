/**
 * Reserves the space of each Mermaid diagram before it renders.
 *
 * Mermaid draws in the browser only, after the page has loaded, so every
 * diagram used to push the content below it down: the layout shift (CLS)
 * Cloudflare reported on Business Units and Catalog Architecture in
 * October 2026. The frame takes each diagram's natural width and aspect ratio
 * from src/data/mermaidSizes.json, keyed by a hash of the diagram's source.
 * A new or edited diagram has no entry yet and renders as before, without a
 * reserved box. To add it, open the page on the dev server and copy the
 * width and height of the svg viewBox under the frame's data-mermaid key.
 */
import React from 'react';
import Mermaid from '@theme-original/Mermaid';
import sizes from '@site/src/data/mermaidSizes.json';

/** A short, stable key for a diagram's source text (djb2). */
function diagramKey(text) {
  let hash = 5381;
  for (let i = 0; i < text.length; i += 1) hash = ((hash << 5) + hash + text.charCodeAt(i)) | 0;
  return (hash >>> 0).toString(36);
}

export default function MermaidWrapper(props) {
  const key = diagramKey(props.value ?? '');
  const size = sizes[key];
  return (
    <div
      className="mermaid-frame"
      data-mermaid={key}
      style={size ? { maxWidth: `${size.width}px`, aspectRatio: `${size.width} / ${size.height}` } : undefined}>
      <Mermaid {...props} />
    </div>
  );
}
