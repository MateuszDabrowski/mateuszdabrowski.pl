/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { PageMetadata } from '@docusaurus/theme-common';

import styles from './styles.module.css';

const dynamicHeroWords = ['code', 'agent', 'flow'];

/**
 * Hero Component with dynamic word-switching and scrolling animation.
 *
 * @return {JSX.Element} The updated Hero component.
 */
function Hero() {
    const [currentToolIndex, setCurrentToolIndex] = useState(0);

    useEffect(() => {
        // Under the OS reduce-motion setting the word stays put instead of cycling.
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return undefined;
        }
        const interval = setInterval(() => {
            setCurrentToolIndex((prevIndex) => (prevIndex + 1) % dynamicHeroWords.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.hero}>
            <div className={styles.heroInner}>
                <h1 className={styles.heroProjectTagline}>
                    Automate{' '}
                    <span className={styles.heroProjectKeywords}>
                        Marketing Automation
                    </span>

                </h1>
                <h2 className={styles.heroProjectSubTagline}>
                    <span className={styles.heroCodeFunction}>let</span>{' '}
                    {/* Decorative: not a live region, or screen readers would
                        announce the new word every five seconds for as long as
                        the page is open. */}
                    {/* The box is sized in ch so the rest of the line slides
                        with the word length instead of snapping; the key
                        remounts the word so its fade-in runs on every swap. */}
                    <span
                        className={styles.heroCodeVariable}
                        style={{ width: `${dynamicHeroWords[currentToolIndex].length}ch` }}
                        aria-hidden="true"
                    >
                        <span key={dynamicHeroWords[currentToolIndex]} className={styles.heroWordSwap}>
                            {dynamicHeroWords[currentToolIndex]}
                        </span>
                    </span>{' '}
                    <span className={styles.heroCodeSymbols}>=</span>{' '}
                    <span className={styles.heroCodeFunction}>do</span>
                    <span className={styles.heroCodeSymbols}>(</span>
                    <span className={styles.heroCodeValue}>'our job'</span>
                    <span className={styles.heroCodeSymbols}>);</span>
                </h2>
            </div>
        </div>
    );
}

const about = {
    imageUrl: 'img/md_profile_icon.webp',
    title: <>About me</>,
    description: (
        <>
            Ahoj! I'm Mateusz Dąbrowski - European Salesforce MVP & Architect working on Marketing Automation and AI Agents. I constantly learn about MarTech, process automation, data architecture, agents and custom code and share about it here as docs, snippets and apps.
        </>
    ),
    url: 'https://www.linkedin.com/in/mateusz-dabrowski-pl/',
    cta: <>Let's Connect</>,
    moreUrl: './sites/about-me/',
    moreCta: <>Learn more »</>,
};

/* The newsletter is the channel with the most reliable reach, so its box
   carries the only filled button on the page. */
const newsletter = {
    title: <>Stay in the loop</>,
    description: <>Get notified about new content, Salesforce Marketing, Data and AI news, and the occasional MarTech find. No fixed cadence.</>,
    url: './sites/newsletter/',
    cta: <>Subscribe</>,
};

/* Newest things on the site, hand-curated. Docs ship a few times a year and
   apps more often, so one mixed list stays fresh where a docs-only one would
   not. Never list a doc with draft: true - the dev server renders drafts, the
   production build does not, so the link would 404 on the live site. */
const whatsNew = [
    {
        date: '2026-09-22',
        kind: 'App',
        title: 'Slot 1.6.0',
        url: '/slot/',
        description: 'Slot works with all your Google and Microsoft accounts in one place. New: Diagramforce as an add-on per account, drawing and privacy for screen sharing, and each account remembering where you left off.',
    },
    {
        date: '2026-09-04',
        kind: 'App',
        title: 'Shelf 1.0',
        url: '/shelf/',
        description: 'New app. The small things you keep retyping, encrypted on your device, synced through iCloud, one tap from your clipboard.',
    },
    {
        date: '2026-08-07',
        kind: 'Doc',
        title: 'MC Next Business Units',
        url: '/docs/salesforce/marketing-cloud/config/business-units/',
        description: 'Business Units reuse an MCE name for a new Data Space architecture - with decisions you can\'t undo.',
    },
    {
        date: '2026-07-18',
        kind: 'Doc',
        title: 'MC Next IP Warming & Deliverability',
        url: '/docs/salesforce/marketing-cloud/config/ip-warming-deliverability/',
        description: 'MCN automates IP warming, not your deliverability work. What\'s automatic, what isn\'t, and where to watch.',
    },
    {
        date: '2026-07-08',
        kind: 'Doc',
        title: 'MCP Serverside Code Properties',
        url: '/docs/salesforce/marketing-cloud-personalization/serverside-code-properties/',
        description: 'Build your marketers\' dream campaign configuration UI in Marketing Cloud Personalization.',
    },
    {
        date: '2026-02-16',
        kind: 'Doc',
        title: 'MCE SQL Debugging All Contacts',
        url: '/docs/salesforce/marketing-cloud-engagement/sql/snippets/sql-debugging-all-contacts/',
        description: 'Clean up your MCE Contacts before they clean up your wallet. Step-by-step guide to identifying subscriber issues.',
    },
];

/* Dated things that expire: listed at the top of What's new until the day
   is over, then dropped. Past entries stay as a record. */
const events = [
    {
        title: 'Salesforce World Tour Essentials',
        date: '2024-06-19',
        place: 'Warszawa, Poland',
        description: 'A perfect place to discuss how businesses can transform multi-channel marketing with Salesforce Marketing Cloud Engagement and Real-Time Personalization.',
        url: 'https://invite.salesforce.com/world-tour-essentials-warszawa-2024/pwc',
    },
    {
        title: 'Insider Insights: Why SFMC Experts Share Their Top Content',
        date: '2024-09-05',
        place: 'Online',
        description: 'Join to hear multiple Marketing Cloud Engagement content creators talk about their tips, tricks and motivations for sharing knowledge via blogs and videos.',
        url: 'https://trailblazercommunitygroups.com/events/details/salesforce-salesforce-marketing-cloud-developers-group-presents-insider-insights-why-sfmc-experts-share-their-top-content/',
    },
    {
        title: 'Salesforce CRM in Journey Builder with Marketing Cloud Connect',
        date: '2024-09-10',
        place: 'Online',
        description: 'The Journey Builder Deep Dive series covers the advanced features of the Journey Builder. This session will focus on the JB MCC integration features, use cases and gotchas.',
        url: 'https://trailblazercommunitygroups.com/events/details/salesforce-salesforce-marketer-group-marketing-cloud-phoenix-united-states-presents-journey-builder-deep-dive-session-2-salesforce-crm-in-your-journeys-with-mc-connect/',
    },
    {
        title: 'From Salesforce to Agentforce: New Agentic World',
        date: '2024-12-03',
        place: 'Warszawa, Poland',
        description: 'Architect Community Group session covering the Agentforce. Learn about differences between a Chatbot, Einstein Copilot and Agentforce, purpose of the Data Cloud in the new Salesforce AI move and what can Agents can bring to the market.',
        url: 'https://trailblazercommunitygroups.com/events/details/salesforce-salesforce-architect-group-warsaw-poland-presents-od-salesforce-do-agentforce-ai-w-praktyce/',
    },
    {
        title: 'From Salesforce to Agentforce: The good, the bad, and the future',
        date: '2025-03-28',
        place: 'Wrocław, Poland',
        description: 'Polish Dreamin\' session covering Agentforce. Learn about differences between a Chatbot, Einstein Copilot and Agentforce, purpose of the Data Cloud in the new Salesforce AI move and what can Agents can bring to the market.',
        url: 'https://www.coffeeforce.pl/dreamin',
    },
    {
        title: 'Agentforce World Tour',
        date: '2026-05-27',
        place: 'Warszawa, Poland',
        description: 'A perfect place to discuss how businesses can transform multi-channel marketing with Salesforce Marketing Cloud Engagement and Real-Time Personalization.',
        url: 'https://invite.salesforce.com/agentforce-world-tour-warsaw-26/coffeeforce',
    },
    {
        title: 'MC Next Consultant Bootcamp: Analytics & Performance Insights',
        date: '2026-10-20',
        place: 'Online',
        description: 'Day 5 of the Marketing Cloud Next Consultant Bootcamp series, this session will cover Analytics & Performance Insights part of the Exam. Learn how to leverage data and insights to optimize your marketing strategies and drive better results.',
        url: 'https://trailblazercommunitygroups.com/events/details/salesforce-salesforce-global-bootcamp-group-virtual-presents-marketing-cloud-next-consultant-bootcamp-day-5/',
    },
    {
        title: 'MC Next Consultant Bootcamp: Ask Me Anything',
        date: '2026-10-27',
        place: 'Online',
        description: 'Day 7 of the Marketing Cloud Next Consultant Bootcamp series, this session will be the closing AMA session. Get your exam questions answered by the bootcamp speakers and get ready to become certified Marketing Cloud Next Consultant.',
        url: 'https://trailblazercommunitygroups.com/events/details/salesforce-salesforce-global-bootcamp-group-virtual-presents-marketing-cloud-next-consultant-bootcamp-day-7/',
    },
];

const feedMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/**
 * Today's date as YYYY-MM-DD in local time. Comparing ISO strings keeps an
 * event listed through its own day and needs no timezone arithmetic.
 *
 * @return {string} Today as YYYY-MM-DD.
 */
function todayIso() {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${now.getFullYear()}-${month}-${day}`;
}

/**
 * Formats a YYYY-MM-DD string as "Sep 12, 2026" without going through Date,
 * so server and client render the same text whatever their timezone.
 *
 * @param {string} isoDate - Date as YYYY-MM-DD.
 * @return {string} The formatted date.
 */
function formatFeedDate(isoDate) {
    const [year, month, day] = isoDate.split('-');
    return `${feedMonths[Number(month) - 1]} ${Number(day)}, ${year}`;
}

/**
 * Renders the left column as two stacked panels: about me (photo, intro,
 * connect button) growing to fill the column, and a smaller newsletter box
 * with its subscribe button underneath.
 *
 * @param {Object} about - imageUrl, title, description, url, cta.
 * @param {Object} newsletter - title, description, url, cta.
 * @return {JSX.Element} The rendered column.
 */
function AboutColumn({ about, newsletter }) {
    const imgUrl = useBaseUrl(about.imageUrl);
    return (
        <div className={clsx('col col--4', styles.panelCol, styles.panelStack)}>
            <div className={clsx(styles.panel, styles.aboutPanel)}>
                <img className={styles.aboutImage} src={imgUrl} alt="Mateusz Dąbrowski" />
                <h2 className={styles.panelHeading}>{about.title}</h2>
                <p>{about.description}</p>
                <div className={styles.buttons}>
                    <Link
                        className='button button--outline button--block button--secondary button--lg shadow--md'
                        to={about.url}
                    >
                        {about.cta}
                    </Link>
                </div>
                <Link className={styles.aboutMoreLink} to={about.moreUrl}>
                    {about.moreCta}
                </Link>
            </div>
            <div className={clsx(styles.panel, styles.newsletterPanel)}>
                <h2 className={styles.panelHeading}>{newsletter.title}</h2>
                <p className={styles.newsletterPitch}>{newsletter.description}</p>
                <div className={styles.buttons}>
                    <Link className={clsx('button button--block button--lg shadow--md', styles.newsletterButton)} to={newsletter.url}>
                        {newsletter.cta}
                    </Link>
                </div>
            </div>
        </div>
    );
}

/**
 * Renders the What's new panel. Upcoming events come first, soonest first,
 * and drop out once their day has passed; the newest released items fill
 * the remaining rows, newest first. The row budget is fixed so the panel
 * keeps its height next to the about panel whether or not an event is on.
 *
 * @param {Array} items - Released entries with date, kind, title, url, description.
 * @param {Array} upcoming - Event entries with date, title, place, url, description.
 * @param {number} limit - How many rows to show in total.
 * @return {JSX.Element} The rendered panel.
 */
function WhatsNew({ items, upcoming = [], limit = 6 }) {
    const today = todayIso();
    const events = upcoming
        .filter((event) => event.date >= today)
        .sort((a, b) => a.date.localeCompare(b.date))
        .map((event) => ({ ...event, kind: 'Event' }));
    const released = [...items].sort((a, b) => b.date.localeCompare(a.date));
    const rows = [...events, ...released].slice(0, limit);
    return (
        <div className={clsx('col col--8', styles.panelCol)}>
            <div className={styles.panel}>
                <h2 className={styles.panelHeading}>What's new</h2>
                <ul className={styles.feed}>
                    {rows.map((item) => (
                        <li key={item.url + item.date} className={styles.feedItem}>
                            <p className={styles.feedMeta}>
                                <span className={clsx(styles.feedKind, styles[`feedKind${item.kind}`])}>
                                    {item.kind}
                                </span>
                                <time dateTime={item.date}>{formatFeedDate(item.date)}</time>
                                {item.place && <span>{item.place}</span>}
                            </p>
                            <div>
                                <Link className={clsx(styles.feedTitle, 'offsite-marker')} to={item.url}>
                                    {item.title}
                                </Link>
                                <p className={styles.feedDescription}>{item.description}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

const apps = [
    {
        title: <>Diagramforce</>,
        url: 'https://diagramforce.com',
        githubUrl: 'https://github.com/MateuszDabrowski/diagramforce',
        imageUrl: 'img/article/index-image-tool-diagramforce.webp',
        description: 'Free browser-based visual diagramming tool for Salesforce architects and consultants. Create architecture diagrams, data models, process flows, org charts and Gantt charts with 1700+ Salesforce SLDS icons. Save your diagrams locally, export as JSON or PNG, or share a copy via URL. No payment, no account, no backend, and no data leaving your machine.',
        tags: ['Salesforce', 'Diagrams', 'Architecture', 'Data Model'],
        platforms: ['Web'],
        cta: 'Open App',
        badge: 'FREE',
        layout: 'row',
    },
    {
        title: <>Slot</>,
        url: '/slot/',
        appStoreUrl: 'https://apps.apple.com/app/id6796483262',
        imageUrl: 'img/apple/slot/Slot-Mac-Card.webp',
        description: 'Every Google and Microsoft account in one native Mac app, each in its own isolated session - unreads on the Dock, email & meeting alerts, call controls wherever you are, and links that always open as the right account.',
        tags: ['Gmail', 'Outlook', 'Meet', 'Teams'],
        platforms: ['macOS'],
        layout: 'card',
    },
    {
        title: <>Shelf</>,
        url: '/shelf/',
        appStoreUrl: 'https://apps.apple.com/app/id6762406443',
        imageUrl: 'img/apple/shelf/Shelf-Mac-Main.webp',
        description: 'The small things you keep retyping - door codes, addresses, snippets, queries, prompts, test emails - encrypted on your device, synced through iCloud, and one tap from your clipboard on iPhone, iPad, Mac and Apple Watch.',
        tags: ['Your', 'Stuff', 'Vault', 'Clipboard'],
        platforms: ['macOS', 'iPadOS', 'iOS', 'watchOS'],
        layout: 'card',
    },
    {
        title: <>Strum</>,
        url: '/strum/',
        appStoreUrl: 'https://apps.apple.com/app/id6764788253',
        imageUrl: 'img/apple/strum/Strum-Pad-Library.webp',
        description: 'A clean, focused tablature editor for ukulele and guitar. Write a song, drop in chords, set a strum pattern, and hear it back on a recorded instrument. Practice to a metronome that auto-scrolls the tab and ramps the tempo - plus capo support, a built-in tuner, custom tunings, and a library that syncs through your own iCloud.',
        tags: ['Ukulele', 'Guitar', 'Tabs'],
        platforms: ['macOS', 'iPadOS', 'iOS'],
        layout: 'card',
    },
];

/* Ordered by a year of GA page views; the last two are editorial picks. */
const highlightedArticles = [
    {
        title: <>System Data Views</>,
        url: './docs/salesforce/marketing-cloud-engagement/config/system-data-views/',
        description: 'Learn about hidden Data Views storing key data about your MCE.',
        tags: ['Marketing Cloud Engagement'],
        cta: 'Read more »',
    },
    {
        title: <>SQL Date Functions</>,
        url: './docs/salesforce/marketing-cloud-engagement/sql/sql-date-functions/',
        description: 'Create, calculate and format date, time and timezone with SQL.',
        tags: ['Marketing Cloud Engagement'],
        cta: 'Read more »',
    },
    {
        title: <>SQL Basics</>,
        url: './docs/salesforce/marketing-cloud-engagement/sql/sql-basics/',
        description: 'Best place to start your journey with writing SQL Queries in MCE.',
        tags: ['Marketing Cloud Engagement'],
        cta: 'Read more »',
    },
    {
        title: <>Mobile Connect Data Views</>,
        url: './docs/salesforce/marketing-cloud-engagement/config/mobile-connect-data-views/',
        description: 'View Mobile Connect data goldmine in SMS System Data Views.',
        tags: ['Marketing Cloud Engagement'],
        cta: 'Read more »',
    },
    {
        title: <>SQL Join</>,
        url: './docs/salesforce/marketing-cloud-engagement/sql/sql-join/',
        description: 'Check how to work with more than one Data Extension or Data View.',
        tags: ['Marketing Cloud Engagement'],
        cta: 'Read more »',
    },
    {
        title: <>Contact Deletion</>,
        url: './docs/salesforce/marketing-cloud-engagement/config/contact-deletion/',
        description: 'Everything you need to clean up your MCE from dirty Contacts.',
        tags: ['Marketing Cloud Engagement'],
        cta: 'Read more »',
    },
    {
        title: <>Cloud Page Apps</>,
        url: './docs/salesforce/marketing-cloud-engagement/ssjs/snippets/sfmc-cloud-page-apps/',
        description: 'Build custom and secure applications directly in the MCE.',
        tags: ['Marketing Cloud Engagement'],
        cta: 'Read more »',
    },
    {
        title: <>MCP Serverside Code Context</>,
        url: './docs/salesforce/marketing-cloud-personalization/serverside-code-context/',
        description: 'Undocumented secrets of coding MCP Campaign Templates.',
        tags: ['Marketing Cloud Personalization'],
        cta: 'Read more »',
    },
];

/**
 * Renders one app as a full-width row: image beside the story, platform
 * chips under the title, and the store badge where store apps earn one.
 */
function AppRow({ title, url, description, tags, platforms, cta, imageUrl, githubUrl, appStoreUrl, badge }) {
    const img = useBaseUrl(imageUrl);
    const storeBadge = useBaseUrl('img/apple/appstore.svg');
    return (
        <div className="col col--12">
            <div className={styles.appRow}>
                <div className={styles.appRowImage}>
                    <span className={styles.platformChips}>
                        {platforms.map((platform, idx) => (
                            <span key={idx} className={styles.platformChip}>{platform}</span>
                        ))}
                    </span>
                    {badge && <span className={styles.toolBadge}>{badge}</span>}
                    <Link to={url}>
                        <img src={img} alt={title} loading="lazy" />
                    </Link>
                </div>
                <div className={styles.appRowBody}>
                    <div className={styles.appRowHeader}>
                        <Link className={clsx(styles.cardTitle, styles.appRowTitle)} to={url}>
                            {title}
                        </Link>
                        <p className={styles.cardTags}>
                            {tags.map((tag, idx) => (
                                <span key={idx}>#{tag}{idx < tags.length - 1 ? ' ' : ''}</span>
                            ))}
                        </p>
                    </div>
                    <p>{description}</p>
                    {/* One grammar for every row: the left side reads, the right
                        side acts - a page link in text style beside the app's own
                        button or its store badge. 'Check it out' used to open the
                        app on one row and a page about it on the next. */}
                    <div className={styles.appRowFooter}>
                        <div>
                            {appStoreUrl && (
                                <Link className={styles.toolGithubLink} to={url}>
                                    Learn more »
                                </Link>
                            )}
                            {githubUrl && (
                                <Link className={styles.toolGithubLink} to={githubUrl}>
                                    View on GitHub »
                                </Link>
                            )}
                        </div>
                        {appStoreUrl ? (
                            <Link className={styles.appStoreBadge} to={appStoreUrl} aria-label={`Download on the App Store`}>
                                <img src={storeBadge} alt="Download on the App Store" loading="lazy" />
                            </Link>
                        ) : (
                            <Link className='button button--outline button--primary' to={url}>
                                {cta}
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

/**
 * Renders an app as a stacked card for a multi-column row: image on top with
 * the platform chips, then the story, then the same read-left / act-right
 * footer AppRow uses. Three App Store apps sit side by side under the
 * full-width free web tool, so the section reads as one tool and one family.
 */
function AppCard({ title, url, description, tags, platforms, imageUrl, appStoreUrl }) {
    const img = useBaseUrl(imageUrl);
    const storeBadge = useBaseUrl('img/apple/appstore.svg');
    return (
        <div className={clsx('col col--4', styles.appCardCol)}>
            <div className={styles.appCard}>
                <div className={styles.appCardImage}>
                    <span className={styles.platformChips}>
                        {platforms.map((platform, idx) => (
                            <span key={idx} className={styles.platformChip}>{platform}</span>
                        ))}
                    </span>
                    <Link to={url}>
                        <img src={img} alt={title} loading="lazy" />
                    </Link>
                </div>
                <div className={styles.appCardBody}>
                    <Link className={clsx(styles.cardTitle, styles.appCardTitle)} to={url}>
                        {title}
                    </Link>
                    <p className={styles.cardTags}>
                        {tags.map((tag, idx) => (
                            <span key={idx}>#{tag}{idx < tags.length - 1 ? ' ' : ''}</span>
                        ))}
                    </p>
                    <p>{description}</p>
                    <div className={styles.appRowFooter}>
                        <Link className={styles.toolGithubLink} to={url}>
                            Learn more »
                        </Link>
                        <Link className={styles.appStoreBadge} to={appStoreUrl} aria-label={`Download on the App Store`}>
                            <img src={storeBadge} alt="Download on the App Store" loading="lazy" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

/**
 * Renders a card component used for tools, categories and articles.
 *
 * @param {string} title - The title of the card.
 * @param {string} url - The URL of the card.
 * @param {string} description - The description of the card.
 * @param {Array} tags - The tags for the card.
 * @param {string} cta - The call to action text.
 * @param {string} colSize - The column size class (e.g. 'col--3', 'col--6').
 * @param {string} variant - Style variant ('card' for default, 'tool' for tool cards).
 * @return {JSX.Element} The rendered card component.
 */
function Card({ title, url, description, tags, cta, imageUrl, githubUrl, articleUrl, appStoreUrl, badge, compact, colSize = 'col--3', variant = 'card' }) {
    const isToolVariant = variant === 'tool';
    const imgPng = useBaseUrl(imageUrl);
    const imgWebp = useBaseUrl(imageUrl?.replace(/\.png$/, '.webp'));
    return (
        <div className={clsx('col', colSize)}>
            <div className={clsx('card', styles.card, isToolVariant && styles.toolCard, compact && styles.toolCardCompact)}>
                {isToolVariant && imgPng && (
                    <div className={styles.toolImageWrapper}>
                        {badge && <span className={styles.toolBadge}>{badge}</span>}
                        <Link to={url}>
                            <picture>
                                <source srcSet={imgWebp} type="image/webp" />
                                <img
                                    className={styles.toolImage}
                                    src={imgPng}
                                    alt={title}
                                    loading="lazy"
                                    width={1200}
                                    height={675}
                                />
                            </picture>
                        </Link>
                    </div>
                )}
                <div className='card__header'>
                    <Link className={styles.cardTitle} to={url}>
                        <strong>{title}</strong>
                    </Link>
                    <p className={styles.cardTags}>
                        {tags.map((tag, idx) => (
                            <span key={idx}>#{tag}{idx < tags.length - 1 ? ' ' : ''}</span>
                        ))}
                    </p>
                </div>
                <div className='card__body'>{description}</div>
                <div className='card__footer'>
                    {isToolVariant ? (
                        <div className={styles.toolFooter}>
                            <div className={styles.toolButtons}>
                                <Link className='button button--outline button--primary' to={url}>
                                    {cta}
                                </Link>
                                {articleUrl && (
                                    <Link className='button button--outline button--secondary' to={articleUrl}>
                                        Learn more
                                    </Link>
                                )}
                            </div>
                            {appStoreUrl && (
                                <Link className={styles.toolGithubLink} to={appStoreUrl}>
                                    View in App Store »
                                </Link>
                            )}
                            {githubUrl && (
                                <Link className={styles.toolGithubLink} to={githubUrl}>
                                    View on GitHub »
                                </Link>
                            )}
                        </div>
                    ) : (
                        <Link className={styles.cardLink} to={url}>
                            {cta}
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}

/**
 * Renders the Home component with various metadata and sections.
 *
 * @return {JSX.Element} The rendered Home component.
 */
function Home() {
    const { siteConfig: { customFields = {} } = {} } = useDocusaurusContext();

    return (
        <>
            {/* Author, theme colour, canonical, og:url and the icons come from the
                site config for every page. Layout only takes title and description,
                so the share image and keywords go through PageMetadata, which makes
                the image URL absolute for og:image and twitter:image alike. */}
            <PageMetadata image="img/logotyp-og.png" keywords={customFields.keywords} />
            <Head>
                <meta property="og:image:type" content="image/png" />
                <meta property="og:image:width" content="1500" />
                <meta property="og:image:height" content="1500" />
                <meta property="og:type" content="website" />
            </Head>

            <Layout title="Automate Marketing Automation" description={customFields.description}>
                <main>
                    <Hero />

                    <section className={clsx(styles.section, styles.sectionAlt)}>
                        <div className="container">
                            <div className="row">
                                <AboutColumn about={about} newsletter={newsletter} />
                                <WhatsNew items={whatsNew} upcoming={events} />
                            </div>
                        </div>
                    </section>

                    {highlightedArticles && highlightedArticles.length > 0 && (
                        <section className={clsx(styles.section, styles.sectionDark)}>
                            <div className="container">
                                <h2 className={clsx(styles.sectionHeading, styles.sectionHeadingDark)}>
                                    Most popular docs & snippets
                                </h2>
                                <div className='row'>
                                    {highlightedArticles.map((props, idx) => (
                                        <Card key={idx} {...props} />
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}
                    {apps && apps.length > 0 && (
                        <section className={clsx(styles.section, styles.sectionAlt)}>
                            <div className="container">
                                <h2 className={styles.sectionHeading}>
                                    Apps
                                </h2>
                                <div className={clsx('row', styles.centeredRow)}>
                                    {apps.map((props, idx) => (
                                        props.layout === 'card'
                                            ? <AppCard key={idx} {...props} />
                                            : <AppRow key={idx} {...props} />
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}

                </main>
            </Layout>
        </>
    );
}

export default Home;