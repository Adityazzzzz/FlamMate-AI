import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { initGemini, generateItinerary } from './gemini.js'
import { buildPrompt, buildRefinementPrompt } from './prompts.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json({ limit: '1mb' }))

// Initialize Gemini
const apiKey = process.env.GEMINI_API_KEY
if (!apiKey) {
  console.error('❌ GEMINI_API_KEY is missing. Create a .env file with your key.')
  console.error('   Get a free key at: https://aistudio.google.com/apikey')
  process.exit(1)
}
initGemini(apiKey)
console.log('✅ Gemini API initialized')

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Generate itinerary
app.post('/api/generate', async (req, res) => {
  const { message, existingItinerary } = req.body

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({ 
      error: 'Message is required',
      code: 'INVALID_INPUT' 
    })
  }

  if (message.trim().length > 2000) {
    return res.status(400).json({ 
      error: 'Message too long (max 2000 characters)',
      code: 'INPUT_TOO_LONG' 
    })
  }

  try {
    const { systemInstruction, userMessage } = existingItinerary
      ? buildRefinementPrompt(message, existingItinerary)
      : buildPrompt(message)

    const rawText = await generateItinerary(systemInstruction, userMessage)
    
    // Try to parse the response as JSON
    let parsed
    try {
      parsed = JSON.parse(rawText)
    } catch {
      // Try to extract JSON from markdown code fences or extra text
      const jsonMatch = rawText.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        try {
          parsed = JSON.parse(jsonMatch[0])
        } catch {
          return res.status(502).json({
            error: 'AI returned invalid data. Please try again.',
            code: 'PARSE_ERROR',
            raw: rawText.slice(0, 500),
          })
        }
      } else {
        return res.status(502).json({
          error: 'AI returned invalid data. Please try again.',
          code: 'PARSE_ERROR',
          raw: rawText.slice(0, 500),
        })
      }
    }

    res.json({ itinerary: parsed })
  } catch (err) {
    console.error('Gemini API error:', err.message)
    
    // Categorize the error
    if (err.message?.includes('quota') || err.message?.includes('429')) {
      return res.status(429).json({
        error: 'Rate limit reached. Please wait a moment and try again.',
        code: 'RATE_LIMIT',
      })
    }
    
    if (err.message?.includes('API key') || err.message?.includes('401')) {
      return res.status(401).json({
        error: 'Invalid API key. Please check your configuration.',
        code: 'AUTH_ERROR',
      })
    }

    res.status(500).json({
      error: 'Something went wrong. Please try again.',
      code: 'SERVER_ERROR',
    })
  }
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})
