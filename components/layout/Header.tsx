'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, Phone, Clock3, Mail, MapPin } from 'lucide-react'
import { COMPANY, navLinks } from '@/lib/constants'

export function Header() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* Top bar */}
      <div className="hidden bg-gradient-to-r from-navy via-navy-light to-navy text-xs text-slate-200 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2.5">
          <span className="flex items-center gap-1.5">
            <Clock3 size={12} className="text-brand-light" />
            {COMPANY.hours}
          </span>
          <div className="flex items-center gap-6">
            <span className="hidden items-center gap-1.5 lg:flex">
              <MapPin size={12} className="text-brand-light" />
              {COMPANY.address}
            </span>
            <a
              href={`mailto:${COMPANY.email}`}
              className="flex items-center gap-1.5 transition hover:text-white"
            >
              <Mail size={12} className="text-brand-light" />
              {COMPANY.email}
            </a>
            <a
              href={`tel:${COMPANY.phone}`}
              className="flex items-center gap-1.5 font-semibold transition hover:text-white"
            >
              <Phone size={12} className="text-brand-light" />
              {COMPANY.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 shadow-sm shadow-slate-100/50 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-6">
          <Link href="/" className="group flex items-center gap-3">
            <Image
              src="/travel-logo.png"
              alt="Traveling Bangladesh logo"
              width={48}
              height={48}
              priority
              className="size-11 rounded-full object-cover shadow-md ring-1 ring-slate-200 transition duration-300 group-hover:ring-brand/50 sm:size-12"
            />
            <span className="text-sm font-bold leading-tight text-navy sm:text-base">
              Traveling Bangladesh
              <br />
              <em className="font-normal not-italic text-brand">
                Rent A Car
              </em>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`nav-item ${pathname === l.href ? 'active' : ''}`}
              >
                {l.label}
              </Link>
            ))}
            <Link href="/contact" className="btn-brand">
              Book a car
            </Link>
          </nav>

          <button
            aria-label="Open menu"
            className="rounded-lg p-2 text-navy md:hidden"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="border-t border-slate-100 bg-white px-5 py-5 md:hidden">
            <nav className="flex flex-col gap-4">
              {navLinks.map((l) => (
                <Link
                  onClick={() => setOpen(false)}
                  key={l.href}
                  href={l.href}
                  className={`border-b border-slate-100 pb-3 font-medium ${
                    pathname === l.href ? 'text-brand' : 'text-navy'
                  }`}
                >
                  {l.label}
                </Link>
              ))}
              <a
                href={`tel:${COMPANY.phone}`}
                className="flex items-center gap-2 text-sm text-slate-600"
              >
                <Phone size={16} /> {COMPANY.phone}
              </a>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="btn-brand justify-center"
              >
                Book a car
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  )
}