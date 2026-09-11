'use client'

import { useState } from 'react'
import { Check, Globe, LineChart, Rocket, Save, Search, Tag } from 'lucide-react'
import { seoSettingDefaults } from '@/lib/adminData'

export function SeoView() {
  const [form, setForm] = useState(seoSettingDefaults)
  const [saved, setSaved] = useState(false)

  function update<K extends keyof Omit<typeof form, 'noIndex'>>(key: K, value: string) {
    setSaved(false)
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function toggleNoIndex() {
    setSaved(false)
    setForm((prev) => ({ ...prev, noIndex: !prev.noIndex }))
  }

  function save() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-navy sm:text-2xl">SEO setup</h2>
          <p className="mt-1 text-sm text-slate-500">
            Search engine settings for the travel site — improve visibility on Google.
          </p>
        </div>
        <button className="btn-brand" onClick={save}>
          <Save size={15} /> Save changes
        </button>
      </div>

      {saved && (
        <div className="mb-6 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-semibold text-emerald-700">
          <Check size={15} /> SEO settings updated.
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <div className="card">
          <div className="border-b border-slate-100 p-5">
            <h3 className="flex items-center gap-2 font-bold text-navy">
              <LineChart size={16} className="text-brand" /> Page meta settings
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Title and description — used by Google and social media previews.
            </p>
          </div>

          <div className="grid gap-4 p-5">
            <label className="block">
              <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                <Tag size={12} className="text-brand" /> Meta title ({form.title.length}/60)
              </span>
              <input value={form.title} onChange={(e) => update('title', e.target.value)} className="input" />
            </label>
            <label className="block">
              <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                <Search size={12} className="text-brand" /> Meta description ({form.description.length}/160)
              </span>
              <textarea rows={3} value={form.description} onChange={(e) => update('description', e.target.value)} className="input resize-none" />
            </label>
            <label className="block">
              <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                <Globe size={12} className="text-brand" /> Keywords (comma separated)
              </span>
              <input value={form.keywords} onChange={(e) => update('keywords', e.target.value)} className="input" />
            </label>
          </div>

          <div className="border-t border-slate-100 p-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-slate-600">OG image URL</span>
                <input value={form.ogImage} onChange={(e) => update('ogImage', e.target.value)} className="input" />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-slate-600">Twitter handle</span>
                <input value={form.twitterHandle} onChange={(e) => update('twitterHandle', e.target.value)} className="input" />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-slate-600">Google Analytics ID</span>
                <input value={form.googleAnalyticsId} onChange={(e) => update('googleAnalyticsId', e.target.value)} className="input" />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-slate-600">Robots</span>
                <button
                  type="button"
                  onClick={toggleNoIndex}
                  className="input flex items-center justify-between text-left"
                >
                  <span>{form.noIndex ? 'noindex (hidden from search)' : 'index (visible in search)'}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${form.noIndex ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'}`}>
                    {form.noIndex ? 'OFF' : 'ON'}
                  </span>
                </button>
              </label>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {/* Live preview */}
          <div className="card">
            <div className="border-b border-slate-100 p-5">
              <h3 className="flex items-center gap-2 text-sm font-bold text-navy">
                <Globe size={15} className="text-brand" /> Google preview
              </h3>
            </div>
            <div className="p-5">
              <p className="text-xs text-emerald-700">{form.title.length > 60 ? 'Too long — keep under 60 chars' : 'Looks good'}</p>
              <p className="mt-3 flex items-center gap-1 text-xs text-slate-500">
                <Search size={11} /> {form.title}
              </p>
              <p className="mt-1 truncate text-[13px] text-blue-700">
                https://travelingbangladesh.com
              </p>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">{form.description}</p>
            </div>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-sky-600 to-blue-700 p-5 text-white">
            <p className="flex items-center gap-2 text-sm font-bold">
              <Rocket size={16} /> Next steps
            </p>
            <ul className="mt-3 flex flex-col gap-2 text-xs text-white/80">
              <li>• Submit your sitemap in Google Search Console.</li>
              <li>• Keep meta titles under 60 characters.</li>
              <li>• Add location pages like &ldquo;Dhaka to Sylhet car&rdquo;.</li>
              <li>• Get listed on Google Business Profile.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default SeoView