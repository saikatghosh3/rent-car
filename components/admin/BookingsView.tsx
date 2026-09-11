'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Mail,
  MapPin,
  MoreHorizontal,
  Phone,
  Search,
} from 'lucide-react'
import { bookings as initialBookings } from '@/lib/adminData'
import { fetchBookings, updateBookingStatus } from '@/lib/bookingsApi'
import { statusStyles } from '@/lib/adminTypes'
import type { Booking } from '@/lib/mockData'

const tabs = ['All', 'Pending', 'Confirmed', 'Cancelled']

const seedRows: Booking[] = [
  ...initialBookings,
  { id: 'BK-1040', customer: 'Sharmin Akter', route: 'Dhaka → Rajshahi', date: '16 Sep 2026', car: 'Toyota Premio 1,520', status: 'Pending' },
  { id: 'BK-1039', customer: 'Hasan Mahmud', route: 'Dhaka → Khulna', date: '15 Sep 2026', car: 'Toyota Land Cruiser Prado', status: 'Confirmed' },
  { id: 'BK-1038', customer: 'Juthi Saha', route: 'Dhaka → Sylhet', date: '15 Sep 2026', car: 'Kia Sportage', status: 'Pending' },
  { id: 'BK-1037', customer: 'Alok Das', route: 'Dhaka → Cox\'s Bazar', date: '14 Sep 2026', car: 'Toyota Noah 2023', status: 'Confirmed' },
  { id: 'BK-1036', customer: 'Nadia Islam', route: 'Dhaka → Barishal', date: '13 Sep 2026', car: 'Ashok Leyland Coach', status: 'Cancelled' },
  { id: 'BK-1035', customer: 'Rubel Hossain', route: 'Dhaka → Chattogram', date: '12 Sep 2026', car: 'Hyundai H-100', status: 'Confirmed' },
  { id: 'BK-1034', customer: 'Sakib & Family', route: 'Dhaka → Sundarbans', date: '11 Sep 2026', car: 'Toyota Land Cruiser Prado', status: 'Completed' },
  { id: 'BK-1033', customer: 'Mim Chowdhury', route: 'Dhaka → Saint Martin\'s', date: '10 Sep 2026', car: 'Toyota Premio 1,520', status: 'Completed' },
]

export function BookingsView() {
  const [rows, setRows] = useState<Booking[]>([])
  const [loadError, setLoadError] = useState('')
  const [tab, setTab] = useState('All')
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const perPage = 8

  useEffect(() => {
    fetchBookings()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setRows(data)
        else setRows(seedRows)
      })
      .catch(() => setRows(seedRows))
  }, [])

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    return rows.filter(
      (b) =>
        (tab === 'All' || b.status === tab) &&
        (b.customer.toLowerCase().includes(q) ||
          b.route.toLowerCase().includes(q) ||
          b.id.toLowerCase().includes(q) ||
          b.car.toLowerCase().includes(q))
    )
  }, [rows, tab, query])

  const counts = useMemo(() => {
    const m = new Map<string, number>([['All', rows.length]])
    for (const b of rows) m.set(b.status, (m.get(b.status) ?? 0) + 1)
    return m
  }, [rows])

  const paged = filtered.slice((page - 1) * perPage, page * perPage)
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage))

  async function updateStatus(id: string, status: string) {
    setRows((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)))
    try {
      await updateBookingStatus(id, status)
    } catch {
      setLoadError('Could not sync the status change. Reload to see the latest data.')
    }
  }

  return (
    <>
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-navy sm:text-2xl">Booking requests</h2>
          <p className="mt-1 text-sm text-slate-500">Review, confirm, or cancel customer trip requests.</p>
        </div>
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setPage(1)
            }}
            placeholder="Search bookings..."
            className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-xs text-navy outline-none focus:border-brand sm:w-60"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => {
              setTab(t)
              setPage(1)
            }}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
              tab === t ? 'bg-navy text-white' : 'bg-white text-slate-500 hover:bg-slate-100'
            }`}
          >
            {t} <span className="opacity-60">({counts.get(t) ?? 0})</span>
          </button>
        ))}
      </div>

      {loadError && (
        <div className="mb-4 rounded-xl bg-rose-50 px-4 py-3 text-xs font-medium text-rose-600">
          {loadError}
        </div>
      )}

      {/* Table */}
      <section className="card overflow-hidden">
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Booking</th>
                <th>Customer</th>
                <th>Route</th>
                <th>Trip date</th>
                <th>Vehicle</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paged.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-sm text-slate-400">
                    No bookings found.
                  </td>
                </tr>
              )}
              {paged.map((b) => (
                <tr key={b.id}>
                  <td className="font-bold text-brand">{b.id}</td>
                  <td>
                    <p className="font-semibold text-navy">{b.customer}</p>
                    <p className="mt-0.5 flex items-center gap-1 text-[11px] text-slate-400">
                      {b.phone ? (
                        <>
                          <Phone size={10} /> {b.phone}
                        </>
                      ) : b.email ? (
                        <>
                          <Mail size={10} /> {b.email}
                        </>
                      ) : (
                        'No contact given'
                      )}
                    </p>
                  </td>
                  <td>
                    <p className="flex items-center gap-1.5 text-slate-600">
                      <MapPin size={13} className="text-brand" /> {b.route}
                    </p>
                  </td>
                  <td className="whitespace-nowrap text-slate-500">{b.date}</td>
                  <td className="text-slate-500">{b.car}</td>
                  <td>
                    <select
                      aria-label={`Status for ${b.id}`}
                      value={b.status}
                      onChange={(e) => updateStatus(b.id, e.target.value)}
                      className={`status ${statusStyles[b.status] || 'bg-slate-100 text-slate-600'}`}
                    >
                      <option>Pending</option>
                      <option>Confirmed</option>
                      <option>Completed</option>
                      <option>Cancelled</option>
                    </select>
                  </td>
                  <td className="text-right">
                    <button
                      aria-label={`More actions for ${b.id}`}
                      className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
                    >
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row">
          <p className="text-xs text-slate-400">
            Showing{' '}
            <b className="text-navy">
              {(page - 1) * perPage + 1}-{Math.min(page * perPage, filtered.length)}
            </b>{' '}
            of <b className="text-navy">{filtered.length}</b> bookings
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="rounded-lg border border-slate-200 p-2 text-slate-500 disabled:opacity-40"
              aria-label="Previous page"
            >
              <ChevronLeft size={15} />
            </button>
            <span className="px-2 text-xs font-semibold text-navy">
              {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="rounded-lg border border-slate-200 p-2 text-slate-500 disabled:opacity-40"
              aria-label="Next page"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* Contact quick actions */}
      <section className="mt-6 grid gap-4 sm:grid-cols-3">
        {[
          { icon: Mail, label: 'Message customers', desc: 'Send update emails from your inbox.', action: 'Compose' },
          { icon: Phone, label: 'Call customers', desc: 'Confirm bookings over the phone.', action: 'Call' },
          { icon: CalendarDays, label: 'Trip calendar', desc: 'See all upcoming trips in a calendar.', action: 'Open' },
        ].map(({ icon: Icon, label, desc, action }) => (
          <div key={label} className="card flex items-center gap-4 p-5">
            <span className="metric-icon bg-brand/10 text-brand">
              <Icon size={18} />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-bold text-navy">{label}</p>
              <p className="mt-0.5 text-xs text-slate-400">{desc}</p>
              <button className="mt-2 text-xs font-bold text-brand hover:underline">{action} →</button>
            </div>
          </div>
        ))}
      </section>
    </>
  )
}

export default BookingsView