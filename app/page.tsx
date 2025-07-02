"use client"

import { useState, useRef } from "react"
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from "framer-motion"
import {
  Code,
  Palette,
  Search,
  Users,
  ArrowRight,
  Play,
  Mail,
  Phone,
  MapPin,
  Trophy,
  Zap,
  Target,
  Rocket,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import dynamic from "next/dynamic"
import { PitStopScene } from "./components/PitStopScene"
import { CustomCursor } from "./components/CustomCursor"
import { CyberTunnel } from "./components/CyberTunnel"
import { F1Tachometer } from "./components/F1Tachometer"
import { GlowButton } from "./components/GlowButton"

// Dynamically import the 3D component to avoid SSR issues
const Portfolio3DScene = dynamic(() => import("./components/Portfolio3DScene").then(mod => ({ default: mod.Portfolio3DScene })), {
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center font-f1 text-white">Loading 3D Scene...</div>
})

export default function EnshiftDigitalLanding() {
  const { scrollYProgress } = useScroll()
  const [currentProject, setCurrentProject] = useState(0)
  const [isHeaderFixed, setIsHeaderFixed] = useState(false)
  const [tachometerRPM, setTachometerRPM] = useState(0)

  // Refs for scroll animations
  const heroRef = useRef<HTMLElement>(null)
  const carouselRef = useRef<HTMLElement>(null)
  const oppositeScrollRef = useRef<HTMLElement>(null)

  // Scroll progress for different sections
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const { scrollYProgress: carouselProgress } = useScroll({
    target: carouselRef,
    offset: ["start end", "end start"],
  })

  const { scrollYProgress: oppositeProgress } = useScroll({
    target: oppositeScrollRef,
    offset: ["start end", "end start"],
  })

  // Transform scroll progress to speed indicator
  const speedProgress = useTransform(scrollYProgress, [0, 1], [0, 300])

  // Transform scroll progress to RPM for tachometer
  const scrollRPM = useTransform(scrollYProgress, [0, 1], [0, 18000])

  // Horizontal strips animation
  const stripTransform1 = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"])
  const stripTransform2 = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const stripTransform3 = useTransform(scrollYProgress, [0, 1], ["0%", "-150%"])

  // Carousel slide animations
  const carouselX = useTransform(carouselProgress, [0, 1], ["100%", "-100%"])

  // Hero to header transformation
  const heroScale = useTransform(heroProgress, [0, 0.5, 1], [1, 0.8, 0.6])
  const heroOpacity = useTransform(heroProgress, [0, 0.8, 1], [1, 0.5, 0])
  const headerY = useTransform(heroProgress, [0, 0.8, 1], [0, -50, -100])

  // Opposite scroll columns
  const leftColumnY = useTransform(oppositeProgress, [0, 1], ["0%", "-50%"])
  const rightColumnY = useTransform(oppositeProgress, [0, 1], ["0%", "50%"])
  const centerColumnY = useTransform(oppositeProgress, [0, 1], ["0%", "-25%"])

  // Monitor scroll for header transformation
  useMotionValueEvent(heroProgress, "change", (latest) => {
    setIsHeaderFixed(latest > 0.8)
  })

  // Monitor scroll for tachometer RPM
  useMotionValueEvent(scrollRPM, "change", (latest) => {
    setTachometerRPM(Math.round(latest))
  })

  const services = [
    {
      icon: Palette,
      title: "DESIGN GARAGE",
      description: "Aerodynamic UX/UI that cuts through the competition at 300+ KPH",
      delay: 0.1,
    },
    {
      icon: Code,
      title: "DEV ENGINEERING",
      description: "Precision-engineered code with the reliability of a championship engine",
      delay: 0.2,
    },
    {
      icon: Search,
      title: "SEO STRATEGY",
      description: "Pole position rankings through data-driven telemetry optimization",
      delay: 0.3,
    },
    {
      icon: Users,
      title: "BRAND FACTORY",
      description: "Championship-caliber brand identity that dominates every circuit",
      delay: 0.4,
    },
  ]

  const projects = [
    {
      title: "APEX MOTORSPORTS",
      category: "Racing Team Portal",
      performance: "98%",
      loadTime: "0.8s",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "VELOCE COMMERCE",
      category: "E-Commerce Platform",
      performance: "96%",
      loadTime: "1.2s",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "CIRCUIT DYNAMICS",
      category: "Corporate Website",
      performance: "99%",
      loadTime: "0.6s",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "TURBO FINTECH",
      category: "Financial Platform",
      performance: "97%",
      loadTime: "0.9s",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "GRID HEALTH TECH",
      category: "Medical Platform",
      performance: "95%",
      loadTime: "1.1s",
      image: "/placeholder.svg?height=300&width=400",
    },
  ]

  const stats = [
    { label: "RACE TO LAUNCH", value: "14", unit: "DAYS" },
    { label: "PERFORMANCE INDEX", value: "98", unit: "%" },
    { label: "PODIUM FINISHES", value: "100", unit: "%" },
    { label: "LAPS COMPLETED", value: "150", unit: "+" },
  ]

  const achievements = [
    { icon: Trophy, title: "CHAMPIONSHIP TROPHIES", count: "25+" },
    { icon: Zap, title: "FASTEST LAP TIMES", count: "500+" },
    { icon: Target, title: "POLE POSITIONS", count: "98%" },
    { icon: Rocket, title: "GRAND PRIX WINS", count: "150+" },
  ]

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <CustomCursor />

      {/* Hide default cursor */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>

      {/* Cyber Tunnel Background */}
      <div className="fixed inset-0 z-0">
        <CyberTunnel />
      </div>

      {/* Racing Stripes and Visual Elements */}
      <div className="fixed inset-0 pointer-events-none z-10">
        <motion.div
          className="absolute top-1/4 w-[200%] h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30"
          style={{ x: stripTransform1 }}
        />
        <motion.div
          className="absolute top-1/2 w-[200%] h-0.5 bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-20"
          style={{ x: stripTransform2 }}
        />
        <motion.div
          className="absolute top-3/4 w-[200%] h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-25"
          style={{ x: stripTransform3 }}
        />
        
        {/* F1 Racing Stripes */}
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-500/20 to-pink-500/20" />
        <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-pink-500/20 to-purple-500/20" />
        
        {/* Corner Racing Elements */}
        <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-purple-500/40" />
        <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-purple-500/40" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-purple-500/40" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-purple-500/40" />
      </div>

      {/* Fixed Header (appears after hero scroll) */}
      <AnimatePresence>
        {isHeaderFixed && (
          <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-purple-500/20"
          >
            <div className="max-w-7xl mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
              <div className="flex items-center space-x-1 md:space-x-2">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs md:text-sm font-bold">🏎️</span>
                </div>
                <span className="font-f1 text-sm md:text-xl font-bold tracking-wider">ENSHIFT</span>
                <span className="hidden sm:inline text-xs text-purple-400 font-f1">|</span>
                <span className="hidden sm:inline text-xs text-purple-400 font-f1">DIGITAL MOTORSPORT</span>
              </div>
              <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
                <a
                  href="#services"
                  className="font-f1 text-gray-300 hover:text-white transition-colors uppercase tracking-wider text-sm"
                  data-cursor="link"
                  data-cursor-text="Pit Stop Services"
                >
                  🏁 Pit Stop
                </a>
                <a
                  href="#portfolio"
                  className="font-f1 text-gray-300 hover:text-white transition-colors uppercase tracking-wider text-sm"
                  data-cursor="link"
                  data-cursor-text="Championship Portfolio"
                >
                  🏆 Wins
                </a>
                <a
                  href="#stats"
                  className="font-f1 text-gray-300 hover:text-white transition-colors uppercase tracking-wider text-sm"
                  data-cursor="link"
                  data-cursor-text="Season Stats"
                >
                  📊 Telemetry
                </a>
                <a
                  href="#contact"
                  className="font-f1 text-gray-300 hover:text-white transition-colors uppercase tracking-wider text-sm"
                  data-cursor="link"
                  data-cursor-text="Team Radio"
                >
                  📻 Team Radio
                </a>
              </nav>
              <GlowButton
                size="sm"
                className="bg-gradient-to-r from-purple-600 to-pink-600 font-f1 uppercase tracking-wider text-xs md:text-sm px-3 md:px-4 py-2"
                glowVariant="f1"
                raceMode={true}
                glowColor="#6C00FF"
              >
                <span className="hidden sm:inline">🏁 Join Grid</span>
                <span className="sm:hidden">🏁 Join</span>
              </GlowButton>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Speed Indicator */}
      <motion.div
        className="fixed top-3 right-3 md:top-4 md:right-4 z-50 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full p-2 md:p-3"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="relative w-12 h-12 md:w-16 md:h-16">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="2"
            />
            <motion.path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeDasharray="100, 100"
              strokeDashoffset={useTransform(scrollYProgress, [0, 1], [100, 0])}
              strokeLinecap="round"
            />
          </svg>
          <motion.div className="absolute inset-0 flex flex-col items-center justify-center font-f1 text-xs font-bold">
            <div className="text-[8px] md:text-[10px] text-purple-300">KPH</div>
            <div className="text-white text-xs md:text-sm">{Math.round(useTransform(scrollYProgress, [0, 1], [0, 330]).get())}</div>
            <div className="text-[6px] md:text-[8px] text-pink-300">🏁</div>
          </motion.div>
        </div>
      </motion.div>

      {/* Hero Section with Transform Animation */}
      <motion.section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden z-20 px-4"
        style={{
          scale: heroScale,
          opacity: heroOpacity,
          y: headerY,
        }}
      >
        <div className="relative z-10 text-center max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <motion.h1
              className="font-f1 text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black mb-4 md:mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent tracking-wider"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              LIGHTS OUT
              <br />
              <span className="font-f1 text-white font-black tracking-widest">AND AWAY WE GO!</span>
            </motion.h1>

            <motion.p
              className="font-f1 text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-6 md:mb-8 max-w-3xl mx-auto px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Championship-grade digital solutions engineered for maximum performance.
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>Experience racing-inspired innovation at breakneck speed.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <GlowButton
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold group w-full sm:w-auto"
                glowVariant="f1"
                raceMode={true}
                glowColor="#6C00FF"
                data-cursor="button"
                data-cursor-text="Book Test Lap"
              >
                <span className="hidden sm:inline">BOOK QUALIFYING LAP</span>
                <span className="sm:hidden">QUALIFYING LAP</span>
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
              </GlowButton>

              <GlowButton
                size="lg"
                className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold group bg-transparent w-full sm:w-auto"
                glowVariant="both"
                glowColor="#C800FF"
                data-cursor="button"
                data-cursor-text="View Portfolio"
              >
                <Play className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                <span className="hidden sm:inline">VIEW RACE RESULTS</span>
                <span className="sm:hidden">RACE RESULTS</span>
              </GlowButton>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* F1 Tachometer Section */}
      <section className="py-12 md:py-20 relative z-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-purple-950/20 to-black/80 backdrop-blur-sm" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-16"
          >
            <h2 className="font-f1 text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent tracking-wider">
              🏎️ REAL-TIME TELEMETRY
            </h2>
            <p className="font-f1 text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-6 md:mb-12 px-4">
              🔥 Live performance metrics from our engineering division at maximum RPM
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>📊 Monitoring every millisecond of development for championship results
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <F1Tachometer 
              maxRPM={18000} 
              animated={false} 
              size="lg" 
              variant="hybrid"
              currentRPM={tachometerRPM}
            />
          </motion.div>
        </div>
      </section>

      {/* Horizontal Carousel Section */}
      <section ref={carouselRef} className="py-20 relative overflow-hidden z-20">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-purple-950/20 to-black/80 backdrop-blur-sm" />
        
        {/* Racing track lines */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-1/3 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent"
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scaleX: [0.8, 1.2, 0.8]
            }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          />
          <motion.div
            className="absolute bottom-1/3 w-full h-0.5 bg-gradient-to-r from-transparent via-red-400/40 to-transparent"
            animate={{
              opacity: [0.2, 0.6, 0.2],
              scaleX: [1.2, 0.8, 1.2]
            }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.h2 
              className="font-f1 text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent tracking-wider"
              animate={{
                textShadow: [
                  "0 0 20px rgba(168, 85, 247, 0.4)",
                  "0 0 40px rgba(168, 85, 247, 0.6)",
                  "0 0 20px rgba(168, 85, 247, 0.4)"
                ]
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
               CHAMPIONSHIP PORTFOLIO
            </motion.h2>
            <p className="font-f1 text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              🏆 Victory lap showcase - projects that conquered the digital circuit
              <br />
              🚀 Each build engineered for pole position performance
            </p>
            
            {/* Racing stats bar */}
            <motion.div 
              className="flex justify-center items-center space-x-8 text-sm font-f1 bg-black/40 rounded-full px-6 py-3 border border-yellow-400/30"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400">5 PROJECTS</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                <span className="text-yellow-400">98% AVG PERFORMANCE</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                <span className="text-red-400">&lt; 1S LOAD TIME</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* F1 Racing Carousel */}
        <div className="relative h-96 overflow-hidden">
          {/* Racing track ground effect */}
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 opacity-60" />
          <div className="absolute bottom-0 left-1/4 right-1/4 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
          
          <motion.div 
            className="flex space-x-8 absolute top-0" 
            style={{ x: carouselX }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                className="flex-shrink-0 w-80 h-80 relative overflow-hidden backdrop-blur-sm group"
                initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                style={{ 
                  perspective: "1000px",
                  transformStyle: "preserve-3d"
                }}
              >
                {/* F1 Car-styled frame */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 to-black/90 rounded-xl border-2 border-purple-500/30 group-hover:border-yellow-400/60 transition-all duration-300">
                  {/* Racing stripes */}
                  <div className="absolute top-0 left-4 right-4 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-full" />
                  <div className="absolute bottom-0 left-4 right-4 h-1 bg-gradient-to-r from-yellow-400 via-red-500 to-yellow-400 rounded-full" />
                  
                  {/* Corner racing elements */}
                  <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-yellow-400/60" />
                  <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-yellow-400/60" />
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-yellow-400/60" />
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-yellow-400/60" />
                </div>

                {/* Racing glow effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-xl"
                  animate={{
                    opacity: [0.1, 0.3, 0.1]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Number.POSITIVE_INFINITY,
                    delay: index * 0.5 
                  }}
                />

                <div className="relative z-10 p-6 h-full flex flex-col">
                  {/* Project image with racing overlay */}
                  <div className="w-full h-40 bg-gray-800 rounded-lg mb-4 overflow-hidden relative group-hover:scale-105 transition-transform duration-300">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Racing grid overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-2 right-2 bg-black/70 rounded-full px-2 py-1 text-xs font-f1 text-yellow-400">
                      PROJECT #{index + 1}
                    </div>
                  </div>

                  {/* Project info with F1 styling */}
                  <div className="flex-1">
                    <h3 className="font-f1 text-xl font-bold text-white mb-2 tracking-wider">{project.title}</h3>
                    <p className="font-f1 text-purple-400 mb-4 uppercase text-sm tracking-wide">{project.category}</p>
                    
                    {/* F1-style telemetry data */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-black/50 rounded-lg p-3 border border-green-400/30">
                        <div className="text-xs text-green-400 font-f1 mb-1">PERFORMANCE</div>
                        <div className="text-lg font-bold text-green-400 font-mono">{project.performance}</div>
                      </div>
                      <div className="bg-black/50 rounded-lg p-3 border border-blue-400/30">
                        <div className="text-xs text-blue-400 font-f1 mb-1">LOAD TIME</div>
                        <div className="text-lg font-bold text-blue-400 font-mono">{project.loadTime}</div>
                      </div>
                    </div>

                    {/* Racing status lights */}
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        <motion.div 
                          className="w-3 h-3 bg-green-400 rounded-full"
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                        />
                        <motion.div 
                          className="w-3 h-3 bg-yellow-400 rounded-full"
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: 0.3 }}
                        />
                        <motion.div 
                          className="w-3 h-3 bg-red-400 rounded-full"
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: 0.6 }}
                        />
                      </div>
                      <div className="text-xs font-f1 text-gray-400 uppercase tracking-wider">
                        POLE POSITION
                      </div>
                    </div>
                  </div>
                </div>

                {/* Racing sparks effect on hover */}
                <AnimatePresence>
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {[...Array(6)].map((_, sparkIndex) => (
                      <motion.div
                        key={sparkIndex}
                        className="absolute bottom-0 w-1 h-1 bg-yellow-400 rounded-full"
                        style={{ left: `${sparkIndex * 16 + 10}%` }}
                        animate={{
                          y: [0, -20, -40],
                          opacity: [1, 0.6, 0],
                          scale: [1, 0.5, 0]
                        }}
                        transition={{
                          duration: 0.8,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: sparkIndex * 0.1
                        }}
                      />
                    ))}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* F1 Race completion indicator */}
        <motion.div 
          className="relative z-10 max-w-7xl mx-auto px-4 mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex justify-center">
            <div className="bg-black/60 rounded-full px-8 py-4 border border-yellow-400/30 backdrop-blur-sm">
              <div className="flex items-center space-x-4 font-f1 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-green-400">ALL PROJECTS: RACE COMPLETE</span>
                </div>
                <div className="text-gray-400">|</div>
                <div className="text-yellow-400 uppercase tracking-wider">
                  🏆 CHAMPIONSHIP STATUS: ACTIVE
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Services Section - 3D Pit Stop */}
      <section id="services" className="py-20 relative min-h-screen z-20">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-purple-950/20 to-black/80 backdrop-blur-sm" />

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-f1 text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent tracking-wider">
              🔧 PIT CREW MASTERY
            </h2>
            <p className="font-f1 text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              ⚡ Explore our precision pit stop operations - each station engineered for championship performance
              <br />
              🏎️ Click on different stations to discover our racing-grade services
            </p>
          </motion.div>

          <div className="h-[600px] relative">
            <PitStopScene />
          </div>
        </div>
      </section>

      {/* Opposite Scroll Section */}
      <section ref={oppositeScrollRef} className="py-20 relative min-h-screen overflow-hidden z-20">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-gray-900/40 to-black/80 backdrop-blur-sm" />
        
        {/* F1 Racing Grid Background */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          {/* Checkered flag pattern */}
          <div className="absolute inset-0" style={{
            backgroundImage: `
              repeating-conic-gradient(from 0deg at 50% 50%, 
                transparent 0deg, transparent 45deg, 
                rgba(255,255,255,0.1) 45deg, rgba(255,255,255,0.1) 90deg)
            `,
            backgroundSize: '40px 40px'
          }} />
          
          {/* Racing track lines */}
          <motion.div
            className="absolute top-1/4 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent"
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scaleX: [0.8, 1.2, 0.8]
            }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
          />
          <motion.div
            className="absolute bottom-1/4 w-full h-0.5 bg-gradient-to-r from-transparent via-red-400/40 to-transparent"
            animate={{
              opacity: [0.2, 0.6, 0.2],
              scaleX: [1.2, 0.8, 1.2]
            }}
            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, delay: 2 }}
          />
          
          {/* Dynamic Racing Sparks */}
          <motion.div
            className="absolute left-1/4 top-1/2 w-2 h-2 bg-orange-400 rounded-full blur-sm"
            animate={{
              x: [-100, window.innerWidth + 100],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 3, 
              repeat: Number.POSITIVE_INFINITY,
              delay: 1,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute right-1/4 top-1/3 w-1 h-1 bg-blue-400 rounded-full blur-sm"
            animate={{
              x: [100, -window.innerWidth - 100],
              opacity: [0, 1, 0],
              scale: [0.3, 0.8, 0.3]
            }}
            transition={{ 
              duration: 2.5, 
              repeat: Number.POSITIVE_INFINITY,
              delay: 3,
              ease: "linear"
            }}
          />
        </div>

        {/* F1 Pit Stop Indicator Lights */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          <motion.div
            className="w-3 h-3 rounded-full bg-red-500"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
          />
          <motion.div
            className="w-3 h-3 rounded-full bg-yellow-500"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
          />
          <motion.div
            className="w-3 h-3 rounded-full bg-green-500"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: 0.4 }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="font-f1 text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent tracking-wider"
              animate={{
                textShadow: [
                  "0 0 20px rgba(168, 85, 247, 0.4)",
                  "0 0 40px rgba(168, 85, 247, 0.6)",
                  "0 0 20px rgba(168, 85, 247, 0.4)"
                ]
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              🏆 CONSTRUCTOR'S CHAMPIONSHIP
            </motion.h2>
            <p className="font-f1 text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              🏁 Leading the championship table across all digital racing categories
              <br />
              🚀 Dominating the leaderboard with pole position performance
            </p>
            
            {/* F1 Championship Status Bar with Enhanced Elements */}
            <motion.div 
              className="flex flex-col items-center space-y-4 mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              {/* Main Status Bar */}
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs sm:text-sm font-f1 bg-black/60 rounded-full px-4 sm:px-8 py-4 border border-yellow-400/40 backdrop-blur-sm">
                <div className="flex items-center space-x-2">
                  <motion.div 
                    className="w-3 h-3 bg-green-400 rounded-full"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  />
                  <span className="text-green-400 uppercase tracking-wider">SEASON LEADER</span>
                </div>
                <div className="text-gray-400 hidden sm:block">|</div>
                <div className="flex items-center space-x-2">
                  <motion.div 
                    className="w-3 h-3 bg-yellow-400 rounded-full"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                  />
                  <span className="text-yellow-400 uppercase tracking-wider">POINTS: 475</span>
                </div>
                <div className="text-gray-400 hidden sm:block">|</div>
                <div className="flex items-center space-x-2">
                  <motion.div 
                    className="w-3 h-3 bg-red-400 rounded-full"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                  />
                  <span className="text-red-400 uppercase tracking-wider">FASTEST LAPS: 25</span>
                </div>
              </div>

              {/* F1 Technical Information */}
              <div className="grid grid-cols-2 lg:flex lg:justify-center lg:items-center lg:space-x-8 gap-2 lg:gap-0 text-xs font-f1 max-w-4xl">
                {/* DRS Status */}
                <div className="flex items-center space-x-1 sm:space-x-2 bg-black/40 rounded-lg px-2 sm:px-3 py-2 border border-green-400/30">
                  <motion.div 
                    className="w-2 h-2 bg-green-400 rounded-full"
                    animate={{ 
                      boxShadow: [
                        "0 0 5px rgba(34, 197, 94, 0.5)",
                        "0 0 15px rgba(34, 197, 94, 0.8)",
                        "0 0 5px rgba(34, 197, 94, 0.5)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                  <span className="text-green-400 text-xs">DRS</span>
                </div>

                {/* Tire Compound */}
                <div className="flex items-center space-x-1 sm:space-x-2 bg-black/40 rounded-lg px-2 sm:px-3 py-2 border border-red-400/30">
                  <motion.div 
                    className="w-2 h-2 bg-red-400 rounded-full"
                    animate={{ 
                      rotate: [0, 360],
                      scale: [0.8, 1.2, 0.8]
                    }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  />
                  <span className="text-red-400 text-xs">SOFT</span>
                </div>

                {/* Fuel Level */}
                <div className="flex items-center space-x-1 sm:space-x-2 bg-black/40 rounded-lg px-2 sm:px-3 py-2 border border-blue-400/30">
                  <motion.div 
                    className="w-8 h-1 bg-blue-400/20 rounded-full overflow-hidden"
                  >
                    <motion.div 
                      className="h-full bg-blue-400 rounded-full"
                      animate={{ width: ["60%", "80%", "60%"] }}
                      transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                    />
                  </motion.div>
                  <span className="text-blue-400 text-xs">FUEL: 68%</span>
                </div>

                {/* ERS Status */}
                <div className="flex items-center space-x-1 sm:space-x-2 bg-black/40 rounded-lg px-2 sm:px-3 py-2 border border-purple-400/30">
                  <motion.div 
                    className="flex space-x-1"
                  >
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-1 h-3 bg-purple-400/30 rounded-full"
                        animate={{
                          backgroundColor: [
                            "rgba(168, 85, 247, 0.3)",
                            "rgba(168, 85, 247, 1)",
                            "rgba(168, 85, 247, 0.3)"
                          ]
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: i * 0.2
                        }}
                      />
                    ))}
                  </motion.div>
                  <span className="text-purple-400 text-xs">ERS</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
            {/* Left Column - Scrolls Up */}
            <motion.div className="space-y-8" style={{ y: leftColumnY }}>
              {achievements.slice(0, 2).map((achievement, index) => (
                <motion.div
                  key={achievement.title}
                  className="bg-gradient-to-br from-gray-900/80 to-black/80 border border-purple-500/20 rounded-xl p-8 text-center backdrop-blur-sm hover:border-yellow-400/40 transition-all duration-300 group relative overflow-hidden"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  {/* Racing Stripes */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-red-500 to-yellow-400 group-hover:h-2 transition-all duration-300" />
                  
                  {/* Pit Stop Timer Effect */}
                  <motion.div 
                    className="absolute top-2 right-2 text-xs font-f1 text-green-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    animate={{
                      opacity: [0, 1, 0]
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    2.3s
                  </motion.div>

                  <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                    <achievement.icon className="h-8 w-8 text-white z-10" />
                    {/* Spinning tire effect */}
                    <motion.div 
                      className="absolute inset-0 border-2 border-dashed border-yellow-400/50 rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    />
                  </div>
                  
                  <h3 className="font-f1 text-2xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">{achievement.title}</h3>
                  <p className="font-f1 text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:from-yellow-400 group-hover:to-red-400 transition-all duration-300">
                    {achievement.count}
                  </p>

                  {/* F1 Performance Bars */}
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-xs font-f1">
                      <span className="text-gray-400">PERFORMANCE</span>
                      <span className="text-green-400">98%</span>
                    </div>
                    <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-green-400 to-yellow-400 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: "98%" }}
                        transition={{ duration: 2, delay: index * 0.3 }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Center Column - Scrolls Normally */}
            <motion.div className="space-y-8" style={{ y: centerColumnY }}>
              <div className="bg-gradient-to-br from-gray-900/80 to-black/80 border border-purple-500/20 rounded-xl p-8 backdrop-blur-sm relative overflow-hidden group">
                {/* Racing Circuit Background */}
                <div className="absolute inset-0 opacity-10">
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    <motion.path
                      d="M20,100 Q100,20 180,100 Q100,180 20,100"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-yellow-400"
                      animate={{
                        strokeDasharray: ["0, 300", "150, 150", "300, 0"]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear"
                      }}
                    />
                  </svg>
                </div>

                <h3 className="font-f1 text-3xl font-bold text-white mb-6 text-center">🏎️ LIVE TELEMETRY</h3>
                <p className="font-f1 text-sm text-gray-400 text-center mb-4">Real-time 3D performance monitoring</p>
                
                {/* Pit Lane Status */}
                <div className="flex justify-center mb-4 space-x-4">
                  <motion.div 
                    className="flex items-center space-x-1 text-xs font-f1"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-green-400">PIT LANE OPEN</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center space-x-1 text-xs font-f1"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                  >
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span className="text-yellow-400">SECTOR 2</span>
                  </motion.div>
                </div>

                <div className="h-64 relative">
                  <Portfolio3DScene />
                  {/* Speed overlay */}
                  <div className="absolute top-2 left-2 bg-black/60 rounded px-2 py-1 text-xs font-f1">
                    <motion.span 
                      className="text-red-400"
                      animate={{ 
                        color: ["#f87171", "#fbbf24", "#f87171"]
                      }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                    >
                      312 KM/H
                    </motion.span>
                  </div>
                </div>
                
                <div className="flex justify-center mt-4 space-x-4 text-xs font-f1">
                  <span className="text-green-400 flex items-center space-x-1">
                    <motion.div 
                      className="w-2 h-2 bg-green-400 rounded-full"
                      animate={{ scale: [0.8, 1.2, 0.8] }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                    />
                    <span>ENGINE: OPTIMAL</span>
                  </span>
                  <span className="text-blue-400 flex items-center space-x-1">
                    <motion.div 
                      className="w-2 h-2 bg-blue-400 rounded-full"
                      animate={{ scale: [0.8, 1.2, 0.8] }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: 0.3 }}
                    />
                    <span>AERO: BALANCED</span>
                  </span>
                  <span className="text-purple-400 flex items-center space-x-1">
                    <motion.div 
                      className="w-2 h-2 bg-purple-400 rounded-full"
                      animate={{ scale: [0.8, 1.2, 0.8] }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: 0.6 }}
                    />
                    <span>TYRES: FRESH</span>
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Scrolls Down */}
            <motion.div className="space-y-8" style={{ y: rightColumnY }}>
              {achievements.slice(2, 4).map((achievement, index) => (
                <motion.div
                  key={achievement.title}
                  className="bg-gradient-to-br from-gray-900/80 to-black/80 border border-purple-500/20 rounded-xl p-8 text-center backdrop-blur-sm hover:border-yellow-400/40 transition-all duration-300 group relative overflow-hidden"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  {/* Racing Stripes */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-400 via-yellow-500 to-red-400 group-hover:h-2 transition-all duration-300" />
                  
                  {/* Lap Time Effect */}
                  <motion.div 
                    className="absolute top-2 left-2 text-xs font-f1 text-green-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    animate={{
                      opacity: [0, 1, 0]
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                  >
                    1:23.456
                  </motion.div>

                  <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                    <achievement.icon className="h-8 w-8 text-white z-10" />
                    {/* Spinning tire effect - opposite direction */}
                    <motion.div 
                      className="absolute inset-0 border-2 border-dashed border-red-400/50 rounded-full"
                      animate={{ rotate: -360 }}
                      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    />
                  </div>
                  
                  <h3 className="font-f1 text-2xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">{achievement.title}</h3>
                  <p className="font-f1 text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:from-red-400 group-hover:to-yellow-400 transition-all duration-300">
                    {achievement.count}
                  </p>

                  {/* F1 Performance Bars */}
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-xs font-f1">
                      <span className="text-gray-400">RELIABILITY</span>
                      <span className="text-green-400">100%</span>
                    </div>
                    <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-red-400 to-green-400 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        transition={{ duration: 2, delay: index * 0.3 + 0.5 }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-20 relative z-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-purple-950/40 to-black/80 backdrop-blur-sm" />
        
        {/* F1 Racing Grid Background */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          {/* Checkered flag pattern */}
          <div className="absolute inset-0" style={{
            backgroundImage: `
              repeating-conic-gradient(from 0deg at 50% 50%, 
                transparent 0deg, transparent 45deg, 
                rgba(255,255,255,0.05) 45deg, rgba(255,255,255,0.05) 90deg)
            `,
            backgroundSize: '60px 60px'
          }} />
          
          {/* Racing track lines */}
          <motion.div
            className="absolute top-1/4 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent"
            animate={{
              opacity: [0.2, 0.6, 0.2],
              scaleX: [0.8, 1.2, 0.8]
            }}
            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
          />
          <motion.div
            className="absolute bottom-1/4 w-full h-0.5 bg-gradient-to-r from-transparent via-red-400/30 to-transparent"
            animate={{
              opacity: [0.1, 0.4, 0.1],
              scaleX: [1.2, 0.8, 1.2]
            }}
            transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, delay: 2 }}
          />
        </div>

        {/* F1 Championship Status Lights */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          <motion.div
            className="w-4 h-4 rounded-full bg-red-500 border-2 border-red-300"
            animate={{ 
              opacity: [1, 0.3, 1],
              boxShadow: [
                "0 0 10px rgba(239, 68, 68, 0.5)",
                "0 0 20px rgba(239, 68, 68, 0.8)",
                "0 0 10px rgba(239, 68, 68, 0.5)"
              ]
            }}
            transition={{ duration: 1.2, repeat: Number.POSITIVE_INFINITY }}
          />
          <motion.div
            className="w-4 h-4 rounded-full bg-yellow-500 border-2 border-yellow-300"
            animate={{ 
              opacity: [1, 0.3, 1],
              boxShadow: [
                "0 0 10px rgba(234, 179, 8, 0.5)",
                "0 0 20px rgba(234, 179, 8, 0.8)",
                "0 0 10px rgba(234, 179, 8, 0.5)"
              ]
            }}
            transition={{ duration: 1.2, repeat: Number.POSITIVE_INFINITY, delay: 0.4 }}
          />
          <motion.div
            className="w-4 h-4 rounded-full bg-green-500 border-2 border-green-300"
            animate={{ 
              opacity: [1, 0.3, 1],
              boxShadow: [
                "0 0 10px rgba(34, 197, 94, 0.5)",
                "0 0 20px rgba(34, 197, 94, 0.8)",
                "0 0 10px rgba(34, 197, 94, 0.5)"
              ]
            }}
            transition={{ duration: 1.2, repeat: Number.POSITIVE_INFINITY, delay: 0.8 }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 
              className="font-f1 text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent tracking-wider"
              animate={{
                textShadow: [
                  "0 0 20px rgba(168, 85, 247, 0.4)",
                  "0 0 40px rgba(168, 85, 247, 0.6)",
                  "0 0 20px rgba(168, 85, 247, 0.4)"
                ]
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              🏆 CONSTRUCTOR CHAMPIONSHIP
            </motion.h2>
            <p className="font-f1 text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              🏁 Performance metrics that secure our position at the front of the grid
              <br />
              ⚡ Data-driven excellence across every racing metric
            </p>
            
            {/* F1 Championship Status Bar */}
            <motion.div 
              className="flex justify-center items-center space-x-6 text-sm font-f1 bg-black/60 rounded-full px-8 py-4 border border-yellow-400/40 backdrop-blur-sm mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center space-x-2">
                <motion.div 
                  className="w-3 h-3 bg-green-400 rounded-full"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                />
                <span className="text-green-400 uppercase tracking-wider">GRID POSITION: P1</span>
              </div>
              <div className="text-gray-400">|</div>
              <div className="flex items-center space-x-2">
                <motion.div 
                  className="w-3 h-3 bg-yellow-400 rounded-full"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                />
                <span className="text-yellow-400 uppercase tracking-wider">CHAMPIONSHIP POINTS: 475</span>
              </div>
              <div className="text-gray-400">|</div>
              <div className="flex items-center space-x-2">
                <motion.div 
                  className="w-3 h-3 bg-red-400 rounded-full"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                />
                <span className="text-red-400 uppercase tracking-wider">FASTEST LAP: 1:23.456</span>
              </div>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5, rotateY: -15 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="text-center group relative"
                style={{ 
                  perspective: "1000px",
                  transformStyle: "preserve-3d"
                }}
              >
                <div className="bg-gradient-to-br from-gray-900/90 to-black/90 border-2 border-purple-500/30 rounded-xl p-6 group-hover:border-yellow-400/60 transition-all duration-300 backdrop-blur-sm relative overflow-hidden">
                  {/* Racing stripes */}
                  <div className="absolute top-0 left-2 right-2 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-full" />
                  <div className="absolute bottom-0 left-2 right-2 h-1 bg-gradient-to-r from-yellow-400 via-red-500 to-yellow-400 rounded-full" />
                  
                  {/* Corner racing elements */}
                  <div className="absolute top-1 left-1 w-3 h-3 border-l-2 border-t-2 border-yellow-400/60" />
                  <div className="absolute top-1 right-1 w-3 h-3 border-r-2 border-t-2 border-yellow-400/60" />
                  <div className="absolute bottom-1 left-1 w-3 h-3 border-l-2 border-b-2 border-yellow-400/60" />
                  <div className="absolute bottom-1 right-1 w-3 h-3 border-r-2 border-b-2 border-yellow-400/60" />

                  {/* Racing glow effect */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-xl"
                    animate={{
                      opacity: [0.1, 0.3, 0.1]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Number.POSITIVE_INFINITY,
                      delay: index * 0.7 
                    }}
                  />

                  {/* Pit stop timer effect */}
                  <motion.div 
                    className="absolute top-2 right-2 text-xs font-f1 text-green-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    animate={{
                      opacity: [0, 1, 0]
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    {(index + 1) * 0.8}s
                  </motion.div>

                  {/* Position indicator */}
                  <div className="absolute top-2 left-2 bg-black/70 rounded-full px-2 py-1 text-xs font-f1 text-yellow-400">
                    P{index + 1}
                  </div>

                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.5, type: "spring" }}
                    className="font-f1 text-4xl md:text-6xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 mt-6 group-hover:from-yellow-400 group-hover:to-red-400 transition-all duration-300"
                  >
                    {stat.value}
                    <span className="font-f1 text-2xl md:text-3xl">{stat.unit}</span>
                  </motion.div>
                  
                  <p className="font-f1 text-gray-400 font-medium group-hover:text-gray-300 transition-colors mb-4 uppercase tracking-wider">{stat.label}</p>

                  {/* F1-style telemetry data */}
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="bg-black/50 rounded-lg p-2 border border-green-400/30">
                      <div className="text-xs text-green-400 font-f1 mb-1">SECTOR</div>
                      <div className="text-sm font-bold text-green-400 font-mono">{index + 1}</div>
                    </div>
                    <div className="bg-black/50 rounded-lg p-2 border border-blue-400/30">
                      <div className="text-xs text-blue-400 font-f1 mb-1">STATUS</div>
                      <div className="text-sm font-bold text-blue-400 font-mono">LIVE</div>
                    </div>
                  </div>

                  {/* Racing status lights */}
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-1">
                      <motion.div 
                        className="w-2 h-2 bg-green-400 rounded-full"
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                      />
                      <motion.div 
                        className="w-2 h-2 bg-yellow-400 rounded-full"
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: 0.3 }}
                      />
                      <motion.div 
                        className="w-2 h-2 bg-red-400 rounded-full"
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: 0.6 }}
                      />
                    </div>
                    <div className="text-xs font-f1 text-gray-400 uppercase tracking-wider">
                      OPTIMAL
                    </div>
                  </div>

                  {/* Performance meter */}
                  <div className="mt-3">
                    <div className="flex justify-between text-xs font-f1 mb-1">
                      <span className="text-gray-400">PERFORMANCE</span>
                      <span className="text-green-400">{95 + index}%</span>
                    </div>
                    <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-green-400 to-yellow-400 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${95 + index}%` }}
                        transition={{ duration: 2, delay: index * 0.3 }}
                      />
                    </div>
                  </div>
                </div>

                {/* Racing sparks effect on hover */}
                <AnimatePresence>
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-6 pointer-events-none"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {[...Array(4)].map((_, sparkIndex) => (
                      <motion.div
                        key={sparkIndex}
                        className="absolute bottom-0 w-1 h-1 bg-yellow-400 rounded-full"
                        style={{ left: `${sparkIndex * 25 + 12.5}%` }}
                        animate={{
                          y: [0, -15, -30],
                          opacity: [1, 0.6, 0],
                          scale: [1, 0.5, 0]
                        }}
                        transition={{
                          duration: 0.6,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: sparkIndex * 0.1
                        }}
                      />
                    ))}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* F1 Championship Leaderboard */}
          <motion.div 
            className="relative z-10 max-w-4xl mx-auto mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            <div className="bg-black/60 rounded-2xl p-8 border border-yellow-400/30 backdrop-blur-sm">
              <div className="text-center mb-6">
                <h3 className="font-f1 text-2xl font-bold text-white mb-2">🏁 FINAL CHAMPIONSHIP STANDINGS</h3>
                <p className="font-f1 text-sm text-gray-400">Season 2024 - Constructor Championship Results</p>
              </div>
              
              <div className="flex justify-center">
                <div className="bg-black/60 rounded-full px-12 py-6 border border-yellow-400/40 backdrop-blur-sm">
                  <div className="flex items-center space-x-8 font-f1 text-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-yellow-400 rounded-full animate-pulse" />
                      <span className="text-yellow-400 font-bold uppercase tracking-wider">🏆 P1: ENSHIFT RACING</span>
                    </div>
                    <div className="text-gray-400">|</div>
                    <div className="text-white font-bold">
                      475 POINTS
                    </div>
                    <div className="text-gray-400">|</div>
                    <div className="text-green-400 uppercase tracking-wider font-bold">
                      CHAMPIONS 👑
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative z-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-gray-900/60 to-black/80 backdrop-blur-sm" />

        {/* F1 Racing Grid Background */}
        <div className="absolute inset-0 pointer-events-none opacity-15">
          {/* Checkered flag pattern */}
          <div className="absolute inset-0" style={{
            backgroundImage: `
              repeating-conic-gradient(from 0deg at 50% 50%, 
                transparent 0deg, transparent 45deg, 
                rgba(255,255,255,0.08) 45deg, rgba(255,255,255,0.08) 90deg)
            `,
            backgroundSize: '50px 50px'
          }} />
          
          {/* Animated racing track lines */}
          <motion.div
            className="absolute top-1/3 w-full h-2 bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent"
            animate={{
              opacity: [0.3, 0.7, 0.3],
              scaleX: [0.8, 1.3, 0.8]
            }}
            transition={{ duration: 4.5, repeat: Number.POSITIVE_INFINITY }}
          />
          <motion.div
            className="absolute top-2/3 w-full h-1 bg-gradient-to-r from-transparent via-red-400/40 to-transparent"
            animate={{
              opacity: [0.2, 0.6, 0.2],
              scaleX: [1.3, 0.7, 1.3]
            }}
            transition={{ duration: 5.5, repeat: Number.POSITIVE_INFINITY, delay: 2 }}
          />
          <motion.div
            className="absolute bottom-1/4 w-full h-1 bg-gradient-to-r from-transparent via-purple-400/30 to-transparent"
            animate={{
              opacity: [0.4, 0.8, 0.4],
              scaleX: [0.9, 1.4, 0.9]
            }}
            transition={{ duration: 3.8, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
          />
        </div>

        {/* F1 Paddock Status Lights */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
          <motion.div
            className="w-5 h-5 rounded-full bg-red-500 border-2 border-red-300"
            animate={{ 
              opacity: [1, 0.3, 1],
              boxShadow: [
                "0 0 15px rgba(239, 68, 68, 0.5)",
                "0 0 25px rgba(239, 68, 68, 0.8)",
                "0 0 15px rgba(239, 68, 68, 0.5)"
              ]
            }}
            transition={{ duration: 1.3, repeat: Number.POSITIVE_INFINITY }}
          />
          <motion.div
            className="w-5 h-5 rounded-full bg-yellow-500 border-2 border-yellow-300"
            animate={{ 
              opacity: [1, 0.3, 1],
              boxShadow: [
                "0 0 15px rgba(234, 179, 8, 0.5)",
                "0 0 25px rgba(234, 179, 8, 0.8)",
                "0 0 15px rgba(234, 179, 8, 0.5)"
              ]
            }}
            transition={{ duration: 1.3, repeat: Number.POSITIVE_INFINITY, delay: 0.4 }}
          />
          <motion.div
            className="w-5 h-5 rounded-full bg-green-500 border-2 border-green-300"
            animate={{ 
              opacity: [1, 0.3, 1],
              boxShadow: [
                "0 0 15px rgba(34, 197, 94, 0.5)",
                "0 0 25px rgba(34, 197, 94, 0.8)",
                "0 0 15px rgba(34, 197, 94, 0.5)"
              ]
            }}
            transition={{ duration: 1.3, repeat: Number.POSITIVE_INFINITY, delay: 0.8 }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 
              className="font-f1 text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent tracking-wider"
              animate={{
                textShadow: [
                  "0 0 20px rgba(168, 85, 247, 0.4)",
                  "0 0 40px rgba(168, 85, 247, 0.6)",
                  "0 0 20px rgba(168, 85, 247, 0.4)"
                ]
              }}
              transition={{ duration: 3.5, repeat: Number.POSITIVE_INFINITY }}
            >
              🏁 ENTER THE PADDOCK
            </motion.h2>
            <p className="font-f1 text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              🏆 Ready to join the championship grid? Let's discuss your next pole position strategy.
              <br />
              📻 Radio in to discuss your high-performance project requirements
            </p>

            {/* F1 Team Radio Status Bar */}
            <motion.div 
              className="flex justify-center items-center space-x-6 text-sm font-f1 bg-black/60 rounded-full px-8 py-4 border border-yellow-400/40 backdrop-blur-sm mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center space-x-2">
                <motion.div 
                  className="w-3 h-3 bg-green-400 rounded-full"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                />
                <span className="text-green-400 uppercase tracking-wider">TEAM RADIO: OPEN</span>
              </div>
              <div className="text-gray-400">|</div>
              <div className="flex items-center space-x-2">
                <motion.div 
                  className="w-3 h-3 bg-yellow-400 rounded-full"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                />
                <span className="text-yellow-400 uppercase tracking-wider">PADDOCK: ACTIVE</span>
              </div>
              <div className="text-gray-400">|</div>
              <div className="flex items-center space-x-2">
                <motion.div 
                  className="w-3 h-3 bg-red-400 rounded-full"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                />
                <span className="text-red-400 uppercase tracking-wider">RESPONSE: &lt; 2H</span>
              </div>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="relative bg-gradient-to-br from-gray-900/90 to-black/90 border-2 border-purple-500/30 rounded-xl p-8 backdrop-blur-sm overflow-hidden group hover:border-yellow-400/50 transition-all duration-300">
                {/* Racing stripes */}
                <div className="absolute top-0 left-4 right-4 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-full" />
                <div className="absolute bottom-0 left-4 right-4 h-1 bg-gradient-to-r from-yellow-400 via-red-500 to-yellow-400 rounded-full" />
                
                {/* Corner racing elements */}
                <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-yellow-400/60" />
                <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-yellow-400/60" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-yellow-400/60" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-yellow-400/60" />

                {/* Racing glow effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-xl"
                  animate={{
                    opacity: [0.1, 0.3, 0.1]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Number.POSITIVE_INFINITY
                  }}
                />

                {/* Pit Lane Timer */}
                <motion.div 
                  className="absolute top-2 right-12 text-xs font-f1 text-green-400"
                  animate={{
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  PIT LANE: 2.3s
                </motion.div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-f1 text-2xl font-bold text-white uppercase tracking-wider">🏁 TEAM PRINCIPAL CONTACT</h3>
                    <motion.div 
                      className="flex space-x-1"
                      animate={{
                        opacity: [0.6, 1, 0.6]
                      }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    </motion.div>
                  </div>

                  <div className="space-y-6">
                    <motion.div 
                      className="flex items-center space-x-4 group"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="relative w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center group-hover:from-yellow-400 group-hover:to-red-400 transition-all duration-300">
                        <Mail className="h-6 w-6 text-white z-10" />
                        {/* Spinning tire effect */}
                        <motion.div 
                          className="absolute inset-0 border-2 border-dashed border-white/30 rounded-lg"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        />
                      </div>
                      <div>
                        <p className="font-f1 text-white font-medium uppercase tracking-wider">📧 TEAM RADIO</p>
                        <p className="text-gray-400 font-mono">hello@enshift.digital</p>
                        <div className="text-xs text-green-400 font-f1 mt-1">STATUS: ONLINE</div>
                      </div>
                    </motion.div>

                    <motion.div 
                      className="flex items-center space-x-4 group"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="relative w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center group-hover:from-yellow-400 group-hover:to-red-400 transition-all duration-300">
                        <Phone className="h-6 w-6 text-white z-10" />
                        {/* Pulsing effect */}
                        <motion.div 
                          className="absolute inset-0 bg-yellow-400/20 rounded-lg"
                          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        />
                      </div>
                      <div>
                        <p className="font-f1 text-white font-medium uppercase tracking-wider">📞 CIRCUIT HOTLINE</p>
                        <p className="font-f1 text-gray-400">+1 (555) RACING-1</p>
                        <div className="text-xs text-yellow-400 font-f1 mt-1">RESPONSE TIME: &lt; 2H</div>
                      </div>
                    </motion.div>

                    <motion.div 
                      className="flex items-center space-x-4 group"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="relative w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center group-hover:from-yellow-400 group-hover:to-red-400 transition-all duration-300">
                        <MapPin className="h-6 w-6 text-white z-10" />
                        {/* Racing stripes animation */}
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-lg"
                          animate={{ x: [-20, 20, -20] }}
                          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                        />
                      </div>
                      <div>
                        <p className="font-f1 text-white font-medium uppercase tracking-wider">🏁 RACING HQ</p>
                        <p className="font-f1 text-gray-400">Monaco Grand Prix Circuit, MC</p>
                        <div className="text-xs text-red-400 font-f1 mt-1">SECTOR: PADDOCK CLUB</div>
                      </div>
                    </motion.div>
                  </div>

                  {/* F1 Team Information Panel */}
                  <div className="mt-6 pt-6 border-t border-purple-500/20">
                    <div className="grid grid-cols-2 gap-4 text-xs font-f1">
                      <div className="bg-black/50 rounded-lg p-3 border border-green-400/30">
                        <div className="text-green-400 mb-1">TEAM STATUS</div>
                        <div className="text-white font-bold">CHAMPIONSHIP READY</div>
                      </div>
                      <div className="bg-black/50 rounded-lg p-3 border border-blue-400/30">
                        <div className="text-blue-400 mb-1">AVAILABILITY</div>
                        <div className="text-white font-bold">24/7 SUPPORT</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
            >
              <div className="relative bg-gradient-to-br from-gray-900/90 to-black/90 border-2 border-purple-500/30 rounded-xl p-8 backdrop-blur-sm overflow-hidden group hover:border-yellow-400/50 transition-all duration-300">
                {/* Racing stripes */}
                <div className="absolute top-0 left-4 right-4 h-1 bg-gradient-to-r from-red-500 via-yellow-500 to-red-500 rounded-full" />
                <div className="absolute bottom-0 left-4 right-4 h-1 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 rounded-full" />
                
                {/* Corner racing elements */}
                <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-red-400/60" />
                <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-red-400/60" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-red-400/60" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-red-400/60" />

                {/* Racing glow effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-yellow-600/10 rounded-xl"
                  animate={{
                    opacity: [0.1, 0.3, 0.1]
                  }}
                  transition={{ 
                    duration: 2.5, 
                    repeat: Number.POSITIVE_INFINITY,
                    delay: 1
                  }}
                />

                {/* Qualifying Timer */}
                <motion.div 
                  className="absolute top-2 left-12 text-xs font-f1 text-yellow-400"
                  animate={{
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                >
                  QUALIFYING: 1:23.456
                </motion.div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-f1 text-xl font-bold text-white uppercase tracking-wider">🏎️ JOIN THE GRID</h3>
                    <div className="bg-black/70 rounded-full px-3 py-1 text-xs font-f1 text-yellow-400">
                      GRID POSITION: OPEN
                    </div>
                  </div>

                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="font-f1 block text-sm font-medium text-gray-300 mb-2 uppercase tracking-wider">🏁 DRIVER NAME</label>
                        <Input
                          className="bg-black/50 border-purple-500/30 text-white placeholder-gray-500 focus:border-yellow-400 focus:ring-yellow-400/20 font-f1"
                          placeholder="Lewis"
                        />
                      </div>
                      <div>
                        <label className="font-f1 block text-sm font-medium text-gray-300 mb-2 uppercase tracking-wider">🏆 TEAM NAME</label>
                        <Input
                          className="bg-black/50 border-purple-500/30 text-white placeholder-gray-500 focus:border-yellow-400 focus:ring-yellow-400/20 font-f1"
                          placeholder="Hamilton"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-f1 block text-sm font-medium text-gray-300 mb-2 uppercase tracking-wider">📧 TEAM RADIO FREQUENCY</label>
                      <Input
                        type="email"
                        className="bg-black/50 border-purple-500/30 text-white placeholder-gray-500 focus:border-yellow-400 focus:ring-yellow-400/20 font-f1"
                        placeholder="lewis@mercedesf1.com"
                      />
                    </div>

                    <div>
                      <label className="font-f1 block text-sm font-medium text-gray-300 mb-2 uppercase tracking-wider">🏁 CHAMPIONSHIP STRATEGY</label>
                      <Textarea
                        className="bg-black/50 border-purple-500/30 text-white placeholder-gray-500 focus:border-yellow-400 focus:ring-yellow-400/20 min-h-[120px] font-f1"
                        placeholder="Describe your championship-winning project strategy. What's your target lap time? What performance goals are we aiming for? Any specific technical requirements for pole position?"
                      />
                    </div>

                    {/* F1 Race Options */}
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div className="bg-black/50 rounded-lg p-3 border border-green-400/30 text-center">
                        <div className="text-xs text-green-400 font-f1 mb-1">PROJECT TYPE</div>
                        <div className="text-sm font-bold text-white font-f1">SPRINT RACE</div>
                      </div>
                      <div className="bg-black/50 rounded-lg p-3 border border-yellow-400/30 text-center">
                        <div className="text-xs text-yellow-400 font-f1 mb-1">TIMELINE</div>
                        <div className="text-sm font-bold text-white font-f1">GRAND PRIX</div>
                      </div>
                      <div className="bg-black/50 rounded-lg p-3 border border-red-400/30 text-center">
                        <div className="text-xs text-red-400 font-f1 mb-1">BUDGET</div>
                        <div className="text-sm font-bold text-white font-f1">CHAMPIONSHIP</div>
                      </div>
                    </div>

                    <GlowButton
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 text-lg font-semibold group relative overflow-hidden"
                      glowVariant="f1"
                      raceMode={true}
                      glowColor="#6C00FF"
                      sparkCount={25}
                      data-cursor="button"
                      data-cursor-text="Start Engine"
                    >
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-red-400/20"
                        animate={{
                          x: [-100, 400],
                          opacity: [0, 0.5, 0]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear"
                        }}
                      />
                      <span className="relative z-10 font-f1 uppercase tracking-wider">
                        🏁 START YOUR ENGINE
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform inline" />
                      </span>
                    </GlowButton>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>

          {/* F1 Paddock Club Information */}
          <motion.div 
            className="mt-16 bg-black/60 rounded-2xl p-8 border border-yellow-400/30 backdrop-blur-sm"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <div className="text-center mb-6">
              <h3 className="font-f1 text-2xl font-bold text-white mb-2 uppercase tracking-wider">🏆 PADDOCK CLUB PRIVILEGES</h3>
              <p className="font-f1 text-sm text-gray-400">Exclusive access to championship-grade development resources</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <motion.div 
                  className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <span className="text-white font-bold text-lg">⚡</span>
                </motion.div>
                <div className="font-f1 text-sm font-bold text-green-400 uppercase tracking-wider">INSTANT RESPONSE</div>
                <div className="font-f1 text-xs text-gray-400 mt-1">&lt; 2 Hour Turnaround</div>
              </div>
              
              <div className="text-center">
                <motion.div 
                  className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-3"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <span className="text-white font-bold text-lg">🏁</span>
                </motion.div>
                <div className="font-f1 text-sm font-bold text-yellow-400 uppercase tracking-wider">POLE POSITION</div>
                <div className="font-f1 text-xs text-gray-400 mt-1">Priority Project Queue</div>
              </div>
              
              <div className="text-center">
                <motion.div 
                  className="w-12 h-12 bg-gradient-to-r from-red-400 to-red-600 rounded-full flex items-center justify-center mx-auto mb-3"
                  animate={{ 
                    boxShadow: [
                      "0 0 10px rgba(248, 113, 113, 0.5)",
                      "0 0 20px rgba(248, 113, 113, 0.8)",
                      "0 0 10px rgba(248, 113, 113, 0.5)"
                    ]
                  }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                >
                  <span className="text-white font-bold text-lg">🏆</span>
                </motion.div>
                <div className="font-f1 text-sm font-bold text-red-400 uppercase tracking-wider">CHAMPIONSHIP SUPPORT</div>
                <div className="font-f1 text-xs text-gray-400 mt-1">24/7 Technical Team</div>
              </div>
              
              <div className="text-center">
                <motion.div 
                  className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3"
                  animate={{ 
                    y: [0, -5, 0],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                >
                  <span className="text-white font-bold text-lg">🚀</span>
                </motion.div>
                <div className="font-f1 text-sm font-bold text-purple-400 uppercase tracking-wider">MAXIMUM PERFORMANCE</div>
                <div className="font-f1 text-xs text-gray-400 mt-1">Racing-Grade Solutions</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-purple-500/20 relative z-20">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h3 className="font-f1 text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                🏎️ Enshift Racing Digital
              </h3>
              <p className="font-f1 text-gray-400">🏁 Championship-grade digital experiences engineered for victory</p>
              <p className="font-f1 text-sm text-purple-400 mt-2">SCUDERIA ENSHIFT | DIGITAL MOTORSPORT DIVISION</p>
            </motion.div>

            <div className="border-t border-purple-500/20 pt-8">
              <p className="font-f1 text-gray-500">© 2024 Enshift Racing Digital. All rights reserved. 🏆 Built for podium finishes.</p>
              <p className="font-f1 text-xs text-gray-600 mt-2">🚀 "That's what speed looks like!" - Team Principal</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
