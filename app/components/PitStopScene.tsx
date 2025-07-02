"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, Text } from "@react-three/drei"
import { useRef, useState, Suspense } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { motion, AnimatePresence } from "framer-motion"
import { Code, Palette, Search, Users, X } from "lucide-react"
import { Button } from "@/components/ui/button"

// Service data
const services = [
  {
    id: "design",
    title: "Design Pit",
    icon: Palette,
    description: "Crafting pixel-perfect interfaces that accelerate user engagement",
    position: [-4, 0, 2] as [number, number, number],
    color: "#FF6B6B",
    details: ["UI/UX Design", "Wireframing & Prototyping", "Design Systems", "Brand Guidelines"],
  },
  {
    id: "development",
    title: "Development Garage",
    icon: Code,
    description: "Building lightning-fast web applications with cutting-edge tech",
    position: [4, 0, 2] as [number, number, number],
    color: "#4ECDC4",
    details: ["Frontend Development", "Backend Architecture", "Database Design", "API Integration"],
  },
  {
    id: "seo",
    title: "SEO Lab",
    icon: Search,
    description: "Optimizing your digital presence for pole position rankings",
    position: [-4, 0, -2] as [number, number, number],
    color: "#45B7D1",
    details: ["Technical SEO", "Content Optimization", "Performance Audits", "Analytics Setup"],
  },
  {
    id: "branding",
    title: "Branding Crew",
    icon: Users,
    description: "Creating championship-winning brand identities",
    position: [4, 0, -2] as [number, number, number],
    color: "#F7DC6F",
    details: ["Logo Design", "Brand Strategy", "Marketing Materials", "Brand Guidelines"],
  },
]

