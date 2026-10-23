// ==============================================================================
// NEXT.JS TOPIC: Root Layout (app/layout.tsx)
// In the App Router, layout.tsx is the required top-level component that wraps
// all pages. It defines the common HTML skeleton (<html> and <body>).
// It runs as a SERVER COMPONENT by default (no "use client" directive).
// ==============================================================================

import type { Metadata } from "next"
// NEXT.JS TOPIC: Font Optimization (next/font/google)
// Next.js automatically downloads Google Fonts at build time, hosts them locally,
// and inlines them so there is zero layout shift (CLS) and no external Google calls.
import { Space_Grotesk, JetBrains_Mono, Syne } from "next/font/google"
// NEXT.JS TOPIC: React Suspense for Streaming
// Suspense lets Next.js render a fallback shell immediately while dynamic client
// hooks (like usePathname) stream in without blocking the page prerender.
import { Suspense } from "react"
// Global Tailwind CSS styles and custom theme variables
import "./globals.css"
// Reusable UI components
import Navbar from "@/app/components/Navbar"
import Footer from "@/app/components/Footer"
import SoundToggle from "@/app/components/SoundToggle"

// Configure the Syne display font using CSS variables
// This makes the font available anywhere in CSS via "var(--font-condensed)"
const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-condensed",
  display: "swap", // "swap" prevents invisible text while the font loads
})

// Configure Space Grotesk as the main body font
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
})

// Configure JetBrains Mono for technical HUD and monospace data readouts
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

// ==============================================================================
// NEXT.JS TOPIC: Static Metadata API
// Next.js reads this exported metadata object to generate <head> tags
// like <title>, <meta description>, and favicon links for SEO and social sharing.
// ==============================================================================
export const metadata: Metadata = {
  title: "PRINTFORGE // 3D Creative Engineering Lab",
  description: "Next-generation 3D printing engineering laboratory, open STL depository, and generative mechanical design collective.",
  icons: {
    icon: "/printforge-logo-icon.svg",
  },
}

// ==============================================================================
// NEXT.JS TOPIC: RootLayout Component
// - "children" represents the page currently being viewed (e.g. app/page.tsx).
// - Root layouts NEVER re-render when navigating between sibling routes,
//   preserving state, scroll position, and avoiding unnecessary work.
// ==============================================================================
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        // Attach all custom font CSS variables to the <body> element
        className={`${spaceGrotesk.variable} ${syne.variable} ${jetbrainsMono.variable} min-h-screen dot-grid-bg relative selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black`}
      >
        {/* Subtle decorative CRT scanlines overlay across the entire window */}
        <div className="fixed inset-0 crt-overlay pointer-events-none z-50 opacity-40" />
        
        {/*
          NEXT.JS TOPIC: Streaming & Partial Prerendering Boundary
          Navbar uses "usePathname()" which is a client-only hook.
          Wrapping it in <Suspense> allows Next.js to statically prerender
          the rest of the layout, streaming the interactive Navbar smoothly.
        */}
        <Suspense fallback={<div className="h-14 hud-border-b bg-[#f7f6f2]/90 dark:bg-[#07080a]/90" />}>
          <Navbar />
        </Suspense>

        {/* The active page content renders here */}
        <main className="relative z-10">
          {children}
        </main>

        {/* Global technical footer present across all pages */}
        <Footer />

        {/* Interactive sound synthesizer switch in bottom-left */}
        <SoundToggle />
      </body>
    </html>
  )
}
