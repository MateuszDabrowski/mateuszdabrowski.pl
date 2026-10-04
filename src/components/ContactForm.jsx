/**
 * ContactForm.jsx
 *
 * The contact form at the end of About Me. It posts to the contact script
 * (the endpoint in src/data/contact.js, source in scripts/contact/), which
 * checks the Turnstile token and puts the message straight into my Gmail inbox
 * as a message from the sender, so Reply answers them. The script sends no
 * email, so the form cannot be used to send mail to anyone else.
 *
 * Protection, as on the newsletter form: Turnstile labelled 'contact' (the
 * script refuses a token made for another form), a honeypot field, and length
 * limits that the script enforces as well. The script also caps how many
 * messages it sends a day and answers { ok: false, error: 'limit' } over it.
 */
import React, { useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useTurnstile from './useTurnstile';
import formStyles from './NewsletterForm.module.css';
import styles from './ContactForm.module.css';

// The script's check: the address goes into message headers, so characters
// that separate or quote addresses there are refused.
const EMAIL_RE = /^[^\s@,;<>"()[\]\\]+@[^\s@,;<>"()[\]\\]+\.[^\s@,;<>"()[\]\\]{2,}$/;
const NAME_MAX = 100;
const MESSAGE_MAX = 2000;
const LINKEDIN = 'https://www.linkedin.com/in/mateusz-dabrowski-pl/';

export default function ContactForm({ endpoint, turnstileSiteKey }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [trap, setTrap] = useState(''); // honeypot: humans never see it
  const [status, setStatus] = useState('idle'); // idle | invalid | empty | sending | done | error | challenge | limit
  const turnstile = useTurnstile(turnstileSiteKey, { action: 'contact', onError: () => setStatus('challenge') });

  async function onSubmit(event) {
    event.preventDefault();
    if (trap) {
      setStatus('done'); // a bot filled the hidden field; say nothing, send nothing
      return;
    }
    if (!EMAIL_RE.test(email.trim())) {
      setStatus('invalid');
      return;
    }
    if (!message.trim()) {
      setStatus('empty');
      return;
    }
    setStatus('sending');
    const token = await turnstile.getToken();
    if (!token) {
      setStatus('challenge');
      return;
    }
    const body = new URLSearchParams({
      action: 'contact',
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      'cf-turnstile-response': token,
    });
    try {
      const res = await fetch(endpoint, { method: 'POST', body });
      const data = await res.json().catch(() => ({ ok: res.ok }));
      if (data.ok) setStatus('done');
      else setStatus(data.error === 'limit' ? 'limit' : 'error');
    } catch (error) {
      setStatus('error');
    } finally {
      turnstile.reset();
    }
  }

  if (status === 'done') {
    return (
      <div className={formStyles.form} role="status">
        <p className={formStyles.done}>Thanks, your message is on its way. I will reply to {email.trim()}.</p>
      </div>
    );
  }

  const linkedIn = <Link href={LINKEDIN}>LinkedIn</Link>;
  const errors = {
    invalid: <>That does not look like an email address.</>,
    empty: <>Write a message first.</>,
    challenge: <>The bot check did not complete. Reload the page and try again, or message me on {linkedIn}.</>,
    limit: <>Too many messages today. Try again tomorrow, or message me on {linkedIn}.</>,
    error: <>Could not send the message. Try again in a moment, or message me on {linkedIn}.</>,
  };

  return (
    <form className={clsx(formStyles.form, styles.grid)} onSubmit={onSubmit} onFocus={turnstile.arm} noValidate>
      <label className={styles.field}>
        Name
        <input
          className={formStyles.input}
          type="text"
          name="name"
          autoComplete="name"
          maxLength={NAME_MAX}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label className={styles.field}>
        Email
        <input
          className={formStyles.input}
          type="email"
          name="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => { setEmail(e.target.value); if (status === 'invalid') setStatus('idle'); }}
          aria-invalid={status === 'invalid'}
          aria-describedby={status === 'invalid' ? 'contact-error' : undefined}
          required
        />
      </label>
      <label className={clsx(styles.field, styles.full)}>
        Message
        <textarea
          className={clsx(formStyles.input, styles.message)}
          name="message"
          rows={6}
          maxLength={MESSAGE_MAX}
          value={message}
          onChange={(e) => { setMessage(e.target.value); if (status === 'empty') setStatus('idle'); }}
          aria-invalid={status === 'empty'}
          aria-describedby={clsx('contact-count', status === 'empty' && 'contact-error')}
          required
        />
      </label>
      <p id="contact-count" className={clsx(styles.count, styles.full)}>
        {message.length} / {MESSAGE_MAX}
      </p>

      {/* Honeypot: off-screen and out of the tab order; bots fill it, people do not. */}
      <label className={formStyles.honeypot} aria-hidden="true">
        <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} />
      </label>

      <div ref={turnstile.widgetHost} className={clsx(styles.full, turnstile.checkShown && formStyles.turnstile)} />

      {errors[status] && (
        // role="alert" makes screen readers announce the message when it appears.
        <p id="contact-error" role="alert" className={clsx(formStyles.error, styles.full)}>
          {errors[status]}
        </p>
      )}

      <div className={clsx(styles.footer, styles.full)}>
        <p className={formStyles.notice}>
          Your address is used only to reply to you. Legal stuff in the <Link to="/sites/privacy/#contact-form">privacy policy</Link>.
        </p>
        <button
          type="submit"
          className={clsx('button button--lg button--primary', formStyles.button, status === 'sending' && formStyles.busy)}
          disabled={status === 'sending'}
          aria-busy={status === 'sending'}
        >
          {status === 'sending' ? <><span className={formStyles.spinner} aria-hidden="true" />Sending…</> : 'Send message'}
        </button>
      </div>
    </form>
  );
}
