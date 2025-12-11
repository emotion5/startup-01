export interface CommitChange {
    type: 'task_completed' | 'milestone_reached' | 'document_updated' | 'metric_changed';
    before: unknown;
    after: unknown;
    metadata: Record<string, unknown>;
}

export interface Commit {
    id: string;
    branchId: string;
    authorId: string;
    title: string;
    description: string;
    changes: CommitChange[];         // List of changes
    status: 'draft' | 'published' | 'approved' | 'merged';
    createdAt: string;
    approvedBy?: string;
    approvedAt?: string;
}
