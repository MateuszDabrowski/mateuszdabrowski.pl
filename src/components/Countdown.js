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
    if (Math.floor((counter / 1000 / 60) % 60) === 0) {
        return (
            <>
                <span className="countDown">{Math.floor((counter / 1000) % 60)} seconds</span>
            </>
        );
    }
    if (Math.floor((counter / (1000 * 60 * 60)) % 24) === 0) {
        return (
            <>
                <span className="countDown">
                    {Math.floor((counter / 1000 / 60) % 60)} minutes and {Math.floor((counter / 1000) % 60)} seconds
                </span>
            </>
        );
    }
    if (Math.floor(counter / (1000 * 60 * 60 * 24)) === 0) {
        return (
            <>
                <span className="countDown">
                    {Math.floor((counter / (1000 * 60 * 60)) % 24)} hours {Math.floor((counter / 1000 / 60) % 60)}{' '}
                    minutes and {Math.floor((counter / 1000) % 60)} seconds
                </span>
            </>
        );
    }
    return (
        <>
            <span className="countDown">
                {Math.floor(counter / (1000 * 60 * 60 * 24))} days {Math.floor((counter / (1000 * 60 * 60)) % 24)} hours{' '}
                {Math.floor((counter / 1000 / 60) % 60)} minutes and {Math.floor((counter / 1000) % 60)} seconds
            </span>
        </>
    );
};
