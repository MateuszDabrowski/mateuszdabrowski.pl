import * as React from 'react';

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

/**
 * Moves a date forward by whole years until it lies after the given moment, so
 * a yearly date (an anniversary) always has a next occurrence to count to.
 *
 * @param {string} date - Any date that Date can parse
 * @param {number} now - The current time in milliseconds
 * @return {number} The next occurrence in milliseconds
 */
function nextYearly(date, now) {
    const next = new Date(date);
    while (next.getTime() <= now) next.setUTCFullYear(next.getUTCFullYear() + 1);
    return next.getTime();
}

/**
 * Countdown component that displays remaining time in days, hours, minutes, and seconds.
 * It stops at zero.
 *
 * The end time depends on the clock, so it is set once the page has loaded.
 * Computed during render, the static HTML (built days earlier) would disagree
 * with the browser. Until then a 'time' countdown shows its full length and a
 * 'date' countdown shows nothing.
 *
 * @param {any} input - The input time for the countdown
 * @param {string} inputType - The type of input time (default is 'time', but can also be 'date' allowing for calculation of remaining time)
 * @param {boolean} yearly - For a 'date' input, count to its next yearly occurrence once the date has passed
 * @param {boolean} daysOnly - Display only days if true
 * @param {boolean} hoursOnly - Display only hours if true
 * @return {JSX.Element} The countdown display
 */
const Countdown = ({ input, inputType = 'time', yearly = false, daysOnly = false, hoursOnly = false }) => {
    const [end, setEnd] = React.useState(null);
    const [now, setNow] = React.useState(null);

    React.useEffect(() => {
        const start = Date.now();
        if (inputType === 'time') setEnd(start + input);
        else setEnd(yearly ? nextYearly(input, start) : new Date(input).getTime());
        setNow(start);
    }, [input, inputType, yearly]);

    React.useEffect(() => {
        if (end === null || Date.now() >= end) return undefined;
        // Reads the clock on every tick: browsers slow timers down in background
        // tabs, so counting ticks would fall behind.
        const timer = setInterval(() => {
            const current = Date.now();
            setNow(current);
            if (current >= end) clearInterval(timer);
        }, SECOND);
        return () => clearInterval(timer);
    }, [end]);

    if (end === null && inputType !== 'time') return <span className="countDown" />;

    const remainingTime = end === null ? input : Math.max(0, end - now);
    const days = Math.floor(remainingTime / DAY);
    const hours = Math.floor((remainingTime / HOUR) % 24);
    const minutes = Math.floor((remainingTime / MINUTE) % 60);
    const seconds = Math.floor((remainingTime / SECOND) % 60);

    let label;
    if (daysOnly) label = `${days} days`;
    else if (hoursOnly) label = `${Math.floor(remainingTime / HOUR)} hours`;
    /* If there is no full minutes left, show only seconds */
    else if (remainingTime < MINUTE) label = `${seconds} seconds`;
    /* If there is no full hours left, show minutes and seconds */
    else if (remainingTime < HOUR) label = `${minutes} minutes and ${seconds} seconds`;
    /* If there is no full days left, show hours, minutes and seconds */
    else if (remainingTime < DAY) label = `${hours} hours, ${minutes} minutes and ${seconds} seconds`;
    /* Else show days, hours, minutes and seconds */
    else label = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;

    return <span className="countDown">{label}</span>;
};

export { Countdown }
