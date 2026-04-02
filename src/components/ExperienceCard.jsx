/**
 * ExperienceCard.jsx
 *
 * Shared card component used by both IndustryExperience and
 * PlatformExperience.  Displays:
 *   - Title (with slugified anchor id for TOC scrolling)
 *   - Metrics row (years of experience, project count)
 *   - Bullet lists (projects, certifications)
 *   - Categorised tag badges (platform, industry, technology)
 *
 * Each card is rendered once; the parent container handles the
 * responsive masonry layout via CSS `columns`.
 */
import React from 'react';
import styles from './AboutMe.module.css';
import { slugify } from './timelineUtils';

// ─── Sub-components ────────────────────────────────────────────

/** Key-value metric box (e.g. "4.5 / Years Exp"). */
function Metric({ value, label }) {
  return (
    <div className={styles.metric}>
      <span className={styles.metricValue}>{value}</span>
      <span className={styles.metricLabel}>{label}</span>
    </div>
  );
}

/** Bulleted list section (projects or certifications). */
function BulletList({ label, items }) {
  if (!items?.length) return null;
  return (
    <div className={styles.projectsContainer}>
      <span className={styles.tagsLabel}>{label}</span>
      <ul className={styles.projectsList}>
        {items.map((item, i) => (
          <li key={i} className={styles.projectItem}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

/**
 * A labelled row of tag badges.
 *
 * @param {string}   label     - Section heading, e.g. "Platforms".
 * @param {string[]} items     - Tag labels to display.
 * @param {string}   className - CSS module class for the colour variant.
 */
function TagGroup({ label, items, className }) {
  if (!items?.length) return null;
  return (
    <>
      <span className={styles.tagsLabel}>{label}</span>
      <div className={styles.cardTagsContainer}>
        {items.map((item) => (
          <span key={item} className={`${styles.tagBadge} ${className}`}>
            {item}
          </span>
        ))}
      </div>
    </>
  );
}

// ─── Main component ────────────────────────────────────────────

/**
 * @param {Object}   props
 * @param {string}   props.name            - Card title (also used for the anchor id).
 * @param {number}   props.yearsExperience - Total merged years.
 * @param {number}   props.totalProjects   - Project count.
 * @param {string[]} props.projects        - Deduplicated project titles.
 * @param {string[]} props.certifications  - Certification titles.
 * @param {Array<{label: string, items: string[], className: string}>} props.tagGroups
 *   Ordered list of tag sections to render (platforms, industries, technologies).
 */
export function ExperienceCard({
  name,
  yearsExperience,
  totalProjects,
  projects,
  certifications,
  tagGroups,
}) {
  return (
    <div className={styles.experienceCard}>
      <h3 id={slugify(name)} className={styles.experienceTitle}>
        {name}
      </h3>

      {/* ── Metrics ── */}
      <div className={styles.metricsRow}>
        <Metric value={yearsExperience} label="Years Exp" />
        <Metric value={totalProjects} label="Projects" />
      </div>

      {/* ── Detail sections ── */}
      <div className={styles.tagsSection}>
        <BulletList label="Projects" items={projects} />
        <BulletList label="Certifications" items={certifications} />

        {tagGroups.map(({ label, items, className }) => (
          <TagGroup
            key={label}
            label={label}
            items={items}
            className={className}
          />
        ))}
      </div>
    </div>
  );
}

export default ExperienceCard;
