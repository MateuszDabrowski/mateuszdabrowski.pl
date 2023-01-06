/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import clsx from 'clsx';

import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';

import styles from './styles.module.css';

const features = [
    {
        title: <>Let's connect</>,
        imageUrl: 'img/md_hoodie_icon.png',
        description: (
            <>
                Ahoj! My name is Mateusz Dąbrowski. I'm Marketing Cloud Architect and Salesforce MVP. I find joy in telling the code to do my job. Got questions, suggestions or want to get in touch?
            </>
        ),
        url: 'https://www.linkedin.com/in/mateusz-dabrowski-marketing/',
        cta: <>Let's Connect</>,
    },
    {
        title: <>Pick my brain</>,
        imageUrl: 'img/md_brain_icon.png',
        description: (
            <>
                My notes on AMPScript, SSJS, JavaScript, SQL and Configuration used in Marketing Cloud. Are you craving for more in-depth documentation or looking for tested code snippets? Hop in!
            </>
        ),
        url: '/docs',
        cta: <>Docs & Snippets</>,
    },
    {
        title: <>Change the Cloud</>,
        imageUrl: 'img/md_cloud_icon.png',
        description: (
            <>
                Salesforce Marketing Cloud is powerful. But it can always be more useful. Here you can find all my Salesforce IdeaExchange contributions. Vote to make Marketing Cloud a better tool.
            </>
        ),
        url: '/sites/ideas',
        cta: <>My Ideas</>,
    },
];

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

function Home() {
    const context = useDocusaurusContext();
    const { siteConfig: { customFields = {} } = {} } = context;
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
                    {/* Automate Marketing Automation Tagline */}
                    <div className={styles.hero}>
                        <div className={styles.heroInner}>
                            <h1 className={styles.heroProjectTagline}>
                                Automate <span className={styles.heroProjectKeywords}>Marketing Automation</span>
                            </h1>
                            <h2 className={styles.heroProjectSubTagline}>
                                <span className={styles.heroCodeFunction}>let</span>{' '}
                                <span className={styles.heroCodeVariable}>code</span>{' '}
                                <span className={styles.heroCodeSymbols}>=</span>{' '}
                                <span className={styles.heroCodeFunction}>do</span>
                                <span className={styles.heroCodeSymbols}>(</span>
                                <span className={styles.heroCodeValue}>'our job'</span>
                                <span className={styles.heroCodeSymbols}>);</span>
                            </h2>
                        </div>
                    </div>
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
