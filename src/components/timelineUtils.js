/**
 * timelineUtils.js
 *
 * Shared utilities for the About Me page components:
 *   - Slug generation for TOC anchor ids
 *   - Docusaurus TOC builder from timeline event data
 *   - Human-readable date formatting and duration calculations
 *   - Merged-interval experience calculator
 *   - Vendor grouping and column balancing for experience cards
 */

// ─── Constants ────────────────────────────────────────────────

/** Ordered list of known platform vendors for grouping and sorting. */
export const VENDOR_ORDER = ['Salesforce', 'Adobe', 'Oracle'];

/** Human-readable labels for event-type filter buttons and tag badges. */
export const FILTER_LABELS = {
  Project: 'Project',
  Position: 'Position',
  Certification: 'Certification',
  SpeakingEvent: 'Public Speaking',
  Education: 'Education',
  Organisation: 'Organisation',
};

// ─── Slugs & TOC ──────────────────────────────────────────────

/**
 * Convert text to a URL-friendly slug for anchor ids.
 * @param {string} text
 * @returns {string} Lowercase, hyphen-separated slug.
 */
export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/**
 * Build a Docusaurus-compatible TOC array from timeline events.
 * @param {Array} events - The full `timelineEvents` array from the MDX page.
 * @returns {Array<{value: string, id: string, level: number}>}
 */
export function buildToc(events) {
  const careerEntries = events
    .filter((e) => e.icon === 'Position' && e.title?.startsWith('Joined'))
    .sort((a, b) => (b.date || b.startDate || '').localeCompare(a.date || a.startDate || ''))
    .map((e) => ({ value: e.organisation, id: e.id, level: 3 }));

  const industries = new Set();
  const platforms = new Set();

  events.forEach((e) => {
    if (e.icon !== 'Project') return;
    e.industry?.forEach((i) => industries.add(i));
    e.platform?.forEach((p) => platforms.add(p));
  });

  const platformEntries = buildVendorSections(
    [...platforms],
    (name) => name,
    (name) => ({ value: name, id: slugify(name), level: 4 }),
    (vendor) => ({ value: vendor, id: slugify(vendor), level: 3 }),
  );

  return [
    { value: 'Timeline', id: 'timeline', level: 2 },
    ...careerEntries,
    { value: 'Industries', id: 'industries', level: 2 },
    ...[...industries].sort().map((name) => ({ value: name, id: slugify(name), level: 3 })),
    { value: 'Platforms', id: 'platforms', level: 2 },
    ...platformEntries,
  ];
}

// ─── Vendor grouping ─────────────────────────────────────────

/**
 * Map a platform name to its vendor group.
 * @param {string} name - Platform name.
 * @returns {string} Vendor group name or the original name for standalone platforms.
 */
export function platformVendorGroup(name) {
  for (const vendor of VENDOR_ORDER) {
    if (name.startsWith(vendor)) return vendor;
  }
  return name;
}

/**
 * Sort priority for vendor-aware ordering. Lower = higher priority.
 * Delegates to platformVendorGroup so matching logic stays in one place.
 */
function platformSortKey(name) {
  const vendor = platformVendorGroup(name);
  const idx = VENDOR_ORDER.indexOf(vendor);
  return idx >= 0 ? idx + 1 : VENDOR_ORDER.length + 1;
}

/**
 * Group items into ordered vendor sections.
 *
 * @param {Array}    items       - Items to group.
 * @param {Function} getName     - Extract the platform name from an item.
 * @param {Function} mapItem     - Transform an item for inclusion in a section.
 * @param {Function} mapHeader   - Create a section header from a vendor name.
 * @returns {Array} Flat array of headers interleaved with mapped items.
 */
export function buildVendorSections(items, getName, mapItem, mapHeader) {
  const groups = new Map();
  for (const item of items) {
    const vendor = platformVendorGroup(getName(item));
    if (!groups.has(vendor)) groups.set(vendor, []);
    groups.get(vendor).push(item);
  }

  const result = [];
  for (const vendor of VENDOR_ORDER) {
    if (!groups.has(vendor)) continue;
    const vendorItems = groups.get(vendor).sort((a, b) => getName(a).localeCompare(getName(b)));
    result.push(mapHeader(vendor));
    vendorItems.forEach((item) => result.push(mapItem(item)));
    groups.delete(vendor);
  }

  const remaining = Array.from(groups.values()).flat();
  if (remaining.length) {
    remaining.sort((a, b) => getName(a).localeCompare(getName(b)));
    result.push(mapHeader('Other'));
    remaining.forEach((item) => result.push(mapItem(item)));
  }

  return result;
}

// ─── Date helpers ──────────────────────────────────────────────

