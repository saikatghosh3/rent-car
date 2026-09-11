'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import {
  Bell,
  CalendarDays,
  CarFront,
  CheckCheck,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquareQuote,
  Search,
  Settings,
  Star,
  Tag,
  Truck,
  Timer,
  X,
  Sparkles,
} from 'lucide-react'
import { ADMIN, signOut } from '@/lib/auth'
import type { ViewKey } from '@/lib/adminTypes'
import { notifications as initialNotifications } from '@/lib/adminData'
import type { AdminNotification } from '@/lib/adminData'

const navigation: { key: ViewKey; label: string; icon: typeof LayoutDashboard }[] = [
  { key: 'dashboard', label: 'Dashboard overview', icon: LayoutDashboard },
  { key: 'fleet', label: 'Manage fleet', icon: CarFront },
  { key: 'bookings', label: 'Booking requests', icon: CalendarDays },
  { key: 'categories', label: 'Categories & pricing', icon: Tag },
  { key: 'reviews', label: 'Customer reviews', icon: MessageSquareQuote },
  { key: 'settings', label: 'Site settings', icon: Settings },
  { key: 'seo', label: 'SEO setup', icon: Search },
]

const titles: Record<ViewKey, { title: string; sub: string }> = {
  dashboard: { title: 'Dashboard overview', sub: 'Workspace / Admin' },
  fleet: { title: 'Manage fleet', sub: 'Workspace / Fleet' },
  bookings: { title: 'Booking requests', sub: 'Workspace / Bookings' },
  categories: { title: 'Categories & pricing', sub: 'Workspace / Pricing' },
  reviews: { title: 'Customer reviews', sub: 'Workspace / Reviews' },
  settings: { title: 'Site settings', sub: 'Workspace / Settings' },
  seo: { title: 'SEO setup', sub: 'Workspace / SEO' },
}

