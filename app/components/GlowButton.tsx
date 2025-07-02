"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import type { ButtonProps } from "@/components/ui/button"

interface Spark {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  color: string
}

interface GlowTrail {
  id: number
  x: number
  y: number
  opacity: number
  size: number
}

interface GlowButtonProps extends Omit<ButtonProps, 'variant'> {
  children: React.ReactNode
  glowVariant?: "glow" | "sparks" | "both" | "f1"
  variant?: ButtonProps['variant']
  glowColor?: string
  sparkCount?: number
  raceMode?: boolean
}

export function GlowButton({
  children,
  glowVariant = "both",
  variant,
  glowColor = "#6C00FF",
  sparkCount = 15,
  raceMode = false,
  className = "",
  ...props
}: GlowButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [sparks, setSparks] = useState<Spark[]>([])
  const [glowTrails, setGlowTrails] = useState<GlowTrail[]>([])
  const buttonRef = useRef<HTMLButtonElement>(null)
  const animationRef = useRef<number>()
  const sparkIdRef = useRef(0)
  const trailIdRef = useRef(0)

  // Handle mouse movement for effects
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return

    const rect = buttonRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setMousePos({ x, y })

    // Create glow trails
    if ((glowVariant === "glow" || glowVariant === "both") && isHovered) {
      const newTrail: GlowTrail = {
        id: trailIdRef.current++,
        x,
        y,
        opacity: 1,
        size: Math.random() * 8 + 4,
      }

      setGlowTrails((prev) => [...prev.slice(-8), newTrail])
    }

    // Create sparks
    if ((glowVariant === "sparks" || glowVariant === "both") && isHovered) {
      const newSparks: Spark[] = []
      for (let i = 0; i < Math.random() * 3 + 1; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = Math.random() * 3 + 1
        const life = Math.random() * 30 + 20

        newSparks.push({
          id: sparkIdRef.current++,
          x: x + (Math.random() - 0.5) * 10,
          y: y + (Math.random() - 0.5) * 10,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life,
          maxLife: life,
          size: Math.random() * 3 + 1,
          color: Math.random() > 0.5 ? "#6C00FF" : "#C800FF",
        })
      }

      setSparks((prev) => [...prev, ...newSparks].slice(-sparkCount))
    }
    
    // Create tire burn marks for F1 effect
    if ((glowVariant === "f1" || raceMode) && isHovered) {
      const burnMarks: Spark[] = []
      for (let i = 0; i < 2; i++) {
        burnMarks.push({
          id: sparkIdRef.current++,
          x: x + (Math.random() - 0.5) * 20,
          y: y + Math.random() * 5,
          vx: (Math.random() - 0.5) * 2,
          vy: Math.random() * -1,
          life: Math.random() * 40 + 30,
          maxLife: 70,
          size: Math.random() * 2 + 3,
          color: Math.random() > 0.3 ? "#FF4500" : "#FFD700", // Orange/gold tire burn colors
        })
      }
      setSparks((prev) => [...prev, ...burnMarks].slice(-sparkCount * 2))
    }
  }

  // Animation loop for sparks and trails
  useEffect(() => {
    if (!isHovered) return

    const animate = () => {
      // Update sparks
      setSparks((prev) =>
        prev
          .map((spark) => ({
            ...spark,
            x: spark.x + spark.vx,
            y: spark.y + spark.vy,
            vy: spark.vy + 0.1, // gravity
            vx: spark.vx * 0.99, // friction
            life: spark.life - 1,
          }))
          .filter((spark) => spark.life > 0),
      )

      // Update glow trails
      setGlowTrails((prev) =>
        prev
          .map((trail) => ({
            ...trail,
            opacity: trail.opacity * 0.95,
            size: trail.size * 1.02,
          }))
          .filter((trail) => trail.opacity > 0.1),
      )

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isHovered])

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <div className="relative inline-block">
      {/* Button with enhanced glow */}
      <motion.div
        className="relative"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => {
          setIsHovered(false)
          setSparks([])
          setGlowTrails([])
        }}
      >
        <Button
          ref={buttonRef}
          variant={variant}
          className={`relative overflow-hidden transition-all duration-300 ${
            isHovered ? "shadow-2xl" : ""
          } ${raceMode || glowVariant === "f1" ? "border-2 border-yellow-400/30" : ""} ${className}`}
          onMouseMove={handleMouseMove}
          style={{
            boxShadow: isHovered
              ? `0 0 30px ${glowColor}40, 0 0 60px ${glowColor}20, 0 0 90px ${glowColor}10`
              : undefined,
          }}
          {...props}
        >
          {/* Button content */}
          <span className="relative z-10">{children}</span>

          {/* F1 Racing Stripes */}
          <AnimatePresence>
            {(glowVariant === "f1" || raceMode) && isHovered && (
              <>
                <motion.div
                  className="absolute inset-0 opacity-30"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  exit={{ x: "100%" }}
                  transition={{ 
                    duration: 0.6, 
                    repeat: Number.POSITIVE_INFINITY, 
                    ease: "easeInOut" 
                  }}
                  style={{
                    background: `linear-gradient(45deg, transparent 30%, ${glowColor}80 50%, transparent 70%)`,
                  }}
                />
                <motion.div
                  className="absolute inset-0 opacity-20"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  exit={{ x: "100%" }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.2,
                    repeat: Number.POSITIVE_INFINITY, 
                    ease: "easeInOut" 
                  }}
                  style={{
                    background: `linear-gradient(-45deg, transparent 30%, #FFD700 50%, transparent 70%)`,
                  }}
                />
              </>
            )}
          </AnimatePresence>

          {/* Animated background glow */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                className="absolute inset-0 opacity-20"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.3 }}
                exit={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor}60 0%, transparent 70%)`,
                }}
              />
            )}
          </AnimatePresence>

          {/* Pulse effect */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                className="absolute inset-0 border-2 rounded-md"
                style={{ borderColor: glowColor }}
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.8, 0.4, 0.8],
                }}
                exit={{ scale: 1.1, opacity: 0 }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            )}
          </AnimatePresence>
        </Button>

        {/* Glow Trails */}
        <AnimatePresence>
          {(glowVariant === "glow" || glowVariant === "both") &&
            glowTrails.map((trail) => (
              <motion.div
                key={trail.id}
                className="absolute pointer-events-none rounded-full"
                style={{
                  left: trail.x - trail.size / 2,
                  top: trail.y - trail.size / 2,
                  width: trail.size,
                  height: trail.size,
                  background: `radial-gradient(circle, ${glowColor}${Math.floor(trail.opacity * 255)
                    .toString(16)
                    .padStart(2, "0")} 0%, transparent 70%)`,
                  boxShadow: `0 0 ${trail.size}px ${glowColor}${Math.floor(trail.opacity * 128)
                    .toString(16)
                    .padStart(2, "0")}`,
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              />
            ))}
        </AnimatePresence>

        {/* Tire Burn Sparks */}
        <AnimatePresence>
          {(glowVariant === "sparks" || glowVariant === "both") &&
            sparks.map((spark) => (
              <motion.div
                key={spark.id}
                className="absolute pointer-events-none"
                style={{
                  left: spark.x - spark.size / 2,
                  top: spark.y - spark.size / 2,
                  width: spark.size,
                  height: spark.size,
                }}
                initial={{ scale: 1, opacity: 1 }}
                animate={{
                  scale: [1, 0.5],
                  opacity: spark.life / spark.maxLife,
                }}
                exit={{ scale: 0, opacity: 0 }}
              >
                {/* Spark core */}
                <div
                  className="w-full h-full rounded-full"
                  style={{
                    background: spark.color,
                    boxShadow: `0 0 ${spark.size * 2}px ${spark.color}, 0 0 ${spark.size * 4}px ${spark.color}40`,
                  }}
                />

                {/* Spark trail */}
                <motion.div
                  className="absolute top-1/2 left-1/2 w-1 rounded-full"
                  style={{
                    height: spark.size * 3,
                    background: `linear-gradient(to bottom, ${spark.color}, transparent)`,
                    transform: `translate(-50%, -50%) rotate(${Math.atan2(spark.vy, spark.vx) * (180 / Math.PI) + 90}deg)`,
                  }}
                  animate={{
                    opacity: [0.8, 0],
                    scaleY: [1, 0.3],
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
        </AnimatePresence>

        {/* Energy Ring Effect */}
        <AnimatePresence>
          {isHovered && (
            <>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 border rounded-md pointer-events-none"
                  style={{
                    borderColor: glowColor,
                    borderWidth: "1px",
                  }}
                  initial={{ scale: 1, opacity: 0 }}
                  animate={{
                    scale: [1, 1.2 + i * 0.1],
                    opacity: [0, 0.6, 0],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeOut",
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Corner Accent Lights */}
        <AnimatePresence>
          {isHovered && (
            <>
              {/* F1-style racing elements */}
              {(glowVariant === "f1" || raceMode) ? (
                <>
                  {/* Racing helmet visor-style corners */}
                  <motion.div
                    className="absolute top-0 left-0 w-4 h-4"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    style={{
                      background: `linear-gradient(135deg, ${glowColor} 0%, #FFD700 100%)`,
                      boxShadow: `0 0 15px ${glowColor}, inset 0 0 10px rgba(255,215,0,0.3)`,
                      clipPath: "polygon(0 0, 100% 0, 100% 50%, 50% 100%, 0 100%)",
                    }}
                  />
                  <motion.div
                    className="absolute top-0 right-0 w-4 h-4"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    style={{
                      background: `linear-gradient(225deg, ${glowColor} 0%, #FFD700 100%)`,
                      boxShadow: `0 0 15px ${glowColor}, inset 0 0 10px rgba(255,215,0,0.3)`,
                      clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 100%, 0 50%)",
                    }}
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 w-4 h-4"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    style={{
                      background: `linear-gradient(45deg, ${glowColor} 0%, #FFD700 100%)`,
                      boxShadow: `0 0 15px ${glowColor}, inset 0 0 10px rgba(255,215,0,0.3)`,
                      clipPath: "polygon(0 0, 50% 0, 100% 50%, 100% 100%, 0 100%)",
                    }}
                  />
                  <motion.div
                    className="absolute bottom-0 right-0 w-4 h-4"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    style={{
                      background: `linear-gradient(315deg, ${glowColor} 0%, #FFD700 100%)`,
                      boxShadow: `0 0 15px ${glowColor}, inset 0 0 10px rgba(255,215,0,0.3)`,
                      clipPath: "polygon(50% 0, 100% 0, 100% 100%, 0 100%, 0 50%)",
                    }}
                  />
                  
                  {/* Racing speed lines */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={`speed-line-${i}`}
                      className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"
                      style={{ 
                        width: "120%", 
                        transform: `translateY(${(i - 1) * 8}px)`,
                        left: "-10%"
                      }}
                      initial={{ x: "-100%", opacity: 0 }}
                      animate={{ 
                        x: ["100%", "200%"],
                        opacity: [0, 1, 0]
                      }}
                      transition={{
                        duration: 0.8,
                        delay: i * 0.1,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeOut"
                      }}
                    />
                  ))}
                </>
              ) : (
                <>
                  {/* Original corner lights */}
                  <motion.div
                    className="absolute top-0 left-0 w-2 h-2"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    style={{
                      background: glowColor,
                      boxShadow: `0 0 10px ${glowColor}`,
                      clipPath: "polygon(0 0, 100% 0, 0 100%)",
                    }}
                  />
                  <motion.div
                    className="absolute top-0 right-0 w-2 h-2"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    style={{
                      background: glowColor,
                      boxShadow: `0 0 10px ${glowColor}`,
                      clipPath: "polygon(100% 0, 100% 100%, 0 0)",
                    }}
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 w-2 h-2"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    style={{
                      background: glowColor,
                      boxShadow: `0 0 10px ${glowColor}`,
                      clipPath: "polygon(0 0, 100% 100%, 0 100%)",
                    }}
                  />
                  <motion.div
                    className="absolute bottom-0 right-0 w-2 h-2"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    style={{
                      background: glowColor,
                      boxShadow: `0 0 10px ${glowColor}`,
                      clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
                    }}
                  />
                </>
              )}
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
