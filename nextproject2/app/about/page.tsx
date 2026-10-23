// ==============================================================================
// NEXT.JS TOPIC: Static Server Component (app/about/page.tsx)
// Represents the URL "/about".
// Because it does not use dynamic hooks (like usePathname) or cookies, Next.js
// compiles this page into a 100% static HTML file during "npm run build".
// ==============================================================================

import Link from "next/link"
import { Box, ShieldCheck, Cpu, ArrowUpRight } from "lucide-react"

// ==============================================================================
// NEXT.JS TOPIC: Static SEO Metadata Export
// Sets the browser tab title and description for search engines.
// ==============================================================================
export const metadata = {
  title: "MANIFESTO // About PrintForge Labs",
  description: "Democratizing precision additive manufacturing and open-source hardware design.",
}

export default function AboutPage() {
  return (
    <div className="w-full min-h-screen py-12 px-4 md:px-8">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Editorial Top Headline */}
        <div className="space-y-4 hud-border-b pb-8">
          <div className="flex items-center gap-2 text-xs font-mono-tech text-pink-600 dark:text-pink-400 uppercase tracking-widest font-bold">
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse shadow-[0_0_8px_#ff1a75]" />
            <span>PRINTFORGE LABS // MANIFESTO & ORIGINS</span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black font-condensed tracking-tight uppercase leading-[0.88] text-neutral-950 dark:text-neutral-50">
            BRIDGING DIGITAL CREATIVITY WITH PHYSICAL REALITY.
          </h1>
          <p className="text-sm md:text-base font-mono-tech text-neutral-700 dark:text-neutral-300 max-w-2xl leading-relaxed font-medium">
            Founded with the belief that open-source hardware and high-precision digital fabrication belong to every creator, maker, and engineer worldwide.
          </p>
        </div>

        {/* 3 Core Pillars (Infographic Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl glass-panel hud-border space-y-3.5 shadow-md hover:-translate-y-0.5 transition-transform">
            <div className="w-11 h-11 rounded-lg bg-pink-500/10 text-[#ff1a75] flex items-center justify-center border border-pink-500/20">
              <Box className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-xl font-condensed uppercase tracking-tight text-neutral-950 dark:text-neutral-50">
              100% VERIFIED MANIFOLDS
            </h3>
            <p className="text-xs md:text-sm font-mono-tech text-neutral-700 dark:text-neutral-300 leading-relaxed font-medium">
              Every single 3D file submitted to the PrintForge depository passes autonomous mesh validation tests for zero-thickness walls, inverted normals, and non-manifold edges.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-panel hud-border space-y-3.5 shadow-md hover:-translate-y-0.5 transition-transform">
            <div className="w-11 h-11 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center border border-cyan-500/20">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-xl font-condensed uppercase tracking-tight text-neutral-950 dark:text-neutral-50">
              CALIBRATED SLICE PROFILES
            </h3>
            <p className="text-xs md:text-sm font-mono-tech text-neutral-700 dark:text-neutral-300 leading-relaxed font-medium">
              Tested on modern high-speed CoreXY platforms (Bambu Lab, Prusa MK4, Voron 2.4) with pre-tuned retraction, volumetric flow, and acceleration values.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-panel hud-border space-y-3.5 shadow-md hover:-translate-y-0.5 transition-transform">
            <div className="w-11 h-11 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-xl font-condensed uppercase tracking-tight text-neutral-950 dark:text-neutral-50">
              OPEN-HARDWARE ETHOS
            </h3>
            <p className="text-xs md:text-sm font-mono-tech text-neutral-700 dark:text-neutral-300 leading-relaxed font-medium">
              No proprietary walled gardens or paywalls. We champion Creative Commons and open-source licensing to accelerate global maker innovation.
            </p>
          </div>
        </div>

        {/* Narrative Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 hud-border-t pt-12 items-center">
          <div className="space-y-4">
            <span className="text-xs font-mono-tech uppercase text-neutral-500 font-bold">
              {"// ARCHITECTURAL VISION"}
            </span>
            <h2 className="text-3xl font-black font-condensed tracking-tight uppercase text-neutral-950 dark:text-neutral-50">
              REVOLUTIONIZING HOW PHYSICAL OBJECTS ARE SHARED
            </h2>
            <p className="text-xs md:text-sm font-mono-tech text-neutral-700 dark:text-neutral-300 leading-relaxed font-medium">
              3D printing is no longer restricted to crude plastic trinkets. Today, multi-material FDM and sub-20-micron resin printing enable aerospace parts, working planetary gearboxes, prosthetic limbs, and cinematic cosplay armor.
            </p>
            <p className="text-xs md:text-sm font-mono-tech text-neutral-700 dark:text-neutral-300 leading-relaxed font-medium">
              PrintForge serves as the open digital infrastructure connecting passionate industrial designers with millions of distributed desktop fabrication hubs worldwide.
            </p>
          </div>

          {/* Telemetry card with link to nested route */}
          <div className="p-6 rounded-2xl glass-panel hud-border space-y-4 font-mono-tech text-xs shadow-md">
            <div className="flex items-center justify-between border-b border-neutral-300 dark:border-neutral-800 pb-2">
              <span className="font-bold uppercase text-neutral-600 dark:text-neutral-400">LAB SPECIFICATIONS</span>
              <span className="text-pink-600 dark:text-pink-400 font-bold">ONLINE</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600 dark:text-neutral-400">OPERATIONAL SINCE:</span>
              <span className="font-bold text-neutral-950 dark:text-neutral-50">2023 // PHASE 4</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600 dark:text-neutral-400">ACTIVE GLOBAL MAKERS:</span>
              <span className="font-bold text-neutral-950 dark:text-neutral-50">240,000+ CREATORS</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600 dark:text-neutral-400">DAILY G-CODE RUNS:</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">18,500 SLICES</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600 dark:text-neutral-400">AVERAGE BED ADHESION:</span>
              <span className="font-bold text-cyan-600 dark:text-cyan-400">99.4% NOMINAL</span>
            </div>

            {/*
              NEXT.JS TOPIC: Linking to Nested Child Route
              Navigates from "/about" to "/about/mission" without full page reload.
            */}
            <div className="pt-3">
              <Link
                href="/about/mission"
                className="w-full py-2.5 bg-black text-white dark:bg-white dark:text-black font-bold uppercase tracking-wider rounded text-center flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity shadow-sm"
              >
                <span>EXPLORE OUR CORE MISSION</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