// Animated Crew Member Component
function CrewMember({
  position,
  serviceType,
  isActive,
}: {
  position: [number, number, number]
  serviceType: string
  isActive: boolean
}) {
  const crewRef = useRef<THREE.Group>(null)
  const headRef = useRef<THREE.Mesh>(null)
  const leftArmRef = useRef<THREE.Group>(null)
  const rightArmRef = useRef<THREE.Group>(null)
  const toolRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!crewRef.current) return

    const time = state.clock.elapsedTime

    // Different animations based on service type
    switch (serviceType) {
      case "design":
        // Designer working on tablet - gentle arm movements
        if (leftArmRef.current) {
          leftArmRef.current.rotation.x = Math.sin(time * 2) * 0.2 - 0.3
        }
        if (rightArmRef.current) {
          rightArmRef.current.rotation.x = Math.sin(time * 2.5) * 0.15 - 0.2
        }
        if (headRef.current) {
          headRef.current.rotation.y = Math.sin(time * 0.8) * 0.1
        }
        break

      case "development":
        // Developer typing - rapid arm movements
        if (leftArmRef.current) {
          leftArmRef.current.rotation.x = Math.sin(time * 8) * 0.1 - 0.4
        }
        if (rightArmRef.current) {
          rightArmRef.current.rotation.x = Math.sin(time * 8.5) * 0.1 - 0.4
        }
        if (headRef.current) {
          headRef.current.rotation.x = -0.2 + Math.sin(time * 0.5) * 0.05
        }
        break

      case "seo":
        // Analyst reviewing data - pointing and analyzing
        if (rightArmRef.current) {
          rightArmRef.current.rotation.x = Math.sin(time * 1.5) * 0.3 - 0.1
          rightArmRef.current.rotation.y = Math.sin(time * 1.2) * 0.2
        }
        if (leftArmRef.current) {
          leftArmRef.current.rotation.x = -0.5
        }
        if (headRef.current) {
          headRef.current.rotation.y = Math.sin(time * 1.2) * 0.15
        }
        break

      case "branding":
        // Creative working on materials - artistic movements
        if (rightArmRef.current) {
          rightArmRef.current.rotation.x = Math.sin(time * 3) * 0.4 - 0.2
          rightArmRef.current.rotation.z = Math.sin(time * 2) * 0.1
        }
        if (leftArmRef.current) {
          leftArmRef.current.rotation.x = Math.sin(time * 2.5) * 0.2 - 0.3
        }
        if (headRef.current) {
          headRef.current.rotation.y = Math.sin(time * 1.5) * 0.2
        }
        break
    }

    // Tool animation
    if (toolRef.current && serviceType === "branding") {
      toolRef.current.rotation.z = Math.sin(time * 3) * 0.2
    }

    // Subtle breathing animation
    crewRef.current.scale.y = 1 + Math.sin(time * 4) * 0.02

    // More active when station is selected
    if (isActive) {
      crewRef.current.scale.setScalar(1.05)
    } else {
      crewRef.current.scale.setScalar(1)
    }
  })

  // Get crew member colors based on service type
  const getCrewColors = (type: string) => {
    switch (type) {
      case "design":
        return { uniform: "#FF6B6B", helmet: "#FF4444" }
      case "development":
        return { uniform: "#4ECDC4", helmet: "#2EAA9E" }
      case "seo":
        return { uniform: "#45B7D1", helmet: "#2E8BB8" }
      case "branding":
        return { uniform: "#F7DC6F", helmet: "#F4D03F" }
      default:
        return { uniform: "#666666", helmet: "#444444" }
    }
  }

  const colors = getCrewColors(serviceType)

  return (
    <group ref={crewRef} position={position}>
      {/* Body */}
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.25, 0.3, 0.8]} />
        <meshStandardMaterial color={colors.uniform} metalness={0.1} roughness={0.8} />
      </mesh>

      {/* Head */}
      <mesh ref={headRef} position={[0, 1.4, 0]}>
        <sphereGeometry args={[0.15]} />
        <meshStandardMaterial color="#FFDBAC" />
      </mesh>

      {/* Helmet */}
      <mesh position={[0, 1.45, 0]}>
        <sphereGeometry args={[0.16]} />
        <meshStandardMaterial color={colors.helmet} metalness={0.8} roughness={0.2} transparent opacity={0.9} />
      </mesh>

      {/* Left Arm */}
      <group ref={leftArmRef} position={[-0.35, 1.1, 0]}>
        <mesh position={[0, -0.2, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.4]} />
          <meshStandardMaterial color={colors.uniform} />
        </mesh>
        {/* Forearm */}
        <mesh position={[0, -0.5, 0.1]}>
          <cylinderGeometry args={[0.06, 0.06, 0.3]} />
          <meshStandardMaterial color="#FFDBAC" />
        </mesh>
        {/* Hand */}
        <mesh position={[0, -0.7, 0.1]}>
          <sphereGeometry args={[0.06]} />
          <meshStandardMaterial color="#FFDBAC" />
        </mesh>
      </group>

      {/* Right Arm */}
      <group ref={rightArmRef} position={[0.35, 1.1, 0]}>
        <mesh position={[0, -0.2, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.4]} />
          <meshStandardMaterial color={colors.uniform} />
        </mesh>
        {/* Forearm */}
        <mesh position={[0, -0.5, 0.1]}>
          <cylinderGeometry args={[0.06, 0.06, 0.3]} />
          <meshStandardMaterial color="#FFDBAC" />
        </mesh>
        {/* Hand */}
        <mesh position={[0, -0.7, 0.1]}>
          <sphereGeometry args={[0.06]} />
          <meshStandardMaterial color="#FFDBAC" />
        </mesh>
      </group>

      {/* Legs */}
      <mesh position={[-0.1, 0.2, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.6]} />
        <meshStandardMaterial color={colors.uniform} />
      </mesh>
      <mesh position={[0.1, 0.2, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.6]} />
        <meshStandardMaterial color={colors.uniform} />
      </mesh>

      {/* Service-specific tools */}
      {serviceType === "design" && (
        <mesh ref={toolRef} position={[0, 0.9, 0.3]}>
          <boxGeometry args={[0.2, 0.3, 0.02]} />
          <meshStandardMaterial color="#1a1a1a" emissive="#6C00FF" emissiveIntensity={0.2} />
        </mesh>
      )}

      {serviceType === "development" && (
        <mesh ref={toolRef} position={[0, 0.7, 0.3]}>
          <boxGeometry args={[0.3, 0.2, 0.02]} />
          <meshStandardMaterial color="#2a2a2a" emissive="#4ECDC4" emissiveIntensity={0.1} />
        </mesh>
      )}

      {serviceType === "seo" && (
        <mesh ref={toolRef} position={[0.3, 1.0, 0.2]} rotation={[0, -0.3, 0]}>
          <boxGeometry args={[0.15, 0.25, 0.02]} />
          <meshStandardMaterial color="#1a1a1a" emissive="#45B7D1" emissiveIntensity={0.2} />
        </mesh>
      )}

      {serviceType === "branding" && (
        <mesh ref={toolRef} position={[0.2, 0.8, 0.2]}>
          <cylinderGeometry args={[0.02, 0.02, 0.3]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
      )}

      {/* Work surface/desk */}
      <mesh position={[0, 0.6, 0.4]}>
        <boxGeometry args={[0.8, 0.05, 0.6]} />
        <meshStandardMaterial color="#444444" metalness={0.3} roughness={0.7} />
      </mesh>

      {/* Service-specific work items */}
      {serviceType === "design" && (
        <>
          <mesh position={[-0.2, 0.65, 0.5]}>
            <cylinderGeometry args={[0.03, 0.03, 0.1]} />
            <meshStandardMaterial color="#FF6B6B" />
          </mesh>
          <mesh position={[0.1, 0.65, 0.4]}>
            <boxGeometry args={[0.1, 0.02, 0.15]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
        </>
      )}

      {serviceType === "development" && (
        <>
          <mesh position={[0, 0.65, 0.4]}>
            <boxGeometry args={[0.25, 0.02, 0.15]} />
            <meshStandardMaterial color="#1a1a1a" />
          </mesh>
          <mesh position={[-0.2, 0.65, 0.5]}>
            <cylinderGeometry args={[0.02, 0.02, 0.08]} />
            <meshStandardMaterial color="#4ECDC4" emissive="#4ECDC4" emissiveIntensity={0.3} />
          </mesh>
        </>
      )}

      {serviceType === "seo" && (
        <>
          <mesh position={[0.1, 0.65, 0.3]}>
            <boxGeometry args={[0.15, 0.02, 0.1]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
          <mesh position={[-0.1, 0.65, 0.5]}>
            <boxGeometry args={[0.08, 0.02, 0.12]} />
            <meshStandardMaterial color="#45B7D1" emissive="#45B7D1" emissiveIntensity={0.2} />
          </mesh>
        </>
      )}

      {serviceType === "branding" && (
        <>
          <mesh position={[0, 0.65, 0.3]}>
            <boxGeometry args={[0.12, 0.02, 0.18]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
          <mesh position={[-0.2, 0.65, 0.5]}>
            <cylinderGeometry args={[0.02, 0.02, 0.06]} />
            <meshStandardMaterial color="#F7DC6F" />
          </mesh>
          <mesh position={[0.2, 0.65, 0.4]}>
            <boxGeometry args={[0.06, 0.02, 0.08]} />
            <meshStandardMaterial color="#E74C3C" />
          </mesh>
        </>
      )}
    </group>
  )
}

// Real-time Metrics Display Component
function MetricsDisplay({
  position,
  serviceType,
  isActive,
}: {
  position: [number, number, number]
  serviceType: string
  isActive: boolean
}) {
  const metricsRef = useRef<THREE.Group>(null)
  const [metrics, setMetrics] = useState({
    progress: 0,
    efficiency: 0,
    status: "IDLE",
    secondary: 0,
    tertiary: 0,
  })

  useFrame((state) => {
    if (!metricsRef.current) return

    const time = state.clock.elapsedTime

    // Floating animation
    metricsRef.current.position.y = position[1] + Math.sin(time * 2) * 0.05

    // Update metrics based on service type and activity
    const baseProgress = isActive ? 75 + Math.sin(time * 0.5) * 20 : 45 + Math.sin(time * 0.2) * 10
    const baseEfficiency = isActive ? 85 + Math.sin(time * 0.8) * 10 : 70 + Math.sin(time * 0.3) * 5

    setMetrics((prev) => ({
      progress: Math.max(0, Math.min(100, baseProgress)),
      efficiency: Math.max(0, Math.min(100, baseEfficiency)),
      status: isActive ? getActiveStatus(serviceType, time) : "STANDBY",
      secondary: getSecondaryMetric(serviceType, time, isActive),
      tertiary: getTertiaryMetric(serviceType, time, isActive),
    }))

    // Billboard effect - always face camera
    if (metricsRef.current) {
      metricsRef.current.lookAt(state.camera.position)
    }
  })

  const getActiveStatus = (type: string, time: number) => {
    const statuses = {
      design: ["DESIGNING", "PROTOTYPING", "REVIEWING", "ITERATING"],
      development: ["CODING", "TESTING", "BUILDING", "DEPLOYING"],
      seo: ["ANALYZING", "OPTIMIZING", "INDEXING", "MONITORING"],
      branding: ["CREATING", "REFINING", "APPROVING", "FINALIZING"],
    }
    const serviceStatuses = statuses[type as keyof typeof statuses] || ["WORKING"]
    return serviceStatuses[Math.floor(time * 0.5) % serviceStatuses.length]
  }

  const getSecondaryMetric = (type: string, time: number, isActive: boolean) => {
    const base = isActive ? 80 : 60
    const variation = Math.sin(time * 0.7) * 15

    switch (type) {
      case "design":
        return Math.max(0, Math.min(100, base + variation)) // Creativity Index
      case "development":
        return Math.max(0, Math.min(100, base + variation)) // Build Success
      case "seo":
        return Math.max(1, Math.min(10, 3 + Math.sin(time * 0.4) * 2)) // Ranking Position
      case "branding":
        return Math.max(0, Math.min(100, base + variation)) // Brand Consistency
      default:
        return base + variation
    }
  }

  const getTertiaryMetric = (type: string, time: number, isActive: boolean) => {
    const base = isActive ? 150 : 100
    const variation = Math.sin(time * 0.9) * 30

    switch (type) {
      case "design":
        return Math.max(0, base + variation) // Iterations/hr
      case "development":
        return Math.max(0, base + variation) // Lines/hr
      case "seo":
        return Math.max(0, (base + variation) * 10) // Traffic Score
      case "branding":
        return Math.max(0, base + variation) // Assets Created
      default:
        return base + variation
    }
  }

  const getMetricLabels = (type: string) => {
    switch (type) {
      case "design":
        return {
          primary: "Design Progress",
          secondary: "Creativity Index",
          tertiary: "Iterations/hr",
          unit1: "%",
          unit2: "%",
          unit3: "",
        }
      case "development":
        return {
          primary: "Code Completion",
          secondary: "Build Success",
          tertiary: "Lines/hr",
          unit1: "%",
          unit2: "%",
          unit3: "",
        }
      case "seo":
        return {
          primary: "Optimization",
          secondary: "Ranking Pos",
          tertiary: "Traffic Score",
          unit1: "%",
          unit2: "",
          unit3: "",
        }
      case "branding":
        return {
          primary: "Brand Progress",
          secondary: "Consistency",
          tertiary: "Assets/hr",
          unit1: "%",
          unit2: "%",
          unit3: "",
        }
      default:
        return {
          primary: "Progress",
          secondary: "Efficiency",
          tertiary: "Output",
          unit1: "%",
          unit2: "%",
          unit3: "",
        }
    }
  }

  const labels = getMetricLabels(serviceType)
  const serviceColor = services.find((s) => s.id === serviceType)?.color || "#6C00FF"

  return (
    <group ref={metricsRef} position={[position[0], position[1] + 2.5, position[2]]}>
      {/* Main Display Panel */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[2.5, 1.8]} />
        <meshStandardMaterial
          color="#000011"
          transparent
          opacity={0.85}
          emissive={serviceColor}
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Frame */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[2.6, 1.9]} />
        <meshStandardMaterial
          color={serviceColor}
          metalness={0.8}
          roughness={0.2}
          emissive={serviceColor}
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Status Header */}
      <Text
        position={[0, 0.7, 0.01]}
        fontSize={0.12}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {metrics.status}
      </Text>

      {/* Status Indicator */}
      <mesh position={[0.9, 0.7, 0.01]}>
        <sphereGeometry args={[0.04]} />
        <meshStandardMaterial
          color={isActive ? "#00ff00" : "#ffaa00"}
          emissive={isActive ? "#00ff00" : "#ffaa00"}
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Primary Progress Bar */}
      <mesh position={[0, 0.3, 0.01]}>
        <planeGeometry args={[2, 0.15]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      <mesh position={[-1 + metrics.progress / 100, 0.3, 0.02]} scale={[metrics.progress / 100, 1, 1]}>
        <planeGeometry args={[2, 0.15]} />
        <meshStandardMaterial color={serviceColor} emissive={serviceColor} emissiveIntensity={0.3} />
      </mesh>

      {/* Primary Progress Text */}
      <Text
        position={[-0.8, 0.45, 0.01]}
        fontSize={0.08}
        color="#ffffff"
        anchorX="left"
        anchorY="middle"
      >
        {labels.primary}
      </Text>
      <Text
        position={[0.8, 0.3, 0.01]}
        fontSize={0.1}
        color="#ffffff"
        anchorX="right"
        anchorY="middle"
      >
        {Math.round(metrics.progress)}
        {labels.unit1}
      </Text>

      {/* Secondary Metric */}
      <Text
        position={[-0.8, 0, 0.01]}
        fontSize={0.08}
        color="#aaaaaa"
        anchorX="left"
        anchorY="middle"
      >
        {labels.secondary}
      </Text>
      <Text
        position={[0.8, 0, 0.01]}
        fontSize={0.09}
        color={serviceColor}
        anchorX="right"
        anchorY="middle"
      >
        {serviceType === "seo"
          ? `#${Math.round(metrics.secondary)}`
          : `${Math.round(metrics.secondary)}${labels.unit2}`}
      </Text>

      {/* Tertiary Metric */}
      <Text
        position={[-0.8, -0.3, 0.01]}
        fontSize={0.08}
        color="#aaaaaa"
        anchorX="left"
        anchorY="middle"
      >
        {labels.tertiary}
      </Text>
      <Text
        position={[0.8, -0.3, 0.01]}
        fontSize={0.09}
        color="#ffffff"
        anchorX="right"
        anchorY="middle"
      >
        {Math.round(metrics.tertiary)}
        {labels.unit3}
      </Text>

      {/* Efficiency Indicator */}
      <mesh position={[0, -0.6, 0.01]}>
        <ringGeometry args={[0.15, 0.2, 16, 1, 0, (metrics.efficiency / 100) * Math.PI * 2]} />
        <meshStandardMaterial color={serviceColor} emissive={serviceColor} emissiveIntensity={0.4} />
      </mesh>
      <Text
        position={[0, -0.6, 0.01]}
        fontSize={0.06}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {Math.round(metrics.efficiency)}%
      </Text>
      <Text
        position={[0, -0.75, 0.01]}
        fontSize={0.05}
        color="#aaaaaa"
        anchorX="center"
        anchorY="middle"
      >
        EFFICIENCY
      </Text>

      {/* Data Stream Lines */}
      {Array.from({ length: 3 }, (_, i) => (
        <mesh key={i} position={[0.3 + i * 0.1, 0.1 - i * 0.05, 0.01]}>
          <planeGeometry args={[0.05, 0.02]} />
          <meshStandardMaterial
            color={serviceColor}
            emissive={serviceColor}
            emissiveIntensity={0.6}
            transparent
            opacity={0.7 - i * 0.2}
          />
        </mesh>
      ))}
    </group>
  )
}

