'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Users,
  Briefcase,
  Gauge,
  Fuel,
  ArrowRight,
  Star,
  ShieldCheck,
  BadgeCheck,
} from 'lucide-react'
import { Car } from '@/lib/mockData'
import { BookingModal } from '@/components/booking/BookingModal'

export function CarCard({
  car,
  premium = false,
  onBookNow,
}: {
  car: Car
  premium?: boolean
  onBookNow?: (car: Car) => void
}) {
  const [open, setOpen] = useState(false)

  function handleBookNow() {
    if (onBookNow) {
      onBookNow(car)
    } else {
      setOpen(true)
    }
  }

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-brand/40 hover:shadow-2xl hover:shadow-orange-200/50">
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={car.image}
          alt={car.name}
          className="size-full object-cover transition duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand shadow-sm">
          {car.category}
        </span>

        <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-slate-950/60 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
          <Star size={11} className="fill-amber-400 text-amber-400" />
          4.9
        </span>

        <span className="absolute bottom-3.5 left-4 flex items-center gap-1.5 rounded-full bg-emerald-500/95 px-3 py-1 text-[11px] font-bold text-white shadow-md">
          <BadgeCheck size={12} /> Available today
        </span>

        {premium && (
          <span className="absolute bottom-3.5 right-4 rounded-full bg-gradient-to-r from-brand to-brand-hover px-3 py-1 text-[11px] font-bold text-white shadow-md">
            Popular
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-navy transition group-hover:text-brand">
              {car.name}
            </h3>
            <p className="mt-0.5 text-xs text-slate-400">
              {car.transmission} &middot; {car.fuel} &middot; model 2023
            </p>
          </div>
          <div className="shrink-0 rounded-xl bg-brand/10 px-3 py-2 text-right">
            <p className="text-lg font-extrabold leading-none text-brand">
              ৳{car.price.toLocaleString()}
            </p>
            <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
              / day
            </p>
          </div>
        </div>

        {/* Specs */}
        <div className="mt-4 grid grid-cols-4 gap-2 border-y border-slate-100 py-3.5">
          <div className="flex flex-col items-center gap-1.5 text-center">
            <Users size={15} className="text-slate-400" />
            <span className="text-[10px] font-semibold text-slate-500">{car.seats} seats</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 text-center">
            <Briefcase size={15} className="text-slate-400" />
            <span className="text-[10px] font-semibold text-slate-500">{car.luggage} bags</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 text-center">
            <Gauge size={15} className="text-slate-400" />
            <span className="text-[10px] font-semibold text-slate-500">{car.transmission}</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 text-center">
            <Fuel size={15} className="text-slate-400" />
            <span className="text-[10px] font-semibold text-slate-500">{car.fuel}</span>
          </div>
        </div>

        {/* Note */}
        <p className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-400">
          <ShieldCheck size={13} className="text-emerald-500" />
          Professional driver &amp; insured ride included
        </p>

        {/* Actions */}
        <div className="mt-auto flex items-center gap-2 pt-4">
          <button
            type="button"
            onClick={handleBookNow}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand to-brand-hover px-3 py-3 text-xs font-bold text-white shadow-md shadow-orange-200/60 transition hover:shadow-lg"
          >
            Book now
          </button>
          <Link
            href={`/cars/${car.id}`}
            className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 px-4 py-3 text-xs font-bold text-navy transition hover:border-brand hover:bg-brand/5 hover:text-brand"
          >
            Details <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {onBookNow === undefined && (
        <BookingModal car={car} open={open} onClose={() => setOpen(false)} />
      )}
    </article>
  )
}

export default CarCard
