/**
 * A React component that embeds a Google Form based on the provided form ID.
 *
 * @param {string} formId - The ID of the Google Form to be embedded.
 * @return {JSX.Element} The JSX element representing the embedded Google Form.
 */
const Form = ({ formId }) => {
    const formURL = 'https://docs.google.com/forms/d/e/' + formId + '/viewform?embedded=true&hl=en';
    return (
        <>
            <div class="form--container">
                <iframe src={formURL} frameborder="0" marginheight="0" marginwidth="0"></iframe>
            </div>
        </>
    );
};

export { Form }