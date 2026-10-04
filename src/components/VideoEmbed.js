import React, { useState } from 'react';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import ResponsiveImage from './ResponsiveImage';

/**
 * A React component that embeds a YouTube video player, loaded on request.
 *
 * Until the reader presses play, the page shows a poster with a play button
 * and loads nothing from YouTube: no player script, and no request that hands
 * Google the reader's address. The poster is the doc's own share image
 * (front matter `image`), served from this site. Pressing play swaps in the
 * privacy-enhanced youtube-nocookie player, which starts the video.
 *
 * Used in docs only: the poster comes from the doc's front matter.
 *
 * @param {string} videoId - The ID of the YouTube video to embed.
 * @param {string} [title='YouTube video player'] - The title of the video player.
 * @param {string} [poster] - Image in static/ to show before playing, in place of the doc's share image.
 * @return {JSX.Element} The JSX element representing the video player.
 */
const YouTube = ({ videoId, title = 'YouTube video player', poster }) => {
    const [playing, setPlaying] = useState(false);
    const { frontMatter } = useDoc();
    const image = poster ?? frontMatter.image;

    if (playing) {
        return (
            <div className="video--container">
                <iframe
                    src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
                    title={title}
                    className="video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen;"
                    allowFullScreen
                />
            </div>
        );
    }
    return (
        <div className="video--container">
            <button type="button" className="video--poster" onClick={() => setPlaying(true)} aria-label={`Play video: ${title}`}>
                {image && (
                    <ResponsiveImage src={`/${image.replace(/^\//, '')}`} alt="" sizes="(max-width: 996px) 100vw, 800px" dimensions={false} />
                )}
                <span className="video--play" aria-hidden="true" />
            </button>
        </div>
    );
};

export { YouTube }
