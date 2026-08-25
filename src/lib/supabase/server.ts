// ============================================================
// lib/supabase/server.ts
// Server-side Supabase Client (ใช้ใน Server Components & Route Handlers)
// ⚠️ ต้อง import จากไฟล์นี้เสมอในฝั่ง Server ห้ามใช้ createBrowserClient
// ============================================================
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { Database } from '@/types/database'

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://akezzyubyabmnvwlyssi.supabase.co'
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrZXp6eXVieWFibW52d2x5c3NpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc2Njk3MDEsImV4cCI6MjEwMzI0NTcwMX0.NHFro7fLnWIYO7gNE7023pCU_j3j-gdsJHqIRCYmOeA'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient<Database>(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet: Array<{ name: string; value: string; options?: any }>) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        } catch {
          // Server Components ไม่สามารถ set cookies ได้
          // Middleware จะจัดการ refresh session ให้
        }
      },
    },
  })
}
