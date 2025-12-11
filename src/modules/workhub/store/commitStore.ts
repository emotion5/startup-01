import { create } from 'zustand';
import type { Commit } from '../types/commit.types';

interface CommitState {
    commits: Record<string, Commit[]>;  // branchId -> commits

    loadCommits: (branchId: string) => Promise<void>;
    createCommit: (branchId: string, commitData: Omit<Commit, 'id' | 'branchId' | 'createdAt' | 'status' | 'changes'>) => Promise<void>;
    copyCommits: (sourceBranchId: string, targetBranchId: string, commitIds: string[]) => Promise<void>;
}

// Mock initial data
const generateMockCommits = (branchId: string): Commit[] => {
    return [
        {
            id: `c-${branchId}-1`,
            branchId,
            authorId: 'user-1',
            title: 'Initial commit',
            description: 'Project initialization',
            changes: [],
            status: 'merged',
            createdAt: '2024-01-01',
        },
        {
            id: `c-${branchId}-2`,
            branchId,
            authorId: 'user-1',
            title: 'Setup project structure',
            description: 'Added basic folder structure and configuration',
            changes: [],
            status: 'approved',
            createdAt: '2024-01-02',
        }
    ];
};

export const useCommitStore = create<CommitState>((set, get) => ({
    commits: {},

    loadCommits: async (branchId) => {
        const currentCommits = get().commits[branchId];
        if (currentCommits) return; // Already loaded

        // Simulate API call
        const mockCommits = generateMockCommits(branchId);
        set((state) => ({
            commits: {
                ...state.commits,
                [branchId]: mockCommits
            }
        }));
    },

    createCommit: async (branchId, commitData) => {
        const newCommit: Commit = {
            ...commitData,
            id: `c-${Date.now()}`,
            branchId,
            createdAt: new Date().toISOString().split('T')[0],
            status: 'draft',
            changes: [], // Empty for MVP
        };

        set((state) => ({
            commits: {
                ...state.commits,
                [branchId]: [newCommit, ...(state.commits[branchId] || [])]
            }
        }));
    },

    copyCommits: async (sourceBranchId, targetBranchId, commitIds) => {
        const state = get();
        const sourceCommits = state.commits[sourceBranchId] || [];
        const commitsToCopy = sourceCommits.filter(c => commitIds.includes(c.id));

        const newCommits = commitsToCopy.map(c => ({
            ...c,
            id: `c-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            branchId: targetBranchId,
            createdAt: new Date().toISOString().split('T')[0],
            status: 'merged' as const,
            description: `${c.description} (Merged from ${sourceBranchId})`
        }));

        set((state) => ({
            commits: {
                ...state.commits,
                [targetBranchId]: [...newCommits, ...(state.commits[targetBranchId] || [])]
            }
        }));
    }
}));
