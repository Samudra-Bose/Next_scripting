// ==============================================================================
// NEXT.JS APP ROUTER CONCEPT: CLIENT-SIDE SEARCH & FILTERING IN HYBRID PATTERNS
// ==============================================================================
// File location: app/components/ModelVault.tsx
// Declared as `"use client"` because it handles live user input, filter pills,
// dynamic sorting, interactive modal toggling, and client-side audio playback.
//
// HYBRID DATA ARCHITECTURE PATTERN:
// The server component (app/page.tsx or app/3d-models/page.tsx) loads the data
// statically or from cache, and passes it as `initialModels` props down into this
// Client Component. This provides the best of both worlds: fast SSR initial render
// paired with zero-latency instant search/filtering on the client.
"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { sound } from "@/app/lib/sound"
import type { Model } from "@/app/types"
import Quick3DModal from "./Quick3DModal"
import ModelWireframeIcon from "./ModelWireframeIcon"
import { getModelSpecs } from "@/app/lib/modelData"
import { Search, Heart, Eye, ArrowUpRight, Box, Clock, Scale } from "lucide-react"

// Strongly typed component props
type ModelVaultProps = {
  initialModels: Model[]
  title?: string
  subtitle?: string
  limit?: number
  showViewAll?: boolean
}

export default function ModelVault({
  initialModels,
  title = "CURATED 3D MODEL VAULT",
  subtitle = "High-precision manifold STL files tested for mechanical tolerance, printability, and zero bed warping.",
  limit,
  showViewAll = true,
}: ModelVaultProps) {
  // State for user text search query
  const [search, setSearch] = useState<string>("")
  // State for selected category filter ("all", "robotics", "art", etc.)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  // State for sorting criteria ("likes" | "newest" | "name")
  const [sortBy, setSortBy] = useState<"likes" | "newest" | "name">("likes")
  // Currently opened 3D quick inspect modal model, or null if modal is closed
  const [inspectModel, setInspectModel] = useState<Model | null>(null)

  // ==============================================================================
  // REACT MEMOIZATION: CATEGORY EXTRACTION
  // ==============================================================================
  // `useMemo` avoids re-calculating the distinct category set on every render cycle.
  const categories = useMemo(() => {
    const cats = new Set<string>()
    initialModels.forEach((m) => cats.add(m.category))
    return ["all", ...Array.from(cats)]
  }, [initialModels])

  // ==============================================================================
  // REACT MEMOIZATION: FILTERING & SORTING PIPELINE
  // ==============================================================================
  // Efficiently calculates the subset of models whenever search, category, or sort changes.
  const filteredModels = useMemo(() => {
    return initialModels
      .filter((m) => {
        const matchesCategory = selectedCategory === "all" || m.category === selectedCategory
        const matchesSearch =
          m.name.toLowerCase().includes(search.toLowerCase()) ||
          m.description.toLowerCase().includes(search.toLowerCase())
        return matchesCategory && matchesSearch
      })
      .sort((a, b) => {
        if (sortBy === "likes") return b.likes - a.likes
        if (sortBy === "newest") return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
        return a.name.localeCompare(b.name)
      })
      .slice(0, limit || initialModels.length)
  }, [initialModels, search, selectedCategory, sortBy, limit])

  return (
    <section id="vault" className="w-full hud-border-b py-16 px-4 md:px-8 bg-neutral-100/70 dark:bg-black/40">
      <div className="max-w-7xl mx-auto">
        {/* Section Headline */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-tech text-pink-600 dark:text-pink-400 uppercase tracking-widest mb-1">
              <Box className="w-3.5 h-3.5" />
              <span>DIGITAL ASSET REPOSITORY // 52 DISTINCT CAD BLUEPRINTS</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black font-condensed tracking-tight uppercase">
              {title}
            </h2>
          </div>
          <p className="text-xs font-mono-tech text-neutral-500 max-w-sm">
            {subtitle}
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
          {/* Controlled Search Input Field */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by model name or geometry..."
              className="w-full pl-10 pr-4 py-2 text-xs font-mono-tech bg-white dark:bg-neutral-900 hud-border rounded-lg text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white"
            />
          </div>

          {/* Sort Criteria Selector */}
          <div className="flex items-center gap-2 text-xs font-mono-tech">
            <span className="text-neutral-500 uppercase">SORT:</span>
            {(["likes", "newest", "name"] as const).map((s) => (
              <button
                key={s}
                onClick={() => {
                  sound.playClick()
                  setSortBy(s)
                }}
                onMouseEnter={() => sound.playHover()}
                className={`px-2.5 py-1 rounded uppercase tracking-wider transition-all border ${
                  sortBy === s
                    ? "bg-black text-white dark:bg-white dark:text-black border-transparent font-bold"
                    : "hud-border bg-white/70 dark:bg-neutral-900/60 text-neutral-700 dark:text-neutral-300"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Category Pill Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                sound.playClick()
                setSelectedCategory(cat)
              }}
              onMouseEnter={() => sound.playHover()}
              className={`px-3 py-1 text-xs font-mono-tech uppercase tracking-wider rounded-full transition-all border ${
                selectedCategory === cat
                  ? "bg-[#ff1a75] text-white border-pink-500 font-bold shadow-md scale-105"
                  : "hud-border bg-white dark:bg-neutral-900/80 text-neutral-800 dark:text-neutral-200 font-semibold hover:border-black dark:hover:border-white"
              }`}
            >
              {cat.replace("-", " ")}
            </button>
          ))}
        </div>

        {/* ==============================================================================
            MODEL CARDS GRID: 52 DISTINCT PROCEDURAL CAD BLUEPRINTS
            Each card renders a unique procedural SVG wireframe and physical specifications.
            ============================================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {filteredModels.map((model) => {
            const specs = getModelSpecs(model.id)
            return (
              <div
                key={model.id}
                className="group relative bg-white dark:bg-[#0e1017] rounded-xl hud-border overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col justify-between glass-panel"
              >
                {/* Card Header & Procedural Wireframe Preview */}
                <div className="relative h-48 bg-gradient-to-br from-neutral-200 via-neutral-100 to-neutral-300 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 flex items-center justify-center overflow-hidden border-b border-neutral-200 dark:border-neutral-800">
                  {/* Distinct Procedural Wireframe Blueprint */}
                  <div className="w-28 h-28 relative flex items-center justify-center">
                    <ModelWireframeIcon id={model.id} name={model.name} category={model.category} />
                  </div>

                  {/* Top Category Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2 py-0.5 rounded bg-black/80 text-white dark:bg-white dark:text-black text-[10px] font-mono-tech uppercase font-bold tracking-wider">
                      {model.category}
                    </span>
                  </div>

                  {/* Likes counter */}
                  <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2 py-0.5 rounded bg-white/80 dark:bg-black/80 backdrop-blur-sm text-xs font-mono-tech text-neutral-800 dark:text-neutral-200">
                    <Heart className="w-3 h-3 text-pink-500 fill-pink-500" />
                    <span>{model.likes}</span>
                  </div>

                  {/* Hover Quick 3D Viewport Trigger */}
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button
                      onClick={() => {
                        sound.playClick()
                        setInspectModel(model)
                      }}
                      onMouseEnter={() => sound.playHover()}
                      className="px-3 py-1.5 rounded-lg bg-pink-600 hover:bg-pink-500 text-white text-xs font-mono-tech uppercase font-bold tracking-wider flex items-center gap-1.5 shadow-lg active:scale-95 transition-all"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>QUICK 3D INSPECT</span>
                    </button>
                  </div>
                </div>

                {/* Card Information Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <h3 className="font-extrabold text-xl font-condensed tracking-tight uppercase text-neutral-950 dark:text-neutral-50 group-hover:text-[#ff1a75] dark:group-hover:text-[#ff2a80] transition-colors">
                      {model.name}
                    </h3>
                    <p className="text-xs font-mono-tech text-neutral-700 dark:text-neutral-300 font-medium line-clamp-2 leading-relaxed">
                      {model.description}
                    </p>
                  </div>

                  {/* Distinct CAD Parameters Bar */}
                  <div className="grid grid-cols-2 gap-2 text-[10px] font-mono-tech text-neutral-700 dark:text-neutral-300 bg-black/[0.03] dark:bg-white/[0.04] p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800">
                    <span className="flex items-center gap-1 font-semibold">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      <span>{specs.printTime}</span>
                    </span>
                    <span className="flex items-center gap-1 font-semibold">
                      <Scale className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{specs.weight}g</span>
                    </span>
                    <span className="text-neutral-600 dark:text-neutral-400 font-medium">
                      {specs.dims.x}×{specs.dims.y}×{specs.dims.z}mm
                    </span>
                    <span className="text-[#ff1a75] dark:text-[#ff2a80] font-bold text-right">
                      {specs.difficulty}
                    </span>
                  </div>

                  {/* Action Navigation Footer */}
                  <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs font-mono-tech">
                    <span className="text-[10px] text-neutral-400">
                      ID #{model.id.toString().padStart(4, "0")}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          sound.playClick()
                          setInspectModel(model)
                        }}
                        className="px-2 py-1 rounded hud-border hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black text-[10px] uppercase transition-all"
                      >
                        3D VIEW
                      </button>

                      {/* Next/Link pre-fetches the dynamic detail page /3d-models/[id] */}
                      <Link
                        href={`/3d-models/${model.id}`}
                        onMouseEnter={() => sound.playHover()}
                        onClick={() => sound.playClick()}
                        className="flex items-center gap-1 font-bold text-neutral-900 dark:text-neutral-100 hover:text-pink-600 transition-colors"
                      >
                        <span>SPECS</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Optional View All Button for truncated list views */}
        {showViewAll && limit && filteredModels.length < initialModels.length && (
          <div className="text-center pt-4">
            <Link
              href="/3d-models"
              onMouseEnter={() => sound.playHover()}
              onClick={() => sound.playClick()}
              className="inline-flex items-center gap-2 px-8 py-3 bg-black text-white dark:bg-white dark:text-black font-mono-tech text-xs uppercase tracking-widest font-bold rounded-lg hover:opacity-90 active:scale-95 transition-all shadow-md"
            >
              <span>VIEW ALL {initialModels.length} ARCHIVED 3D MODELS</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>

      {/* Interactive 3D Modal Viewport */}
      <Quick3DModal model={inspectModel} onClose={() => setInspectModel(null)} />
    </section>
  )
}
