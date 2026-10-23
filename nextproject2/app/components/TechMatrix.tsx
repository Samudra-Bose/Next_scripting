"use client"

import { useState } from "react"
import { sound } from "@/app/lib/sound"
import { Layers } from "lucide-react"

type TechItem = {
  id: "fdm" | "sla" | "sls"
  name: string
  fullName: string
  badge: string
  resolution: string
  speed: string
  strength: string
  support: string
  cost: string
  idealFor: string
  accent: string
  stats: {
    resolutionScore: number // 0 to 100
    speedScore: number
    strengthScore: number
    surfaceScore: number
  }
}

const TECHNOLOGIES: TechItem[] = [
  {
    id: "fdm",
    name: "FDM / FFF",
    fullName: "Fused Deposition Modeling",
    badge: "MAKER STANDARD // RAPID PROTOTYPING",
    resolution: "0.08 - 0.28 mm",
    speed: "Up to 500 mm/s (CoreXY)",
    strength: "High (PLA-CF / PETG / Nylon)",
    support: "Breakaway or Soluble PVA",
    cost: "Lowest ($0.02 / gram)",
    idealFor: "Functional enclosures, mechanical gears, large costume armor, and rapid iterating.",
    accent: "border-pink-500 text-pink-600 dark:text-pink-400",
    stats: {
      resolutionScore: 75,
      speedScore: 92,
      strengthScore: 88,
      surfaceScore: 70,
    },
  },
  {
    id: "sla",
    name: "SLA / MSLA",
    fullName: "Stereolithography (UV Resin)",
    badge: "ULTRA PRECISION // JEWELRY & MINIATURES",
    resolution: "0.01 - 0.05 mm (18 Micron)",
    speed: "Medium (30 - 60 mm/hr)",
    strength: "Medium-High (Tough / ABS-Like)",
    support: "Micro-supports (Light snip)",
    cost: "Moderate ($0.05 / gram)",
    idealFor: "Intricate tabletop miniatures, dental casts, jewelry masters, and injection-mold finish parts.",
    accent: "border-cyan-500 text-cyan-600 dark:text-cyan-400",
    stats: {
      resolutionScore: 98,
      speedScore: 65,
      strengthScore: 78,
      surfaceScore: 99,
    },
  },
  {
    id: "sls",
    name: "SLS",
    fullName: "Selective Laser Sintering (Powder Bed)",
    badge: "INDUSTRIAL PRODUCTION // SUPPORTLESS",
    resolution: "0.06 - 0.12 mm",
    speed: "High Batch Production",
    strength: "Maximum (PA12 Nylon / Carbon)",
    support: "Supportless (Powder bed acts as support)",
    cost: "Industrial ($0.15 / gram)",
    idealFor: "End-use drone airframes, aerospace ducting, complex interlocking mechanisms, and serial manufacturing.",
    accent: "border-amber-500 text-amber-600 dark:text-amber-400",
    stats: {
      resolutionScore: 88,
      speedScore: 84,
      strengthScore: 98,
      surfaceScore: 86,
    },
  },
]

