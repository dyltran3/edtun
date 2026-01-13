import { NextResponse } from 'next/server'
import { getCourses } from '@/lib/services/courseService'

export async function GET() {
  try {
    const courses = await getCourses()
    return NextResponse.json(courses)
  } catch (error: any) {
    console.error('Fetch courses error:', error)
    return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 })
  }
}

