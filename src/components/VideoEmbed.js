/**
 * A React component that embeds a YouTube video player.
 *
 * @param {string} videoId - The ID of the YouTube video to embed.
 * @param {string} [title='YouTube video player'] - The title of the video player.
 * @return {JSX.Element} The JSX element representing the video player.
 */
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