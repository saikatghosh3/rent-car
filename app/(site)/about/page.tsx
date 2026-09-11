import Link from 'next/link'
import {
  ArrowRight,
  BadgeCheck,
  Bus,
  Car,
  CarFront,
  Clock3,
  Headphones,
  HeartHandshake,
  Home,
  MapPin,
  MessageCircle,
  Phone,
  Route,
  ShieldCheck,
  Sparkles,
  Target,
  Truck,
  Users,
  WalletCards,
} from 'lucide-react'
import { cars } from '@/lib/mockData'
import { COMPANY, whatsappLink } from '@/lib/constants'
import siteContent from '@/data/site-content.json'

const categoryMeta: Record<string, { icon: typeof Car; color: string; count: string }> = {
  Sedan: { icon: Car, color: 'from-sky-500 to-blue-600', count: '5+ vehicles' },
  SUV: { icon: CarFront, color: 'from-emerald-500 to-teal-600', count: '3+ vehicles' },
  Microbus: { icon: Truck, color: 'from-amber-500 to-orange-600', count: '4+ vehicles' },
  Bus: { icon: Bus, color: 'from-violet-500 to-purple-600', count: '3+ vehicles' },
}

const values: { icon: typeof ShieldCheck; title: string; text: string }[] = [
  {
    icon: ShieldCheck,
    title: 'Safety first, always',
    text: 'Every vehicle passes a full inspection before each booking, and drivers are verified and trained.',
  },
  {
    icon: WalletCards,
    title: 'Honest, clear pricing',
    text: 'The fare you agree on is the fare you pay. No hidden charges, no surprises at the end of the trip.',
  },
  {
    icon: HeartHandshake,
    title: 'Humans over robots',
    text: 'Message, call, or WhatsApp us anytime — a real member of our Dhaka team answers.',
  },
  {
    icon: Target,
    title: 'On-time, every time',
    text: 'Punctuality is a promise. Our drivers arrive early and plan routes around traffic.',
  },
]

