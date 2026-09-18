/**
 * NewsletterForm.jsx
 *
 * A native subscribe form posting to the Apps Script endpoint in
 * scripts/newsletter-endpoint.gs, protected by Cloudflare Turnstile. Nothing
 * passes through this site. Subscribing is double opt-in: the script sends a
 * confirmation email and writes the sheet only when its link is clicked;
 * unsubscribing is written at once.
 *
 * Props:
 *   endpoint         - the Apps Script web app URL
 *   turnstileSiteKey - public Turnstile key; the widget renders invisibly and
 *                      hands over a token that the script verifies
 *   topics           - optional [string]; rendered as checkboxes
 *   compact          - flat variant (email + button, subscribe only)
 */
import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './NewsletterForm.module.css';
import pageStyles from '../pages/styles.module.css';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TURNSTILE_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

/** Loads the Turnstile script once per page and resolves when it is ready. */
function loadTurnstile() {
  if (typeof window === 'undefined') return Promise.reject(new Error('no window'));
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (!window.__turnstileLoading) {
    window.__turnstileLoading = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = TURNSTILE_SRC;
      script.async = true;
      script.onload = () => resolve(window.turnstile);
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }
  return window.__turnstileLoading;
}

export default function NewsletterForm({ endpoint, turnstileSiteKey, topics = [], compact = false }) {
  const [email, setEmail] = useState('');
  const [remove, setRemove] = useState(false);
  const [picked, setPicked] = useState([]);
  const [trap, setTrap] = useState(''); // honeypot: humans never see it
  const [status, setStatus] = useState('idle'); // idle | invalid | sending | done | error | challenge
  const widgetHost = useRef(null);
  const widgetId = useRef(null);

  useEffect(() => {
    let cancelled = false;
    loadTurnstile()
      .then((turnstile) => {
        if (cancelled || !widgetHost.current || widgetId.current !== null) return;
        widgetId.current = turnstile.render(widgetHost.current, { sitekey: turnstileSiteKey, size: 'flexible' });
      })
      .catch(() => setStatus('challenge'));
    return () => {
      cancelled = true;
    };
  }, [turnstileSiteKey]);

  const togglePick = (option) =>
    setPicked((current) => (current.includes(option) ? current.filter((o) => o !== option) : [...current, option]));

  async function onSubmit(event) {
    event.preventDefault();
    if (trap) {
      setStatus('done'); // a bot filled the hidden field; say nothing, send nothing
      return;
    }
    const address = email.trim();
    if (!EMAIL_RE.test(address)) {
      setStatus('invalid');
      return;
    }
    const token = window.turnstile && widgetId.current !== null ? window.turnstile.getResponse(widgetId.current) : '';
    if (!token) {
      setStatus('challenge');
      return;
    }
    const body = new URLSearchParams();
    body.set('email', address);
    body.set('action', remove ? 'unsubscribe' : 'subscribe');
    if (!remove) picked.forEach((option) => body.append('topics', option));
    body.set('cf-turnstile-response', token);
    setStatus('sending');
    try {
      const res = await fetch(endpoint, { method: 'POST', body });
      const data = await res.json().catch(() => ({ ok: res.ok }));
      setStatus(data.ok ? 'done' : 'error');
    } catch (error) {
      setStatus('error');
    } finally {
      if (window.turnstile && widgetId.current !== null) window.turnstile.reset(widgetId.current);
    }
  }

  if (status === 'done') {
    return (
      <div className={clsx(styles.form, compact && styles.compact)} role="status">
        <p className={styles.done}>
          {remove
            ? 'Done. That address is marked as unsubscribed and gets nothing further.'
            : `Almost there. A confirmation email is on its way to ${email.trim()} - click the link in it to finish. If it does not show up in a few minutes, check the spam folder and the address.`}
        </p>
      </div>
    );
  }

  return (
    <form className={clsx(styles.form, compact && styles.compact)} onSubmit={onSubmit} noValidate>
      {!compact && (
        <div className={styles.modes} role="tablist" aria-label="Subscribe or unsubscribe">
          <button type="button" role="tab" aria-selected={!remove} className={clsx(styles.mode, !remove && styles.modeActive)} onClick={() => setRemove(false)}>
            Subscribe
          </button>
          <button type="button" role="tab" aria-selected={remove} className={clsx(styles.mode, remove && styles.modeActive)} onClick={() => setRemove(true)}>
            Unsubscribe
          </button>
        </div>
      )}
      <div className={styles.row}>
        <label className={styles.label} htmlFor={compact ? 'nl-email-compact' : 'nl-email'}>
          <span className={styles.srOnly}>Email address</span>
          <input
            id={compact ? 'nl-email-compact' : 'nl-email'}
            className={styles.input}
            type="email"
            name="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => { setEmail(e.target.value); if (status === 'invalid') setStatus('idle'); }}
            aria-invalid={status === 'invalid'}
            required
          />
        </label>
        <button
          type="submit"
          className={clsx('button button--lg', styles.button, remove ? styles.unsubscribeButton : pageStyles.newsletterButton)}
          disabled={status === 'sending'}
        >
          {status === 'sending' ? 'Sending…' : remove ? 'Unsubscribe' : 'Subscribe'}
        </button>
      </div>

      {/* Honeypot: off-screen and out of the tab order; bots fill it, people do
          not. The name matches no browser autofill profile field on purpose. */}
      <label className={styles.honeypot} aria-hidden="true">
        <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} />
      </label>

      {topics.length > 0 && !remove && !compact && (
        <fieldset className={styles.topics}>
          <legend className={styles.legend}>Topics you care about</legend>
          {topics.map((option) => (
            <label key={option} className={styles.check}>
              <input type="checkbox" checked={picked.includes(option)} onChange={() => togglePick(option)} /> {option}
            </label>
          ))}
        </fieldset>
      )}

      <div ref={widgetHost} className={styles.turnstile} />

      {status === 'invalid' && <p className={styles.error}>That does not look like an email address.</p>}
      {status === 'challenge' && <p className={styles.error}>The bot check did not complete. Reload the page and try again, or email <a href="mailto:legal@mateuszdabrowski.pl">legal@mateuszdabrowski.pl</a>.</p>}
      {status === 'error' && <p className={styles.error}>Could not reach the sign-up service. Try again in a moment, or email <a href="mailto:legal@mateuszdabrowski.pl">legal@mateuszdabrowski.pl</a>.</p>}

      <p className={styles.notice}>
        {remove ? (
          <>Submit the address you subscribed with. It is marked as unsubscribed and receives nothing further.</>
        ) : (
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
