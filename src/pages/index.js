/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
    {
        title: <>Check the snippets</>,
        imageUrl: 'img/undraw_docusaurus_mountain.svg',
        description: (
            <>
                Docusaurus was designed from the ground up to be easily installed and used to get your website up and
                running quickly.
            </>
        ),
        url: '/docs/',
        cta: <>Snippets</>,
    },
    {
        title: <>Pick my brain</>,
        imageUrl: 'img/undraw_docusaurus_tree.svg',
        description: (
            <>
                Docusaurus lets you focus on your docs, and we&apos;ll do the chores. Go ahead and move your docs into
                the <code>docs</code> directory.
            </>
        ),
        url: '/docs/',
        cta: <>Ideas</>,
    },
    {
        title: <>Let's connect</>,
        imageUrl: 'img/undraw_docusaurus_react.svg',
        description: (
            <>
                Extend or customize your website layout by reusing React. Docusaurus can be extended while reusing the
                same header and footer.
            </>
        ),
        url: 'https://www.linkedin.com/in/mateusz-dabrowski-marketing/',
        cta: <>Connect</>,
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
        <Layout title="Ahoj" description={customFields.description}>
            <main>
                <div className={styles.hero}>
                    <div className={styles.heroInner}>
                        <h1 className={styles.heroProjectTagline}>
                            Automate <span className={styles.heroProjectKeywords}>Marketing Automation</span>
                            <br />
                            Let the <span className={styles.heroProjectKeywords}>code</span> do our job
                        </h1>
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
    );
}

export default Home;
