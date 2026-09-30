import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { newsletterForm, nativeFormEnabled } from '../data/newsletter';
import NewsletterForm from './NewsletterForm';
import pageStyles from '../pages/styles.module.css';
import styles from './NewsletterForm.module.css';

/**
 * The two landing pages behind the links in newsletter emails: confirm a
 * subscription, or unsubscribe. Each shows one button that POSTs to the
 * Apps Script endpoint (scripts/newsletter-endpoint.gs). Nothing happens on
 * page load: enterprise link scanners open every URL in an email, and a
 * link that acted on GET would confirm and unsubscribe people who never
 * clicked. Both pages are noindex and left out of the sitemap.
 *
 * The unsubscribe page without a signed link (a forwarded issue, or an email
 * sent before signed links), or with one the script rejects, shows an email
 * field with Turnstile instead of a dead end, the same unsubscribe the
 * newsletter page offers.
 *
 * @param {'confirm' | 'unsubscribe'} kind
 */

// Named and linked on every state, so someone who got the link by mistake
// sees what it is about before pressing anything.
const newsletter = <Link to="/sites/newsletter/">my newsletter</Link>;

const COPY = {
  confirm: {
    title: 'Confirm subscription',
    heading: 'One more click',
    ready: () => <>Press the button to confirm your subscription to {newsletter} about Salesforce Marketing, Data and AI. Nothing happens until you do.</>,
    button: 'Confirm subscription',
    working: 'Confirming...',
    done: () => "You're on the list. A welcome email is on its way, and the next newsletter lands in your inbox when there is something worth sending.",
    expired: 'This link has expired. Confirmation links work for 7 days. Subscribe again on the newsletter page and you will get a fresh one.',
    invalid: 'This link is not valid. Subscribe again on the newsletter page and you will get a fresh one.',
    missing: 'This page needs the link from your confirmation email.',
  },
  unsubscribe: {
    title: 'Unsubscribe',
    heading: 'Unsubscribe',
    ready: (address) => <>Press the button to unsubscribe {address} from {newsletter} about Salesforce Marketing, Data and AI. It gets no further issues.</>,
    button: 'Unsubscribe',
    working: 'Unsubscribing...',
    done: (address) => `${address} is unsubscribed from my newsletter and gets no further issues. Changed your mind? The newsletter page takes you back.`,
    expired: <>This link is not valid. Unsubscribe from {newsletter} about Salesforce Marketing, Data and AI with the form below instead.</>,
    invalid: <>This link is not valid. Unsubscribe from {newsletter} about Salesforce Marketing, Data and AI with the form below instead.</>,
    missing: <>Unsubscribe from {newsletter} about Salesforce Marketing, Data and AI.</>, // the form's own notice says what to enter
  },
};

export default function NewsletterAction({ kind }) {
  const copy = COPY[kind];
  const [params, setParams] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const found = kind === 'confirm' ? { t: query.get('t') } : { u: query.get('u'), s: query.get('s') };
    const complete = Object.values(found).every(Boolean);
    setParams(found);
    setStatus(!nativeFormEnabled ? 'inactive' : complete ? 'ready' : 'missing');
  }, [kind]);

  async function act() {
    const body = new URLSearchParams({ action: kind, ...params });
    setStatus('sending');
    try {
      const res = await fetch(newsletterForm.endpoint, { method: 'POST', body });
      const data = await res.json().catch(() => ({ ok: res.ok }));
      setStatus(data.ok ? 'done' : data.error === 'expired' ? 'expired' : 'invalid');
    } catch (error) {
      setStatus('error');
    }
  }

  const address = params && params.u ? params.u : '';
  const showForm = kind === 'unsubscribe' && (status === 'missing' || status === 'invalid' || status === 'expired');
  const message = {
    loading: '',
    inactive: 'This page is not active yet. Use the newsletter page instead.',
    missing: copy.missing,
    ready: copy.ready(address),
    sending: copy.ready(address),
    done: copy.done(address),
    expired: copy.expired,
    invalid: copy.invalid,
    error: 'Could not reach the sign-up service. Try again in a moment, or use the newsletter page.',
  }[status];

  return (
    <Layout title={copy.title} description="Newsletter">
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <main className="container margin-vert--xl" style={{ maxWidth: 640 }}>
        <div className={pageStyles.panel} role="status" aria-live="polite">
          <h1 className={pageStyles.panelHeading}>{status === 'done' ? (kind === 'confirm' ? 'Welcome' : 'Unsubscribed') : copy.heading}</h1>
          {message && <p className={status === 'error' || status === 'invalid' || status === 'expired' ? styles.error : undefined}>{message}</p>}
          {(status === 'ready' || status === 'sending') && (
            <p>
              <button
                type="button"
                className={clsx('button button--lg', kind === 'unsubscribe' ? styles.unsubscribeButton : pageStyles.newsletterButton, status === 'sending' && styles.busy)}
                onClick={act}
                disabled={status === 'sending'}
                aria-busy={status === 'sending'}
              >
                {status === 'sending' ? <><span className={styles.spinner} aria-hidden="true" />{copy.working}</> : copy.button}
              </button>
            </p>
          )}
          {showForm && (
            <NewsletterForm endpoint={newsletterForm.endpoint} turnstileSiteKey={newsletterForm.turnstileSiteKey} unsubscribeOnly />
          )}
          {status !== 'ready' && status !== 'sending' && status !== 'loading' && !showForm && (
            <p>
              <Link to="/sites/newsletter/">Newsletter page</Link>
            </p>
          )}
        </div>
      </main>
    </Layout>
  );
}
