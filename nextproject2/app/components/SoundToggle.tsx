// ==============================================================================
// NEXT.JS APP ROUTER CONCEPT: CLIENT COMPONENT DIRECTIVE ("use client")
// ==============================================================================
// In Next.js, components are Server Components by default.
// The `"use client"` directive marks this file as a Client Component boundary.
// It is required whenever you use:
// 1. React State & Lifecycle hooks (useState, useEffect, useSyncExternalStore)
// 2. Browser-only APIs (Web Audio API, window, document, localStorage)
// 3. Interactive event listeners (onClick, onMouseEnter, onKeyDown)
"use client"

import { useState } from "react"
import { sound } from "@/app/lib/sound"
import { Volume2, VolumeX, Sparkles } from "lucide-react"
import { useIsMounted } from "@/app/lib/useMounted"

// ==============================================================================
// NEXT.JS HYDRATION & WEB AUDIO ARCHITECTURE
// ==============================================================================
// Modern web browsers enforce an Autoplay Policy: AudioContext cannot emit sounds
// until initiated by an explicit user gesture (such as clicking this button).
// Furthermore, because SSR has no audio hardware, this UI must safely synchronize
// between server pre-render and client DOM hydration.
export default function SoundToggle() {
  // Local state managing audio playback status
  const [enabled, setEnabled] = useState<boolean>(false)

  // ==============================================================================
  // NEXT.JS HYDRATION SAFETY HOOK
  // ==============================================================================
  // The custom `useIsMounted()` hook uses `useSyncExternalStore` to verify that
  // hydration has finished. Rendering `null` prior to hydration prevents mismatch
  // between server HTML and client state.
  const mounted = useIsMounted()

  // Handler for user click gesture that unlocks browser Web Audio
  const toggleSound = () => {
    const next = !enabled
    setEnabled(next)

    // Initialize the Web Audio AudioContext singleton on user interaction
    sound.init()
    sound.setMuted(!next)

    // Play tactile mechanical feedback sound if sound is being activated
    if (next) {
      sound.playClick()
      sound.startAmbientHum()
    }
  }

  // Prevent hydration mismatch by returning null during server-side pre-render
  if (!mounted) return null

  return (
    // Fixed viewport HUD placement for ambient audio controls
    <div className="fixed bottom-6 left-6 z-40 flex items-center gap-3">
      <button
        onClick={toggleSound}
        onMouseEnter={() => enabled && sound.playHover()}
        className="group flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-black/80 hover:bg-black text-white dark:bg-white/90 dark:text-black dark:hover:bg-white text-xs font-mono-tech tracking-wider uppercase backdrop-blur-md transition-all shadow-lg hover:scale-105 active:scale-95 border border-white/20 dark:border-black/20"
        title="Toggle Tactile Haptics & Ambient Audio"
      >
        {/* Status indicator LED */}
        <span
          className={`w-2 h-2 rounded-full transition-colors ${
            enabled ? "bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" : "bg-neutral-500"
          }`}
        />

        {/* Audio state label */}
        <span className="font-bold">
          AUDIO {enabled ? "— ON" : "— OFF"}
        </span>

        {/* Dynamic Lucide Icon */}
        {enabled ? (
          <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
        ) : (
          <VolumeX className="w-3.5 h-3.5 text-neutral-400" />
        )}
      </button>

      {/* Floating status badge when audio is active */}
      {enabled && (
        <span className="hidden md:inline-flex items-center gap-1.5 text-[10px] font-mono-tech tracking-widest text-neutral-500 dark:text-neutral-400 bg-white/60 dark:bg-black/60 px-2 py-1 rounded backdrop-blur-sm border border-neutral-300 dark:border-neutral-800">
          <Sparkles className="w-3 h-3 text-pink-500" />
          HAPTICS ACTIVE
        </span>
      )}
    </div>
  )
}
