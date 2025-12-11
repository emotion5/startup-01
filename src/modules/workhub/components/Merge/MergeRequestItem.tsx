import React from 'react';
import type { MergeRequest } from '../../types/merge.types';
import { useMergeStore } from '../../store/mergeStore';
import ApprovalBadge from './ApprovalBadge';

interface MergeRequestItemProps {
    request: MergeRequest;
    sourceBranchName: string;
    targetBranchName: string;
}

const MergeRequestItem: React.FC<MergeRequestItemProps> = ({ request, sourceBranchName, targetBranchName }) => {
    const { approveMerge } = useMergeStore();

    const handleApprove = () => {
        approveMerge(request.id, 'current-user');
    };

    return (
        <div style={{
            padding: '16px',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            background: 'white',
            marginBottom: '12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <div>
                <div style={{ fontWeight: 600, marginBottom: '4px', color: '#1e293b' }}>
                    {sourceBranchName} ➡️ {targetBranchName}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                    Requested by {request.requesterId} on {request.createdAt}
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <ApprovalBadge status={request.status} />

                {request.status === 'pending' && (
                    <button
                        onClick={handleApprove}
                        style={{
                            padding: '6px 12px',
                            backgroundColor: '#22c55e',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: 600,
                            fontSize: '0.9rem'
                        }}
                    >
                        Approve
                    </button>
                )}
            </div>
        </div>
    );
};

export default MergeRequestItem;
