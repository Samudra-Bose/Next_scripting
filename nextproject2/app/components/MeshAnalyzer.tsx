"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { sound } from "@/app/lib/sound"
import { ShieldCheck, Cpu, Box } from "lucide-react"

type ModelPreset = {
  id: string
  name: string
  polys: number
  dims: { x: number; y: number; z: number }
  weight: number
  time: string
  complexity: string
  geometryType: "dragon" | "helmet" | "gear" | "planter"
}

const PRESETS: ModelPreset[] = [
  {
    id: "dragon",
    name: "Articulated Dragon v4",
    polys: 284900,
    dims: { x: 210, y: 145, z: 62 },
    weight: 142,
    time: "6h 24m",
    complexity: "HIGH (42 JOINTS)",
    geometryType: "dragon",
  },
  {
    id: "helmet",
    name: "Cyberpunk Cosplay Visor",
    polys: 198400,
    dims: { x: 195, y: 220, z: 180 },
    weight: 380,
    time: "14h 10m",
    complexity: "MEDIUM (CURVED SHELL)",
    geometryType: "helmet",
  },
  {
    id: "gear",
    name: "Planetary Reduction Gear",
    polys: 94120,
    dims: { x: 120, y: 120, z: 45 },
    weight: 88,
    time: "3h 45m",
    complexity: "PRECISION (±0.02MM)",
    geometryType: "gear",
  },
  {
    id: "planter",
    name: "Voronoi Succulent Vase",
    polys: 164200,
    dims: { x: 110, y: 110, z: 130 },
    weight: 115,
    time: "4h 50m",
    complexity: "ORGANIC LATTICE",
    geometryType: "planter",
  },
]

