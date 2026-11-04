/**
 * NewsletterForm.jsx
 *
 * A native subscribe form posting to the Apps Script endpoint in
 * scripts/newsletter-endpoint.gs, protected by Cloudflare Turnstile. Nothing
 * passes through this site. Subscribing is double opt-in: the script sends a
 * confirmation email and writes the sheet only when its link is clicked;
 * unsubscribing is written at once. Change topics emails the signed link to
 * the topics page: a typed address proves nothing, so the page shows nothing
 * and the answer is the same for every address (D654). The unsubscribe page's
 * fallback form stays unsubscribe-only and links to that mode here, with
 * #change-topics on the address.
 *
 * The newsletter page's form also shows the topics (D653 in Sling's
 * subscriber-sheet contract), all ticked. It shows the list, never a person's
 * choices, as anybody can type an address. The list is in the page: each site
 * deploy writes newsletter-topics.json from the Topics tab Sling writes (see
 * plugins/newsletter-topics.mjs), so nothing is read when the page opens. An
 * empty list means the plain form, and no choice is sent. The docs footer form
 * never shows topics. The keys it showed and the ones left unticked wait in
 * the script. At the confirmation click they decide only the keys still on the
 * live tab, and any other key keeps the person's older state (D655).
 *
 * Props:
 *   endpoint         - the Apps Script web app URL
 *   turnstileSiteKey - public Turnstile key; the widget renders invisibly and
 *                      hands over a token that the script verifies
 *   compact          - flat variant (email + button, subscribe only)
 *   unsubscribeOnly  - unsubscribe with no mode switch: the unsubscribe page
 *                      when it has no signed link (a forwarded issue, or an
 *                      email sent before signed links)
 */
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useTurnstile from './useTurnstile';
import topicList from '../data/newsletter-topics.json';
import NewsletterAnswer from './NewsletterAnswer';
import styles from './NewsletterForm.module.css';
import pageStyles from '../pages/styles.module.css';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TOPICS_ANCHOR = 'change-topics';

