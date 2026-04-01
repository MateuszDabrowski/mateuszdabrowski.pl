/** Convert a string to a URL-friendly slug. */
export function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

/**
 * Build a Docusaurus-compatible TOC array from timeline events.
 * Includes the static h2 headings and dynamic h3 entries for industries/platforms.
 */
export function buildToc(events) {
  // "Joined" position events mark career changes — show company name in TOC
  const careerEntries = events
    .filter((e) => e.icon === 'Position' && e.title && e.title.startsWith('Joined'))
    .sort((a, b) => (b.date || b.startDate || '').localeCompare(a.date || a.startDate || ''))
    .map((e) => ({
      value: e.organisation,
      id: e.id,
      level: 3,
    }));

  const industries = new Set();
  const platforms = new Set();

  events.forEach((e) => {
    if (e.icon !== 'Project') return;
    if (e.industry) e.industry.forEach((i) => industries.add(i));
    if (e.platform) e.platform.forEach((p) => platforms.add(p));
  });

  return [
    { value: 'Timeline', id: 'timeline', level: 2 },
    ...careerEntries,
    { value: 'Industries', id: 'industries', level: 2 },
    ...[...industries].sort().map((name) => ({
      value: name,
      id: slugify(name),
      level: 3,
    })),
    { value: 'Platforms', id: 'platforms', level: 2 },
    ...[...platforms].sort().map((name) => ({
      value: name,
      id: slugify(name),
      level: 3,
    })),
  ];
}

/** Human-readable labels for icon-based filter buttons and type tags. */
export const FILTER_LABELS = {
  Project: 'Project',
  Position: 'Position',
  Certification: 'Certification',
  SpeakingEvent: 'Public Speaking',
  Education: 'Education',
  Organisation: 'Organisation',
};

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
      if (isNaN(start) || isNaN(end)) return null;
      return [start, end];
    })
    .filter(Boolean);

  if (intervals.length === 0) return 0;

  intervals.sort((a, b) => a[0] - b[0]);

  const merged = [intervals[0]];
  for (let i = 1; i < intervals.length; i++) {
    const current = intervals[i];
    const lastMerged = merged[merged.length - 1];

    if (current[0] <= lastMerged[1]) {
      lastMerged[1] = Math.max(lastMerged[1], current[1]);
    } else {
      merged.push(current);
    }
  }

  const totalMs = merged.reduce((sum, interval) => sum + (interval[1] - interval[0]), 0);
  const msInYear = 1000 * 60 * 60 * 24 * 365.25;
  const years = totalMs / msInYear;
  
  if (years === 0) return 0;
  
  let rounded = Math.round(years * 2) / 2;
  if (rounded === 0 && years > 0) return 0.5;
  
  return rounded;
}
