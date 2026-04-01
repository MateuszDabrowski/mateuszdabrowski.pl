import React, { useMemo } from 'react';
import styles from './AboutMe.module.css';

import { calculateMergedDurationInYears, slugify } from './timelineUtils';

export function IndustryExperience({ events = [] }) {
  const industryData = useMemo(() => {
    const map = new Map();

    // Group elements by industry
    events.forEach((event) => {
      if (!event.industry || !Array.isArray(event.industry)) return;

      event.industry.forEach((ind) => {
        if (!map.has(ind)) {
          map.set(ind, {
            name: ind,
            events: [],
            platforms: new Set(),
            technologies: new Set()
          });
        }
        
        const bucket = map.get(ind);
        bucket.events.push(event);
        
        if (event.platform) event.platform.forEach(p => bucket.platforms.add(p));
        if (event.technology) event.technology.forEach(t => bucket.technologies.add(t));
      });
    });

    // Compile into final calculated arrays
    return Array.from(map.values())
      .map((bucket) => {
        const projectsOnly = bucket.events.filter(e => e.icon === 'Project');
        const certEvents = bucket.events.filter(e => e.icon === 'Certification');

        const projects = projectsOnly
          .filter(e => e.title)
          .map(e => ({ title: e.title, date: new Date(e.startDate || 0).getTime() }))
          .sort((a, b) => b.date - a.date)
          .map(p => p.title);

        const certifications = certEvents
          .filter(e => e.title)
          .map(e => e.title);

        const platformOrder = (p) => {
          const lower = p.toLowerCase();
          if (lower.includes('salesforce')) return 1;
          if (lower.includes('adobe')) return 2;
          if (lower.includes('oracle')) return 3;
          return 4;
        };

        const sortedPlatforms = Array.from(bucket.platforms).sort((a, b) => {
          const orderA = platformOrder(a);
          const orderB = platformOrder(b);
          if (orderA !== orderB) return orderA - orderB;
          return a.localeCompare(b);
        });

        return {
          name: bucket.name,
          totalProjects: projectsOnly.length,
          yearsExperience: calculateMergedDurationInYears(projectsOnly),
          projects: [...new Set(projects)],
          certifications,
          platforms: sortedPlatforms,
          technologies: Array.from(bucket.technologies).sort()
        };
      })
      .filter(d => d.totalProjects > 0) // Only show industries with actual projects
      .sort((a, b) => b.yearsExperience - a.yearsExperience);
  }, [events]);

  if (!industryData || industryData.length === 0) {
    return null;
  }

  const renderCard = (data) => (
    <div key={data.name} className={styles.experienceCard}>
      <h3 id={slugify(data.name)} className={styles.experienceTitle}>{data.name}</h3>
      
      <div className={styles.metricsRow}>
        <div className={styles.metric}>
          <span className={styles.metricValue}>{data.yearsExperience}</span>
          <span className={styles.metricLabel}>Years Exp</span>
        </div>
        <div className={styles.metric}>
          <span className={styles.metricValue}>{data.totalProjects}</span>
          <span className={styles.metricLabel}>Projects</span>
        </div>
      </div>

      <div className={styles.tagsSection}>
        {data.projects.length > 0 && (
          <div className={styles.projectsContainer}>
            <span className={styles.tagsLabel}>Projects</span>
            <ul className={styles.projectsList}>
              {data.projects.map((proj, idx) => (
                <li key={idx} className={styles.projectItem}>{proj}</li>
              ))}
            </ul>
          </div>
        )}

        {data.certifications.length > 0 && (
          <div className={styles.projectsContainer}>
            <span className={styles.tagsLabel}>Certifications</span>
            <ul className={styles.projectsList}>
              {data.certifications.map((cert, idx) => (
                <li key={idx} className={styles.projectItem}>{cert}</li>
              ))}
            </ul>
          </div>
        )}

        {data.platforms.length > 0 && (
          <>
            <span className={styles.tagsLabel}>Platforms</span>
            <div className={styles.cardTagsContainer}>
              {data.platforms.map(plat => (
                <span key={plat} className={`${styles.tagBadge} ${styles.tagPlatform}`}>{plat}</span>
              ))}
            </div>
          </>
        )}
        
        {data.technologies.length > 0 && (
          <>
            <span className={styles.tagsLabel}>Technologies</span>
            <div className={styles.cardTagsContainer}>
              {data.technologies.map(tech => (
                <span key={tech} className={`${styles.tagBadge} ${styles.tagTech}`}>{tech}</span>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className={styles.experienceContainer}>
      {industryData.map(renderCard)}
    </div>
  );
}

export default IndustryExperience;
