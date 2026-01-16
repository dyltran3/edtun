import { cookies } from 'next/headers'
import { Database } from '@/types/database.types'
import { createClient } from '@supabase/supabase-js'

export const createServerClient = async () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  
  return createClient<Database>(supabaseUrl, supabaseKey)
}

