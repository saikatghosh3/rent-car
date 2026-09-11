'use client'

import { useMemo, useState } from 'react'
import {
  Armchair,
  CarFront,
  Droplets,
  Fuel,
  Gauge,
  ListFilter,
  Pencil,
  Plus,
  Save,
  Search,
  Settings2,
  Trash2,
  Users,
  X,
} from 'lucide-react'
import { cars as initialCars } from '@/lib/adminData'
import type { Car } from '@/lib/mockData'

const emptyCar: Car = {
  id: '',
  name: '',
  category: 'Sedan',
  seats: 4,
  luggage: 2,
  fuel: 'Petrol',
  transmission: 'Automatic',
  price: 1000,
  image: '',
  description: '',
  features: ['AC', 'Bluetooth'],
}

const categories = ['Sedan', 'SUV', 'Microbus', 'Bus']

export function FleetView() {
  const [fleet, setFleet] = useState<Car[]>(initialCars)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [editing, setEditing] = useState<Car | null>(null)
  const [showModal, setShowModal] = useState(false)

  const filtered = useMemo(() => {
    return fleet.filter(
      (car) =>
        (category === 'All' || car.category === category) &&
        car.name.toLowerCase().includes(query.toLowerCase())
    )
  }, [fleet, query, category])

  const catCounts = useMemo(() => {
    const m = new Map<string, number>()
    m.set('All', fleet.length)
    for (const car of fleet) m.set(car.category, (m.get(car.category) ?? 0) + 1)
    return m
  }, [fleet])

  function openNew() {
    setEditing({ ...emptyCar, id: `CAR-${Date.now().toString().slice(-4)}` })
    setShowModal(true)
  }

  function openEdit(car: Car) {
    setEditing({ ...car })
    setShowModal(true)
  }

  function saveCar() {
    if (!editing) return
    if (!editing.name) return
    setFleet((prev) => {
      const exists = prev.some((c) => c.id === editing.id)
      return exists ? prev.map((c) => (c.id === editing.id ? editing : c)) : [editing, ...prev]
    })
    setShowModal(false)
  }

  function deleteCar(id: string) {
    setFleet((prev) => prev.filter((c) => c.id !== id))
  }

  return (
    <>
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-navy sm:text-2xl">Fleet management</h2>
          <p className="mt-1 text-sm text-slate-500">
            {fleet.length} vehicles in your fleet — {fleet.length} active and available to book.
          </p>
        </div>
        <button className="btn-brand" onClick={openNew}>
          <Plus size={16} /> Add new car
        </button>
      </div>

      {/* Stats */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="card flex items-center gap-4 p-5">
          <span className="metric-icon bg-slate-100 text-slate-600">
            <CarFront size={19} />
          </span>
          <div>
            <p className="text-2xl font-bold text-navy">{fleet.length}</p>
            <p className="text-xs text-slate-500">Total vehicles</p>
          </div>
        </div>
        <div className="card flex items-center gap-4 p-5">
          <span className="metric-icon bg-emerald-50 text-emerald-600">
            <Armchair size={19} />
          </span>
          <div>
            <p className="text-2xl font-bold text-navy">{fleet.reduce((n, c) => n + c.seats, 0)}</p>
            <p className="text-xs text-slate-500">Total seats</p>
          </div>
        </div>
        <div className="card flex items-center gap-4 p-5">
          <span className="metric-icon bg-amber-50 text-amber-600">
            <Fuel size={19} />
          </span>
          <div>
            <p className="text-2xl font-bold text-navy">
              {Math.round((fleet.filter((c) => c.fuel === 'Diesel').length / Math.max(fleet.length, 1)) * 100)}%
            </p>
            <p className="text-xs text-slate-500">Diesel vehicles</p>
          </div>
        </div>
        <div className="card flex items-center gap-4 p-5">
          <span className="metric-icon bg-rose-50 text-rose-600">
            <Gauge size={19} />
          </span>
          <div>
            <p className="text-2xl font-bold text-navy">{categories.length}</p>
            <p className="text-xs text-slate-500">Vehicle categories</p>
          </div>
        </div>
      </section>

      {/* Filter bar */}
      <section className="card mt-6 flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
            <ListFilter size={14} /> Category:
          </span>
          {['All', ...categories].map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                category === c
                  ? 'bg-navy text-white'
                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}
            >
              {c} <span className="opacity-60">({catCounts.get(c) ?? 0})</span>
            </button>
          ))}
        </div>
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search vehicles..."
            className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-xs text-navy outline-none focus:border-brand sm:w-56"
          />
        </div>
      </section>

      {/* Fleet table */}
      <section className="card mt-6 overflow-hidden">
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Vehicle</th>
                <th>Category</th>
                <th>Seats</th>
                <th>Transmission</th>
                <th>Price / day</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-sm text-slate-400">
                    No vehicles match your search.
                  </td>
                </tr>
              )}
              {filtered.map((car) => (
                <tr key={car.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <img
                        src={car.image || '/images/sedan.png'}
                        alt={car.name}
                        className="size-11 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-semibold text-navy">{car.name}</p>
                        <p className="text-[11px] text-slate-400">{car.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="text-slate-500">{car.category}</td>
                  <td className="text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <Users size={13} className="text-brand" /> {car.seats} seats
                    </span>
                  </td>
                  <td className="text-slate-500">{car.transmission}</td>
                  <td className="font-bold text-navy">
                    ৳{car.price.toLocaleString()}
                    <span className="font-normal text-slate-400">/day</span>
                  </td>
                  <td>
                    <span className="status status-confirmed">Active</span>
                  </td>
                  <td>
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => openEdit(car)}
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-brand/10 hover:text-brand"
                        aria-label={`Edit ${car.name}`}
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => deleteCar(car.id)}
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
                        aria-label={`Delete ${car.name}`}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Add/Edit modal */}
      {showModal && editing && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/50 px-4 py-8">
          <div className="mx-auto w-full max-w-2xl">
            <div className="card overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-100 bg-surface px-6 py-4">
                <h3 className="flex items-center gap-2 font-bold text-navy">
                  <Settings2 size={17} className="text-brand" />
                  {fleet.some((c) => c.id === editing.id) ? 'Edit vehicle' : 'Add new vehicle'}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="grid gap-4 p-6 sm:grid-cols-2">
                <label className="block sm:col-span-2">
                  <span className="mb-1.5 block text-xs font-semibold text-slate-600">Vehicle name</span>
                  <input
                    value={editing.name}
                    onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                    placeholder="e.g. Toyota Axio 2021"
                    className="input"
                  />
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-slate-600">Category</span>
                  <select
                    value={editing.category}
                    onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                    className="input"
                  >
                    {categories.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-slate-600">Price (BDT / day)</span>
                  <input
                    type="number"
                    value={editing.price}
                    onChange={(e) => setEditing({ ...editing, price: Number(e.target.value) })}
                    className="input"
                  />
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-slate-600">Seats</span>
                  <input
                    type="number"
                    value={editing.seats}
                    onChange={(e) => setEditing({ ...editing, seats: Number(e.target.value) })}
                    className="input"
                  />
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-slate-600">Luggage bags</span>
                  <input
                    type="number"
                    value={editing.luggage}
                    onChange={(e) => setEditing({ ...editing, luggage: Number(e.target.value) })}
                    className="input"
                  />
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-slate-600">Fuel type</span>
                  <select
                    value={editing.fuel}
                    onChange={(e) => setEditing({ ...editing, fuel: e.target.value })}
                    className="input"
                  >
                    <option>Petrol</option>
                    <option>Diesel</option>
                    <option>Hybrid</option>
                    <option>CNG</option>
                  </select>
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-slate-600">Transmission</span>
                  <select
                    value={editing.transmission}
                    onChange={(e) => setEditing({ ...editing, transmission: e.target.value })}
                    className="input"
                  >
                    <option>Automatic</option>
                    <option>Manual</option>
                  </select>
                </label>

                <label className="block">
                  <span className="mb-1.5 flex items-center gap-1 text-xs font-semibold text-slate-600">
                    <Droplets size={12} className="text-brand" /> Image URL
                  </span>
                  <input
                    value={editing.image}
                    onChange={(e) => setEditing({ ...editing, image: e.target.value })}
                    placeholder="/images/sedan.png"
                    className="input"
                  />
                </label>

                <label className="block sm:col-span-2">
                  <span className="mb-1.5 block text-xs font-semibold text-slate-600">Description</span>
                  <textarea
                    rows={2}
                    value={editing.description}
                    onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                    className="input resize-none"
                  />
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-slate-100 px-6 py-4">
                <button className="btn-outline" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button className="btn-brand" onClick={saveCar}>
                  <Save size={15} /> Save vehicle
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default FleetView