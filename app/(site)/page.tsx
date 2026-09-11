import Link from 'next/link'
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  WalletCards,
  Headphones,
  Star,
  Plus,
  CheckCircle2,
  Route,
  MapPin,
  Clock3,
  Car,
  CarFront,
  Bus,
  Truck,
  MessageCircle,
  CalendarDays,
} from 'lucide-react'
import { cars, testimonials } from '@/lib/mockData'
import { CarCard } from '@/components/cars/CarCard'
import { BookingWidget } from '@/components/booking/BookingWidget'
import { COMPANY, navLinks, whatsappLink } from '@/lib/constants'
import siteContent from '@/data/site-content.json'

const benefits = [
  {
    icon: ShieldCheck,
    title: 'Professional drivers',
    text: 'Trained, verified, and courteous drivers who know Bangladesh.',
  },
  {
    icon: Sparkles,
    title: 'Clean & comfortable',
    text: 'Fresh, well-maintained vehicles with reliable AC.',
  },
  {
    icon: WalletCards,
    title: 'No hidden charges',
    text: 'Clear fares agreed upfront. No surprises at drop-off.',
  },
  {
    icon: Headphones,
    title: '24/7 support',
    text: 'Real people ready to help whenever your journey calls.',
  },
]

const heroStats = [
  { value: '8,500+', label: 'Happy trips' },
  { value: '40+', label: 'Expert drivers' },
  { value: '24/7', label: 'Support' },
  { value: '98%', label: 'Satisfaction' },
]

const stepIcons: Record<string, typeof MessageCircle> = {
  message: MessageCircle,
  check: CheckCircle2,
  car: Car,
  headset: Headphones,
}

const categoryIcons: Record<string, typeof Car> = {
  car: Car,
  'car-front': CarFront,
  bus: Bus,
  truck: Truck,
}

const routeColors: Record<
  string,
  { chip: string; bar: string }
> = {
  sky: { chip: 'bg-sky-500', bar: 'from-sky-500 to-blue-600' },
  emerald: { chip: 'bg-emerald-500', bar: 'from-emerald-500 to-teal-600' },
  amber: { chip: 'bg-amber-500', bar: 'from-amber-500 to-orange-600' },
  violet: { chip: 'bg-violet-500', bar: 'from-violet-500 to-purple-600' },
  rose: { chip: 'bg-rose-500', bar: 'from-rose-500 to-pink-600' },
  teal: { chip: 'bg-teal-500', bar: 'from-teal-500 to-cyan-600' },
}

