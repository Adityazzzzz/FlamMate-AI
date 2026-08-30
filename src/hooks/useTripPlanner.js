import { useState, useRef, useCallback } from 'react'
import { generateTrip } from '../utils/api'
import { validateItinerary } from '../utils/validateItinerary'

// State machine: idle -> loading -> success | error
const STATES = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
}

export default function useTripPlanner() {
  const [status, setStatus] = useState(STATES.IDLE)
  const [itinerary, setItinerary] = useState(null)
  const [error, setError] = useState(null)
  const [lastQuery, setLastQuery] = useState('')
  const [tripHistory, setTripHistory] = useState([]) // conversation history for refinements
  
  // Request ID to prevent stale responses from overwriting newer ones
  const requestIdRef = useRef(0)
  const abortControllerRef = useRef(null)

  const generate = useCallback(async (message) => {
    // Cancel any in-flight request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    const currentRequestId = ++requestIdRef.current
    const controller = new AbortController()
    abortControllerRef.current = controller

    setStatus(STATES.LOADING)
    setError(null)
    setLastQuery(message)

    try {
      const data = await generateTrip(message, null, controller.signal)

      // Stale response check
      if (currentRequestId !== requestIdRef.current) return

      const result = validateItinerary(data.itinerary || data)

      if (!result.valid) {
        setError({ message: result.error, code: 'VALIDATION_ERROR' })
        setStatus(STATES.ERROR)
        return
      }

      setItinerary(result.itinerary)
      setTripHistory([{ role: 'user', content: message }])
      setStatus(STATES.SUCCESS)
    } catch (err) {
      // Stale response check
      if (currentRequestId !== requestIdRef.current) return
      
      // Don't show error if request was intentionally aborted
      if (err.name === 'AbortError') return

      setError({ message: err.message, code: err.code || 'UNKNOWN_ERROR' })
      setStatus(STATES.ERROR)
    } finally {
      if (currentRequestId === requestIdRef.current) {
        abortControllerRef.current = null
      }
    }
  }, [])

  const refine = useCallback(async (message) => {
    if (!itinerary) return generate(message)

    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    const currentRequestId = ++requestIdRef.current
    const controller = new AbortController()
    abortControllerRef.current = controller

    setStatus(STATES.LOADING)
    setError(null)

    try {
      const data = await generateTrip(message, itinerary, controller.signal)

      if (currentRequestId !== requestIdRef.current) return

      const result = validateItinerary(data.itinerary || data)

      if (!result.valid) {
        setError({ message: result.error, code: 'VALIDATION_ERROR' })
        setStatus(STATES.ERROR)
        return
      }

      setItinerary(result.itinerary)
      setTripHistory(prev => [...prev, { role: 'user', content: message }])
      setStatus(STATES.SUCCESS)
    } catch (err) {
      if (currentRequestId !== requestIdRef.current) return
      if (err.name === 'AbortError') return

      setError({ message: err.message, code: err.code || 'UNKNOWN_ERROR' })
      setStatus(STATES.ERROR)
    } finally {
      if (currentRequestId === requestIdRef.current) {
        abortControllerRef.current = null
      }
    }
  }, [itinerary, generate])

  const cancel = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      abortControllerRef.current = null
    }
    setStatus(itinerary ? STATES.SUCCESS : STATES.IDLE)
  }, [itinerary])

  const reset = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      abortControllerRef.current = null
    }
    requestIdRef.current++
    setStatus(STATES.IDLE)
    setItinerary(null)
    setError(null)
    setTripHistory([])
  }, [])

  // Itinerary modification functions (local state changes, no AI call)
  const removeStop = useCallback((dayIndex, stopId) => {
    setItinerary(prev => {
      if (!prev) return prev
      const newDays = prev.days.map((day, di) => {
        if (di !== dayIndex) return day
        return { ...day, stops: day.stops.filter(s => s.id !== stopId) }
      }).filter(day => day.stops.length > 0) // Remove empty days

      if (newDays.length === 0) return prev // Don't allow removing everything
      return { ...prev, days: newDays }
    })
  }, [])

  const reorderStop = useCallback((dayIndex, stopIndex, direction) => {
    setItinerary(prev => {
      if (!prev) return prev
      const newDays = [...prev.days]
      const day = { ...newDays[dayIndex] }
      const stops = [...day.stops]
      
      const targetIndex = stopIndex + direction
      if (targetIndex < 0 || targetIndex >= stops.length) return prev

      // Swap
      ;[stops[stopIndex], stops[targetIndex]] = [stops[targetIndex], stops[stopIndex]]
      day.stops = stops
      newDays[dayIndex] = day
      
      return { ...prev, days: newDays }
    })
  }, [])

  const loadItinerary = useCallback((saved) => {
    setItinerary(saved)
    setStatus(STATES.SUCCESS)
    setError(null)
    setTripHistory([])
  }, [])

  return {
    status,
    itinerary,
    error,
    lastQuery,
    tripHistory,
    isLoading: status === STATES.LOADING,
    isIdle: status === STATES.IDLE,
    isSuccess: status === STATES.SUCCESS,
    isError: status === STATES.ERROR,
    generate,
    refine,
    cancel,
    reset,
    removeStop,
    reorderStop,
    loadItinerary,
    retry: () => lastQuery && generate(lastQuery),
  }
}
