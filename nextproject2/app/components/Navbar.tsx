// ==============================================================================
// NEXT.JS TOPIC: Client Components ("use client")
// By default, components in Next.js App Router are React Server Components (RSC).
// The "use client" directive at the very top signals to Next.js that this component:
// 1. Can use React state hooks (useState, useEffect, useMemo).
// 2. Can attach browser event handlers (onClick, onMouseEnter).
// 3. Can access browser-only APIs (localStorage, window, audio).
// 4. Can use Next.js client-side navigation hooks (usePathname).
// ==============================================================================
"use client"

import { useState } from "react"
// NEXT.JS TOPIC: next/link Component
// Replaces standard HTML <a> tags. Enables client-side navigation without
// full page refreshes, automatically prefetching links in the viewport!
import Link from "next/link"
// NEXT.JS TOPIC: next/navigation Hooks
// "usePathname" returns the current route's pathname string (e.g. "/3d-models").
// Note: In Next.js, usePathname is imported from "next/navigation", NOT "next/router".
import { usePathname } from "next/navigation"
import { sound } from "@/app/lib/sound"
import { Sun, Moon } from "lucide-react"
import { useIsMounted } from "@/app/lib/useMounted"

export default function Navbar() {
  // NEXT.JS TOPIC: Reading current route path
  // usePathname lets us compare the active URL and highlight the active link
  const pathname = usePathname()

  // NEXT.JS TOPIC: Hydration Mismatch Prevention
  // "useIsMounted" ensures code that checks "localStorage" or "window"
  // only runs on the client after hydration, preventing React mismatch warnings.
  const mounted = useIsMounted()

  // Theme state: checks localStorage or browser's dark mode preference
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("pf-theme")
      return saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)
    }
    return false
  })

  // Toggle theme between industrial light and night ops mode
  const toggleTheme = () => {
    sound.playClick()
    const next = !isDark
    setIsDark(next)
    if (next) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("pf-theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("pf-theme", "light")
    }
  }

  // Navigation route configuration
  const navLinks = [
    { href: "/#hero", label: "01 // CORE" },
    { href: "/3d-models", label: "02 // 3D VAULT" },
    { href: "/#slicer", label: "03 // SLICER SIM" },
    { href: "/#analyzer", label: "04 // ANALYZER" },
    { href: "/#specs", label: "05 // TECH SPECS" },
    { href: "/about", label: "06 // ABOUT" },
  ]

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#f7f6f2]/90 dark:bg-[#07080a]/90 hud-border-b transition-colors duration-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
        {/* Brand Logo with Link to homepage */}
        <Link
          href="/"
          className="flex items-center gap-2 group cursor-pointer"
          onMouseEnter={() => sound.playHover()}
          onClick={() => sound.playClick()}
        >
          {/* Logo Monogram */}
          <div className="w-8 h-8 rounded bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-base tracking-tighter group-hover:scale-105 transition-transform shadow-sm">
            PF
          </div>
          {/* Brand Name & Tagline */}
          <div className="flex flex-col">
            <span className="font-extrabold text-sm md:text-base tracking-tighter font-condensed uppercase flex items-center gap-1.5 text-neutral-950 dark:text-neutral-50">
              PrintForge
              <span className="text-[10px] font-mono-tech px-1.5 py-0.5 rounded bg-[#ff1a75]/15 text-[#ff1a75] font-bold lowercase italic">
                labs
              </span>
            </span>
            <span className="text-[9px] font-mono-tech tracking-widest text-neutral-600 dark:text-neutral-400 uppercase -mt-1 hidden sm:block font-bold">
              Precision 3D Depository
            </span>
          </div>
        </Link>

        {/* Center Tech Telemetry badge (Desktop only) */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white/80 dark:bg-black/60 text-[11px] font-mono-tech text-neutral-800 dark:text-neutral-200 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shadow-[0_0_8px_#10b981]" />
          <span className="text-neutral-950 dark:text-neutral-50 font-bold">ENGINE ONLINE</span>
          <span className="text-neutral-400">|</span>
          <span className="font-medium">G-CODE CORE v4.8</span>
          <span className="text-neutral-400">|</span>
          <span className="text-[#ff1a75] dark:text-[#ff2a80] font-bold">PRECISION 0.05MM</span>
        </div>

        {/* Navigation links & Theme Switcher */}
        <div className="flex items-center gap-2 md:gap-4">
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              // Active route calculation using Next.js pathname
              const active = pathname === link.href || (link.href.startsWith("/3d-models") && pathname.startsWith("/3d-models"))
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onMouseEnter={() => sound.playHover()}
                  onClick={() => sound.playClick()}
                  className={`px-3 py-1.5 text-xs font-mono-tech uppercase tracking-wider rounded-lg transition-all ${
                    active
                      ? "bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 font-bold shadow-sm"
                      : "text-neutral-800 dark:text-neutral-200 hover:text-[#ff1a75] hover:bg-black/5 dark:hover:bg-white/10 font-semibold"
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Theme Switcher Button (Only displayed after client mount) */}
          {mounted && (
            <button
              onClick={toggleTheme}
              onMouseEnter={() => sound.playHover()}
              className="px-2.5 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 hover:border-neutral-950 dark:hover:border-neutral-200 transition-all text-xs font-mono-tech flex items-center gap-1.5 text-neutral-900 dark:text-neutral-100 font-bold shadow-xs"
              title="Toggle Night Ops Mode"
            >
              {isDark ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">[LIGHT]</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-neutral-700" />
                  <span className="hidden sm:inline">[NIGHT OPS]</span>
                </>
              )}
            </button>
          )}

          {/* Mobile Quick Link to 3D Vault */}
          <Link
            href="/3d-models"
            className="md:hidden px-2.5 py-1 text-xs font-mono-tech uppercase tracking-wider bg-black text-white dark:bg-white dark:text-black rounded font-bold"
          >
            Vault
          </Link>
        </div>
      </div>
    </header>
  )
}
