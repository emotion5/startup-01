import React from 'react';
import styles from '../../styles/commit.module.css';
import type { Commit } from '../../types/commit.types';

interface CommitCardProps {
    commit: Commit;
}

const CommitCard: React.FC<CommitCardProps> = ({ commit }) => {
    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>{commit.title}</span>
                <span className={styles.cardDate}>{commit.createdAt}</span>
            </div>
            <p className={styles.cardDesc}>{commit.description}</p>
            <span className={`${styles.statusBadge} ${styles[`status_${commit.status}`]}`}>
                {commit.status}
            </span>
        </div>
    );
};

export default CommitCard;
