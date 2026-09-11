import Link from 'next/link'
import Image from 'next/image'
import {
  MapPin,
  Phone,
  Mail,
  ArrowUpRight,
  Clock3,
  MessageCircle,
} from 'lucide-react'
import { COMPANY, navLinks, whatsappLink } from '@/lib/constants'

const exploreLinks = [
  { href: '/', label: 'Home', color: 'c-home' },
  { href: '/cars', label: 'Our Fleet', color: 'c-fleet' },
  { href: '/services', label: 'Our Services', color: 'c-services' },
  { href: '/about', label: 'About Us', color: 'c-about' },
  { href: '/contact', label: 'Contact', color: 'c-contact' },
  { href: '/privacy-policy', label: 'Privacy policy', color: 'c-policy' },
  {
    href: '/terms-and-conditions',
    label: 'Terms & conditions',
    color: 'c-terms',
  },
]

const socials = [
  {
    name: 'Facebook',
    href: 'https://facebook.com/travelingbangladesh',
    hover: 'hover:bg-[#1877f2] hover:shadow-blue-500/40',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/travelingbangladesh',
    hover: 'hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:shadow-pink-500/40',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    name: 'Twitter / X',
    href: 'https://twitter.com/travelingbangladesh',
    hover: 'hover:bg-slate-900 hover:shadow-slate-700/40',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
]

export function Footer() {
  return (
    <footer className="footer">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-4 lg:px-6">
        {/* Brand */}
        <div>
          <div className="mb-5 flex items-center gap-3">
            <Image
              src="/travel-logo.png"
              alt="Traveling Bangladesh logo"
              width={48}
              height={48}
              className="size-12 rounded-full object-cover shadow-lg ring-1 ring-white/25"
            />
            <span className="font-bold text-white">
              Traveling Bangladesh
              <br />
              <em className="font-normal not-italic text-brand-light">
                Rent A Car
              </em>
            </span>
          </div>
          <p className="text-sm leading-7 text-slate-300/80">
            Your trusted partner for safe, comfortable, and reliable travel
            across Bangladesh.
          </p>
        </div>

        {/* Explore */}
        <div>
          <h3 className="footer-title">Explore</h3>
          <div className="flex flex-col items-start gap-3.5">
            {exploreLinks.map((l) => (
              <Link key={l.href} href={l.href} className={`footer-nav ${l.color}`}>
                {l.label}
                <ArrowUpRight size={13} className="arrow" />
              </Link>
            ))}
          </div>
        </div>

        {/* Follow us */}
        <div>
          <h3 className="footer-title">Follow us</h3>
          <p className="mb-5 text-sm leading-6 text-slate-300/80">
            Stay connected for offers, new routes, and travel inspiration.
          </p>
          <div className="flex gap-3.5">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit our ${s.name} profile`}
                title={s.name}
                className={`grid size-11 place-items-center rounded-xl border border-white/15 bg-white/5 text-slate-200 shadow-lg transition duration-300 hover:-translate-y-1 hover:text-white hover:shadow-xl ${s.hover}`}
              >
                {s.icon}
              </a>
            ))}
          </div>
          <p className="mt-4 text-[11px] text-slate-500">
            @travelingbangladesh
          </p>
        </div>

        {/* Get in touch */}
        <div>
          <h3 className="footer-title">Get in touch</h3>
          <div className="flex flex-col gap-4 text-sm text-slate-300/90">
            <span className="flex gap-3">
              <MapPin className="mt-0.5 shrink-0 text-brand-light" size={18} />
              {COMPANY.address}
            </span>
            <a
              className="flex gap-3 transition hover:text-white"
              href={`tel:${COMPANY.phone}`}
            >
              <Phone className="shrink-0 text-brand-light" size={18} />
              {COMPANY.phone}
            </a>
            <a
              className="flex gap-3 transition hover:text-white"
              href={`mailto:${COMPANY.email}`}
            >
              <Mail className="mt-0.5 shrink-0 text-brand-light" size={18} />
              {COMPANY.email}
            </a>
            <span className="flex gap-3">
              <Clock3 className="mt-0.5 shrink-0 text-brand-light" size={18} />
              {COMPANY.hours}
            </span>
          </div>
          <a
            href={whatsappLink('Hello, I would like to book a car.')}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#25d366] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-950/40 transition hover:-translate-y-0.5 hover:bg-[#1fbd5a]"
          >
            <MessageCircle size={17} /> Book on WhatsApp
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-6 sm:flex-row lg:px-6">
          <p className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} {COMPANY.name}. All rights
            reserved.
          </p>
          <div className="flex gap-6 text-xs">
            <Link
              href="/privacy-policy"
              className="text-slate-400 transition hover:text-white"
            >
              Privacy
            </Link>
            <Link
              href="/terms-and-conditions"
              className="text-slate-400 transition hover:text-white"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}