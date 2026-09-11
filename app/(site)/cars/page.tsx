'use client'

import { Suspense } from 'react'
import { useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowRight,
  CarFront,
  ChevronDown,
  Home,
  Search,
  SlidersHorizontal,
  Star,
  Users,
  X,
  Sparkles,
  ShieldCheck,
  Headphones,
} from 'lucide-react'
import { cars, Car } from '@/lib/mockData'
import { CarCard } from '@/components/cars/CarCard'
import { BookingPanel } from '@/components/booking/BookingPanel'

const categoryMeta: Record<string, { icon: typeof CarFront; color: string }> = {
  All: { icon: CarFront, color: 'from-brand to-brand-hover' },
  Sedan: { icon: CarFront, color: 'from-sky-500 to-blue-600' },
  SUV: { icon: Sparkles, color: 'from-emerald-500 to-teal-600' },
  Microbus: { icon: ArrowRight, color: 'from-amber-500 to-orange-600' },
  Bus: { icon: ArrowRight, color: 'from-violet-500 to-purple-600' },
}

const seatBuckets = ['Any', '5 seats', '7 seats', '12 seats', '35 seats']

function FleetContent() {
  const params = useSearchParams()
  const urlCategory = params.get('category') ?? 'All'

  const allCategories = ['All', ...Array.from(new Set(cars.map((c) => c.category)))]
  const normalizedCats = allCategories.map((c) => c.toLowerCase())

  const [category, setCategory] = useState<string>(
    normalizedCats.includes(urlCategory.toLowerCase())
      ? allCategories.find((c) => c.toLowerCase() === urlCategory.toLowerCase()) ?? 'All'
      : 'All'
  )
  const [seats, setSeats] = useState('Any')
  const [sort, setSort] = useState('featured')
  const [query, setQuery] = useState('')
  const [selectedCar, setSelectedCar] = useState<Car | null>(null)

  const seatFilter = seats === 'Any' ? 0 : Number(seats.split(' ')[0])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    let list = cars.filter(
      (car) =>
        (category === 'All' || car.category === category) &&
        (seatFilter === 0 || car.seats <= seatFilter + 1) &&
        (q === '' ||
          car.name.toLowerCase().includes(q) ||
          car.description.toLowerCase().includes(q))
    )
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price)
    if (sort === 'name') list = [...list].sort((a, b) => a.name.localeCompare(b.name))
    return list
  }, [category, seats, sort, query])

  const counts = useMemo(() => {
    const m = new Map<string, number>([['All', cars.length]])
    for (const c of cars) m.set(c.category, (m.get(c.category) ?? 0) + 1)
    return m
  }, [])

  function clearAll() {
    setCategory('All')
    setSeats('Any')
    setSort('featured')
    setQuery('')
  }

  const isFiltered = category !== 'All' || seats !== 'Any' || sort !== 'featured' || query !== ''

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
            <span className="text-brand-light">Our fleet</span>
          </nav>

          <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-light">
                <Sparkles size={13} /> Traveling Bangladesh fleet
              </p>
              <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                Find your perfect{' '}
                <span className="bg-gradient-to-r from-brand-light to-brand bg-clip-text text-transparent">
                  ride
                </span>
              </h1>
              <p className="mt-4 max-w-xl leading-7 text-slate-300/80">
                From city sedans to 35-seat luxury coaches — every vehicle is
                clean, insured, and driven by a professional.
              </p>
            </div>

            <div className="flex flex-wrap gap-6 text-white">
              {[
                { icon: CarFront, value: `${counts.get('All') ?? 0}+`, label: 'Vehicles' },
                { icon: Users, value: `${cars.reduce((n, c) => n + c.seats, 0)}+`, label: 'Seats' },
                { icon: ShieldCheck, value: '100%', label: 'Insured' },
                { icon: Headphones, value: '24/7', label: 'Support' },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-2xl bg-white/10 text-brand-light backdrop-blur">
                    <s.icon size={19} />
                  </span>
                  <div>
                    <p className="text-lg font-bold leading-none">{s.value}</p>
                    <p className="mt-1 text-[11px] uppercase tracking-wider text-slate-400">
                      {s.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Filter bar (overlap) ===== */}
      <section className="relative z-10 mx-auto -mt-6 max-w-7xl px-5 lg:px-6">
        <div className="card overflow-hidden !rounded-2xl shadow-xl shadow-slate-900/10">
          <div className="border-b border-slate-100 p-5">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              {/* Search */}
              <div className="relative w-full lg:max-w-xs">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by name or type..."
                  className="input py-3 pl-11"
                />
              </div>

              {/* Sort */}
              <div className="flex items-center gap-3">
                <SlidersHorizontal size={15} className="text-slate-400" />
                <div className="relative">
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="input appearance-none py-3 pr-9 font-medium capitalize"
                    aria-label="Sort vehicles"
                  >
                    <option value="featured">Featured first</option>
                    <option value="price-asc">Price: low to high</option>
                    <option value="price-desc">Price: high to low</option>
                    <option value="name">Name: A to Z</option>
                  </select>
                  <ChevronDown size={15} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
              </div>
            </div>

            {/* Category pills */}
            <div className="mt-5 flex flex-wrap gap-2">
              {allCategories.map((c) => {
                const meta = categoryMeta[c] ?? categoryMeta.All
                const Icon = meta.icon
                const active = category === c
                return (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-bold transition ${
                      active
                        ? `border-transparent bg-gradient-to-r ${meta.color} text-white shadow-md`
                        : 'border-slate-200 bg-white text-slate-600 hover:border-brand/50 hover:text-brand'
                    }`}
                  >
                    <Icon size={15} />
                    {c}
                    <span
                      className={`rounded-md px-1.5 py-0.5 text-[10px] ${
                        active ? 'bg-white/20' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {counts.get(c) ?? 0}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Seat buckets */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Group size
              </span>
              {seatBuckets.map((s) => (
                <button
                  key={s}
                  onClick={() => setSeats(s)}
                  className={`rounded-full px-3.5 py-1.5 text-[11px] font-semibold transition ${
                    seats === s
                      ? 'bg-navy text-white shadow'
                      : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Results bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-surface px-5 py-3.5">
            <p className="text-xs text-slate-500">
              Showing <b className="text-navy">{filtered.length}</b> of{' '}
              <b className="text-navy">{cars.length}</b> vehicles
            </p>
            <div className="flex items-center gap-4">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={13} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-[11px] font-semibold text-emerald-600">
                4.9/5 from 900+ trips
              </span>
              {isFiltered && (
                <button
                  onClick={clearAll}
                  className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-[11px] font-bold text-rose-500 transition hover:bg-rose-50"
                >
                  <X size={12} /> Clear filters
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Results ===== */}
      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-6">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((car, i) => (
            <CarCard
              key={car.id}
              car={car}
              premium={i === 0 && category === 'All' && !isFiltered}
              onBookNow={setSelectedCar}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="card mx-auto max-w-md py-16 text-center">
            <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-slate-100 text-slate-400">
              <Search size={24} />
            </span>
            <h3 className="mt-5 text-lg font-bold text-navy">No vehicles found</h3>
            <p className="mt-2 text-sm text-slate-500">
              Try a different category or group size, or remove your filters.
            </p>
            <button onClick={clearAll} className="btn-brand mt-6">
              Reset filters
            </button>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-14 flex flex-col items-start justify-between gap-6 rounded-3xl bg-gradient-to-r from-navy via-navy-light to-navy-muted px-8 py-10 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-2xl font-bold text-white">
              Can&apos;t decide? Just call us.
            </h3>
            <p className="mt-2 text-sm text-slate-300/80">
              Our team will match you with the perfect vehicle for your trip.
            </p>
          </div>
          <a href="tel:+8801712345678" className="btn-brand shrink-0">
            Call +880 1712-345678
          </a>
        </div>
      </section>

      {/* Booking sidebar panel */}
      {selectedCar && (
        <BookingPanel
          car={selectedCar}
          open={!!selectedCar}
          onClose={() => setSelectedCar(null)}
        />
      )}
    </main>
  )
}

export default function CarsPage() {
  return (
    <Suspense fallback={null}>
      <FleetContent />
    </Suspense>
  )
}