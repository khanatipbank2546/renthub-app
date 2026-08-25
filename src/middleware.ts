// ============================================================
// middleware.ts — อยู่ที่ root ของโปรเจกต์ (ข้างๆ package.json)
// หน้าที่: ตรวจสอบ session + ป้องกัน Protected Routes
// ============================================================
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// Routes ที่ต้อง Login ก่อนเข้า
const PROTECTED_ROUTES = ['/dashboard', '/listings/new', '/listings/edit', '/profile', '/messages']

// Routes ที่ Login แล้วไม่ควรเข้า (redirect ไป dashboard)
const AUTH_ROUTES = ['/login', '/register']

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://akezzyubyabmnvwlyssi.supabase.co'
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrZXp6eXVieWFibW52d2x5c3NpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc2Njk3MDEsImV4cCI6MjEwMzI0NTcwMX0.NHFro7fLnWIYO7gNE7023pCU_j3j-gdsJHqIRCYmOeA'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet: Array<{ name: string; value: string; options?: any }>) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
        supabaseResponse = NextResponse.next({ request })
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        )
      },
    },
  })

  // ดึง session ปัจจุบัน (สำคัญ: ต้อง await เสมอ เพื่อ refresh token)
  const { data: { user } } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  // ถ้าไม่ได้ Login แต่พยายามเข้า Protected Route → redirect ไป login
  const isProtectedRoute = PROTECTED_ROUTES.some(route => pathname.startsWith(route))
  if (!user && isProtectedRoute) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = '/login'
    loginUrl.searchParams.set('redirectTo', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // ถ้า Login แล้วแต่พยายามเข้า /login หรือ /register → redirect ไป dashboard
  const isAuthRoute = AUTH_ROUTES.some(route => pathname.startsWith(route))
  if (user && isAuthRoute) {
    const dashboardUrl = request.nextUrl.clone()
    dashboardUrl.pathname = '/dashboard'
    return NextResponse.redirect(dashboardUrl)
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