// Interactive Service Station Component
function ServiceStation({
  service,
  onClick,
  isActive,
}: {
  service: (typeof services)[0]
  onClick: () => void
  isActive: boolean
}) {
  const stationRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (stationRef.current) {
      // Floating animation
      stationRef.current.position.y =
        service.position[1] + Math.sin(state.clock.elapsedTime * 2 + service.position[0]) * 0.05

      // Glow effect when hovered or active
      if (hovered || isActive) {
        stationRef.current.scale.setScalar(1.02)
      } else {
        stationRef.current.scale.setScalar(1)
      }
    }
  })

  return (
    <group
      ref={stationRef}
      position={service.position}
      onClick={onClick}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {/* Base Platform */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[1.5, 1.5, 0.2, 16]} />
        <meshStandardMaterial
          color={isActive || hovered ? service.color : "#333333"}
          metalness={0.8}
          roughness={0.2}
          emissive={isActive || hovered ? service.color : "#000000"}
          emissiveIntensity={isActive || hovered ? 0.2 : 0}
        />
      </mesh>

      {/* Service Equipment/Tool */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[0.8, 1, 0.8]} />
        <meshStandardMaterial
          color={service.color}
          metalness={0.6}
          roughness={0.3}
          emissive={service.color}
          emissiveIntensity={isActive || hovered ? 0.3 : 0.1}
        />
      </mesh>

      {/* Tool Details */}
      <mesh position={[0, 1.2, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.9}
          roughness={0.1}
          emissive="#ffffff"
          emissiveIntensity={isActive || hovered ? 0.2 : 0}
        />
      </mesh>

      {/* Holographic Display */}
      <mesh position={[0, 1.8, 0]} rotation={[0, 0, 0]}>
        <planeGeometry args={[1.5, 0.8]} />
        <meshStandardMaterial
          color={service.color}
          transparent
          opacity={0.7}
          emissive={service.color}
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Service Title */}
      <Text
        position={[0, 1.8, 0.01]}
        fontSize={0.15}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {service.title}
      </Text>

      {/* Animated Crew Member */}
      <CrewMember position={[0.8, 0, 0.5]} serviceType={service.id} isActive={isActive || hovered} />

      {/* Additional crew member for some stations */}
      {(service.id === "development" || service.id === "design") && (
        <CrewMember position={[-0.8, 0, 0.3]} serviceType={service.id} isActive={isActive || hovered} />
      )}

      {/* Real-time Metrics Display */}
      <MetricsDisplay position={[0, 0, 0]} serviceType={service.id} isActive={isActive || hovered} />

      {/* Interaction Indicator */}
      {(hovered || isActive) && (
        <mesh position={[0, 2.5, 0]}>
          <ringGeometry args={[0.3, 0.4, 16]} />
          <meshStandardMaterial
            color={service.color}
            transparent
            opacity={0.8}
            emissive={service.color}
            emissiveIntensity={0.5}
          />
        </mesh>
      )}

      {/* Energy Beams */}
      {(isActive || hovered) && (
        <>
          {Array.from({ length: 4 }, (_, i) => (
            <mesh key={i} position={[0, 0.5 + i * 0.3, 0]} rotation={[0, (i * Math.PI) / 2, 0]}>
              <cylinderGeometry args={[0.02, 0.02, 2]} />
              <meshStandardMaterial
                color={service.color}
                emissive={service.color}
                emissiveIntensity={0.8}
                transparent
                opacity={0.6}
              />
            </mesh>
          ))}
        </>
      )}

      {/* Work area lighting */}
      <pointLight position={[0, 2, 0]} intensity={isActive || hovered ? 0.8 : 0.3} color={service.color} distance={3} />
    </group>
  )
}

