import { create } from 'zustand'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase/client'

interface Profile {
  id: string
  username: string | null
  full_name: string | null
  avatar_url: string | null
  role: 'student' | 'teacher' | 'admin'
  points: number
  level: number
  streak_days: number
}

interface AuthState {
  user: User | null
  profile: Profile | null
  loading: boolean
  setUser: (user: User | null) => void
  setProfile: (profile: Profile | null) => void
  fetchProfile: () => Promise<void>
  signOut: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  profile: null,
  loading: true,

  setUser: (user) => set({ user }),
  
  setProfile: (profile) => set({ profile }),

  fetchProfile: async () => {
    const { user } = get()
    if (!user) {
      set({ profile: null, loading: false })
      return
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error) throw error
      set({ profile: data, loading: false })
    } catch (error) {
      console.error('Error fetching profile:', error)
      set({ profile: null, loading: false })
    }
  },

  signOut: async () => {
    await supabase.auth.signOut()
    set({ user: null, profile: null })
  },
}))