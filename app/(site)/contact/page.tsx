import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Clock3,
  ShieldCheck,
  Star,
} from 'lucide-react'
import { COMPANY, whatsappLink } from '@/lib/constants'
import { QuoteForm } from '@/components/contact/QuoteForm'
import siteContent from '@/data/site-content.json'

type ContactCard = {
  icon: typeof Phone
  title: string
  value: string
  sub: string
  href: string
  gradient: string
  shadow: string
}

const contactCards: ContactCard[] = [
  {
    icon: Phone,
    title: 'Call us',
    value: COMPANY.phone,
    sub: 'Toll-free & local lines',
    href: `tel:${COMPANY.phone}`,
    gradient: 'from-sky-500 to-blue-600',
    shadow: 'shadow-sky-200/60',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    value: 'Instant reply',
    sub: 'Fastest way to book',
    href: whatsappLink('Hello, I would like to make a booking.'),
    gradient: 'from-emerald-500 to-green-600',
    shadow: 'shadow-emerald-200/60',
  },
  {
    icon: Mail,
    title: 'Email us',
    value: COMPANY.email,
    sub: 'Replies within 2 hours',
    href: `mailto:${COMPANY.email}`,
    gradient: 'from-amber-500 to-orange-600',
    shadow: 'shadow-amber-200/60',
  },
  {
    icon: MapPin,
    title: 'Visit us',
    value: COMPANY.address,
    sub: 'Dhanmondi, Dhaka',
    href: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(COMPANY.address),
    gradient: 'from-violet-500 to-purple-600',
    shadow: 'shadow-violet-200/60',
  },
]

const popularRoutes = siteContent.routes?.items ?? []

export default async function Contact({
  searchParams,
}: {
  searchParams?: Promise<{ from?: string; to?: string }>
}) {
  const params = searchParams ? await searchParams : undefined
  const initialRoute = [params?.from, params?.to].filter(Boolean).join(' to ')

  return (
    <main className="bg-white">
      {/* ========================= Hero ========================= */}
      <section className="relative overflow-hidden bg-white">
        <div className="hero-blob left-[-140px] top-[-100px] size-[420px] bg-brand/40" />
        <div className="hero-blob right-[-120px] bottom-[-160px] size-[440px] bg-sky-400/30" />

        <div className="relative mx-auto max-w-7xl px-5 py-20 lg:px-6">
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <span className="trust-chip">
              <ShieldCheck size={15} className="text-emerald-600" />
              Available 24/7
            </span>
            <span className="trust-chip">
              <Star size={15} className="text-brand" fill="currentColor" />
              4.9/5 from 1,200+ travelers
            </span>
          </div>
          <p className="badge">Let&apos;s talk</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold text-navy sm:text-6xl">
            Plan your next trip.{' '}
            <span className="bg-gradient-to-r from-brand to-brand-hover bg-clip-text text-transparent">
              We&apos;re here.
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-500">
            Tell us where you&apos;re going and we&apos;ll take care of the
            rest — vehicles, drivers, and everything in between.
          </p>
        </div>
      </section>

      {/* ========================= Contact cards ========================= */}
      <section className="mx-auto max-w-7xl px-5 pb-4 lg:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {contactCards.map(
            ({ icon: Icon, title, value, sub, href, gradient, shadow }) => (
              <a
                key={title}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="card group p-6 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60"
              >
                <span
                  className={`grid size-12 place-items-center rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-lg ${shadow} transition group-hover:scale-110`}
                >
                  <Icon size={22} />
                </span>
                <p className="mt-5 text-xs font-bold uppercase tracking-wider text-slate-400">
                  {title}
                </p>
                <p className="mt-1 break-words font-bold text-navy">{value}</p>
                <p className="mt-1 text-xs text-slate-400">{sub}</p>
              </a>
            )
          )}
        </div>
      </section>

      {/* ========================= Form + Info ========================= */}
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[1fr_.85fr] lg:px-6">
        {/* Form */}
        <QuoteForm initialRoute={initialRoute} />

        {/* Info side */}
        <div className="flex flex-col gap-6">
          {/* Quick booking */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#25d366] to-[#128c7e] p-7 text-white shadow-xl shadow-emerald-200/60">
            <div className="absolute -right-8 -top-10 size-40 rounded-full bg-white/10" />
            <div className="relative">
              <span className="grid size-12 place-items-center rounded-2xl bg-white/15 backdrop-blur">
                <MessageCircle size={24} />
              </span>
              <h3 className="mt-4 text-xl font-bold">
                Book faster on WhatsApp
              </h3>
              <p className="mt-2 text-sm leading-6 text-emerald-50/90">
                Skip the form entirely. Message us your route and date and get
                a confirmed price instantly.
              </p>
              <a
                href={whatsappLink('Hello! I want to book a car.')}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-[#128c7e] shadow-lg transition hover:-translate-y-0.5"
              >
                <MessageCircle size={16} /> Chat now
              </a>
            </div>
          </div>

          {/* Open hours */}
          <div className="card p-6">
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-xl bg-navy text-brand-light">
                <Clock3 size={20} />
              </span>
              <div>
                <h3 className="font-bold text-navy">Office hours</h3>
                <p className="text-xs text-slate-400">{COMPANY.hours}</p>
              </div>
            </div>
            <div className="mt-5 flex flex-col gap-2 text-sm text-slate-600">
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span>Saturday — Thursday</span>
                <span className="font-semibold text-navy">Open 24h</span>
              </div>
              <div className="flex justify-between">
                <span>Friday</span>
                <span className="font-semibold text-navy">Open 24h</span>
              </div>
            </div>
          </div>

          {/* Popular routes quick links */}
          <div className="card p-6">
            <h3 className="font-bold text-navy">Ask about popular routes</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {popularRoutes.slice(0, 6).map((r) => (
                <a
                  key={`${r.from}-${r.to}`}
                  href={whatsappLink(
                    `Hello! I'd like a quote for ${r.from} to ${r.to}.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-slate-200 px-3.5 py-2 text-xs font-medium text-slate-600 transition hover:border-brand hover:bg-brand/5 hover:text-brand"
                >
                  {r.from} → {r.to}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}