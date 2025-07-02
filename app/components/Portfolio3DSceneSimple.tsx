"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { useRef, Suspense } from "react"

// Simple rotating cube component with F1-style aesthetics
function RotatingCube() {
  const meshRef = useRef<any>(null)

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5
      meshRef.current.rotation.y += delta * 0.3
    }
  })

  return (
    <group>
      {/* Main cube */}
      <mesh ref={meshRef}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial 
          color="#6C00FF" 
          metalness={0.8}
          roughness={0.2}
          emissive="#2D0066"
          emissiveIntensity={0.1}
        />
      </mesh>
      
      {/* Wireframe overlay for F1 tech aesthetic */}
      <mesh ref={meshRef}>
        <boxGeometry args={[2.02, 2.02, 2.02]} />
        <meshBasicMaterial 
          color="#00FFFF" 
          wireframe={true}
          transparent={true}
          opacity={0.3}
        />
      </mesh>
    </group>
  )
}

// Simple Portfolio 3D Scene Component
export function Portfolio3DSceneSimple() {
  return (
    <div className="w-full h-full relative bg-black">
      {/* F1-Style Header Overlay */}
      <div className="absolute top-0 left-0 right-0 z-10 p-6">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <h1 className="font-f1 font-black text-4xl md:text-6xl tracking-f1-wide uppercase text-white">
              ENSHIFT
            </h1>
            <h2 className="font-f1 font-bold text-xl md:text-2xl tracking-f1 uppercase text-purple-400">
              DIGITAL RACING
            </h2>
          </div>
          <div className="text-right space-y-1">
            <div className="font-f1 text-xs tracking-f1 uppercase text-gray-400">
              3D PORTFOLIO
            </div>
            <div className="font-f1 font-black text-2xl tracking-f1-wide text-white">
              2025
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Info Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-6">
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <div className="font-f1 font-bold text-lg tracking-f1 uppercase text-purple-400">
              INTERACTIVE MODE
            </div>
            <div className="font-f1 text-xs tracking-f1 uppercase text-gray-400">
              DRAG TO ROTATE • SCROLL TO ZOOM
            </div>
          </div>
          <div className="text-right">
            <div className="font-f1 font-black text-lg tracking-f1-wide uppercase text-white">
              NEXT.JS
            </div>
            <div className="font-f1 text-xs tracking-f1 uppercase text-gray-400">
              POWERED BY THREE.JS
            </div>
          </div>
        </div>
      </div>

      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          
          <RotatingCube />
          
          <OrbitControls enablePan={false} enableZoom={true} enableRotate={true} />
        </Suspense>
      </Canvas>
    </div>
  )
}
