/**
 * IndustryExperience.jsx
 *
 * Groups timeline events by industry tag and renders a summary card
 * for each industry that has at least one Project event.
 *
 * Cards display: years of merged experience, project count,
 * project / certification lists, and platform / technology tags.
 * Sorted by years of experience (descending).
 *
 * The responsive two-column masonry layout is handled entirely
 * by CSS `columns` on the container — each card is rendered once.
 */
import React, { useMemo } from 'react';
import styles from './AboutMe.module.css';
import { ExperienceCard } from './ExperienceCard';
import { calculateMergedDurationInYears } from './timelineUtils';

// ─── Helpers ───────────────────────────────────────────────────

/** Preferred vendor sort: Salesforce → Adobe → Oracle → others. */
function platformSortKey(name) {
  const lower = name.toLowerCase();
  if (lower.includes('salesforce')) return 1;
  if (lower.includes('adobe')) return 2;
  if (lower.includes('oracle')) return 3;
  return 4;
}

// ─── Component ─────────────────────────────────────────────────

export function IndustryExperience({ events = [] }) {
  const industryData = useMemo(() => {
    /* ── Step 1: bucket every event by its industry tags ── */
    const buckets = new Map();

    events.forEach((event) => {
      event.industry?.forEach((ind) => {
        if (!buckets.has(ind)) {
          buckets.set(ind, { name: ind, events: [], platforms: new Set(), technologies: new Set() });
        }
        const bucket = buckets.get(ind);
        bucket.events.push(event);
        event.platform?.forEach((p) => bucket.platforms.add(p));
        event.technology?.forEach((t) => bucket.technologies.add(t));
      });
    });

    /* ── Step 2: compute per-industry aggregates ── */
    return Array.from(buckets.values())
      .map((bucket) => {
        const projectEvents = bucket.events.filter((e) => e.icon === 'Project');
        const certEvents = bucket.events.filter((e) => e.icon === 'Certification');

        /* Deduplicated project titles, newest first */
        const projects = [
          ...new Set(
            projectEvents
              .filter((e) => e.title)
              .sort((a, b) => new Date(b.startDate || 0) - new Date(a.startDate || 0))
              .map((e) => e.title),
          ),
        ];

        /* Platforms sorted by preferred vendor order, then alphabetically */
        const platforms = Array.from(bucket.platforms).sort((a, b) => {
          const order = platformSortKey(a) - platformSortKey(b);
          return order !== 0 ? order : a.localeCompare(b);
        });

        return {
          name: bucket.name,
          totalProjects: projectEvents.length,
          yearsExperience: calculateMergedDurationInYears(projectEvents),
          projects,
          certifications: certEvents.filter((e) => e.title).map((e) => e.title),
          platforms,
          technologies: Array.from(bucket.technologies).sort(),
        };
      })
      .filter((d) => d.totalProjects > 0)
      .sort((a, b) => b.yearsExperience - a.yearsExperience);
  }, [events]);

  /* ── Render ── */
  if (!industryData.length) return null;

  return (
    <div className={styles.experienceContainer}>
      {industryData.map((data) => (
        <ExperienceCard
          key={data.name}
          name={data.name}
          yearsExperience={data.yearsExperience}
          totalProjects={data.totalProjects}
          projects={data.projects}
          certifications={data.certifications}
          tagGroups={[
            { label: 'Platforms', items: data.platforms, className: styles.tagPlatform },
            { label: 'Technologies', items: data.technologies, className: styles.tagTech },
          ]}
        />
      ))}
    </div>
  );
}

export default IndustryExperience;
