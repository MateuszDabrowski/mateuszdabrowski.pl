import React, { useState } from 'react';

/**
 * Downloads one release file from SQL Studio's public repository, from its main branch, under its own name.
 *
 * A plain link cannot: browsers ignore the download attribute on another domain, and GitHub serves raw files
 * as text, so the file would open in the tab. GitHub allows this fetch from any site. Without JavaScript,
 * the link still opens the raw file.
 *
 * @param {string} path - The file's path in the repository, such as "src/code-resources/sql-studio-backend.html".
 * @param {string} [className] - Classes for the link, such as Infima's button classes.
 * @param {React.ReactNode} [children] - The link's content, the file name in code by default.
 * @param {React.ReactNode} [fallback] - What shows under the link when the download fails.
 */
export function DownloadFile({ path, className, children, fallback = 'The download failed. Use the ZIP below.' }) {
    const name = path.split('/').pop();
    const url = `https://raw.githubusercontent.com/MateuszDabrowski/sqlstudio/main/${path}`;
    const [isFailed, setIsFailed] = useState(false);
    const onClick = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const blob = new Blob([await response.arrayBuffer()], { type: 'application/octet-stream' });
            const objectUrl = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = objectUrl;
            link.download = name;
            document.body.appendChild(link);
            link.click();
            link.remove();
            setTimeout(() => URL.revokeObjectURL(objectUrl), 10000);
            setIsFailed(false);
        } catch (error) {
            setIsFailed(true);
        }
    };
    return (
        <>
            <a href={url} onClick={onClick} className={className}>{children ?? <code>{name}</code>}</a>
            {isFailed && <><br/><small>{fallback}</small></>}
        </>
    );
}