// Pit Garage Structure
function PitGarage() {
  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry args={[20, 15]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.8} metalness={0.2} />
      </mesh>

      {/* Garage Walls */}
      <mesh position={[0, 2, -7]}>
        <boxGeometry args={[20, 4, 0.2]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.7} />
      </mesh>

      {/* Ceiling Lights */}
      {Array.from({ length: 6 }, (_, i) => (
        <group key={i} position={[i * 3 - 7.5, 3.5, 0]}>
          <mesh>
            <cylinderGeometry args={[0.3, 0.3, 0.1]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
          </mesh>
          <pointLight position={[0, -0.5, 0]} intensity={0.8} color="#ffffff" distance={8} />
        </group>
      ))}

      {/* Tool Racks */}
      {Array.from({ length: 4 }, (_, i) => (
        <mesh key={i} position={[i * 4 - 6, 0, -6]}>
          <boxGeometry args={[0.5, 2, 0.3]} />
          <meshStandardMaterial color="#444444" metalness={0.6} roughness={0.4} />
        </mesh>
      ))}
    </group>
  )
}

// Service Info Panel Component
function ServiceInfoPanel({
  service,
  onClose,
}: {
  service: (typeof services)[0] | null
  onClose: () => void
}) {
  if (!service) return null

  const IconComponent = service.icon

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 20 }}
      className="absolute top-4 right-4 bg-gradient-to-br from-gray-900 to-black border border-purple-500/30 rounded-xl p-6 max-w-sm z-10"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: service.color }}
          >
            <IconComponent className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{service.title}</h3>
            <div className="w-8 h-1 rounded-full mt-1" style={{ backgroundColor: service.color }} />
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-white p-1">
          <X className="h-4 w-4" />
        </Button>
      </div>

      <p className="text-gray-300 mb-4">{service.description}</p>

      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-white mb-2">Services Include:</h4>
        {service.details.map((detail, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: service.color }} />
            <span className="text-sm text-gray-300">{detail}</span>
          </div>
        ))}
      </div>

      <Button className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
        Learn More
      </Button>
    </motion.div>
  )
}

