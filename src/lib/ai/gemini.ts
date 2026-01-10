import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '')

export const getGeminiModel = () => {
  return genAI.getGenerativeModel({ model: 'gemini-pro' })
}

export const chatWithGemini = async (
  message: string,
  context?: string
): Promise<string> => {
  try {
    const model = getGeminiModel()
    
    const prompt = context 
      ? `Context: ${context}\n\nUser: ${message}\n\nAssistant:`
      : message

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    
    return text
  } catch (error) {
    console.error('Error chatting with Gemini:', error)
    throw new Error('Failed to get AI response')
  }
}

export const explainCode = async (
  code: string,
  language: string
): Promise<string> => {
  const prompt = `Explain the following ${language} code in simple terms:\n\n${code}`
  return chatWithGemini(prompt)
}

export const debugCode = async (
  code: string,
  error: string,
  language: string
): Promise<string> => {
  const prompt = `I have a ${language} code that's producing this error: "${error}"\n\nCode:\n${code}\n\nPlease help me debug this and suggest a fix.`
  return chatWithGemini(prompt)
}

export const suggestImprovement = async (
  code: string,
  language: string
): Promise<string> => {
  const prompt = `Review this ${language} code and suggest improvements:\n\n${code}`
  return chatWithGemini(prompt)
}