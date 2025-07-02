"use client"

import { Canvas } from "@react-three/fiber"
import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { Bloom, EffectComposer, ChromaticAberration } from "@react-three/postprocessing"
import { BlendFunction } from "postprocessing"

// Tunnel Ring Component
function TunnelRing({
  position,
  scale = 1,
  delay = 0,
}: { position: [number, number, number]; scale?: number; delay?: number }) {
  const ringRef = useRef<THREE.Mesh>(null)
  const innerRingRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!ringRef.current || !innerRingRef.current || !glowRef.current) return

    const time = state.clock.elapsedTime + delay

    // Move rings toward viewer
    ringRef.current.position.z += 0.8
    innerRingRef.current.position.z += 0.8
    glowRef.current.position.z += 0.8

    // Reset position when ring passes viewer
    if (ringRef.current.position.z > 5) {
      ringRef.current.position.z = -100
      innerRingRef.current.position.z = -100
      glowRef.current.position.z = -100
    }

    // Pulsing glow effect
    const pulse = Math.sin(time * 4) * 0.3 + 0.7
    const glowScale = scale * (1 + pulse * 0.2)

    glowRef.current.scale.setScalar(glowScale)

    // Rotation for dynamic effect
    ringRef.current.rotation.z = time * 0.5
    innerRingRef.current.rotation.z = -time * 0.3

    // Color shifting
    const hue = (time * 0.1) % 1
    const color = new THREE.Color().setHSL(0.8 + hue * 0.2, 1, 0.5)

    if (ringRef.current.material instanceof THREE.MeshStandardMaterial) {
      ringRef.current.material.emissive = color
    }
  })

  return (
    <group position={position}>
      {/* Outer Glow Ring */}
      <mesh ref={glowRef}>
        <ringGeometry args={[8, 12, 32]} />
        <meshStandardMaterial color="#6C00FF" emissive="#6C00FF" emissiveIntensity={0.8} transparent opacity={0.3} />
      </mesh>

      {/* Main Ring */}
      <mesh ref={ringRef}>
        <ringGeometry args={[6, 8, 32]} />
        <meshStandardMaterial
          color="#C800FF"
          emissive="#C800FF"
          emissiveIntensity={1.2}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Inner Ring */}
      <mesh ref={innerRingRef}>
        <ringGeometry args={[4, 6, 32]} />
        <meshStandardMaterial color="#FF00FF" emissive="#FF00FF" emissiveIntensity={1.5} transparent opacity={0.8} />
      </mesh>

      {/* Energy Particles */}
      {Array.from({ length: 12 }, (_, i) => (
        <mesh key={i} position={[Math.cos((i / 12) * Math.PI * 2) * 7, Math.sin((i / 12) * Math.PI * 2) * 7, 0]}>
          <sphereGeometry args={[0.1]} />
          <meshStandardMaterial color="#00FFFF" emissive="#00FFFF" emissiveIntensity={2} />
        </mesh>
      ))}
    </group>
  )
}

// Tunnel Walls Component
function TunnelWalls() {
  const wallRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!wallRef.current) return

    const time = state.clock.elapsedTime

    // Animated texture offset for movement effect
    if (wallRef.current.material instanceof THREE.MeshStandardMaterial) {
      // Create pulsing emissive effect
      const pulse = Math.sin(time * 2) * 0.3 + 0.7
      wallRef.current.material.emissiveIntensity = pulse * 0.3
    }

    // Subtle rotation
    wallRef.current.rotation.z = time * 0.1
  })

  return (
    <mesh ref={wallRef} rotation={[0, 0, 0]}>
      <cylinderGeometry args={[15, 15, 200, 64, 1, true]} />
      <meshStandardMaterial
        color="#1a0033"
        emissive="#6C00FF"
        emissiveIntensity={0.2}
        transparent
        opacity={0.3}
        side={THREE.BackSide}
      />
    </mesh>
  )
}