export function AdminShell({
  active,
  onNavigate,
  children,
}: {
  active: ViewKey
  onNavigate: (key: ViewKey) => void
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [notifications, setNotifications] = useState<AdminNotification[]>(initialNotifications)
  const notifRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const header = titles[active]

  const unread = notifications.filter((n) => !n.read).length

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function markRead(id: string) {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  function handleSignOut() {
    signOut()
    router.push('/admin/login')
  }

  function timeAgo(iso: string) {
    const diff = Date.now() - new Date(iso).getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 1) return 'just now'
    if (mins < 60) return `${mins}m ago`
    const hours = Math.floor(mins / 60)
    if (hours < 24) return `${hours}h ago`
    return `${Math.floor(hours / 24)}d ago`
  }

  const typeIcon = {
    booking: CalendarDays,
    review: Star,
    car: Truck,
    system: Timer,
  }
  const typeTone = {
    booking: 'bg-brand/10 text-brand',
    review: 'bg-amber-50 text-amber-500',
    car: 'bg-emerald-50 text-emerald-600',
    system: 'bg-blue-50 text-blue-600',
  }

  return (
    <div className="min-h-screen bg-surface text-text-primary">
      {sidebarOpen && (
        <button
          aria-label="Close navigation"
          className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[272px] flex-col border-r border-slate-200 bg-white shadow-xl transition-transform lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand */}
        <div className="flex h-[86px] items-center justify-between border-b border-slate-100 px-6">
          <Link href="/admin" className="flex items-center gap-3" onClick={() => onNavigate('dashboard')}>
            <Image
              src="/travel-logo.png"
              alt="Traveling Bangladesh logo"
              width={44}
              height={44}
              className="size-11 shrink-0 rounded-full object-cover shadow-md ring-1 ring-slate-200"
            />
            <span>
              <strong className="block text-[14px] tracking-tight text-navy">
                Traveling Bangladesh
              </strong>
              <span className="mt-0.5 flex items-center gap-1 text-[11px] font-semibold text-brand">
                <Sparkles size={10} /> Admin Panel
              </span>
            </span>
          </Link>
          <button
            className="text-slate-500 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={19} />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-5 pt-6">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
            Management
          </p>
          <nav className="flex flex-col gap-1">
            {navigation.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => {
                  onNavigate(key)
                  setSidebarOpen(false)
                }}
                className={`sidebar-nav-btn ${active === key ? 'active' : ''}`}
              >
                <Icon size={18} strokeWidth={1.8} />
                <span className="flex-1">{label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Profile / sign out */}
        <div className="border-t border-slate-100 p-5">
          <div className="mb-4 flex items-center gap-3 rounded-xl bg-surface p-3">
            <Image
              src="/travel-logo.png"
              alt="Admin"
              width={36}
              height={36}
              className="size-9 shrink-0 rounded-full object-cover shadow-sm ring-1 ring-slate-200"
            />
            <div className="min-w-0">
              <p className="truncate text-[13px] font-semibold text-navy">{ADMIN.name}</p>
              <p className="text-[11px] text-slate-400">{ADMIN.role}</p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium text-slate-500 transition hover:bg-rose-50 hover:text-rose-600"
          >
            <LogOut size={17} /> Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-[272px]">
        {/* Header */}
        <header className="admin-header">
          <div className="flex items-center gap-3">
            <button
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open navigation"
            >
              <Menu size={21} />
            </button>
            <div>
              <p className="hidden text-[11px] font-semibold uppercase tracking-wider text-slate-400 sm:block">
                {header.sub}
              </p>
              <h1 className="text-lg font-bold tracking-tight text-navy sm:mt-0.5">
                {header.title}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative" ref={notifRef}>
              <button
                aria-label={`Notifications (${unread} unread)`}
                onClick={() => setNotifOpen((v) => !v)}
                className={`relative flex size-10 items-center justify-center rounded-xl border transition ${
                  notifOpen
                    ? 'border-brand bg-brand/5 text-brand'
                    : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                }`}
              >
                <Bell size={18} />
                {unread > 0 && (
                  <span className="absolute -right-1.5 -top-1.5 grid size-5 place-items-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-md shadow-rose-300/50 ring-2 ring-white">
                    {unread}
                  </span>
                )}
              </button>

              {/* Notifications panel */}
              {notifOpen && (
                <div className="absolute right-0 top-12 z-50 w-[min(92vw,380px)] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/15">
                  <div className="flex items-center justify-between border-b border-slate-100 bg-surface px-5 py-4">
                    <div>
                      <p className="flex items-center gap-2 text-sm font-bold text-navy">
                        <Bell size={15} className="text-brand" /> Notifications
                      </p>
                      <p className="mt-0.5 text-[11px] text-slate-400">
                        {unread > 0 ? `${unread} unread notification${unread > 1 ? 's' : ''}` : 'You are all caught up'}
                      </p>
                    </div>
                    <button
                      onClick={markAllRead}
                      disabled={unread === 0}
                      className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-bold text-brand transition hover:bg-brand/10 disabled:opacity-40"
                    >
                      <CheckCheck size={14} /> Mark all
                    </button>
                  </div>

                  <div className="max-h-[360px] overflow-y-auto divide-y divide-slate-50">
                    {notifications.length === 0 && (
                      <div className="px-5 py-12 text-center text-xs text-slate-400">
                        No notifications yet.
                      </div>
                    )}
                    {notifications.map((n) => {
                      const Icon = typeIcon[n.type]
                      return (
                        <button
                          key={n.id}
                          onClick={() => markRead(n.id)}
                          className={`flex w-full items-start gap-3 px-5 py-4 text-left transition ${
                            n.read ? 'bg-white hover:bg-surface' : 'bg-brand/[0.04] hover:bg-brand/10'
                          }`}
                        >
                          <span className={`mt-0.5 grid size-9 shrink-0 place-items-center rounded-xl ${typeTone[n.type]}`}>
                            <Icon size={16} />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="flex items-center gap-2">
                              <span className={`truncate text-xs font-bold ${n.read ? 'text-slate-500' : 'text-navy'}`}>
                                {n.title}
                              </span>
                              {!n.read && <span className="size-1.5 shrink-0 rounded-full bg-brand" />}
                            </span>
                            <span className="mt-1 block text-[11px] leading-relaxed text-slate-400">
                              {n.description}
                            </span>
                            <span className="mt-1.5 block text-[10px] font-medium text-slate-300">
                              {timeAgo(n.time)}
                            </span>
                          </span>
                        </button>
                      )
                    })}
                  </div>

                  <button className="block w-full border-t border-slate-100 py-3 text-center text-xs font-bold text-brand hover:bg-surface">
                    View all notifications
                  </button>
                </div>
              )}
            </div>
            <div className="hidden h-7 w-px bg-slate-200 sm:block" />
            <div className="flex items-center gap-2">
              <Image
                src="/travel-logo.png"
                alt="Admin"
                width={36}
                height={36}
                className="size-9 shrink-0 rounded-full object-cover shadow-sm ring-1 ring-slate-200"
              />
              <div className="hidden leading-tight sm:block">
                <p className="text-xs font-semibold text-navy">{ADMIN.name}</p>
                <p className="text-[10px] text-slate-400">Admin</p>
              </div>
              <ChevronDown size={15} className="hidden text-slate-400 sm:block" />
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="mx-auto max-w-[1440px] p-5 sm:p-8">{children}</main>
      </div>
    </div>
  )
}