/**
 * Calculate a human-readable duration between two YYYY-MM date strings.
 * Treats "Present" (case-insensitive) as the current date.
 *
 * @param {string} start - Start date, e.g. "2023-01".
 * @param {string} [end]  - End date or "Present".
 * @returns {string} e.g. " (2 years 3 months)" or "" if invalid.
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
    1; // include the starting month

  if (totalMonths <= 0) return '';

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const parts = [];
  if (years > 0) parts.push(`${years} year${years > 1 ? 's' : ''}`);
  if (months > 0) parts.push(`${months} month${months > 1 ? 's' : ''}`);

  return ` (${parts.join(' ')})`;
}

/**
 * Format the display date for a timeline event.
 *
 * Period events → "2023-01 – 2024-06 (1 year 6 months)"
 * Single events → "2023-01"
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
 * Estimate the number of visual lines a bullet item occupies.
 * A half-column is roughly 40 characters wide; longer titles wrap.
 */
function bulletWeight(item) {
  const len = (typeof item === 'string' ? item : item?.title || '').length;
  return Math.max(1, Math.ceil(len / 40));
}

/** Estimate relative card height for column balancing. */
function estimateCardWeight(card) {
  const allBullets = [
    ...(card.projects || []),
    ...(card.certifications || []),
    ...(card.speakingEngagements || []),
  ];
  const bulletLines = allBullets.reduce((sum, item) => sum + bulletWeight(item), 0);

  const sectionCount =
    (card.projects?.length ? 1 : 0) +
    (card.certifications?.length ? 1 : 0) +
    (card.speakingEngagements?.length ? 1 : 0) +
    (card.crossTags?.length ? 1 : 0) +
    (card.technologies?.length ? 1 : 0);

  return (
    3 + // title + metrics baseline
    sectionCount +
    bulletLines +
    (card.crossTags?.length || 0) * 0.3 +
    (card.technologies?.length || 0) * 0.3
  );
}

/**
 * Split cards into two balanced columns using a greedy shortest-column-first
 * algorithm, preserving the original sort order within each column.
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
 * Extract {id, title} from events that have a title.
 * @param {Array} events
 * @returns {Array<{id: string, title: string}>}
 */
function pickIdTitle(events) {
  return events.filter((e) => e.title).map((e) => ({ id: e.id, title: e.title }));
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
      // Single-pass classification by event type
      const projectEvents = [];
      const certEvents = [];
      const speakingEvents = [];
      for (const e of bucket.events) {
        if (e.icon === 'Project') projectEvents.push(e);
        else if (e.icon === 'Certification') certEvents.push(e);
        else if (e.icon === 'SpeakingEvent') speakingEvents.push(e);
      }

      const seenProjectTitles = new Set();
      const projects = projectEvents
        .filter((e) => e.title)
        .sort((a, b) => (b.startDate || '').localeCompare(a.startDate || ''))
        .reduce((acc, e) => {
          if (!seenProjectTitles.has(e.title)) {
            seenProjectTitles.add(e.title);
            acc.push({ id: e.id, title: e.title });
          }
          return acc;
        }, []);

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
        certifications: pickIdTitle(certEvents),
        speakingEngagements: pickIdTitle(speakingEvents),
        crossTags: crossTagsSorted,
        technologies: Array.from(bucket.technologies).sort(),
      };
    })
    .filter((d) => d.totalProjects > 0)
    .sort((a, b) => {
      const expDiff = b.yearsExperience - a.yearsExperience;
      if (expDiff !== 0) return expDiff;
      return platformSortKey(a.name) - platformSortKey(b.name);
    });
}

// ─── Experience calculation ────────────────────────────────────

/**
 * Calculate total years of experience from an array of events,
 * merging overlapping date intervals to avoid double-counting.
 *
 * @param {Array} events - Events with `startDate` and optional `endDate`.
 * @returns {number} Years rounded to nearest 0.5 (min 0.5 for non-zero).
 */
export function calculateMergedDurationInYears(events) {
  const intervals = events
    .map((e) => {
      if (!e.startDate) return null;
      const start = new Date(e.startDate).getTime();
      let end;
      if (e.endDate && String(e.endDate).toLowerCase() !== 'present') {
        const d = new Date(e.endDate);
        d.setMonth(d.getMonth() + 1);
        end = d.getTime();
      } else {
        end = Date.now();
      }
      return isNaN(start) || isNaN(end) ? null : [start, end];
    })
    .filter(Boolean);

  if (intervals.length === 0) return 0;

  intervals.sort((a, b) => a[0] - b[0]);
  const merged = [intervals[0]];
  for (let i = 1; i < intervals.length; i++) {
    const prev = merged[merged.length - 1];
    const curr = intervals[i];
    if (curr[0] <= prev[1]) {
      prev[1] = Math.max(prev[1], curr[1]);
    } else {
      merged.push(curr);
    }
  }

  const totalMs = merged.reduce((sum, [s, e]) => sum + (e - s), 0);
  const years = totalMs / (1000 * 60 * 60 * 24 * 365.25);

  if (years === 0) return 0;
  const rounded = Math.round(years * 2) / 2;
  return rounded === 0 && years > 0 ? 0.5 : rounded;
}
