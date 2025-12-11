import React from 'react';
import { useMergeStore } from '../../store/mergeStore';

interface MergeButtonProps {
    sourceBranchId: string;
    targetBranchId: string;
    onMergeRequested?: () => void;
}

const MergeButton: React.FC<MergeButtonProps> = ({ sourceBranchId, targetBranchId, onMergeRequested }) => {
    const { createMergeRequest } = useMergeStore();

    const handleClick = async () => {
        await createMergeRequest(sourceBranchId, targetBranchId, 'current-user');
        if (onMergeRequested) {
            onMergeRequested();
        }
        alert('Merge Request Created!');
    };

    return (
        <button
            onClick={handleClick}
            style={{
                padding: '8px 16px',
                backgroundColor: '#8b5cf6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
            }}
        >
            <span>🔀</span> Create Merge Request
        </button>
    );
};

export default MergeButton;
