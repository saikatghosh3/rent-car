'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  Bell,
  CalendarDays,
  CarFront,
  CheckCircle2,
  Clock3,
  Download,
  MoreHorizontal,
  Plus,
  Search,
  SlidersHorizontal,
  TrendingUp,
  Wallet,
  Route,
} from 'lucide-react'
import { ADMIN } from '@/lib/auth'
import { cars, bookings, fleetStats } from '@/lib/adminData'
import { fetchBookings, updateBookingStatus } from '@/lib/bookingsApi'
import { statusStyles } from '@/lib/adminTypes'
import type { Booking } from '@/lib/mockData'

function getMetrics(pending: number) {
  return [
    { label: 'Total cars', value: '24', change: '+12%', note: 'vs. last month', icon: CarFront },
    { label: 'Available now', value: '18', change: '75%', note: 'of total fleet', icon: CheckCircle2, tone: 'green' },
    { label: 'Currently rented', value: '06', change: '25%', note: 'of total fleet', icon: Clock3, tone: 'amber' },
    { label: 'Pending requests', value: String(pending).padStart(2, '0'), change: '+4', note: 'need attention', icon: Bell, tone: 'rose' },
  ]
}

const revenue = [
  { label: 'Week 1', value: 46 },
  { label: 'Week 2', value: 62 },
  { label: 'Week 3', value: 51 },
  { label: 'Week 4', value: 78 },
  { label: 'Week 5', value: 66 },
  { label: 'Week 6', value: 84 },
]

const toneMap: Record<string, string> = {
  '': 'bg-slate-100 text-slate-600',
  green: 'bg-emerald-50 text-emerald-600',
  amber: 'bg-amber-50 text-amber-600',
  rose: 'bg-rose-50 text-rose-600',
}

