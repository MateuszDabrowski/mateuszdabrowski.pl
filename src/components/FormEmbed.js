import * as React from 'react';

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