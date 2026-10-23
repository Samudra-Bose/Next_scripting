"use client"

import Link from "next/link"
import { sound } from "@/app/lib/sound"
import { ArrowUpRight, ShieldCheck } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full hud-border-t bg-[#f0efe9] dark:bg-[#060709] text-neutral-900 dark:text-neutral-100 mt-24 relative overflow-hidden transition-colors">
      {/* Top Crosshair Bar */}
      <div className="w-full px-4 md:px-8 py-2.5 hud-border-b flex items-center justify-between text-[11px] font-mono-tech text-neutral-600 dark:text-neutral-400 font-bold uppercase">
        <div className="flex items-center gap-4">
          <span className="text-neutral-950 dark:text-neutral-50">+ + + PRINTFORGE TERMINAL + + +</span>
          <span className="hidden sm:inline text-emerald-600 dark:text-emerald-400 font-bold">SYS_STATUS: 100% NOMINAL</span>
        </div>
        <div className="flex items-center gap-4">
          <span>COORDS: 37.7749° N, 122.4194° W</span>
          <span className="hidden md:inline">ENCRYPTION: SHA-256</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Col 1 */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-black dark:bg-white inline-block" />
            <h3 className="font-extrabold text-xl tracking-tight font-condensed">
              PRINTFORGE / LABS
            </h3>
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 font-mono-tech leading-relaxed">
            Pioneering open-access 3D engineering, generative mechanical design, and high-fidelity G-Code distribution. Built for makers, designers, and industrial prototypers.
          </p>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-black/5 dark:bg-white/10 text-[10px] font-mono-tech text-neutral-600 dark:text-neutral-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            ALL STLS TESTED FOR TOLERANCE & FIT
          </div>
        </div>

        {/* Col 2 */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono-tech font-bold uppercase tracking-wider text-neutral-500">
            {"// LAB DIRECTORY"}
          </h4>
          <ul className="space-y-2 text-xs font-mono-tech">
            {[
              { label: "3D Model Vault", href: "/3d-models" },
              { label: "Layer Slicer Simulator", href: "/#slicer" },
              { label: "Mesh & STL Analyzer", href: "/#analyzer" },
              { label: "Tech Comparison Matrix", href: "/#specs" },
              { label: "Engineering Notes", href: "/posts" },
              { label: "About & Manifesto", href: "/about" },
            ].map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onMouseEnter={() => sound.playHover()}
                  onClick={() => sound.playClick()}
                  className="hover:underline flex items-center justify-between text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white group"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono-tech font-bold uppercase tracking-wider text-neutral-500">
            {"// TELEMETRY HUD"}
          </h4>
          <div className="p-3 rounded bg-black/5 dark:bg-white/5 space-y-2 text-[11px] font-mono-tech border border-neutral-300 dark:border-neutral-800">
            <div className="flex justify-between">
              <span className="text-neutral-500">HOTEND TEMP:</span>
              <span className="text-pink-600 dark:text-pink-400 font-bold">215.4°C</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">HEATBED TEMP:</span>
              <span className="text-amber-600 dark:text-amber-400 font-bold">60.0°C</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">FLOW RATE:</span>
              <span>100% (22 mm³/s)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">NOZZLE DIA:</span>
              <span>0.4 mm Hardened Steel</span>
            </div>
          </div>
        </div>

        {/* Col 4 */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono-tech font-bold uppercase tracking-wider text-neutral-500">
            {"// LAB DISPATCH"}
          </h4>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 font-mono-tech">
            Receive weekly verified STL files, slicing profiles, and generative design experiments.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              sound.playClick()
              alert("Transmission received! You are subscribed to PrintForge Lab Dispatches.")
            }}
            className="flex flex-col gap-2"
          >
            <input
              type="email"
              placeholder="operator@printforge.io"
              required
              className="px-3 py-2 text-xs font-mono-tech bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white"
            />
            <button
              type="submit"
              onMouseEnter={() => sound.playHover()}
              className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black font-mono-tech text-xs uppercase tracking-wider font-semibold rounded hover:opacity-90 active:scale-95 transition-all text-center"
            >
              SUBSCRIBE TO DISPATCH
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 hud-border-t flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono-tech text-neutral-500">
        <div>© 2026 PRINTFORGE LABS INC. OPEN HARDWARE STANDARD.</div>
        <div className="flex items-center gap-4 mt-2 sm:mt-0">
          <span>NOOMO AESTHETIC TRIBUTE</span>
          <span>•</span>
          <span>PRECISION PROTOCOL</span>
        </div>
      </div>
    </footer>
  )
}
