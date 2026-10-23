// Web Audio API Synthesizer for tactile sci-fi sound design
// Pure client-side, zero external assets, instant zero-latency feedback

class SoundEngine {
  private ctx: AudioContext | null = null
  private isMuted: boolean = true
  private ambientOsc: OscillatorNode | null = null
  private ambientGain: GainNode | null = null

  private getContext(): AudioContext | null {
    if (typeof window === "undefined") return null
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume()
    }
    return this.ctx
  }

  public init(): void {
    this.getContext()
  }

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

  // Crisp tactile click
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

  // Subtle hover blip
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

  // Mechanical servo whir (for 3D explode / toggle)
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

  // Slicer laser / extrusion chirp
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

  // Ambient lab hum
  public startAmbientHum(): void {
    if (typeof window === "undefined") return
    const ctx = this.getContext()
    if (!ctx || this.ambientOsc) return

    try {
      this.ambientOsc = ctx.createOscillator()
      this.ambientGain = ctx.createGain()
      const filter = ctx.createBiquadFilter()

      this.ambientOsc.type = "sine"
      this.ambientOsc.frequency.setValueAtTime(55, ctx.currentTime) // low A

      filter.type = "lowpass"
      filter.frequency.setValueAtTime(120, ctx.currentTime)

      this.ambientGain.gain.setValueAtTime(this.isMuted ? 0 : 0.015, ctx.currentTime)

      this.ambientOsc.connect(filter)
      filter.connect(this.ambientGain)
      this.ambientGain.connect(ctx.destination)

      this.ambientOsc.start()
    } catch {
      // Audio autoplay may wait for user gesture
    }
  }
}

export const sound = new SoundEngine()
