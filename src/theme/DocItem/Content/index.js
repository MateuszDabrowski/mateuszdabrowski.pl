/**
 * The doc body and its title, ejected from Docusaurus 3.10.2 for two reasons.
 *
 * 1. Keeps the article from re-rendering when only the location changes.
 *    Docusaurus re-renders the route on every location change, including the
 *    hash change of a TOC click and a click on the already active sidebar
 *    link. That rebuilds the whole MDX article, which on long pages (System
 *    Data Views) cost 260-750 ms of INP for Cloudflare's Windows visitors in
 *    October 2026. The memo skips the rebuild while the MDX component stays
 *    the same. Components inside the article that read the location or the
 *    doc context still update through their own hooks.
 * 2. Lets camel-case titles break between their words. At 7rem, a product
 *    name such as AgentExchange or MobilePush is wider than the column, and
 *    the browser broke it mid-word ("AgentExchang" / "e"). A <wbr> where a
 *    lowercase letter meets an uppercase one moves the break to "Agent" /
 *    "Exchange". It changes only the drawn heading: the page <title>, the
 *    og:title and the sidebar keep the plain frontmatter title.
 *
 * Ejected, so a Docusaurus upgrade does not update this file. Compare it with
 * node_modules/@docusaurus/theme-classic/lib/theme/DocItem/Content/index.js
 * after each upgrade.
 */
import React, { memo } from 'react';
import clsx from 'clsx';
import { ThemeClassNames } from '@docusaurus/theme-common';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import Heading from '@theme/Heading';
import MDXContent from '@theme/MDXContent';

/** The frontmatter title, unless the doc hides it or opens with its own h1 (as in Docusaurus). */
function useSyntheticTitle() {
  const { metadata, frontMatter, contentTitle } = useDoc();
  const shouldRender = !frontMatter.hide_title && typeof contentTitle === 'undefined';
  return shouldRender ? metadata.title : null;
}

/** AgentExchange -> Agent<wbr>Exchange: a break hint wherever a lowercase letter meets an uppercase one. */
function withBreakHints(title) {
  return title.split(/(?<=[a-z])(?=[A-Z])/).flatMap((part, i) => (i === 0 ? [part] : [<wbr key={i} />, part]));
}

function DocItemContent({ children }) {
  const syntheticTitle = useSyntheticTitle();
  return (
    <div className={clsx(ThemeClassNames.docs.docMarkdown, 'markdown')}>
      {syntheticTitle && (
        <header>
          <Heading as="h1">{withBreakHints(syntheticTitle)}</Heading>
        </header>
      )}
      <MDXContent>{children}</MDXContent>
    </div>
  );
}

export default memo(DocItemContent, (prev, next) => prev.children?.type === next.children?.type);
