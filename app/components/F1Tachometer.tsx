"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useAnimation, useMotionValue, useTransform } from "framer-motion"
import { Zap, Activity, Gauge } from "lucide-react"

interface TachometerProps {
  maxRPM?: number
  currentRPM?: number
  animated?: boolean
  size?: "sm" | "md" | "lg"
  variant?: "circular" | "linear" | "hybrid"
}

export function F1Tachometer({
  maxRPM = 18000,
  currentRPM = 0,
  animated = true,
  size = "md",
  variant = "hybrid",
}: TachometerProps) {
  const [rpm, setRpm] = useState(0)
  const [gear, setGear] = useState(1)
  const [speed, setSpeed] = useState(0)
  const [isRedline, setIsRedline] = useState(false)
  const controls = useAnimation()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Motion values for smooth animations
  const rpmValue = useMotionValue(0)
  const rpmProgress = useTransform(rpmValue, [0, maxRPM], [0, 100])

  // Configure spring for faster response
  const springConfig = { damping: 15, stiffness: 200, mass: 0.8 }

  // Size configurations
  const sizeConfig = {
    sm: { width: 200, height: 200, fontSize: "text-sm" },
    md: { width: 300, height: 300, fontSize: "text-base" },
    lg: { width: 400, height: 400, fontSize: "text-lg" },
  }

  const config = sizeConfig[size]

  useEffect(() => {
    if (!animated) {
      setRpm(currentRPM)
      rpmValue.set(currentRPM)
      
      // Update gear based on RPM (more responsive gearing)
      const newGear = Math.min(8, Math.floor(currentRPM / 2000) + 1)
      setGear(newGear)

      // Calculate speed (more aggressive speed scaling)
      const newSpeed = Math.floor((currentRPM / maxRPM) * 400)
      setSpeed(newSpeed)

      // Check redline (earlier threshold for more dramatic effect)
      const redlineThreshold = maxRPM * 0.75
      setIsRedline(currentRPM >= redlineThreshold)
      
      return
    }

    // Simulate F1 acceleration sequence
    const accelerationSequence = async () => {
      // Idle
      await controls.start({ scale: 1 })
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Launch sequence
      for (let targetRPM = 2000; targetRPM <= maxRPM; targetRPM += 1000) {
        const duration = targetRPM < 10000 ? 0.8 : 0.4 // Faster at higher RPMs

        // Update gear based on RPM (more responsive gearing)
        const newGear = Math.min(8, Math.floor(targetRPM / 2000) + 1)
        setGear(newGear)

        // Calculate speed (more aggressive speed scaling)
        const newSpeed = Math.floor((targetRPM / maxRPM) * 400)
        setSpeed(newSpeed)

        // Check redline (earlier threshold for more dramatic effect)
        const redlineThreshold = maxRPM * 0.75
        setIsRedline(targetRPM >= redlineThreshold)

        // Animate RPM
        rpmValue.set(targetRPM)
        setRpm(targetRPM)

        // Scale effect for redline
        if (targetRPM >= redlineThreshold) {
          controls.start({
            scale: [1, 1.05, 1],
            transition: { duration: 0.2, repeat: 2 },
          })
        }

        await new Promise((resolve) => setTimeout(resolve, duration * 1000))
      }

      // Hold at max for dramatic effect
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Cool down
      rpmValue.set(1000)
      setRpm(1000)
      setGear(1)
      setSpeed(0)
      setIsRedline(false)
    }

    accelerationSequence()
  }, [animated, maxRPM, controls, rpmValue, currentRPM])

  // Draw circular tachometer on canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(centerX, centerY) - 20

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw background arc
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, Math.PI * 0.75, Math.PI * 2.25)
    ctx.strokeStyle = "rgba(108, 0, 255, 0.2)"
    ctx.lineWidth = 8
    ctx.stroke()

    // Draw RPM arc
    const rpmAngle = (rpm / maxRPM) * Math.PI * 1.5
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)

    if (isRedline) {
      gradient.addColorStop(0, "#6C00FF")
      gradient.addColorStop(0.7, "#FF0080")
      gradient.addColorStop(1, "#FF0000")
    } else {
      gradient.addColorStop(0, "#6C00FF")
      gradient.addColorStop(0.5, "#C800FF")
      gradient.addColorStop(1, "#FF00FF")
    }

    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, Math.PI * 0.75, Math.PI * 0.75 + rpmAngle)
    ctx.strokeStyle = gradient
    ctx.lineWidth = 12
    ctx.lineCap = "round"
    ctx.stroke()

    // Draw tick marks
    for (let i = 0; i <= 18; i++) {
      const angle = Math.PI * 0.75 + (i / 18) * Math.PI * 1.5
      const isMainTick = i % 3 === 0
      const tickLength = isMainTick ? 15 : 8
      const tickWidth = isMainTick ? 3 : 1

      const startRadius = radius - tickLength
      const endRadius = radius

      const startX = centerX + Math.cos(angle) * startRadius
      const startY = centerY + Math.sin(angle) * startRadius
      const endX = centerX + Math.cos(angle) * endRadius
      const endY = centerY + Math.sin(angle) * endRadius

      ctx.beginPath()
      ctx.moveTo(startX, startY)
      ctx.lineTo(endX, endY)
      ctx.strokeStyle = isMainTick ? "#FFFFFF" : "rgba(255, 255, 255, 0.5)"
      ctx.lineWidth = tickWidth
      ctx.stroke()

      // Draw numbers for main ticks
      if (isMainTick) {
        const number = i * 1000
        const numberRadius = radius - 30
        const numberX = centerX + Math.cos(angle) * numberRadius
        const numberY = centerY + Math.sin(angle) * numberRadius

        ctx.fillStyle = "#FFFFFF"
        ctx.font = "12px monospace"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(number.toString(), numberX, numberY)
      }
    }

    // Draw needle
    const needleAngle = Math.PI * 0.75 + (rpm / maxRPM) * Math.PI * 1.5
    const needleLength = radius - 40
    const needleX = centerX + Math.cos(needleAngle) * needleLength
    const needleY = centerY + Math.sin(needleAngle) * needleLength

    // Needle shadow
    ctx.beginPath()
    ctx.moveTo(centerX + 2, centerY + 2)
    ctx.lineTo(needleX + 2, needleY + 2)
    ctx.strokeStyle = "rgba(0, 0, 0, 0.5)"
    ctx.lineWidth = 4
    ctx.stroke()

    // Main needle
    ctx.beginPath()
    ctx.moveTo(centerX, centerY)
    ctx.lineTo(needleX, needleY)
    ctx.strokeStyle = isRedline ? "#FF0000" : "#FFFFFF"
    ctx.lineWidth = 3
    ctx.stroke()

    // Center dot
    ctx.beginPath()
    ctx.arc(centerX, centerY, 8, 0, Math.PI * 2)
    ctx.fillStyle = isRedline ? "#FF0000" : "#6C00FF"
    ctx.fill()
    ctx.strokeStyle = "#FFFFFF"
    ctx.lineWidth = 2
    ctx.stroke()
  }, [rpm, maxRPM, isRedline])

  if (variant === "circular") {
    return (
      <motion.div
        className="relative flex items-center justify-center"
        animate={controls}
        style={{ width: config.width, height: config.height }}
      >
        {/* Glow Effect */}
        <div
          className={`absolute inset-0 rounded-full ${
            isRedline ? "bg-red-500/20" : "bg-purple-500/20"
          } blur-xl transition-colors duration-300`}
        />

        {/* Canvas */}
        <canvas ref={canvasRef} width={config.width} height={config.height} className="relative z-10" />

        {/* Center Display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
          <div className={`${config.fontSize} font-mono text-white text-center mt-8`}>
            <div className={`text-3xl font-bold ${isRedline ? "text-red-400" : "text-purple-400"}`}>
              {rpm.toLocaleString()}
            </div>
            <div className="text-xs text-gray-400">RPM</div>
          </div>
        </div>

        {/* Corner Info */}
        <div className="absolute top-4 left-4 text-xs font-mono text-cyan-400">GEAR: {gear}</div>
        <div className="absolute top-4 right-4 text-xs font-mono text-green-400">{speed} KM/H</div>
      </motion.div>
    )
  }

  if (variant === "linear") {
    return (
      <motion.div
        className="relative w-full max-w-2xl mx-auto p-6 bg-gradient-to-r from-gray-900 to-black border border-purple-500/20 rounded-xl"
        animate={controls}
      >
        {/* Glow Effect */}
        <div
          className={`absolute inset-0 rounded-xl ${
            isRedline ? "bg-red-500/10" : "bg-purple-500/10"
          } blur-lg transition-colors duration-300`}
        />

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Gauge className="h-5 w-5 text-purple-400" />
              <span className="text-white font-mono font-bold">TACHOMETER</span>
            </div>
            <div className="text-xs font-mono text-gray-400">MAX: {maxRPM.toLocaleString()} RPM</div>
          </div>

          {/* Linear Progress Bar */}
          <div className="relative h-8 bg-gray-800 rounded-full overflow-hidden mb-4">
            <motion.div
              className={`absolute inset-y-0 left-0 rounded-full ${
                isRedline
                  ? "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"
                  : "bg-gradient-to-r from-purple-500 to-pink-500"
              }`}
              style={{ width: `${(rpm / maxRPM) * 100}%` }}
              transition={{ duration: 0.1 }}
            />

            {/* Redline Indicator */}
            <div className="absolute top-0 bottom-0 w-1 bg-red-500" style={{ left: "75%" }} />
          </div>

          {/* RPM Display */}
          <div className="flex items-center justify-between">
            <div className={`text-4xl font-mono font-bold ${isRedline ? "text-red-400" : "text-purple-400"}`}>
              {rpm.toLocaleString()}
              <span className="text-lg text-gray-400 ml-2">RPM</span>
            </div>

            <div className="flex space-x-6 text-sm font-mono">
              <div className="text-center">
                <div className="text-cyan-400 font-bold">GEAR</div>
                <div className="text-white text-xl">{gear}</div>
              </div>
              <div className="text-center">
                <div className="text-green-400 font-bold">SPEED</div>
                <div className="text-white text-xl">{speed}</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  // Hybrid variant (default)
  return (
    <motion.div
      className="relative w-full max-w-4xl mx-auto p-8 bg-gradient-to-br from-gray-900 to-black border border-purple-500/20 rounded-2xl"
      animate={controls}
    >
      {/* Glow Effect */}
      <div
        className={`absolute inset-0 rounded-2xl ${
          isRedline ? "bg-red-500/10" : "bg-purple-500/10"
        } blur-xl transition-colors duration-300`}
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Circular Tachometer */}
        <div className="relative flex items-center justify-center">
          <div
            className={`absolute inset-0 rounded-full ${
              isRedline ? "bg-red-500/20" : "bg-purple-500/20"
            } blur-xl transition-colors duration-300`}
          />

          <canvas ref={canvasRef} width={config.width} height={config.height} className="relative z-10" />

          <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
            <div className={`${config.fontSize} font-mono text-white text-center mt-8`}>
              <div className={`text-4xl font-bold ${isRedline ? "text-red-400" : "text-purple-400"}`}>
                {rpm.toLocaleString()}
              </div>
              <div className="text-sm text-gray-400">RPM</div>
            </div>
          </div>
        </div>

        {/* Digital Display Panel */}
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center space-x-3 mb-6">
            <Activity className="h-6 w-6 text-purple-400" />
            <h3 className="text-2xl font-bold text-white">ENGINE TELEMETRY</h3>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-black/50 rounded-lg p-4 border border-cyan-400/20">
              <div className="text-cyan-400 text-sm font-mono mb-1">GEAR</div>
              <div className="text-3xl font-bold text-white">{gear}</div>
            </div>

            <div className="bg-black/50 rounded-lg p-4 border border-green-400/20">
              <div className="text-green-400 text-sm font-mono mb-1">SPEED</div>
              <div className="text-3xl font-bold text-white">
                {speed} <span className="text-lg">KM/H</span>
              </div>
            </div>

            <div className="bg-black/50 rounded-lg p-4 border border-purple-400/20">
              <div className="text-purple-400 text-sm font-mono mb-1">MAX RPM</div>
              <div className="text-xl font-bold text-white">{maxRPM.toLocaleString()}</div>
            </div>

            <div
              className={`bg-black/50 rounded-lg p-4 border ${isRedline ? "border-red-400/50" : "border-yellow-400/20"}`}
            >
              <div className={`${isRedline ? "text-red-400" : "text-yellow-400"} text-sm font-mono mb-1`}>STATUS</div>
              <div className={`text-lg font-bold ${isRedline ? "text-red-400" : "text-white"}`}>
                {isRedline ? "REDLINE" : "NORMAL"}
              </div>
            </div>
          </div>

          {/* Linear Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-mono text-gray-400">
              <span>RPM PROGRESS</span>
              <span>{Math.round((rpm / maxRPM) * 100)}%</span>
            </div>
            <div className="relative h-4 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className={`absolute inset-y-0 left-0 rounded-full ${
                  isRedline
                    ? "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"
                    : "bg-gradient-to-r from-purple-500 to-pink-500"
                }`}
                style={{ width: `${(rpm / maxRPM) * 100}%` }}
                transition={{ duration: 0.1 }}
              />

              {/* Redline Marker */}
              <div className="absolute top-0 bottom-0 w-0.5 bg-red-400" style={{ left: "75%" }} />
            </div>
          </div>

          {/* Warning Indicators */}
          {isRedline && (
            <motion.div
              className="flex items-center space-x-2 text-red-400 bg-red-500/10 rounded-lg p-3 border border-red-500/30"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
            >
              <Zap className="h-5 w-5" />
              <span className="font-mono font-bold">REDLINE WARNING</span>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
