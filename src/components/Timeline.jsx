import React, { useState, useMemo } from 'react';
import TimelineItem from './TimelineItem';
import styles from './AboutMe.module.css';

import { FILTER_LABELS } from './timelineUtils';

/** Extract YYYY-MM date string used for sorting and row grouping. */
function getEffectiveDate(event) {
  return (event.date || event.startDate || '').slice(0, 7);
}

function Timeline({ events = [] }) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(true);

  /* Derive unique event types (by icon) for the filter bar. */
  const eventTypes = useMemo(
    () => [...new Set(events.map((e) => e.icon).filter(Boolean))],
    [events],
  );

  /* Group tags to correctly identify them for styling */
  const industryTags = useMemo(
    () => [...new Set(events.flatMap(e => e.industry || []).filter(Boolean))],
    [events]
  );

  /* Extract all unique platform tags for the second filter row. */
  const platformTags = useMemo(() => {
    return [...new Set(events.flatMap(e => e.platform || []))].filter(Boolean);
  }, [events]);

  /* Count events per icon type. */
  const typeCounts = useMemo(
    () =>
      events.reduce((acc, e) => {
        if (e.icon) acc[e.icon] = (acc[e.icon] || 0) + 1;
        return acc;
      }, {}),
    [events],
  );

  /* Count events per tag (industry/platform). */
  const tagCounts = useMemo(
    () =>
      events.reduce((acc, e) => {
        [...(e.industry || []), ...(e.platform || [])].forEach((t) => {
          if (t) acc[t] = (acc[t] || 0) + 1;
        });
        return acc;
      }, {}),
    [events],
  );

  const sortedIndustryTags = useMemo(
    () => [...industryTags].sort((a, b) => (tagCounts[b] || 0) - (tagCounts[a] || 0)),
    [industryTags, tagCounts]
  );

  const sortedPlatformTags = useMemo(
    () => [...platformTags].sort((a, b) => (tagCounts[b] || 0) - (tagCounts[a] || 0)),
    [platformTags, tagCounts]
  );

  /* All event types are selected by default. */
  const [activeFilters, setActiveFilters] = useState(() => [...eventTypes]);
  
  /* Tag filters (industry/platform) start empty (meaning no filter applied). */
  const [activeTags, setActiveTags] = useState([]);

  const toggleFilter = (type) => {
    setActiveFilters((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  const toggleTagFilter = (tag) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const resetFilters = () => {
    setActiveFilters([...eventTypes]);
    setActiveTags([]);
  };

  const isAtDefault =
    activeTags.length === 0 &&
    activeFilters.length === eventTypes.length &&
    eventTypes.every((t) => activeFilters.includes(t));

  /* Sort newest-first and apply active filters. */
  const visibleEvents = useMemo(
    () =>
      [...events]
        .filter((e) => {
          // 1. Must match at least one active event type
          if (!activeFilters.includes(e.icon)) return false;
          
          // 2. If tag filters are selected, event must contain at least one of them
          if (activeTags.length > 0) {
            const evTags = [...(e.industry || []), ...(e.platform || [])];
            const hasMatchingTag = activeTags.some(t => evTags.includes(t));
            if (!hasMatchingTag) return false;
          }

          return true;
        })
        .sort((a, b) => {
          const dateA = new Date(a.date || a.startDate || 0).getTime();
          const dateB = new Date(b.date || b.startDate || 0).getTime();
          return dateB - dateA;
        }),
    [events, activeFilters, activeTags],
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
      {/* Filter bar inside Accordion */}
      <details 
        className={styles.filtersAccordion} 
        open 
        onToggle={(e) => setIsFiltersOpen(e.currentTarget.open)}
      >
        <summary className={styles.filtersSummary}>
          <span className={styles.hideLabel}>
            {isFiltersOpen ? 'Hide filters' : 'Show filters'}
          </span>
        </summary>
        
        <h4 className={styles.filterHeading}>Type</h4>
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
                className={`${styles.filterButton} ${styles.filterButtonType} ${isActive ? styles.filterButtonActive : ''}`}
                aria-pressed={isActive}
                title={`${typeCounts[type] || 0} items`}
              >
                {FILTER_LABELS[type] || type}
                <span className={styles.filterCount}>{typeCounts[type] || 0}</span>
              </button>
            );
          })}
        </div>

        {/* Industry Filters */}
        {industryTags.length > 0 && (
          <>
            <h4 className={styles.filterHeading}>Industry</h4>
            <div className={styles.tagFilterContainer}>
              {sortedIndustryTags.map((tag) => {
                const isActive = activeTags.includes(tag);
                return (
                  <button
                    key={tag}
                    onClick={() => toggleTagFilter(tag)}
                    className={`${styles.filterButton} ${styles.filterButtonSmall} ${styles.filterButtonIndustry} ${isActive ? styles.filterButtonIndustryActive : ''}`}
                    aria-pressed={isActive}
                    title={`${tagCounts[tag] || 0} items`}
                  >
                    {tag}
                    <span className={styles.filterCount}>{tagCounts[tag] || 0}</span>
                  </button>
                );
              })}
            </div>
          </>
        )}

        {/* Platform Filters */}
        {platformTags.length > 0 && (
          <>
            <h4 className={styles.filterHeading}>Platform</h4>
            <div className={styles.tagFilterContainer}>
              {sortedPlatformTags.map((tag) => {
                const isActive = activeTags.includes(tag);
                return (
                  <button
                    key={tag}
                    onClick={() => toggleTagFilter(tag)}
                    className={`${styles.filterButton} ${styles.filterButtonSmall} ${styles.filterButtonPlatform} ${isActive ? styles.filterButtonPlatformActive : ''}`}
                    aria-pressed={isActive}
                    title={`${tagCounts[tag] || 0} items`}
                  >
                    {tag}
                    <span className={styles.filterCount}>{tagCounts[tag] || 0}</span>
                  </button>
                );
              })}
            </div>
          </>
        )}

        {/* Reset Filters (only show if not at default) */}
        {!isAtDefault && (
          <div className={styles.resetContainer}>
            <button
              onClick={resetFilters}
              className={styles.resetButton}
              aria-label="Reset all filters to default"
            >
              Reset Filters
            </button>
          </div>
        )}
      </details>

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
