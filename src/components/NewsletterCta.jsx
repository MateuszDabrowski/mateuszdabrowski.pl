/**
 * The subscribe prompt at the end of every doc page: the one place most
 * visitors ever are. One line of pitch, then either the native form (when the
 * Apps Script endpoint is configured) or a button to the newsletter page.
 */
import React from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import styles from './NewsletterCta.module.css';
import pageStyles from '../pages/styles.module.css';
import NewsletterForm from './NewsletterForm';
import { newsletterForm, nativeFormEnabled } from '../data/newsletter';

export default function NewsletterCta() {
  return (
    <aside className={styles.cta} aria-labelledby="newsletter-cta-title">
      <div className={styles.text}>
        <p id="newsletter-cta-title" className={styles.title}>Stay in the loop</p>
        <p className={styles.pitch}>
          Get notified about new content, Salesforce Marketing, Data and AI news, and the occasional MarTech find. No fixed cadence, email comes when there is something worth sending.
        </p>
      </div>
      {nativeFormEnabled ? (
        <div className={styles.formSlot}>
          <NewsletterForm {...newsletterForm} compact />
        </div>
      ) : (
        <Link className={clsx('button button--lg', pageStyles.newsletterButton, styles.button)} to="/sites/newsletter/">
          Subscribe
        </Link>
      )}
    </aside>
  );
}
