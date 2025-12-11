export interface Conflict {
    type: string;
    description: string;
    resolved: boolean;
}

export interface MergeRequest {
    id: string;
    sourceBranchId: string;
    targetBranchId: string;
    commits: string[];               // Array of Commit IDs
    requesterId: string;
    status: 'pending' | 'approved' | 'rejected' | 'merged';
    reviewers: string[];
    createdAt: string;
    resolvedAt?: string;
    conflicts?: Conflict[];
}
