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

const dynamicHeroWords = {
    headline: ['Marketing', 'Service', 'Sales', 'Commerce', 'Experience'],
    subline: ['code', 'agent', 'flow'],
};

/**
 * Hero Component with dynamic word-switching and scrolling animation.
 *
 * @return {JSX.Element} The updated Hero component.
 */
function Hero() {
    const [currentPlatformIndex, setCurrentPlatformIndex] = useState(0);
    const [currentToolIndex, setCurrentToolIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPlatformIndex((prevIndex) => (prevIndex + 1) % dynamicHeroWords.headline.length);
            setCurrentToolIndex((prevIndex) => (prevIndex + 1) % dynamicHeroWords.subline.length);
        }, 5000); // Change every 3 seconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
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
                        Marketing Automation{/* {dynamicHeroWords.headline[currentPlatformIndex]} */}
                    </span>

                </h1>
                <h2 className={styles.heroProjectSubTagline}>
                    <span className={styles.heroCodeFunction}>let</span>{' '}
                    <span
                        className={clsx(styles.heroCodeVariable, styles.fixedWidth)}
                        aria-live="polite"
                    >
                        {dynamicHeroWords.subline[currentToolIndex]}
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

const highlightedArticles = [
    {
        title: <>SQL Basics</>,
        url: './docs/sql/sfmc-sql-basics/',
        imageUrl: 'img/og/og-image-sql-basics.png',
        description: 'Best place to start your journey with writing SQL Queries in SFMC.',
        mainTag: 'SFMC SQL',
    },
    {
        title: <>SQL Select</>,
        url: './docs/sql/sfmc-sql-select/',
        imageUrl: 'img/og/og-image-sql-select.png',
        description: 'Learn how to SELECT the data and how to limit it with TOP & DISTINCT.',
        mainTag: 'SFMC SQL',
    },
    {
        title: <>SQL Join</>,
        url: './docs/sql/sfmc-sql-join/',
        imageUrl: 'img/og/og-image-sql-join.png',
        description: 'Check how to work with more than one Data Extension or Data View.',
        mainTag: 'SFMC SQL',
    },
    {
        title: <>SQL Date Functions</>,
        url: './docs/sql/sfmc-sql-date-functions/',
        imageUrl: 'img/og/og-image-sql-date-functions.png',
        description: 'Create, calculate and format date, time and timezone with SQL.',
        mainTag: 'SFMC SQL',
    },
    {
        title: <>System Data Views</>,
        url: './docs/config/sfmc-system-data-views/',
        imageUrl: 'img/og/og-image-sfmc-system-data-views.png',
        description: 'Learn about hidden Data Views storing key data about your SFMC.',
        mainTag: 'SFMC Config',
    },
    {
        title: <>Debugging Email Sends</>,
        url: './docs/sql/snippets/sfmc-sql-debugging-email-sends/',
        imageUrl: 'img/og/og-image-sql-debugging-email-sends.png',
        description: 'Step-by-step guide to resolving problems with SFMC email sends.',
        mainTag: 'SFMC SQL Snippets',
    },
    {
        title: <>Behavioral Triggers</>,
        url: './docs/config/sfmc-behavioral-triggers/',
        imageUrl: 'img/og/og-image-sfmc-behavioral-triggers.png',
        description: 'All you need to know about working with SFMC Behavioral Triggers.',
        mainTag: 'SFMC Config',
    },
    {
        title: <>Contact Deletion</>,
        url: './docs/config/sfmc-contact-deletion/',
        imageUrl: 'img/og/og-image-sfmc-contact-deletion.png',
        description: 'Everything you need to clean up your SFMC from dirty Contacts.',
        mainTag: 'SFMC Config',
    },
];

/**
 * Renders an article card based on the provided title, URL, description, and main tag.
 *
 * @param {string} title - The title of the article.
 * @param {string} url - The URL of the article.
 * @param {string} description - The description of the article.
 * @param {string} mainTag - The main tag of the article.
 * @return {JSX.Element} The rendered article card component.
 */
function Article({ title, url, description, mainTag }) {
    return (
        <div className='col col--3'>
            <div className={clsx('card', styles.articleCard)}>
                <div className='card__header'>
                    <Link className={styles.articleTitle} to={url}>
                        <strong>{title}</strong>
                    </Link>
                    <p className={styles.articleTag}>#{mainTag}</p>
                </div>
                <div className='card__body'>{description}</div>
                <div className='card__footer'>
                    <Link className={styles.articleLink} to={url}>
                        Read more »
                    </Link>
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
 * @param {Object} props - The properties of the event.
 * @param {string} props.title - The title of the event.
 * @param {string} props.date - The date of the event.
 * @param {string} props.place - The location of the event.
 * @param {string} props.description - The description of the event.
 * @param {string} props.url - The URL to navigate to when the event card is clicked.
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
                    {/* Tagline */}
                    <Hero />
                    {/* Let's Connect, Pick My Brain and Change The Cloud Section */}
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
                    {/* Newsletter Section */}
                    <Newsletter />
                    {/* Upcoming Events Section */}
                    {futureEvents && futureEvents.length > 0 && (
                        <section className={styles.events}>
                            <div className="container">
                                <h2 className={styles.eventsHeading}>
                                    Upcoming Events
                                </h2>
                                <div className={clsx('row', styles.eventRow)}>
                                    {futureEvents.map((event, idx) => (
                                        <Event key={idx} {...event} />
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}
                    {/* Highlighted Articles Section */}
                    {highlightedArticles && highlightedArticles.length > 0 && (
                        <section className={styles.articles}>
                            <div className="container">
                                <h2 className={styles.articlesHeading}>
                                    Most popular docs & snippets
                                </h2>
                                <div className='row'>
                                    {highlightedArticles.map((props, idx) => (
                                        <Article key={idx} {...props} />
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
