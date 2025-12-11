import React from 'react';
import styles from '../../styles/whiteboard.module.css';
import type { Branch } from '../../types/branch.types';

interface BranchNodeProps {
    branch: Branch;
    x: number;
    y: number;
    isActive: boolean;
    onClick: (branchId: string) => void;
}

const BranchNode: React.FC<BranchNodeProps> = ({ branch, x, y, isActive, onClick }) => {
    return (
        <div
            className={`${styles.branchNode} ${isActive ? styles.active : ''}`}
            style={{ left: x, top: y }}
            onClick={() => onClick(branch.id)}
        >
            <div className={styles.branchTitle}>{branch.name}</div>
            <div className={styles.branchMeta}>
                <span>{branch.type}</span>
                <span>{branch.members.length} members</span>
            </div>
        </div>
    );
};

export default BranchNode;
