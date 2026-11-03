/* eslint-disable import/no-unresolved */
import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import ResponsiveImage from '@site/src/components/ResponsiveImage';

import styles from '@site/src/pages/styles.module.css';

/**
 * Renders one app as a full-width row: image beside the story, platform
 * chips under the title, and the store badge where store apps earn one.
 * reverse puts the image on the right, so a page of rows can alternate,
 * subtitle adds a one-sentence summary under the name, highlights a bullet
 * list under the description, fit="contain" shows the whole screenshot
 * where a tall row would otherwise crop it, and showTags={false} drops the
 * hashtags where the subtitle already says it. The badge (FREE) always sits
 * beside the name. A whole screenshot leaves no corner for the platform
 * chips, so with fit="contain" they sit beside the store button.
 */
export function AppRow({ title, url, description, tags, platforms, cta, imageUrl, githubUrl, appStoreUrl, badge, layout, reverse = false, subtitle, highlights, fit = 'cover', showTags = true, id }) {
    const storeBadge = useBaseUrl('img/apple/appstore.svg');
    const inlineMeta = fit === 'contain';
    // A store app before its launch day (src/data/apps.js).
    const comingSoon = layout === 'card' && !appStoreUrl;
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
                    <Link to={url}>
                        {/* Half the container from 997 px up, full width below. */}
                        <ResponsiveImage src={imageUrl} alt={title} sizes="(max-width: 996px) 100vw, 600px" />
                    </Link>
                </div>
                <div className={styles.appRowBody}>
                    <div className={styles.appRowHeader}>
                        <span className={styles.appRowTitleGroup}>
                            <Link className={clsx(styles.cardTitle, styles.appRowTitle)} to={url}>
                                {title}
                            </Link>
                            {badge && <span className={styles.titleBadge}>{badge}</span>}
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
                            {(appStoreUrl || comingSoon) && (
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
                            ) : comingSoon ? (
                                <span className={styles.comingSoon}>Coming soon to the App Store</span>
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
 * Renders an app as a stacked card: image on top, then the story, then the
 * platform chips and the same read-left / act-right footer AppRow uses. The
 * chips sit above the footer, not over the image: the card images fill their
 * top with the screens on the site blue, and red chips over them covered
 * the first screen. At the bottom, they line up from card to card.
 * AppCarousel lays the cards out.
 */
export function AppCard({ title, url, description, tags, platforms, imageUrl, cardImageUrl, appStoreUrl }) {
    const storeBadge = useBaseUrl('img/apple/appstore.svg');
    return (
        <div className={styles.appCard}>
            <div className={styles.appCardImage}>
                <Link to={url}>
                    {/* A third of the container from 997 px up, half on a
                        tablet, most of a phone's width. */}
                    <ResponsiveImage src={cardImageUrl ?? imageUrl} alt={title} sizes="(max-width: 576px) 85vw, (max-width: 996px) 50vw, 360px" />
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
                <span className={clsx(styles.platformChipsInline, styles.appCardPlatforms)}>
                    {platforms.map((platform, idx) => (
                        <span key={idx} className={styles.platformChip}>{platform}</span>
                    ))}
                </span>
                <div className={clsx(styles.appRowFooter, styles.appCardFooter)}>
                    <Link className={styles.toolGithubLink} to={url}>
                        Learn more »
                    </Link>
                    {appStoreUrl ? (
                        <Link className={styles.appStoreBadge} to={appStoreUrl} aria-label={`Download on the App Store`}>
                            <img src={storeBadge} alt="Download on the App Store" loading="lazy" />
                        </Link>
                    ) : (
                        // The carousel's heading names the App Store, and the
                        // full phrase wrapped "Learn more" at card width.
                        <span className={styles.comingSoon}>Coming soon</span>
                    )}
                </div>
            </div>
        </div>
    );
}

/**
 * Lays the App Store apps out as a row that scrolls sideways under the
 * full-width free web tools: three cards and the edge of a fourth in view on
 * a desktop, two and the edge of a third on a tablet, one and the edge of
 * the next on a phone. The fourth app (Soar) left a card alone on a row of
 * three. Two to a row doubled the section's height and cropped every
 * screenshot to its top two thirds. Scroll snapping handles swipes,
 * trackpads and the arrow keys once the row has focus. The buttons under the
 * row step one card for a mouse. Over the cards they covered text.
 * rotate starts the row at a random app on each visit and keeps the order
 * after it, so every app gets the first place in turn. It runs after
 * hydration, as the static HTML and the first render must agree.
 */
export function AppCarousel({ apps, label, rotate = false }) {
    const track = useRef(null);
    const [edges, setEdges] = useState({ start: true, end: false });
    const [order, setOrder] = useState(apps);

    // Once per visit: the caller passes a new array on every render, so the
    // apps it held at mount are the ones rotated.
    useEffect(() => {
        if (!rotate || apps.length < 2) return;
        const start = Math.floor(Math.random() * apps.length);
        setOrder([...apps.slice(start), ...apps.slice(0, start)]);
    }, []);

    useEffect(() => {
        const el = track.current;
        const update = () => setEdges({
            start: el.scrollLeft < 2,
            end: el.scrollLeft + el.clientWidth > el.scrollWidth - 2,
        });
        update();
        el.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);
        return () => {
            el.removeEventListener('scroll', update);
            window.removeEventListener('resize', update);
        };
    }, []);

    const step = (direction) => {
        const el = track.current;
        const [first, second] = el.children;
        const distance = second ? second.offsetLeft - first.offsetLeft : el.clientWidth;
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        el.scrollBy({ left: direction * distance, behavior: reduceMotion ? 'auto' : 'smooth' });
    };

    return (
        <div className={clsx('col col--12', styles.appCarousel)}>
            <div className={styles.appCarouselViewport}>
                <div ref={track} id="app-carousel" className={styles.appCarouselTrack} role="region" aria-label={label} tabIndex={0}>
                    {order.map((props) => (
                        <div key={props.title} className={styles.appCarouselSlide}>
                            <AppCard {...props} />
                        </div>
                    ))}
                </div>
                {/* A soft shadow on each side that has more cards. */}
                <span className={clsx(styles.appCarouselEdge, styles.appCarouselEdgeStart, !edges.start && styles.appCarouselEdgeShown)} aria-hidden="true" />
                <span className={clsx(styles.appCarouselEdge, styles.appCarouselEdgeEnd, !edges.end && styles.appCarouselEdgeShown)} aria-hidden="true" />
            </div>
            {!(edges.start && edges.end) && (
                <div className={styles.appCarouselControls}>
                    <button type="button" className={styles.appCarouselButton} onClick={() => step(-1)} disabled={edges.start} aria-label="Previous app" aria-controls="app-carousel">
                        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
                    </button>
                    <button type="button" className={styles.appCarouselButton} onClick={() => step(1)} disabled={edges.end} aria-label="Next app" aria-controls="app-carousel">
                        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
                    </button>
                </div>
            )}
        </div>
    );
}
