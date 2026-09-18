/**
 * Embeds the newsletter's Google Form. Google puts a CAPTCHA challenge on
 * this form, which only its own embedded UI can pass, so the form has to be
 * an iframe; the wrapper sizes it to the form instead of the page.
 *
 * @param {string} formId - The ID of the Google Form to be embedded.
 * @return {JSX.Element} The embedded form.
 */
const Form = ({ formId }) => {
    const formURL = 'https://docs.google.com/forms/d/e/' + formId + '/viewform?embedded=true&hl=en';
    return (
        <div className="form--container">
            <iframe src={formURL} title="Newsletter sign-up form" frameBorder="0" marginHeight="0" marginWidth="0" loading="lazy"></iframe>
        </div>
    );
};

export { Form };
