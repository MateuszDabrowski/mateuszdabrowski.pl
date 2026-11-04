/**
 * NewsletterAnswer.jsx
 *
 * The answer that ends a newsletter step: an icon, the headline in bold on its
 * own line, so it reads at a glance, and the details under it. The paper plane
 * when an email is on its way, the tick when the step is done and nothing is
 * sent. Children go under the details, as the Change topics answer's link.
 *
 * Props:
 *   icon     - 'sent' or 'done'
 *   title    - the headline
 *   detail   - the line under it, optional
 */
import React from 'react';
import SentIcon from './SentIcon';
import styles from './NewsletterForm.module.css';

function DoneIcon() {
  return (
    <svg className={styles.doneIcon} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="9.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="m7.5 12.3 3 3 6-6.3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function NewsletterAnswer({ icon, title, detail, children }) {
  return (
    <div className={styles.answer}>
      {icon === 'sent' ? <SentIcon /> : <DoneIcon />}
      <div>
        <p className={styles.answerTitle}>{title}</p>
        {detail && <p className={styles.answerDetail}>{detail}</p>}
        {children}
      </div>
    </div>
  );
}
