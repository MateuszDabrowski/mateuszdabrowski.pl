/**
 * SentIcon.jsx
 *
 * A paper plane for the answers that mean an email is on its way: the
 * sign-up form's, the Change topics answer and the topics page's "Check your
 * inbox". It points up and to the right, and the card sets it low enough
 * that its tip is level with the middle of the headline's line. It flies in
 * once, and stands still for anyone who asked for less motion. Decorative: the
 * text next to it says the same.
 */
import React from 'react';
import styles from './NewsletterForm.module.css';

export default function SentIcon() {
  return (
    <svg className={styles.sentIcon} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M21.5 2.5 2.5 10.2l7.3 3.3 3.3 7.3z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M21.5 2.5 9.8 13.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
