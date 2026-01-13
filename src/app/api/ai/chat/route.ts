import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '')

export async function POST(request: Request) {
  try {
    const { message, context } = await request.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Invalid message' }, { status: 400 })
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
    const prompt = context
      ? `Context: ${context}\n\nUser: ${message}\n\nAssistant:`
      : message

    const result = await model.generateContent(prompt)
    const text = result.response.text()

    return NextResponse.json({ reply: text })
  } catch (error: any) {
    console.error('AI chat error:', error)
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    )
  }
}

