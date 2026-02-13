"use client";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  Float,
  Environment,
  PerformanceMonitor,
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useMemo, useRef, useState } from "react";

function Particles({ count = 500 }: { count?: number }) {
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, [count]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#FF6B35"
        transparent
        opacity={0.6}
        sizeAttenuation={true}
      />
    </points>
  );
}

function FloatingShapes() {
  return (
    <>
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <mesh position={[-2, 1, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color="#FF6B35"
            emissive="#FF6B35"
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={0.8} floatIntensity={0.8}>
        <mesh position={[3, -1, -2]}>
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshStandardMaterial
            color="#FF6B35"
            wireframe
            emissive="#FF6B35"
            emissiveIntensity={0.2}
          />
        </mesh>
      </Float>

      <Float speed={1.8} rotationIntensity={1.2} floatIntensity={1.2}>
        <mesh position={[-3, -2, -1]}>
          <torusGeometry args={[0.6, 0.2, 16, 100]} />
          <meshStandardMaterial
            color="#FF6B35"
            roughness={0.4}
            metalness={0.6}
          />
        </mesh>
      </Float>

      <Float speed={2.2} rotationIntensity={1.5} floatIntensity={1}>
        <mesh position={[2, 2, -1]}>
          <octahedronGeometry args={[0.7]} />
          <meshStandardMaterial
            color="#FF6B35"
            emissive="#FF6B35"
            emissiveIntensity={0.4}
            wireframe
          />
        </mesh>
      </Float>
    </>
  );
}

function SceneContent({ mobile }: { mobile: boolean }) {
  const meshRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Mouse parallax
    const x = mouse.x * 2;
    const y = mouse.y * 2;

    meshRef.current.position.x = THREE.MathUtils.lerp(
      meshRef.current.position.x,
      x,
      0.05
    );

    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y,
      y,
      0.05
    );
  });

  return (
    <group ref={meshRef}>
      <FloatingShapes />
      <Particles count={mobile ? 200 : 500} />
    </group>
  );
}

export default function HeroCanvas() {
  const [dpr, setDpr] = useState(1);
  // Simple mobile detection for initial render
  const isMobile = typeof window !== "undefined" ? window.innerWidth < 768 : false;

  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas
        dpr={dpr}
        camera={{ position: [0, 0, 10], fov: 50 }}
        gl={{ 
          antialias: false, 
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <PerformanceMonitor
          onIncline={() => setDpr(isMobile ? 1 : 1.5)}
          onDecline={() => setDpr(isMobile ? 0.75 : 1)}
        />
        
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} color="#FF6B35" intensity={1} />
        <spotLight position={[-10, -10, -10]} color="#FF6B35" intensity={0.5} />
        
        <Environment preset="city" />

        <SceneContent mobile={isMobile} />

        {!isMobile && (
          <EffectComposer enableNormalPass={false}>
            <Bloom
              intensity={1.5}
              luminanceThreshold={0.5}
              mipmapBlur
            />
          </EffectComposer>
        )}

        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          enableRotate={false} 
        />
      </Canvas>
    </div>
  );
}
