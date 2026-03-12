import React, { useState, useMemo } from 'react';
import TimelineItem from './TimelineItem';
import styles from './Timeline.module.css';

/** Human-readable labels for icon-based filter buttons. */
const FILTER_LABELS = {
  Project: 'Project',
  Position: 'Position',
  Certification: 'Certification',
  SpeakingEvent: 'Public Speaking',
  Education: 'Education',
  Organisation: 'Organisation',
};

function Timeline({ events = [] }) {
  /* Derive unique event types (by icon) for the filter bar. */
  const eventTypes = useMemo(
    () => [...new Set(events.map((e) => e.icon).filter(Boolean))],
    [events],
  );

  /* All types are active by default. */
  const [activeFilters, setActiveFilters] = useState(eventTypes);

  const toggleFilter = (type) => {
    setActiveFilters((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  /* Sort newest-first and apply active filters. */
  const visibleEvents = useMemo(
    () =>
      [...events]
        .filter((e) => activeFilters.includes(e.icon))
        .sort((a, b) => {
          const dateA = new Date(a.date || a.startDate || 0).getTime();
          const dateB = new Date(b.date || b.startDate || 0).getTime();
          return dateB - dateA;
        }),
    [events, activeFilters],
  );

  if (!events || events.length === 0) {
    return <p>No events to display on the timeline.</p>;
  }

  return (
    <div className={styles.timelineWrapper}>
      {/* Filter bar */}
      <div className={styles.filterContainer}>
        {eventTypes.map((type) => {
          const isActive = activeFilters.includes(type);
          return (
            <button
              key={type}
              onClick={() => toggleFilter(type)}
              className={`${styles.filterButton} ${isActive ? styles.filterButtonActive : ''}`}
              aria-pressed={isActive}
            >
              {FILTER_LABELS[type] || type}
            </button>
          );
        })}
      </div>

      {/* Timeline */}
      {visibleEvents.length > 0 ? (
        <ol
          className={styles.timelineContainer}
          aria-label="Professional Experience Timeline"
        >
          {visibleEvents.map((event, index) => (
            <TimelineItem key={event.id || index} event={event} />
          ))}
        </ol>
      ) : (
        <p className={styles.noEventsMsg}>
          No events match the selected filters.
        </p>
      )}
    </div>
  );
}

export { Timeline };
export default Timeline;
