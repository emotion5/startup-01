import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProjectAdapter } from '../adapter/projectAdapter';
import type { WorkHubProject } from '../adapter/types';
import { useBranchStore } from '../store/branchStore';
import WhiteboardCanvas from '../components/Whiteboard/WhiteboardCanvas';
import MergeRequestList from '../components/Merge/MergeRequestList';
import DisclosureButton from '../components/Disclosure/DisclosureButton';

const WorkHubMain = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const [linkedProject, setLinkedProject] = useState<WorkHubProject | null>(null);
    const { branches, currentBranch, loadBranches } = useBranchStore();

    useEffect(() => {
        if (projectId) {
            // Load external project data
            ProjectAdapter.fetchPublicProjects().then(projects => {
                const project = projects.find(p => p.id === projectId);
                setLinkedProject(project || null);
            });

            // Load WorkHub branch data
            loadBranches(projectId);
        }
    }, [projectId, loadBranches]);

    return (
        <div style={{ padding: '20px', color: '#1e293b', backgroundColor: '#f1f5f9', minHeight: '100vh' }}>
            <header style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ margin: 0, fontSize: '1.5rem' }}>WorkHub</h1>
                    {linkedProject && (
                        <p style={{ margin: '5px 0 0', color: '#64748b' }}>
                            Project: <strong>{linkedProject.name}</strong> ({linkedProject.status})
                        </p>
                    )}
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    {projectId && <DisclosureButton projectId={projectId} />}
                    <button style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid #cbd5e1', background: 'white', cursor: 'pointer' }}>
                        New Branch
                    </button>
                    <button style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', background: '#3b82f6', color: 'white', cursor: 'pointer' }}>
                        Commit Changes
                    </button>
                </div>
            </header>

            <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '1.2rem', marginBottom: '15px' }}>Branch Overview</h2>
                <WhiteboardCanvas
                    branches={branches}
                    currentBranchId={currentBranch?.id || null}
                />
            </div>

            <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '1.2rem', marginBottom: '15px' }}>Pull Requests</h2>
                <MergeRequestList />
            </div>

            {currentBranch && (
                <div style={{ marginTop: '20px', padding: '20px', background: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                    <h3 style={{ margin: '0 0 10px' }}>Current Branch: {currentBranch.name}</h3>
                    <p style={{ color: '#64748b' }}>Type: {currentBranch.type} | Members: {currentBranch.members.length}</p>
                </div>
            )}
        </div>
    );
};

export default WorkHubMain;
