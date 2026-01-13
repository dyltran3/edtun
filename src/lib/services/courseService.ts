import { supabase } from '@/lib/supabase/client'
import { Database } from '@/types/database.types'

export type Course = Database['public']['Tables']['courses']['Row']

export const getCourses = async (): Promise<Course[]> => {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
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

