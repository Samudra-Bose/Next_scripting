// ==============================================================================
// NEXT.JS TOPIC: Dynamic Route Segments [id] (app/3d-models/[id]/page.tsx)
// Folders wrapped in square brackets like "[id]" create dynamic routes.
// - URL "/3d-models/1"  --> matches with params.id = "1"
// - URL "/3d-models/24" --> matches with params.id = "24"
// ==============================================================================

import { getModelById, getAllModels } from "@/app/lib/models"
import ModelDetailViewer3D from "@/app/components/ModelDetailViewer3D"
import { getModelSpecs } from "@/app/lib/modelData"
import Link from "next/link"
// NEXT.JS TOPIC: notFound() Navigation Helper
// Calling notFound() immediately renders the nearest "not-found.tsx" page
// and returns an HTTP 404 status code automatically.
import { notFound } from "next/navigation"
import { ArrowLeft, Download, Heart, ShieldCheck, Cpu, Gauge } from "lucide-react"

// ==============================================================================
// NEXT.JS TOPIC: Breaking Change in Modern Next.js (Async Params)
// In Next.js 15+, "params" is a Promise that MUST be awaited before reading
// properties. We define the TypeScript type accordingly:
// ==============================================================================
type Props = {
  params: Promise<{ id: string }>
}

// ==============================================================================
// NEXT.JS TOPIC: Static Site Generation (generateStaticParams)
// This function tells Next.js at BUILD TIME which dynamic paths to pre-render.
// Instead of building pages on-demand when users visit, Next.js calls this
// function during "npm run build" and generates all 52 HTML pages ahead of time!
// RESULT: Instant loading speeds and zero server database load at runtime.
// ==============================================================================
export async function generateStaticParams() {
  const models = await getAllModels()
  // Return an array of param objects: [{ id: "1" }, { id: "2" }, ... { id: "52" }]
  return models.map((m) => ({
    id: m.id.toString(),
  }))
}

// ==============================================================================
// NEXT.JS TOPIC: Dynamic Metadata Generation (generateMetadata)
// Next.js executes this function per route to dynamically set the page <title>
// and social share tags based on the model's actual name and description.
// ==============================================================================
export async function generateMetadata({ params }: Props) {
  // Await the asynchronous params promise
  const { id } = await params
  const model = await getModelById(id)

  // Fallback title if model was not found
  if (!model) return { title: "Model Not Found // PrintForge" }

  // Return dynamic metadata object
  return {
    title: `${model.name.toUpperCase()} // 3D CAD Blueprint - PrintForge`,
    description: model.description,
  }
}

