"use client"

import Link from "next/link"
import MechanicalHero3D from "./MechanicalHero3D"
import { sound } from "@/app/lib/sound"
import { Zap, ArrowDown, Box, Sparkles, Terminal } from "lucide-react"

export default function HeroSection() {
  return (
    <section id="hero" className="relative w-full min-h-[94vh] flex flex-col justify-between overflow-hidden px-4 md:px-8 pt-4 pb-12 hud-border-b">
      {/* 1. Top HUD Row */}
      <div className="w-full flex items-center justify-between text-xs font-mono-tech uppercase tracking-widest text-neutral-700 dark:text-neutral-300 pt-2 pb-4">
        <div className="flex items-center gap-3">
          <span className="font-extrabold text-neutral-950 dark:text-neutral-50 flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 bg-[#ff1a75] animate-ping rounded-full shadow-[0_0_8px_#ff1a75]" />
            [PRINTFORGE / LABS]
          </span>
          <span className="hidden sm:inline text-neutral-400">|</span>
          <span className="hidden sm:inline font-medium text-neutral-600 dark:text-neutral-400">
            SERIES_07 // HIGH-PRECISION 3D ARTIFACT
          </span>
        </div>

        <div className="flex items-center gap-4 font-semibold">
          <Link
            href="/about"
            onMouseEnter={() => sound.playHover()}
            onClick={() => sound.playClick()}
            className="hover:text-[#ff1a75] transition-colors"
          >
            [MANIFESTO]
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => sound.playHover()}
            onClick={() => sound.playClick()}
            className="hover:text-[#ff1a75] transition-colors"
          >
            [SOURCE REPO]
          </a>
        </div>
      </div>

      {/* 2. Side HUD Indicators (Desktop) */}
      {/* Left side vertical marker */}
      <div className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 flex-col items-center gap-3 text-[11px] font-mono-tech text-neutral-700 dark:text-neutral-300 uppercase tracking-widest select-none z-30">
        <span className="rotate-90 origin-center mb-6 font-bold text-neutral-500">+ + +</span>
        <span className="font-extrabold text-neutral-900 dark:text-neutral-100">FDM</span>
        <span>+</span>
        <span className="font-extrabold text-neutral-900 dark:text-neutral-100">SLA</span>
        <span>+</span>
        <span className="font-extrabold text-[#ff1a75] dark:text-[#ff2a80] drop-shadow-sm">SLS</span>
        <span>+</span>
        <span className="font-extrabold text-[#00e5ff] dark:text-[#00f0ff] drop-shadow-sm">STL</span>
        <span className="rotate-90 origin-center mt-6 font-bold text-neutral-500">+ + +</span>
      </div>

      {/* Right side vertical hatched track / scroll indicator */}
      <div className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 flex-col items-center gap-1.5 text-[10px] font-mono-tech text-neutral-600 dark:text-neutral-300 select-none z-30">
        <span className="font-extrabold text-neutral-900 dark:text-neutral-100">0.05</span>
        <div className="w-2 h-36 bg-neutral-300 dark:bg-neutral-800 rounded-full overflow-hidden relative shadow-inner">
          <div className="absolute top-0 w-full h-1/3 bg-neutral-900 dark:bg-neutral-100 rounded-full animate-bounce shadow" />
        </div>
        <span className="font-extrabold text-neutral-900 dark:text-neutral-100">MM</span>
        <span className="text-[9px] uppercase tracking-tighter mt-1 text-neutral-500 font-bold">Z-AXIS</span>
      </div>

      {/* 3. Centerpiece Stage: Giant Condensed Typography + 3D Mechanical Artifact with Radiant Halo */}
      <div className="relative w-full flex-1 flex flex-col items-center justify-center my-2">
        {/* Soft Radial Backlight Halo from Noomo Reference */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <div className="w-[600px] h-[600px] rounded-full hero-halo filter blur-3xl opacity-70 animate-pulse" />
        </div>

        {/* Giant Headline Typography stretching behind/around 3D canvas */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center pointer-events-none select-none z-10 w-full">
          <h1 className="text-[14vw] sm:text-[16vw] font-black tracking-tighter uppercase font-condensed leading-[0.82] text-center w-full text-neutral-950/90 dark:text-neutral-50/90 drop-shadow-md">
            PRINT&nbsp;FORGE
          </h1>
        </div>

        {/* Interactive 3D Canvas intersecting the typography */}
        <div className="relative z-20 w-full max-w-5xl mx-auto">
          <MechanicalHero3D />
        </div>
      </div>

      {/* 4. Bottom HUD: Lightning bolt icon + Subtitle + Action CTA buttons */}
      <div className="w-full flex flex-col items-center justify-center text-center space-y-5 z-30 mt-4">
        {/* Lightning icon & Noomo-style bold condensed statement */}
        <div className="flex flex-col items-center space-y-2.5 max-w-3xl px-4">
          <div className="w-7 h-7 rounded-full bg-neutral-950 dark:bg-neutral-50 text-white dark:text-neutral-950 flex items-center justify-center shadow-lg animate-pulse">
            <Zap className="w-4 h-4 fill-current text-amber-400" />
          </div>
          <p className="font-condensed font-black text-lg sm:text-2xl md:text-3xl uppercase tracking-tight text-neutral-950 dark:text-neutral-50 leading-tight drop-shadow-sm">
            WELCOME TO AN INDUSTRIAL CREATIVE LAB SHOWCASING GROUNDBREAKING 3D ARCHITECTURES THAT BLEND GENERATIVE ART WITH PRECISION ENGINEERING.
          </p>
          <p className="text-xs sm:text-sm font-mono-tech text-neutral-700 dark:text-neutral-300 max-w-2xl font-medium">
            Download production-ready STL models, explore real-time layer slicing in WebGL, or stress-test mechanical tolerances directly in your browser.
          </p>
        </div>

        {/* Action CTAs with high contrast and glowing hover */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
          <Link
            href="/3d-models"
            onMouseEnter={() => sound.playHover()}
            onClick={() => sound.playClick()}
            className="px-6 py-3.5 bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 font-mono-tech text-xs uppercase tracking-wider font-extrabold rounded-lg hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center gap-2 group border border-transparent hover:border-pink-500"
          >
            <Box className="w-4 h-4 text-pink-400" />
            <span>EXPLORE 3D VAULT (52 MODELS)</span>
          </Link>

          <a
            href="#slicer"
            onMouseEnter={() => sound.playHover()}
            onClick={() => sound.playClick()}
            className="px-5 py-3.5 hud-border bg-white/90 dark:bg-[#101218]/90 hover:bg-neutral-950 hover:text-white dark:hover:bg-white dark:hover:text-neutral-950 text-neutral-900 dark:text-neutral-100 font-mono-tech text-xs uppercase tracking-wider font-bold rounded-lg backdrop-blur-md transition-all flex items-center gap-2 shadow-sm hover:scale-105"
          >
            <Sparkles className="w-4 h-4 text-[#ff1a75]" />
            <span>LAUNCH 3D SLICER SIM</span>
          </a>

          <a
            href="#analyzer"
            onMouseEnter={() => sound.playHover()}
            onClick={() => sound.playClick()}
            className="px-5 py-3.5 hud-border bg-white/90 dark:bg-[#101218]/90 hover:bg-neutral-950 hover:text-white dark:hover:bg-white dark:hover:text-neutral-950 text-neutral-900 dark:text-neutral-100 font-mono-tech text-xs uppercase tracking-wider font-bold rounded-lg backdrop-blur-md transition-all flex items-center gap-2 shadow-sm hover:scale-105"
          >
            <Terminal className="w-4 h-4 text-[#00e5ff]" />
            <span>MESH ANALYZER</span>
          </a>
        </div>

        {/* Scroll down prompt */}
        <div className="pt-3 flex items-center justify-center">
          <a
            href="#telemetry"
            className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white flex items-center gap-1.5 text-xs font-mono-tech font-bold uppercase tracking-widest transition-colors animate-bounce"
          >
            <span>SCROLL FOR LAB TELEMETRY</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  )
}
