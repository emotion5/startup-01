import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBranchStore } from '../store/branchStore';
import { useCommitStore } from '../store/commitStore';
import CommitList from '../components/Commit/CommitList';
import CommitInput from '../components/Commit/CommitInput';
import MergeButton from '../components/Merge/MergeButton';
import styles from '../styles/commit.module.css';

const BranchView = () => {
    const { branchId } = useParams<{ branchId: string }>();
    const navigate = useNavigate();
    const { branches } = useBranchStore();
    const { commits, loadCommits, createCommit } = useCommitStore();

    const branch = branches.find(b => b.id === branchId);
    const branchCommits = branchId ? (commits[branchId] || []) : [];

    useEffect(() => {
        if (branchId) {
            loadCommits(branchId);
        }
    }, [branchId, loadCommits]);

    if (!branch) {
        return <div style={{ padding: 20 }}>Branch not found</div>;
    }

    const handleCommit = (title: string, description: string) => {
        if (branchId) {
            createCommit(branchId, {
                title,
                description,
                authorId: 'current-user' // Mock user ID
            });
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <button
                onClick={() => navigate(-1)}
                style={{ marginBottom: '20px', padding: '8px 12px', cursor: 'pointer', background: 'none', border: '1px solid #cbd5e1', borderRadius: '6px' }}
            >
                &larr; Back to Whiteboard
            </button>

            <div className={styles.container}>
                <div className={styles.header}>
                    <div>
                        <h1 className={styles.title}>{branch.name}</h1>
                        <span className={styles.meta}>Type: {branch.type} | Owner: {branch.ownerId}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div className={`${styles.statusBadge} ${styles.status_active}`} style={{ fontSize: '1rem', padding: '6px 12px' }}>
                            {branch.status}
                        </div>
                        {branch.parentBranchId && (
                            <MergeButton
                                sourceBranchId={branch.id}
                                targetBranchId={branch.parentBranchId}
                            />
                        )}
                    </div>
                </div>

                <CommitInput onCommit={handleCommit} />

                <h3 style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '10px', marginBottom: '15px' }}>Commit History</h3>
                <CommitList commits={branchCommits} />
            </div>
        </div>
    );
};

export default BranchView;
