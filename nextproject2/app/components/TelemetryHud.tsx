// ==============================================================================
// NEXT.JS APP ROUTER CONCEPT: REAL-TIME TELEMETRY STREAM IN CLIENT COMPONENTS
// ==============================================================================
// File location: app/components/TelemetryHud.tsx
// Declared as `"use client"` because it executes real-time JavaScript timers (`setInterval`),
// mutates component state, and triggers Web Audio hover sound effects.
"use client"

import { useEffect, useState } from "react"
import { sound } from "@/app/lib/sound"
import { Activity, Gauge, Flame, Cpu, HardDrive, Zap, CheckCircle2 } from "lucide-react"

export default function TelemetryHud() {
  // State variables simulating live telemetry from CoreXY 3D printer fleet
  const [slices, setSlices] = useState<number>(148924)
  const [hotendTemp, setHotendTemp] = useState<number>(215.2)
  const [bedTemp, setBedTemp] = useState<number>(60.1)
  const [speed, setSpeed] = useState<number>(320)

  // ==============================================================================
  // REACT LIFECYCLE: POLLING / TELEMETRY INTERVAL
  // ==============================================================================
  // Sets up a timer simulating live telemetry data feeds.
  // ALWAYS return a cleanup function `() => clearInterval(interval)` to prevent memory leaks!
  useEffect(() => {
    const interval = setInterval(() => {
      setSlices((prev) => prev + (Math.random() > 0.6 ? 1 : 0))
      setHotendTemp(Number((215.0 + (Math.random() * 0.8 - 0.4)).toFixed(1)))
      setBedTemp(Number((60.0 + (Math.random() * 0.4 - 0.2)).toFixed(1)))
      setSpeed(Math.floor(315 + Math.random() * 20))
    }, 2200)

    // Unmount cleanup function
    return () => clearInterval(interval)
  }, [])

  // Telemetry stat definition array mapped into cards below
  const stats = [
    {
      label: "TOTAL G-CODE SLICES",
      value: slices.toLocaleString(),
      change: "+1,420 this week",
      icon: Cpu,
      accent: "text-neutral-950 dark:text-white",
    },
    {
      label: "DIMENSIONAL TOLERANCE",
      value: "±0.02 mm",
      change: "Certified aerospace grade",
      icon: Gauge,
      accent: "text-[#ff1a75] dark:text-[#ff2a80]",
    },
    {
      label: "STL DEPOSITORY VOLUME",
      value: "4.8 TB",
      change: "100% verified manifolds",
      icon: HardDrive,
      accent: "text-[#00b4d8] dark:text-[#00e5ff]",
    },
    {
      label: "FIRST-LAYER SUCCESS RATE",
      value: "99.4%",
      change: "Zero bed warping index",
      icon: CheckCircle2,
      accent: "text-[#059669] dark:text-[#10b981]",
    },
  ]

  return (
    <section id="telemetry" className="w-full hud-border-b bg-black/[0.015] dark:bg-white/[0.015] py-12">
      
      {/* ==============================================================================
          1. CONTINUOUS LIVE TICKER MARQUEE
          Uses CSS keyframe animation (`animate-marquee`) to scroll live diagnostics indefinitely.
          ============================================================================== */}
      <div className="w-full overflow-hidden hud-border-b pb-4 mb-10">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8 text-xs font-mono-tech tracking-wider text-neutral-800 dark:text-neutral-200 uppercase select-none font-semibold">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping shadow-[0_0_8px_#10b981]" />
            SYSTEM BROADCAST: REAL-TIME SLICING CLOUD ACTIVE
          </span>
          <span className="text-neutral-400">•</span>
          <span className="text-[#ff1a75] font-black">★ FEATURED: ARTICULATED DRAGON PRINT-IN-PLACE</span>
          <span className="text-neutral-400">•</span>
          <span>NOZZLE TEMPERATURE: <strong className="text-pink-600 dark:text-pink-400">{hotendTemp}°C</strong></span>
          <span className="text-neutral-400">•</span>
          <span>FLOW VELOCITY: <strong className="text-cyan-600 dark:text-cyan-400">{speed} MM/S</strong></span>
          <span className="text-neutral-400">•</span>
          <span className="text-cyan-600 dark:text-cyan-400 font-bold">SLS NYLON PA12 SUPPORT ONLINE</span>
          <span className="text-neutral-400">•</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-bold">AUTONOMOUS MANIFOLD REPAIR: 100% PASS</span>
          <span className="text-neutral-400">•</span>
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping shadow-[0_0_8px_#10b981]" />
            SYSTEM BROADCAST: REAL-TIME SLICING CLOUD ACTIVE
          </span>
          <span className="text-neutral-400">•</span>
          <span className="text-[#ff1a75] font-black">★ FEATURED: ARTICULATED DRAGON PRINT-IN-PLACE</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-tech text-pink-600 dark:text-pink-400 uppercase tracking-widest mb-1.5 font-bold">
              <Activity className="w-4 h-4 text-[#ff1a75]" />
              <span>INFOGRAPHIC TELEMETRY // CORE HARDWARE METRICS</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black font-condensed tracking-tight uppercase text-neutral-950 dark:text-neutral-50">
              HIGH-PRECISION HARDWARE BENCHMARKS
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono-tech text-neutral-700 dark:text-neutral-300 max-w-sm font-medium">
            Live telemetry streamed from calibrated industrial CoreXY printers and community slicing nodes globally.
          </p>
        </div>

        {/* ==============================================================================
            2. FOUR-COLUMN INFOGRAPHIC STATS GRID
            Maps over our strongly typed metric list, displaying bold monospace typography.
            ============================================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                onMouseEnter={() => sound.playHover()}
                className="p-5 rounded-xl hud-border glass-panel hover:border-black dark:hover:border-white transition-all group hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="flex items-center justify-between text-neutral-500 mb-3">
                  <span className="text-[11px] font-mono-tech tracking-wider uppercase font-bold text-neutral-600 dark:text-neutral-400">
                    {stat.label}
                  </span>
                  <Icon className="w-4 h-4 group-hover:scale-110 transition-transform text-neutral-800 dark:text-neutral-200" />
                </div>
                <div className={`text-3xl md:text-4xl font-extrabold font-mono-tech tracking-tight mb-1.5 ${stat.accent}`}>
                  {stat.value}
                </div>
                <div className="text-[11px] font-mono-tech text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5 font-medium">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_#10b981]" />
                  {stat.change}
                </div>
              </div>
            )
          })}
        </div>

        {/* ==============================================================================
            3. LIVE PRINTER GAUGES ROW (Hotend, Heated Bed, CoreXY Acceleration)
            Visually represents physical extruder values with animated gradient progress bars.
            ============================================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Gauge 1: Hotend Thermal State */}
          <div className="p-4 rounded-xl hud-border glass-panel flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-lg bg-pink-500/10 text-[#ff1a75] flex items-center justify-center border border-pink-500/20 shadow-sm">
                <Flame className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <span className="text-[10px] font-mono-tech text-neutral-600 dark:text-neutral-400 uppercase font-bold block">
                  ALL-METAL HOTEND
                </span>
                <span className="text-2xl font-black font-mono-tech text-neutral-950 dark:text-neutral-50">
                  {hotendTemp} °C
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono-tech text-emerald-600 dark:text-emerald-400 block font-bold">PID LOCKED</span>
              <div className="w-24 h-2 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden mt-1.5 shadow-inner">
                <div className="w-[72%] h-full bg-gradient-to-r from-pink-500 to-amber-500 rounded-full" />
              </div>
            </div>
          </div>

          {/* Gauge 2: Magnetic PEI Bed Temperature */}
          <div className="p-4 rounded-xl hud-border glass-panel flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-500/20 shadow-sm">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono-tech text-neutral-600 dark:text-neutral-400 uppercase font-bold block">
                  HEATED BED (PEI)
                </span>
                <span className="text-2xl font-black font-mono-tech text-neutral-950 dark:text-neutral-50">
                  {bedTemp} °C
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono-tech text-emerald-600 dark:text-emerald-400 block font-bold">HOMOGENEOUS</span>
              <div className="w-24 h-2 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden mt-1.5 shadow-inner">
                <div className="w-[60%] h-full bg-amber-500 rounded-full" />
              </div>
            </div>
          </div>

          {/* Gauge 3: CoreXY Acceleration & Print Speed */}
          <div className="p-4 rounded-xl hud-border glass-panel flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center border border-cyan-500/20 shadow-sm">
                <Gauge className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono-tech text-neutral-600 dark:text-neutral-400 uppercase font-bold block">
                  TRAVEL ACCEL
                </span>
                <span className="text-2xl font-black font-mono-tech text-neutral-950 dark:text-neutral-50">
                  {speed} mm/s
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono-tech text-cyan-600 dark:text-cyan-400 block font-bold">20,000 MM/S²</span>
              <div className="w-24 h-2 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden mt-1.5 shadow-inner">
                <div className="w-[85%] h-full bg-cyan-500 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
