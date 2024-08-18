import styles from './styles.module.css';

/**
 * A React functional component that renders a paragraph of lead text.
 *
 * @param {object} content - The content to be rendered inside the paragraph.
 * @return {JSX.Element} A JSX paragraph element with the provided content.
 */
const LeadText = ({ content }) => (
    <>
        <p id={styles.leadText}>{content}</p>
    </>
);

export { LeadText }