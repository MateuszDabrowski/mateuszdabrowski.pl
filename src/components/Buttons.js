import * as React from 'react';

const Button = ({ link, text, newTab = false }) => (
    <>
        <a class="button button--outline button--lg button--primary col col--6 col--offset-3" href={link} target={newTab ? '_blank' : '_self'}>{text}</a>
    </>
);

const ButtonRow = ({ linkLeft, textLeft, newTabLeft = false, linkRight, textRight, newTabRight = false}) => (
    <>
        <div class="col col--12">
            <a class="button button--outline button--lg button--primary col col--5 col--offset-0" href={linkLeft} target={newTabLeft ? '_blank' : '_self'}>{textLeft}</a>
            <a class="button button--outline button--lg button--primary col col--5 col--offset-2" href={linkRight} target={newTabRight ? '_blank' : '_self'}>{textRight}</a>
        </div>
    </>
);

export {Button, ButtonRow}