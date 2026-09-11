import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Briefcase,
  CheckCircle2,
  Clock3,
  Fuel,
  Gauge,
  Home,
  MapPin,
  Route,
  Star,
  Users,
} from 'lucide-react'
import { cars, testimonials } from '@/lib/mockData'
import { CarCard } from '@/components/cars/CarCard'
import { BookingSidebar } from '@/components/booking/BookingSidebar'
import siteContent from '@/data/site-content.json'

function getInitials(name: string) {
  return name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
}

export default async function CarDetails({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const car = cars.find((c) => c.id === id)
  if (!car) return notFound()

  const related = [
    ...cars.filter((c) => c.category === car.category && c.id !== car.id),
    ...cars.filter((c) => c.category !== car.category && c.id !== car.id),
  ].slice(0, 3)

  const routes = (siteContent.routes?.items ?? []).slice(0, 4)
  const reviews = testimonials.slice(0, 2)

  return (
    <main className="min-h-screen bg-surface">
      {/* ===== Hero / Gallery ===== */}
      <section className="relative overflow-hidden bg-white">
        <div className="mx-auto max-w-7xl px-5 pt-8 lg:px-6">
          <nav className="flex items-center gap-2 text-xs text-slate-400">
            <Link href="/" className="flex items-center gap-1.5 transition hover:text-brand">
              <Home size={13} /> Home
            </Link>
            <span>/</span>
            <Link href="/cars" className="transition hover:text-brand">
              Our fleet
            </Link>
            <span>/</span>
            <span className="font-semibold text-brand">{car.name}</span>
          </nav>
        </div>

        <div className="relative mx-auto max-w-7xl px-5 py-8 lg:px-6">
          <div className="relative overflow-hidden rounded-3xl shadow-xl shadow-slate-200/60">
            <img
              src={car.image}
              alt={car.name}
              className="aspect-[16/8] w-full object-cover sm:aspect-[16/7]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />

            {/* Floating badges */}
            <span className="absolute left-5 top-5 rounded-full bg-brand px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg">
              {car.category}
            </span>
            <span className="absolute right-5 top-5 flex items-center gap-1.5 rounded-full bg-white/95 px-3.5 py-1.5 text-xs font-bold text-navy shadow-lg">
              <Star size={13} className="fill-amber-400 text-amber-400" /> 4.9/5
            </span>

            <div className="absolute bottom-0 left-0 flex w-full flex-wrap items-end justify-between gap-4 p-6 sm:p-8">
              <div>
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-light">
                  <BadgeCheck size={14} /> Available for booking today
                </p>
                <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
                  {car.name}
                </h1>
                <p className="mt-2 flex items-center gap-3 text-sm text-slate-300">
                  <span>{car.transmission}</span>
                  <span className="size-1 rounded-full bg-slate-400" />
                  <span>{car.fuel}</span>
                  <span className="size-1 rounded-full bg-slate-400" />
                  <span>Model 2023</span>
                </p>
              </div>
              <div className="rounded-2xl bg-white/10 px-6 py-4 text-white backdrop-blur">
                <p className="text-[11px] uppercase tracking-widest text-slate-200">Starting from</p>
                <p className="mt-1 text-3xl font-extrabold">
                  ৳{car.price.toLocaleString()}
                  <span className="text-sm font-medium text-slate-300"> / day</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Body ===== */}
      <section className="mx-auto max-w-7xl px-5 py-6 lg:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.55fr_.9fr]">
          {/* Left column */}
          <div>
            {/* Spec tiles */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { icon: Users, label: 'Passengers', value: `${car.seats} seats`, tone: 'from-sky-500 to-blue-600' },
                { icon: Briefcase, label: 'Luggage', value: `${car.luggage} bags`, tone: 'from-emerald-500 to-teal-600' },
                { icon: Gauge, label: 'Gearbox', value: car.transmission, tone: 'from-amber-500 to-orange-600' },
                { icon: Fuel, label: 'Fuel type', value: car.fuel, tone: 'from-violet-500 to-purple-600' },
              ].map(({ icon: Icon, label, value, tone }) => (
                <div key={label} className="card flex items-center gap-3 p-4">
                  <span className={`grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${tone} text-white shadow-md`}>
                    <Icon size={18} />
                  </span>
                  <div>
                    <p className="text-[11px] text-slate-400">{label}</p>
                    <p className="text-sm font-bold text-navy">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="card mt-6 p-6 sm:p-8">
              <p className="badge">About this vehicle</p>
              <h2 className="mt-2 text-2xl font-bold text-navy">Comfort, safety, and style</h2>
              <p className="mt-4 leading-8 text-slate-600">{car.description}</p>

              <h3 className="mt-8 flex items-center gap-2 text-lg font-bold text-navy">
                <CheckCircle2 size={18} className="text-brand" /> What&apos;s included
              </h3>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {car.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-3 rounded-xl border border-slate-100 px-4 py-3 text-sm text-slate-600 transition hover:border-brand/40 hover:bg-brand/5"
                  >
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-600">
                      <CheckCircle2 size={14} />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Popular routes */}
            <div className="card mt-6 overflow-hidden">
              <div className="border-b border-slate-100 p-6">
                <h3 className="flex items-center gap-2 text-lg font-bold text-navy">
                  <Route size={18} className="text-brand" /> Popular routes for this car
                </h3>
              </div>
              <div className="grid divide-y divide-slate-100 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
                {routes.map((r) => (
                  <Link
                    key={`${r.from}-${r.to}`}
                    href={`/contact?from=${encodeURIComponent(r.from)}&to=${encodeURIComponent(r.to)}`}
                    className="group flex items-center gap-3 p-5 transition hover:bg-brand/5"
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
                      <MapPin size={17} />
                    </span>
                    <div className="min-w-0">
                      <p className="flex items-center gap-1.5 truncate font-bold text-navy">
                        {r.from}
                        <ArrowRight size={12} className="shrink-0 text-slate-300" />
                        {r.to}
                      </p>
                      <p className="mt-0.5 flex items-center gap-2 text-[11px] text-slate-400">
                        <Clock3 size={11} /> {r.duration}
                        <span>·</span>
                        <span>from ৳{r.price.toLocaleString()}</span>
                      </p>
                    </div>
                    <ArrowRight size={15} className="ml-auto shrink-0 text-brand opacity-0 transition group-hover:opacity-100" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="mt-6">
              <h3 className="flex items-center gap-2 text-lg font-bold text-navy">
                <Star size={17} className="fill-amber-400 text-amber-400" /> What travelers say
              </h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {reviews.map((t) => (
                  <div key={t.name} className="card p-5">
                    <div className="flex gap-0.5 text-amber-400">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} size={13} fill="currentColor" />
                      ))}
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-600">&ldquo;{t.quote}&rdquo;</p>
                    <div className="mt-4 flex items-center gap-3">
                      <span className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-brand to-brand-hover text-[11px] font-bold text-white">
                        {getInitials(t.name)}
                      </span>
                      <div>
                        <p className="text-sm font-bold text-navy">{t.name}</p>
                        <p className="text-[11px] text-slate-400">{t.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: booking aside */}
          <BookingSidebar car={car} />
        </div>
      </section>

      {/* ===== Related ===== */}
      <section className="mx-auto max-w-7xl px-5 py-14 lg:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="badge">Keep exploring</p>
            <h2 className="mt-2 text-2xl font-bold text-navy sm:text-3xl">
              You may also like
            </h2>
          </div>
          <Link href="/cars" className="arrow-link flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-hover">
            View entire fleet <ArrowRight size={16} />
          </Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {related.map((c) => (
            <CarCard key={c.id} car={c} />
          ))}
        </div>
      </section>

      {/* ===== Back link ===== */}
      <div className="mx-auto max-w-7xl px-5 pb-16 lg:px-6">
        <Link
          href="/cars"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-brand"
        >
          <ArrowLeft size={16} /> Back to fleet
        </Link>
      </div>
    </main>
  )
}