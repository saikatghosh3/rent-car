'use client'

import { useState } from 'react'
import {
  BadgeCheck,
  CheckCircle2,
  MessageCircle,
  Phone,
  ShieldCheck,
  Users,
} from 'lucide-react'
import { whatsappLink } from '@/lib/constants'
import { BookingPanel } from '@/components/booking/BookingPanel'
import type { Car } from '@/lib/mockData'

export function BookingSidebar({ car }: { car: Car }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <aside className="h-fit lg:sticky lg:top-28">
        <div className="card overflow-hidden shadow-xl shadow-slate-200/70">
          <div className="bg-gradient-to-r from-navy via-navy-light to-navy-muted px-7 py-6">
            <p className="text-[11px] uppercase tracking-widest text-slate-300">Starting from</p>
            <p className="mt-1 text-4xl font-extrabold text-white">
              ৳{car.price.toLocaleString()}
              <span className="text-sm font-medium text-slate-300"> / day</span>
            </p>
            <p className="mt-2 flex items-center gap-1.5 text-xs text-emerald-400">
              <span className="size-1.5 rounded-full bg-emerald-400" /> Ready to book now
            </p>
          </div>

          <div className="p-7">
            <h3 className="text-lg font-bold text-navy">Reserve in 3 easy steps</h3>
            <ol className="mt-4 flex flex-col gap-3">
              {[
                'Tell us your route & travel date',
                'Share your contact details with us',
                'We confirm from our office & you ride',
              ].map((step, i) => (
                <li key={step} className="flex items-center gap-3 text-sm text-slate-600">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand/10 text-xs font-bold text-brand">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="btn-brand mt-6 flex w-full items-center justify-center gap-2 !py-4 text-sm"
            >
              <CheckCircle2 size={17} /> Book this car
            </button>
            <a
              href={whatsappLink(
                `Hello, I want to book the ${car.name} (৳${car.price.toLocaleString()}/day). Please share availability.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline mt-3 flex w-full items-center justify-center gap-2 !py-3.5 text-sm"
            >
              <MessageCircle size={15} /> Book via WhatsApp
            </a>
            <a
              href="tel:+8801712345678"
              className="btn-outline mt-3 flex w-full items-center justify-center gap-2 !py-3.5 text-sm"
            >
              <Phone size={15} /> Call us instead
            </a>

            <div className="mt-6 grid grid-cols-3 gap-2 border-t border-slate-100 pt-5 text-center">
              {[
                { icon: Users, label: 'Driver incl.' },
                { icon: ShieldCheck, label: 'Insured' },
                { icon: BadgeCheck, label: 'Verified' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1.5">
                  <Icon size={17} className="text-emerald-500" />
                  <span className="text-[10px] font-semibold text-slate-500">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {open && <BookingPanel car={car} open={open} onClose={() => setOpen(false)} />}
    </>
  )
}

export default BookingSidebar
