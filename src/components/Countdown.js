import * as React from 'react';

export const Countdown = ({ input, inputType = 'time', daysOnly = false, hoursOnly = false }) => {
    const [counter, setCounter] = React.useState(inputType === 'time' ? input : new Date(input) - new Date());
    const tick = () => (inputType === 'time' ? setCounter(counter - 1000) : setCounter(new Date(input) - new Date()));

    React.useEffect(() => {
        const timer = counter > 0 && setInterval(() => tick(), 1000);

        return () => {
            clearInterval(timer);
        };
    });

    if (daysOnly) {
        return (
            <>
                <span className="countDown">{Math.floor(counter / (1000 * 60 * 60 * 24))} days</span>
            </>
        );
    }
    if (hoursOnly) {
        return (
            <>
                <span className="countDown">{Math.floor(counter / (1000 * 60 * 60))} hours</span>
            </>
        );
    }
    /* If there is no full minutes left, show only seconds */
    if (Math.floor(counter / 1000 / 60) === 0) {
        return (
            <>
                <span className="countDown">{Math.floor((counter / 1000) % 60)} seconds</span>
            </>
        );
    }
    /* If there is no full hours left, show minutes and seconds */
    if (Math.floor(counter / (1000 * 60 * 60)) === 0) {
        return (
            <>
                <span className="countDown">
                    {Math.floor((counter / 1000 / 60) % 60)} minutes and {Math.floor((counter / 1000) % 60)} seconds
                </span>
            </>
        );
    }
    /* If there is no full days left, show hours, minutes and seconds */
    if (Math.floor(counter / (1000 * 60 * 60 * 24)) === 0) {
        return (
            <>
                <span className="countDown">
                    {Math.floor((counter / (1000 * 60 * 60)) % 24)} hours, {Math.floor((counter / 1000 / 60) % 60)}{' '}
                    minutes and {Math.floor((counter / 1000) % 60)} seconds
                </span>
            </>
        );
    }
    /* Else show days, minutes, hours and days */
    return (
        <>
            <span className="countDown">
                {Math.floor(counter / (1000 * 60 * 60 * 24))} days, {Math.floor((counter / (1000 * 60 * 60)) % 24)}{' '}
                hours, {Math.floor((counter / 1000 / 60) % 60)} minutes and {Math.floor((counter / 1000) % 60)} seconds
            </span>
        </>
    );
};
