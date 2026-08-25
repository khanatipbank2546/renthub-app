// ============================================================
// app/(auth)/login/page.tsx — หน้า Login
// Server Component: ถ้า Login แล้ว redirect ไป dashboard
// ============================================================
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import LoginForm from '@/components/auth/LoginForm'
import { Home } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'เข้าสู่ระบบ | RentHub',
  description: 'เข้าสู่ระบบ RentHub เพื่อจัดการประกาศห้องพักและค้นหาที่พักของคุณ',
}

export default async function LoginPage() {
  // ตรวจสอบ session บน server → ถ้า login แล้ว redirect ทันที
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) redirect('/dashboard')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-sky-900 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-white mb-4">
            <div className="w-10 h-10 rounded-xl bg-sky-500 flex items-center justify-center">
              <Home className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold">Rent<span className="text-sky-400">Hub</span></span>
          </Link>
          <h1 className="text-2xl font-bold text-white mt-4">ยินดีต้อนรับกลับมา</h1>
          <p className="text-slate-400 text-sm mt-1">เข้าสู่ระบบเพื่อจัดการห้องพักของคุณ</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <LoginForm />

          <p className="text-center text-xs text-slate-400 mt-6 leading-relaxed">
            การเข้าสู่ระบบถือว่าคุณยอมรับ{' '}
            <Link href="/terms" className="text-sky-500 hover:underline">ข้อกำหนดการใช้งาน</Link>
            {' '}และ{' '}
            <Link href="/privacy" className="text-sky-500 hover:underline">นโยบายความเป็นส่วนตัว (PDPA)</Link>
          </p>
        </div>

        <p className="text-center text-slate-500 text-sm mt-4">
          ยังไม่มีบัญชี?{' '}
          <Link href="/register" className="text-sky-400 hover:text-sky-300 font-medium">
            สมัครเลย ฟรี!
          </Link>
        </p>
      </div>
    </div>
  )
}