export default function MeshAnalyzer() {
  const [selected, setSelected] = useState<ModelPreset>(PRESETS[0])
  const [viewMode, setViewMode] = useState<"solid" | "wire" | "stress">("solid")
  const containerRef = useRef<HTMLDivElement>(null)

  // Three.js internal refs
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const meshRef = useRef<THREE.Mesh | null>(null)
  const animFrameRef = useRef<number | null>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const container = containerRef.current
    const width = container.clientWidth
    const height = container.clientHeight

    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100)
    camera.position.set(0, 1.2, 4.5)
    cameraRef.current = camera

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    const ambient = new THREE.AmbientLight(0xffffff, 1.2)
    scene.add(ambient)

    const key = new THREE.DirectionalLight(0xffffff, 2.5)
    key.position.set(4, 6, 4)
    scene.add(key)

    const pinkFill = new THREE.PointLight(0xff2a7a, 3.0, 10)
    pinkFill.position.set(-3, 0, 2)
    scene.add(pinkFill)

    const cyanFill = new THREE.PointLight(0x00e5ff, 2.5, 10)
    cyanFill.position.set(3, -2, -2)
    scene.add(cyanFill)

    // Build geometry according to selected model preset
    let geom: THREE.BufferGeometry
    if (selected.geometryType === "dragon") {
      geom = new THREE.TorusKnotGeometry(0.9, 0.28, 120, 24, 2, 5)
    } else if (selected.geometryType === "helmet") {
      geom = new THREE.SphereGeometry(1.1, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.75)
    } else if (selected.geometryType === "gear") {
      geom = new THREE.CylinderGeometry(1.2, 1.2, 0.5, 24)
    } else {
      geom = new THREE.IcosahedronGeometry(1.1, 3)
    }

    // Material according to viewMode
    let mat: THREE.Material
    if (viewMode === "wire") {
      mat = new THREE.MeshBasicMaterial({ color: 0x00e5ff, wireframe: true })
    } else if (viewMode === "stress") {
      // Heatmap gradient representation
      mat = new THREE.MeshStandardMaterial({
        color: 0xff3355,
        roughness: 0.2,
        metalness: 0.8,
        emissive: 0xaa0033,
        emissiveIntensity: 0.3,
      })
    } else {
      mat = new THREE.MeshStandardMaterial({
        color: 0x222329,
        metalness: 0.9,
        roughness: 0.2,
      })
    }

    const mesh = new THREE.Mesh(geom, mat)
    scene.add(mesh)
    meshRef.current = mesh

    // Bounding Box visualizer
    const bbox = new THREE.BoxHelper(mesh, 0xff2a7a)
    scene.add(bbox)

    // Animation Loop
    const clock = new THREE.Clock()
    const animate = () => {
      const elapsed = clock.getElapsedTime()
      if (meshRef.current) {
        meshRef.current.rotation.y = elapsed * 0.4
        meshRef.current.rotation.x = Math.sin(elapsed * 0.5) * 0.2
        bbox.update()
      }
      renderer.render(scene, camera)
      animFrameRef.current = requestAnimationFrame(animate)
    }
    animate()

    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return
      const w = containerRef.current.clientWidth
      const h = containerRef.current.clientHeight
      cameraRef.current.aspect = w / h
      cameraRef.current.updateProjectionMatrix()
      rendererRef.current.setSize(w, h)
    }
    window.addEventListener("resize", handleResize)

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
      window.removeEventListener("resize", handleResize)
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [selected, viewMode])

  return (
    <section id="analyzer" className="w-full hud-border-b py-16 px-4 md:px-8 bg-neutral-100 dark:bg-neutral-950/60 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-tech text-cyan-600 dark:text-cyan-400 uppercase tracking-widest mb-1">
              <Cpu className="w-3.5 h-3.5" />
              <span>GEOMETRIC DIAGNOSTICS // CAD BENCHMARK</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black font-condensed tracking-tight uppercase">
              CLIENT-SIDE 3D MESH & STL ANALYZER
            </h2>
          </div>
          <p className="text-xs font-mono-tech text-neutral-500 max-w-sm">
            Instant geometry analysis, manifold topology validation, and filament mass calculation directly in browser memory.
          </p>
        </div>

        {/* Preset Selector Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-xs font-mono-tech uppercase text-neutral-500 mr-2 font-bold">
            SELECT SAMPLE STL:
          </span>
          {PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => {
                sound.playClick()
                setSelected(preset)
              }}
              onMouseEnter={() => sound.playHover()}
              className={`px-3 py-1.5 rounded text-xs font-mono-tech uppercase tracking-wider transition-all border ${
                selected.id === preset.id
                  ? "bg-black text-white dark:bg-white dark:text-black border-transparent font-bold shadow"
                  : "bg-white/60 dark:bg-neutral-900/60 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-800 hover:border-black dark:hover:border-white"
              }`}
            >
              {preset.name}
            </button>
          ))}
        </div>

        {/* Workbench Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: 3D Geometry Preview (7 cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-neutral-900 rounded-xl hud-border p-4 flex flex-col justify-between relative shadow-sm">
            <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
              <div className="flex items-center gap-2 text-xs font-mono-tech">
                <Box className="w-4 h-4 text-pink-500" />
                <span className="font-bold text-neutral-900 dark:text-neutral-100">
                  {selected.name}
                </span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px]">
                  WATER-TIGHT
                </span>
              </div>

              {/* View Mode Selector */}
              <div className="flex items-center gap-1">
                {(["solid", "wire", "stress"] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => {
                      sound.playClick()
                      setViewMode(mode)
                    }}
                    onMouseEnter={() => sound.playHover()}
                    className={`px-2 py-1 rounded text-[10px] font-mono-tech uppercase tracking-wider transition-all ${
                      viewMode === mode
                        ? "bg-black text-white dark:bg-white dark:text-black font-bold"
                        : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800"
                    }`}
                  >
                    [{mode}]
                  </button>
                ))}
              </div>
            </div>

            {/* 3D Canvas Viewport */}
            <div
              ref={containerRef}
              className="w-full h-[320px] sm:h-[380px] cursor-grab active:cursor-grabbing relative"
            />

            {/* Viewport footer */}
            <div className="flex items-center justify-between text-[11px] font-mono-tech text-neutral-500 border-t border-neutral-200 dark:border-neutral-800 pt-2">
              <span>BOUNDING BOX: ±0.02MM</span>
              <span>RENDER: DYNAMIC THREE.JS</span>
            </div>
          </div>

          {/* Right: Infographic Diagnostic Sheet (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            {/* Metric Box 1: Topology & Dimensions */}
            <div className="p-5 rounded-xl glass-panel hud-border space-y-4 shadow-md">
              <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-2">
                <span className="text-xs font-mono-tech uppercase font-bold text-neutral-800 dark:text-neutral-200">
                  TOPOLOGY & SCALE METRICS
                </span>
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono-tech">
                <div className="p-3 rounded-lg bg-black/[0.03] dark:bg-white/[0.04] border border-neutral-200 dark:border-neutral-800">
                  <span className="text-[10px] text-neutral-600 dark:text-neutral-400 font-bold uppercase block">POLY COUNT</span>
                  <span className="text-xl font-black text-neutral-950 dark:text-neutral-50">
                    {selected.polys.toLocaleString()}
                  </span>
                  <span className="text-[9px] text-neutral-500 block">Triangles</span>
                </div>

                <div className="p-3 rounded-lg bg-black/[0.03] dark:bg-white/[0.04] border border-neutral-200 dark:border-neutral-800">
                  <span className="text-[10px] text-neutral-600 dark:text-neutral-400 font-bold uppercase block">BOUNDS (X/Y/Z)</span>
                  <span className="text-sm font-bold text-neutral-950 dark:text-neutral-50">
                    {selected.dims.x} × {selected.dims.y} × {selected.dims.z}
                  </span>
                  <span className="text-[9px] text-neutral-500 block">Millimeters</span>
                </div>
              </div>

              {/* Stress & Infill Diagnostics */}
              <div className="space-y-2.5 text-xs font-mono-tech">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-700 dark:text-neutral-300 font-medium">MANIFOLD INTEGRITY:</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                    100% (0 Overhang Holes)
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-700 dark:text-neutral-300 font-medium">ESTIMATED PRINT TIME:</span>
                  <span className="font-bold text-neutral-950 dark:text-neutral-50">
                    {selected.time}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-700 dark:text-neutral-300 font-medium">FILAMENT MASS:</span>
                  <span className="font-bold text-pink-600 dark:text-pink-400">
                    {selected.weight} grams
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-700 dark:text-neutral-300 font-medium">COMPLEXITY SCORE:</span>
                  <span className="font-bold text-cyan-600 dark:text-cyan-400">
                    {selected.complexity}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Slicing Action */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-black/5 to-pink-500/10 dark:from-white/5 dark:to-pink-500/20 hud-border flex items-center justify-between">
              <div>
                <span className="text-xs font-mono-tech font-bold uppercase block text-neutral-900 dark:text-neutral-100">
                  READY FOR SLICING?
                </span>
                <span className="text-[11px] font-mono-tech text-neutral-500">
                  Export directly to OrcaSlicer, PrusaSlicer, or Bambu Studio
                </span>
              </div>
              <button
                onClick={() => {
                  sound.playClick()
                  alert(`Downloading calibrated STL bundle for ${selected.name}...`)
                }}
                onMouseEnter={() => sound.playHover()}
                className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black text-xs font-mono-tech font-bold uppercase tracking-wider rounded hover:scale-105 active:scale-95 transition-all shadow"
              >
                DOWNLOAD STL
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
