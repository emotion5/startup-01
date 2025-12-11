

const ModernBuilding = () => {
    return (
        <group>
            {/* Floor */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
                <planeGeometry args={[20, 20]} />
                <meshStandardMaterial color="#334155" />
            </mesh>

            {/* Walls (Simple Box for now) */}
            <mesh position={[0, 2.5, -5]} castShadow receiveShadow>
                <boxGeometry args={[10, 5, 0.5]} />
                <meshStandardMaterial color="#94a3b8" />
            </mesh>

            <mesh position={[-5, 2.5, 0]} rotation={[0, Math.PI / 2, 0]} castShadow receiveShadow>
                <boxGeometry args={[10, 5, 0.5]} />
                <meshStandardMaterial color="#94a3b8" />
            </mesh>
        </group>
    );
};

export default ModernBuilding;
