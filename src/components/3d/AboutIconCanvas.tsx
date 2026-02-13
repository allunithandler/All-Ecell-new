"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useRef } from "react";
import * as THREE from "three";

function IconMesh() {
  const ref = useRef<THREE.Group>(null);
  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.y += 0.01;
    ref.current.rotation.x += 0.005;
  });
  return (
    <group ref={ref}>
      <mesh>
        <torusGeometry args={[0.9, 0.25, 32, 64]} />
        <meshStandardMaterial color="#FF6B35" emissive="#FF6B35" emissiveIntensity={0.7} metalness={0.2} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.8, 0]}>
        <octahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial color="#FF6B35" emissive="#FF6B35" emissiveIntensity={0.6} metalness={0.2} roughness={0.3} />
      </mesh>
      <mesh>
        <torusGeometry args={[0.9, 0.25, 32, 64]} />
        <meshBasicMaterial color="#FF6B35" wireframe />
      </mesh>
    </group>
  );
}

export default function AboutIconCanvas() {
  return (
    <div className="w-full h-[260px] sm:h-[320px] md:h-[360px]">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <color attach="background" args={["#0a0a0a"]} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 4, 4]} intensity={0.8} />
        <IconMesh />
        <EffectComposer>
          <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} intensity={0.9} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}