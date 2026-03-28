import React, { useMemo } from 'react';
import styles from './IndustryExperience.module.css';

import { calculateMergedDurationInYears } from './timelineUtils';

export function IndustryExperience({ events = [] }) {
  const industryData = useMemo(() => {
    const map = new Map();

    // Group elements by industry
    events.forEach((event) => {
      if (!event.industry || !Array.isArray(event.industry)) return;

      event.industry.forEach((ind) => {
        // Specifically filter out Professional Services
        if (ind === 'Professional Services') return;

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
        let projectEvents = bucket.events.filter(e => e.icon === 'Project');
        if (projectEvents.length === 0) projectEvents = bucket.events; // Fallback if no specific 'Project' icons

        const projects = projectEvents
          .filter(e => e.title)
          .map(e => ({ title: e.title, date: new Date(e.startDate || 0).getTime() }))
          .sort((a, b) => b.date - a.date)
          .map(p => p.title);

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
          // Only count distinct "project" items for the Project count metric
          totalProjects: bucket.events.filter(e => e.icon === 'Project').length || bucket.events.length,
          yearsExperience: calculateMergedDurationInYears(bucket.events),
          projects: [...new Set(projects)], // Deduplicate project titles
          platforms: sortedPlatforms,
          technologies: Array.from(bucket.technologies).sort()
        };
      })
      .sort((a, b) => b.yearsExperience - a.yearsExperience); // Sort by highest experience first
  }, [events]);

  if (!industryData || industryData.length === 0) {
    return null;
  }

  const renderCard = (data) => (
    <div key={data.name} className={styles.card}>
      <h3 className={styles.title}>{data.name}</h3>
      
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

        {data.platforms.length > 0 && (
          <>
            <span className={styles.tagsLabel}>Platforms</span>
            <div className={styles.tagsContainer}>
              {data.platforms.map(plat => (
                <span key={plat} className={styles.tagPlatform}>{plat}</span>
              ))}
            </div>
          </>
        )}
        
        {data.technologies.length > 0 && (
          <>
            <span className={styles.tagsLabel}>Technologies</span>
            <div className={styles.tagsContainer}>
              {data.technologies.map(tech => (
                <span key={tech} className={styles.tagTech}>{tech}</span>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );

  const col1 = industryData.filter((_, i) => i % 2 === 0);
  const col2 = industryData.filter((_, i) => i % 2 === 1);

  return (
    <>
      <div className={styles.container}>
        {industryData.map(renderCard)}
      </div>
      <div className={styles.desktopMasonry}>
        <div className={styles.masonryColumn}>
          {col1.map(renderCard)}
        </div>
        <div className={styles.masonryColumn}>
          {col2.map(renderCard)}
        </div>
      </div>
    </>
  );
}

export default IndustryExperience;
