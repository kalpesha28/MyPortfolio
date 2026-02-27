import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface HolographicGlobeProps {
  mousePosition: { x: number; y: number };
}

export const HolographicGlobe = ({ mousePosition }: HolographicGlobeProps) => {
  const sphereRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (sphereRef.current) {
      sphereRef.current.rotation.x = time * 0.1 + mousePosition.y * 0.3;
      sphereRef.current.rotation.y = time * 0.15 + mousePosition.x * 0.3;
    }
    
    if (wireframeRef.current) {
      wireframeRef.current.rotation.x = -time * 0.05 + mousePosition.y * 0.2;
      wireframeRef.current.rotation.y = -time * 0.08 + mousePosition.x * 0.2;
    }
  });

  return (
    <group position={[3, 0, -2]}>
      {/* Inner glowing sphere */}
      <Sphere ref={sphereRef} args={[1.5, 64, 64]}>
        <MeshDistortMaterial
          color="#00ffff"
          transparent
          opacity={0.15}
          distort={0.3}
          speed={2}
          roughness={0}
        />
      </Sphere>
      
      {/* Wireframe outer sphere */}
      <Sphere ref={wireframeRef} args={[1.8, 32, 32]}>
        <meshBasicMaterial
          color="#8b5cf6"
          wireframe
          transparent
          opacity={0.3}
        />
      </Sphere>
      
      {/* Outer glow ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.2, 0.02, 16, 100]} />
        <meshBasicMaterial color="#00ffff" transparent opacity={0.5} />
      </mesh>
      
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2, 0.015, 16, 100]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.4} />
      </mesh>
    </group>
  );
};
