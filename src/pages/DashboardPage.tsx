import React from 'react';
import ProjectCard from '../components/ui/Dashboard/ProjectCard';
import { projects, companies } from '../data/mockData';

const DashboardPage: React.FC = () => {
    const publicProjects = projects.filter(p => p.visibility === 'public');

    const getCompanyName = (companyId: string) => {
        return companies.find(c => c.id === companyId)?.name || 'Unknown Company';
    };

    return (
        <div style={{ padding: 'var(--spacing-xl)', maxWidth: '1200px', margin: '0 auto' }}>
            <header style={{ marginBottom: 'var(--spacing-xl)', textAlign: 'center' }}>
                <h1 style={{ fontSize: 'var(--font-size-2xl)', marginBottom: 'var(--spacing-sm)' }}>Project Showroom</h1>
                <p style={{ color: 'var(--color-text-secondary)' }}>Explore innovative projects from top startups.</p>
            </header>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: 'var(--spacing-lg)'
            }}>
                {publicProjects.map((project) => (
                    <ProjectCard
                        key={project.id}
                        id={project.id}
                        title={project.title}
                        description={project.description}
                        companyName={getCompanyName(project.companyId)}
                        status={project.status}
                        progress={project.progress}
                    />
                ))}
            </div>
        </div>
    );
};

export default DashboardPage;

