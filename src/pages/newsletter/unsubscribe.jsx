import React from 'react';
import NewsletterAction from '../../components/NewsletterAction';

// Landing page for the link in newsletter emails; see NewsletterAction.jsx.
export default function NewsletterUnsubscribe() {
  return <NewsletterAction kind="unsubscribe" />;
}
