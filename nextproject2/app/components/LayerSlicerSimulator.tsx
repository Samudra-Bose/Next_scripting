"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { sound } from "@/app/lib/sound"
import { Play, Pause, RotateCcw, Terminal, Sparkles } from "lucide-react"

export default function LayerSlicerSimulator() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(45) // 0 to 100
  const progressRef = useRef(progress)
  const [isPlaying, setIsPlaying] = useState(false)
  const [selectedModel, setSelectedModel] = useState<"gear" | "vase" | "helmet">("gear")

  useEffect(() => {
    progressRef.current = progress
  }, [progress])

  // Three.js internal refs
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const animFrameRef = useRef<number | null>(null)
  const layersGroupRef = useRef<THREE.Group | null>(null)
  const nozzleRef = useRef<THREE.Group | null>(null)
  const totalLayers = 60
  const layerMeshesRef = useRef<THREE.Mesh[]>([])

  // G-code mock streams
  const gcodeSamples = [
    "G1 X124.32 Y88.19 E2.4182 F18000 ; perimeter",
    "G1 X125.10 Y89.44 E2.4390 F18000 ; infill zig-zag",
    "G1 X126.85 Y92.01 E2.4820 F14000 ; bridge overhang",
    "M106 S255 ; part cooling fan 100%",
    "G1 X130.40 Y95.62 E2.5312 F18000 ; gyroid infill",
    "G1 X132.11 Y98.14 E2.5840 F12000 ; solid infill",
    "G92 E0 ; reset extruder position",
    "G1 Z28.40 F1200 ; Z-hop layer advance",
  ]

  const currentGcode = gcodeSamples[Math.min(gcodeSamples.length - 1, Math.floor((progress / 100) * gcodeSamples.length))]

  // Setup Three.js scene
  useEffect(() => {
    if (!containerRef.current) return
    const container = containerRef.current
    const width = container.clientWidth
    const height = container.clientHeight

    // Scene
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100)
    camera.position.set(4.5, 4.2, 5.5)
    camera.lookAt(0, 0.8, 0)
    cameraRef.current = camera

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2)
    scene.add(ambientLight)

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.5)
    dirLight.position.set(5, 10, 4)
    scene.add(dirLight)

    const hotendLight = new THREE.PointLight(0xff2a7a, 3.5, 6)
    scene.add(hotendLight)

    // Build Plate (Grid texture)
    const plateGeom = new THREE.BoxGeometry(4.5, 0.1, 4.5)
    const plateMat = new THREE.MeshStandardMaterial({
      color: 0x1a1a20,
      metalness: 0.8,
      roughness: 0.3,
    })
    const plate = new THREE.Mesh(plateGeom, plateMat)
    plate.position.y = -0.05
    scene.add(plate)

    // Build Plate Grid Lines
    const gridHelper = new THREE.GridHelper(4.4, 22, 0xff2a7a, 0x444455)
    gridHelper.position.y = 0.005
    scene.add(gridHelper)

    // Layers Group
    const layersGroup = new THREE.Group()
    scene.add(layersGroup)
    layersGroupRef.current = layersGroup

    // Build Sliced Geometry layers
    const layerMeshes: THREE.Mesh[] = []
    const layerHeight = 0.04
    for (let i = 0; i < totalLayers; i++) {
      const y = i * layerHeight
      const progressRatio = i / totalLayers
      let radius = 1.2

      if (selectedModel === "gear") {
        // Gear teeth silhouette
        radius = 1.1 + Math.sin(progressRatio * Math.PI) * 0.3
      } else if (selectedModel === "vase") {
        radius = 0.6 + Math.sin(progressRatio * Math.PI * 2) * 0.4 + progressRatio * 0.5
      } else {
        radius = 1.0 + Math.cos(progressRatio * Math.PI) * 0.35
      }

      const geom = new THREE.CylinderGeometry(radius, radius, layerHeight * 0.95, 32)
      const mat = new THREE.MeshStandardMaterial({
        color: 0xdeb841,
        metalness: 0.85,
        roughness: 0.25,
      })
      const mesh = new THREE.Mesh(geom, mat)
      mesh.position.y = y + layerHeight / 2
      mesh.visible = (i / totalLayers) * 100 <= progress
      layersGroup.add(mesh)
      layerMeshes.push(mesh)
    }
    layerMeshesRef.current = layerMeshes

    // Nozzle & Toolhead
    const nozzleGroup = new THREE.Group()
    const coneGeom = new THREE.ConeGeometry(0.2, 0.4, 16)
    const coneMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.9, roughness: 0.2 })
    const cone = new THREE.Mesh(coneGeom, coneMat)
    cone.rotation.x = Math.PI
    nozzleGroup.add(cone)

    // Extrusion Glow tip
    const tipGlowGeom = new THREE.SphereGeometry(0.05, 12, 12)
    const tipGlowMat = new THREE.MeshBasicMaterial({ color: 0xff2a7a })
    const tipGlow = new THREE.Mesh(tipGlowGeom, tipGlowMat)
    tipGlow.position.y = -0.2
    nozzleGroup.add(tipGlow)

    scene.add(nozzleGroup)
    nozzleRef.current = nozzleGroup

    // Animation Loop
    const clock = new THREE.Clock()
    const animate = () => {
      const elapsed = clock.getElapsedTime()

      // Rotate build plate slightly for dynamic perspective
      if (layersGroupRef.current) {
        layersGroupRef.current.rotation.y = elapsed * 0.15
      }
      gridHelper.rotation.y = elapsed * 0.15
      plate.rotation.y = elapsed * 0.15

      // Position nozzle at active layer top
      const currentLayerIdx = Math.min(
        totalLayers - 1,
        Math.floor((progressRef.current / 100) * totalLayers)
      )
      const currentY = currentLayerIdx * layerHeight + 0.22

      if (nozzleRef.current) {
        const orbitAngle = elapsed * 3.5
        const orbitRadius = 0.8
        nozzleRef.current.position.set(
          Math.cos(orbitAngle) * orbitRadius,
          currentY,
          Math.sin(orbitAngle) * orbitRadius
        )
        hotendLight.position.copy(nozzleRef.current.position)
      }

      renderer.render(scene, camera)
      animFrameRef.current = requestAnimationFrame(animate)
    }
    animate()

    // Resize handler
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedModel])

  // Sync visible layers when progress updates
  useEffect(() => {
    layerMeshesRef.current.forEach((mesh, idx) => {
      const active = (idx / totalLayers) * 100 <= progress
      mesh.visible = active
      // Highlight topmost active layer with glowing neon pink
      const isTop = idx === Math.floor((progress / 100) * totalLayers)
      if (mesh.material instanceof THREE.MeshStandardMaterial) {
        if (isTop) {
          mesh.material.emissive.setHex(0xff2a7a)
          mesh.material.emissiveIntensity = 0.8
        } else {
          mesh.material.emissive.setHex(0x000000)
          mesh.material.emissiveIntensity = 0
        }
      }
    })
  }, [progress])

  // Auto-play print simulation
  useEffect(() => {
    if (!isPlaying) return
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setIsPlaying(false)
          return 100
        }
        if (Math.random() > 0.4) sound.playLaser()
        return prev + 1
      })
    }, 120)

    return () => clearInterval(timer)
  }, [isPlaying])

  const togglePlay = () => {
    sound.playClick()
    if (progress >= 100) setProgress(0)
    setIsPlaying(!isPlaying)
  }

  const handleReset = () => {
    sound.playClick()
    setIsPlaying(false)
    setProgress(0)
  }

  const currentLayerNumber = Math.min(
    totalLayers,
    Math.max(1, Math.floor((progress / 100) * totalLayers))
  )
  const currentZ = (currentLayerNumber * 0.12).toFixed(2)

  return (
    <section id="slicer" className="w-full hud-border-b py-16 px-4 md:px-8 bg-neutral-900 text-neutral-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-tech text-pink-400 uppercase tracking-widest mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>INTERACTIVE WEBG-CODE ENGINE // SIMULATOR</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black font-condensed tracking-tight uppercase text-white">
              REAL-TIME 3D LAYER SLICER & PRINTER SIM
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {(["gear", "vase", "helmet"] as const).map((m) => (
              <button
                key={m}
                onClick={() => {
                  sound.playClick()
                  setSelectedModel(m)
                  setProgress(45)
                }}
                className={`px-3 py-1.5 rounded text-xs font-mono-tech uppercase tracking-wider transition-all border ${
                  selectedModel === m
                    ? "bg-pink-600 text-white border-pink-500 font-bold shadow-[0_0_12px_rgba(255,42,122,0.4)]"
                    : "bg-white/10 text-neutral-300 border-white/20 hover:border-white"
                }`}
              >
                [{m.toUpperCase()}]
              </button>
            ))}
          </div>
        </div>

        {/* Simulator Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left: 3D Viewport (8 cols) */}
          <div className="lg:col-span-8 relative bg-black/60 rounded-xl border border-white/10 overflow-hidden flex flex-col">
            {/* Viewport Top HUD Bar */}
            <div className="px-4 py-2 border-b border-white/10 flex items-center justify-between text-[11px] font-mono-tech text-neutral-400 bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 text-white">
                  <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
                  SLICER VIEWPORT (4K PBR)
                </span>
                <span>MODEL: {selectedModel.toUpperCase()}</span>
              </div>
              <div>
                <span>BED: 250×250 MM</span>
              </div>
            </div>

            {/* Canvas */}
            <div
              ref={containerRef}
              className="w-full h-[380px] sm:h-[460px] cursor-grab active:cursor-grabbing relative"
            />

            {/* Scrubber Controls Bar at bottom of viewport */}
            <div className="p-4 border-t border-white/10 bg-black/70 backdrop-blur-md flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs font-mono-tech">
                <div className="flex items-center gap-3">
                  <button
                    onClick={togglePlay}
                    onMouseEnter={() => sound.playHover()}
                    className="p-2 rounded bg-pink-600 hover:bg-pink-500 text-white transition-all active:scale-95 flex items-center gap-1.5 font-bold"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    <span>{isPlaying ? "PAUSE" : "AUTO-PRINT"}</span>
                  </button>

                  <button
                    onClick={handleReset}
                    onMouseEnter={() => sound.playHover()}
                    className="p-2 rounded bg-white/10 hover:bg-white/20 text-neutral-200 transition-all"
                    title="Reset Slicing Progress"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-4 text-neutral-300">
                  <span>
                    LAYER: <strong className="text-white">{currentLayerNumber}</strong> / {totalLayers}
                  </span>
                  <span>
                    Z-HEIGHT: <strong className="text-pink-400">{currentZ} mm</strong>
                  </span>
                  <span>
                    PROGRESS: <strong className="text-emerald-400">{progress}%</strong>
                  </span>
                </div>
              </div>

              {/* Progress Range Slider */}
              <div className="relative flex items-center">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progress}
                  onChange={(e) => {
                    setProgress(Number(e.target.value))
                    sound.playLaser()
                  }}
                  className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-pink-500"
                />
              </div>
            </div>
          </div>

          {/* Right: Slicer Telemetry & Live G-Code Terminal (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-4 bg-black/40 rounded-xl border border-white/10 p-5 font-mono-tech">
            {/* Telemetry Card */}
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-xs uppercase text-neutral-400">PRINT SPECIFICATIONS</span>
                <span className="text-[10px] text-pink-400 font-bold">SLICER v4.8</span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-neutral-500">LAYER THICKNESS:</span>
                  <span className="text-white font-bold">0.12 mm (Fine)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">INFILL PATTERN:</span>
                  <span className="text-cyan-400 font-bold">Gyroid 25%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">PRINT SPEED:</span>
                  <span className="text-white font-bold">320 mm/s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">ESTIMATED TIME:</span>
                  <span className="text-amber-400 font-bold">1h 48m</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">FILAMENT MASS:</span>
                  <span className="text-emerald-400 font-bold">48.2 grams (PLA)</span>
                </div>
              </div>
            </div>

            {/* Live G-Code Terminal Stream */}
            <div className="bg-black/90 rounded-lg border border-white/10 p-3 space-y-2">
              <div className="flex items-center justify-between text-[10px] text-neutral-400 border-b border-white/10 pb-1.5">
                <span className="flex items-center gap-1.5 text-neutral-300">
                  <Terminal className="w-3 h-3 text-pink-500" />
                  REAL-TIME G-CODE PARSER
                </span>
                <span className="text-emerald-400 animate-pulse">STREAMING</span>
              </div>
              <div className="space-y-1 text-[11px] text-neutral-300 h-28 overflow-hidden font-mono flex flex-col justify-end">
                <p className="text-neutral-600">; Generated by PrintForge CoreXY Slicer</p>
                <p className="text-neutral-500">M109 S215 ; wait for nozzle temp</p>
                <p className="text-neutral-400">G28 W ; home all axes</p>
                <p className="text-neutral-400">G1 Z0.2 F3000 ; move to first layer</p>
                <p className="text-pink-400 font-bold bg-pink-500/10 px-1 rounded animate-pulse">
                  &gt; {currentGcode}
                </p>
              </div>
            </div>

            {/* Download G-Code Action */}
            <button
              onClick={() => {
                sound.playClick()
                alert(`Exporting calibrated G-Code profile for ${selectedModel.toUpperCase()} (0.12mm layer height)...`)
              }}
              onMouseEnter={() => sound.playHover()}
              className="w-full py-3 bg-white text-black hover:bg-neutral-200 active:scale-95 transition-all text-xs font-bold uppercase tracking-wider rounded text-center shadow-lg"
            >
              DOWNLOAD PRE-SLICED G-CODE
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
