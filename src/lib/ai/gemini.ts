export const chatWithGemini = async (
  message: string,
  context?: string
): Promise<string> => {
  try {
    const res = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, context }),
    })

    if (!res.ok) {
      throw new Error('AI request failed')
    }

    const data = await res.json()
    return data.reply as string
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