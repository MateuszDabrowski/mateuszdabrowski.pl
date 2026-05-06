/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';

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
                    <span
                        className={clsx(styles.heroProjectKeywords, styles.fixedWidth)}
                        aria-live="polite"
                    >
                        Marketing Automation
                    </span>

                </h1>
                <h2 className={styles.heroProjectSubTagline}>
                    <span className={styles.heroCodeFunction}>let</span>{' '}
                    <span
                        className={clsx(styles.heroCodeVariable, styles.fixedWidth)}
                        aria-live="polite"
                    >
                        {dynamicHeroWords[currentToolIndex]}
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

const features = [
    {
        title: <>Let's connect</>,
        imageUrl: 'img/md_profile_icon.png',
        description: (
            <>
                Ahoj! My name is Mateusz Dąbrowski. I'm Salesforce MVP & Architect. I find joy in deconstructing problems and automating solutions. Got questions, suggestions or want to get in touch?
            </>
        ),
        url: 'https://www.linkedin.com/in/mateusz-dabrowski-pl/',
        cta: <>Let's Connect</>,
    },
    {
        title: <>Pick my brain</>,
        imageUrl: 'img/md_brain_icon.png',
        description: (
            <>
                My notes on Marketing Cloud, Agentforce and other things Salesforce. Are you craving for more in-depth documentation or looking for tested code snippets, solutions and prompts? Hop in!
            </>
        ),
        url: '/docs/',
        cta: <>Docs & Snippets</>,
    },
    {
        title: <>Change the Clouds</>,
        imageUrl: 'img/md_cloud_icon.png',
        description: (
            <>
                Salesforce ecosystem is powerful. But it can always be more useful. Here you can find all my Salesforce IdeaExchange contributions. Vote to make <code>&#123;InsertCurrentName&#125;</code>&nbsp;Cloud a better tool.
            </>
        ),
        url: '/sites/category/ideas/',
        cta: <>My Ideas</>,
    },
];

/**
 * Renders a feature component.
 *
 * @param {string} imageUrl - The URL of the image.
 * @param {string} title - The title of the feature.
 * @param {string} description - The description of the feature.
 * @param {string} url - The URL for the feature.
 * @param {string} cta - The call to action text.
 * @return {JSX.Element} The rendered feature component.
 */
function Feature({ imageUrl, title, description, url, cta }) {
    const imgUrl = useBaseUrl(imageUrl);
    return (
        <div className={clsx('col col--4', styles.feature)}>
            {imgUrl && (
                <div className='text--center'>
                    <img className={styles.featureImage} src={imgUrl} alt={title} />
                </div>
            )}
            <h3 className={styles.featureHeading}>{title}</h3>
            <p>{description}</p>
            <div className={styles.buttons}>
                <Link
                    className={clsx(
                        'button button--outline button--block button--secondary button--lg shadow--md',
                        styles.getStarted
                    )}
                    to={url}
                >
                    {cta}
                </Link>
            </div>
        </div>
    );
}

const freeApps = [
    {
        title: <>Diagramforce</>,
        url: 'https://diagramforce.mateuszdabrowski.pl',
        githubUrl: 'https://github.com/MateuszDabrowski/diagramforce',
        imageUrl: 'img/article/index-image-tool-diagramforce.png',
        description: 'Free browser-based visual diagramming tool for Salesforce architects and consultants. Create architecture diagrams, data models, process flows, org charts and Gantt charts with 1700+ Salesforce SLDS icons. Save your diagrams locally to your browser\'s storage, export as JSON, PNG, or share a copy via URL. No payment, no account, no backend, and no data leaving your machine.',
        tags: ['Salesforce', 'Diagrams', 'Architecture', 'Data Model'],
        cta: 'Check it out',
        articleUrl: './sites/apps/salesforce/diagramforce/',
    },
    {
        title: <>Clockforce</>,
        url: 'https://clockforce.mateuszdabrowski.pl',
        githubUrl: 'https://github.com/MateuszDabrowski/clockforce',
        imageUrl: 'img/article/index-image-tool-clockforce.png',
        description: 'Timezone collaboration tool for global teams and Marketing Cloud Engagement users. Compare timezones on a visual timeline, save Time Blocks and share them via URL for easy cross-organization meeting planning - no calendar access needed. Plus, generate production-ready SQL, AMPScript and SSJS snippets with proper timezone handling around MCE\'s fixed UTC-6 server time.',
        tags: ['Marketing Cloud Engagement', 'Timezones', 'SQL', 'AMPScript', 'SSJS'],
        cta: 'Check it out',
        articleUrl: './sites/apps/salesforce/clockforce/',
    },
];

