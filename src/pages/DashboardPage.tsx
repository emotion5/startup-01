import React from 'react';
import StartupCard from '../components/ui/Dashboard/StartupCard';
import { startups } from '../data/startups';

const DashboardPage: React.FC = () => {
    return (
        <div style={{ padding: 'var(--spacing-xl)', maxWidth: '1200px', margin: '0 auto' }}>
            <header style={{ marginBottom: 'var(--spacing-xl)', textAlign: 'center' }}>
                <h1 style={{ fontSize: 'var(--font-size-2xl)', marginBottom: 'var(--spacing-sm)' }}>Startup Hub</h1>
                <p style={{ color: 'var(--color-text-secondary)' }}>Explore the future of innovation in 3D.</p>
            </header>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: 'var(--spacing-lg)'
            }}>
                {startups.map((startup) => (
                    <StartupCard
                        key={startup.id}
                        id={startup.id}
                        name={startup.name}
                        description={startup.description}
                        category={startup.category}
                    />
                ))}
            </div>
        </div>
    );
};

export default DashboardPage;
