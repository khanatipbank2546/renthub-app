// ============================================================
// lib/supabase/client.ts
// Browser-side Supabase Client (ใช้ใน Client Components)
// ============================================================
import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/types/database'

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://akezzyubyabmnvwlyssi.supabase.co'
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrZXp6eXVieWFibW52d2x5c3NpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc2Njk3MDEsImV4cCI6MjEwMzI0NTcwMX0.NHFro7fLnWIYO7gNE7023pCU_j3j-gdsJHqIRCYmOeA'

export function createClient() {
  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey)
}
