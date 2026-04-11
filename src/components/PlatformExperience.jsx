/**
 * PlatformExperience.jsx
 *
 * Groups timeline events by platform tag and renders a summary card
 * for each platform that has at least one Project event.
 *
 * Cards display: years of merged experience, project count,
 * project / certification lists, and industry / technology tags.
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

export function PlatformExperience({ events = [] }) {
  const platformData = useMemo(
    () => buildExperienceData(events, 'platform', 'industry'),
    [events],
  );

  if (!platformData.length) return null;

  const [left, right] = balanceColumns(platformData);

  const tagGroups = (data) => [
    { label: 'Industries', items: data.crossTags, className: styles.tagIndustry },
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

export default PlatformExperience;
