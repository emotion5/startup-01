import { create } from 'zustand';
import type { MergeRequest } from '../types/merge.types';
import { useCommitStore } from './commitStore';

interface MergeState {
    mergeRequests: MergeRequest[];
    activeMerge: MergeRequest | null;

    createMergeRequest: (sourceBranchId: string, targetBranchId: string, requesterId: string) => Promise<void>;
    approveMerge: (id: string, reviewerId: string) => Promise<void>;
    rejectMerge: (id: string) => Promise<void>;
}

export const useMergeStore = create<MergeState>((set, get) => ({
    mergeRequests: [],
    activeMerge: null,

    createMergeRequest: async (sourceBranchId, targetBranchId, requesterId) => {
        // In a real app, we'd fetch branches from API or use get() to access branchStore if linked
        // For MVP, we'll assume valid IDs and simulate conflict detection

        // Note: accessing other stores directly inside a store is tricky. 
        // In a real app, we might pass branch objects or use a thunk pattern.
        // Here we'll just create the request.

        const newRequest: MergeRequest = {
            id: `mr - ${Date.now()} `,
            sourceBranchId,
            targetBranchId,
            commits: [], // Would fetch commits
            requesterId,
            status: 'pending',
            reviewers: [],
            createdAt: new Date().toISOString().split('T')[0],
            conflicts: [] // detectConflicts(...) would go here
        };

        set((state) => ({
            mergeRequests: [...state.mergeRequests, newRequest],
            activeMerge: newRequest
        }));
    },

    approveMerge: async (id) => {
        const state = get();
        const request = state.mergeRequests.find(mr => mr.id === id);

        if (request) {
            // Execute merge: Copy commits to target branch
            // Note: In a real app, we might want to ensure commits are loaded first
            await useCommitStore.getState().copyCommits(
                request.sourceBranchId,
                request.targetBranchId,
                request.commits // Assuming this array is populated. For MVP, we might need to fetch all commits from source if empty.
            );

            // If request.commits is empty (which it is in our current createMergeRequest), 
            // we should probably fetch them or copy ALL commits from source.
            // For this MVP, let's assume we copy all commits from the source branch if the list is empty.
            if (request.commits.length === 0) {
                const commitState = useCommitStore.getState();
                const sourceCommits = commitState.commits[request.sourceBranchId] || [];
                const commitIds = sourceCommits.map(c => c.id);
                if (commitIds.length > 0) {
                    await commitState.copyCommits(request.sourceBranchId, request.targetBranchId, commitIds);
                }
            }
        }

        set((state) => ({
            mergeRequests: state.mergeRequests.map(mr =>
                mr.id === id ? { ...mr, status: 'approved', resolvedAt: new Date().toISOString() } : mr
            ),
            activeMerge: state.activeMerge?.id === id ? { ...state.activeMerge, status: 'approved' } : state.activeMerge
        }));
    },

    rejectMerge: async (id) => {
        set((state) => ({
            mergeRequests: state.mergeRequests.map(mr =>
                mr.id === id ? { ...mr, status: 'rejected', resolvedAt: new Date().toISOString() } : mr
            ),
            activeMerge: state.activeMerge?.id === id ? { ...state.activeMerge, status: 'rejected' } : state.activeMerge
        }));
    }
}));
