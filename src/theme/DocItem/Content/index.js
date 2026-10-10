/**
 * Keeps the article from re-rendering when only the location changes.
 *
 * Docusaurus re-renders the route on every location change, including the
 * hash change of a TOC click and a click on the already active sidebar link.
 * That rebuilds the whole MDX article, which on long pages (System Data Views)
 * cost 260-750 ms of INP for Cloudflare's Windows visitors in October 2026.
 * The memo skips the rebuild while the MDX component stays the same.
 * Components inside the article that read the location or the doc context
 * still update through their own hooks.
 */
import React, { memo } from 'react';
import Content from '@theme-original/DocItem/Content';

const MemoContent = memo(Content, (prev, next) => prev.children?.type === next.children?.type);

export default function ContentWrapper(props) {
  return <MemoContent {...props} />;
}
