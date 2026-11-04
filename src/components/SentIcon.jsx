/**
 * SentIcon.jsx
 *
 * A paper plane for the answers that mean an email is on its way: the
 * sign-up form's, the Change topics answer and the topics page's "Check your
 * inbox". It points right, at the text it stands for, and is symmetric about
 * the middle of its box, so it sits level with the headline's line. It flies
 * in once, and stands still for anyone who asked for less motion. Decorative:
 * the text next to it says the same.
 */
import React from 'react';
import styles from './NewsletterForm.module.css';

export default function SentIcon() {
  return (
    <svg className={styles.sentIcon} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M21.5 12 2.5 3.5 6.5 12 2.5 20.5z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M6.5 12h7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