export default function NewsletterForm({ endpoint, turnstileSiteKey, compact = false, unsubscribeOnly = false }) {
  const [email, setEmail] = useState('');
  const [mode, setMode] = useState(unsubscribeOnly ? 'unsubscribe' : 'subscribe');
  const [trap, setTrap] = useState(''); // honeypot: humans never see it
  const [status, setStatus] = useState('idle'); // idle | invalid | sending | done | error | challenge | ceiling
  const [off, setOff] = useState([]); // keys unticked
  const [retrying, setRetrying] = useState(false); // back from the Change topics answer: the field takes the focus
  // Loads on the first focus in the form; see useTurnstile.
  const turnstile = useTurnstile(turnstileSiteKey, { onError: () => setStatus('challenge') });

  const topics = compact || unsubscribeOnly ? [] : topicList; // [{ key, label }] from Sling's Topics tab
  useEffect(() => {
    if (!compact && !unsubscribeOnly && window.location.hash === `#${TOPICS_ANCHOR}`) setMode('topics');
  }, [compact, unsubscribeOnly]);

  const remove = mode === 'unsubscribe';
  const showTopics = mode === 'subscribe' && topics.length > 0;
  const allOff = showTopics && topics.every((topic) => off.includes(topic.key));
  const toggle = (key) => setOff((current) => (current.includes(key) ? current.filter((k) => k !== key) : [...current, key]));

  function pick(next) {
    setMode(next);
    if (status !== 'sending') setStatus('idle');
  }

  /** Back from the Change topics answer, with the address still there to correct. */
  function tryAgain() {
    setRetrying(true);
    setStatus('idle');
    turnstile.remount();
  }

  async function onSubmit(event) {
    event.preventDefault();
    if (allOff) return; // Enter in the field: the button is off, but the form still submits
    if (trap) {
      setStatus('done'); // a bot filled the hidden field; say nothing, send nothing
      return;
    }
    const address = email.trim();
    if (!EMAIL_RE.test(address)) {
      setStatus('invalid');
      return;
    }
    setStatus('sending');
    const token = await turnstile.getToken();
    if (!token) {
      setStatus('challenge');
      return;
    }
    const body = new URLSearchParams();
    body.set('email', address);
    body.set('action', mode === 'topics' ? 'topicLink' : mode);
    body.set('cf-turnstile-response', token);
    if (showTopics) {
      body.set('shown', topics.map((topic) => topic.key).join(' '));
      body.set('off', off.join(' '));
    }
    try {
      const res = await fetch(endpoint, { method: 'POST', body });
      const data = await res.json().catch(() => ({ ok: res.ok }));
      // "challenge" is the script refusing the bot check's token, which a reload fixes.
      setStatus(data.ok ? 'done' : ['ceiling', 'challenge'].includes(data.error) ? data.error : 'error');
    } catch (error) {
      setStatus('error');
    } finally {
      turnstile.reset();
    }
  }

  const errorId = compact ? 'nl-error-compact' : 'nl-error';
  const hasError = ['invalid', 'challenge', 'error', 'ceiling'].includes(status);

  if (status === 'done') {
    return (
      <div className={clsx(styles.form, compact && styles.compact)} role="status">
        <NewsletterAnswer
          icon={remove ? 'done' : 'sent'}
          title={
            {
              unsubscribe: 'That address is unsubscribed.',
              topics: `A link is on its way to ${email.trim()}.`,
              subscribe: `A confirmation email is on its way to ${email.trim()}.`,
            }[mode]
          }
          detail={
            {
              unsubscribe: "You won't get any more emails from me.",
              topics: 'It opens your topics, where you can change them or unsubscribe. If it does not show up in a few minutes, check the spam folder and the address.',
              subscribe: 'Almost there. Click its button, then confirm on the page it opens. If it does not show up in a few minutes, check the spam folder and the address.',
            }[mode]
          }
        >
          {mode === 'topics' && (
            <p className={styles.notice}>
              <button type="button" className={styles.linkButton} onClick={tryAgain}>Try another address</button>
            </p>
          )}
        </NewsletterAnswer>
      </div>
    );
  }

  return (
    <form id={compact || unsubscribeOnly ? undefined : TOPICS_ANCHOR} className={clsx(styles.form, compact && styles.compact)} onSubmit={onSubmit} onFocus={turnstile.arm} noValidate>
      {!compact && !unsubscribeOnly && (
        <div className={styles.modes} role="group" aria-label="Subscribe, change topics or unsubscribe">
          {[['subscribe', 'Subscribe'], ['topics', 'Change topics'], ['unsubscribe', 'Unsubscribe']].map(([key, label]) => (
            <button key={key} type="button" aria-pressed={mode === key} className={clsx(styles.mode, mode === key && styles.modeActive)} onClick={() => pick(key)}>
              {label}
            </button>
          ))}
        </div>
      )}
      <div className={clsx(styles.row, showTopics && styles.rowWithTopics)}>
        <label className={styles.label} htmlFor={compact ? 'nl-email-compact' : 'nl-email'}>
          <span className={styles.srOnly}>Email address</span>
          <input
            id={compact ? 'nl-email-compact' : 'nl-email'}
            className={styles.input}
            type="email"
            name="email"
            autoComplete="email"
            autoFocus={retrying}
            placeholder="you@example.com"
            value={email}
            onChange={(e) => { setEmail(e.target.value); if (status === 'invalid') setStatus('idle'); }}
            aria-invalid={status === 'invalid'}
            aria-describedby={hasError ? errorId : undefined}
            required
          />
        </label>
        {showTopics && (
          <fieldset className={styles.formTopics} disabled={status === 'sending'}>
            <legend>Deselect any topic you don't want. Topics I add later start selected.</legend>
            <div className={styles.topicRow}>
              {topics.map((topic) => (
                <label key={topic.key} className={styles.check}>
                  <input type="checkbox" checked={!off.includes(topic.key)} onChange={() => toggle(topic.key)} /> {topic.label}
                </label>
              ))}
            </div>
            {allOff && <p className={styles.allOff}>Select at least one topic.</p>}
          </fieldset>
        )}
        <button
          type="submit"
          className={clsx('button button--lg', styles.button, remove ? styles.unsubscribeButton : pageStyles.newsletterButton, status === 'sending' && styles.busy)}
          disabled={status === 'sending' || allOff}
          aria-busy={status === 'sending'}
        >
          {status === 'sending' ? <><span className={styles.spinner} aria-hidden="true" />Sending…</> : { subscribe: 'Subscribe', topics: 'Email me a link', unsubscribe: 'Unsubscribe' }[mode]}
        </button>
      </div>

      {/* Honeypot: off-screen and out of the tab order; bots fill it, people do
          not. The name matches no browser autofill profile field on purpose. */}
      <label className={styles.honeypot} aria-hidden="true">
        <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} />
      </label>

      <div ref={turnstile.widgetHost} className={turnstile.checkShown ? styles.turnstile : undefined} />

      {/* role="alert" makes screen readers announce the message when it appears. */}
      {status === 'invalid' && <p id={errorId} role="alert" className={styles.error}>That does not look like an email address.</p>}
      {status === 'challenge' && <p id={errorId} role="alert" className={styles.error}>The bot check did not complete. Reload the page and try again, or email <a href="mailto:legal@mateuszdabrowski.pl">legal@mateuszdabrowski.pl</a>.</p>}
      {status === 'ceiling' && <p id={errorId} role="alert" className={styles.error}>The sign-up service has sent all the emails it can for today. Try again tomorrow, or email <a href="mailto:legal@mateuszdabrowski.pl">legal@mateuszdabrowski.pl</a>.</p>}
      {status === 'error' && <p id={errorId} role="alert" className={styles.error}>Could not reach the sign-up service. Try again in a moment, or email <a href="mailto:legal@mateuszdabrowski.pl">legal@mateuszdabrowski.pl</a>.</p>}

      <p className={styles.notice}>
        {remove && (
          <>
            Submit the address you subscribed with, and you won't get any more emails from me.
            {unsubscribeOnly ? (
              <> <Link to={`/sites/newsletter/#${TOPICS_ANCHOR}`}>Want to change topics instead?</Link></>
            ) : (
              <span className={styles.noticeLine}>Want fewer emails instead? <button type="button" className={styles.linkButton} onClick={() => pick('topics')}>Change topics</button> keeps the ones you like.</span>
            )}
          </>
        )}
        {mode === 'topics' && <>Enter the address you subscribed with, and I will email you a link to change your topics.</>}
        {mode === 'subscribe' && (
          <>
            By subscribing you agree to receive the newsletter from Mateusz Dąbrowski. The address is used for nothing else and shared with no one.
            {compact ? (
              <> Unsubscribe any time on the <Link to="/sites/newsletter/">newsletter page</Link> or with the link in every email.</>
            ) : (
              <> Unsubscribe any time on this page or with the link in every email.</>
            )}
            {' '}Legal stuff in the <Link to="/sites/privacy/#newsletter">privacy policy</Link>.
          </>
        )}
      </p>
    </form>
  );
}
