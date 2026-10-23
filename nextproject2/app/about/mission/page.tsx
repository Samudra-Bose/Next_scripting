// ==============================================================================
// NEXT.JS APP ROUTER CONCEPT: NESTED ROUTING & FOLDER CONVENTIONS
// ==============================================================================
// File location: app/about/mission/page.tsx
// In Next.js App Router, directory nesting maps directly to URL route segments:
// - app/about/page.tsx         -> "/about"
// - app/about/mission/page.tsx -> "/about/mission"
// This file is a Server Component by default, ensuring zero client bundle cost.

import Link from "next/link"
import { ArrowLeft, Target } from "lucide-react"
import type { Metadata } from "next"

// ==============================================================================
// NEXT.JS CONCEPT: STATIC METADATA EXPORT
// ==============================================================================
// When a page doesn't need dynamic runtime parameters for SEO, exporting a static
// `metadata` object instructs Next.js to inject title, description, and OpenGraph tags
// directly into the HTML <head> during build time (Static Site Generation / SSG).
export const metadata: Metadata = {
  title: "MISSION // PrintForge Labs",
  description: "The core mission driving PrintForge open hardware and generative 3D engineering.",
}

// ==============================================================================
// NEXT.JS CONCEPT: ASYNC-CAPABLE SERVER COMPONENT
// ==============================================================================
// Because this component contains no hooks (useState, useEffect) and no browser-only
// APIs, it executes strictly on the Node.js / edge server during render.
// The rendered output is pure, pre-compiled HTML and CSS sent directly over the wire.
export default function AboutMissionPage() {
  return (
    <div className="w-full min-h-screen py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* ==============================================================================
            NEXT.JS CONCEPT: CLIENT-SIDE PREFETCHING WITH NEXT/LINK
            Next.js automatically prefetches linked routes (<Link href="/about">) in the background
            when they enter the user's viewport, making route transitions feel instantaneous.
            ============================================================================== */}
        <div className="flex items-center justify-between hud-border-b pb-4 text-xs font-mono-tech uppercase text-neutral-500">
          <Link
            href="/about"
            className="flex items-center gap-1.5 hover:text-black dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK TO MANIFESTO</span>
          </Link>
          <span>MISSION DIRECTIVE // v2.4</span>
        </div>

        {/* Hero Headline: Retro-brutalist tech headline styling */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono-tech text-pink-600 dark:text-pink-400 uppercase tracking-widest">
            <Target className="w-4 h-4" />
            <span>OUR SACRED DIRECTIVE</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black font-condensed tracking-tight uppercase leading-[0.9] text-neutral-900 dark:text-neutral-100">
            EMPOWERING EVERY MAKER WITH UNRESTRICTED MANUFACTURING FREEDOM.
          </h1>
          <p className="text-sm md:text-base font-mono-tech text-neutral-600 dark:text-neutral-400 leading-relaxed">
            We are eliminating the friction between a digital CAD concept on your screen and a functioning mechanical object in your hands.
          </p>
        </div>

        {/* ==============================================================================
            NEXT.JS CONCEPT: IMMUTABLE DATA RENDERING IN SERVER COMPONENTS
            Static arrays mapped inside Server Components are computed once at build time.
            No React reconciliation overhead or runtime state changes are needed.
            ============================================================================== */}
        <div className="space-y-6">
          {[
            {
              num: "01",
              title: "ZERO PAYWALLS ON VERIFIED CORE GEOMETRY",
              desc: "Essential engineering components, replacement appliance gears, and educational models will remain free forever to foster community innovation.",
            },
            {
              num: "02",
              title: "RIGOROUS TOLERANCE VALIDATION",
              desc: "No more wasted spools of filament on unprintable models with floating islands, non-planar facets, or microscopic wall thickness.",
            },
            {
              num: "03",
              title: "SUSTAINABILITY VIA DISTRIBUTED LOCAL FABRICATION",
              desc: "By 3D printing locally on demand, we eliminate international container shipping emissions, excess warehouse inventory, and industrial scrap.",
            },
          ].map((item) => (
            <div
              key={item.num}
              className="p-6 rounded-xl bg-white dark:bg-neutral-900 hud-border flex flex-col md:flex-row md:items-center gap-6"
            >
              <div className="text-3xl font-black font-condensed text-pink-600 dark:text-pink-400">
                {"//"} {item.num}
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold font-condensed uppercase tracking-tight">
                  {item.title}
                </h3>
                <p className="text-xs font-mono-tech text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ==============================================================================
            NEXT.JS NAVIGATION: CALL-TO-ACTION LINKING BACK TO THE PRIMARY DIRECTORY
            This Link routes the user into the dynamic model catalog at "/3d-models".
            ============================================================================== */}
        <div className="pt-6 hud-border-t flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs font-mono-tech text-neutral-500">
            JOIN OVER 240,000 REGISTERED MAKERS WORLDWIDE
          </span>
          <Link
            href="/3d-models"
            className="px-6 py-3 bg-black text-white dark:bg-white dark:text-black font-mono-tech text-xs uppercase tracking-wider font-bold rounded hover:opacity-90 transition-opacity"
          >
            EXPLORE THE 3D MODEL DEPOSITORY
          </Link>
        </div>
      </div>
    </div>
  )
}
