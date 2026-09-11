'use client'

import { useMemo, useState } from 'react'
import { Eye, EyeOff, MessageSquareQuote, Search, Star, Trash2 } from 'lucide-react'
import { siteReviews as initialReviews } from '@/lib/adminData'

const rating = 4.8
const total = 32

export function ReviewsView() {
  const [reviews, setReviews] = useState(initialReviews)
  const [tab, setTab] = useState<'All' | 'published' | 'hidden'>('All')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    return reviews.filter(
      (r) =>
        (tab === 'All' || r.status === tab) &&
        (r.customer.toLowerCase().includes(q) || r.route.toLowerCase().includes(q) || r.text.toLowerCase().includes(q))
    )
  }, [reviews, tab, query])

  function toggleStatus(id: string) {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: r.status === 'published' ? 'hidden' : 'published' } : r))
    )
  }

  function remove(id: string) {
    setReviews((prev) => prev.filter((r) => r.id !== id))
  }

  return (
    <>
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-navy sm:text-2xl">Customer reviews</h2>
          <p className="mt-1 text-sm text-slate-500">
            Moderate visitor reviews shown on your homepage.
          </p>
        </div>
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search reviews..."
            className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-xs text-navy outline-none focus:border-brand sm:w-60"
          />
        </div>
      </div>

      {/* Summary */}
      <section className="rounded-2xl bg-gradient-to-r from-navy via-navy-light to-navy-muted p-6 text-white">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-5xl font-bold">{rating}</p>
              <div className="mt-1 flex justify-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className={i < 4 || rating % 1 >= 0.8 ? 'fill-amber-400 text-amber-400' : 'fill-amber-400/40 text-amber-400/40'} />
                ))}
              </div>
              <p className="mt-1 text-[11px] text-white/50">{total} total reviews</p>
            </div>
            <div className="h-16 w-px bg-white/15 sm:block" />
          </div>
          <div className="flex flex-1 flex-col gap-1.5">
            {[5, 4, 3, 2, 1].map((star) => {
              const pct = star === 5 ? 76 : star === 4 ? 14 : star === 3 ? 6 : 3
              return (
                <div key={star} className="flex items-center gap-3 text-xs">
                  <span className="w-8 text-white/60">{star} star</span>
                  <div className="h-1.5 flex-1 rounded-full bg-white/15">
                    <div className="h-1.5 rounded-full bg-amber-400" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="w-8 text-right text-white/60">{pct}%</span>
                </div>
              )
            })}
          </div>
          <p className="max-w-xs text-xs leading-relaxed text-white/60">
            4.8 out of 5 based on verified trips. Customers love our punctual drivers and clean cars.
          </p>
        </div>
      </section>

      {/* Tabs */}
      <div className="mt-6 mb-6 flex gap-2">
        {(['All', 'published', 'hidden'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-xl px-4 py-2 text-xs font-bold capitalize transition ${
              tab === t ? 'bg-navy text-white' : 'bg-white text-slate-500 hover:bg-slate-100'
            }`}
          >
            {t} ({t === 'All' ? reviews.length : reviews.filter((r) => r.status === t).length})
          </button>
        ))}
      </div>

      {/* Review cards */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.length === 0 && (
          <div className="card col-span-full py-12 text-center text-sm text-slate-400">
            No reviews match your filter.
          </div>
        )}
        {filtered.map((r) => (
          <div key={r.id} className="card flex flex-col p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-brand to-brand-hover text-sm font-bold text-white">
                  {r.customer.split(' ').map((w) => w[0]).slice(0, 2).join('')}
                </span>
                <div>
                  <p className="text-sm font-bold text-navy">{r.customer}</p>
                  <p className="text-[11px] text-slate-400">{r.route}</p>
                </div>
              </div>
              <span
                className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                  r.status === 'published' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
                }`}
              >
                {r.status}
              </span>
            </div>

            <div className="mt-3 flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={13} className={i < r.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'} />
              ))}
              <span className="ml-auto text-[11px] text-slate-400">{r.date}</span>
            </div>

            <p className="mt-3 flex-1 text-xs leading-relaxed text-slate-500">
              &ldquo;{r.text}&rdquo;
            </p>

            <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-3">
              <button
                onClick={() => toggleStatus(r.id)}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-bold transition ${
                  r.status === 'published'
                    ? 'bg-amber-50 text-amber-600 hover:bg-amber-100'
                    : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                }`}
              >
                {r.status === 'published' ? <EyeOff size={13} /> : <Eye size={13} />}
                {r.status === 'published' ? 'Hide' : 'Publish'}
              </button>
              <button
                onClick={() => remove(r.id)}
                className="flex items-center gap-1.5 rounded-lg bg-rose-50 px-2.5 py-1.5 text-[11px] font-bold text-rose-600 transition hover:bg-rose-100"
              >
                <Trash2 size={13} /> Delete
              </button>
              <span className="ml-auto text-[11px] text-slate-300">{r.id}</span>
            </div>
          </div>
        ))}
      </section>

      <p className="mt-6 flex items-center gap-2 text-xs text-slate-400">
        <MessageSquareQuote size={14} className="text-brand" />
        Reviews marked as published appear on the homepage testimonials section.
      </p>
    </>
  )
}

export default ReviewsView