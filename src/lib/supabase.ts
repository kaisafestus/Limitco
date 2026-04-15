import { createClient } from '@supabase/supabase-js'

const getEnv = (value: string | undefined, name: string) => {
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`)
  }
  return value
}

// Supabase client for server or build-time usage
export const supabase = createClient(
  getEnv(process.env.SUPABASE_URL, 'SUPABASE_URL'),
  getEnv(process.env.SUPABASE_ANON_KEY, 'SUPABASE_ANON_KEY'),
)

// Server-side client for authenticated operations using service role key
export const createServerSupabaseClient = () => {
  return createClient(
    getEnv(process.env.SUPABASE_URL, 'SUPABASE_URL'),
    getEnv(process.env.SUPABASE_SERVICE_ROLE_KEY, 'SUPABASE_SERVICE_ROLE_KEY'),
  )
}
