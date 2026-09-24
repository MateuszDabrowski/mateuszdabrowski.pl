/**
 * Wraps the docs footer to add the newsletter prompt after the article on
 * documentation pages. The "sites" docs instance (about, newsletter, privacy,
 * FAQ, ideas) is skipped: those pages either are the offer or should not
 * carry one.
 *
 * Also points agents at the page's markdown copy (plugins/llms-txt) with a
 * <link rel="alternate">, except on pages the plugin serves as HTML only.
 */
import React from 'react';
import Footer from '@theme-original/DocItem/Footer';
import Head from '@docusaurus/Head';
import { useLocation } from '@docusaurus/router';
import { usePluginData } from '@docusaurus/useGlobalData';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import NewsletterCta from '@site/src/components/NewsletterCta';

export default function FooterWrapper(props) {
  const { pathname } = useLocation();
  const { metadata } = useDoc();
  const { htmlOnly = [] } = usePluginData('llms-txt') ?? {};
  const showPrompt = !pathname.startsWith('/sites/');
  // Metadata permalinks carry no trailing slash; the config list may.
  const trim = (value) => value.replace(/\/+$/, '');
  const hasMarkdown = !htmlOnly.map(trim).includes(trim(metadata.permalink));
  return (
    <>
      {hasMarkdown && (
        <Head>
          <link rel="alternate" type="text/markdown" href={`${metadata.permalink.replace(/\/+$/, '')}.md`} />
        </Head>
      )}
      {showPrompt && <NewsletterCta />}
      <Footer {...props} />
    </>
  );
}
