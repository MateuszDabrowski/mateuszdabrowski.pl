import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { newsletterForm, nativeFormEnabled } from '../data/newsletter';
import NewsletterForm from './NewsletterForm';
import SentIcon from './SentIcon';
import topicList from '../data/newsletter-topics.json';
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
 * click. With no topics, the page offers only the unsubscribe, as before
 * topics existed. When the read fails or runs past READ_TIMEOUT_MS, it does
 * the same and says the topics could not be loaded. A typed address never
 * gets topics, as anybody could type it.
 *
 * An address that is not subscribed (D630) sees the same topics with
 * "Subscribe again with these topics" in place of Save, and no unsubscribe.
 * The button only starts the double opt-in: a footer link survives
 * forwarding, so the click in the inbox is what counts. The confirm page then
 * says the address is subscribed again, with the topics chosen. With no
 * topics on offer, such a visitor gets a link to the sign-up form, never the
 * unsubscribe.
 *
 * Before the click, the confirm page shows the topics the form left selected,
 * from action=pending, which reads only the pending sign-up and changes
 * nothing, so a scanner that runs the page confirms nobody. While it reads,
 * the page says it is checking the link, and the button works. An expired
 * link says so as soon as the answer comes. After the click, the page reads the person's topics through
 * the signed link the answer carries and shows them with Save, so the topics
 * can be changed there. When they cannot be read, it links to the topics page.
 *
 * @param {'confirm' | 'unsubscribe'} kind
 */

