import React, { useEffect, useState } from 'react';

/**
 * A mailto link that never appears as one in the static HTML.
 *
 * Harvesters read the built pages, so the address is assembled in the
 * browser after hydration. Until then (and for anything that does not run
 * JavaScript) the text reads "user [at] domain".
 *
 * @param {string} user - Local part of the address.
 * @param {string} [domain] - Domain, defaults to this site's.
 * @param {string} [subject] - Optional subject line for the draft.
 * @param {React.ReactNode} [children] - Link text, defaults to the address.
 */
export function Email({ user, domain = 'mateuszdabrowski.pl', subject, children }) {
    const [href, setHref] = useState(null);

    useEffect(() => {
        const query = subject ? '?subject=' + encodeURIComponent(subject) : '';
        setHref('mailto:' + user + '@' + domain + query);
    }, [user, domain, subject]);

    if (!href) {
        return <span>{children ?? `${user} [at] ${domain}`}</span>;
    }
    return <a href={href}>{children ?? `${user}@${domain}`}</a>;
}
