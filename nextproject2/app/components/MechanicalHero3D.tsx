"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { sound } from "@/app/lib/sound"
import { RotateCcw, Layers, Eye } from "lucide-react"

export default function MechanicalHero3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [exploded, setExploded] = useState(false)
  const [wireframe, setWireframe] = useState(false)

  // Stable references for state without re-creating Three.js scene
  const explodedRef = useRef(false)
  const wireframeRef = useRef(false)

  const materialsRef = useRef<THREE.Material[]>([])
  const rotationRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, vx: 0, vy: 0 })
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })
  const isDraggingRef = useRef(false)
  const lastMousePos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (!containerRef.current) return
    const container = containerRef.current
    const width = container.clientWidth
    const height = container.clientHeight

    // 1. Scene & Camera
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100)
    camera.position.set(0, 0, 7.2)

    // 2. High-Performance Anti-Aliased Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.25
    container.appendChild(renderer.domElement)

    // 3. Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2)
    scene.add(ambientLight)

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8)
    keyLight.position.set(5, 8, 6)
    scene.add(keyLight)

    // Interactive mouse cursor specular light
    const cursorLight = new THREE.PointLight(0xffffff, 2.5, 12)
    cursorLight.position.set(0, 0, 4)
    scene.add(cursorLight)

    // Vibrant Magenta / Iridescent Rim Light (Signature Noomo Hue)
    const pinkLight = new THREE.PointLight(0xff1a75, 4.5, 18)
    pinkLight.position.set(-4.5, -1.5, 3)
    scene.add(pinkLight)

    // Vivid Cyan Fill Light
    const cyanLight = new THREE.PointLight(0x00f0ff, 3.2, 18)
    cyanLight.position.set(4.5, -2.5, -2)
    scene.add(cyanLight)

    // 4. Materials
    const chromeMat = new THREE.MeshPhysicalMaterial({
      color: 0xf3f4f6,
      metalness: 0.98,
      roughness: 0.06,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      reflectivity: 1.0,
      wireframe: false,
    })
    materialsRef.current.push(chromeMat)

    const titaniumMat = new THREE.MeshStandardMaterial({
      color: 0x181a20,
      metalness: 0.92,
      roughness: 0.18,
      wireframe: false,
    })
    materialsRef.current.push(titaniumMat)

    const brassMat = new THREE.MeshStandardMaterial({
      color: 0xdeb841,
      metalness: 0.9,
      roughness: 0.22,
      wireframe: false,
    })
    materialsRef.current.push(brassMat)

    // Translucent Iridescent Mantle (Noomo Jellyfish Tribute)
    const translucentMantleMat = new THREE.MeshPhysicalMaterial({
      color: 0xff2a85,
      transmission: 0.65,
      opacity: 0.92,
      transparent: true,
      roughness: 0.12,
      ior: 1.48,
      thickness: 1.5,
      sheen: 1.0,
      sheenColor: new THREE.Color(0xff4090),
      wireframe: false,
    })
    materialsRef.current.push(translucentMantleMat)

    // Glowing Bioluminescent Core
    const glowingCoreMat = new THREE.MeshStandardMaterial({
      color: 0xff1a75,
      emissive: 0xff0066,
      emissiveIntensity: 2.2,
      metalness: 0.2,
      roughness: 0.1,
      wireframe: false,
    })
    materialsRef.current.push(glowingCoreMat)

    // Cyber Gyro Wire Ring Material
    const wireRingMat = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    })
    materialsRef.current.push(wireRingMat)

    // 5. Build Artifact Assembly
    const mainGroup = new THREE.Group()
    scene.add(mainGroup)

    const explodeParts: {
      mesh: THREE.Object3D
      basePos: THREE.Vector3
      explodeDir: THREE.Vector3
      dist: number
    }[] = []

    // A. Translucent Bio-Mantle Dome (Upper Shell)
    const mantleGeom = new THREE.SphereGeometry(1.35, 48, 32, 0, Math.PI * 2, 0, Math.PI * 0.55)
    const mantleMesh = new THREE.Mesh(mantleGeom, translucentMantleMat)
    mantleMesh.position.set(0, 0.4, 0)
    mainGroup.add(mantleMesh)
    explodeParts.push({
      mesh: mantleMesh,
      basePos: mantleMesh.position.clone(),
      explodeDir: new THREE.Vector3(0, 1, 0),
      dist: 1.5,
    })

    // B. Internal Glowing Heating Core & Filament Coil
    const coreGeom = new THREE.SphereGeometry(0.55, 32, 32)
    const coreMesh = new THREE.Mesh(coreGeom, glowingCoreMat)
    coreMesh.position.set(0, 0.35, 0)
    mainGroup.add(coreMesh)

    // Heating Spiral Coil
    const coilGeom = new THREE.TorusGeometry(0.75, 0.035, 16, 64)
    const coilMesh = new THREE.Mesh(coilGeom, brassMat)
    coilMesh.rotation.x = Math.PI / 2
    coilMesh.position.set(0, 0.35, 0)
    mainGroup.add(coilMesh)

    // C. Precision Extruder Nozzle
    const nozzleGeom = new THREE.ConeGeometry(0.5, 0.95, 32)
    const nozzleMesh = new THREE.Mesh(nozzleGeom, brassMat)
    nozzleMesh.rotation.x = Math.PI
    nozzleMesh.position.set(0, -0.65, 0)
    mainGroup.add(nozzleMesh)
    explodeParts.push({
      mesh: nozzleMesh,
      basePos: nozzleMesh.position.clone(),
      explodeDir: new THREE.Vector3(0, -1, 0),
      dist: 1.4,
    })

    // D. Stacked Aluminum Heatsink Cooling Fins
    const finGroup = new THREE.Group()
    for (let i = 0; i < 6; i++) {
      const radius = 1.15 - i * 0.08
      const finGeom = new THREE.CylinderGeometry(radius, radius, 0.06, 40)
      const finMesh = new THREE.Mesh(finGeom, chromeMat)
      finMesh.position.y = 0.55 + i * 0.18
      finGroup.add(finMesh)
    }
    mainGroup.add(finGroup)
    explodeParts.push({
      mesh: finGroup,
      basePos: finGroup.position.clone(),
      explodeDir: new THREE.Vector3(0, 0.8, 0),
      dist: 1.5,
    })

    // E. Outer Titanium Planetary Gear Ring
    const gearRingGeom = new THREE.TorusGeometry(1.68, 0.14, 16, 48)
    const gearRingMesh = new THREE.Mesh(gearRingGeom, titaniumMat)
    gearRingMesh.rotation.x = Math.PI / 2
    gearRingMesh.position.set(0, 0.35, 0)
    mainGroup.add(gearRingMesh)
    explodeParts.push({
      mesh: gearRingMesh,
      basePos: gearRingMesh.position.clone(),
      explodeDir: new THREE.Vector3(0, 0.6, 0),
      dist: 1.2,
    })

    // Gear Teeth
    const teethGroup = new THREE.Group()
    for (let i = 0; i < 20; i++) {
      const angle = (i / 20) * Math.PI * 2
      const toothGeom = new THREE.BoxGeometry(0.12, 0.22, 0.26)
      const toothMesh = new THREE.Mesh(toothGeom, titaniumMat)
      toothMesh.position.set(Math.cos(angle) * 1.68, 0.35, Math.sin(angle) * 1.68)
      toothMesh.rotation.y = -angle
      teethGroup.add(toothMesh)
    }
    mainGroup.add(teethGroup)
    explodeParts.push({
      mesh: teethGroup,
      basePos: teethGroup.position.clone(),
      explodeDir: new THREE.Vector3(0, 0.6, 0),
      dist: 1.2,
    })

    // F. Articulated Dragon Claw / Actuator Struts (4 arms)
    const armsGroup = new THREE.Group()
    for (let i = 0; i < 4; i++) {
      const angle = (i / 4) * Math.PI * 2
      const arm = new THREE.Group()

      const strutGeom = new THREE.CylinderGeometry(0.07, 0.07, 1.2, 16)
      const strut = new THREE.Mesh(strutGeom, chromeMat)
      strut.position.set(0, 0.6, 0)
      arm.add(strut)

      const knuckleGeom = new THREE.SphereGeometry(0.15, 16, 16)
      const knuckle = new THREE.Mesh(knuckleGeom, brassMat)
      knuckle.position.set(0, 1.2, 0)
      arm.add(knuckle)

      const clawGeom = new THREE.CylinderGeometry(0.05, 0.05, 0.9, 16)
      const claw = new THREE.Mesh(clawGeom, titaniumMat)
      claw.position.set(0.3, 1.6, 0)
      claw.rotation.z = -0.5
      arm.add(claw)

      arm.position.set(Math.cos(angle) * 1.35, 0, Math.sin(angle) * 1.35)
      arm.rotation.y = -angle + Math.PI / 2
      arm.rotation.z = 0.4
      armsGroup.add(arm)

      explodeParts.push({
        mesh: arm,
        basePos: arm.position.clone(),
        explodeDir: new THREE.Vector3(Math.cos(angle), -0.2, Math.sin(angle)).normalize(),
        dist: 1.8,
      })
    }
    mainGroup.add(armsGroup)

    // G. Sinuous Bio-Mechanical Tendrils / Filament Ribbons (Reference Jellyfish Tentacles)
    const tendrilCount = 8
    const tendrilSegments = 16
    const tendrilMeshes: { mesh: THREE.Line; baseAngles: number; length: number }[] = []
    const tendrilMat = new THREE.LineBasicMaterial({
      color: 0xff1a75,
      transparent: true,
      opacity: 0.75,
      linewidth: 2,
    })

    for (let i = 0; i < tendrilCount; i++) {
      const angle = (i / tendrilCount) * Math.PI * 2
      const radius = 0.45 + (i % 2) * 0.2
      const curvePoints: THREE.Vector3[] = []
      for (let j = 0; j < tendrilSegments; j++) {
        const y = -0.5 - j * 0.16
        curvePoints.push(new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius))
      }
      const geom = new THREE.BufferGeometry().setFromPoints(curvePoints)
      const line = new THREE.Line(geom, tendrilMat)
      mainGroup.add(line)
      tendrilMeshes.push({ mesh: line, baseAngles: angle, length: tendrilSegments })
    }

    // H. Dual Counter-Rotating Gyro Data Rings
    const gyro1Geom = new THREE.TorusGeometry(2.35, 0.02, 12, 64)
    const gyro1 = new THREE.Mesh(gyro1Geom, wireRingMat)
    gyro1.rotation.x = Math.PI / 3
    mainGroup.add(gyro1)

    const gyro2Geom = new THREE.TorusGeometry(2.7, 0.02, 12, 64)
    const gyro2 = new THREE.Mesh(gyro2Geom, wireRingMat)
    gyro2.rotation.y = Math.PI / 4
    mainGroup.add(gyro2)

    // I. Floating Ambient Orbiting Energy Sparks (40 micro-particles)
    const sparkCount = 40
    const sparkGeom = new THREE.BufferGeometry()
    const sparkPositions = new Float32Array(sparkCount * 3)
    const sparkVelocities: { r: number; speed: number; phase: number; y: number }[] = []

    for (let i = 0; i < sparkCount; i++) {
      const r = 2.0 + Math.random() * 1.5
      const angle = Math.random() * Math.PI * 2
      const y = (Math.random() - 0.5) * 3
      sparkPositions[i * 3] = Math.cos(angle) * r
      sparkPositions[i * 3 + 1] = y
      sparkPositions[i * 3 + 2] = Math.sin(angle) * r
      sparkVelocities.push({
        r,
        speed: 0.3 + Math.random() * 0.4,
        phase: Math.random() * Math.PI * 2,
        y,
      })
    }
    sparkGeom.setAttribute("position", new THREE.BufferAttribute(sparkPositions, 3))
    const sparkMat = new THREE.PointsMaterial({
      color: 0x00f0ff,
      size: 0.06,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    })
    const sparkPoints = new THREE.Points(sparkGeom, sparkMat)
    mainGroup.add(sparkPoints)

    // 6. Mouse Tracking & Inertial Orbit Controls
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
      mouseRef.current.targetX = x * 0.5
      mouseRef.current.targetY = y * 0.5

      // Move cursor specular point light
      cursorLight.position.x = x * 4
      cursorLight.position.y = y * 4
    }

    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true
      lastMousePos.current = { x: e.clientX, y: e.clientY }
      rotationRef.current.vx = 0
      rotationRef.current.vy = 0
    }

    const handleWindowMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return
      const deltaX = e.clientX - lastMousePos.current.x
      const deltaY = e.clientY - lastMousePos.current.y
      rotationRef.current.vx = deltaX * 0.008
      rotationRef.current.vy = deltaY * 0.008
      rotationRef.current.targetY += deltaX * 0.008
      rotationRef.current.targetX += deltaY * 0.008
      lastMousePos.current = { x: e.clientX, y: e.clientY }
    }

    const handleWindowMouseUp = () => {
      isDraggingRef.current = false
    }

    container.addEventListener("mousemove", handleMouseMove, { passive: true })
    container.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mousemove", handleWindowMouseMove, { passive: true })
    window.addEventListener("mouseup", handleWindowMouseUp)

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current || !renderer || !camera) return
      const w = containerRef.current.clientWidth
      const h = containerRef.current.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener("resize", handleResize)

    // 7. Buttery-Smooth Animation Loop with Delta Time & Physics Damping
    const clock = new THREE.Clock()
    let currentExplode = 0
    let animId = 0

    const animate = () => {
      const delta = Math.min(clock.getDelta(), 0.08)
      const elapsedTime = clock.getElapsedTime()

      // A. Smooth inertia decay for drag rotation
      if (!isDraggingRef.current) {
        rotationRef.current.targetY += rotationRef.current.vx
        rotationRef.current.targetX += rotationRef.current.vy
        rotationRef.current.vx *= 0.94 // gentle physical momentum decay
        rotationRef.current.vy *= 0.94
      }

      // B. Smooth spring lerps for rotation & parallax
      rotationRef.current.y += (rotationRef.current.targetY - rotationRef.current.y) * 0.12
      rotationRef.current.x += (rotationRef.current.targetX - rotationRef.current.x) * 0.12
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.06
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.06

      // C. Continuous organic hovering float
      const baseAutoY = elapsedTime * 0.22
      mainGroup.rotation.y = baseAutoY + rotationRef.current.y + mouseRef.current.x
      mainGroup.rotation.x = 0.15 + rotationRef.current.x - mouseRef.current.y
      mainGroup.position.y = Math.sin(elapsedTime * 1.6) * 0.14 // organic breathing float

      // D. Smooth Exploded View Lerp without resetting scene
      const targetExplode = explodedRef.current ? 1 : 0
      currentExplode += (targetExplode - currentExplode) * (1 - Math.exp(-7 * delta))

      explodeParts.forEach((part) => {
        const offset = part.explodeDir.clone().multiplyScalar(part.dist * currentExplode)
        part.mesh.position.copy(part.basePos.clone().add(offset))
      })

      // E. Pulsing bioluminescent heating core intensity
      const pulse = 1.6 + Math.sin(elapsedTime * 3.2) * 0.8
      glowingCoreMat.emissiveIntensity = pulse

      // F. Undulate fiber-optic tendrils with fluid wave physics
      tendrilMeshes.forEach((t, i) => {
        const posAttr = t.mesh.geometry.attributes.position as THREE.BufferAttribute
        const points = posAttr.array as Float32Array
        for (let j = 0; j < t.length; j++) {
          const wavePhase = elapsedTime * 2.8 + j * 0.4 + i
          const swayX = Math.sin(wavePhase) * (j * 0.035)
          const swayZ = Math.cos(wavePhase * 0.8) * (j * 0.035)
          points[j * 3] = Math.cos(t.baseAngles) * 0.45 + swayX
          points[j * 3 + 2] = Math.sin(t.baseAngles) * 0.45 + swayZ
        }
        posAttr.needsUpdate = true
      })

      // G. Update floating energy spark particles
      const sparkPosArray = sparkGeom.attributes.position.array as Float32Array
      for (let i = 0; i < sparkCount; i++) {
        const vel = sparkVelocities[i]
        const currentAngle = elapsedTime * vel.speed + vel.phase
        sparkPosArray[i * 3] = Math.cos(currentAngle) * vel.r
        sparkPosArray[i * 3 + 1] = vel.y + Math.sin(elapsedTime * 1.5 + i) * 0.2
        sparkPosArray[i * 3 + 2] = Math.sin(currentAngle) * vel.r
      }
      sparkGeom.attributes.position.needsUpdate = true

      // H. Counter-rotate gyro rings and gear teeth
      gyro1.rotation.z = elapsedTime * 0.35
      gyro2.rotation.x = elapsedTime * -0.28
      teethGroup.rotation.y = -elapsedTime * 0.32

      renderer.render(scene, camera)
      animId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animId)
      container.removeEventListener("mousemove", handleMouseMove)
      container.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mousemove", handleWindowMouseMove)
      window.removeEventListener("mouseup", handleWindowMouseUp)
      window.removeEventListener("resize", handleResize)
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, []) // Empty dependency array ensures permanent smooth WebGL context!

  // Wireframe toggler
  const toggleWireframe = () => {
    sound.playClick()
    const next = !wireframe
    setWireframe(next)
    wireframeRef.current = next
    materialsRef.current.forEach((mat) => {
      if ("wireframe" in mat) {
        ;(mat as THREE.MeshStandardMaterial).wireframe = next
      }
    })
  }

  // Explode toggle with audio servo
  const handleToggleExplode = () => {
    sound.playServo()
    const next = !exploded
    setExploded(next)
    explodedRef.current = next
  }

  const handleResetCamera = () => {
    sound.playClick()
    rotationRef.current.targetX = 0
    rotationRef.current.targetY = 0
    rotationRef.current.x = 0
    rotationRef.current.y = 0
    rotationRef.current.vx = 0
    rotationRef.current.vy = 0
  }

  return (
    <div className="relative w-full h-[520px] md:h-[680px] flex items-center justify-center select-none overflow-hidden">
      {/* Three.js Canvas Container */}
      <div
        ref={containerRef}
        className="absolute inset-0 cursor-grab active:cursor-grabbing z-20"
        title="Click and drag to rotate the 3D Mechanical Artifact (Momentum Active)"
      />

      {/* Floating HUD Controls Overlay */}
      <div className="absolute top-4 right-4 z-30 flex flex-col gap-2">
        <button
          onClick={handleToggleExplode}
          onMouseEnter={() => sound.playHover()}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono-tech uppercase tracking-wider rounded-lg backdrop-blur-md transition-all shadow-md border ${
            exploded
              ? "bg-[#ff1a75] text-white border-pink-400 shadow-[0_0_16px_rgba(255,26,117,0.55)] font-bold scale-105"
              : "bg-white/90 dark:bg-black/90 text-neutral-900 dark:text-neutral-100 border-neutral-300 dark:border-neutral-700 hover:border-black dark:hover:border-white"
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>{exploded ? "[ASSEMBLED]" : "[EXPLODED VIEW]"}</span>
        </button>

        <button
          onClick={toggleWireframe}
          onMouseEnter={() => sound.playHover()}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono-tech uppercase tracking-wider rounded-lg backdrop-blur-md transition-all border ${
            wireframe
              ? "bg-[#00e5ff] text-black border-cyan-300 font-bold shadow-[0_0_14px_rgba(0,229,255,0.45)]"
              : "bg-white/90 dark:bg-black/90 text-neutral-900 dark:text-neutral-100 border-neutral-300 dark:border-neutral-700 hover:border-black dark:hover:border-white"
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>{wireframe ? "[SOLID]" : "[WIREFRAME]"}</span>
        </button>

        <button
          onClick={handleResetCamera}
          onMouseEnter={() => sound.playHover()}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono-tech uppercase tracking-wider rounded-lg backdrop-blur-md bg-white/90 dark:bg-black/90 text-neutral-900 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-700 hover:border-black dark:hover:border-white shadow-sm"
          title="Reset 3D Orientation"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>[RESET]</span>
        </button>
      </div>

      {/* Floating 3D Telemetry Indicators */}
      <div className="absolute bottom-4 right-4 z-30 hidden md:flex flex-col items-end gap-1 text-[11px] font-mono-tech text-neutral-700 dark:text-neutral-300 bg-white/60 dark:bg-black/60 px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-800 backdrop-blur-md">
        <span className="flex items-center gap-1.5 font-bold text-neutral-900 dark:text-neutral-100">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
          RENDER: WEBGL 2.0 PHYSICAL PBR
        </span>
        <span>POLY_COUNT: 32,840 TRIS</span>
        <span>MOMENTUM INERTIA: ACTIVE</span>
      </div>

      {/* Left Axis HUD marker */}
      <div className="absolute bottom-4 left-4 z-30 hidden md:flex items-center gap-2 text-[11px] font-mono-tech text-neutral-700 dark:text-neutral-300 bg-white/60 dark:bg-black/60 px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-800 backdrop-blur-md">
        <span className="px-1.5 py-0.5 rounded bg-black text-white dark:bg-white dark:text-black font-bold text-[10px]">
          DRAG MOMENTUM
        </span>
        <span>SPIN 360° WITH INERTIA</span>
      </div>
    </div>
  )
}