// A read takes 3 to 5 s with a cold start (measured 2026-10-22 and 2026-10-25),
// and the sheet's size barely changes that: 3 rows and 3,000 took the same.
const READ_TIMEOUT_MS = 12000;
const RETRY_DELAY_MS = 1000; // before the one retry of a failed read

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
      `${result && result.again ? "You're subscribed again." : "You're on the list."} A welcome email is on its way, and the next newsletter lands in your inbox when there is something worth sending.`,
    checking: 'Checking your link…',
    selected: (labels) => `You selected ${listOf(labels)}.`,
    checkTopics: 'Check your topics',
    mineLoading: 'Loading your topics…',
    mine: 'These are your topics. Change them here, or later with the link in every email.',
    mineAllOff: 'Select at least one topic.',
    mineSave: 'Save topics',
    mineSaving: 'Saving...',
    mineSaved: 'Saved. The link in any newsletter brings you back to change them.',
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
    reading: 'Loading your topics…',
    unloaded: 'Your topics could not be loaded. Reload the page to choose them.',
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
    ceiling: 'The sign-up service has sent all the emails it can for today. Try again tomorrow.',
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
  const [selected, setSelected] = useState(null); // labels the form left selected, shown before the confirm click
  const [checking, setChecking] = useState(false); // the look at the link is under way: the page says so where its answer will go
  const [mine, setMine] = useState(null); // after the confirm click: { state, found, topics, off }
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
   * subscribed. When the read fails twice, runs past READ_TIMEOUT_MS or
   * answers something else, the page keeps the plain unsubscribe and says the
   * topics could not be loaded. A link the script rejects gets the unsubscribe
   * without that line: a reload would not help, and the unsubscribe's own
   * POST says the link is not valid. A script from before D630 sends no
   * `subscribed`, and the page is a subscriber's, as before.
   */
  function readChoices(found, isCurrent = () => true) {
    setStatus('reading');
    setNotice(null);
    const unloaded = () => {
      if (!isCurrent()) return;
      setNotice('unloaded');
      setStatus('ready');
    };
    // A failed read gets one more try after a moment: on 2026-10-25 a read
    // failed in the script during a send, and a reload a few seconds later
    // worked. Not after a timeout, as the reader has waited long enough then.
    const read = () => post({ action: 'choices', ...found }, READ_TIMEOUT_MS);
    const answered = (data) => Array.isArray(data.topics) || data.error === 'invalid';
    return read()
      .catch((error) => (error && error.name === 'AbortError' ? Promise.reject(error) : {}))
      .then((data) => (answered(data) ? data : new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS)).then(read)))
      .then((data) => {
        if (!isCurrent()) return;
        if (data.ok === false && data.error === 'invalid') {
          setStatus('ready');
          return;
        }
        if (!data.ok || !Array.isArray(data.topics)) {
          unloaded();
          return;
        }
        if (!data.topics.length) {
          setStatus(data.subscribed === false ? 'notSubscribed' : 'ready');
          return;
        }
        setTopics(data.topics);
        setOff(Array.isArray(data.off) ? data.off : []);
        setReturning(data.subscribed === false);
        setStatus('choosing');
      })
      .catch(unloaded);
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
    if (!nativeFormEnabled || !complete) {
      setStatus(!nativeFormEnabled ? 'inactive' : 'missing');
      return undefined;
    }
    let cancelled = false;
    if (kind === 'confirm') {
      setStatus('ready');
      preview(found.t, () => !cancelled);
      return () => {
        cancelled = true;
      };
    }
    readChoices(found, () => !cancelled);
    return () => {
      cancelled = true;
    };
  }, [kind]);

  /**
   * What the confirm link is about to confirm, before the click: the labels
   * the form left selected, from the list in the page. A sign-up without boxes
   * shows none. An expired link says so at once, unless the click came first.
   * A failed read changes nothing.
   */
  async function preview(token, isCurrent) {
    setChecking(true);
    try {
      const data = await post({ action: 'pending', t: token }, READ_TIMEOUT_MS);
      if (!isCurrent()) return;
      if (data.ok === false && data.error === 'expired') {
        setStatus((current) => (current === 'ready' ? 'expired' : current));
        return;
      }
      const label = (key) => (topicList.find((topic) => topic.key === key) || {}).label;
      const words = (value) => String(value || '').split(' ').filter(Boolean);
      let keys = [];
      if (typeof data.shown === 'string') keys = words(data.shown).filter((key) => !words(data.off).includes(key));
      else if (typeof data.returnOff === 'string') keys = topicList.map((topic) => topic.key).filter((key) => !words(data.returnOff).includes(key));
      const labels = keys.map(label).filter(Boolean);
      if (labels.length) setSelected(labels);
    } catch (error) {
      // the page works as before without the line
    } finally {
      if (isCurrent()) setChecking(false);
    }
  }

  /** After the confirm click: the person's topics, through the signed link, retried once as on the topics page. */
  async function loadMine(signed) {
    const query = new URLSearchParams(signed);
    const found = { u: query.get('u'), s: query.get('s') };
    setMine({ state: 'loading', found, topics: [], off: [] });
    const read = () => post({ action: 'choices', ...found }, READ_TIMEOUT_MS).catch(() => ({}));
    let data = await read();
    if (!Array.isArray(data.topics)) data = await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS)).then(read);
    if (!data.ok || !Array.isArray(data.topics)) setMine({ state: 'failed', found, topics: [], off: [] });
    else if (!data.topics.length) setMine(null); // no topics on offer: nothing to show or link to
    else setMine({ state: 'ready', found, topics: data.topics, off: Array.isArray(data.off) ? data.off : [] });
  }

  const toggleMine = (key) =>
    setMine((current) => ({
      ...current,
      state: 'ready',
      off: current.off.includes(key) ? current.off.filter((k) => k !== key) : [...current.off, key],
    }));

  async function saveMine(event) {
    event.preventDefault();
    const keys = mine.topics.filter((topic) => mine.off.includes(topic.key)).map((topic) => topic.key);
    setMine((current) => ({ ...current, state: 'saving' }));
    try {
      const data = await post({ action: 'topics', ...mine.found, off: keys.join(' ') });
      if (data.ok && data.state === 'saved') {
        setMine((current) => ({ ...current, state: 'saved', off: Array.isArray(data.off) ? data.off : keys }));
      } else if (data.error === 'changed' && Array.isArray(data.topics) && data.topics.length) {
        setMine((current) => ({ ...current, state: 'ready', topics: data.topics, off: current.off.filter((k) => data.topics.some((topic) => topic.key === k)) }));
      } else {
        setMine((current) => ({ ...current, state: 'error' }));
      }
    } catch (error) {
      setMine((current) => ({ ...current, state: 'error' }));
    }
  }

  async function act() {
    setStatus('sending');
    try {
      const data = await post({ action: kind, ...params });
      setResult(data);
      if (kind === 'confirm' && data.ok && data.signed) loadMine(data.signed);
      // "failed" is the script's own error, reported to the operator: the link is fine, so try again.
      setStatus(data.ok ? 'done' : data.error === 'failed' ? 'error' : data.error === 'expired' ? 'expired' : 'invalid');
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
      } else if (data.error === 'ceiling') {
        setNotice('ceiling');
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
  const notices = { changed: copy.changed, subscribed: copy.subscribed, ceiling: copy.ceiling, error: ERROR };
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
          {message && status === 'pending' && (
            <div className={styles.sentCard}>
              <SentIcon />
              <p className={styles.done}>{message}</p>
            </div>
          )}
          {message && status !== 'pending' && <p className={status === 'error' || status === 'invalid' || status === 'expired' ? styles.error : undefined}>{message}</p>}
          {kind === 'confirm' && (status === 'ready' || status === 'sending') && checking && <p>{spinner}{copy.checking}</p>}
          {kind === 'confirm' && (status === 'ready' || status === 'sending') && selected && <p>{copy.selected(selected)}</p>}
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
          {(status === 'ready' || status === 'sending') && notice === 'unloaded' && <p>{copy.unloaded}</p>}
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
          {kind === 'confirm' && status === 'done' && mine && mine.state === 'loading' && <p>{spinner}{copy.mineLoading}</p>}
          {kind === 'confirm' && status === 'done' && mine && !['loading', 'failed'].includes(mine.state) && (
            <form onSubmit={saveMine}>
              <p>{copy.mine}</p>
              <fieldset className={styles.topics} disabled={mine.state === 'saving'}>
                <legend className={styles.srOnly}>Your topics</legend>
                {mine.topics.map((topic) => (
                  <label key={topic.key} className={styles.check}>
                    <input type="checkbox" checked={!mine.off.includes(topic.key)} onChange={() => toggleMine(topic.key)} /> {topic.label}
                  </label>
                ))}
              </fieldset>
              {mine.topics.every((topic) => mine.off.includes(topic.key)) && <p className={styles.allOff}>{copy.mineAllOff}</p>}
              {mine.state === 'saved' && <p>{copy.mineSaved}</p>}
              {mine.state === 'error' && <p role="alert" className={styles.error}>{ERROR}</p>}
              <p>
                <button
                  type="submit"
                  className={clsx('button button--lg', pageStyles.newsletterButton, mine.state === 'saving' && styles.busy)}
                  disabled={mine.state === 'saving' || mine.topics.every((topic) => mine.off.includes(topic.key))}
                  aria-busy={mine.state === 'saving'}
                >
                  {mine.state === 'saving' ? <>{spinner}{copy.mineSaving}</> : copy.mineSave}
                </button>
              </p>
            </form>
          )}
          {kind === 'confirm' && status === 'done' && result && result.signed && mine && mine.state === 'failed' && (
            <p>
              <Link className={clsx('button button--lg', pageStyles.newsletterButton)} to={`/newsletter/unsubscribe/#${result.signed}`}>
                {copy.checkTopics}
              </Link>
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