export default function Home() {
  const faqItems = siteContent.faq?.items ?? []
  const faqTitle = siteContent.faq?.title ?? 'Frequently asked questions'
  const faqTagline = siteContent.faq?.tagline ?? 'Questions & answers'
  const faqDescription =
    siteContent.faq?.description ?? 'Everything you need to know before booking.'

  const routes = siteContent.routes?.items ?? []
  const routesSec = siteContent.routes
  const steps = siteContent.steps?.items ?? []
  const stepsSec = siteContent.steps
  const categories = siteContent.categories?.items ?? []
  const categoriesSec = siteContent.categories

  return (
    <main>
      {/* ========================= Hero ========================= */}
      <section className="relative overflow-hidden bg-white">
        {/* decorative blobs */}
        <div className="hero-blob left-[-120px] top-[-80px] size-[380px] bg-brand/40" />
        <div className="hero-blob right-[-100px] bottom-[-120px] size-[420px] bg-blue-400/40" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-[1.1fr_.9fr] lg:px-6 lg:py-24">
          {/* Left: copy */}
          <div className="max-w-2xl">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="trust-chip">
                <ShieldCheck size={15} className="text-emerald-600" />
                Licensed &amp; insured fleet
              </span>
              <span className="trust-chip">
                <Star size={15} className="text-brand" fill="currentColor" />
                4.9/5 traveler rating
              </span>
            </div>

            <p className="mb-5 text-sm font-semibold uppercase tracking-[.22em] text-brand">
              Travel with confidence
            </p>
            <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight text-navy sm:text-6xl">
              Your journey.
              <br />
              <span className="bg-gradient-to-r from-brand to-brand-hover bg-clip-text text-transparent">
                Our responsibility.
              </span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-8 text-slate-500">
              Safe, comfortable, and dependable car rentals for every road
              across Bangladesh. City rides, family trips, group tours — we
              take you anywhere.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/cars" className="btn-brand">
                Explore our fleet <ArrowRight size={18} />
              </Link>
              <a href={`tel:${COMPANY.phone}`} className="btn-outline">
                Call +880 1712-345678
              </a>
            </div>

            {/* Hero stats */}
            <div className="stats-strip mt-10 grid max-w-lg grid-cols-2 gap-6 pt-8 sm:grid-cols-4">
              {heroStats.map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-bold text-navy">{s.value}</p>
                  <p className="mt-1 text-xs text-slate-400">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: BookingWidget */}
          <div className="relative lg:ml-auto lg:w-full lg:max-w-md">
            <BookingWidget />
          </div>
        </div>
      </section>

      {/* ========================= Popular routes ========================= */}
      <section className="section-alt py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-6">
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="badge">{routesSec?.tagline ?? 'Popular routes'}</p>
              <h2 className="mt-2 text-3xl font-bold text-navy sm:text-4xl">
                {routesSec?.title ?? 'Where do you want to go?'}
              </h2>
              <p className="mt-3 max-w-xl text-slate-500">
                {routesSec?.description ??
                  'Hand-picked journeys our customers book most across Bangladesh.'}
              </p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {routes.map((r) => {
              const colors = routeColors[r.color] ?? routeColors.sky
              return (
                <Link
                  key={`${r.from}-${r.to}`}
                  href={`/contact?from=${encodeURIComponent(r.from)}&to=${encodeURIComponent(r.to)}`}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div
                    className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${colors.bar}`}
                  />
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span
                        className={`grid size-11 shrink-0 place-items-center rounded-xl ${colors.chip} text-white shadow-md`}
                      >
                        <Route size={20} />
                      </span>
                      <div>
                        <p className="flex items-center gap-1.5 text-lg font-bold text-navy">
                          {r.from}
                          <ArrowRight size={14} className="text-slate-300" />
                          <span>{r.to}</span>
                        </p>
                        <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                          <span className="flex items-center gap-1">
                            <MapPin size={12} /> {r.distance}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock3 size={12} /> {r.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                    <p className="text-sm text-slate-500">
                      From{' '}
                      <span className="text-lg font-bold text-brand">
                        ৳{r.price.toLocaleString()}
                      </span>
                      <span className="text-xs text-slate-400"> / trip</span>
                    </p>
                    <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-navy transition group-hover:bg-brand group-hover:text-white">
                      Book now
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ========================= How it works ========================= */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-6">
        <div className="text-center">
          <p className="badge">{stepsSec?.tagline ?? 'How it works'}</p>
          <h2 className="mt-2 text-3xl font-bold text-navy sm:text-4xl">
            {stepsSec?.title ?? 'Booked in minutes, not hours'}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-500">
            {stepsSec?.description ??
              'A simple, transparent process designed around your journey.'}
          </p>
        </div>

        <div className="relative mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => {
            const Icon = stepIcons[s.icon] ?? CheckCircle2
            return (
              <div key={s.title} className="relative group">
                <div className="card h-full p-6 pt-8 transition duration-300 hover:-translate-y-1.5 hover:border-brand/40 hover:shadow-xl hover:shadow-orange-200/50">
                  <div className="flex items-center justify-between">
                    <span className="relative grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-brand to-brand-hover text-white shadow-lg shadow-orange-200/70">
                      <Icon size={24} strokeWidth={2} />
                      <span className="absolute -right-1.5 -top-1.5 grid size-6 place-items-center rounded-full border-2 border-white bg-navy text-[10px] font-bold text-white">
                        {i + 1}
                      </span>
                    </span>
                    <span className="text-5xl font-extrabold leading-none text-slate-100 transition group-hover:text-brand/10">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-navy">{s.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{s.text}</p>
                  <span className="mt-5 block h-1 w-10 rounded-full bg-gradient-to-r from-brand to-brand-hover transition-all duration-300 group-hover:w-full" />
                </div>
                {i < steps.length - 1 && (
                  <ArrowRight
                    size={20}
                    className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 text-slate-300 lg:block"
                  />
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* ========================= Fleet preview ========================= */}
      <section className="section-alt py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="badge">Ready when you are</p>
              <h2 className="mt-2 text-3xl font-bold text-navy sm:text-4xl">
                Find the right ride
              </h2>
              <p className="mt-3 max-w-xl text-slate-500">
                Comfortable, clean, and road-ready vehicles with a professional
                driver included.
              </p>
            </div>
            <Link
              href="/cars"
              className="arrow-link flex items-center gap-2 self-start text-sm font-semibold text-brand hover:text-brand-hover"
            >
              View all cars <ArrowRight size={16} />
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {cars.slice(0, 3).map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </div>
      </section>

      {/* ========================= Categories ========================= */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="badge">{categoriesSec?.tagline ?? 'Choose your ride'}</p>
            <h2 className="mt-2 text-3xl font-bold text-navy sm:text-4xl">
              {categoriesSec?.title ?? 'A vehicle for every need'}
            </h2>
            <p className="mt-3 max-w-xl text-slate-500">
              {categoriesSec?.description ??
                'From quick city runs to cross-country group tours.'}
            </p>
          </div>
          <Link
            href="/cars"
            className="arrow-link flex items-center gap-2 self-start text-sm font-semibold text-brand hover:text-brand-hover"
          >
            Browse fleet <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c, i) => {
            const Icon = categoryIcons[c.icon] ?? Car
            const palettes = [
              'from-sky-500 to-blue-600 hover:shadow-sky-200/60',
              'from-emerald-500 to-teal-600 hover:shadow-emerald-200/60',
              'from-amber-500 to-orange-600 hover:shadow-amber-200/60',
              'from-violet-500 to-purple-600 hover:shadow-violet-200/60',
            ]
            return (
              <Link
                key={c.name}
                href={`/cars?category=${encodeURIComponent(c.slug)}`}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1.5 hover:border-brand/30 hover:shadow-xl"
              >
                <span className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${palettes[i % palettes.length]}`} />
                <div className="flex items-start justify-between">
                  <span
                    className={`grid size-12 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-lg transition duration-300 group-hover:scale-110 group-hover:rotate-3 ${palettes[i % palettes.length].replace(' hover:shadow-', ' shadow-')}`}
                  >
                    <Icon size={22} />
                  </span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold text-slate-500 transition group-hover:bg-navy group-hover:text-white">
                    {cars.filter((x) => x.category === c.slug).length} cars
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-bold text-navy">{c.name}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">{c.text}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-brand">
                  <span className="grid size-6 place-items-center rounded-full border border-brand/30 transition group-hover:bg-brand group-hover:text-white">
                    <ArrowRight size={12} />
                  </span>
                  View options
                </span>
              </Link>
            )
          })}
        </div>
      </section>

      {/* ========================= Benefits ========================= */}
      <section className="section-alt py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-6">
          <p className="badge">The difference is in the details</p>
          <h2 className="mt-2 text-3xl font-bold text-navy sm:text-4xl">
            Travel better with us
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map(({ icon: Icon, title, text }, i) => (
              <div
                key={title}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1.5 hover:border-emerald-300/60 hover:shadow-xl hover:shadow-emerald-100/50"
              >
                <span className="absolute right-5 top-5 text-4xl font-extrabold text-slate-50 transition group-hover:text-emerald-100">
                  0{i + 1}
                </span>
                <span className="relative grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-200/60 transition duration-300 group-hover:scale-110">
                  <Icon size={22} />
                </span>
                <h3 className="mt-5 font-bold text-navy">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
                <span className="mt-4 flex items-center gap-1 text-[11px] font-bold text-emerald-600 opacity-0 transition duration-300 group-hover:opacity-100">
                  Guaranteed on every trip <ArrowRight size={12} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= Testimonials ========================= */}
      <section className="section-alt py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-6">
          {/* Header */}
          <div className="text-center">
            <p className="badge">Loved by travelers</p>
            <h2 className="mt-2 text-3xl font-bold text-navy sm:text-4xl">
              They made every kilometer easy.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-500">
              From quick city rides to cross-country adventures, thousands of
              travelers trust us to get them there safely.
            </p>
          </div>

          {/* Cards */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-xl hover:shadow-orange-100/50"
              >
                {/* Quote icon */}
                <div className="mb-4 flex items-center justify-between">
                  <span className="grid size-10 place-items-center rounded-xl bg-brand/10 text-brand">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.3 5.2C7.5 6.8 5 10.1 5 14c0 3.3 2.7 6 6 6 2.8 0 5.2-1.9 5.8-4.5.3-1.3.4-2.7.2-4-.3-2.5-2.2-4.5-4.7-5.1V5.2zm10 0c-3.8 1.6-6.3 4.9-6.3 8.8 0 3.3 2.7 6 6 6 2.8 0 5.2-1.9 5.8-4.5.3-1.3.4-2.7.2-4-.3-2.5-2.2-4.5-4.7-5.1V5.2z"/>
                    </svg>
                  </span>
                  <div className="flex gap-0.5 text-amber-400">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>
                </div>

                {/* Quote */}
                <p className="flex-1 text-[15px] leading-7 text-slate-600">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-navy to-navy-light text-xs font-bold text-white shadow-md">
                    {t.initials}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-navy">{t.name}</p>
                    <p className="text-xs text-slate-400">{t.role}</p>
                  </div>
                  <span className="ml-auto flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-600">
                    <CheckCircle2 size={10} /> Verified
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= FAQ ========================= */}
      <section className="section-alt py-20">
        <div className="mx-auto max-w-4xl px-5 lg:px-6">
          <div className="text-center">
            <p className="badge">{faqTagline}</p>
            <h2 className="mt-2 text-3xl font-bold text-navy sm:text-4xl">
              {faqTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-500">
              {faqDescription}
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-4">
            {faqItems.map((item) => (
              <details key={item.question} className="faq-item">
                <summary className="faq-question">
                  <span>{item.question}</span>
                  <span className="faq-icon">
                    <Plus size={16} />
                  </span>
                </summary>
                <p className="faq-answer">{item.answer}</p>
              </details>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-sm text-slate-500">
              Still have questions?{' '}
              <Link
                href="/contact"
                className="font-semibold text-brand hover:text-brand-hover"
              >
                Talk to our team
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* ========================= CTA ========================= */}
      <section className="px-5 py-14">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 rounded-3xl bg-gradient-to-r from-brand via-[#ee8b2f] to-brand-hover px-8 py-12 shadow-xl shadow-orange-200/60 sm:flex-row sm:items-center lg:px-12">
          <div>
            <h2 className="text-3xl font-bold text-white">
              Need a car right now?
            </h2>
            <p className="mt-2 text-orange-100">
              Our team is one call away, 24 hours a day.
            </p>
          </div>
          <a
            href="tel:+8801712345678"
            className="rounded-full bg-white px-6 py-3.5 font-bold text-navy shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-50"
          >
            Call us immediately
          </a>
        </div>
      </section>
    </main>
  )
}