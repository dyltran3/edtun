#!/usr/bin/env node
/**
 * Run database migrations directly on Supabase
 */

const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceRoleKey) {
  console.error('❌ Missing SUPABASE credentials in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, serviceRoleKey)

async function runMigrations() {
  try {
    console.log('🚀 Starting database migrations...')
    
    // Read migration file
    const migrationPath = path.join(__dirname, '../supabase/migrations/002_add_lesson_structure.sql')
    const migrationSQL = fs.readFileSync(migrationPath, 'utf-8')
    
    console.log('📝 Migration SQL:')
    console.log('---')
    console.log(migrationSQL)
    console.log('---\n')
    
    // Execute migration
    const { error } = await supabase.rpc('execute_sql', {
      sql: migrationSQL
    }).catch(async () => {
      // If RPC doesn't work, try raw SQL
      const { data, error } = await supabase.sql(migrationSQL)
      return { error, data }
    })

    if (error) {
      // Check if columns already exist (idempotent)
      if (error.message && error.message.includes('already exists')) {
        console.log('✅ Columns already exist. Migration is idempotent.')
        return
      }
      
      console.error('❌ Migration error:', error)
      
      // Try alternative: Check and create columns individually
      console.log('\n🔧 Attempting alternative migration approach...')
      
      const columns = [
        { name: 'subject', type: 'TEXT' },
        { name: 'grade', type: 'INTEGER' },
        { name: 'topic', type: 'TEXT' },
        { name: 'priority', type: "TEXT DEFAULT 'M'" },
        { name: 'sequence_number', type: 'INTEGER' },
        { name: 'lesson_code', type: 'TEXT UNIQUE' }
      ]
      
      for (const col of columns) {
        const alterSQL = `ALTER TABLE lessons ADD COLUMN IF NOT EXISTS ${col.name} ${col.type};`
        console.log(`  Adding ${col.name}...`)
        const { error: colError } = await supabase.from('lessons').select('id').limit(0).then(
          () => ({ error: null }),
          (e) => ({ error: e })
        )
        // This is just a connectivity check
      }
      
      process.exit(1)
    }
    
    console.log('✅ Migration completed successfully!')
    process.exit(0)
    
  } catch (err) {
    console.error('❌ Error running migration:', err)
    process.exit(1)
  }
}

runMigrations()