// Speed Lines Component
function SpeedLines() {
  const linesRef = useRef<THREE.Group>(null)

  const lines = useMemo(() => {
    return Array.from({ length: 100 }, (_, i) => ({
      id: i,
      angle: (i / 100) * Math.PI * 2,
      radius: 12 + Math.random() * 3,
      length: 2 + Math.random() * 4,
      speed: 0.5 + Math.random() * 1,
      delay: Math.random() * 10,
    }))
  }, [])

  useFrame((state) => {
    if (!linesRef.current) return

    linesRef.current.children.forEach((line, i) => {
      const lineData = lines[i]
      const time = state.clock.elapsedTime + lineData.delay

      // Move lines toward viewer
      line.position.z += lineData.speed

      // Reset position when line passes viewer
      if (line.position.z > 5) {
        line.position.z = -100
      }

      // Pulsing opacity
      const pulse = Math.sin(time * 3) * 0.5 + 0.5
      if (line instanceof THREE.Mesh && line.material instanceof THREE.MeshStandardMaterial) {
        line.material.opacity = pulse * 0.8
      }
    })
  })

  return (
    <group ref={linesRef}>
      {lines.map((line) => (
        <mesh
          key={line.id}
          position={[
            Math.cos(line.angle) * line.radius,
            Math.sin(line.angle) * line.radius,
            -100 + Math.random() * 200,
          ]}
          rotation={[0, 0, line.angle]}
        >
          <boxGeometry args={[0.05, line.length, 0.05]} />
          <meshStandardMaterial color="#00FFFF" emissive="#00FFFF" emissiveIntensity={1.5} transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  )
}

// Data Streams Component
function DataStreams() {
  const streamsRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!streamsRef.current) return

    const time = state.clock.elapsedTime

    streamsRef.current.children.forEach((stream, i) => {
      // Move streams toward viewer
      stream.position.z += 0.6 + i * 0.1

      // Reset position
      if (stream.position.z > 5) {
        stream.position.z = -150
      }

      // Rotation and scaling
      stream.rotation.z = time * (0.5 + i * 0.1)
      const scale = 1 + Math.sin(time * 2 + i) * 0.2
      stream.scale.setScalar(scale)
    })
  })

  return (
    <group ref={streamsRef}>
      {Array.from({ length: 20 }, (_, i) => (
        <mesh key={i} position={[(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20, -150 + i * 7]}>
          <boxGeometry args={[0.1, 0.1, 2]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? "#6C00FF" : "#C800FF"}
            emissive={i % 2 === 0 ? "#6C00FF" : "#C800FF"}
            emissiveIntensity={1}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
    </group>
  )
}

// Main Cyber Tunnel Component
export function CyberTunnel() {
  const tunnelRings = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      position: [0, 0, -i * 4 - 10] as [number, number, number],
      scale: 1 + (i % 3) * 0.2,
      delay: i * 0.1,
    }))
  }, [])

  return (
    <div className="w-full h-full relative">
      <Canvas camera={{ position: [0, 0, 0], fov: 75 }} style={{ background: "transparent" }}>
        {/* Lighting */}
        <ambientLight intensity={0.1} />
        <pointLight position={[0, 0, 10]} intensity={1} color="#6C00FF" />
        <pointLight position={[0, 0, -10]} intensity={0.5} color="#C800FF" />

        {/* Tunnel Components */}
        <TunnelWalls />

        {/* Tunnel Rings */}
        {tunnelRings.map((ring) => (
          <TunnelRing key={ring.id} position={ring.position} scale={ring.scale} delay={ring.delay} />
        ))}

        {/* Speed Lines */}
        <SpeedLines />

        {/* Data Streams */}
        <DataStreams />

        {/* Post Processing Effects */}
        <EffectComposer>
          <Bloom intensity={1.5} luminanceThreshold={0.2} luminanceSmoothing={0.9} blendFunction={BlendFunction.ADD} />
          <ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={[0.002, 0.002]} />
        </EffectComposer>
      </Canvas>

      {/* Overlay Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Vignette Effect */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/50" />

        {/* Scan Lines */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(108, 0, 255, 0.1) 2px,
              rgba(108, 0, 255, 0.1) 4px
            )`,
          }}
        />

        {/* Corner HUD Elements */}
        <div className="absolute top-4 left-4 text-cyan-400 font-mono text-xs">
          <div className="bg-black/50 backdrop-blur-sm rounded px-2 py-1 border border-cyan-400/30">
            CYBERSPACE_TUNNEL.EXE
          </div>
        </div>

        <div className="absolute top-4 right-4 text-purple-400 font-mono text-xs">
          <div className="bg-black/50 backdrop-blur-sm rounded px-2 py-1 border border-purple-400/30">
            SPEED: ∞ KM/H
          </div>
        </div>

        <div className="absolute bottom-4 left-4 text-pink-400 font-mono text-xs">
          <div className="bg-black/50 backdrop-blur-sm rounded px-2 py-1 border border-pink-400/30">
            NEURAL_LINK: ACTIVE
          </div>
        </div>

        <div className="absolute bottom-4 right-4 text-green-400 font-mono text-xs">
          <div className="bg-black/50 backdrop-blur-sm rounded px-2 py-1 border border-green-400/30">
            MATRIX: CONNECTED
          </div>
        </div>
      </div>
    </div>
  )
}
