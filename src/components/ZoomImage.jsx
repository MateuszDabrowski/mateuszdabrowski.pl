/**
 * ZoomImage.jsx
 *
 * A screenshot that opens enlarged over the page, shared by the app pages.
 * The image works as a button: a click, Enter or Space opens it. The enlarged
 * view is a native modal <dialog>, so Escape closes it, focus moves into it
 * while it is open and returns to the image afterwards. A click anywhere in
 * the view closes it too.
 *
 * Props:
 *   src      - path of the screenshot in static/
 *   alt      - what the screenshot shows
 *   imgStyle - inline style for the image on the page
 *   version  - appended as ?v= to the source URL, for screenshots without
 *              responsive copies (the copies carry a content hash already)
 */
import React, { useEffect, useRef, useState } from 'react';
import ResponsiveImage, { useImageVariants } from './ResponsiveImage';
import styles from './ZoomImage.module.css';

/** The sizes attribute for an image whose CSS caps its height in px. */
function cappedSizes(entry, maxHeight) {
  const px = typeof maxHeight === 'number' ? maxHeight : parseFloat(/^(\d+(?:\.\d+)?)px$/.exec(maxHeight ?? '')?.[1]);
  return entry && px ? `${Math.ceil((px * entry.width) / entry.height)}px` : undefined;
}

export default function ZoomImage({ src, alt, imgStyle = {}, version }) {
  const [open, setOpen] = useState(false);
  const [zoomSizes, setZoomSizes] = useState('90vw');
  const dialog = useRef(null);
  const entry = useImageVariants(src);
  const fallbackSrc = version ? `${src}?v=${version}` : src;
  const heightCapped = imgStyle.maxHeight !== undefined;

  useEffect(() => {
    const node = dialog.current;
    if (!node) return;
    if (open && !node.open) node.showModal();
    if (!open && node.open) node.close();
  }, [open]);

  const show = () => {
    // The enlarged view fits 90% of the window on both axes, so a tall phone
    // screenshot needs far fewer pixels than its width suggests.
    if (entry) {
      const width = Math.min(0.9 * window.innerWidth, 0.9 * window.innerHeight * (entry.width / entry.height));
      setZoomSizes(`${Math.ceil(width)}px`);
    }
    setOpen(true);
  };

  return (
    <>
      <ResponsiveImage
        src={src}
        fallbackSrc={fallbackSrc}
        alt={alt}
        // 'auto' lets browsers that support it use the laid-out width of a
        // lazy image; the others read the next entry.
        sizes={cappedSizes(entry, imgStyle.maxHeight) ?? 'auto, (max-width: 996px) 100vw, 900px'}
        dimensions={!heightCapped}
        className={styles.trigger}
        style={{ height: 'auto', ...imgStyle }}
        role="button"
        tabIndex={0}
        aria-haspopup="dialog"
        onClick={show}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            show();
          }
        }}
      />
      <dialog ref={dialog} className={styles.dialog} aria-label={alt} onClose={() => setOpen(false)} onClick={() => setOpen(false)}>
        <button type="button" className={styles.close} aria-label="Close">
          &times;
        </button>
        {open && (
          <ResponsiveImage src={src} fallbackSrc={fallbackSrc} alt={alt} sizes={zoomSizes} dimensions={false} loading="eager" className={styles.zoomed} />
        )}
      </dialog>
    </>
  );
}
