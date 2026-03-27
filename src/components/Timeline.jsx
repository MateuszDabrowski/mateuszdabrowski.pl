import React, { useState, useMemo } from 'react';
import TimelineItem from './TimelineItem';
import styles from './Timeline.module.css';

import { FILTER_LABELS, HIDDEN_BY_DEFAULT } from './constants';

/** Extract YYYY-MM date string used for sorting and row grouping. */
function getEffectiveDate(event) {
  return (event.date || event.startDate || '').slice(0, 7);
}

function Timeline({ events = [] }) {
  /* Derive unique event types (by icon) for the filter bar. */
  const eventTypes = useMemo(
    () => [...new Set(events.map((e) => e.icon).filter(Boolean))],
    [events],
  );

  /* Count events per icon type. */
  const typeCounts = useMemo(
    () =>
      events.reduce((acc, e) => {
        if (e.icon) acc[e.icon] = (acc[e.icon] || 0) + 1;
        return acc;
      }, {}),
    [events],
  );

  /* Exclude HIDDEN_BY_DEFAULT types on first render. */
  const [activeFilters, setActiveFilters] = useState(() =>
    eventTypes.filter((t) => !HIDDEN_BY_DEFAULT.includes(t)),
  );

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

  /*
   * Build timeline elements: floated event items with year markers.
   * Year markers appear AFTER all events of that year (marking the
   * chronological start of the year in this reverse-chronological display).
   */
  const timelineElements = [];
  let currentYear = null;

  for (let i = 0; i < visibleEvents.length; i++) {
    const event = visibleEvents[i];
    const year = getEffectiveDate(event).slice(0, 4);

    /* Track the current year — we'll insert its marker when we leave it. */
    if (currentYear === null) {
      currentYear = year;
    }

    /* When the year changes, insert a marker for the year we just finished. */
    if (year !== currentYear) {
      timelineElements.push(
        <div key={`year-${currentYear}`} className={styles.yearMarker}>
          <span className={styles.yearLabel}>{currentYear}</span>
        </div>,
      );
      currentYear = year;
    }

    timelineElements.push(
      <TimelineItem key={event.id || i} event={event} />,
    );
  }

  /* Insert the final year marker at the very bottom. */
  if (currentYear !== null) {
    timelineElements.push(
      <div key={`year-${currentYear}`} className={styles.yearMarker}>
        <span className={styles.yearLabel}>{currentYear}</span>
      </div>,
    );
  }

  return (
    <div className={styles.timelineWrapper}>
      {/* Filter bar */}
      <div
        className={styles.filterContainer}
        style={{ '--filter-columns': (() => {
          const n = eventTypes.length;
          if (n <= 3) return n;
          const maxCols = 5;
          let best = Math.ceil(n / 2);
          let bestDiff = n;
          for (let cols = 2; cols <= Math.min(n, maxCols); cols++) {
            const remainder = n % cols;
            if (remainder === 1) continue;
            const diff = remainder === 0 ? 0 : cols - remainder;
            if (diff < bestDiff) {
              bestDiff = diff;
              best = cols;
            }
          }
          return best;
        })() }}
      >
        {eventTypes.map((type) => {
          const isActive = activeFilters.includes(type);
          return (
            <button
              key={type}
              onClick={() => toggleFilter(type)}
              className={`${styles.filterButton} ${isActive ? styles.filterButtonActive : ''}`}
              aria-pressed={isActive}
              title={`${typeCounts[type] || 0} items`}
            >
              {FILTER_LABELS[type] || type}
              <span className={styles.filterCount}>{typeCounts[type] || 0}</span>
            </button>
          );
        })}
      </div>

      {/* Timeline */}
      {visibleEvents.length > 0 ? (
        <div
          className={styles.timelineContainer}
          role="list"
          aria-label="Professional Experience Timeline"
        >
          {timelineElements}
        </div>
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
