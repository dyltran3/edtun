export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string | null
          full_name: string | null
          avatar_url: string | null
          role: 'student' | 'teacher' | 'admin'
          points: number
          level: number
          streak_days: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          role?: 'student' | 'teacher' | 'admin'
          points?: number
          level?: number
          streak_days?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          role?: 'student' | 'teacher' | 'admin'
          points?: number
          level?: number
          streak_days?: number
          created_at?: string
          updated_at?: string
        }
      }
      courses: {
        Row: {
          id: string
          title: string
          description: string | null
          mode: 'academic' | 'project'
          category: string
          level: 'beginner' | 'intermediate' | 'advanced'
          thumbnail_url: string | null
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          mode: 'academic' | 'project'
          category: string
          level?: 'beginner' | 'intermediate' | 'advanced'
          thumbnail_url?: string | null
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          mode?: 'academic' | 'project'
          category?: string
          level?: 'beginner' | 'intermediate' | 'advanced'
          thumbnail_url?: string | null
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      lessons: {
        Row: {
          id: string
          course_id: string
          title: string
          description: string | null
          order_index: number
          theory_content: Json | null
          simulation_config: Json | null
          starter_code: string | null
          solution_code: string | null
          points: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          course_id: string
          title: string
          description?: string | null
          order_index: number
          theory_content?: Json | null
          simulation_config?: Json | null
          starter_code?: string | null
          solution_code?: string | null
          points?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          course_id?: string
          title?: string
          description?: string | null
          order_index?: number
          theory_content?: Json | null
          simulation_config?: Json | null
          starter_code?: string | null
          solution_code?: string | null
          points?: number
          created_at?: string
          updated_at?: string
        }
      }
      milestones: {
        Row: {
          id: string
          course_id: string
          title: string
          description: string | null
          order_index: number
          requirements: Json | null
          starter_template: string | null
          points: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          course_id: string
          title: string
          description?: string | null
          order_index: number
          requirements?: Json | null
          starter_template?: string | null
          points?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          course_id?: string
          title?: string
          description?: string | null
          order_index?: number
          requirements?: Json | null
          starter_template?: string | null
          points?: number
          created_at?: string
          updated_at?: string
        }
      }
      submissions: {
        Row: {
          id: string
          user_id: string
          lesson_id: string | null
          milestone_id: string | null
          code: string
          status: 'pending' | 'completed' | 'failed'
          feedback: string | null
          points_earned: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          lesson_id?: string | null
          milestone_id?: string | null
          code: string
          status?: 'pending' | 'completed' | 'failed'
          feedback?: string | null
          points_earned?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          lesson_id?: string | null
          milestone_id?: string | null
          code?: string
          status?: 'pending' | 'completed' | 'failed'
          feedback?: string | null
          points_earned?: number
          created_at?: string
          updated_at?: string
        }
      }
      user_progress: {
        Row: {
          id: string
          user_id: string
          course_id: string
          lesson_id: string | null
          milestone_id: string | null
          completed: boolean
          completed_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          course_id: string
          lesson_id?: string | null
          milestone_id?: string | null
          completed?: boolean
          completed_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          course_id?: string
          lesson_id?: string | null
          milestone_id?: string | null
          completed?: boolean
          completed_at?: string | null
          created_at?: string
        }
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
  }
}