import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'wanderplan-sessions'
const MAX_SESSIONS = 10

/**
 * Hook to persist and retrieve saved trip sessions from localStorage
 */
export default function useLocalStorage() {
  const [sessions, setSessions] = useState([])

  // Load sessions from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) {
          setSessions(parsed)
        }
      }
    } catch {
      // Corrupted storage — start fresh
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [])

  const saveSession = useCallback((itinerary) => {
    if (!itinerary) return

    const session = {
      id: `session-${Date.now()}`,
      savedAt: new Date().toISOString(),
      tripTitle: itinerary.tripTitle,
      itinerary,
    }

    setSessions((prev) => {
      const updated = [session, ...prev].slice(0, MAX_SESSIONS)
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      } catch {
        // Storage full — remove oldest
        const trimmed = updated.slice(0, 5)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed))
      }
      return updated
    })
  }, [])

  const deleteSession = useCallback((sessionId) => {
    setSessions((prev) => {
      const updated = prev.filter((s) => s.id !== sessionId)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
  }, [])

  const clearSessions = useCallback(() => {
    setSessions([])
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  return { sessions, saveSession, deleteSession, clearSessions }
}
