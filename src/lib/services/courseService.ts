import { supabase } from '@/lib/supabase/client'
import { Database } from '@/types/database.types'

export type Course = Database['public']['Tables']['courses']['Row']

export const getCourses = async (): Promise<Course[]> => {
  try {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.warn('⚠️  Using sample courses - database not available:', error.message)
      // Return sample courses when database is not available
      return [
        {
          id: '00000000-0000-0000-0000-000000000001',
          title: 'Vật Lý: Rơi Tự Do',
          description: 'Hiểu rơi tự do qua mô phỏng và code',
          mode: 'academic',
          category: 'physics',
          level: 'beginner',
          thumbnail_url: null,
          is_published: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '00000000-0000-0000-0000-000000000002',
          title: 'Build a Todo App',
          description: 'Dự án web đơn giản với CRUD',
          mode: 'project',
          category: 'programming',
          level: 'intermediate',
          thumbnail_url: null,
          is_published: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ] as Course[]
    }

    return data || []
  } catch (err: any) {
    console.warn('⚠️  Network error in getCourses, using sample data:', err?.message)
    return [
      {
        id: '00000000-0000-0000-0000-000000000001',
        title: 'Vật Lý: Rơi Tự Do',
        description: 'Hiểu rơi tự do qua mô phỏng và code',
        mode: 'academic',
        category: 'physics',
        level: 'beginner',
        thumbnail_url: null,
        is_published: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: '00000000-0000-0000-0000-000000000002',
        title: 'Build a Todo App',
        description: 'Dự án web đơn giản với CRUD',
        mode: 'project',
        category: 'programming',
        level: 'intermediate',
        thumbnail_url: null,
        is_published: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ] as Course[]
  }
}

export const getCourseById = async (id: string): Promise<Course | null> => {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

/**
 * Get courses by category (e.g., 'math', 'physics')
 */
export const getCoursesByCategory = async (category: string): Promise<Course[]> => {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

/**
 * Get published courses only
 */
export const getPublishedCourses = async (): Promise<Course[]> => {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

/**
 * Get courses by level
 */
export const getCoursesByLevel = async (
  level: 'beginner' | 'intermediate' | 'advanced'
): Promise<Course[]> => {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('level', level)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}


