import React from 'react';
import TimelineItem from './TimelineItem';
import styles from './Timeline.module.css';

function Timeline({ events = [] }) {
  // Sort events by chronological order descending (newest first)
  const sortedEvents = [...events].sort((a, b) => {
    // Sort exclusively based on when the event occurred/started 
    const dateA = new Date(a.date || a.startDate || 0).getTime();
    const dateB = new Date(b.date || b.startDate || 0).getTime();
    return dateB - dateA;
  });

  if (!events || events.length === 0) {
    return <p>No events to display on the timeline.</p>;
  }

  return (
    <div className={styles.timelineWrapper}>
      <ol className={styles.timelineContainer} aria-label="Professional Experience Timeline">
        {sortedEvents.map((event, index) => (
          <TimelineItem key={event.id || index} event={event} />
        ))}
      </ol>
    </div>
  );
}

export { Timeline };
export default Timeline;
