'use client'

import { useState } from 'react'
import {
  Building2,
  Check,
  Clock3,
  Globe,
  Mail,
  MapPin,
  Phone,
  Save,
  Share2,
  Smartphone,
} from 'lucide-react'
import { siteSettingDefaults } from '@/lib/adminData'

export function SettingsView() {
  const [form, setForm] = useState(siteSettingDefaults)
  const [saved, setSaved] = useState(false)

  function update<K extends keyof typeof form>(key: K, value: string) {
    setSaved(false)
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function save() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-navy sm:text-2xl">Site settings</h2>
          <p className="mt-1 text-sm text-slate-500">
            Company details shown across the website — footer, contact, and drivers.
          </p>
        </div>
        <button className="btn-brand" onClick={save}>
          <Save size={15} /> Save changes
        </button>
      </div>

      {saved && (
        <div className="mb-6 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-semibold text-emerald-700">
          <Check size={15} /> Settings saved successfully.
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <div className="card">
          <div className="border-b border-slate-100 p-5">
            <h3 className="flex items-center gap-2 font-bold text-navy">
              <Building2 size={16} className="text-brand" /> Business information
            </h3>
            <p className="mt-1 text-xs text-slate-500">Name, contact, and address shown to customers.</p>
          </div>

          <div className="grid gap-4 p-5 sm:grid-cols-2">
            <label className="block sm:col-span-2">
              <span className="mb-1.5 block text-xs font-semibold text-slate-600">Brand name</span>
              <input value={form.brandName} onChange={(e) => update('brandName', e.target.value)} className="input" />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold text-slate-600">Short name</span>
              <input value={form.shortName} onChange={(e) => update('shortName', e.target.value)} className="input" />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold text-slate-600">Business hours</span>
              <input
                value={form.hours}
                onChange={(e) => update('hours', e.target.value)}
                className="input"
                placeholder="e.g. Open 24 hours"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 flex items-center gap-1 text-xs font-semibold text-slate-600">
                <Phone size={12} className="text-brand" /> Phone
              </span>
              <input value={form.phone} onChange={(e) => update('phone', e.target.value)} className="input" />
            </label>
            <label className="block">
              <span className="mb-1.5 flex items-center gap-1 text-xs font-semibold text-slate-600">
                <Smartphone size={12} className="text-brand" /> WhatsApp (digits only)
              </span>
              <input value={form.whatsapp} onChange={(e) => update('whatsapp', e.target.value)} className="input" />
            </label>
            <label className="block sm:col-span-2">
              <span className="mb-1.5 flex items-center gap-1 text-xs font-semibold text-slate-600">
                <Mail size={12} className="text-brand" /> Support email
              </span>
              <input value={form.email} onChange={(e) => update('email', e.target.value)} className="input" />
            </label>
            <label className="block sm:col-span-2">
              <span className="mb-1.5 flex items-center gap-1 text-xs font-semibold text-slate-600">
                <MapPin size={12} className="text-brand" /> Office address
              </span>
              <textarea rows={2} value={form.address} onChange={(e) => update('address', e.target.value)} className="input resize-none" />
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="card">
            <div className="border-b border-slate-100 p-5">
              <h3 className="flex items-center gap-2 font-bold text-navy">
                <Share2 size={16} className="text-brand" /> Social links
              </h3>
              <p className="mt-1 text-xs text-slate-500">Appear in the site footer.</p>
            </div>
            <div className="grid gap-4 p-5">
              <label className="block">
                <span className="mb-1.5 flex items-center gap-1 text-xs font-semibold text-slate-600">
                  <Globe size={12} className="text-blue-600" /> Facebook
                </span>
                <input value={form.facebook} onChange={(e) => update('facebook', e.target.value)} className="input" />
              </label>
              <label className="block">
                <span className="mb-1.5 flex items-center gap-1 text-xs font-semibold text-slate-600">
                  <Globe size={12} className="text-pink-500" /> Instagram
                </span>
                <input value={form.instagram} onChange={(e) => update('instagram', e.target.value)} className="input" />
              </label>
            </div>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-navy to-navy-muted p-5 text-white">
            <p className="flex items-center gap-2 text-sm font-bold">
              <Clock3 size={16} className="text-brand-light" /> {form.hours}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-white/60">
              Customers appreciate 24/7 support. Keep your hours up to date so drivers stay reachable.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default SettingsView