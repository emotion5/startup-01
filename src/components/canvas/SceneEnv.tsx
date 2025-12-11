import { OrbitControls } from '@react-three/drei';

const SceneEnv = () => {
    return (
        <>
            <color attach="background" args={['#1e293b']} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
            <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2.1} />
            {/* <Environment preset="city" /> */}
        </>
    );
};

export default SceneEnv;
