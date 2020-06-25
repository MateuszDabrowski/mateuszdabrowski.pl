import React from 'react';
import styles from './styles.module.css';

export const LeadText = ({ content }) => (
    <>
        <p id={styles.leadText}>{content}</p>
    </>
);
