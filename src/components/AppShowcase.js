/* eslint-disable import/no-unresolved */
import React from 'react';
import clsx from 'clsx';

import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';

import styles from '@site/src/pages/styles.module.css';

/**
 * Renders one app as a full-width row: image beside the story, platform
 * chips under the title, and the store badge where store apps earn one.
 * reverse puts the image on the right, so a page of rows can alternate,
 * subtitle adds a one-sentence summary under the name, highlights a bullet
 * list under the description, fit="contain" shows the whole screenshot
 * where a tall row would otherwise crop it, and showTags={false} drops the
 * hashtags where the subtitle already says it. A whole screenshot leaves no
 * corner for the platform chips and the badge, so with fit="contain" the
 * chips sit beside the store button and the badge beside the name.
 */
export function AppRow({ title, url, description, tags, platforms, cta, imageUrl, githubUrl, appStoreUrl, badge, reverse = false, subtitle, highlights, fit = 'cover', showTags = true, id }) {
    const img = useBaseUrl(imageUrl);
    const storeBadge = useBaseUrl('img/apple/appstore.svg');
    const inlineMeta = fit === 'contain';
    const chips = (className) => (
        <span className={className}>
            {platforms.map((platform, idx) => (
                <span key={idx} className={styles.platformChip}>{platform}</span>
            ))}
        </span>
    );
    return (
        <div className="col col--12" id={id}>
            <div className={clsx(styles.appRow, reverse && styles.appRowReverse)}>
                <div className={clsx(styles.appRowImage, fit === 'contain' && styles.appRowImageContain)}>
                    {!inlineMeta && chips(styles.platformChips)}
                    {!inlineMeta && badge && <span className={styles.toolBadge}>{badge}</span>}
                    <Link to={url}>
                        <img src={img} alt={title} loading="lazy" />
                    </Link>
                </div>
                <div className={styles.appRowBody}>
                    <div className={styles.appRowHeader}>
                        <span className={styles.appRowTitleGroup}>
                            <Link className={clsx(styles.cardTitle, styles.appRowTitle)} to={url}>
                                {title}
                            </Link>
                            {inlineMeta && badge && <span className={styles.titleBadge}>{badge}</span>}
                        </span>
                        {showTags && (
                            <p className={styles.cardTags}>
                                {tags.map((tag, idx) => (
                                    <span key={idx}>#{tag}{idx < tags.length - 1 ? ' ' : ''}</span>
                                ))}
                            </p>
                        )}
                    </div>
                    {subtitle && <p className={styles.appRowSubtitle}>{subtitle}</p>}
                    <p>{description}</p>
                    {highlights && highlights.length > 0 && (
                        <ul className={styles.appRowHighlights}>
                            {highlights.map((item) => <li key={item}>{item}</li>)}
                        </ul>
                    )}
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
                        <div className={styles.appRowActions}>
                            {inlineMeta && chips(styles.platformChipsInline)}
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
        </div>
    );
}

/**
 * Renders an app as a stacked card for a multi-column row: image on top with
 * the platform chips, then the story, then the same read-left / act-right
 * footer AppRow uses. Three App Store apps sit side by side under the
 * full-width free web tool, so the section reads as one tool and one family.
 */
export function AppCard({ title, url, description, tags, platforms, imageUrl, appStoreUrl }) {
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
