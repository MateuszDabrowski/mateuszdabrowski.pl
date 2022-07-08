import * as React from 'react';

const Button = ({ link, text }) => (
    <>
        <a class="button button--outline button--lg button--primary col col--6 col--offset-3" href={link}>{text}</a>
    </>
);

const ButtonRow = ({ linkLeft, textLeft, linkRight, textRight }) => (
    <>
        <div class="col col--12">
            <a class="button button--outline button--lg button--primary col col--5 col--offset-0" href={linkLeft}>{textLeft}</a>
            <a class="button button--outline button--lg button--primary col col--5 col--offset-2" href={linkRight}>{textRight}</a>
        </div>
    </>
);

export {Button, ButtonRow}