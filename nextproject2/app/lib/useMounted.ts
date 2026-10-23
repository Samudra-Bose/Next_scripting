// ==============================================================================
// NEXT.JS & REACT TOPIC: Hydration-Safe Mounting Hook (useMounted.ts)
//
// PROBLEM IN SSR (Server-Side Rendering):
// In Next.js, code renders first on the server (node.js) then hydrates in the browser.
// If your component reads browser-only APIs (like localStorage or window) immediately,
// the server HTML and client HTML will differ, causing a "Hydration Mismatch Error".
//
// SOLUTION:
// "useSyncExternalStore" is the official React 18/19 recommended pattern to check if
// we are on the client vs server. It returns false during SSR, and true immediately
// upon browser mounting, with ZERO cascading re-render warnings!
// ==============================================================================

import { useSyncExternalStore } from "react"

// Dummy empty subscribe function since mounting state never changes after load
const emptySubscribe = () => () => {}

export function useIsMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,  // Client snapshot: return true when mounted in browser
    () => false  // Server snapshot: return false during SSR pre-rendering
  )
}
