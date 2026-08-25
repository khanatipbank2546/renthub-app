// ============================================================
// app/auth/callback/route.ts
// รับ OAuth Code จาก Google แล้วแปลงเป็น Session
// ============================================================
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'        // หน้าที่จะ redirect หลัง login
  const redirectTo = searchParams.get('redirectTo')   // หน้าที่ผู้ใช้ต้องการจะไปตอนแรก

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      const forwardedHost = request.headers.get('x-forwarded-host')
      const isLocalEnv = process.env.NODE_ENV === 'development'

      // หลัง login สำเร็จ → ไปหน้าที่ผู้ใช้ต้องการ หรือ dashboard
      const destination = redirectTo || next || '/dashboard'

      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${destination}`)
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${destination}`)
      } else {
        return NextResponse.redirect(`${origin}${destination}`)
      }
    }
  }

  // ถ้า error → ไปหน้า login พร้อมแสดง error
  return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`)
}
