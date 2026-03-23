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

  return (
    <div className={styles.timelineWrapper}>
      {/* Filter bar */}
      <div
        className={styles.filterContainer}
        style={{ '--filter-columns': (() => {
          const n = eventTypes.length;
          if (n <= 3) return n;
          const maxCols = 5;
          // Find column count (2..maxCols) that gives the most balanced rows
          // (no single orphan, prefer equal row sizes)
          let best = Math.ceil(n / 2);
          let bestDiff = n; // difference between full-row size and last-row size
          for (let cols = 2; cols <= Math.min(n, maxCols); cols++) {
            const remainder = n % cols;
            if (remainder === 1) continue; // skip: would leave a single orphan
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
        <ol
          className={styles.timelineContainer}
          aria-label="Professional Experience Timeline"
        >
          {visibleEvents.map((event, index) => {
            /* Force a fresh row (clear:both) when the date changes,
               so same-date items on opposite sides align vertically. */
            const prevDate = index > 0 ? getEffectiveDate(visibleEvents[index - 1]) : null;
            const currDate = getEffectiveDate(event);
            const newRow = index === 0 || currDate !== prevDate;

            return (
              <TimelineItem
                key={event.id || index}
                event={event}
                newRow={newRow}
              />
            );
          })}
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
