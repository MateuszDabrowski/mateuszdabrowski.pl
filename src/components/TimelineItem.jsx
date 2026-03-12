import React from 'react';
import styles from './Timeline.module.css';
import { Icons } from './Icons';

/**
 * Calculate a human-readable duration string between two dates.
 * Returns e.g. " (2 yrs 3 mos)" or an empty string if inputs are invalid.
 */
function calculateDuration(start, end) {
  if (!start) return '';

  const startDate = new Date(start);
  const endDate =
    end && String(end).toLowerCase() !== 'present' ? new Date(end) : new Date();

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) return '';

  let totalMonths =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth()) +
    1; // +1 to include the starting month

  if (totalMonths <= 0) return '';

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  const parts = [];
  if (years > 0) parts.push(`${years} yr${years > 1 ? 's' : ''}`);
  if (months > 0) parts.push(`${months} mo${months > 1 ? 's' : ''}`);

  return ` (${parts.join(' ')})`;
}

/**
 * Format the date display for an event.
 * Period events show a date range with duration; single events show a single date.
 */
function formatDate(event, isPeriod) {
  if (isPeriod && event.startDate) {
    const range = `${event.startDate} – ${event.endDate || 'Present'}`;
    return `${range}${calculateDuration(event.startDate, event.endDate)}`;
  }
  return event.date || '';
}

function TimelineItem({ event }) {
  const isPeriod = event.type === 'period';
  const sideClass = isPeriod ? styles.leftSide : styles.rightSide;
  const IconComponent = Icons[event.icon] || Icons.Default;

  return (
    <li className={`${styles.itemContainer} ${sideClass}`}>
      {/* Icon beside the central timeline line */}
      <div className={styles.iconContainer} aria-hidden="true">
        <IconComponent />
      </div>

      {/* Card */}
      <article className={`${styles.cardContent} card shadow--md`}>
        <div className="card__header">
          <h3>
            {event.url ? (
              <a href={event.url} target="_blank" rel="noopener noreferrer">
                {event.title}
              </a>
            ) : (
              event.title
            )}
          </h3>
          {event.organisation && (
            <h4 className={styles.organisation}>{event.organisation}</h4>
          )}
          <time className={styles.eventDate}>
            {formatDate(event, isPeriod)}
          </time>
        </div>

        <div className="card__body">
          <p>{event.description}</p>
        </div>

        {event.tags?.length > 0 && (
          <div className="card__footer">
            <div className={styles.tagsContainer}>
              {event.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="badge badge--secondary margin-right--sm margin-bottom--sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>
    </li>
  );
}

export { TimelineItem };
export default TimelineItem;
