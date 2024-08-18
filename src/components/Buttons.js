/**
 * A reusable button component that generates an HTML anchor tag with a specified link, text, and optional new tab behavior.
 *
 * @param {string} link - The URL for the button link
 * @param {string} text - The text to be displayed on the button
 * @param {boolean} [newTab=false] - Whether the button should open in a new tab
 * @return {JSX.Element} The button component
 */
const Button = ({ link, text, newTab = false }) => (
    <>
        <a class="button button--outline button--lg button--primary col col--6 col--offset-3" href={link} target={newTab ? '_blank' : '_self'}>{text}</a>
    </>
);

/**
 * A reusable button row component that generates two HTML anchor tags with specified links, text, and optional new tab behavior.
 *
 * @param {string} linkLeft - The URL for the left button link
 * @param {string} textLeft - The text to be displayed on the left button
 * @param {boolean} [newTabLeft=false] - Whether the left button should open in a new tab
 * @param {string} linkRight - The URL for the right button link
 * @param {string} textRight - The text to be displayed on the right button
 * @param {boolean} [newTabRight=false] - Whether the right button should open in a new tab
 * @return {JSX.Element} The button row component
 */
const ButtonRow = ({ linkLeft, textLeft, newTabLeft = false, linkRight, textRight, newTabRight = false}) => (
    <>
        <div class="col col--12">
            <a class="button button--outline button--lg button--primary col col--5 col--offset-0" href={linkLeft} target={newTabLeft ? '_blank' : '_self'}>{textLeft}</a>
            <a class="button button--outline button--lg button--primary col col--5 col--offset-2" href={linkRight} target={newTabRight ? '_blank' : '_self'}>{textRight}</a>
        </div>
    </>
);

export { Button, ButtonRow }