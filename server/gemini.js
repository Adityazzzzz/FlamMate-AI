import { GoogleGenerativeAI } from '@google/generative-ai'

let genAI = null

export function initGemini(apiKey) {
  genAI = new GoogleGenerativeAI(apiKey)
}

export async function generateItinerary(systemInstruction, userMessage) {
  if (!genAI) {
    throw new Error('Gemini not initialized. Check your GEMINI_API_KEY.')
  }

  // Initialize the model per-request to inject the dynamic systemInstruction
  const model = genAI.getGenerativeModel({ 
    model: 'gemini-2.5-flash',
    systemInstruction: systemInstruction,
    generationConfig: {
      temperature: 0.7,
      topP: 0.9,
      maxOutputTokens: 4096,
      responseMimeType: 'application/json',
    },
  })

  const chat = model.startChat({
    history: [],
  })

  const result = await chat.sendMessage(userMessage)
  return result.response.text()
}