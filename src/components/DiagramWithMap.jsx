/**
 * DiagramWithMap.jsx
 *
 * A part of a large diagram with a small map of the whole diagram that frames
 * where the part sits, like the minimap in a code editor. Every image comes as
 * a light and a dark WebP, and ThemedImage shows the one that matches the site
 * theme. The part is a Diagram, with its caption and its "Open in Diagramforce"
 * button, and the map sits on the same panel, in its top-right corner. It is the
 * one way to open the whole diagram there. Every diagram the layout script draws
 * has a blank 50 px margin on its right, so the map may cover part of that
 * margin and the part gets that much more width. The map stays in view while a
 * tall part scrolls past, and narrow screens drop it, as there is no room for both.
 *
 * Props:
 *   name        - image name in static/img/article/, without -light.webp or -dark.webp
 *   alt         - what the part shows
 *   width       - the part's width in px, as drawn at 1x
 *   height      - the part's height in px, as drawn at 1x
 *   caption     - the part's caption, such as "Diagram: ..."
 *   mapName     - the map's image name, in the same folder and form
 *   mapAlt      - where the part sits in the whole diagram
 *   mapHeight   - the map's height in px at its 96 px width
 *   mapLinkName - key of the whole diagram's link in src/data/diagramforceLinks.js
 */
import React from 'react';
import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Diagram, { themed } from './Diagram';
import diagramforceLinks from '../data/diagramforceLinks';
import styles from './DiagramWithMap.module.css';

const MAP_WIDTH = 96;

export default function DiagramWithMap({ name, alt, width, height, caption, mapName, mapAlt, mapHeight, mapLinkName }) {
  const map = useBaseUrl(`/img/article/${mapName}`);
  const mapLink = diagramforceLinks[mapLinkName];
  const mapImage = <ThemedImage alt={mapAlt} width={MAP_WIDTH} height={mapHeight} sources={themed(map)} />;
  const aside = (
    <div className={styles.map}>
      {mapLink ? (
        <a
          href={mapLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open the whole flow in Diagramforce as an editable copy, in a new tab"
        >
          {mapImage}
          <span className={styles.label}>Open whole flow</span>
        </a>
      ) : (
        <>
          {mapImage}
          <span className={styles.label}>Whole flow</span>
        </>
      )}
    </div>
  );
  return <Diagram name={name} alt={alt} width={width} height={height} caption={caption} aside={aside} />;
}
