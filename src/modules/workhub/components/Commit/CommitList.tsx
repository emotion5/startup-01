import React from 'react';
import styles from '../../styles/commit.module.css';
import CommitCard from './CommitCard';
import type { Commit } from '../../types/commit.types';

interface CommitListProps {
    commits: Commit[];
}

const CommitList: React.FC<CommitListProps> = ({ commits }) => {
    if (commits.length === 0) {
        return <div style={{ color: '#94a3b8', textAlign: 'center', padding: '20px' }}>No commits yet.</div>;
    }

    return (
        <div className={styles.list}>
            {commits.map(commit => (
                <CommitCard key={commit.id} commit={commit} />
            ))}
        </div>
    );
};

export default CommitList;
