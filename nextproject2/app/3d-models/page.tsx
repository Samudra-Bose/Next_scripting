// ==============================================================================
// NEXT.JS TOPIC: Nested File-System Routing (app/3d-models/page.tsx)
// In Next.js, folder structures define the URL hierarchy:
// - app/page.tsx             --> URL: "/"
// - app/3d-models/page.tsx   --> URL: "/3d-models"
//
// This is also a Server Component that runs on the server/build time.
// ==============================================================================

import { getAllModels } from "@/app/lib/models"
import ModelVault from "@/app/components/ModelVault"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

// ==============================================================================
// NEXT.JS TOPIC: Route-Specific Metadata
// Next.js automatically merges this metadata with the root layout metadata.
// This sets the browser tab title and description for this specific route.
// ==============================================================================
export const metadata = {
  title: "PRINTFORGE // 3D Model Vault Depository",
  description: "Browse and download precision STL files, verified manifold meshes, and calibrated G-Codes.",
}

// ==============================================================================
// NEXT.JS TOPIC: Async Server Component for Route
// Fetches the full list of 52 models on the server before rendering the page.
// ==============================================================================
export default async function ModelsPage() {
  // Fetch all models directly on the server
  const models = await getAllModels()

  return (
    <div className="w-full min-h-screen py-10 px-4 md:px-8">
      {/* Top Breadcrumb Navigation Bar */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between hud-border-b pb-4 text-xs font-mono-tech uppercase text-neutral-600 dark:text-neutral-400 font-bold">
          {/*
            NEXT.JS TOPIC: next/link Component
            "Link" intercepts navigation clicks to provide instant SPA transitions
            without refreshing the page or reloading JavaScript/CSS bundles.
          */}
          <Link
            href="/"
            className="flex items-center gap-1.5 hover:text-[#ff1a75] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>RETURN TO CORE LAB</span>
          </Link>

          {/* Live count badge */}
          <div className="flex items-center gap-2">
            <span>TOTAL MANIFOLD MODELS:</span>
            <span className="font-extrabold text-[#ff1a75] dark:text-[#ff2a80]">
              {models.length} VERIFIED
            </span>
          </div>
        </div>
      </div>

      {/*
        NEXT.JS TOPIC: Client Component Boundary
        "ModelVault" is a Client Component ("use client") that receives the server data
        and handles instant browser-side searching, category filtering, and 3D preview modals.
      */}
      <ModelVault
        initialModels={models}
        title="ALL REGISTERED 3D PRINTABLE ASSETS"
        subtitle="Complete catalog of production-tested CAD and polygonal assets with guaranteed manifold geometry."
        showViewAll={false}
      />
    </div>
  )
}
