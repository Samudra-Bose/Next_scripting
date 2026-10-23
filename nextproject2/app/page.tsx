// ==============================================================================
// NEXT.JS TOPIC: Server Components & Async Data Fetching (app/page.tsx)
// In Next.js App Router, every file named "page.tsx" represents a public route.
// By default, components inside "app/" are React Server Components (RSC).
//
// KEY ADVANTAGES OF SERVER COMPONENTS:
// 1. They can be "async" and directly fetch database/API data with "await".
// 2. Zero client-side JavaScript sent for their rendering logic.
// 3. Fast initial page load because HTML is rendered on the server/build time.
// ==============================================================================

// Import the server data helper function
import { getAllModels } from "@/app/lib/models"

// Import custom sections (interactive client components)
import HeroSection from "@/app/components/HeroSection"
import TelemetryHud from "@/app/components/TelemetryHud"
import LayerSlicerSimulator from "@/app/components/LayerSlicerSimulator"
import MeshAnalyzer from "@/app/components/MeshAnalyzer"
import TechMatrix from "@/app/components/TechMatrix"
import ModelVault from "@/app/components/ModelVault"

// ==============================================================================
// NEXT.JS TOPIC: Async Page Component
// Notice how "Home" is an async function. In standard React, components cannot
// be async, but Next.js Server Components allow direct server-side async calls.
// ==============================================================================
export default async function Home() {
  // NEXT.JS TOPIC: Server-Side Data Loading
  // This fetch runs securely on the server. The data is fetched before the HTML
  // is sent to the browser, eliminating client-side loading spinners.
  const models = await getAllModels()

  return (
    <div className="w-full flex flex-col items-center">
      {/*
        SECTION 1: Flagship 3D Hero Canvas
        - Contains the interactive Three.js mechanical artifact
        - Renders giant editorial typography and HUD coordinates
      */}
      <HeroSection />

      {/*
        SECTION 2: Real-Time Hardware Telemetry
        - Displays live animated hotend, bed, and CoreXY speed gauges
        - Continuous streaming marquee broadcast ticker
      */}
      <TelemetryHud />

      {/*
        SECTION 3: Interactive 3D Layer Slicer Simulator
        - Lets students and makers scrub a layer height slider (0% to 100%)
        - Simulates real-time G-Code toolhead extrusion and layer deposition
      */}
      <LayerSlicerSimulator />

      {/*
        SECTION 4: Client-Side 3D Mesh & STL Analyzer
        - Instant polygon counter, bounding box calculation, and watertight test
        - Multi-view modes: Metallic PBR, Wireframe, and Stress Heatmap
      */}
      <MeshAnalyzer />

      {/*
        SECTION 5: Manufacturing Process Benchmark Matrix
        - Interactive comparison of FDM vs SLA Resin vs SLS industrial processes
        - Radar performance metrics for tensile strength, speed, and precision
      */}
      <TechMatrix />

      {/*
        SECTION 6: Curated 3D Model Vault
        - NEXT.JS TOPIC: Passing Server Data to Client Components
        - We pass the server-fetched "models" array as props to the interactive
          "ModelVault" client component for instant client-side search and filtering.
      */}
      <ModelVault
        initialModels={models}
        title="FEATURED 3D MODELS // MANIFOLD READY"
        subtitle="Explore verified mechanical components, articulated creatures, and cosplay props directly ready for slicing."
        limit={6}
        showViewAll={true}
      />
    </div>
  )
}
