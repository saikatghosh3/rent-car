'use client'

import { useEffect, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  RotateCcw,
  User,
  Users,
  X,
} from 'lucide-react'
import { whatsappLink, COMPANY } from '@/lib/constants'
import { submitBooking } from '@/lib/bookingsApi'
import type { Booking, Car } from '@/lib/mockData'
import siteContent from '@/data/site-content.json'

const steps = [
  { key: 'route', label: 'Route' },
  { key: 'details', label: 'Details' },
  { key: 'review', label: 'Review' },
]

const routeItems = siteContent.routes?.items ?? []

const routeDefaults = [
  'Dhaka',
  "Cox's Bazar",
  'Sylhet',
  'Chattogram',
  'Khulna',
  'Rajshahi',
  'Barishal',
  'Rangpur',
]

export function BookingModal({
  car,
  open,
  onClose,
}: {
  car: Car
  open: boolean
  onClose: () => void
}) {
  const [currentStep, setCurrentStep] = useState(0)
  const [pickup, setPickup] = useState('Dhaka')
  const [dropoff, setDropoff] = useState('')
  const [date, setDate] = useState('')
  const [passengers, setPassengers] = useState(Math.min(Math.max(car.seats - 1, 2), 6))
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState<Booking | null>(null)

  useEffect(() => {
    if (open) {
      setCurrentStep(0)
      setPickup('Dhaka')
      setDropoff('')
      setDate('')
      setPassengers(Math.min(Math.max(car.seats - 1, 2), 6))
      setName('')
      setEmail('')
      setPhone('')
      setError('')
      setSubmitted(null)
    }
  }, [open, car])

  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  function applyRoute(route: { from: string; to: string }) {
    setPickup(route.from)
    setDropoff(route.to)
  }

  function canProceed() {
    if (currentStep === 0) return pickup.trim().length > 0 && dropoff.trim().length > 0
    if (currentStep === 1) {
      return (
        date.trim().length > 0 &&
        name.trim().length > 0 &&
        email.trim().length > 0 &&
        /\S+@\S+\.\S+/.test(email)
      )
    }
    return true
  }

  const formattedDate = date
    ? new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    : ''

  const waMessage = `Hello, I'm ${name.trim() || 'a customer'}. I want to book the ${car.name}. Route: ${pickup} to ${dropoff}, date: ${formattedDate || '—'}, passengers: ${passengers}. Please confirm my booking.`

  async function handleSubmit() {
    setSubmitting(true)
    setError('')
    try {
      const booking = await submitBooking({
        customer: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        pickup: pickup.trim(),
        dropoff: dropoff.trim(),
        date: formattedDate,
        passengers,
        car: car.name,
      })
      setSubmitted(booking)
    } catch {
      setError('Something went wrong. Please try again or message us on WhatsApp.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/60 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Book ${car.name}`}
    >
      <div
        className="relative my-auto w-full max-w-lg overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {submitted ? (
          <>
            <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 to-emerald-500 px-7 py-6 text-center">
              <div className="absolute -right-10 -top-16 size-48 rounded-full bg-white/10 blur-2xl" />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
              >
                <X size={17} />
              </button>
              <span className="mx-auto grid size-13 place-items-center rounded-full bg-white/15 text-white">
                <CheckCircle2 size={26} />
              </span>
              <h2 className="mt-4 text-xl font-bold text-white">Request sent!</h2>
              <p className="mt-1 text-sm text-emerald-100">
                Your booking request for the {car.name} has been received.
              </p>
            </div>
            <div className="p-6 sm:p-7">
              <div className="overflow-hidden rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between gap-3 bg-slate-50 px-5 py-3">
                  <p className="text-sm font-bold text-navy">Booking reference</p>
                  <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-bold text-brand">
                    {submitted.id}
                  </span>
                </div>
                <div className="flex flex-col gap-3 p-5 text-sm">
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-2 text-slate-500">
                      <User size={14} className="text-brand" /> Customer
                    </span>
                    <span className="font-semibold text-navy">{submitted.customer}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-2 text-slate-500">
                      <MapPin size={14} className="text-brand" /> Route
                    </span>
                    <span className="text-right font-semibold text-navy">{submitted.route}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-2 text-slate-500">
                      <CalendarDays size={14} className="text-brand" /> Trip date
                    </span>
                    <span className="font-semibold text-navy">{submitted.date}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-2 text-slate-500">
                      <Clock3 size={14} className="text-brand" /> Status
                    </span>
                    <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-600">
                      Pending confirmation
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-3">
                <a
                  href={whatsappLink(waMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-full bg-[#25d366] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-200 transition hover:-translate-y-0.5 hover:bg-[#1fbd5a]"
                >
                  <MessageCircle size={17} /> Follow up on WhatsApp
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:border-slate-300"
                >
                  Done
                </button>
              </div>

              <p className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                <CheckCircle2 size={12} className="text-emerald-500" />
                You&apos;ll be confirmed via email &amp; {COMPANY.phone}
              </p>
            </div>
          </>
        ) : (
          <>
            {/* Header with car info + stepper */}
            <div className="relative overflow-hidden bg-gradient-to-r from-navy via-navy-light to-navy-muted px-6 py-5 sm:px-7">
              <div className="absolute -right-10 -top-16 size-44 rounded-full bg-brand/20 blur-2xl" />
              <div className="absolute -bottom-20 right-24 size-40 rounded-full bg-blue-400/20 blur-2xl" />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              >
                <X size={17} />
              </button>
              <div className="relative flex items-center gap-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl overflow-hidden">
                  <img src={car.image} alt={car.name} className="size-full object-cover" />
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-light">
                    {car.category}
                  </p>
                  <h2 className="truncate text-lg font-bold text-white">{car.name}</h2>
                  <p className="text-xs font-semibold text-brand">
                    ৳{car.price.toLocaleString()}
                    <span className="font-normal text-slate-300"> / day</span>
                  </p>
                </div>
              </div>

              {/* Stepper */}
              <div className="relative mt-5 flex items-center gap-2">
                {steps.map((s, i) => (
                  <div key={s.key} className="flex flex-1 items-center gap-2">
                    <div
                      className={`flex items-center gap-2 ${
                        i <= currentStep ? 'text-white' : 'text-slate-400'
                      }`}
                    >
                      <span
                        className={`grid size-6 shrink-0 place-items-center rounded-full text-[11px] font-bold transition ${
                          i < currentStep
                            ? 'bg-emerald-400 text-navy'
                            : i === currentStep
                              ? 'bg-brand text-white'
                              : 'bg-white/10 text-slate-300'
                        }`}
                      >
                        {i < currentStep ? <Check size={13} strokeWidth={3} /> : i + 1}
                      </span>
                      <span className={`hidden text-xs font-semibold sm:block ${i <= currentStep ? 'text-white' : 'text-slate-400'}`}>
                        {s.label}
                      </span>
                    </div>
                    {i < steps.length - 1 && (
                      <span
                        className={`h-0.5 flex-1 rounded-full transition ${
                          i < currentStep ? 'bg-emerald-400' : 'bg-white/15'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Body */}
            <div className="max-h-[65vh] overflow-y-auto p-6 sm:p-7">
              {/* Step 1 — Route */}
              {currentStep === 0 && (
                <div>
                  <div className="flex flex-col gap-4">
                    <label className="block">
                      <span className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700">
                        <MapPin size={13} className="text-brand" /> Pickup location
                      </span>
                      <select
                        value={pickup}
                        onChange={(e) => setPickup(e.target.value)}
                        className="input focus:ring-2 focus:ring-brand/30"
                      >
                        {routeDefaults.map((r) => (
                          <option key={r} value={r}>
                            {r}
                          </option>
                        ))}
                        <option value="Other">Other</option>
                      </select>
                    </label>
                    <label className="block">
                      <span className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700">
                        <MapPin size={13} className="text-brand" /> Drop-off location
                      </span>
                      <input
                        value={dropoff}
                        onChange={(e) => setDropoff(e.target.value)}
                        placeholder="e.g. Cox's Bazar"
                        className="input focus:ring-2 focus:ring-brand/30"
                      />
                    </label>
                  </div>

                  <p className="mb-3 mt-5 text-xs font-bold uppercase tracking-wider text-slate-400">
                    Popular routes
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {routeItems.map((r) => (
                      <button
                        key={`${r.from}-${r.to}`}
                        type="button"
                        onClick={() => applyRoute(r)}
                        className={`rounded-full border px-3.5 py-2 text-xs font-medium transition ${
                          pickup === r.from && dropoff === r.to
                            ? 'border-brand bg-brand text-white shadow-md shadow-orange-200'
                            : 'border-slate-200 text-slate-600 hover:border-brand hover:text-brand'
                        }`}
                      >
                        {r.from} → {r.to}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2 — Details */}
              {currentStep === 1 && (
                <div className="flex flex-col gap-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700">
                        <User size={13} className="text-brand" /> Your name *
                      </span>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Rafiq Ahmed"
                        className="input focus:ring-2 focus:ring-brand/30"
                      />
                    </label>
                    <label className="block">
                      <span className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700">
                        <Phone size={13} className="text-brand" /> Phone
                      </span>
                      <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 017XX-XXXXXX"
                        className="input focus:ring-2 focus:ring-brand/30"
                      />
                    </label>
                  </div>
                  <label className="block">
                    <span className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700">
                      <Mail size={13} className="text-brand" /> Email *
                    </span>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. rafiq@example.com"
                      className="input focus:ring-2 focus:ring-brand/30"
                    />
                  </label>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700">
                        <CalendarDays size={13} className="text-brand" /> Travel date *
                      </span>
                      <input
                        type="date"
                        value={date}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setDate(e.target.value)}
                        className="input focus:ring-2 focus:ring-brand/30"
                      />
                    </label>
                    <div>
                      <span className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700">
                        <Users size={13} className="text-brand" /> Passengers
                      </span>
                      <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-1.5">
                        <button
                          type="button"
                          aria-label="Fewer passengers"
                          onClick={() => setPassengers((n) => Math.max(1, n - 1))}
                          className="grid size-9 place-items-center rounded-lg bg-slate-100 font-bold text-navy transition hover:bg-slate-200"
                        >
                          −
                        </button>
                        <span className="flex-1 text-center text-sm font-bold text-navy">
                          {passengers} {passengers === 1 ? 'person' : 'people'}
                        </span>
                        <button
                          type="button"
                          aria-label="More passengers"
                          onClick={() => setPassengers((n) => Math.min(40, n + 1))}
                          className="grid size-9 place-items-center rounded-lg bg-brand font-bold text-white transition hover:bg-brand-hover"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-xs font-medium text-emerald-700">
                    <CheckCircle2 size={15} className="shrink-0" />
                    Driver, fuel, and vehicle insurance included. We confirm requests from our office.
                  </div>
                </div>
              )}

              {/* Step 3 — Review */}
              {currentStep === 2 && (
                <div>
                  <div className="overflow-hidden rounded-2xl border border-slate-200">
                    <div className="flex items-center justify-between gap-3 bg-gradient-to-r from-brand to-brand-hover px-5 py-4">
                      <p className="flex items-center gap-2 text-sm font-bold text-white">
                        <CheckCircle2 size={16} /> Your request summary
                      </p>
                      <span className="rounded-full bg-white/20 px-3 py-1 text-[11px] font-bold text-white">
                        Step 3 of 3
                      </span>
                    </div>
                    <div className="flex flex-col gap-3 p-5 text-sm">
                      <div className="flex items-center justify-between gap-3">
                        <span className="flex items-center gap-2 text-slate-500">
                          <User size={14} className="text-brand" /> Customer
                        </span>
                        <span className="font-semibold text-navy">{name}</span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span className="flex items-center gap-2 text-slate-500">
                          <Mail size={14} className="text-brand" /> Email
                        </span>
                        <span className="font-semibold text-navy">{email}</span>
                      </div>
                      {phone && (
                        <div className="flex items-center justify-between gap-3">
                          <span className="flex items-center gap-2 text-slate-500">
                            <Phone size={14} className="text-brand" /> Phone
                          </span>
                          <span className="font-semibold text-navy">{phone}</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between gap-3">
                        <span className="flex items-center gap-2 text-slate-500">
                          <MapPin size={14} className="text-brand" /> Route
                        </span>
                        <span className="text-right font-semibold text-navy">
                          {pickup} → {dropoff}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span className="flex items-center gap-2 text-slate-500">
                          <CalendarDays size={14} className="text-brand" /> Date
                        </span>
                        <span className="font-semibold text-navy">
                          {formattedDate || '—'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span className="flex items-center gap-2 text-slate-500">
                          <Users size={14} className="text-brand" /> Passengers
                        </span>
                        <span className="font-semibold text-navy">
                          {passengers} {passengers === 1 ? 'person' : 'people'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {error && (
                    <p className="mt-4 rounded-xl bg-rose-50 px-4 py-3 text-xs font-medium text-rose-600">
                      {error}
                    </p>
                  )}

                  <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-slate-400">
                    <Clock3 size={12} className="text-brand" />
                    We reply within minutes on WhatsApp with your exact price.
                  </p>
                </div>
              )}

              {/* Nav buttons */}
              <div className="mt-6 flex items-center gap-3">
                {currentStep > 0 && (
                  <button
                    type="button"
                    onClick={() => setCurrentStep((s) => s - 1)}
                    className="flex items-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:border-slate-300"
                  >
                    <ArrowLeft size={16} /> Back
                  </button>
                )}
                {currentStep < steps.length - 1 ? (
                  <button
                    type="button"
                    disabled={!canProceed()}
                    onClick={() => setCurrentStep((s) => s + 1)}
                    className="btn-brand flex-1 justify-center disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Continue <ArrowRight size={16} />
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={submitting}
                    onClick={handleSubmit}
                    className="btn-brand flex-1 justify-center disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" /> Submitting...
                      </>
                    ) : (
                      <>
                        Submit request <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                )}
              </div>

              <p className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                <CheckCircle2 size={12} className="text-emerald-500" />
                Your request will be confirmed from our admin panel &amp; via {COMPANY.phone}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default BookingModal
