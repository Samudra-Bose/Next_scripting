// ==============================================================================
// NEXT.JS APP ROUTER CONCEPT: SAFE CLIENT-SIDE WEB AUDIO SYNTHESIZER
// ==============================================================================
// File location: app/lib/sound.ts
// In Next.js, code inside shared libraries can be imported by both Server and
// Client Components. Because Node.js (the server runtime) does not have a `window`
// or `AudioContext` global, any browser-specific API must be safely guarded with
// `typeof window === "undefined"`.
//
// BROWSER AUTOPLAY COMPLIANCE:
// Modern browsers (Chrome, Firefox, Safari) strictly forbid audio generation
// before the user interacts with the page (click, keypress). This singleton
// provides lazy instantiation upon the first user interaction.

class SoundEngine {
  private ctx: AudioContext | null = null
  private isMuted: boolean = true
  private ambientOsc: OscillatorNode | null = null
  private ambientGain: GainNode | null = null

  // ==============================================================================
  // NEXT.JS SSR GUARD: SAFE CONTEXT ACQUISITION
  // ==============================================================================
  // Returns null during Server-Side Rendering (SSR) without throwing errors.
  private getContext(): AudioContext | null {
    if (typeof window === "undefined") return null
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
      }
    }
    // Resume context if suspended by browser autoplay policy
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume()
    }
    return this.ctx
  }

  // Public initialization triggered on user gesture (e.g., sound toggle click)
  public init(): void {
    this.getContext()
  }

  // Set mute state and smoothly ramp ambient volume up or down
  public setMuted(muted: boolean): void {
    this.isMuted = muted
    if (muted && this.ambientGain && this.ctx) {
      this.ambientGain.gain.setValueAtTime(0, this.ctx.currentTime)
    } else if (!muted && this.ambientGain && this.ctx) {
      this.ambientGain.gain.setValueAtTime(0.015, this.ctx.currentTime)
    }
  }

  public getMuted(): boolean {
    return this.isMuted
  }

  // ==============================================================================
  // SYNTHESIZED SOUND EFFECTS (ZERO EXTERNAL MP3/WAV NETWORK DOWNLOADS)
  // ==============================================================================
  // Crisp mechanical tactile click synthesized via rapid frequency exponential ramp.
  public playClick(): void {
    if (this.isMuted) return
    const ctx = this.getContext()
    if (!ctx) return

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = "sine"
    osc.frequency.setValueAtTime(800, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(160, ctx.currentTime + 0.04)

    gain.gain.setValueAtTime(0.08, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start()
    osc.stop(ctx.currentTime + 0.04)
  }

  // Subtle futuristic hover blip
  public playHover(): void {
    if (this.isMuted) return
    const ctx = this.getContext()
    if (!ctx) return

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = "sine"
    osc.frequency.setValueAtTime(1200, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.03)

    gain.gain.setValueAtTime(0.02, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start()
    osc.stop(ctx.currentTime + 0.03)
  }

  // Mechanical actuator servo sound for 3D model explode view
  public playServo(): void {
    if (this.isMuted) return
    const ctx = this.getContext()
    if (!ctx) return

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    const filter = ctx.createBiquadFilter()

    osc.type = "sawtooth"
    osc.frequency.setValueAtTime(120, ctx.currentTime)
    osc.frequency.linearRampToValueAtTime(480, ctx.currentTime + 0.12)
    osc.frequency.linearRampToValueAtTime(240, ctx.currentTime + 0.25)

    filter.type = "lowpass"
    filter.frequency.setValueAtTime(600, ctx.currentTime)

    gain.gain.setValueAtTime(0.04, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25)

    osc.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)

    osc.start()
    osc.stop(ctx.currentTime + 0.25)
  }

  // Slicer laser / hotend extrusion chirp
  public playLaser(): void {
    if (this.isMuted) return
    const ctx = this.getContext()
    if (!ctx) return

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = "triangle"
    osc.frequency.setValueAtTime(440, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08)

    gain.gain.setValueAtTime(0.03, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start()
    osc.stop(ctx.currentTime + 0.08)
  }

  // Deep ambient 55Hz drone / hum of an industrial CoreXY machine
  public startAmbientHum(): void {
    if (typeof window === "undefined") return
    const ctx = this.getContext()
    if (!ctx || this.ambientOsc) return

    try {
      this.ambientOsc = ctx.createOscillator()
      this.ambientGain = ctx.createGain()
      const filter = ctx.createBiquadFilter()

      this.ambientOsc.type = "sine"
      this.ambientOsc.frequency.setValueAtTime(55, ctx.currentTime) // low A (55 Hz)

      filter.type = "lowpass"
      filter.frequency.setValueAtTime(120, ctx.currentTime)

      this.ambientGain.gain.setValueAtTime(this.isMuted ? 0 : 0.015, ctx.currentTime)

      this.ambientOsc.connect(filter)
      filter.connect(this.ambientGain)
      this.ambientGain.connect(ctx.destination)

      this.ambientOsc.start()
    } catch {
      // Graceful fallback if autoplay requires user gesture
    }
  }
}

// Export singleton instance accessible throughout the application
export const sound = new SoundEngine()
