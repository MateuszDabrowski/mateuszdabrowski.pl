/**
 * PlatformExperience.jsx
 *
 * Groups timeline events by platform tag and renders a summary card
 * for each platform that has at least one Project event.
 *
 * Cards display: years of merged experience, project count,
 * project / certification lists, and industry / technology tags.
 * Sorted by years of experience (descending).
 *
 * The responsive two-column masonry layout is handled entirely
 * by CSS `columns` on the container — each card is rendered once.
 */
import React, { useMemo } from 'react';
import styles from './AboutMe.module.css';
import { ExperienceCard } from './ExperienceCard';
import { calculateMergedDurationInYears } from './timelineUtils';

// ─── Component ─────────────────────────────────────────────────

export function PlatformExperience({ events = [] }) {
  const platformData = useMemo(() => {
    /* ── Step 1: bucket every event by its platform tags ── */
    const buckets = new Map();

    events.forEach((event) => {
      event.platform?.forEach((plat) => {
        if (!buckets.has(plat)) {
          buckets.set(plat, { name: plat, events: [], industries: new Set(), technologies: new Set() });
        }
        const bucket = buckets.get(plat);
        bucket.events.push(event);
        event.industry?.forEach((i) => bucket.industries.add(i));
        event.technology?.forEach((t) => bucket.technologies.add(t));
      });
    });

    /* ── Step 2: compute per-platform aggregates ── */
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

        return {
          name: bucket.name,
          totalProjects: projectEvents.length,
          yearsExperience: calculateMergedDurationInYears(projectEvents),
          projects,
          certifications: certEvents.filter((e) => e.title).map((e) => e.title),
          industries: Array.from(bucket.industries).sort(),
          technologies: Array.from(bucket.technologies).sort(),
        };
      })
      .filter((d) => d.totalProjects > 0)
      .sort((a, b) => b.yearsExperience - a.yearsExperience);
  }, [events]);

  /* ── Render ── */
  if (!platformData.length) return null;

  return (
    <div className={styles.experienceContainer}>
      {platformData.map((data) => (
        <ExperienceCard
          key={data.name}
          name={data.name}
          yearsExperience={data.yearsExperience}
          totalProjects={data.totalProjects}
          projects={data.projects}
          certifications={data.certifications}
          tagGroups={[
            { label: 'Industries', items: data.industries, className: styles.tagIndustry },
            { label: 'Technologies', items: data.technologies, className: styles.tagTech },
          ]}
        />
      ))}
    </div>
  );
}

export default PlatformExperience;