export default function TechMatrix() {
  const [selectedTech, setSelectedTech] = useState<TechItem>(TECHNOLOGIES[0])

  return (
    <section id="specs" className="w-full hud-border-b py-16 px-4 md:px-8 bg-neutral-50 dark:bg-[#0b0c0f] transition-colors">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-tech text-amber-600 dark:text-amber-400 uppercase tracking-widest mb-1">
              <Layers className="w-3.5 h-3.5" />
              <span>MANUFACTURING STANDARDS // HARDWARE DEEP DIVE</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black font-condensed tracking-tight uppercase">
              3D PRINTING TECHNOLOGY BENCHMARK
            </h2>
          </div>
          <p className="text-xs font-mono-tech text-neutral-500 max-w-sm">
            Compare layer physics, tensile properties, and cost curves across modern additive manufacturing processes.
          </p>
        </div>

        {/* Tech Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {TECHNOLOGIES.map((tech) => {
            const active = selectedTech.id === tech.id
            return (
              <button
                key={tech.id}
                onClick={() => {
                  sound.playClick()
                  setSelectedTech(tech)
                }}
                onMouseEnter={() => sound.playHover()}
                className={`p-5 rounded-xl text-left transition-all hud-border ${
                  active
                    ? "bg-white dark:bg-neutral-900 border-black dark:border-white shadow-md scale-[1.01]"
                    : "bg-white/40 dark:bg-black/30 hover:bg-white/80 dark:hover:bg-neutral-900/60 opacity-80 hover:opacity-100"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono-tech uppercase tracking-wider text-neutral-500">
                    PROCESS 0{tech.id === "fdm" ? "1" : tech.id === "sla" ? "2" : "3"}
                  </span>
                  {active && (
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  )}
                </div>
                <h3 className="text-2xl font-black font-condensed tracking-tight mb-1">
                  {tech.name}
                </h3>
                <p className="text-xs font-mono-tech text-neutral-600 dark:text-neutral-400">
                  {tech.fullName}
                </p>
              </button>
            )
          })}
        </div>

        {/* Deep Dive Card */}
        <div className="p-6 md:p-8 rounded-2xl glass-panel hud-border shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Details (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-block px-3.5 py-1.5 rounded-full text-xs font-mono-tech font-bold uppercase tracking-wider bg-black/10 dark:bg-white/10 text-neutral-900 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-700">
              {selectedTech.badge}
            </div>

            <h4 className="text-2xl md:text-3xl font-extrabold font-condensed tracking-tight uppercase text-neutral-950 dark:text-neutral-50">
              {selectedTech.fullName} ARCHITECTURE
            </h4>

            <p className="text-xs md:text-sm font-mono-tech text-neutral-700 dark:text-neutral-300 leading-relaxed font-medium">
              {selectedTech.idealFor}
            </p>

            {/* Spec Matrix List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono-tech">
              <div className="p-3.5 rounded-lg bg-black/[0.03] dark:bg-white/[0.04] border border-neutral-200 dark:border-neutral-800">
                <span className="text-[10px] text-neutral-600 dark:text-neutral-400 font-bold block uppercase">LAYER RESOLUTION</span>
                <span className="font-bold text-neutral-950 dark:text-neutral-50 text-sm">{selectedTech.resolution}</span>
              </div>
              <div className="p-3.5 rounded-lg bg-black/[0.03] dark:bg-white/[0.04] border border-neutral-200 dark:border-neutral-800">
                <span className="text-[10px] text-neutral-600 dark:text-neutral-400 font-bold block uppercase">PRODUCTION VELOCITY</span>
                <span className="font-bold text-neutral-950 dark:text-neutral-50 text-sm">{selectedTech.speed}</span>
              </div>
              <div className="p-3.5 rounded-lg bg-black/[0.03] dark:bg-white/[0.04] border border-neutral-200 dark:border-neutral-800">
                <span className="text-[10px] text-neutral-600 dark:text-neutral-400 font-bold block uppercase">STRUCTURAL RIGIDITY</span>
                <span className="font-bold text-neutral-950 dark:text-neutral-50 text-sm">{selectedTech.strength}</span>
              </div>
              <div className="p-3.5 rounded-lg bg-black/[0.03] dark:bg-white/[0.04] border border-neutral-200 dark:border-neutral-800">
                <span className="text-[10px] text-neutral-600 dark:text-neutral-400 font-bold block uppercase">SUPPORT OVERHANG RULE</span>
                <span className="font-bold text-neutral-950 dark:text-neutral-50 text-sm">{selectedTech.support}</span>
              </div>
            </div>
          </div>

          {/* Right Radar / Bar Infographics (5 cols) */}
          <div className="lg:col-span-5 p-5 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-neutral-200 dark:border-neutral-800 space-y-4">
            <div className="text-xs font-mono-tech uppercase font-bold text-neutral-500 border-b border-neutral-200 dark:border-neutral-800 pb-2">
              {"// PERFORMANCE RADAR MATRIX"}
            </div>

            <div className="space-y-3 font-mono-tech text-xs">
              {/* Metric 1 */}
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-neutral-500">SURFACE FINISH FIDELITY</span>
                  <span className="font-bold text-neutral-900 dark:text-neutral-100">{selectedTech.stats.surfaceScore}%</span>
                </div>
                <div className="w-full h-2 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-pink-500 transition-all duration-500"
                    style={{ width: `${selectedTech.stats.surfaceScore}%` }}
                  />
                </div>
              </div>

              {/* Metric 2 */}
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-neutral-500">LAYER RESOLUTION (Z-AXIS)</span>
                  <span className="font-bold text-neutral-900 dark:text-neutral-100">{selectedTech.stats.resolutionScore}%</span>
                </div>
                <div className="w-full h-2 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-cyan-500 transition-all duration-500"
                    style={{ width: `${selectedTech.stats.resolutionScore}%` }}
                  />
                </div>
              </div>

              {/* Metric 3 */}
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-neutral-500">MECHANICAL TENSILE STRENGTH</span>
                  <span className="font-bold text-neutral-900 dark:text-neutral-100">{selectedTech.stats.strengthScore}%</span>
                </div>
                <div className="w-full h-2 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 transition-all duration-500"
                    style={{ width: `${selectedTech.stats.strengthScore}%` }}
                  />
                </div>
              </div>

              {/* Metric 4 */}
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-neutral-500">PRINT SPEED & THROUGHPUT</span>
                  <span className="font-bold text-neutral-900 dark:text-neutral-100">{selectedTech.stats.speedScore}%</span>
                </div>
                <div className="w-full h-2 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 transition-all duration-500"
                    style={{ width: `${selectedTech.stats.speedScore}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 text-[11px] font-mono-tech text-neutral-500 flex items-center justify-between">
              <span>CALIBRATED VIA ISO-52900</span>
              <span className="text-pink-600 dark:text-pink-400 font-bold">100% REPRODUCIBLE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
