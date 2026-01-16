import { NextResponse, NextRequest } from 'next/server'
import { getLessonById } from '@/lib/services/lessonService'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const lesson = await getLessonById(id)
    if (!lesson) {
      return NextResponse.json({ error: 'Lesson not found' }, { status: 404 })
    }
    return NextResponse.json(lesson)
  } catch (error: any) {
    console.error('Fetch lesson error:', error)
    return NextResponse.json({ error: 'Failed to fetch lesson' }, { status: 500 })
  }
}

