import { NextRequest, NextResponse } from 'next/server'
import {
  getLessonsBySubjectAndGrade,
  getLessonsByTopic,
  getHighPriorityLessons,
  getAllSubjects,
  getGradesBySubject,
  getTopicsBySubjectAndGrade,
} from '@/lib/services/lessonService'

/**
 * GET /api/lessons/filter
 * Query parameters:
 *   - subject: Subject code (e.g., 'MTH', 'PHY')
 *   - grade: Grade level (10, 11, 12)
 *   - topic: Topic code (e.g., 'ALG', 'GEO')
 *   - priority: Priority level ('H', 'M', 'L' or empty for all)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const subject = searchParams.get('subject')
    const gradeStr = searchParams.get('grade')
    const topic = searchParams.get('topic')
    const priority = searchParams.get('priority')

    // Get metadata (subjects, grades, topics)
    if (searchParams.get('metadata') === 'true') {
      const subjects = await getAllSubjects()
      const gradesBySubject: Record<string, number[]> = {}
      const topicsBySubjectGrade: Record<string, string[]> = {}

      for (const subj of subjects) {
        const grades = await getGradesBySubject(subj)
        gradesBySubject[subj] = grades

        for (const grade of grades) {
          const key = `${subj}:${grade}`
          topicsBySubjectGrade[key] = await getTopicsBySubjectAndGrade(subj, grade)
        }
      }

      return NextResponse.json({
        subjects,
        gradesBySubject,
        topicsBySubjectGrade,
      })
    }

    // Validate required parameters
    if (!subject || !gradeStr) {
      return NextResponse.json(
        { error: 'Missing required parameters: subject and grade' },
        { status: 400 }
      )
    }

    const grade = parseInt(gradeStr, 10)
    if (isNaN(grade)) {
      return NextResponse.json({ error: 'Invalid grade parameter' }, { status: 400 })
    }

    let lessons

    // Determine which filtering method to use based on parameters
    if (topic) {
      lessons = await getLessonsByTopic(subject, grade, topic)
    } else if (priority === 'H') {
      lessons = await getHighPriorityLessons(subject, grade)
    } else {
      lessons = await getLessonsBySubjectAndGrade(subject, grade)
    }

    return NextResponse.json({
      count: lessons.length,
      lessons,
      filters: {
        subject,
        grade,
        topic: topic || null,
        priority: priority || null,
      },
    })
  } catch (error) {
    console.error('Error filtering lessons:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