const highlightedCategories = [
    {
        title: <>SQL</>,
        url: './docs/category/salesforce/marketing-cloud-engagement/sql/',
        description: 'SQL basics, not-so-basics and snippets to learn or copy-paste.',
        tags: ['Marketing Cloud Engagement'],
        cta: 'View articles »',
    },
    {
        title: <>Config</>,
        url: './docs/category/salesforce/marketing-cloud-engagement/config/',
        description: 'MCE setup and architecture tricks and best practices for everyone.',
        tags: ['Marketing Cloud Engagement'],
        cta: 'View articles »',
    },
    {
        title: <>SSJS</>,
        url: './docs/category/salesforce/marketing-cloud-engagement/ssjs/',
        description: 'Writing, styling, debugging and abusing SSJS. Everywhere.',
        tags: ['Marketing Cloud Engagement'],
        cta: 'View articles »',
    },
    {
        title: <>Serverside Code</>,
        url: './docs/category/salesforce/marketing-cloud-personalization/serverside-code/',
        description: 'Undocumented magic for creating amazing MCP campaign templates.',
        tags: ['Marketing Cloud Personalization'],
        cta: 'View articles »',
    },
];

const highlightedArticles = [
    {
        title: <>SQL Basics</>,
        url: './docs/salesforce/marketing-cloud-engagement/sql/sql-basics/',
        description: 'Best place to start your journey with writing SQL Queries in MCE.',
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
        title: <>SQL Date Functions</>,
        url: './docs/salesforce/marketing-cloud-engagement/sql/sql-date-functions/',
        description: 'Create, calculate and format date, time and timezone with SQL.',
        tags: ['Marketing Cloud Engagement'],
        cta: 'Read more »',
    },
    {
        title: <>Contact Deletion</>,
        url: './docs/salesforce/marketing-cloud-engagement/config/contact-deletion/',
        description: 'Everything you need to clean up your SFMC from dirty Contacts.',
        tags: ['Marketing Cloud Engagement'],
        cta: 'Read more »',
    },
    {
        title: <>System Data Views</>,
        url: './docs/salesforce/marketing-cloud-engagement/config/system-data-views/',
        description: 'Learn about hidden Data Views storing key data about your SFMC.',
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
function Card({ title, url, description, tags, cta, imageUrl, githubUrl, articleUrl, colSize = 'col--3', variant = 'card' }) {
    const isToolVariant = variant === 'tool';
    const imgPng = useBaseUrl(imageUrl);
    const imgWebp = useBaseUrl(imageUrl?.replace(/\.png$/, '.webp'));
    return (
        <div className={clsx('col', colSize)}>
            <div className={clsx('card', styles.card, isToolVariant && styles.toolCard)}>
                {isToolVariant && imgPng && (
                    <div className={styles.toolImageWrapper}>
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
 * Renders a newsletter section with a heading, description, and a button to subscribe.
 *
 * @return {JSX.Element} The rendered newsletter section.
 */
function Newsletter() {
    return (
        <section className={styles.newsletter}>
            <div className="container">
                <div className="row">
                    <div className="col col--8">
                        <h2 className={styles.newsletterHeading}>Stay in the loop</h2>
                        <p className={styles.newsletterDescription}>
                            Get the latest Salesforce Marketing Cloud and Agentforce tips, guides, and industry news straight to your inbox.
                        </p>
                    </div>
                    <div className="col col--4">
                        <div className={styles.newsletterButtonWrapper}>
                            <Link className={clsx(
                                    'button button--outline button--block button--primary button--lg shadow--md',
                                    styles.newsletterButton
                                )} to="./sites/newsletter/">
                                Subscribe now
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

const events = [
    {
        title: 'Salesforce World Tour Essentials',
        date: 'June 19, 2024',
        place: 'Warszawa, Poland',
        description: 'A perfect place to discuss how businesses can transform multi-channel marketing with Salesforce Marketing Cloud Engagement and Real-Time Personalization.',
        url: 'https://invite.salesforce.com/world-tour-essentials-warszawa-2024/pwc',
    },
    {
        title: 'Insider Insights: Why SFMC Experts Share Their Top Content',
        date: 'September 05, 2024',
        place: 'Online',
        description: 'Join to hear multiple Marketing Cloud content creators talk about their tips, tricks and motivations for sharing knowledge via blogs and videos.',
        url: 'https://trailblazercommunitygroups.com/events/details/salesforce-salesforce-marketing-cloud-developers-group-presents-insider-insights-why-sfmc-experts-share-their-top-content/',
    },
    {
        title: 'Salesforce CRM in Journey Builder with Marketing Cloud Connect',
        date: 'September 10, 2024',
        place: 'Online',
        description: 'The Journey Builder Deep Dive series covers the advanced features of the Journey Builder. This session will focus on the JB MCC integration features, use cases and gotchas.',
        url: 'https://trailblazercommunitygroups.com/events/details/salesforce-salesforce-marketer-group-marketing-cloud-phoenix-united-states-presents-journey-builder-deep-dive-session-2-salesforce-crm-in-your-journeys-with-mc-connect/',
    },
    {
        title: 'From Salesforce to Agentforce: New Agentic World',
        date: 'December 03, 2024',
        place: 'Warszawa, Poland',
        description: 'Architect Community Group session covering the Agentforce. Learn about differences between a Chatbot, Einstein Copilot and Agentforce, purpose of the Data Cloud in the new Salesforce AI move and what can Agents can bring to the market.',
        url: 'https://trailblazercommunitygroups.com/events/details/salesforce-salesforce-architect-group-warsaw-poland-presents-od-salesforce-do-agentforce-ai-w-praktyce/',
    },
    {
        title: 'From Salesforce to Agentforce: The good, the bad, and the future',
        date: 'March 28, 2025',
        place: 'Wrocław, Poland',
        description: 'Polish Dreamin\' session covering Agentforce. Learn about differences between a Chatbot, Einstein Copilot and Agentforce, purpose of the Data Cloud in the new Salesforce AI move and what can Agents can bring to the market.',
        url: 'https://www.coffeeforce.pl/dreamin',
    },
];

/**
 * Renders an event card component.
 *
 * @param {string} title - The title of the event.
 * @param {string} date - The date of the event.
 * @param {string} place - The location of the event.
 * @param {string} description - The description of the event.
 * @param {string} url - The URL for the event.
 * @return {JSX.Element} The rendered event card component.
 */
function Event({ title, date, place, description, url }) {
    return (
        <div className={clsx('col col--4', styles.eventCardWrapper)}>
            <div className={clsx('card', styles.eventCard)}>
                <div className='card__header'>
                    <h3>{title}</h3>
                    <p className={styles.eventDetail}>{date} — {place}</p>
                </div>
                <div className='card__body'>
                    <p>{description}</p>
                </div>
                <div className='card__footer'>
                    <Link className='button button--outline button--primary' to={url}>
                        Let's Meet
                    </Link>
                </div>
            </div>
        </div>
    );
}

/**
 * Checks if the given date string represents a future date.
 *
 * @param {string} dateString - The date string to be checked.
 * @return {boolean} Returns true if the given date string represents a future date, false otherwise.
 */
function isFutureDate(dateString) {
    const eventDate = new Date(dateString);
    const currentDate = new Date();
    return eventDate > currentDate;
}

/**
 * Renders the Home component with various metadata and sections.
 *
 * @return {JSX.Element} The rendered Home component.
 */
function Home() {
    const { siteConfig: { customFields = {} } = {} } = useDocusaurusContext();
    const futureEvents = events.filter(event => isFutureDate(event.date));

    return (
        <>
            <Head>
                <meta name="author" content="Mateusz Dąbrowski" />
                <meta name="HandheldFriendly" content="True" />
                <meta name="referrer" content="unsafe-url" />

                <link rel="canonical" href="https://mateuszdabrowski.pl/" />

                <meta property="og:url" content="https://mateuszdabrowski.pl/" />
                <meta property="og:image" content="/img/logotyp-og.png" />
                <meta property="og:image:type" content="image/png" />
                <meta property="og:image:width" content="1500" />
                <meta property="og:image:height" content="1500" />
                <meta property="og:type" content="website" />

                <link rel="shortcut icon" sizes="196x196" href="/img/favicon_196.png" />
                <link rel="apple-touch-icon" sizes="180x180" href="/img/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="167x167" href="/img/favicon_167.png" />
                <link rel="apple-touch-icon" sizes="152x152" href="/img/favicon_152.png" />
                <link rel="icon" type="image/png" sizes="128x128" href="/img/favicon_128.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/img/favicon_32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/img/favicon_16.png" />
                <link rel="manifest" href="/img/site.webmanifest" />
                <link rel="mask-icon" href="/img/safari-pinned-tab.svg" color="#DA4E55" />

                <meta name="msapplication-TileColor" content="#F6B355" />
                <meta name="msapplication-square70x70logo" content="/img/favicon-128.png" />
                <meta name="msapplication-square150x150logo" content="/img/favicon-270.png" />
                <meta name="msapplication-TileImage" content="/img/favicon-270.png" />
                <meta name="msapplication-config" content="none" />

                <meta name="theme-color" content="#212121" />
            </Head>

            <Layout title="Automate Marketing Automation" description={customFields.description} keywords={customFields.keywords}>
                <main>
                    <Hero />

                    {features && features.length > 0 && (
                        <section className={styles.features}>
                            <div className="container">
                                <div className="row">
                                    {features.map((props, idx) => (
                                        <Feature key={idx} {...props} />
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}

                    {freeApps && freeApps.length > 0 && (
                        <section className={clsx(styles.section, styles.sectionAlt)}>
                            <div className="container">
                                <h2 className={styles.sectionHeading}>
                                    Free Apps
                                </h2>
                                <div className={clsx('row', styles.centeredRow)}>
                                    {freeApps.map((props, idx) => (
                                        <Card key={idx} colSize='col--6' variant='tool' {...props} />
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}

                    {futureEvents && futureEvents.length > 0 && (
                        <section className={clsx(styles.section, styles.sectionAlt)}>
                            <div className="container">
                                <h2 className={styles.sectionHeading}>
                                    Upcoming Events
                                </h2>
                                <div className={clsx('row', styles.centeredRow)}>
                                    {futureEvents.map((event, idx) => (
                                        <Event key={idx} {...event} />
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}

                    {highlightedCategories && highlightedCategories.length > 0 && (
                        <section className={clsx(styles.section, styles.sectionDark)}>
                            <div className="container">
                                <h2 className={clsx(styles.sectionHeading, styles.sectionHeadingDark)}>
                                    Most popular topics
                                </h2>
                                <div className='row'>
                                    {highlightedCategories.map((props, idx) => (
                                        <Card key={idx} {...props} />
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}

                    <Newsletter />

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
                </main>
            </Layout>
        </>
    );
}

export default Home;
