import * as React from 'react';

const YouTube = ({ videoId, title = 'YouTube video player' }) => {
    const youTubeURL = 'https://www.youtube-nocookie.com/embed/' + videoId;
    return (
        <>
            <div class="video--container">
                <iframe src={youTubeURL} title={title} class="video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen;" allowfullscreen></iframe>
            </div>
        </>
    );
};

export { YouTube }