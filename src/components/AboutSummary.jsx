/**
 * AboutSummary.jsx
 *
 * The short-form pieces of the About Me page, all derived from the shared
 * timeline data so the summary can never drift from the record:
 *   - AboutStats:      the numbers strip (years, projects, industries, ...)
 *   - CredentialList:  certifications, newest first, linked where a PDF exists
 *   - SpeakingList:    talks, newest first, in the homepage feed's layout
 *   - IndustryList:    industries delivered in, from the project entries
 *   - AboutJsonLd:     schema.org Person markup for search engines and LLMs
 */
import React from 'react';
import clsx from 'clsx';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import styles from './AboutMe.module.css';
import feed from '../pages/styles.module.css';

const PROFILE_URL = 'https://mateuszdabrowski.pl/sites/about-me/';
const SAME_AS = [
  'https://www.linkedin.com/in/mateusz-dabrowski-pl/',
  'https://github.com/MateuszDabrowski',
  'https://trailblazer.me/id/madabrowski',
];

/** Newest first by the entry's effective date. */
function byDateDesc(a, b) {
  return (b.date || b.startDate || '').localeCompare(a.date || a.startDate || '');
}

function year(event) {
  return (event.date || event.startDate || '').slice(0, 4);
}

/** Whole years between the first job or project in the data and today. */
function yearsSince(events) {
  const first = events
    .filter((e) => e.icon === 'Project' || e.icon === 'Position')
    .map((e) => e.startDate || e.date)
    .filter(Boolean)
    .sort()[0];
  if (!first) return 0;
  const [y, m] = first.split('-').map(Number);
  const now = new Date();
  return now.getFullYear() - y - (now.getMonth() + 1 < m ? 1 : 0);
}

function unique(events, key) {
  return new Set(events.flatMap((e) => e[key] || []));
}

/**
 * Platforms and industries count only what was delivered on a project;
 * a certification alone does not make a platform "worked on".
 */
export function AboutStats({ events }) {
  const projects = events.filter((e) => e.icon === 'Project' && e.industry);
  const stats = [
    { value: `${yearsSince(events)}+`, label: 'Years in MarTech' },
    { value: projects.length, label: 'Projects' },
    { value: unique(projects, 'industry').size, label: 'Industries' },
    { value: unique(projects, 'platform').size, label: 'Platforms' },
    { value: events.filter((e) => e.icon === 'Certification').length, label: 'Certifications' },
    { value: events.filter((e) => e.icon === 'SpeakingEvent').length, label: 'Talks' },
  ];
  return (
    <div className={styles.statsStrip}>
      {stats.map(({ value, label }) => (
        <div key={label} className={styles.metric}>
          <span className={styles.metricValue}>{value}</span>
          <span className={styles.metricLabel}>{label}</span>
        </div>
      ))}
    </div>
  );
}

/**
 * Certifications as chip rows, one row per issuer - Salesforce first, then
 * the rest by count - newest first within a row. The issuer is in the row
 * heading, so its name is dropped from each chip.
 */
