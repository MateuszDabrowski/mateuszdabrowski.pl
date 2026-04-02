/**
 * timelineUtils.js
 *
 * Shared utilities for the About Me page components:
 *   - Slug generation for TOC anchor ids
 *   - Docusaurus TOC builder from timeline event data
 *   - Human-readable date formatting and duration calculations
 *   - Merged-interval experience calculator
 */

// ─── Slugs & TOC ──────────────────────────────────────────────

/**
 * Convert text to a URL-friendly slug for anchor ids.
 * @param {string} text - Raw display text.
 * @returns {string} Lowercase, hyphen-separated slug.
 * @example slugify("E-commerce") // "e-commerce"
 */
export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/**
 * Build a Docusaurus-compatible TOC array from timeline events.
 *
 * Produces a flat list of `{ value, id, level }` objects for the sidebar
 * Table of Contents. Includes:
 *   - h2: Timeline, Industries, Platforms (static page sections)
 *   - h3 under Timeline: "Joined ..." position events (career milestones)
 *   - h3 under Industries: each unique industry from Project events
 *   - h3 under Platforms: each unique platform from Project events
 *
 * @param {Array} events - The full `timelineEvents` array from the MDX page.
 * @returns {Array<{value: string, id: string, level: number}>}
 */
export function buildToc(events) {
  /* Career milestones — Position events whose title starts with "Joined" */
  const careerEntries = events
    .filter((e) => e.icon === 'Position' && e.title?.startsWith('Joined'))
    .sort((a, b) => (b.date || b.startDate || '').localeCompare(a.date || a.startDate || ''))
    .map((e) => ({ value: e.organisation, id: e.id, level: 3 }));

  /* Collect unique industries and platforms from Project events only */
  const industries = new Set();
  const platforms = new Set();

  events.forEach((e) => {
    if (e.icon !== 'Project') return;
    e.industry?.forEach((i) => industries.add(i));
    e.platform?.forEach((p) => platforms.add(p));
  });

  return [
    { value: 'Timeline', id: 'timeline', level: 2 },
    ...careerEntries,
    { value: 'Industries', id: 'industries', level: 2 },
    ...[...industries].sort().map((name) => ({ value: name, id: slugify(name), level: 3 })),
    { value: 'Platforms', id: 'platforms', level: 2 },
    ...[...platforms].sort().map((name) => ({ value: name, id: slugify(name), level: 3 })),
  ];
}

// ─── Labels ────────────────────────────────────────────────────

/** Human-readable labels for event-type filter buttons and tag badges. */
export const FILTER_LABELS = {
  Project: 'Project',
  Position: 'Position',
  Certification: 'Certification',
  SpeakingEvent: 'Public Speaking',
  Education: 'Education',
  Organisation: 'Organisation',
};

// ─── Date helpers ──────────────────────────────────────────────

/**
 * Calculate a human-readable duration between two YYYY-MM date strings.
 *
 * Treats "Present" (case-insensitive) as the current date.
 * Includes the start month in the count (+1 month).
 *
 * @param {string} start - Start date, e.g. "2023-01".
 * @param {string} [end]  - End date or "Present".
 * @returns {string} e.g. " (2 yrs 3 mos)" or "" if invalid.
 */
export function calculateDuration(start, end) {
  if (!start) return '';

  const startDate = new Date(start);
  const endDate =
    end && String(end).toLowerCase() !== 'present' ? new Date(end) : new Date();

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) return '';

  const totalMonths =
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
 * Format the display date for a timeline event.
 *
 * Period events → "2023-01 – 2024-06 (1 yr 6 mos)"
 * Single events → "2023-01"
 *
 * @param {Object} event - A timeline event object.
 * @returns {string}
 */
export function formatDate(event) {
  if (event.type === 'period' && event.startDate) {
    const range = `${event.startDate} – ${event.endDate || 'Present'}`;
    return `${range}${calculateDuration(event.startDate, event.endDate)}`;
  }
  return event.date || '';
}

// ─── Experience calculation ────────────────────────────────────

/**
 * Calculate total years of experience from an array of events,
 * merging overlapping date intervals to avoid double-counting.
 *
 * Returns a number rounded to the nearest 0.5 (minimum 0.5 for
 * any non-zero duration, 0 when no valid intervals exist).
 *
 * @param {Array} events - Events with `startDate` and optional `endDate`.
 * @returns {number}
 */
export function calculateMergedDurationInYears(events) {
  /* Convert each event into a [start, end] millisecond interval */
  const intervals = events
    .map((e) => {
      if (!e.startDate) return null;
      const start = new Date(e.startDate).getTime();
      let end;
      if (e.endDate && String(e.endDate).toLowerCase() !== 'present') {
        const d = new Date(e.endDate);
        d.setMonth(d.getMonth() + 1); // include the end month
        end = d.getTime();
      } else {
        end = Date.now();
      }
      return isNaN(start) || isNaN(end) ? null : [start, end];
    })
    .filter(Boolean);

  if (intervals.length === 0) return 0;

  /* Sort by start date, then merge overlapping intervals */
  intervals.sort((a, b) => a[0] - b[0]);
  const merged = [intervals[0]];
  for (let i = 1; i < intervals.length; i++) {
    const prev = merged[merged.length - 1];
    const curr = intervals[i];
    if (curr[0] <= prev[1]) {
      prev[1] = Math.max(prev[1], curr[1]); // extend overlap
    } else {
      merged.push(curr);
    }
  }

  /* Sum merged intervals and convert to years */
  const totalMs = merged.reduce((sum, [s, e]) => sum + (e - s), 0);
  const years = totalMs / (1000 * 60 * 60 * 24 * 365.25);

  if (years === 0) return 0;

  const rounded = Math.round(years * 2) / 2; // snap to 0.5
  return rounded === 0 && years > 0 ? 0.5 : rounded;
}
