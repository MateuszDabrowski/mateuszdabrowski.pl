import React from 'react';
import styles from './Timeline.module.css';
import { Icons } from './Icons';

function TimelineItem({ event }) {
  // Determine if it's placed on the left side or right side based on the new types
  const isLeftSide = event.type === 'period';
  const positionClass = isLeftSide ? styles.leftSide : styles.rightSide;

  // Dynamic icon component mapping.
  const IconComponent = Icons[event.icon] || Icons.Default;

  // Duration calculation helper
  const calculateDuration = (start, end) => {
    if (!start) return '';

    const startDate = new Date(start);
    let endDate = new Date();

    if (end && String(end).toLowerCase() !== 'present') {
      endDate = new Date(end);
    }

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) return '';

    let months = (endDate.getFullYear() - startDate.getFullYear()) * 12;
    months -= startDate.getMonth();
    months += endDate.getMonth();
    // Add 1 to be inclusive of the starting month
    months += 1;

    if (months <= 0) return '';

    const years = Math.floor(months / 12);
    const remMonths = months % 12;

    const parts = [];
    if (years > 0) parts.push(`${years} yr${years > 1 ? 's' : ''}`);
    if (remMonths > 0) parts.push(`${remMonths} mo${remMonths > 1 ? 's' : ''}`);

    return ` (${parts.join(' ')})`;
  };

  return (
    <li className={`${styles.itemContainer} ${positionClass}`}>
      {/* Icon placed on the central timeline line */}
      <div className={styles.iconContainer} aria-hidden="true">
        <IconComponent />
      </div>

      {/* Docusaurus Card structure to fit the site theme seamlessly */}
      <article className={`${styles.cardContent} card shadow--md`}>
        <div className="card__header">
          <h3>
            {event.url ? (
              <a href={event.url} target="_blank" rel="noopener noreferrer">{event.title}</a>
            ) : (
              event.title
            )}
          </h3>
          {event.organisation && <h4 className={styles.organisation}>{event.organisation}</h4>}
          <time className={styles.eventDate}>
            {isLeftSide && event.startDate
              ? `${event.startDate} - ${event.endDate || 'Present'}${calculateDuration(event.startDate, event.endDate)}`
              : event.date}
          </time>
        </div>

        <div className="card__body">
          <p>{event.description}</p>
        </div>

        {event.tags && event.tags.length > 0 && (
          <div className={`card__footer ${styles.cardFooter}`}>
            <div className={styles.tagsContainer}>
              {event.tags.map((tag, idx) => (
                <span key={idx} className="badge badge--secondary margin-right--sm margin-bottom--sm">
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
