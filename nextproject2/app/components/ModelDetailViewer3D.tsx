// ==============================================================================
// NEXT.JS APP ROUTER CONCEPT: DYNAMIC ROUTE 3D COMPONENT INTEGRATION
// ==============================================================================
// File location: app/components/ModelDetailViewer3D.tsx
// Declared as `"use client"` because it attaches interactive pointer drag listeners
// and manages a dedicated WebGL 3D inspection viewport for the active model route.
//
// DATA FLOW IN NEXT.JS APPS:
// The server component `app/3d-models/[id]/page.tsx` retrieves model data via
// `getModelById(id)` and passes `modelId` and `modelName` as props into this viewer.
"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { sound } from "@/app/lib/sound"
import { RotateCcw, ShieldCheck } from "lucide-react"
import { buildProceduralModel } from "@/app/lib/model3DGenerator"

// Strongly typed component props received from the dynamic route Server Component
type ModelDetailViewer3DProps = {
  modelId: number
  modelName: string
}

export default function ModelDetailViewer3D({ modelId, modelName }: ModelDetailViewer3DProps) {
  // Container DOM element where Three.js mounts its canvas
  const containerRef = useRef<HTMLDivElement>(null)
  // State for wireframe topology vs solid metallic shading
  const [wireframe, setWireframe] = useState<boolean>(false)
  // State for continuous auto-rotation
  const [autoRotate, setAutoRotate] = useState<boolean>(true)

  // Three.js internal references
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const groupRef = useRef<THREE.Group | null>(null)
  const animFrameRef = useRef<number | null>(null)
  const rotationRef = useRef({ x: 0, y: 0 })
  const isDragging = useRef(false)
  const prevMousePos = useRef({ x: 0, y: 0 })

  // ==============================================================================
  // THREE.JS VIEWPORT LIFECYCLE
  // ==============================================================================
  // Re-executes when the user switches models (`modelId`), toggles wireframe, or toggles autoRotate.
  useEffect(() => {
    if (!containerRef.current) return
    const container = containerRef.current
    const width = container.clientWidth
    const height = container.clientHeight

    // 1. Perspective Camera
    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100)
    camera.position.set(0, 0.4, 4.5)
    cameraRef.current = camera

    // 2. High-Performance WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // 3. Cinematic 3-Point Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2)
    scene.add(ambientLight)

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5)
    keyLight.position.set(5, 7, 5)
    scene.add(keyLight)

    const pinkLight = new THREE.PointLight(0xff2a7a, 3.5, 10)
    pinkLight.position.set(-4, -2, 3)
    scene.add(pinkLight)

    const cyanLight = new THREE.PointLight(0x00e5ff, 2.5, 10)
    cyanLight.position.set(4, -3, -3)
    scene.add(cyanLight)

    // 4. Build Procedural 3D Geometry corresponding to this specific model ID
    const modelGroup = buildProceduralModel(modelId, wireframe)
    scene.add(modelGroup)
    groupRef.current = modelGroup

    // Bounding Box Visualizer
    const bbox = new THREE.BoxHelper(modelGroup, 0xff2a7a)
    scene.add(bbox)

    // 5. Interactive Drag-to-Rotate Pointer Handlers
    const onMouseDown = (e: MouseEvent) => {
      isDragging.current = true
      prevMousePos.current = { x: e.clientX, y: e.clientY }
    }
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return
      const deltaX = e.clientX - prevMousePos.current.x
      const deltaY = e.clientY - prevMousePos.current.y
      rotationRef.current.y += deltaX * 0.01
      rotationRef.current.x += deltaY * 0.01
      prevMousePos.current = { x: e.clientX, y: e.clientY }
    }
    const onMouseUp = () => {
      isDragging.current = false
    }

    container.addEventListener("mousedown", onMouseDown)
    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mouseup", onMouseUp)

    // 6. Turntable Animation Loop
    const clock = new THREE.Clock()
    const animate = () => {
      clock.getElapsedTime()
      if (groupRef.current) {
        if (autoRotate && !isDragging.current) {
          rotationRef.current.y += 0.008
        }
        groupRef.current.rotation.y = rotationRef.current.y
        groupRef.current.rotation.x = rotationRef.current.x
        bbox.update()
      }
      renderer.render(scene, camera)
      animFrameRef.current = requestAnimationFrame(animate)
    }
    animate()

    // 7. Responsive Resize Observer
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return
      const w = containerRef.current.clientWidth
      const h = containerRef.current.clientHeight
      cameraRef.current.aspect = w / h
      cameraRef.current.updateProjectionMatrix()
      rendererRef.current.setSize(w, h)
    }
    window.addEventListener("resize", handleResize)

    // Unmount cleanup: remove event listeners and free GPU WebGL buffers
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
      container.removeEventListener("mousedown", onMouseDown)
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mouseup", onMouseUp)
      window.removeEventListener("resize", handleResize)
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [modelId, wireframe, autoRotate])

  // Wireframe toggler
  const toggleWire = () => {
    sound.playClick()
    setWireframe(!wireframe)
  }

  // Reset 3D rotation angles back to origin
  const resetAngle = () => {
    sound.playClick()
    rotationRef.current.x = 0
    rotationRef.current.y = 0
  }

  return (
    <div className="relative w-full h-[400px] md:h-[520px] bg-neutral-950 rounded-2xl hud-border overflow-hidden flex flex-col justify-between p-4">
      {/* Viewport Top Bar */}
      <div className="flex items-center justify-between z-20 text-xs font-mono-tech text-neutral-400">
        <span className="flex items-center gap-1.5 text-white font-bold">
          <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
          INTERACTIVE 3D CAD INSPECTOR [MODEL #{modelId}]
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sound.playClick()
              setAutoRotate(!autoRotate)
            }}
            onMouseEnter={() => sound.playHover()}
            className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white text-[11px] uppercase tracking-wider font-bold transition-all"
          >
            {autoRotate ? "[SPIN ON]" : "[SPIN OFF]"}
          </button>
          <button
            onClick={toggleWire}
            onMouseEnter={() => sound.playHover()}
            className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white text-[11px] uppercase tracking-wider font-bold transition-all"
          >
            {wireframe ? "[SOLID]" : "[WIREFRAME]"}
          </button>
          <button
            onClick={resetAngle}
            onMouseEnter={() => sound.playHover()}
            className="p-1.5 rounded bg-white/10 hover:bg-white/20 text-white transition-all"
            title="Reset Rotation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 3D Canvas Viewport */}
      <div
        ref={containerRef}
        className="w-full flex-1 cursor-grab active:cursor-grabbing relative"
        title="Drag to rotate in 3D"
      />

      {/* Viewport Bottom HUD Bar */}
      <div className="flex items-center justify-between z-20 text-[10px] font-mono-tech text-neutral-500 border-t border-white/10 pt-2">
        <span className="flex items-center gap-1 text-emerald-400">
          <ShieldCheck className="w-3.5 h-3.5" />
          100% WATERTIGHT MANIFOLD MESH
        </span>
        <span>DRAG TO ORBIT // MODEL #{modelId}: {modelName}</span>
      </div>
    </div>
  )
}
