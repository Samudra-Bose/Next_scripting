// ==============================================================================
// NEXT.JS TOPIC: Module Re-export Pattern (app/lib/models.ts)
// Next.js developers often use standard "@/" path aliases configured in tsconfig.json.
// This file re-exports functions from app/library/models to provide clean imports:
//   import { getAllModels, getModelById } from "@/app/lib/models"
// ==============================================================================

export * from "@/app/library/models"
