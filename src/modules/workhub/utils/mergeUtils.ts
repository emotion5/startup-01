import type { Branch } from '../types/branch.types';
import type { Conflict } from '../types/merge.types';

export const detectConflicts = (): Conflict[] => {
    // MVP: Simple conflict detection simulation
    // In a real system, this would compare file changes

    // Simulate conflict if both branches were modified recently (random for demo)
    const hasConflict = Math.random() > 0.8;

    if (hasConflict) {
        return [{
            type: 'content_conflict',
            description: 'Concurrent modifications in main.tsx',
            resolved: false
        }];
    }

    return [];
};

export const canMerge = (sourceBranch: Branch, targetBranch: Branch): boolean => {
    // Basic validation
    if (sourceBranch.id === targetBranch.id) return false;
    if (sourceBranch.parentBranchId !== targetBranch.id && targetBranch.parentBranchId !== sourceBranch.id) {
        // Only allow parent-child merging for MVP
        return false;
    }
    return true;
};
