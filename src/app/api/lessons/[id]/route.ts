import { NextResponse } from 'next/server'
import { getLessonById } from '@/lib/services/lessonService'

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const lesson = await getLessonById(params.id)
    if (!lesson) {
      return NextResponse.json({ error: 'Lesson not found' }, { status: 404 })
    }
    return NextResponse.json(lesson)
  } catch (error: any) {
    console.error('Fetch lesson error:', error)
    return NextResponse.json({ error: 'Failed to fetch lesson' }, { status: 500 })
  }
}

