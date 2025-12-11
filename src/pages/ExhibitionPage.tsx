import React, { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useNavigate, useParams } from 'react-router-dom';
import SceneEnv from '../components/canvas/SceneEnv';
import ModernBuilding from '../components/canvas/Buildings/ModernBuilding';
import InfoKiosk from '../components/canvas/Props/InfoKiosk';
import InfoModal from '../components/ui/Overlay/InfoModal';
import { startups } from '../data/startups';
import { useStore } from '../hooks/useStore';

const ExhibitionPage: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { setSelectedStartup } = useStore();

    const startup = startups.find(s => s.id === id);

    useEffect(() => {
        if (startup) {
            setSelectedStartup(startup);
        }
    }, [startup, setSelectedStartup]);

    if (!startup) {
        return <div>Startup not found</div>;
    }

    return (
        <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
            {/* Back Button */}
            <button
                onClick={() => navigate('/')}
                style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    zIndex: 10,
                    padding: '10px 20px',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    color: 'white',
                    borderRadius: '8px',
                    backdropFilter: 'blur(4px)'
                }}
            >
                &larr; Back to Dashboard
            </button>

            {/* 3D Canvas */}
            <Canvas shadows camera={{ position: [5, 5, 10], fov: 50 }}>
                <Suspense fallback={null}>
                    <SceneEnv />
                    <ModernBuilding />
                    <InfoKiosk position={[2, 0, 2]} startup={startup} />
                </Suspense>
            </Canvas>

            {/* UI Overlays */}
            <InfoModal />
        </div>
    );
};

export default ExhibitionPage;