export default function About() {
  const about = siteContent.about
  const story = about?.story
  const paragraphs: string[] = story?.paragraphs ?? []
  const standards: string[] = about?.standards ?? []
  const stats: [string, string][] = (about?.stats as [string, string][]) ?? []
  const routes = (siteContent.routes?.items ?? []).slice(0, 8)

  const categorySlugs = ['Sedan', 'SUV', 'Microbus', 'Bus']

  return (
    <main className="min-h-screen bg-surface">
      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy via-navy-light to-navy-muted">
        <div className="absolute -left-24 -top-24 size-72 rounded-full bg-brand/25 blur-3xl" />
        <div className="absolute -bottom-32 right-0 size-96 rounded-full bg-sky-500/15 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:py-24 lg:px-6">
          <nav className="flex items-center gap-2 text-xs text-slate-300/70">
            <Link href="/" className="flex items-center gap-1.5 transition hover:text-white">
              <Home size={13} /> Home
            </Link>
            <span className="text-slate-300/40">/</span>
            <span className="text-brand-light">About us</span>
          </nav>

          <div className="mt-8 grid items-end gap-10 lg:grid-cols-[1.2fr_.8fr]">
            <div>
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-light">
                <Sparkles size={13} /> {about?.tagline ?? 'About us'}
              </p>
              <h1 className="mt-3 max-w-2xl text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl">
                {about?.title ?? 'Made for the journey ahead.'}
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300/85">
                {about?.description}
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link href="/cars" className="btn-brand">
                  Browse our fleet <ArrowRight size={17} />
                </Link>
                <span className="flex items-center gap-2 text-sm text-slate-300/80">
                  <span className="flex gap-0.5 text-amber-400">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </span>
                  <span className="text-xs">
                    <b className="text-white">4.9/5</b> from 900+ trips
                  </span>
                </span>
              </div>
            </div>

            {/* Mini stat card */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur">
              <div className="grid grid-cols-2 gap-6">
                {stats.map(([value, label], i) => (
                  <div key={label} className={i % 2 === 1 ? 'text-right' : ''}>
                    <p className="text-3xl font-extrabold text-brand-light">{value}</p>
                    <p className="mt-1 text-xs uppercase tracking-wider text-slate-400">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-6 border-t border-white/10 pt-5">
                <p className="flex items-center gap-2 text-sm font-semibold text-white">
                  <BadgeCheck size={16} className="text-emerald-400" /> Licensed &amp; fully insured
                </p>
                <p className="mt-1.5 text-xs text-slate-400">
                  Registered transport company with professional, route-aware drivers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Story + standards ===== */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:py-20 lg:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_.95fr]">
          {/* Story */}
          <div>
            <p className="badge">{story?.tagline ?? 'Our story'}</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              {story?.title ?? 'A better way to travel Bangladesh'}
            </h2>
            <div className="mt-6 flex flex-col gap-5 leading-8 text-slate-600">
              {paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { icon: Users, value: '100k+', label: 'Kilometers driven' },
                { icon: Route, value: '64', label: 'Districts covered' },
                { icon: Clock3, value: '24/7', label: 'Support hours' },
                { icon: ShieldCheck, value: '100%', label: 'Insured trips' },
              ].map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-brand/40"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
                    <Icon size={18} />
                  </span>
                  <div>
                    <p className="text-lg font-extrabold leading-none text-navy">{value}</p>
                    <p className="mt-1 text-[11px] text-slate-400">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Standards card */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy via-navy-light to-navy-muted p-8 text-white shadow-xl shadow-navy/20">
              <div className="absolute -right-10 -top-10 size-40 rounded-full bg-brand/20 blur-2xl" />
              <div className="relative">
                <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-brand to-brand-hover text-white shadow-lg shadow-orange-950/40">
                  <BadgeCheck size={24} />
                </span>
                <h3 className="mt-5 text-2xl font-bold">Our standards</h3>
                <p className="mt-2 text-sm text-slate-300/80">
                  Non-negotiables on every single trip.
                </p>
                <ul className="mt-7 flex flex-col gap-4">
                  {standards.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-emerald-400/20 text-emerald-300">
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                        >
                          <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span className="text-sm leading-6 text-slate-200">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Floating image card */}
            <div className="relative -mt-6 ml-auto w-[78%] overflow-hidden rounded-2xl border-4 border-white shadow-xl">
              <img
                src={cars[0].image}
                alt="Traveling Bangladesh fleet"
                className="aspect-[16/9] w-full object-cover"
              />
              <span className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold text-navy shadow-md">
                <MapPin size={12} className="text-brand" /> Dhaka headquarters
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== What we offer ===== */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="badge">What we offer</p>
              <h2 className="mt-2 text-3xl font-bold text-navy sm:text-4xl">
                A vehicle for every occasion
              </h2>
              <p className="mt-3 max-w-xl text-slate-500">
                From city quick trips to coast-to-coast group tours, our fleet is
                clean, insured, and always with a professional driver.
              </p>
            </div>
            <Link href="/cars" className="arrow-link flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-hover">
              View entire fleet <ArrowRight size={16} />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categorySlugs.map((slug, i) => {
              const meta = categoryMeta[slug]
              const Icon = meta.icon
              const liveCount = cars.filter((c) => c.category === slug).length
              const gradients = [
                'from-sky-500 to-blue-600',
                'from-emerald-500 to-teal-600',
                'from-amber-500 to-orange-600',
                'from-violet-500 to-purple-600',
              ]
              return (
                <Link
                  key={slug}
                  href={`/cars?category=${encodeURIComponent(slug)}`}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1.5 hover:border-brand/30 hover:shadow-xl"
                >
                  <span className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${gradients[i]}`} />
                  <div className="flex items-start justify-between">
                    <span className={`grid size-12 place-items-center rounded-2xl bg-gradient-to-br ${gradients[i]} text-white shadow-lg transition duration-300 group-hover:scale-110`}>
                      <Icon size={22} />
                    </span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold text-slate-500 transition group-hover:bg-navy group-hover:text-white">
                      {liveCount} cars
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-navy">{slug}s</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {siteContent.categories?.items?.find((c) => c.slug === slug)?.text ?? meta.count}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-brand">
                    See options
                    <span className="grid size-6 place-items-center rounded-full border border-brand/30 transition group-hover:bg-brand group-hover:text-white">
                      <ArrowRight size={12} />
                    </span>
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== Values ===== */}
      <section className="section-alt py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="badge mx-auto w-fit">Our promise</p>
            <h2 className="mt-2 text-3xl font-bold text-navy sm:text-4xl">
              The values we travel by
            </h2>
            <p className="mt-4 text-slate-500">
              Four simple commitments that shape every booking we handle.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, text }, i) => (
              <div
                key={title}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1.5 hover:border-emerald-300/60 hover:shadow-xl hover:shadow-emerald-100/60"
              >
                <span className="absolute right-5 top-5 text-4xl font-extrabold text-slate-50 transition group-hover:text-emerald-100">
                  0{i + 1}
                </span>
                <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-200/60 transition duration-300 group-hover:scale-110">
                  <Icon size={22} />
                </span>
                <h3 className="mt-5 font-bold text-navy">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Where we go ===== */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-6">
          <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
            <div>
              <p className="badge">Serving all of Bangladesh</p>
              <h2 className="mt-2 text-3xl font-bold text-navy sm:text-4xl">
                Wherever you&apos;re headed, we go too
              </h2>
              <p className="mt-4 leading-7 text-slate-500">
                From the capital to the coast, from the tea gardens of Sylhet to
                the mangrove forests of the Sundarbans — tell us the route and
                we&apos;ll handle the rest.
              </p>
              <div className="mt-7 flex flex-wrap gap-2">
                {routes
                  .filter((_, i) => i % 2 === 0)
                  .map((r) => (
                    <span
                      key={`${r.from}-${r.to}`}
                      className="rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold text-navy transition hover:bg-brand hover:text-white"
                    >
                      {r.from} → {r.to}
                    </span>
                  ))}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {routes.map((r) => (
                <Link
                  key={`${r.from}-${r.to}`}
                  href={`/contact?from=${encodeURIComponent(r.from)}&to=${encodeURIComponent(r.to)}`}
                  className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition duration-300 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-lg"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
                    <MapPin size={17} />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-navy">
                      {r.from}
                      <ArrowRight size={11} className="mx-1 inline text-slate-300" />
                      {r.to}
                    </p>
                    <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-slate-400">
                      <Clock3 size={10} /> {r.duration}
                      <span className="text-slate-300">·</span>
                      from ৳{r.price.toLocaleString()}
                    </p>
                  </div>
                  <ArrowRight
                    size={15}
                    className="ml-auto shrink-0 text-brand opacity-0 transition group-hover:opacity-100"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Team CTA ===== */}
      <section className="mx-auto max-w-7xl px-5 py-14 lg:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand via-[#ee8b2f] to-brand-hover px-8 py-12 shadow-xl shadow-orange-200/60 sm:px-12">
          <div className="absolute -right-10 -top-16 size-56 rounded-full bg-white/10 blur-2xl" />
          <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-xl">
              <h2 className="flex items-center gap-2 text-2xl font-bold text-white sm:text-3xl">
                <Headphones size={26} /> Talk to a real person
              </h2>
              <p className="mt-3 leading-7 text-orange-100">
                Planning a trip? Have a question about pricing? Our Dhaka team is
                available 24/7 — call, message, or WhatsApp us any time.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={`tel:${COMPANY.phone}`}
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 font-bold text-navy shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-50"
              >
                <Phone size={17} /> {COMPANY.phone}
              </a>
              <a
                href={whatsappLink('Hello, I would like to plan a trip.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3.5 font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-navy-light"
              >
                <MessageCircle size={17} /> WhatsApp us
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}