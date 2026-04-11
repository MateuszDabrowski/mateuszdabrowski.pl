/**
 * IndustryExperience.jsx
 *
 * Groups timeline events by industry tag and renders a summary card
 * for each industry, with a balanced two-column layout.
 */
import React, { useMemo } from 'react';
import styles from './AboutMe.module.css';
import { ExperienceCard } from './ExperienceCard';
import { buildExperienceData, balanceColumns } from './timelineUtils';

export function IndustryExperience({ events = [] }) {
  const industryData = useMemo(
    () => buildExperienceData(events, 'industry', 'platform'),
    [events],
  );

  const [left, right] = useMemo(
    () => balanceColumns(industryData),
    [industryData],
  );

  if (!industryData.length) return null;

  const renderCard = (data) => (
    <ExperienceCard
      key={data.name}
      name={data.name}
      yearsExperience={data.yearsExperience}
      totalProjects={data.totalProjects}
      bulletSections={[
        { label: 'Projects', items: data.projects },
        { label: 'Certifications', items: data.certifications },
        { label: 'Speaking Engagements', items: data.speakingEngagements },
      ]}
      tagGroups={[
        { label: 'Platforms', items: data.crossTags, className: styles.tagPlatform },
        { label: 'Technologies', items: data.technologies, className: styles.tagTech },
      ]}
    />
  );

  return (
    <div className={styles.experienceContainer}>
      <div className={styles.experienceColumn}>
        {left.map(renderCard)}
      </div>
      <div className={styles.experienceColumn}>
        {right.map(renderCard)}
      </div>
    </div>
  );
}

export default IndustryExperience;
