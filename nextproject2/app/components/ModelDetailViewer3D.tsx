"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { sound } from "@/app/lib/sound"
import { RotateCcw, ShieldCheck } from "lucide-react"
import { buildProceduralModel } from "@/app/lib/model3DGenerator"

type ModelDetailViewer3DProps = {
  modelId: number
  modelName: string
}

export default function ModelDetailViewer3D({ modelId, modelName }: ModelDetailViewer3DProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [wireframe, setWireframe] = useState(false)
  const [autoRotate, setAutoRotate] = useState(true)

  // Three.js internal refs
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const groupRef = useRef<THREE.Group | null>(null)
  const animFrameRef = useRef<number | null>(null)
  const rotationRef = useRef({ x: 0, y: 0 })
  const isDragging = useRef(false)
  const prevMousePos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (!containerRef.current) return
    const container = containerRef.current
    const width = container.clientWidth
    const height = container.clientHeight

    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100)
    camera.position.set(0, 0.4, 4.5)
    cameraRef.current = camera

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Lights
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

    // Build procedural 3D model for this exact model ID
    const modelGroup = buildProceduralModel(modelId, wireframe)
    scene.add(modelGroup)
    groupRef.current = modelGroup

    // Bounding Box Helper
    const bbox = new THREE.BoxHelper(modelGroup, 0xff2a7a)
    scene.add(bbox)

    // Drag to rotate controls
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

  const toggleWire = () => {
    sound.playClick()
    setWireframe(!wireframe)
  }

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

      {/* 3D Canvas */}
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
