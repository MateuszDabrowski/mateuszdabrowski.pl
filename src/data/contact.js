/**
 * The contact form on About Me (src/components/ContactForm.jsx). `endpoint` is
 * the contact script's web app URL. It shares the newsletter's Turnstile key:
 * the form labels its token 'contact', and the script refuses any other label.
 *
 * While `endpoint` is empty, production builds leave out the form and the
 * Contact link in the About Me header, so nothing on the live site points at
 * a form that cannot send. `npm start` shows both for review.
 */
import { newsletterForm } from './newsletter';

export const contactForm = {
  endpoint: 'https://script.google.com/macros/s/AKfycbwEROh7drHNmFo5W5kMksjADFByoaJQhg2pFT75z5-5c3vTtDyuZD_4y1rorCaGbTZR/exec',
  turnstileSiteKey: newsletterForm.turnstileSiteKey,
};

export const contactFormEnabled = Boolean(contactForm.endpoint) || process.env.NODE_ENV !== 'production';
