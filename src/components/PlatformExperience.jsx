import React, { useMemo } from 'react';
import styles from './AboutMe.module.css';
import { calculateMergedDurationInYears, slugify } from './timelineUtils';

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
          event.industry.forEach(ind => bucket.industries.add(ind));
        }
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

        return {
          name: bucket.name,
          totalProjects: projectsOnly.length,
          yearsExperience: calculateMergedDurationInYears(projectsOnly),
          projects: [...new Set(projects)],
          certifications,
          industries: Array.from(bucket.industries).sort(),
          technologies: Array.from(bucket.technologies).sort()
        };
      })
      .filter(d => d.totalProjects > 0) // Only show platforms with actual projects
      .sort((a, b) => b.yearsExperience - a.yearsExperience);
  }, [events]);

  if (!platformData || platformData.length === 0) {
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

        {data.industries.length > 0 && (
          <>
            <span className={styles.tagsLabel}>Industries</span>
            <div className={styles.cardTagsContainer}>
              {data.industries.map(ind => (
                <span key={ind} className={`${styles.tagBadge} ${styles.tagIndustry}`}>{ind}</span>
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
      {platformData.map(renderCard)}
    </div>
  );
}

export default PlatformExperience;
