"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import Link from "next/link"
import { sound } from "@/app/lib/sound"
import type { Model } from "@/app/types"
import { buildProceduralModel } from "@/app/lib/model3DGenerator"
import { getModelSpecs } from "@/app/lib/modelData"
import { X, Heart, Download, ExternalLink } from "lucide-react"

type Quick3DModalProps = {
  model: Model | null
  onClose: () => void
}

export default function Quick3DModal({ model, onClose }: Quick3DModalProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [wireframe, setWireframe] = useState(false)
  const [liked, setLiked] = useState(false)

  // Three.js internal refs
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const animFrameRef = useRef<number | null>(null)

  useEffect(() => {
    if (!model || !containerRef.current) return
    const container = containerRef.current
    const width = container.clientWidth
    const height = container.clientHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
    camera.position.set(0, 0.3, 4.2)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    const ambient = new THREE.AmbientLight(0xffffff, 1.2)
    scene.add(ambient)

    const key = new THREE.DirectionalLight(0xffffff, 2.5)
    key.position.set(4, 5, 4)
    scene.add(key)

    const pinkFill = new THREE.PointLight(0xff2a7a, 3.5, 10)
    pinkFill.position.set(-3, -2, 2)
    scene.add(pinkFill)

    const cyanFill = new THREE.PointLight(0x00e5ff, 2.8, 10)
    cyanFill.position.set(3, -2, -2)
    scene.add(cyanFill)

    // Build procedural 3D assembly uniquely for this exact model ID
    const modelMesh = buildProceduralModel(model.id, wireframe)
    scene.add(modelMesh)

    // Orbit rings
    const ringGeom = new THREE.TorusGeometry(1.8, 0.015, 12, 48)
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff, wireframe: true, opacity: 0.35, transparent: true })
    const ring = new THREE.Mesh(ringGeom, ringMat)
    ring.rotation.x = Math.PI / 3
    scene.add(ring)

    const clock = new THREE.Clock()
    const animate = () => {
      const elapsed = clock.getElapsedTime()
      modelMesh.rotation.y = elapsed * 0.45
      modelMesh.rotation.x = Math.sin(elapsed * 0.4) * 0.2
      ring.rotation.z = elapsed * 0.3
      renderer.render(scene, camera)
      animFrameRef.current = requestAnimationFrame(animate)
    }
    animate()

    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current) return
      const w = containerRef.current.clientWidth
      const h = containerRef.current.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
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
  }, [model, wireframe])

  if (!model) return null

  const specs = getModelSpecs(model.id)
  const displayLikes = model.likes + (liked ? 1 : 0)

  const handleLike = () => {
    sound.playClick()
    setLiked(!liked)
  }

  const toggleWire = () => {
    sound.playClick()
    setWireframe(!wireframe)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-white dark:bg-neutral-900 rounded-2xl hud-border overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-12">
        {/* Close Button */}
        <button
          onClick={() => {
            sound.playClick()
            onClose()
          }}
          onMouseEnter={() => sound.playHover()}
          className="absolute top-4 right-4 z-40 p-2 rounded-full bg-black/10 dark:bg-white/10 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
          title="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: 3D Viewport (7 cols) */}
        <div className="md:col-span-7 relative bg-neutral-950 p-4 flex flex-col justify-between overflow-hidden">
          <div className="flex items-center justify-between text-[11px] font-mono-tech text-neutral-400 z-20">
            <span className="flex items-center gap-1.5 text-white">
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
              CAD BLUEPRINT #{model.id.toString().padStart(4, "0")}
            </span>
            <button
              onClick={toggleWire}
              className="px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-white text-[10px] uppercase font-bold"
            >
              {wireframe ? "[SOLID]" : "[WIREFRAME]"}
            </button>
          </div>

          <div
            ref={containerRef}
            className="w-full h-[300px] sm:h-[380px] cursor-grab active:cursor-grabbing relative"
          />

          <div className="flex items-center justify-between text-[10px] font-mono-tech text-neutral-500 z-20">
            <span>ROTATION: 360° AUTO-SPIN</span>
            <span>SHADING: THREE.JS METALLIC PBR</span>
          </div>
        </div>

        {/* Right: Spec sheet & Details (5 cols) */}
        <div className="md:col-span-5 p-6 flex flex-col justify-between gap-6 font-mono-tech">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] px-2 py-0.5 rounded bg-black/5 dark:bg-white/10 uppercase tracking-wider text-neutral-600 dark:text-neutral-400 font-bold">
                {model.category}
              </span>
              <button
                onClick={handleLike}
                className={`flex items-center gap-1 text-xs px-2 py-1 rounded transition-colors ${
                  liked ? "text-pink-600 font-bold bg-pink-500/10" : "text-neutral-500 hover:text-pink-600"
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${liked ? "fill-current" : ""}`} />
                <span>{displayLikes}</span>
              </button>
            </div>

            <h3 className="text-2xl font-black font-condensed tracking-tight uppercase text-neutral-900 dark:text-neutral-100">
              {model.name}
            </h3>

            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {model.description}
            </p>

            <div className="space-y-2 text-xs border-y border-neutral-200 dark:border-neutral-800 py-3">
              <div className="flex justify-between">
                <span className="text-neutral-500">BOUNDS (X/Y/Z):</span>
                <span className="font-bold text-neutral-800 dark:text-neutral-200">
                  {specs.dims.x} × {specs.dims.y} × {specs.dims.z} mm
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">PRINT TIME:</span>
                <span className="font-bold text-amber-600 dark:text-amber-400">
                  {specs.printTime}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">MASS (FILAMENT):</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  {specs.weight} grams
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">COMPLEXITY:</span>
                <span className="font-bold text-pink-600 dark:text-pink-400">
                  {specs.difficulty} ({specs.polyCount.toLocaleString()} tris)
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <button
              onClick={() => {
                sound.playClick()
                alert(`Downloading production STL bundle for "${model.name}"...`)
              }}
              onMouseEnter={() => sound.playHover()}
              className="w-full py-3 bg-black text-white dark:bg-white dark:text-black text-xs uppercase font-bold tracking-wider rounded hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2 shadow"
            >
              <Download className="w-4 h-4" />
              <span>DOWNLOAD STL ARCHIVE</span>
            </button>

            <Link
              href={`/3d-models/${model.id}`}
              onClick={() => {
                sound.playClick()
                onClose()
              }}
              onMouseEnter={() => sound.playHover()}
              className="w-full py-2.5 hud-border hover:bg-black/5 dark:hover:bg-white/5 text-xs uppercase font-semibold tracking-wider rounded text-center transition-all flex items-center justify-center gap-2 text-neutral-800 dark:text-neutral-200"
            >
              <span>VIEW FULL CAD SPEC SHEET</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
