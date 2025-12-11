import { useState } from 'react';
import { Html } from '@react-three/drei';
import { useStore } from '../../../hooks/useStore';
import type { Project, Company } from '../../../data/mockData';

interface InfoKioskProps {
    position: [number, number, number];
    project: Project;
    company: Company;
}

const InfoKiosk = ({ position, project, company }: InfoKioskProps) => {
    const [hovered, setHovered] = useState(false);
    const { openModal, setSelectedProject, setSelectedCompany } = useStore();

    const handleClick = () => {
        setSelectedProject(project);
        setSelectedCompany(company);
        openModal();
    };

    return (
        <group position={position}>
            <mesh
                onClick={handleClick}
                onPointerOver={() => { document.body.style.cursor = 'pointer'; setHovered(true); }}
                onPointerOut={() => { document.body.style.cursor = 'auto'; setHovered(false); }}
                castShadow
            >
                <boxGeometry args={[1, 2, 0.5]} />
                <meshStandardMaterial color={hovered ? '#38bdf8' : (project.color || '#0ea5e9')} />
            </mesh>

            {/* Floating Label */}
            <Html position={[0, 2.5, 0]} center distanceFactor={10}>
                <div style={{
                    background: 'rgba(0,0,0,0.8)',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    whiteSpace: 'nowrap',
                    opacity: hovered ? 1 : 0.7,
                    pointerEvents: 'none'
                }}>
                    {project.title}
                </div>
            </Html>
        </group>
    );
};

export default InfoKiosk;

