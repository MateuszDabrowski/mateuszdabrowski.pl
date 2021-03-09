/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
    {
        title: <>Let's connect</>,
        imageUrl: 'img/undraw_connect_md.svg',
        description: (
            <>
                Ahoj! My name is Mateusz Dąbrowski, and I find joy in telling the code to do my job. Got any questions
                or suggestions? Or maybe just want to get in touch? Let's meet.
            </>
        ),
        url: 'https://www.linkedin.com/in/mateusz-dabrowski-marketing/',
        cta: <>Connect</>,
    },
    {
        title: <>Pick my brain</>,
        imageUrl: 'img/undraw_snippets_md.svg',
        description: (
            <>
                My notes on SSJS, JavaScript, SQL and Configuration used in Marketing Cloud. Are you craving for more
                in-depth documentation or looking for tested code snippets? Hop in!
            </>
        ),
        url: '/docs',
        cta: <>Docs & Snippets</>,
    },
    {
        title: <>Change the Cloud</>,
        imageUrl: 'img/undraw_ideas_md.svg',
        description: (
            <>
                Salesforce Marketing Cloud is powerful. But it can always be more useful. Here you can find all my
                Salesforce IdeaExchange contributions. Vote to make Marketing Cloud a better tool.
            </>
        ),
        url: '/ideas',
        cta: <>Ideas</>,
    },
];

function Feature({ imageUrl, title, description, url, cta }) {
    const imgUrl = useBaseUrl(imageUrl);
    return (
        <div className={classnames('col col--4', styles.feature)}>
            {imgUrl && (
                <div className="text--center">
                    <img className={styles.featureImage} src={imgUrl} alt={title} />
                </div>
            )}
            <h3 className={styles.featureHeading}>{title}</h3>
            <p>{description}</p>
            <div className={styles.buttons}>
                <Link
                    className={classnames(
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
                <meta property="og:image" content="img/logotyp-og.png" />
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

                <meta name="msapplication-TileColor" content="#f5b458" />
                <meta name="msapplication-square70x70logo" content="/img/favicon-128.png" />
                <meta name="msapplication-square150x150logo" content="/img/favicon-270.png" />
                <meta name="msapplication-TileImage" content="/img/favicon-270.png" />
                <meta name="msapplication-config" content="none" />

                <meta name="theme-color" content="#1D6CC7" />
            </Head>

            <Layout title="Ahoj" description={customFields.description} keywords={customFields.keywords}>
                <main>
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
                </main>
            </Layout>
        </>
    );
}

export default Home;
