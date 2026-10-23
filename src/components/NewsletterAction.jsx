import React, { useEffect, useRef, useState } from 'react';
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
 * With a signed link, the unsubscribe page first asks the script for topic
 * choices (D619 in Sling's subscriber-sheet contract). Reading writes
 * nothing. The script checks the signature, then returns the topics from the
 * Topics tab Sling writes and the ones this person turned off. The page shows
 * one checkbox per topic, a save, and "Unsubscribe from everything".
 * Unticking every topic is an unsubscribe, and the page says so before the
 * click. With no topics, or no answer in READ_TIMEOUT_MS, the page offers
 * only the unsubscribe, as before topics existed. A typed address never gets
 * topics, as anybody could type it.
 *
 * An address that is not subscribed (D630) sees the same topics with
 * "Subscribe again with these topics" in place of Save, and no unsubscribe.
 * The button only starts the double opt-in: a footer link survives
 * forwarding, so the click in the inbox is what counts. The confirm page then
 * says the address is subscribed again, with the topics chosen. With no
 * topics on offer, such a visitor gets a link to the sign-up form, never the
 * unsubscribe.
 *
 * @param {'confirm' | 'unsubscribe'} kind
 */

const READ_TIMEOUT_MS = 12000; // an Apps Script cold start plus the sheet read

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
    done: (address, result) =>
      result && result.again
        ? `You're subscribed again, with ${result.topics}. A welcome email is on its way, and the next newsletter lands in your inbox when there is something worth sending.`
        : "You're on the list. A welcome email is on its way, and the next newsletter lands in your inbox when there is something worth sending.",
    expired: 'This link has expired. Confirmation links work for 7 days. Subscribe again on the newsletter page and you will get a fresh one.',
    invalid: 'This link is not valid. Subscribe again on the newsletter page and you will get a fresh one.',
    missing: 'This page needs the link from your confirmation email.',
  },
  unsubscribe: {
    title: 'Unsubscribe',
    heading: 'Unsubscribe',
    ready: (address) => <>Press the button to unsubscribe {address} from {newsletter} about Salesforce Marketing, Data and AI. You won't get any more emails from me.</>,
    button: 'Unsubscribe',
    working: 'Unsubscribing...',
    done: (address) => `${address} is unsubscribed from my newsletter. You won't get any more emails from me. Changed your mind? The newsletter page takes you back.`,
    expired: <>This link is not valid. Unsubscribe from {newsletter} about Salesforce Marketing, Data and AI with the form below instead.</>,
    invalid: <>This link is not valid. Unsubscribe from {newsletter} about Salesforce Marketing, Data and AI with the form below instead.</>,
    missing: <>Unsubscribe from {newsletter} about Salesforce Marketing, Data and AI.</>, // the form's own notice says what to enter
    // Topic choices, behind a signed link only
    chooseHeading: 'Unsubscribe or choose topics',
    reading: 'Checking your link...',
    choose: (address) => <>Choose the topics {address} gets from {newsletter} about Salesforce Marketing, Data and AI. Deselect the ones you don't want and save. Topics I add later start selected.</>,
    allOff: (address) => `With no topic selected, saving will unsubscribe ${address} from the newsletter.`,
    save: 'Save topics',
    saving: 'Saving...',
    leave: 'Unsubscribe from everything',
    saved: (address, labels) =>
      labels.length
        ? `Saved. ${listOf(labels)} ${labels.length > 1 ? 'are' : 'is'} off for ${address}. The link in any newsletter brings you back here to change it.`
        : `Saved. ${address} gets every topic. The link in any newsletter brings you back here to change it.`,
    changed: 'The topic list changed while this page was open. Check the topics and save again.',
    // Subscribing again, for an address that is not subscribed (D630)
    againHeading: 'Subscribe again',
    again: (address) => <>{address} is not subscribed to {newsletter} about Salesforce Marketing, Data and AI. Select the topics you want, and I will send a confirmation email to subscribe you again. Topics I add later start selected.</>,
    againAllOff: 'Select at least one topic to subscribe again.',
    againButton: 'Subscribe again with these topics',
    againWorking: 'Sending...',
    // Not subscribed, and no topics on offer: never the unsubscribe (D630)
    notSubscribed: (address) => <>{address} is not subscribed to {newsletter} about Salesforce Marketing, Data and AI.</>,
    signUp: 'Subscribe on the newsletter page',
    pendingHeading: 'Check your inbox',
    pending: (address) => `Almost there. A confirmation email is on its way to ${address}. Click its button, then confirm on the page it opens. If it does not show up in a few minutes, check the spam folder.`,
    subscribed: 'This address is subscribed already. Change its topics below and save.',
  },
};

