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
