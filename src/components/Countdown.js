import * as React from 'react';

/**
 * Countdown component that displays remaining time in days, hours, minutes, and seconds.
 *
 * @param {any} input - The input time for the countdown
 * @param {string} inputType - The type of input time (default is 'time', but can also be 'date' allowing for calculation of remaining time)
 * @param {boolean} daysOnly - Display only days if true
 * @param {boolean} hoursOnly - Display only hours if true
 * @return {JSX.Element} The countdown display
 */
export const Countdown = ({ input, inputType = 'time', daysOnly = false, hoursOnly = false }) => {
    const [remainingTime, setRemainingTime] = React.useState(
        inputType === 'time' ? input : new Date(input) - Date.now()
    );

    React.useEffect(() => {
        const timer = remainingTime > 0 && setInterval(() => setRemainingTime(remainingTime - 1000), 1000);
        return () => clearInterval(timer);
    }, [remainingTime]);

    if (daysOnly) {
        return (
            <>
                <span className="countDown">{Math.floor(remainingTime / (1000 * 60 * 60 * 24))} days</span>
            </>
        );
    }
    if (hoursOnly) {
        return (
            <>
                <span className="countDown">{Math.floor(remainingTime / (1000 * 60 * 60))} hours</span>
            </>
        );
    }
    /* If there is no full minutes left, show only seconds */
    if (Math.floor(remainingTime / 1000 / 60) === 0) {
        return (
            <>
                <span className="countDown">{Math.floor((remainingTime / 1000) % 60)} seconds</span>
            </>
        );
    }
    /* If there is no full hours left, show minutes and seconds */
    if (Math.floor(remainingTime / (1000 * 60 * 60)) === 0) {
        return (
            <>
                <span className="countDown">
                    {Math.floor((remainingTime / 1000 / 60) % 60)} minutes and {Math.floor((remainingTime / 1000) % 60)} seconds
                </span>
            </>
        );
    }
    /* If there is no full days left, show hours, minutes and seconds */
    if (Math.floor(remainingTime / (1000 * 60 * 60 * 24)) === 0) {
        return (
            <>
                <span className="countDown">
                    {Math.floor((remainingTime / (1000 * 60 * 60)) % 24)} hours, {Math.floor((remainingTime / 1000 / 60) % 60)}{' '}
                    minutes and {Math.floor((remainingTime / 1000) % 60)} seconds
                </span>
            </>
        );
    }
    /* Else show days, minutes, hours and days */
    return (
        <>
            <span className="countDown">
                {Math.floor(remainingTime / (1000 * 60 * 60 * 24))} days, {Math.floor((remainingTime / (1000 * 60 * 60)) % 24)}{' '}
                hours, {Math.floor((remainingTime / 1000 / 60) % 60)} minutes and {Math.floor((remainingTime / 1000) % 60)} seconds
            </span>
        </>
    );
};
