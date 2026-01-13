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

