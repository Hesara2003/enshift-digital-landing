"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Text } from "@react-three/drei";
import { useRef, Suspense, useMemo } from "react";
import * as THREE from "three";

// Define type for position prop
interface HolographicDisplayProps {
  position?: [number, number, number];
}

// Holographic Display Component
function HolographicDisplay({ position = [0, 0, 0] }: HolographicDisplayProps) {
  const displayRef = useRef<THREE.Group>(null);

  const floatingPoints = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        x: (Math.random() - 0.5) * 3,
        y: (Math.random() - 0.5) * 2,
        zOffset: Math.random() * 0.1,
      })),
    []
  );

  useFrame((state) => {
    if (displayRef.current) {
      displayRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={displayRef} position={position}>
      {/* Main Display Panel */}
      <mesh>
        <planeGeometry args={[4, 2.5]} />
        <meshStandardMaterial
          color="#000011"
          transparent
          opacity={0.8}
          emissive="#6C00FF"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Frame */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[4.2, 2.7]} />
        <meshStandardMaterial
          color="#6C00FF"
          metalness={0.8}
          roughness={0.2}
          emissive="#6C00FF"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Performance Bars */}
      {Array.from({ length: 8 }, (_, i) => (
        <mesh
          key={i}
          position={[-1.5 + i * 0.4, -0.5 + Math.sin(i) * 0.3, 0.01]}
        >
          <boxGeometry
            args={[0.1, 0.5 + Math.sin(i + Date.now() * 0.001) * 0.3, 0.02]}
          />
          <meshStandardMaterial
            color={i % 2 === 0 ? "#6C00FF" : "#C800FF"}
            emissive={i % 2 === 0 ? "#6C00FF" : "#C800FF"}
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}

      {/* Floating Data Points */}
      {floatingPoints.map((point, i) => (
        <mesh
          key={i}
          position={[
            point.x,
            point.y,
            0.1 + Math.sin(Date.now() * 0.001 + i) * point.zOffset,
          ]}
        >
          <sphereGeometry args={[0.02]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}

      {/* Circuit Lines */}
      <mesh position={[0, 0.8, 0.01]}>
        <planeGeometry args={[3.5, 0.02]} />
        <meshStandardMaterial
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={0.5}
        />
      </mesh>
      <mesh position={[0, -0.8, 0.01]}>
        <planeGeometry args={[3.5, 0.02]} />
        <meshStandardMaterial
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* 3D Text */}
      <Text
        position={[0, 1, 0.1]}
        fontSize={0.3}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        LIVE TELEMETRY
      </Text>

      <Text
        position={[0, -1.2, 0.1]}
        fontSize={0.15}
        color="#6C00FF"
        anchorX="center"
        anchorY="middle"
      >
        Performance Analytics
      </Text>
    </group>
  );
}

// Floating Particles
function FloatingParticles() {
  const particlesRef = useRef<THREE.Group>(null);

  const particles = useMemo(
    () =>
      Array.from({ length: 50 }, () => ({
        position: [
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 10,
        ] as [number, number, number],
        color: Math.random() > 0.5 ? "#6C00FF" : "#C800FF",
      })),
    []
  );

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={particlesRef}>
      {particles.map((p, i) => (
        <mesh key={i} position={p.position}>
          <sphereGeometry args={[0.01]} />
          <meshStandardMaterial
            color={p.color}
            emissive={p.color}
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

// Main 3D Scene Component
export function Portfolio3DScene() {
  return (
    <div className="w-full h-full relative">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} style={{ background: "transparent" }}>
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
          <pointLight position={[-3, 3, 3]} intensity={0.6} color="#6C00FF" />
          <pointLight position={[3, -3, 3]} intensity={0.6} color="#C800FF" />

          {/* Environment */}
          <Environment preset="studio" />

          {/* Floating Particles */}
          <FloatingParticles />

          {/* Holographic Display */}
          <HolographicDisplay position={[0, 0, 0]} />

          {/* Camera Controls */}
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={2}
            maxPolarAngle={Math.PI / 1.5}
            minPolarAngle={Math.PI / 3}
          />
        </Suspense>
      </Canvas>

      {/* Overlay Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(108, 0, 255, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(108, 0, 255, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px",
          }}
        />
      </div>
    </div>
  );
}
