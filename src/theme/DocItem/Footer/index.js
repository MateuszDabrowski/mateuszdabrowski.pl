/**
 * Wraps the docs footer to add the newsletter prompt after the article on
 * documentation pages. The "sites" docs instance (about, newsletter, privacy,
 * FAQ, ideas) is skipped: those pages either are the offer or should not
 * carry one.
 */
import React from 'react';
import Footer from '@theme-original/DocItem/Footer';
import { useLocation } from '@docusaurus/router';
import NewsletterCta from '@site/src/components/NewsletterCta';

export default function FooterWrapper(props) {
  const { pathname } = useLocation();
  const showPrompt = !pathname.startsWith('/sites/');
  return (
    <>
      {showPrompt && <NewsletterCta />}
      <Footer {...props} />
    </>
  );
}