export function CredentialList({ events }) {
  const certs = events.filter((e) => e.icon === 'Certification').sort(byDateDesc);
  const groups = new Map();
  certs.forEach((c) => {
    if (!groups.has(c.organisation)) groups.set(c.organisation, []);
    groups.get(c.organisation).push(c);
  });
  const ordered = [...groups.entries()].sort(([a, la], [b, lb]) => {
    if (a === 'Salesforce') return -1;
    if (b === 'Salesforce') return 1;
    return lb.length - la.length || a.localeCompare(b);
  });
  return (
    <div>
      {ordered.map(([issuer, items]) => (
        <div key={issuer} className={styles.credentialGroup}>
          <h4 className={styles.credentialIssuer}>
            {issuer} <span className={styles.summaryMeta}>({items.length})</span>
          </h4>
          <div className={styles.credentialChips}>
            {items.map((c) => {
              const label = c.title.startsWith(`${issuer} `) ? c.title.slice(issuer.length + 1) : c.title;
              const chip = (
                <>
                  {label} <span className={styles.credentialYear}>{year(c)}</span>
                </>
              );
              return c.url ? (
                <Link key={c.id} className={clsx(styles.credentialChip, 'no-offsite-marker')} to={c.url}>{chip}</Link>
              ) : (
                <span key={c.id} className={styles.credentialChip}>{chip}</span>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

/** Talks in the homepage feed's grammar: format chip and year on the left,
 *  title, organiser and one line on the right. */
export function SpeakingList({ events }) {
  const talks = events.filter((e) => e.icon === 'SpeakingEvent').sort(byDateDesc);
  return (
    <ul className={feed.feed}>
      {talks.map((t) => (
        <li key={t.id} className={feed.feedItem}>
          <p className={feed.feedMeta}>
            <span className={clsx(feed.feedKind, t.format === 'Webinar' && feed.feedKindApp)}>
              {t.format || 'Talk'}
            </span>
            <span>{year(t)}</span>
          </p>
          <div>
            {t.url ? (
              <Link className={feed.feedTitle} to={t.url}>{t.title}</Link>
            ) : (
              <span className={feed.feedTitle}>{t.title}</span>
            )}
            <span className={styles.summaryMeta}> {t.organisation}</span>
            {t.description && <p className={feed.feedDescription}>{t.description}</p>}
          </div>
        </li>
      ))}
    </ul>
  );
}

/**
 * Projects by industry, from the project entries, as tiles in the stats
 * strip's grammar: the count large, the industry as the label, the years
 * covered underneath. Most projects first, six to a row like the strip.
 */
export function IndustryList({ events }) {
  const projects = events.filter((e) => e.icon === 'Project' && e.industry);
  const groups = new Map();
  projects.forEach((pr) => {
    pr.industry.forEach((ind) => {
      if (!groups.has(ind)) groups.set(ind, { count: 0, years: new Set() });
      const g = groups.get(ind);
      g.count += 1;
      g.years.add((pr.startDate || pr.date).slice(0, 4));
      if (pr.endDate && pr.endDate !== 'Present') g.years.add(pr.endDate.slice(0, 4));
      if (pr.endDate === 'Present') g.years.add(String(new Date().getFullYear()));
    });
  });
  const rows = [...groups.entries()].sort(([a, ga], [b, gb]) => gb.count - ga.count || a.localeCompare(b));
  const span = (g) => {
    const ys = [...g.years].sort();
    return ys[0] === ys[ys.length - 1] ? ys[0] : `${ys[0]} to ${ys[ys.length - 1]}`;
  };
  return (
    <div className={styles.industryGrid}>
      {rows.map(([name, g]) => (
        <div key={name} className={styles.metric}>
          <span className={styles.metricValue}>{g.count}</span>
          <span className={styles.industryName}>{name}</span>
          <span className={styles.industryYears}>{span(g)}</span>
        </div>
      ))}
    </div>
  );
}

/**
 * schema.org Person. Credentials come from the data; the prose fields are
 * the same claims the page makes in text, so a crawler and a reader agree.
 */
export function AboutJsonLd({ events, jobTitle, description, alsoKnows = [], awards = [] }) {
  const certs = events.filter((e) => e.icon === 'Certification').sort(byDateDesc);
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Mateusz Dąbrowski',
    url: PROFILE_URL,
    image: 'https://mateuszdabrowski.pl/img/md_profile_icon.png',
    jobTitle,
    description,
    sameAs: SAME_AS,
    award: awards,
    knowsAbout: [...unique(events, 'platform'), ...unique(events, 'technology'), ...alsoKnows],
    hasCredential: certs.map((c) => ({
      '@type': 'EducationalOccupationalCredential',
      name: c.title,
      credentialCategory: 'certification',
      recognizedBy: { '@type': 'Organization', name: c.organisation },
    })),
    alumniOf: [{ '@type': 'CollegeOrUniversity', name: 'University of Warsaw' }],
  };
  return (
    <Head>
      <script type="application/ld+json">{JSON.stringify(person)}</script>
    </Head>
  );
}
