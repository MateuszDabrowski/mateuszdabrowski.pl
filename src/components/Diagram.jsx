/**
 * Diagram.jsx
 *
 * A Diagramforce diagram as a light and a dark WebP that follow the site theme,
 * as a figure with its caption. The image sits centred on a panel in the
 * diagram's own canvas colour that fills the column, so a narrow diagram takes
 * the same width as a wide one and the caption row always ends at the same
 * edge. The caption row ends with an "Open in Diagramforce" button, which opens
 * the diagram there as an editable copy in the reader's own browser, so they
 * can click a step for its details or adapt the flow. The button sits beside
 * the caption rather than over the image, so it never covers a step, and on a
 * narrow screen it drops under the caption. A diagram without a link in
 * src/data/diagramforceLinks.js shows the caption alone.
 *
 * Props:
 *   name      - image name in static/img/article/, without -light.webp or -dark.webp,
 *               and the key of its link in src/data/diagramforceLinks.js
 *   alt       - what the diagram shows
 *   width     - the diagram's width in px, as drawn at 1x
 *   height    - the diagram's height in px, as drawn at 1x
 *   caption   - the caption under the diagram, such as "Diagram: ..."
 *   aside     - something to show on the panel, right of the diagram, such as a map
 *               of the whole flow (see DiagramWithMap.jsx)
 */
import React from 'react';
import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';
import diagramforceLinks from '../data/diagramforceLinks';
import styles from './Diagram.module.css';

export const themed = (base) => ({ light: `${base}-light.webp`, dark: `${base}-dark.webp` });

export default function Diagram({ name, alt, width, height, caption, aside }) {
  const base = useBaseUrl(`/img/article/${name}`);
  const link = diagramforceLinks[name];
  return (
    <figure className={styles.figure}>
      <div className={styles.canvas}>
        <div className={styles.image}>
          <ThemedImage alt={alt} width={width} height={height} sources={themed(base)} />
        </div>
        {aside}
      </div>
      {(caption || link) && (
        <figcaption className={styles.footer}>
          {caption && <span className={styles.caption}>{caption}</span>}
          {link && (
            <a
              className={styles.open}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open this diagram in Diagramforce as an editable copy, in a new tab"
            >
              Open in Diagramforce
            </a>
          )}
        </figcaption>
      )}
    </figure>
  );
}
