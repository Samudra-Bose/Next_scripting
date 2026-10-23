"use client"

import { useState } from "react"
import { sound } from "@/app/lib/sound"
import { Volume2, VolumeX, Sparkles } from "lucide-react"
import { useIsMounted } from "@/app/lib/useMounted"

export default function SoundToggle() {
  const [enabled, setEnabled] = useState(false)
  const mounted = useIsMounted()

  const toggleSound = () => {
    const next = !enabled
    setEnabled(next)
    sound.init()
    sound.setMuted(!next)
    if (next) {
      sound.playClick()
      sound.startAmbientHum()
    }
  }

  if (!mounted) return null

  return (
    <div className="fixed bottom-6 left-6 z-40 flex items-center gap-3">
      <button
        onClick={toggleSound}
        onMouseEnter={() => enabled && sound.playHover()}
        className="group flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-black/80 hover:bg-black text-white dark:bg-white/90 dark:text-black dark:hover:bg-white text-xs font-mono-tech tracking-wider uppercase backdrop-blur-md transition-all shadow-lg hover:scale-105 active:scale-95 border border-white/20 dark:border-black/20"
        title="Toggle Tactile Haptics & Ambient Audio"
      >
        <span
          className={`w-2 h-2 rounded-full transition-colors ${
            enabled ? "bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" : "bg-neutral-500"
          }`}
        />
        <span className="font-bold">
          AUDIO {enabled ? "— ON" : "— OFF"}
        </span>
        {enabled ? (
          <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
        ) : (
          <VolumeX className="w-3.5 h-3.5 text-neutral-400" />
        )}
      </button>

      {enabled && (
        <span className="hidden md:inline-flex items-center gap-1.5 text-[10px] font-mono-tech tracking-widest text-neutral-500 dark:text-neutral-400 bg-white/60 dark:bg-black/60 px-2 py-1 rounded backdrop-blur-sm border border-neutral-300 dark:border-neutral-800">
          <Sparkles className="w-3 h-3 text-pink-500" />
          HAPTICS ACTIVE
        </span>
      )}
    </div>
  )
}
