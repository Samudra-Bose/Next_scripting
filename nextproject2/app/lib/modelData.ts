// CAD & Visual metadata dictionary for all 52 unique models

export type ModelSpecs = {
  polyCount: number
  dims: { x: number; y: number; z: number }
  weight: number // grams
  printTime: string
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Expert"
  infill: string
  accentColor: string
  iconType: string
}

const ACCENT_COLORS = [
  "#FF2A7A", // neon pink
  "#00E5FF", // cyan
  "#FFB800", // amber
  "#10B981", // emerald
  "#8B5CF6", // purple
  "#F97316", // orange
  "#06B6D4", // sky
  "#EC4899", // rose
]

export function getModelSpecs(id: number): ModelSpecs {
  // Deterministic generator seeded by model ID
  const seed = id * 1337
  const polyBase = 15000 + ((seed * 7919) % 240000)
  const x = 50 + ((seed * 31) % 180)
  const y = 40 + ((seed * 47) % 160)
  const z = 20 + ((seed * 61) % 140)
  const weight = 25 + ((seed * 19) % 350)
  const hours = 1 + ((seed * 7) % 14)
  const mins = ((seed * 13) % 55)
  const color = ACCENT_COLORS[(id - 1) % ACCENT_COLORS.length]

  const difficulties: ("Beginner" | "Intermediate" | "Advanced" | "Expert")[] = [
    "Beginner",
    "Intermediate",
    "Advanced",
    "Expert",
  ]
  const difficulty = difficulties[(id - 1) % difficulties.length]

  return {
    polyCount: polyBase,
    dims: { x, y, z },
    weight,
    printTime: `${hours}h ${mins}m`,
    difficulty,
    infill: id % 3 === 0 ? "25% Gyroid" : id % 2 === 0 ? "15% Grid" : "20% Honeycomb",
    accentColor: color,
    iconType: `type_${id}`,
  }
}
