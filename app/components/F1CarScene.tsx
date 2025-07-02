"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import { Suspense } from "react"
import { motion } from "framer-motion"

// Racing Track Component
function RacingTrack() {
  return (
    <group>
      {/* Track Surface */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry args={[50, 20]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} metalness={0.1} />
      </mesh>

      {/* Track Lines */}
      {Array.from({ length: 10 }, (_, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[i * 2 - 10, -0.99, 0]}>
          <planeGeometry args={[0.2, 20]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.1} />
        </mesh>
      ))}

      {/* Barrier Lights */}
      {Array.from({ length: 20 }, (_, i) => (
        <mesh key={i} position={[i * 2.5 - 25, 0.5, 8]}>
          <cylinderGeometry args={[0.1, 0.1, 1]} />
          <meshStandardMaterial color="#6C00FF" emissive="#6C00FF" emissiveIntensity={0.5} />
        </mesh>
      ))}
    </group>
  )
}

// Loading Component
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

// Main F1 Scene Component (without car)
export function F1CarScene() {
  return (
    <div className="w-full h-full relative">
      <Canvas camera={{ position: [8, 4, 8], fov: 50 }} style={{ background: "transparent" }}>
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.3} />
          <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" castShadow />
          <pointLight position={[-5, 5, 5]} intensity={0.5} color="#6C00FF" />
          <pointLight position={[5, 5, -5]} intensity={0.5} color="#C800FF" />

          {/* Environment */}
          <Environment preset="night" />

          {/* Racing Track */}
          <RacingTrack />

          {/* Camera Controls */}
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={1}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 4}
          />
        </Suspense>
      </Canvas>

      {/* Overlay Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/50 to-transparent" />

        {/* Speed Lines */}
        {Array.from({ length: 3 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent"
            style={{
              top: `${30 + i * 20}%`,
              width: "100%",
              left: "0%",
            }}
            animate={{
              x: ["-100%", "100%"],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.3,
              ease: "linear",
            }}
          />
        ))}
      </div>
    </div>
  )
}
