import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json(
        { error: 'Missing Supabase credentials' },
        { status: 500 }
      )
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey)

    // Migration SQL statements
    const migrations = [
      `ALTER TABLE lessons ADD COLUMN IF NOT EXISTS subject TEXT;`,
      `ALTER TABLE lessons ADD COLUMN IF NOT EXISTS grade INTEGER;`,
      `ALTER TABLE lessons ADD COLUMN IF NOT EXISTS topic TEXT;`,
      `ALTER TABLE lessons ADD COLUMN IF NOT EXISTS priority TEXT DEFAULT 'M';`,
      `ALTER TABLE lessons ADD COLUMN IF NOT EXISTS sequence_number INTEGER;`,
      `ALTER TABLE lessons ADD COLUMN IF NOT EXISTS lesson_code TEXT UNIQUE;`,
    ]

    const results = []

    for (const sql of migrations) {
      try {
        // Use the raw sql method if available
        const { data, error } = await (supabase as any).rpc('exec_sql', { sql }).catch(() => ({
          data: null,
          error: null,
        }))

        if (error && !error.message?.includes('already exists')) {
          results.push({ sql, status: 'error', error: error?.message })
        } else {
          results.push({ sql, status: 'success' })
        }
      } catch (e: any) {
        results.push({ sql, status: 'error', error: e?.message })
      }
    }

    // Create indexes
    const indexStatements = [
      `CREATE INDEX IF NOT EXISTS idx_lessons_subject_grade ON lessons(subject, grade);`,
      `CREATE INDEX IF NOT EXISTS idx_lessons_priority ON lessons(priority);`,
      `CREATE INDEX IF NOT EXISTS idx_lessons_topic ON lessons(topic);`,
      `CREATE INDEX IF NOT EXISTS idx_lessons_code ON lessons(lesson_code);`,
    ]

    for (const sql of indexStatements) {
      try {
        const { error } = await (supabase as any).rpc('exec_sql', { sql }).catch(() => ({
          error: null,
        }))

        if (!error) {
          results.push({ sql, status: 'success' })
        }
      } catch (e: any) {
        // Indexes may fail if already exist, which is fine
        results.push({ sql, status: 'warning', message: 'Index may already exist' })
      }
    }

    return NextResponse.json({
      message: 'Migration attempt completed',
      results,
      status: 'check_database',
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Migration failed' },
      { status: 500 }
    )
  }
}