// ==============================================================================
// NEXT.JS TOPIC: Dynamic Route Page Component
// Receives the async "params" object and renders the model's full 3D detail view.
// ==============================================================================
export default async function ModelDetailPage({ params }: Props) {
  // 1. Await params to extract the dynamic route "id"
  const { id } = await params

  // 2. Query the model data on the server
  const model = await getModelById(id)

  // 3. If ID does not exist, trigger Next.js 404 page
  if (!model) {
    notFound()
  }

  // 4. Retrieve CAD physical specifications (print time, weight, dimensions)
  const specs = getModelSpecs(model.id)

  // 5. Fetch all models to find related recommendations in the same category
  const allModels = await getAllModels()
  const relatedModels = allModels
    .filter((m) => m.category === model.category && m.id !== model.id)
    .slice(0, 3)

  return (
    <div className="w-full min-h-screen py-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between hud-border-b pb-4 text-xs font-mono-tech uppercase text-neutral-600 dark:text-neutral-400 font-bold">
          <Link
            href="/3d-models"
            className="flex items-center gap-1.5 hover:text-[#ff1a75] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>RETURN TO 3D VAULT</span>
          </Link>
          <div className="flex items-center gap-2">
            <span>REGISTRY ID:</span>
            <span className="font-extrabold text-neutral-950 dark:text-neutral-50">
              #PF-{model.id.toString().padStart(4, "0")}
            </span>
          </div>
        </div>

        {/* Main Grid: Interactive 3D Viewport (7 cols) + Engineering Sheet (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/*
            Left Column: Interactive Three.js 3D Viewport
            Renders the specific procedural 3D mesh corresponding to this model ID.
          */}
          <div className="lg:col-span-7 space-y-4">
            <ModelDetailViewer3D modelId={model.id} modelName={model.name} />

            {/* Validation badge */}
            <div className="p-4 rounded-xl glass-panel hud-border flex items-center justify-between text-xs font-mono-tech text-neutral-700 dark:text-neutral-300 font-medium">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                VERIFIED BY PRINTFORGE AUTO-MANIFOLD ENGINE
              </span>
              <span className="font-bold">FORMAT: STL / STEP / 3MF</span>
            </div>
          </div>

          {/*
            Right Column: Engineering Parameters & Slicing Specifications
            Displays calibrated 3D printing parameters for the model.
          */}
          <div className="lg:col-span-5 space-y-6 font-mono-tech">
            {/* Header info */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#ff1a75]/15 text-[#ff1a75] dark:text-[#ff2a80] border border-[#ff1a75]/30">
                  {model.category.replace("-", " ")}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-neutral-600 dark:text-neutral-400 font-semibold">
                  <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
                  <strong className="text-neutral-950 dark:text-neutral-50">{model.likes}</strong> LIKES
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-black font-condensed tracking-tight uppercase text-neutral-950 dark:text-neutral-50">
                {model.name}
              </h1>

              <p className="text-xs md:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-medium">
                {model.description}
              </p>
            </div>

            {/* Technical Parameters Table */}
            <div className="p-6 rounded-2xl glass-panel hud-border space-y-3.5 text-xs shadow-lg">
              <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-2.5">
                <span className="uppercase font-bold text-neutral-900 dark:text-neutral-100">CALIBRATED PRINT PARAMETERS</span>
                <Cpu className="w-4 h-4 text-[#ff1a75]" />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-700 dark:text-neutral-300 font-medium">BOUNDS (X × Y × Z):</span>
                  <span className="font-bold text-neutral-950 dark:text-neutral-50">
                    {specs.dims.x} × {specs.dims.y} × {specs.dims.z} mm
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-700 dark:text-neutral-300 font-medium">ESTIMATED PRINT TIME:</span>
                  <span className="font-bold text-amber-600 dark:text-amber-400">{specs.printTime}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-700 dark:text-neutral-300 font-medium">ESTIMATED FILAMENT MASS:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">{specs.weight} grams</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-700 dark:text-neutral-300 font-medium">POLYGONAL DENSITY:</span>
                  <span className="font-bold text-[#ff1a75] dark:text-[#ff2a80]">{specs.polyCount.toLocaleString()} Triangles</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-700 dark:text-neutral-300 font-medium">RECOMMENDED INFILL:</span>
                  <span className="font-bold text-neutral-950 dark:text-neutral-50">{specs.infill}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-700 dark:text-neutral-300 font-medium">PRINT DIFFICULTY:</span>
                  <span className="font-bold text-cyan-600 dark:text-cyan-400">{specs.difficulty}</span>
                </div>
              </div>
            </div>

            {/* Actions: Download STL & Export G-Code */}
            <div className="space-y-3">
              <button
                className="w-full py-3.5 bg-black text-white dark:bg-white dark:text-black text-xs uppercase font-bold tracking-wider rounded-lg hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <Download className="w-4 h-4" />
                <span>DOWNLOAD VERIFIED STL ARCHIVE (.ZIP)</span>
              </button>

              <button
                className="w-full py-3 hud-border hover:bg-black/5 dark:hover:bg-white/5 text-xs uppercase font-semibold tracking-wider rounded-lg transition-all flex items-center justify-center gap-2 text-neutral-800 dark:text-neutral-200"
              >
                <Gauge className="w-3.5 h-3.5" />
                <span>GENERATE PRE-COMPILED G-CODE</span>
              </button>
            </div>
          </div>
        </div>

        {/* Related Models Row */}
        {relatedModels.length > 0 && (
          <div className="pt-12 hud-border-t space-y-6">
            <h3 className="text-2xl font-black font-condensed tracking-tight uppercase text-neutral-950 dark:text-neutral-50">
              SIMILAR ARCHIVED MODELS IN CATEGORY
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedModels.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/3d-models/${rel.id}`}
                  className="p-5 rounded-xl glass-panel hud-border hover:border-black dark:hover:border-white transition-all space-y-2 group shadow-sm hover:-translate-y-0.5"
                >
                  <span className="text-[10px] font-mono-tech text-neutral-500 uppercase font-bold">
                    #{rel.id.toString().padStart(4, "0")}
                  </span>
                  <h4 className="font-bold font-condensed text-lg uppercase group-hover:text-[#ff1a75] transition-colors text-neutral-950 dark:text-neutral-50">
                    {rel.name}
                  </h4>
                  <p className="text-xs font-mono-tech text-neutral-600 dark:text-neutral-400 line-clamp-2">
                    {rel.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
