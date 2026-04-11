/**
 * IndustryExperience.jsx
 *
 * Groups timeline events by industry tag and renders a summary card
 * for each industry that has at least one Project event.
 *
 * Cards display: years of merged experience, project count,
 * project / certification lists, and platform / technology tags.
 * Sorted by years of experience (descending).
 */
import React, { useMemo } from 'react';
import styles from './AboutMe.module.css';
import { ExperienceCard } from './ExperienceCard';
import { buildExperienceData, balanceColumns } from './timelineUtils';

function renderCard(data, tagGroups) {
  return (
    <ExperienceCard
      key={data.name}
      name={data.name}
      yearsExperience={data.yearsExperience}
      totalProjects={data.totalProjects}
      projects={data.projects}
      certifications={data.certifications}
      tagGroups={tagGroups}
    />
  );
}

export function IndustryExperience({ events = [] }) {
  const industryData = useMemo(
    () => buildExperienceData(events, 'industry', 'platform'),
    [events],
  );

  if (!industryData.length) return null;

  const [left, right] = balanceColumns(industryData);

  const tagGroups = (data) => [
    { label: 'Platforms', items: data.crossTags, className: styles.tagPlatform },
    { label: 'Technologies', items: data.technologies, className: styles.tagTech },
  ];

  return (
    <div className={styles.experienceContainer}>
      <div className={styles.experienceColumn}>
        {left.map((data) => renderCard(data, tagGroups(data)))}
      </div>
      <div className={styles.experienceColumn}>
        {right.map((data) => renderCard(data, tagGroups(data)))}
      </div>
    </div>
  );
}

export default IndustryExperience;
