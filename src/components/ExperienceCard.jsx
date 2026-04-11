/**
 * ExperienceCard.jsx
 *
 * Shared card component used by both IndustryExperience and
 * PlatformExperience.  Displays:
 *   - Title (with slugified anchor id for TOC scrolling)
 *   - Metrics row (years of experience, project count)
 *   - Linked bullet lists (projects, certifications, speaking engagements)
 *   - Categorised tag badges (platform, industry, technology)
 *
 * The parent container handles the two-column layout via flex + balanceColumns.
 */
import React from 'react';
import styles from './AboutMe.module.css';
import { slugify } from './timelineUtils';

// ─── Sub-components ────────────────────────────────────────────

function Metric({ value, label }) {
  return (
    <div className={styles.metric}>
      <span className={styles.metricValue}>{value}</span>
      <span className={styles.metricLabel}>{label}</span>
    </div>
  );
}

/** Bulleted list section with items linking to timeline anchors. */
function BulletList({ label, items }) {
  if (!items?.length) return null;
  return (
    <div className={styles.projectsContainer}>
      <span className={styles.tagsLabel}>{label}</span>
      <ul className={styles.projectsList}>
        {items.map((item, i) => (
          <li key={item.id || i} className={styles.projectItem}>
            {item.id ? (
              <a href={`#${item.id}`}>{item.title}</a>
            ) : (
              item.title || item
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

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
 * @param {Array<{label: string, items: Array<{id: string, title: string}>}>} props.bulletSections
 *   Ordered list of linked bullet-list sections (projects, certifications, speaking engagements).
 * @param {Array<{label: string, items: string[], className: string}>} props.tagGroups
 *   Ordered list of tag badge sections (platforms, industries, technologies).
 */
export const ExperienceCard = React.memo(function ExperienceCard({
  name,
  yearsExperience,
  totalProjects,
  bulletSections,
  tagGroups,
}) {
  return (
    <div className={styles.experienceCard}>
      <h3 id={slugify(name)} className={styles.experienceTitle}>
        {name}
      </h3>

      <div className={styles.metricsRow}>
        <Metric value={yearsExperience} label="Years Exp" />
        <Metric value={totalProjects} label="Projects" />
      </div>

      <div className={styles.tagsSection}>
        {bulletSections.map(({ label, items }) => (
          <BulletList key={label} label={label} items={items} />
        ))}

        {tagGroups.map(({ label, items, className }) => (
          <TagGroup key={label} label={label} items={items} className={className} />
        ))}
      </div>
    </div>
  );
});

export default ExperienceCard;
