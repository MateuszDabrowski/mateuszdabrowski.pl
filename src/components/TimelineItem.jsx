/**
 * TimelineItem.jsx
 *
 * Renders a single event card within the Timeline.
 * Each card displays an icon, title, organisation, date range (with
 * calculated duration for period events), description, and categorised
 * tag badges (type, industry, platform, technology).
 *
 * The event's `id` field is placed on the <h3> to serve as a TOC
 * scroll target for "Joined" career-milestone entries.
 */
import React from 'react';
import styles from './AboutMe.module.css';
import { Icons } from './Icons';
import { FILTER_LABELS, formatDate } from './timelineUtils';

// ─── Tag badge helper ──────────────────────────────────────────

/**
 * Tag variant → CSS module class mapping.
 * Each variant gets `.tagBadge` as the base plus a colour class.
 */
const TAG_VARIANTS = {
  type: styles.tagType,
  industry: styles.tagIndustry,
  platform: styles.tagPlatform,
  tech: styles.tagTech,
};

/**
 * Render an array of strings as coloured tag badges.
 *
 * @param {string[]}  items   - Tag labels to display.
 * @param {'type'|'industry'|'platform'|'tech'} variant - Colour variant.
 * @param {string}    prefix  - Key prefix for React reconciliation.
 */
function renderTags(items, variant, prefix) {
  if (!items?.length) return null;
  const variantClass = TAG_VARIANTS[variant];
  return items.map((label, i) => (
    <span
      key={`${prefix}-${i}`}
      className={`${styles.tagBadge} ${variantClass} margin-right--sm margin-bottom--sm`}
    >
      {label}
    </span>
  ));
}

// ─── Component ─────────────────────────────────────────────────

function TimelineItem({ event }) {
  const IconComponent = Icons[event.icon] || Icons.Default;
  const typeLabel = FILTER_LABELS[event.icon] || event.icon;

  return (
    <div className={styles.itemContainer} role="listitem">
      <article className={`${styles.cardContent} card shadow--md`}>
        {/* ── Header: icon + title + org + date ── */}
        <div className="card__header">
          <div className={styles.cardTitleRow}>
            <span className={styles.inlineIcon} aria-hidden="true">
              <IconComponent />
            </span>
            <h3 id={event.id || undefined}>
              {event.url ? (
                <a href={event.url} target="_blank" rel="noopener noreferrer">
                  {event.title}
                </a>
              ) : (
                event.title
              )}
            </h3>
          </div>

          {event.organisation && (
            <h4 className={styles.organisation}>{event.organisation}</h4>
          )}

          <time className={styles.eventDate}>{formatDate(event)}</time>
        </div>

        {/* ── Body: description ── */}
        <div className="card__body">
          <p className={styles.descriptionText}>{event.description}</p>
        </div>

        {/* ── Footer: tag badges ── */}
        <div className="card__footer">
          <div className={styles.tagsContainer}>
            {renderTags([typeLabel], 'type', 'type')}
            {renderTags(event.industry, 'industry', 'ind')}
            {renderTags(event.platform, 'platform', 'plat')}
            {renderTags(event.technology, 'tech', 'tech')}
          </div>
        </div>
      </article>
    </div>
  );
}

export { TimelineItem };
export default TimelineItem;
