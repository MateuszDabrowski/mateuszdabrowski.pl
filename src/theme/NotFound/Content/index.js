/**
 * 404 page: a search form and the most-read docs, so a reader who arrives on
 * an old or mistyped link has somewhere to go. Replaces the Docusaurus default,
 * which only asked the reader to report the broken link.
 *
 * The form is a plain GET to the search page (/search/?q=), so it works before
 * JavaScript loads. After load it is prefilled with the words of the missing
 * address: /docs/sql/sfmc-sql-basics/ becomes "sfmc sql basics".
 */
import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import { popularDocs } from '@site/src/data/popularDocs';

/** Words from the last meaningful segment of a path. */
function searchTerms(pathname) {
    const segment = pathname.split('/').filter((part) => part && part !== 'index.html').pop() || '';
    return decodeURIComponent(segment).replace(/\.html?$/, '').replace(/[-_.]+/g, ' ').trim();
}

export default function NotFoundContent({ className }) {
    const input = useRef(null);
    useEffect(() => {
        if (input.current && !input.current.value) input.current.value = searchTerms(window.location.pathname);
    }, []);

    return (
        <main className={clsx('container margin-vert--xl', className)}>
            <div className="row">
                <div className="col col--6 col--offset-3">
                    <Heading as="h1" className="hero__title">
                        Page Not Found
                    </Heading>
                    <p>This page does not exist, or it moved when the site was reorganised. Search the docs or start from one of the most-read pages.</p>
                    <form action="/search/" method="get" role="search" style={{ display: 'flex', gap: '0.5rem', margin: '1.5rem 0' }}>
                        <input
                            ref={input}
                            type="search"
                            name="q"
                            aria-label="Search Docs & Snippets"
                            placeholder="Search Docs & Snippets"
                            style={{
                                flex: 1,
                                padding: '0.5rem 0.75rem',
                                border: '1px solid var(--ifm-color-emphasis-400)',
                                borderRadius: 'var(--ifm-global-radius)',
                                background: 'var(--ifm-background-surface-color)',
                                color: 'var(--ifm-font-color-base)',
                                font: 'inherit',
                            }}
                        />
                        <button type="submit" className="button button--primary">Search</button>
                    </form>
                    <Heading as="h2">Most-read docs</Heading>
                    <ul>
                        {popularDocs.map((doc) => (
                            <li key={doc.url}>
                                <Link to={doc.url}>{doc.title}</Link> - {doc.description}
                            </li>
                        ))}
                    </ul>
                    <p>
                        <Link to="/docs/">Browse all Docs & Snippets</Link>
                    </p>
                </div>
            </div>
        </main>
    );
}
