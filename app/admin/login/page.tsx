'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  LogIn,
  ShieldCheck,
  ArrowLeft,
} from 'lucide-react'
import { signIn } from '@/lib/auth'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    setTimeout(() => {
      if (signIn(email, password)) {
        router.push('/admin')
      } else {
        setError('Invalid email or password. Please try again.')
        setLoading(false)
      }
    }, 450)
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f7f9fc] px-5 py-10">
      {/* decorative blobs */}
      <div className="hero-blob left-[-120px] top-[-100px] size-[420px] bg-brand/30" />
      <div className="hero-blob bottom-[-140px] right-[-100px] size-[460px] bg-sky-400/30" />

      <div className="relative w-full max-w-md">
        {/* card */}
        <div className="card overflow-hidden">
          <div className="relative overflow-hidden bg-gradient-to-r from-navy via-navy-light to-navy-muted px-8 py-8 text-center">
            <div className="absolute -right-8 -top-12 size-40 rounded-full bg-brand/20 blur-2xl" />
            <span className="relative mx-auto block">
              <Image
                src="/travel-logo.png"
                alt="Traveling Bangladesh logo"
                width={72}
                height={72}
                priority
                className="size-16 rounded-full object-cover shadow-xl shadow-orange-950/40 ring-2 ring-white/25 sm:size-[72px]"
              />
            </span>
            <h1 className="relative mt-4 text-xl font-bold text-white">
              Traveling Bangladesh
            </h1>
            <p className="relative mt-1 text-sm text-brand-light">
              Rent A Car · Admin Panel
            </p>
          </div>

          <div className="p-7 sm:p-8">
            <p className="flex items-center gap-2 text-sm font-semibold text-navy">
              <LockKeyhole size={16} className="text-brand" /> Admin sign in
            </p>
            <p className="mt-1 text-xs text-slate-400">Welcome back. Sign in to manage your fleet and bookings.</p>

            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
              <label className="block">
                <span className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700">
                  <Mail size={13} className="text-brand" /> Email
                </span>
                <input
                  type="email"
                  required
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@gmail.com"
                  className="input focus:ring-2 focus:ring-brand/30"
                />
              </label>

              <label className="block">
                <span className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700">
                  <LockKeyhole size={13} className="text-brand" /> Password
                </span>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="input pr-11 focus:ring-2 focus:ring-brand/30"
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-navy"
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </label>

              {error && (
                <div className="rounded-xl border border-rose-100 bg-rose-50 px-4 py-3 text-xs font-medium text-rose-600">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-brand justify-center disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in <LogIn size={16} />
                  </>
                )}
              </button>
            </form>

            <p className="mt-5 flex items-center justify-center gap-1.5 text-xs text-slate-400">
              <ShieldCheck size={13} className="text-emerald-500" />
              Secure area — authorized personnel only
            </p>

            <div className="mt-5 rounded-xl bg-slate-50 px-4 py-3 text-center text-xs text-slate-500">
              Demo credentials — email: <b className="text-navy">admin@gmail.com</b>, password:{' '}
              <b className="text-navy">admin1234</b>
            </div>
          </div>
        </div>

        <Link
          href="/"
          className="mt-5 flex items-center justify-center gap-2 text-sm text-slate-500 transition hover:text-brand"
        >
          <ArrowLeft size={15} /> Back to website
        </Link>
      </div>
    </main>
  )
}