export function DashboardView({ onNavigate }: { onNavigate: (key: 'bookings' | 'fleet') => void }) {
  const stats = fleetStats()
  const [query, setQuery] = useState('')
  const [rows, setRows] = useState<Booking[]>(bookings)
  const [syncError, setSyncError] = useState('')

  useEffect(() => {
    fetchBookings()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setRows(data)
      })
      .catch(() => {
        /* keep seeded rows */
      })
  }, [])

  const pendingCount = useMemo(() => rows.filter((b) => b.status === 'Pending').length, [rows])
  const metrics = getMetrics(pendingCount)

  const filteredCars = useMemo(
    () => cars.filter((car) => car.name.toLowerCase().includes(query.toLowerCase())),
    [query]
  )

  async function updateBooking(id: string, status: string) {
    setRows((all) => all.map((b) => (b.id === id ? { ...b, status } : b)))
    try {
      await updateBookingStatus(id, status)
    } catch {
      setSyncError('Could not sync the status change. Reload to see the latest data.')
    }
  }

  return (
    <>
      {/* Greeting */}
      <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-semibold text-emerald-600">All systems operational</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-[30px]">
            Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'},{' '}
            {ADMIN.name}.
          </h2>
          <p className="mt-1.5 text-sm text-slate-500">
            Here&apos;s what&apos;s happening with your fleet today.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="btn-outline">
            <Download size={15} /> Export report
          </button>
          <button className="btn-brand" onClick={() => onNavigate('fleet')}>
            <Plus size={16} /> Add new car
          </button>
        </div>
      </div>

      {/* Metrics */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map(({ label, value, change, note, icon: Icon, tone = '' }) => (
          <div key={label} className="metric">
            <div className="flex items-start justify-between">
              <div className={`metric-icon ${toneMap[tone]}`}>
                <Icon size={19} />
              </div>
              <span className="text-[11px] font-semibold text-emerald-600">{change}</span>
            </div>
            <p className="mt-5 text-[28px] font-bold tracking-tight text-navy">{value}</p>
            <p className="mt-1 text-xs text-slate-500">
              {label} <span className="text-slate-300">&bull;</span> {note}
            </p>
          </div>
        ))}
      </section>

      {/* Revenue + stats */}
      <section className="mt-6 grid gap-6 xl:grid-cols-[1.55fr_1fr]">
        <div className="card p-5">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-bold text-navy">Revenue overview</h3>
              <p className="mt-1 text-xs text-slate-500">Estimated monthly earnings in BDT.</p>
            </div>
            <span className="flex items-center gap-1 rounded-lg bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-600">
              <TrendingUp size={13} /> +{stats.growth}%
            </span>
          </div>
          <div className="mt-6 flex items-end gap-3">
            <p className="text-3xl font-bold tracking-tight text-navy">
              ৳{stats.revenue.toLocaleString()}
            </p>
            <p className="pb-1 text-xs text-slate-400">this month</p>
          </div>
          <div className="mt-6 flex h-32 items-end gap-3">
            {revenue.map((r) => (
              <div key={r.label} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-lg bg-gradient-to-t from-navy-muted to-brand transition-all hover:from-brand-hover hover:to-brand"
                  style={{ height: `${r.value}%` }}
                />
                <span className="text-[10px] text-slate-400">{r.label}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3 border-t border-slate-100 pt-4">
            {[
              { label: 'Total trips', value: stats.trips, icon: Route },
              { label: 'Revenue', value: '৳124k', icon: Wallet },
              { label: 'Utilization', value: `${stats.utilization}%`, icon: Clock3 },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label}>
                <p className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <Icon size={12} className="text-brand" /> {label}
                </p>
                <p className="mt-1 text-lg font-bold text-navy">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Fleet availability */}
        <section className="card p-5">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-bold text-navy">Fleet availability</h3>
              <p className="mt-1 text-xs text-slate-500">Current vehicle distribution by category.</p>
            </div>
            <button className="rounded-lg border border-slate-200 p-2 text-slate-400 hover:bg-slate-50" aria-label="Fleet filters">
              <SlidersHorizontal size={16} />
            </button>
          </div>
          <div className="mt-7 flex items-center gap-7">
            <div
              className="relative grid size-32 shrink-0 place-items-center rounded-full"
              style={{
                background: 'conic-gradient(#102d4a 0deg 180deg, #ee8b2f 180deg 255deg, #36a889 255deg 315deg, #dce5ed 315deg 360deg)',
              }}
            >
              <div className="grid size-[92px] place-items-center rounded-full bg-white">
                <div className="text-center">
                  <p className="text-2xl font-bold text-navy">24</p>
                  <p className="text-[10px] text-slate-400">Total cars</p>
                </div>
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-3.5">
              {[
                ['Sedan', '12', '#102d4a'],
                ['SUV', '05', '#ee8b2f'],
                ['Microbus', '04', '#36a889'],
                ['Bus & coach', '03', '#dce5ed'],
              ].map(([label, value, color]) => (
                <div key={label} className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2 text-slate-500">
                    <span className="size-2 rounded-full" style={{ backgroundColor: color }} />
                    {label}
                  </span>
                  <span className="font-bold text-navy">{value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-7 border-t border-slate-100 pt-4">
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Fleet utilization</span>
              <span className="font-bold text-emerald-600">{stats.utilization}%</span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-slate-100">
              <div className="h-2 w-[64%] rounded-full bg-emerald-500" />
            </div>
            <p className="mt-2 text-[10px] text-slate-400">Great performance this month</p>
          </div>
        </section>
      </section>

      {/* Bookings table */}
      {syncError && (
        <div className="mt-6 rounded-xl bg-rose-50 px-4 py-3 text-xs font-medium text-rose-600">
          {syncError}
        </div>
      )}
      <section className="card mt-6 overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-bold text-navy">Recent booking requests</h3>
            <p className="mt-1 text-xs text-slate-500">Review and manage your latest customer requests.</p>
          </div>
          <button
            className="self-start text-xs font-bold text-brand hover:underline"
            onClick={() => onNavigate('bookings')}
          >
            View all requests
          </button>
        </div>
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Booking</th>
                <th>Customer</th>
                <th>Trip date</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.slice(0, 5).map((booking) => (
                <tr key={booking.id}>
                  <td>
                    <p className="font-bold text-brand">{booking.id}</p>
                    <p className="mt-1 text-[11px] text-slate-400">{booking.car}</p>
                  </td>
                  <td>
                    <p className="font-semibold text-navy">{booking.customer}</p>
                    <p className="mt-1 text-[11px] text-slate-400">{booking.route}</p>
                  </td>
                  <td className="whitespace-nowrap text-slate-500">{booking.date}</td>
                  <td>
                    <select
                      aria-label={`Status for ${booking.id}`}
                      value={booking.status}
                      onChange={(e) => updateBooking(booking.id, e.target.value)}
                      className={`status ${statusStyles[booking.status] || 'bg-slate-100 text-slate-600'}`}
                    >
                      <option>Pending</option>
                      <option>Confirmed</option>
                      <option>Cancelled</option>
                    </select>
                  </td>
                  <td className="text-right">
                    <button aria-label={`More actions for ${booking.id}`} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100">
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Fleet quick view */}
      <section className="card mt-6">
        <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-bold text-navy">Fleet quick view</h3>
            <p className="mt-1 text-xs text-slate-500">Your most popular vehicles at a glance.</p>
          </div>
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search fleet..."
              className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-xs text-navy outline-none focus:border-brand sm:w-56"
            />
          </div>
        </div>
        <div className="grid gap-3 p-5 sm:grid-cols-2 xl:grid-cols-4">
          {filteredCars.slice(0, 4).map((car) => (
            <div key={car.id} className="flex items-center gap-3 rounded-xl border border-slate-100 p-3">
              <img src={car.image} alt={car.name} className="size-14 rounded-lg object-cover" />
              <div className="min-w-0">
                <p className="truncate text-xs font-bold text-navy">{car.name}</p>
                <p className="mt-1 text-[11px] text-slate-400">
                  {car.category} &middot; {car.seats} seats
                </p>
                <p className="mt-1 text-xs font-bold text-brand">
                  ৳{car.price.toLocaleString()}
                  <span className="font-normal text-slate-400">/day</span>
                </p>
              </div>
              <span className="ml-auto size-2 shrink-0 rounded-full bg-emerald-500" />
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default DashboardView