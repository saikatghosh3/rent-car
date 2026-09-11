'use client'

import { useState } from 'react'
import {
  Send,
  User,
  Phone,
  CalendarDays,
  Route as RouteIcon,
  MessageCircle,
  CheckCircle2,
} from 'lucide-react'

export function QuoteForm({
  initialRoute = '',
}: {
  initialRoute?: string
}) {
  const [route, setRoute] = useState(initialRoute)
  const [sent, setSent] = useState(false)

  return (
    <form
      className="card p-6 sm:p-8"
      onSubmit={(e) => {
        e.preventDefault()
        setSent(true)
      }}
    >
      <div className="flex items-center gap-3">
        <span className="grid size-11 place-items-center rounded-xl bg-brand/10 text-brand">
          <Send size={20} />
        </span>
        <div>
          <h2 className="text-2xl font-bold text-navy">Request a quote</h2>
          <p className="mt-0.5 text-sm text-slate-400">
            Free, no-obligation — we reply in minutes.
          </p>
        </div>
      </div>

      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700">
            <User size={13} className="text-brand" /> Your name
          </span>
          <input required className="input" placeholder="Full name" />
        </label>
        <label className="block">
          <span className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700">
            <Phone size={13} className="text-brand" /> Phone number
          </span>
          <input
            required
            type="tel"
            className="input"
            placeholder="01XXXXXXXXX"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700">
            <CalendarDays size={13} className="text-brand" /> Travel date
          </span>
          <input type="date" className="input" />
        </label>
        <label className="block">
          <span className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700">
            <RouteIcon size={13} className="text-brand" /> Route
          </span>
          <input
            className="input"
            placeholder="Dhaka to Sylhet"
            value={route}
            onChange={(e) => setRoute(e.target.value)}
          />
        </label>
      </div>

      <label className="mt-4 block">
        <span className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700">
          <MessageCircle size={13} className="text-brand" /> Message
        </span>
        <textarea
          rows={4}
          className="input"
          placeholder="Any special requests..."
        />
      </label>

      {sent ? (
        <div className="mt-6 flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-4 text-sm font-semibold text-emerald-700">
          <CheckCircle2 size={18} />
          Request sent! Our team will contact you within minutes.
        </div>
      ) : (
        <button type="submit" className="btn-brand mt-6 justify-center">
          Send request <Send size={16} />
        </button>
      )}

      <p className="mt-4 flex items-center gap-1.5 text-xs text-slate-400">
        <CheckCircle2 size={13} className="text-emerald-500" />
        We currently reply to 98% of requests within 10 minutes.
      </p>
    </form>
  )
}