// ==============================================================================
// NEXT.JS TOPIC: Server Data Access Layer (app/library/models.ts)
// In a full-stack Next.js application, database queries and API calls should be
// organized into dedicated library functions rather than written inline inside components.
//
// In this learning project, we simulate database queries using our local models.json,
// wrapping the data access in asynchronous functions (as if connecting to PostgreSQL / Prisma).
// ==============================================================================

import modelsData from "../data/models.json"
import type { Model } from "../types"

// ==============================================================================
// NEXT.JS TOPIC: Async Data Query
// In a production app, this is where you'd write:
//   return await prisma.model.findMany()
// By returning a Promise, this function can be directly "awaited" inside
// any Next.js Server Component without useEffect or SWR.
// ==============================================================================
export async function getAllModels(): Promise<Model[]> {
  // Returns all 52 registered 3D models from the data source
  return modelsData as Model[]
}

// ==============================================================================
// NEXT.JS TOPIC: Parameterized Query by ID
// Used by dynamic routes like app/3d-models/[id]/page.tsx to fetch a single item.
// ==============================================================================
export async function getModelById(id: number | string): Promise<Model | null> {
  // Parse numeric ID safely from string URL parameter
  const numId = typeof id === "string" ? parseInt(id, 10) : id

  // Find model matching ID or return null if not found
  const found = (modelsData as Model[]).find((m) => m.id === numId)
  return found || null
}
