import React from 'react';
import { useDisclosureStore } from '../../store/disclosureStore';
import { useCommitStore } from '../../store/commitStore';
import { useBranchStore } from '../../store/branchStore';

interface DisclosureButtonProps {
    projectId: string;
}

const DisclosureButton: React.FC<DisclosureButtonProps> = ({ projectId }) => {
    const { disclose, disclosedCommitIds } = useDisclosureStore();
    const { commits } = useCommitStore();
    const { branches } = useBranchStore();

    // Find main branch for this project
    const mainBranch = branches.find(b => b.projectId === projectId && b.type === 'company'); // Assuming 'company' type is main/root

    if (!mainBranch) return null;

    const mainCommits = commits[mainBranch.id] || [];

    // Find unpublished commits
    const unpublishedCommits = mainCommits.filter(c => !disclosedCommitIds.includes(c.id));

    if (unpublishedCommits.length === 0) {
        return (
            <button disabled style={{
                padding: '8px 16px',
                background: '#e2e8f0',
                color: '#94a3b8',
                border: 'none',
                borderRadius: '6px',
                cursor: 'not-allowed'
            }}>
                All Changes Disclosed
            </button>
        );
    }

    const handleDisclose = () => {
        const commitIds = unpublishedCommits.map(c => c.id);
        disclose(commitIds);
        alert(`${commitIds.length} changes have been disclosed to the public!`);
    };

    return (
        <button
            onClick={handleDisclose}
            style={{
                padding: '8px 16px',
                background: '#0ea5e9',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 600,
                boxShadow: '0 2px 4px rgba(14, 165, 233, 0.2)'
            }}
        >
            📢 Disclose {unpublishedCommits.length} Changes
        </button>
    );
};

export default DisclosureButton;
