import Link from 'next/link'
import {
  ArrowRight,
  Home,
  Plane,
  Briefcase,
  Heart,
  MapPinned,
  CalendarDays,
  Users,
  Star,
  ShieldCheck,
  Clock3,
  Phone,
  MessageCircle,
  Sparkles,
  CheckCircle2,
  Car,
  Luggage,
  PartyPopper,
  Mountain,
  Fuel,
  Headphones,
} from 'lucide-react'
import { COMPANY, whatsappLink } from '@/lib/constants'

const services = [
  {
    icon: Plane,
    title: 'Airport Transfers',
    slug: 'airport-transfers',
    tagline: 'Seamless pick-up & drop-off',
    description:
      'Drivers track your flight, arrive early, handle your luggage. Fixed fare — no surge, no meter.',
    features: ['Flight tracking', 'Meet & greet', '60 min free wait', 'All airports', 'Fixed pricing', 'Luggage help'],
    image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1200&q=80',
    color: 'from-sky-500 to-blue-600',
    lightBg: 'bg-sky-50',
    accent: 'text-sky-600',
    reverse: false,
  },
  {
    icon: Briefcase,
    title: 'Corporate Travel',
    slug: 'corporate-travel',
    tagline: 'Professional rides for business',
    description:
      'Executive sedans, monthly billing, dedicated chauffeurs. Punctual, discreet, professional.',
    features: ['Executive sedans', 'Monthly billing', 'Dedicated drivers', 'Flexible schedule', 'GPS tracking', 'Confidential'],
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=80',
    color: 'from-violet-500 to-purple-600',
    lightBg: 'bg-violet-50',
    accent: 'text-violet-600',
    reverse: true,
  },
  {
    icon: Heart,
    title: 'Wedding & Events',
    slug: 'wedding-events',
    tagline: 'Make your special day perfect',
    description:
      'Decorated bridal cars, guest shuttles, multi-car packages. Event coordinator included.',
    features: ['Decorated cars', 'Guest shuttles', 'Multi-car deals', 'Event coordinator', 'Custom decor', 'On-time guarantee'],
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
    color: 'from-rose-500 to-pink-600',
    lightBg: 'bg-rose-50',
    accent: 'text-rose-600',
    reverse: false,
  },
  {
    icon: Mountain,
    title: 'Tour Packages',
    slug: 'tour-packages',
    tagline: 'Explore Bangladesh with ease',
    description:
      'Multi-day tours with driver-guides. Cox\'s Bazar, Sylhet, Bandarban — all-inclusive.',
    features: ['Multi-day tours', 'Driver-guide', 'Flexible dates', 'All-inclusive', 'Custom routes', 'Photo stops'],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80',
    color: 'from-emerald-500 to-teal-600',
    lightBg: 'bg-emerald-50',
    accent: 'text-emerald-600',
    reverse: true,
  },
  {
    icon: CalendarDays,
    title: 'Long-term Rentals',
    slug: 'long-term-rentals',
    tagline: 'Weekly & monthly packages',
    description:
      'Weeks or months — bigger savings. Insurance, maintenance, roadside assist included.',
    features: ['Weekly rates', 'Full insurance', 'Maintenance incl.', 'Roadside assist', 'Replacement car', 'No lock-in'],
    image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80',
    color: 'from-amber-500 to-orange-600',
    lightBg: 'bg-amber-50',
    accent: 'text-amber-600',
    reverse: false,
  },
  {
    icon: Users,
    title: 'Group Transportation',
    slug: 'group-transportation',
    tagline: 'Move together, arrive together',
    description:
      '12-seat Hiace to 35-seat coaches. School trips, outings, family reunions.',
    features: ['Hiace & coaches', 'Experienced drivers', 'Luggage space', 'AC comfort', 'Route planning', 'Rest stops'],
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=80',
    color: 'from-cyan-500 to-sky-600',
    lightBg: 'bg-cyan-50',
    accent: 'text-cyan-600',
    reverse: true,
  },
]

