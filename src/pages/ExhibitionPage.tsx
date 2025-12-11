import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useNavigate } from 'react-router-dom';
import SceneEnv from '../components/canvas/SceneEnv';
import ModernBuilding from '../components/canvas/Buildings/ModernBuilding';
import InfoKiosk from '../components/canvas/Props/InfoKiosk';
import InfoModal from '../components/ui/Overlay/InfoModal';

const ExhibitionPage: React.FC = () => {
    const navigate = useNavigate();

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
                    <InfoKiosk position={[2, 0, 2]} />
                </Suspense>
            </Canvas>

            {/* UI Overlays */}
            <InfoModal />
        </div>
    );
};

export default ExhibitionPage;
