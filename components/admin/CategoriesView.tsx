'use client'

import { useState } from 'react'
import {
  Bus,
  Car,
  CircleDollarSign,
  Pencil,
  TrendingUp,
  Truck,
  Users,
} from 'lucide-react'
import { categoryPricing } from '@/lib/adminData'

const iconMap = {
  sedan: Car,
  suv: TrendingUp,
  microbus: Truck,
  bus: Bus,
}

const sizeMap = {
  sedan: 'from-sky-500 to-blue-600',
  suv: 'from-brand to-brand-hover',
  microbus: 'from-emerald-500 to-teal-600',
  bus: 'from-navy to-navy-muted',
}

export function CategoriesView() {
  const [categories, setCategories] = useState(categoryPricing)

  function update(id: string, patch: Partial<(typeof categoryPricing)[number]>) {
    setCategories((prev) => prev.map((c) => (c.slug === id ? { ...c, ...patch } : c)))
  }

  return (
    <>
      <div className="mb-6">
        <h2 className="text-xl font-bold tracking-tight text-navy sm:text-2xl">Categories &amp; pricing</h2>
        <p className="mt-1 text-sm text-slate-500">
          Set base rates and per-kilometre charges for each vehicle category.
        </p>
      </div>

      {/* Overview chips */}
      <section className="grid gap-4 sm:grid-cols-3">
        <div className="card flex items-center gap-4 p-5">
          <span className="metric-icon bg-brand/10 text-brand">
            <Car size={19} />
          </span>
          <div>
            <p className="text-2xl font-bold text-navy">{categories.length}</p>
            <p className="text-xs text-slate-500">Active categories</p>
          </div>
        </div>
        <div className="card flex items-center gap-4 p-5">
          <span className="metric-icon bg-emerald-50 text-emerald-600">
            <Users size={19} />
          </span>
          <div>
            <p className="text-2xl font-bold text-navy">
              {categories.reduce((n, c) => n + c.vehicles, 0)}
            </p>
            <p className="text-xs text-slate-500">Vehicles in fleet</p>
          </div>
        </div>
        <div className="card flex items-center gap-4 p-5">
          <span className="metric-icon bg-amber-50 text-amber-600">
            <CircleDollarSign size={19} />
          </span>
          <div>
            <p className="text-2xl font-bold text-navy">
              ৳{Math.min(...categories.map((c) => c.baseRate)).toLocaleString()}
            </p>
            <p className="text-xs text-slate-500">Starting price / day</p>
          </div>
        </div>
      </section>

      {/* Category cards with editable pricing */}
      <section className="mt-6 grid gap-5 sm:grid-cols-2">
        {categories.map((cat) => {
          const Icon = iconMap[cat.icon]
          return (
            <div key={cat.slug} className="card overflow-hidden">
              <div className="flex items-center gap-4 border-b border-slate-100 bg-surface p-5">
                <span
                  className={`grid size-11 place-items-center rounded-xl bg-gradient-to-br text-white shadow-lg ${sizeMap[cat.icon]}`}
                >
                  <Icon size={20} />
                </span>
                <div>
                  <h3 className="font-bold text-navy">{cat.name}</h3>
                  <p className="text-xs text-slate-400">
                    {cat.vehicles} vehicles &middot; base rate ৳{cat.baseRate.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="p-5">
                <p className="text-xs text-slate-500">{cat.description}</p>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <label className="block">
                    <span className="mb-1.5 flex items-center gap-1 text-xs font-semibold text-slate-600">
                      <CircleDollarSign size={12} className="text-brand" /> Base rate / day (৳)
                    </span>
                    <input
                      type="number"
                      value={cat.baseRate}
                      onChange={(e) => update(cat.slug, { baseRate: Number(e.target.value) })}
                      className="input"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-slate-600">Per km (৳)</span>
                    <input
                      type="number"
                      value={cat.perKm}
                      onChange={(e) => update(cat.slug, { perKm: Number(e.target.value) })}
                      className="input"
                    />
                  </label>
                </div>

                <div className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-xs text-emerald-700">
                  Estimated Dhaka → Chattogram trip:{' '}
                  <b>৳{(cat.baseRate + cat.perKm * 250).toLocaleString()}</b> (250 km one-way)
                </div>
              </div>
            </div>
          )
        })}
      </section>

      {/* Price guide */}
      <section className="card mt-6">
        <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="flex items-center gap-2 font-bold text-navy">
              <Pencil size={16} className="text-brand" /> Popular trip price guide
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Suggested pricing customers see for common destinations.
            </p>
          </div>
        </div>
        <div className="grid gap-px bg-slate-100 sm:grid-cols-2">
          {[
            ['Dhaka → Chattogram', 'Sedan', '৳7,900'],
            ['Dhaka → Cox\'s Bazar', 'Microbus', '৳16,500'],
            ['Dhaka → Sylhet', 'SUV', '৳21,800'],
            ['Dhaka → Sundarbans', 'Bus', '৳26,000'],
            ['Dhaka → Rajshahi', 'Sedan', '৳6,200'],
            ['Dhaka → Saint Martin\'s', 'SUV', '৳24,300'],
          ].map(([route, cat, price]) => (
            <div key={route} className="flex items-center justify-between bg-white px-5 py-4">
              <div>
                <p className="text-sm font-semibold text-navy">{route}</p>
                <p className="mt-0.5 text-xs text-slate-400">
                  {cat} &middot; one-way with driver
                </p>
              </div>
              <p className="text-sm font-bold text-brand">{price}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default CategoriesView