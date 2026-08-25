'use client'

// ============================================================
// components/auth/LoginForm.tsx
// ฟอร์ม Login — รองรับ Google OAuth + Email OTP (เบอร์มือถือ)
// ============================================================
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Mail, Phone, Loader2, ArrowRight, Home } from 'lucide-react'

type LoginMode = 'google' | 'email' | 'phone'

export default function LoginForm() {
  const supabase = createClient()

  const [mode, setMode] = useState<LoginMode | null>(null)
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState<'input' | 'otp'>('input')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // ─── Google OAuth ──────────────────────────────────────────
  const handleGoogleLogin = async () => {
    setLoading(true)
    setMessage(null)

    const redirectTo = new URLSearchParams(window.location.search).get('redirectTo')

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback${
          redirectTo ? `?redirectTo=${redirectTo}` : ''
        }`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    })

    if (error) {
      setMessage({ type: 'error', text: 'ไม่สามารถเชื่อมต่อ Google ได้ กรุณาลองใหม่' })
      setLoading(false)
    }
    // ถ้าสำเร็จ browser จะ redirect ไป Google อัตโนมัติ
  }

  // ─── Email OTP ────────────────────────────────────────────
  const handleEmailOtp = async () => {
    if (!email || !email.includes('@')) {
      setMessage({ type: 'error', text: 'กรุณาใส่อีเมลที่ถูกต้อง' })
      return
    }
    setLoading(true)
    setMessage(null)

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setMessage({ type: 'error', text: 'ส่งรหัสไม่สำเร็จ กรุณาลองใหม่' })
    } else {
      setStep('otp')
      setMessage({ type: 'success', text: `ส่งรหัส OTP ไปที่ ${email} แล้วครับ` })
    }
    setLoading(false)
  }

  // ─── Phone OTP ───────────────────────────────────────────
  const handlePhoneOtp = async () => {
    // format เบอร์ไทย: 0812345678 → +66812345678
    const formatted = phone.startsWith('0')
      ? '+66' + phone.slice(1)
      : phone

    if (formatted.length < 12) {
      setMessage({ type: 'error', text: 'กรุณาใส่เบอร์มือถือ 10 หลัก' })
      return
    }
    setLoading(true)
    setMessage(null)

    const { error } = await supabase.auth.signInWithOtp({ phone: formatted })

    if (error) {
      setMessage({ type: 'error', text: 'ส่ง SMS ไม่สำเร็จ กรุณาลองใหม่' })
    } else {
      setStep('otp')
      setMessage({ type: 'success', text: `ส่ง SMS OTP ไปที่ ${phone} แล้วครับ` })
    }
    setLoading(false)
  }

  // ─── Verify OTP ──────────────────────────────────────────
  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      setMessage({ type: 'error', text: 'กรุณาใส่รหัส 6 หลัก' })
      return
    }
    setLoading(true)
    setMessage(null)

    const verifyPayload =
      mode === 'email'
        ? { type: 'email' as const, email, token: otp }
        : { type: 'sms' as const, phone: phone.startsWith('0') ? '+66' + phone.slice(1) : phone, token: otp }

    const { error } = await supabase.auth.verifyOtp(verifyPayload)

    if (error) {
      setMessage({ type: 'error', text: 'รหัสไม่ถูกต้องหรือหมดอายุแล้ว กรุณาลองใหม่' })
    } else {
      window.location.href = '/dashboard'
    }
    setLoading(false)
  }

  // ─── UI ──────────────────────────────────────────────────
  return (
    <div className="w-full max-w-sm mx-auto space-y-4">

      {/* Alert Message */}
      {message && (
        <div
          className={`px-4 py-3 rounded-xl text-sm font-medium ${
            message.type === 'success'
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}
        >
          {message.type === 'success' ? '✅ ' : '⚠️ '}{message.text}
        </div>
      )}

      {/* ─── OTP Verification Step ─── */}
      {step === 'otp' ? (
        <div className="space-y-4">
          <p className="text-sm text-slate-500 text-center">
            ใส่รหัส 6 หลัก ที่ได้รับจาก{mode === 'email' ? 'อีเมล' : 'SMS'}
          </p>
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={otp}
            onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
            placeholder="_ _ _ _ _ _"
            className="w-full text-center text-2xl tracking-[0.5em] font-mono border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
          />
          <button
            onClick={handleVerifyOtp}
            disabled={loading || otp.length !== 6}
            className="w-full bg-sky-500 hover:bg-sky-600 disabled:bg-slate-200 disabled:text-slate-400 text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            ยืนยัน OTP
          </button>
          <button
            onClick={() => { setStep('input'); setOtp(''); setMessage(null) }}
            className="w-full text-sm text-slate-500 hover:text-sky-500"
          >
            ← ย้อนกลับ
          </button>
        </div>
      ) : (
        <>
          {/* ─── Google Button ─── */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 border border-slate-300 hover:border-slate-400 bg-white text-slate-700 font-medium py-3 rounded-xl transition hover:shadow-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            เข้าสู่ระบบด้วย Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs text-slate-400">หรือ</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          {/* ─── Email OTP ─── */}
          {mode !== 'phone' && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 border border-slate-300 rounded-xl px-4 py-3 focus-within:border-sky-400 focus-within:ring-2 focus-within:ring-sky-100 bg-white">
                <Mail className="w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setMode('email') }}
                  placeholder="อีเมลของคุณ"
                  className="flex-1 outline-none text-sm text-slate-700 bg-transparent placeholder:text-slate-400"
                />
              </div>
              {mode === 'email' && (
                <button
                  onClick={handleEmailOtp}
                  disabled={loading || !email}
                  className="w-full bg-sky-500 hover:bg-sky-600 disabled:bg-slate-200 disabled:text-slate-400 text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                  ส่งรหัส OTP ทางอีเมล
                </button>
              )}
            </div>
          )}

          {/* ─── Phone OTP ─── */}
          {mode !== 'email' && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 border border-slate-300 rounded-xl px-4 py-3 focus-within:border-sky-400 focus-within:ring-2 focus-within:ring-sky-100 bg-white">
                <Phone className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-500">+66</span>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => { setPhone(e.target.value.replace(/\D/g, '')); setMode('phone') }}
                  placeholder="812345678 (ไม่ต้องใส่ 0 นำหน้า)"
                  maxLength={9}
                  className="flex-1 outline-none text-sm text-slate-700 bg-transparent placeholder:text-slate-400"
                />
              </div>
              {mode === 'phone' && (
                <button
                  onClick={handlePhoneOtp}
                  disabled={loading || phone.length < 9}
                  className="w-full bg-sky-500 hover:bg-sky-600 disabled:bg-slate-200 disabled:text-slate-400 text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                  ส่งรหัส OTP ทาง SMS
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}
