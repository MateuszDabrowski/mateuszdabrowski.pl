import React, { useMemo } from 'react';
import styles from './PlatformExperience.module.css';
import { calculateMergedDurationInYears } from './timelineUtils';

export function PlatformExperience({ events = [] }) {
  const platformData = useMemo(() => {
    const map = new Map();

    // Group elements by platform
    events.forEach((event) => {
      if (!event.platform || !Array.isArray(event.platform)) return;

      event.platform.forEach((plat) => {
        if (!map.has(plat)) {
          map.set(plat, {
            name: plat,
            events: [],
            industries: new Set(),
            technologies: new Set()
          });
        }
        
        const bucket = map.get(plat);
        bucket.events.push(event);
        
        if (event.industry) {
          event.industry.forEach(ind => {
            if (ind !== 'Professional Services') bucket.industries.add(ind);
          });
        }
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

        return {
          name: bucket.name,
          // Only count distinct "project" items for the Project count metric
          totalProjects: bucket.events.filter(e => e.icon === 'Project').length || bucket.events.length,
          yearsExperience: calculateMergedDurationInYears(bucket.events),
          projects: [...new Set(projects)], // Deduplicate project titles
          industries: Array.from(bucket.industries).sort(),
          technologies: Array.from(bucket.technologies).sort()
        };
      })
      .sort((a, b) => b.yearsExperience - a.yearsExperience); // Sort by highest experience first
  }, [events]);

  if (!platformData || platformData.length === 0) {
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

        {data.industries.length > 0 && (
          <>
            <span className={styles.tagsLabel}>Industries</span>
            <div className={styles.tagsContainer}>
              {data.industries.map(ind => (
                <span key={ind} className={styles.tagIndustry}>{ind}</span>
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

  const col1 = platformData.filter((_, i) => i % 2 === 0);
  const col2 = platformData.filter((_, i) => i % 2 === 1);

  return (
    <>
      <div className={styles.container}>
        {platformData.map(renderCard)}
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

export default PlatformExperience;
