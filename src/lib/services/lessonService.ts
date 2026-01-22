import { supabase } from '@/lib/supabase/client'
import { Database } from '@/types/database.types'

export type Lesson = Database['public']['Tables']['lessons']['Row']

export const getLessonsByCourse = async (courseId: string): Promise<Lesson[]> => {
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('course_id', courseId)
    .order('order_index', { ascending: true })

  if (error) throw error
  return data || []
}

export const getLessonById = async (id: string): Promise<Lesson | null> => {
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

/**
 * Get lessons filtered by subject and grade
 * Results are sorted by priority (H, M, L) and then by sequence_number
 * Returns empty array if curriculum columns don't exist yet (migration not applied)
 */
export const getLessonsBySubjectAndGrade = async (
  subject: string,
  grade: number
): Promise<Lesson[]> => {
  try {
    const { data, error } = await supabase
      .from('lessons')
      .select('*')
      .eq('subject', subject)
      .eq('grade', grade)
      .order('priority', { ascending: false })
      .order('sequence_number', { ascending: true })

    if (error) {
      if (error.message.includes('does not exist')) {
        console.warn('⚠️  Curriculum columns not yet created in database. Please apply migrations.')
        return []
      }
      throw error
    }
    return data || []
  } catch (err: any) {
    console.error('Error in getLessonsBySubjectAndGrade:', err?.message)
    return []
  }
}

/**
 * Get lessons by subject, grade, and topic
 */
export const getLessonsByTopic = async (
  subject: string,
  grade: number,
  topic: string
): Promise<Lesson[]> => {
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('subject', subject)
    .eq('grade', grade)
    .eq('topic', topic)
    .order('sequence_number', { ascending: true })

  if (error) throw error
  return data || []
}

/**
 * Get high-priority lessons for a given subject and grade
 * (Priority = 'H' = High = Cốt lõi)
 */
export const getHighPriorityLessons = async (
  subject: string,
  grade: number
): Promise<Lesson[]> => {
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('subject', subject)
    .eq('grade', grade)
    .eq('priority', 'H')
    .order('sequence_number', { ascending: true })

  if (error) throw error
  return data || []
}

/**
 * Get lesson by lesson_code (e.g., 'MTH-10-ALG-H-01')
 */
export const getLessonByCode = async (lessonCode: string): Promise<Lesson | null> => {
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('lesson_code', lessonCode)
    .single()

  if (error && error.code !== 'PGRST116') throw error // PGRST116 = no rows
  return data || null
}

/**
 * Get all unique subjects available
 * Returns default subjects if migration not yet applied
 */
export const getAllSubjects = async (): Promise<string[]> => {
  try {
    const { data, error } = await supabase
      .from('lessons')
      .select('subject')
      .not('subject', 'is', null)

    if (error) {
      console.warn('⚠️  Using default subjects - curriculum columns not available:', error.message)
      return ['MTH', 'PHY']
    }
    
    const subjects = Array.from(new Set(data?.map((row: any) => row.subject).filter(Boolean) || []))
    return subjects.length > 0 ? subjects.sort() : ['MTH', 'PHY']
  } catch (err: any) {
    console.warn('⚠️  Network error in getAllSubjects, using defaults:', err?.message)
    return ['MTH', 'PHY']
  }
}

/**
 * Get all unique grades for a subject
 * Returns default grades if migration not yet applied
 */
export const getGradesBySubject = async (subject: string): Promise<number[]> => {
  try {
    const { data, error } = await supabase
      .from('lessons')
      .select('grade')
      .eq('subject', subject)
      .not('grade', 'is', null)

    if (error) {
      if (error.message.includes('does not exist')) {
        return [10, 11, 12]
      }
      throw error
    }
    
    const grades = Array.from(new Set(data?.map((row: any) => row.grade).filter(Boolean) || []))
    return grades.sort((a, b) => (a || 0) - (b || 0))
  } catch (err: any) {
    console.error('Error in getGradesBySubject:', err?.message)
    return [10, 11, 12]
  }
}

/**
 * Get all unique topics for a subject and grade
 * Returns empty array if migration not yet applied
 */
export const getTopicsBySubjectAndGrade = async (
  subject: string,
  grade: number
): Promise<string[]> => {
  try {
    const { data, error } = await supabase
      .from('lessons')
      .select('topic')
      .eq('subject', subject)
      .eq('grade', grade)
      .not('topic', 'is', null)

    if (error) {
      if (error.message.includes('does not exist')) {
        return []
      }
      throw error
    }
    
    const topics = Array.from(new Set(data?.map((row: any) => row.topic).filter(Boolean) || []))
    return topics.sort()
  } catch (err: any) {
    console.error('Error in getTopicsBySubjectAndGrade:', err?.message)
    return []
  }
}


