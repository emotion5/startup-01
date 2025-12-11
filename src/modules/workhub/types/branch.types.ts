export interface Branch {
    id: string;
    name: string;
    type: 'company' | 'department' | 'project' | 'team' | 'personal';
    parentBranchId: string | null;  // null = root branch (company)
    projectId?: string;              // Link to existing Project (optional)
    ownerId: string;                 // Owner ID
    members: string[];               // Member IDs
    status: 'active' | 'merged' | 'archived';
    createdAt: string;
    mergedAt?: string;
    mergedTo?: string;               // ID of the parent branch it was merged into
}
