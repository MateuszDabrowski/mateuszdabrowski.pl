/**
 * Timeline.jsx
 *
 * Interactive, filterable timeline of professional events.
 *
 * Features:
 *   - Collapsible filter accordion with three filter groups:
 *       • Event type  (AND logic — must match an active type)
 *       • Industry    (OR logic — must match at least one active tag)
 *       • Platform    (OR logic — same as industry)
 *   - Year-marker dividers inserted between chronological groups
 *   - Central vertical line with arrowhead (CSS pseudo-elements)
 *   - Reset button appears only when filters deviate from defaults
 *   - Accessible: role="list", aria-pressed, aria-label
 */
import React, { useState, useMemo } from 'react';
import TimelineItem from './TimelineItem';
import styles from './AboutMe.module.css';
import { FILTER_LABELS } from './timelineUtils';

// ─── Helpers ───────────────────────────────────────────────────

/** Return the YYYY-MM portion of an event's effective date (for sorting / grouping). */
function getEffectiveDate(event) {
  return (event.date || event.startDate || '').slice(0, 7);
}

/**
 * Pick the optimal column count for a grid of `n` filter buttons.
 *
 * Avoids layouts with a single orphan in the last row.
 * Prefers 2-5 columns; falls back to ceil(n/2) when nothing fits well.
 */
function bestColumnCount(n) {
  if (n <= 3) return n;

  const MAX_COLS = 5;
  let best = Math.ceil(n / 2);
  let bestDiff = n;

  for (let cols = 2; cols <= Math.min(n, MAX_COLS); cols++) {
    const remainder = n % cols;
    if (remainder === 1) continue; // skip single-orphan layouts
    const diff = remainder === 0 ? 0 : cols - remainder;
    if (diff < bestDiff) {
      bestDiff = diff;
      best = cols;
    }
  }
  return best;
}

// ─── Component ─────────────────────────────────────────────────

function Timeline({ events = [] }) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(true);

  /* ── Derived data (memoised) ──────────────────────────────── */

  /** Unique event types (by icon), preserving original order. */
  const eventTypes = useMemo(
    () => [...new Set(events.map((e) => e.icon).filter(Boolean))],
    [events],
  );

  /** Unique industry and platform tags. */
  const industryTags = useMemo(
    () => [...new Set(events.flatMap((e) => e.industry || []))],
    [events],
  );
  const platformTags = useMemo(
    () => [...new Set(events.flatMap((e) => e.platform || []))],
    [events],
  );

  /** Event counts per icon type. */
  const typeCounts = useMemo(
    () => events.reduce((acc, e) => { if (e.icon) acc[e.icon] = (acc[e.icon] || 0) + 1; return acc; }, {}),
    [events],
  );

  /** Event counts per tag (industry + platform combined). */
  const tagCounts = useMemo(
    () => events.reduce((acc, e) => {
      [...(e.industry || []), ...(e.platform || [])].forEach((t) => { if (t) acc[t] = (acc[t] || 0) + 1; });
      return acc;
    }, {}),
    [events],
  );

  /** Tags sorted by frequency (descending) for the filter bar. */
  const sortedIndustryTags = useMemo(
    () => [...industryTags].sort((a, b) => (tagCounts[b] || 0) - (tagCounts[a] || 0)),
    [industryTags, tagCounts],
  );
  const sortedPlatformTags = useMemo(
    () => [...platformTags].sort((a, b) => (tagCounts[b] || 0) - (tagCounts[a] || 0)),
    [platformTags, tagCounts],
  );

  /* ── Filter state ─────────────────────────────────────────── */

  /** All event types are selected by default. */
  const [activeFilters, setActiveFilters] = useState(() => [...eventTypes]);

  /** Tag filters start empty — no filtering until user picks one. */
  const [activeTags, setActiveTags] = useState([]);

  const toggleFilter = (type) =>
    setActiveFilters((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]));

  const toggleTagFilter = (tag) =>
    setActiveTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));

  const resetFilters = () => {
    setActiveFilters([...eventTypes]);
    setActiveTags([]);
  };

  /** True when all filters match their default (no reset button needed). */
  const isAtDefault =
    activeTags.length === 0 &&
    activeFilters.length === eventTypes.length &&
    eventTypes.every((t) => activeFilters.includes(t));

  /* ── Filtered & sorted events ─────────────────────────────── */

  const visibleEvents = useMemo(
    () =>
      [...events]
        .filter((e) => {
          if (!activeFilters.includes(e.icon)) return false;
          if (activeTags.length > 0) {
            const evTags = [...(e.industry || []), ...(e.platform || [])];
            if (!activeTags.some((t) => evTags.includes(t))) return false;
          }
          return true;
        })
        .sort((a, b) => {
          const dateA = new Date(a.date || a.startDate || 0).getTime();
          const dateB = new Date(b.date || b.startDate || 0).getTime();
          return dateB - dateA; // newest first
        }),
    [events, activeFilters, activeTags],
  );

  /* ── Early exit ── */
  if (!events.length) {
    return <p>No events to display on the timeline.</p>;
  }

  /* ── Build timeline elements with year markers ────────────── */

  const timelineElements = [];
  let currentYear = null;

  for (let i = 0; i < visibleEvents.length; i++) {
    const event = visibleEvents[i];
    const year = getEffectiveDate(event).slice(0, 4);

    if (currentYear === null) currentYear = year;

    /* When the year changes, insert a marker for the year we just finished. */
    if (year !== currentYear) {
      timelineElements.push(
        <div key={`year-${currentYear}`} className={styles.yearMarker}>
          <span className={styles.yearLabel}>{currentYear}</span>
        </div>,
      );
      currentYear = year;
    }

    timelineElements.push(<TimelineItem key={event.id || i} event={event} />);
  }

  /* Final year marker at the bottom. */
  if (currentYear !== null) {
    timelineElements.push(
      <div key={`year-${currentYear}`} className={styles.yearMarker}>
        <span className={styles.yearLabel}>{currentYear}</span>
      </div>,
    );
  }

  /* ── Render ──────────────────────────────────────────────── */
  return (
    <div className={styles.timelineWrapper}>
      {/* ── Filter accordion ── */}
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

        {/* Event type filters (grid) */}
        <h4 className={styles.filterHeading}>Type</h4>
        <div
          className={styles.filterContainer}
          style={{ '--filter-columns': bestColumnCount(eventTypes.length) }}
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

        {/* Industry tag filters (flex wrap) */}
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

        {/* Platform tag filters (flex wrap) */}
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

        {/* Reset (only visible when filters differ from defaults) */}
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

      {/* ── Timeline body ── */}
      {visibleEvents.length > 0 ? (
        <div
          className={styles.timelineContainer}
          role="list"
          aria-label="Professional Experience Timeline"
        >
          {timelineElements}
        </div>
      ) : (
        <p className={styles.noEventsMsg}>No events match the selected filters.</p>
      )}
    </div>
  );
}

export { Timeline };
export default Timeline;
