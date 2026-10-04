/**
 * ContactSection.jsx
 *
 * The "Get in touch" section at the end of About Me, with the contact form.
 * Its id is the target of the Contact link in the page header. Docusaurus
 * checks anchors at build time but only learns those of its own headings, so
 * the section registers its id itself: the link stays checked, and the build
 * does not report it as broken.
 */
import React from 'react';
import clsx from 'clsx';
import useBrokenLinks from '@docusaurus/useBrokenLinks';
import ContactForm from './ContactForm';
import { contactForm } from '../data/contact';
import pageStyles from '../pages/styles.module.css';
import about from './AboutMe.module.css';

export const CONTACT_ANCHOR = 'contact';

export default function ContactSection() {
  useBrokenLinks().collectAnchor(CONTACT_ANCHOR);
  return (
    <section className={clsx(pageStyles.aboutSection, about.contactSection)} id={CONTACT_ANCHOR}>
      <h2 className={pageStyles.sectionHeading}>Get in touch</h2>
      <div className={about.contactWrap}>
        <ContactForm endpoint={contactForm.endpoint} turnstileSiteKey={contactForm.turnstileSiteKey} />
      </div>
    </section>
  );
}
