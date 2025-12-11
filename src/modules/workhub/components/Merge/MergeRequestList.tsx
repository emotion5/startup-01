import React from 'react';
import { useMergeStore } from '../../store/mergeStore';
import { useBranchStore } from '../../store/branchStore';
import MergeRequestItem from './MergeRequestItem';

const MergeRequestList: React.FC = () => {
    const { mergeRequests } = useMergeStore();
    const { branches } = useBranchStore();

    const getBranchName = (id: string) => branches.find(b => b.id === id)?.name || id;

    if (mergeRequests.length === 0) {
        return <div style={{ color: '#94a3b8', textAlign: 'center', padding: '20px' }}>No merge requests.</div>;
    }

    // Sort: Pending first, then by date
    const sortedRequests = [...mergeRequests].sort((a, b) => {
        if (a.status === 'pending' && b.status !== 'pending') return -1;
        if (a.status !== 'pending' && b.status === 'pending') return 1;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return (
        <div>
            {sortedRequests.map(req => (
                <MergeRequestItem
                    key={req.id}
                    request={req}
                    sourceBranchName={getBranchName(req.sourceBranchId)}
                    targetBranchName={getBranchName(req.targetBranchId)}
                />
            ))}
        </div>
    );
};

export default MergeRequestList;
