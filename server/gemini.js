import { GoogleGenerativeAI } from '@google/generative-ai'

let genAI = null
let model = null

export function initGemini(apiKey) {
  genAI = new GoogleGenerativeAI(apiKey)
  model = genAI.getGenerativeModel({ 
    model: 'gemini-2.0-flash',
    generationConfig: {
      temperature: 0.7,
      topP: 0.9,
      maxOutputTokens: 4096,
      responseMimeType: 'application/json',
    },
  })
}

export async function generateItinerary(systemInstruction, userMessage) {
  if (!model) {
    throw new Error('Gemini not initialized. Check your GEMINI_API_KEY.')
  }

  const chat = model.startChat({
    systemInstruction,
    history: [],
  })

  const result = await chat.sendMessage(userMessage)
  const response = result.response
  const text = response.text()
  
  return text
}