const ERROR = 'Could not reach the sign-up service. Try again in a moment, or use the newsletter page.';

function listOf(labels) {
  // en-GB: "A, B and C", as the script writes it in the welcome email.
  return typeof Intl.ListFormat === 'function' ? new Intl.ListFormat('en-GB', { type: 'conjunction' }).format(labels) : labels.join(', ');
}

/** POSTs to the script and returns its JSON, or { ok } when the answer is not JSON. */
async function post(fields, timeoutMs) {
  const controller = new AbortController();
  const timer = timeoutMs ? setTimeout(() => controller.abort(), timeoutMs) : null;
  try {
    const res = await fetch(newsletterForm.endpoint, { method: 'POST', body: new URLSearchParams(fields), signal: controller.signal });
    return await res.json().catch(() => ({ ok: res.ok }));
  } finally {
    clearTimeout(timer);
  }
}

export default function NewsletterAction({ kind }) {
  const copy = COPY[kind];
  const [params, setParams] = useState(null);
  const [status, setStatus] = useState('loading');
  const [topics, setTopics] = useState([]); // [{ key, label }] from Sling's Topics tab
  const [off, setOff] = useState([]); // keys unticked
  const [busy, setBusy] = useState(null); // 'save' | 'leave' while a choice posts
  const [notice, setNotice] = useState(null); // 'changed' | 'subscribed' | 'error' under the choices
  const [returning, setReturning] = useState(false); // not subscribed: the page offers to subscribe again (D630)
  const [result, setResult] = useState(null); // the confirm answer, which says whether it was a return
  const panel = useRef(null);

  // A result is shorter than the choices. On a phone, scrolled down to the
  // buttons, the page would keep its place and leave the heading above the
  // screen, so the panel comes back into view.
  useEffect(() => {
    if (['done', 'saved', 'pending', 'invalid', 'error'].includes(status) && panel.current) {
      panel.current.scrollIntoView({ block: 'nearest' });
    }
  }, [status]);

  /**
   * Asks the script for the topics, this person's choice and whether they are
   * subscribed. Any failure leaves the plain unsubscribe, whose own POST
   * checks the link. A script from before D630 sends no `subscribed`, and the
   * page is a subscriber's, as before.
   */
  function readChoices(found, isCurrent = () => true) {
    setStatus('reading');
    return post({ action: 'choices', ...found }, READ_TIMEOUT_MS)
      .then((data) => {
        if (!isCurrent()) return;
        const list = data.ok && Array.isArray(data.topics) ? data.topics : [];
        if (!list.length) {
          setStatus(data.ok && data.subscribed === false ? 'notSubscribed' : 'ready');
          return;
        }
        setTopics(list);
        setOff(Array.isArray(data.off) ? data.off : []);
        setReturning(data.subscribed === false);
        setStatus('choosing');
      })
      .catch(() => isCurrent() && setStatus('ready'));
  }

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    // Signed unsubscribe links carry u and s after #, which never reaches a
    // server log. Links sent before that carry them in the query, and still work.
    const hash = new URLSearchParams(window.location.hash.slice(1));
    const signed = hash.has('u') ? hash : query;
    const found = kind === 'confirm' ? { t: query.get('t') } : { u: signed.get('u'), s: signed.get('s') };
    const complete = Object.values(found).every(Boolean);
    setParams(found);
    if (!nativeFormEnabled || !complete || kind === 'confirm') {
      setStatus(!nativeFormEnabled ? 'inactive' : complete ? 'ready' : 'missing');
      return undefined;
    }
    let cancelled = false;
    readChoices(found, () => !cancelled);
    return () => {
      cancelled = true;
    };
  }, [kind]);

  async function act() {
    setStatus('sending');
    try {
      const data = await post({ action: kind, ...params });
      setResult(data);
      setStatus(data.ok ? 'done' : data.error === 'expired' ? 'expired' : 'invalid');
    } catch (error) {
      setStatus('error');
    }
  }

  const offKeys = () => topics.filter((topic) => off.includes(topic.key)).map((topic) => topic.key);

  /** The list changed under the page: draw the new one, keep the person's unticks that still apply, and let them try again. */
  function redraw(list) {
    if (!list.length) {
      setStatus(returning ? 'notSubscribed' : 'ready');
      return;
    }
    setTopics(list);
    setOff((current) => current.filter((key) => list.some((topic) => topic.key === key)));
    setNotice('changed');
  }

  /** "Subscribe again with these topics" (D630): starts the double opt-in and nothing more. */
  async function resubscribe() {
    setBusy('save');
    setNotice(null);
    try {
      const data = await post({ action: 'resubscribe', ...params, off: offKeys().join(' ') });
      if (data.ok && data.state === 'pending') {
        setStatus('pending');
      } else if (data.error === 'invalid') {
        setStatus('invalid');
      } else if (data.error === 'changed' && Array.isArray(data.topics)) {
        redraw(data.topics);
      } else if (data.error === 'subscribed') {
        // Subscribed since the page opened: draw it as a subscriber's page.
        await readChoices(params);
        setNotice('subscribed');
      } else {
        setNotice('error');
      }
    } catch (error) {
      setNotice('error');
    } finally {
      setBusy(null);
    }
  }

  const allOff = topics.length > 0 && topics.every((topic) => off.includes(topic.key));
  const toggle = (key) => setOff((current) => (current.includes(key) ? current.filter((k) => k !== key) : [...current, key]));

  /** Unsubscribe from the choices: "Unsubscribe from everything", or a save with nothing ticked. */
  async function leave(button) {
    setBusy(button);
    setNotice(null);
    try {
      const data = await post({ action: 'unsubscribe', ...params });
      if (data.ok) setStatus('done');
      else if (data.error === 'invalid') setStatus('invalid');
      else setNotice('error');
    } catch (error) {
      setNotice('error');
    } finally {
      setBusy(null);
    }
  }

  async function save(event) {
    event.preventDefault();
    if (returning) {
      if (!allOff) resubscribe();
      return;
    }
    if (allOff) {
      leave('save');
      return;
    }
    setBusy('save');
    setNotice(null);
    try {
      const keys = offKeys();
      const data = await post({ action: 'topics', ...params, off: keys.join(' ') });
      if (data.ok && data.state === 'saved') {
        setOff(Array.isArray(data.off) ? data.off : keys);
        setStatus('saved');
      } else if (data.error === 'invalid') {
        setStatus('invalid');
      } else if (data.error === 'changed' && Array.isArray(data.topics)) {
        redraw(data.topics);
      } else {
        setNotice('error');
      }
    } catch (error) {
      setNotice('error');
    } finally {
      setBusy(null);
    }
  }

  const address = params && params.u ? params.u : '';
  const offLabels = topics.filter((topic) => off.includes(topic.key)).map((topic) => topic.label);
  const showForm = kind === 'unsubscribe' && (status === 'missing' || status === 'invalid' || status === 'expired');
  const showLink = !showForm && !['loading', 'reading', 'ready', 'sending', 'choosing', 'notSubscribed'].includes(status);
  const heading = {
    done: kind === 'confirm' ? (result && result.again ? 'Welcome back' : 'Welcome') : 'Unsubscribed',
    saved: 'Saved',
    pending: copy.pendingHeading,
    reading: copy.chooseHeading,
    choosing: returning ? copy.againHeading : copy.chooseHeading,
    notSubscribed: copy.againHeading,
  }[status] || copy.heading;
  const spinner = <span className={styles.spinner} aria-hidden="true" />;
  const notices = { changed: copy.changed, subscribed: copy.subscribed, error: ERROR };
  const message = {
    loading: '',
    inactive: 'This page is not active yet. Use the newsletter page instead.',
    missing: copy.missing,
    reading: <>{spinner}{copy.reading}</>,
    ready: copy.ready(address),
    sending: copy.ready(address),
    choosing: copy.choose && (returning ? copy.again(address) : copy.choose(address)),
    saved: copy.saved && copy.saved(address, offLabels),
    pending: copy.pending && copy.pending(address),
    notSubscribed: copy.notSubscribed && copy.notSubscribed(address),
    done: copy.done(address, result),
    expired: copy.expired,
    invalid: copy.invalid,
    error: ERROR,
  }[status];

  return (
    <Layout title={copy.title} description="Newsletter">
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <main className="container margin-vert--xl" style={{ maxWidth: 640 }}>
        <div ref={panel} className={clsx(pageStyles.panel, styles.resultPanel)} role="status" aria-live="polite">
          <h1 className={pageStyles.panelHeading}>{heading}</h1>
          {message && <p className={status === 'error' || status === 'invalid' || status === 'expired' ? styles.error : undefined}>{message}</p>}
          {status === 'choosing' && (
            <form onSubmit={save}>
              <fieldset className={styles.topics} disabled={Boolean(busy)}>
                <legend className={styles.srOnly}>Topics</legend>
                {topics.map((topic) => (
                  <label key={topic.key} className={styles.check}>
                    <input type="checkbox" checked={!off.includes(topic.key)} onChange={() => toggle(topic.key)} /> {topic.label}
                  </label>
                ))}
              </fieldset>
              {allOff && <p className={styles.allOff}>{returning ? copy.againAllOff : copy.allOff(address)}</p>}
              {notice && <p role="alert" className={styles.error}>{notices[notice]}</p>}
              <div className={styles.choiceButtons}>
                {returning ? (
                  <button
                    type="submit"
                    className={clsx('button button--lg', pageStyles.newsletterButton, busy === 'save' && styles.busy)}
                    disabled={Boolean(busy) || allOff}
                    aria-busy={busy === 'save'}
                  >
                    {busy === 'save' ? <>{spinner}{copy.againWorking}</> : copy.againButton}
                  </button>
                ) : (
                  <button
                    type="submit"
                    className={clsx('button button--lg', allOff ? styles.unsubscribeButton : pageStyles.newsletterButton, busy === 'save' && styles.busy)}
                    disabled={Boolean(busy)}
                    aria-busy={busy === 'save'}
                  >
                    {busy === 'save' ? <>{spinner}{allOff ? copy.working : copy.saving}</> : allOff ? copy.button : copy.save}
                  </button>
                )}
                {!allOff && !returning && (
                  <button
                    type="button"
                    className={clsx('button button--lg', styles.unsubscribeButton, busy === 'leave' && styles.busy)}
                    onClick={() => leave('leave')}
                    disabled={Boolean(busy)}
                    aria-busy={busy === 'leave'}
                  >
                    {busy === 'leave' ? <>{spinner}{copy.working}</> : copy.leave}
                  </button>
                )}
              </div>
            </form>
          )}
          {(status === 'ready' || status === 'sending') && (
            <p>
              <button
                type="button"
                className={clsx('button button--lg', kind === 'unsubscribe' ? styles.unsubscribeButton : pageStyles.newsletterButton, status === 'sending' && styles.busy)}
                onClick={act}
                disabled={status === 'sending'}
                aria-busy={status === 'sending'}
              >
                {status === 'sending' ? <>{spinner}{copy.working}</> : copy.button}
              </button>
            </p>
          )}
          {status === 'notSubscribed' && (
            <p>
              <Link className={clsx('button button--lg', pageStyles.newsletterButton)} to="/sites/newsletter/">
                {copy.signUp}
              </Link>
            </p>
          )}
          {showForm && (
            <NewsletterForm endpoint={newsletterForm.endpoint} turnstileSiteKey={newsletterForm.turnstileSiteKey} unsubscribeOnly />
          )}
          {showLink && (
            <p>
              <Link to="/sites/newsletter/">Newsletter page</Link>
            </p>
          )}
        </div>
      </main>
    </Layout>
  );
}
