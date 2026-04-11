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

// ─── Column balancing ─────────────────────────────────────────

/**
 * Estimate relative card height from content counts.
 * Weights are rough proportions: each project/cert bullet ≈ 1 line,
 * each tag ≈ 0.3 lines, plus a fixed base for title + metrics.
 */
function estimateCardWeight(card) {
  return (
    3 + // title + metrics row baseline
    (card.projects?.length || 0) +
    (card.certifications?.length || 0) +
    (card.crossTags?.length || 0) * 0.3 +
    (card.technologies?.length || 0) * 0.3
  );
}

/**
 * Split an array of cards into two columns using a greedy
 * shortest-column-first algorithm.  Cards stay in their original
 * (experience-sorted) order within each column, and each card is
 * placed into whichever column currently has the least estimated
 * content height.
 *
 * @param {Array} cards - Sorted experience data objects.
 * @returns {[Array, Array]} [leftColumn, rightColumn]
 */
export function balanceColumns(cards) {
  const left = [];
  const right = [];
  let leftWeight = 0;
  let rightWeight = 0;

  for (const card of cards) {
    const w = estimateCardWeight(card);
    if (leftWeight <= rightWeight) {
      left.push(card);
      leftWeight += w;
    } else {
      right.push(card);
      rightWeight += w;
    }
  }

  return [left, right];
}

// ─── Experience data builder ──────────────────────────────────

/**
 * Preferred vendor sort: Salesforce → Adobe → Oracle → others.
 * @param {string} name - Platform name.
 * @returns {number} Sort priority (lower = higher).
 */
function platformSortKey(name) {
  const lower = name.toLowerCase();
  if (lower.includes('salesforce')) return 1;
  if (lower.includes('adobe')) return 2;
  if (lower.includes('oracle')) return 3;
  return 4;
}

/**
 * Build aggregated experience data by bucketing events on a given tag field.
 *
 * Used by both IndustryExperience (groupBy='industry', crossTag='platform')
 * and PlatformExperience (groupBy='platform', crossTag='industry').
 *
 * @param {Array}  events   - The full timelineEvents array.
 * @param {string} groupBy  - Tag field to bucket on ('industry' or 'platform').
 * @param {string} crossTag - The other tag field to aggregate ('platform' or 'industry').
 * @returns {Array<Object>} Sorted array of experience data objects.
 */
export function buildExperienceData(events, groupBy, crossTag) {
  const buckets = new Map();

  events.forEach((event) => {
    event[groupBy]?.forEach((tag) => {
      if (!buckets.has(tag)) {
        buckets.set(tag, { name: tag, events: [], crossTags: new Set(), technologies: new Set() });
      }
      const bucket = buckets.get(tag);
      bucket.events.push(event);
      event[crossTag]?.forEach((ct) => bucket.crossTags.add(ct));
      event.technology?.forEach((t) => bucket.technologies.add(t));
    });
  });

  return Array.from(buckets.values())
    .map((bucket) => {
      const projectEvents = bucket.events.filter((e) => e.icon === 'Project');
      const certEvents = bucket.events.filter((e) => e.icon === 'Certification');

      const projects = [
        ...new Set(
          projectEvents
            .filter((e) => e.title)
            .sort((a, b) => new Date(b.startDate || 0) - new Date(a.startDate || 0))
            .map((e) => e.title),
        ),
      ];

      const crossTagsSorted = groupBy === 'industry'
        ? Array.from(bucket.crossTags).sort((a, b) => {
            const order = platformSortKey(a) - platformSortKey(b);
            return order !== 0 ? order : a.localeCompare(b);
          })
        : Array.from(bucket.crossTags).sort();

      return {
        name: bucket.name,
        totalProjects: projectEvents.length,
        yearsExperience: calculateMergedDurationInYears(projectEvents),
        projects,
        certifications: certEvents.filter((e) => e.title).map((e) => e.title),
        crossTags: crossTagsSorted,
        technologies: Array.from(bucket.technologies).sort(),
      };
    })
    .filter((d) => d.totalProjects > 0)
    .sort((a, b) => b.yearsExperience - a.yearsExperience);
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