// Main Pit Stop Scene Component
export function PitStopScene() {
  const [activeService, setActiveService] = useState<(typeof services)[0] | null>(null)

  const handleServiceClick = (service: (typeof services)[0]) => {
    setActiveService(activeService?.id === service.id ? null : service)
  }

  return (
    <div className="w-full h-full relative">
      <Canvas camera={{ position: [8, 6, 8], fov: 60 }}>
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" castShadow />

          {/* Colored accent lights */}
          <pointLight position={[-5, 3, 3]} intensity={0.6} color="#6C00FF" />
          <pointLight position={[5, 3, 3]} intensity={0.6} color="#C800FF" />
          <pointLight position={[0, 5, -5]} intensity={0.4} color="#ffffff" />

          {/* Environment */}
          <Environment preset="warehouse" />

          {/* Pit Garage Structure */}
          <PitGarage />

          {/* Service Stations */}
          {services.map((service) => (
            <ServiceStation
              key={service.id}
              service={service}
              onClick={() => handleServiceClick(service)}
              isActive={activeService?.id === service.id}
            />
          ))}

          {/* Camera Controls */}
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            maxPolarAngle={Math.PI / 2.2}
            minPolarAngle={Math.PI / 6}
            maxDistance={15}
            minDistance={5}
            target={[0, 0, 0]}
          />
        </Suspense>
      </Canvas>

      {/* Service Info Panel */}
      <AnimatePresence>
        <ServiceInfoPanel service={activeService} onClose={() => setActiveService(null)} />
      </AnimatePresence>

      {/* Instructions */}
      <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg p-3">
        <p className="text-sm text-gray-300">🖱️ Click on service stations • 🔄 Drag to rotate • 🔍 Scroll to zoom</p>
      </div>

      {/* Performance Indicator */}
      <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg p-3">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm text-green-400 font-mono">3D ACTIVE</span>
        </div>
      </div>
    </div>
  )
}

export default PitStopScene;