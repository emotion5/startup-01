import { create } from 'zustand';
import type { Branch } from '../types/branch.types';

interface BranchState {
    branches: Branch[];
    currentBranch: Branch | null;

    loadBranches: (projectId: string) => Promise<void>;
    createBranch: (branch: Omit<Branch, 'id' | 'createdAt'>) => Promise<void>;
    switchBranch: (branchId: string) => void;
}

// Mock initial data generator
const generateMockBranches = (projectId: string): Branch[] => {
    const companyBranchId = `b-${projectId}-main`;
    const devBranchId = `b-${projectId}-dev`;
    const marketingBranchId = `b-${projectId}-mkt`;

    return [
        {
            id: companyBranchId,
            name: 'Main (Company)',
            type: 'company',
            parentBranchId: null,
            projectId,
            ownerId: 'owner-1',
            members: ['user-1', 'user-2'],
            status: 'active',
            createdAt: '2024-01-01',
        },
        {
            id: devBranchId,
            name: 'Development',
            type: 'department',
            parentBranchId: companyBranchId,
            projectId,
            ownerId: 'dev-lead',
            members: ['dev-1', 'dev-2', 'dev-3'],
            status: 'active',
            createdAt: '2024-01-05',
        },
        {
            id: marketingBranchId,
            name: 'Marketing',
            type: 'department',
            parentBranchId: companyBranchId,
            projectId,
            ownerId: 'mkt-lead',
            members: ['mkt-1'],
            status: 'active',
            createdAt: '2024-01-10',
        },
        {
            id: `b-${projectId}-feat-a`,
            name: 'Feature A',
            type: 'project',
            parentBranchId: devBranchId,
            projectId,
            ownerId: 'dev-1',
            members: ['dev-1'],
            status: 'active',
            createdAt: '2024-02-01',
        }
    ];
};

export const useBranchStore = create<BranchState>((set) => ({
    branches: [],
    currentBranch: null,

    loadBranches: async (projectId: string) => {
        // Simulate API call
        const mockBranches = generateMockBranches(projectId);
        set({ branches: mockBranches, currentBranch: mockBranches[0] });
    },

    createBranch: async (branchData) => {
        const newBranch: Branch = {
            ...branchData,
            id: `b-${Date.now()}`,
            createdAt: new Date().toISOString().split('T')[0],
        };
        set((state) => ({ branches: [...state.branches, newBranch] }));
    },

    switchBranch: (branchId) => {
        set((state) => ({
            currentBranch: state.branches.find((b) => b.id === branchId) || null,
        }));
    },
}));
