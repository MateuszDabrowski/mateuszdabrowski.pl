/**
 * PlatformExperience.jsx
 *
 * Groups timeline events by platform tag and renders a summary card
 * for each platform, organised into vendor sections (Salesforce, Adobe,
 * Oracle, Other) with balanced two-column layouts within each section.
 */
import React, { useMemo } from 'react';
import styles from './AboutMe.module.css';
import { ExperienceCard } from './ExperienceCard';
import {
  buildExperienceData,
  buildVendorSections,
  balanceColumns,
  slugify,
} from './timelineUtils';

function buildBulletSections(data) {
  return [
    { label: 'Projects', items: data.projects },
    { label: 'Certifications', items: data.certifications },
    { label: 'Speaking Engagements', items: data.speakingEngagements },
  ];
}

function buildTagGroups(data) {
  return [
    { label: 'Industries', items: data.crossTags, className: styles.tagIndustry },
    { label: 'Technologies', items: data.technologies, className: styles.tagTech },
  ];
}

function BalancedCardGrid({ cards }) {
  const [left, right] = useMemo(() => balanceColumns(cards), [cards]);
  return (
    <div className={styles.experienceContainer}>
      <div className={styles.experienceColumn}>
        {left.map((data) => (
          <ExperienceCard
            key={data.name}
            name={data.name}
            yearsExperience={data.yearsExperience}
            totalProjects={data.totalProjects}
            bulletSections={buildBulletSections(data)}
            tagGroups={buildTagGroups(data)}
          />
        ))}
      </div>
      <div className={styles.experienceColumn}>
        {right.map((data) => (
          <ExperienceCard
            key={data.name}
            name={data.name}
            yearsExperience={data.yearsExperience}
            totalProjects={data.totalProjects}
            bulletSections={buildBulletSections(data)}
            tagGroups={buildTagGroups(data)}
          />
        ))}
      </div>
    </div>
  );
}

export function PlatformExperience({ events = [] }) {
  const platformData = useMemo(
    () => buildExperienceData(events, 'platform', 'industry'),
    [events],
  );

  const sections = useMemo(
    () =>
      buildVendorSections(
        platformData,
        (card) => card.name,
        (card) => card,
        (vendor) => vendor,
      ),
    [platformData],
  );

  if (!platformData.length) return null;

  // Group flat sections array back into { vendor, cards[] } pairs
  const vendorGroups = useMemo(() => {
    const groups = [];
    let current = null;
    for (const item of sections) {
      if (typeof item === 'string') {
        current = { vendor: item, cards: [] };
        groups.push(current);
      } else {
        current.cards.push(item);
      }
    }
    return groups;
  }, [sections]);

  return (
    <>
      {vendorGroups.map(({ vendor, cards }) => (
        <div key={vendor}>
          <h3 id={slugify(vendor)} className={styles.vendorSectionTitle}>
            {vendor}
          </h3>
          <BalancedCardGrid cards={cards} />
        </div>
      ))}
    </>
  );
}

export default PlatformExperience;