const stats = [
  { value: '8,500+', label: 'Happy trips completed' },
  { value: '40+', label: 'Expert drivers' },
  { value: '64', label: 'Districts covered' },
  { value: '24/7', label: 'Customer support' },
]

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-surface">
      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy via-navy-light to-navy-muted">
        <div className="absolute -left-24 -top-24 size-72 rounded-full bg-brand/25 blur-3xl" />
        <div className="absolute -bottom-32 right-0 size-96 rounded-full bg-sky-500/15 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:py-20 lg:px-6">
          <nav className="flex items-center gap-2 text-xs text-slate-300/70">
            <Link href="/" className="flex items-center gap-1.5 transition hover:text-white">
              <Home size={13} /> Home
            </Link>
            <span className="text-slate-300/40">/</span>
            <span className="text-brand-light">Our Services</span>
          </nav>

          <div className="mt-8 max-w-2xl">
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-light">
              <Sparkles size={13} /> What we offer
            </p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Services built around{' '}
              <span className="bg-gradient-to-r from-brand-light to-brand bg-clip-text text-transparent">
                your journey
              </span>
            </h1>
            <p className="mt-4 max-w-xl leading-7 text-slate-300/80">
              From airport pickups to wedding convoys, we provide tailored
              transportation solutions for every occasion across Bangladesh.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={`tel:${COMPANY.phone}`}
              className="flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              <Phone size={16} /> Call us
            </a>
            <a
              href={whatsappLink('Hello, I would like to know more about your services.')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-[#25d366] px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#1fbd5a]"
            >
              <MessageCircle size={16} /> WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ===== Service Sections (alternating image + text) ===== */}
      {services.map((s, idx) => {
        const Icon = s.icon
        return (
          <section
            key={s.slug}
            className={idx % 2 === 0 ? 'bg-white' : 'section-alt'}
          >
            <div className="mx-auto max-w-7xl px-5 py-16 lg:px-6">
              <div
                className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-14 ${
                  s.reverse ? 'lg:[direction:rtl]' : ''
                }`}
              >
                {/* Image */}
                <div className="relative lg:[direction:ltr]">
                  <div className="relative overflow-hidden rounded-3xl shadow-xl shadow-slate-200/60">
                    <img
                      src={s.image}
                      alt={s.title}
                      className="aspect-[4/3] w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
                    <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3.5 py-1.5 text-xs font-bold text-navy shadow-lg backdrop-blur">
                      <Icon size={14} className={s.accent} /> {s.tagline}
                    </span>
                  </div>
                  {/* Decorative accent */}
                  <div
                    className={`absolute -bottom-4 -right-4 -z-10 size-24 rounded-3xl bg-gradient-to-br ${s.color} opacity-20 blur-xl`}
                  />
                </div>

                {/* Content */}
                <div className="lg:[direction:ltr]">
                  <p
                    className={`text-xs font-bold uppercase tracking-wider ${s.accent}`}
                  >
                    {s.tagline}
                  </p>
                  <h2 className="mt-2 text-3xl font-bold text-navy sm:text-4xl">
                    {s.title}
                  </h2>
                  <p className="mt-4 max-w-lg leading-7 text-slate-500">
                    {s.description}
                  </p>

                  {/* Features grid */}
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    {s.features.map((f) => (
                      <span
                        key={f}
                        className="flex items-center gap-2 text-sm text-slate-600"
                      >
                        <span
                          className={`grid size-5 shrink-0 place-items-center rounded-full ${s.lightBg}`}
                        >
                          <CheckCircle2 size={12} className={s.accent} />
                        </span>
                        {f}
                      </span>
                    ))}
                  </div>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <a
                      href="/contact"
                      className="btn-brand inline-flex items-center gap-2"
                    >
                      Get a quote <ArrowRight size={16} />
                    </a>
                    <a
                      href={whatsappLink(
                        `Hello, I'm interested in your ${s.title} service.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline inline-flex items-center gap-2"
                    >
                      <MessageCircle size={15} /> WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )
      })}

      {/* ===== How it works ===== */}
      <section className="section-alt py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-6">
          <div className="text-center">
            <p className="badge">Simple process</p>
            <h2 className="mt-2 text-3xl font-bold text-navy sm:text-4xl">
              How our services work
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-500">
              Three steps to a perfect ride — no complicated forms, no hidden fees.
            </p>
          </div>

          <div className="relative mt-12 grid gap-8 sm:grid-cols-3">
            {[
              {
                step: '01',
                icon: Car,
                title: 'Choose your service',
                text: 'Pick from our range of services — airport transfer, corporate travel, tour package, or any custom need.',
              },
              {
                step: '02',
                icon: MapPinned,
                title: 'Tell us your plan',
                text: 'Share your route, dates, and group size. We\'ll match you with the perfect vehicle and driver.',
              },
              {
                step: '03',
                icon: PartyPopper,
                title: 'Enjoy the ride',
                text: 'Sit back, relax, and let our professional drivers handle everything. Your journey, our responsibility.',
              },
            ].map((s) => {
              const Icon = s.icon
              return (
                <div key={s.step} className="relative text-center">
                  <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-brand to-brand-hover text-white shadow-lg shadow-orange-200/60">
                    <Icon size={28} />
                  </span>
                  <span className="mt-4 block text-5xl font-extrabold text-slate-100">
                    {s.step}
                  </span>
                  <h3 className="mt-2 text-lg font-bold text-navy">{s.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{s.text}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== Stats + Why choose us ===== */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="badge">The difference</p>
            <h2 className="mt-2 text-3xl font-bold text-navy sm:text-4xl">
              Why travelers choose us
            </h2>
            <p className="mt-4 max-w-lg leading-7 text-slate-500">
              We&apos;re not just another car rental — we&apos;re your travel
              partner. Here&apos;s what sets us apart.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { icon: ShieldCheck, title: 'Fully insured', text: 'Every vehicle is comprehensively insured for your peace of mind.' },
                { icon: Clock3, title: '24/7 availability', text: 'Book anytime, day or night. Our team never sleeps.' },
                { icon: Star, title: '4.9/5 rating', text: 'Thousands of happy travelers trust us with their journeys.' },
                { icon: Headphones, title: 'Live support', text: 'Real people ready to help whenever your journey calls.' },
              ].map(({ icon: Icon, title, text }) => (
                <div
                  key={title}
                  className="flex items-start gap-3 rounded-xl border border-slate-200 p-4 transition hover:border-brand/30 hover:shadow-md"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
                    <Icon size={18} />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-navy">{title}</p>
                    <p className="mt-0.5 text-xs leading-5 text-slate-500">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats card */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy via-navy-light to-navy-muted p-8 sm:p-10">
            <div className="absolute -right-10 -top-16 size-44 rounded-full bg-brand/20 blur-2xl" />
            <div className="absolute -bottom-20 right-24 size-40 rounded-full bg-blue-400/20 blur-2xl" />
            <div className="relative">
              <h3 className="text-2xl font-bold text-white">Traveling Bangladesh</h3>
              <p className="mt-2 text-sm text-slate-300/80">
                Your journey. Our responsibility.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-6">
                {stats.map((s) => (
                  <div key={s.label}>
                    <p className="text-3xl font-extrabold text-white">{s.value}</p>
                    <p className="mt-1 text-xs text-slate-400">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={`tel:${COMPANY.phone}`}
                  className="flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-navy shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-50"
                >
                  <Phone size={16} /> Call now
                </a>
                <a
                  href={whatsappLink('Hello, I would like to book a service.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full bg-[#25d366] px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#1fbd5a]"
                >
                  <MessageCircle size={16} /> WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="px-5 py-14">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 rounded-3xl bg-gradient-to-r from-brand via-[#ee8b2f] to-brand-hover px-8 py-12 shadow-xl shadow-orange-200/60 sm:flex-row sm:items-center lg:px-12">
          <div>
            <h2 className="text-3xl font-bold text-white">
              Ready to get started?
            </h2>
            <p className="mt-2 text-orange-100">
              Tell us about your trip and we&apos;ll make it happen.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={`tel:${COMPANY.phone}`}
              className="rounded-full bg-white px-6 py-3.5 font-bold text-navy shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-50"
            >
              Call us
            </a>
            <a
              href="/contact"
              className="rounded-full border border-white/40 px-6 py-3.5 font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
            >
              Get a quote
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
