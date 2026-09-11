'use client'

import { useEffect, useState } from 'react'
import { isAuthenticated } from '@/lib/auth'
import type { ViewKey } from '@/lib/adminTypes'
import { AdminShell } from '@/components/admin/AdminShell'
import { DashboardView } from '@/components/admin/DashboardView'
import { FleetView } from '@/components/admin/FleetView'
import { BookingsView } from '@/components/admin/BookingsView'
import { CategoriesView } from '@/components/admin/CategoriesView'
import { ReviewsView } from '@/components/admin/ReviewsView'
import { SettingsView } from '@/components/admin/SettingsView'
import { SeoView } from '@/components/admin/SeoView'

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [checked, setChecked] = useState(false)
  const [active, setActive] = useState<ViewKey>('dashboard')

  useEffect(() => {
    setAuthed(isAuthenticated())
    setChecked(true)
  }, [])

  useEffect(() => {
    if (checked && !authed) {
      window.location.replace('/admin/login')
    }
  }, [checked, authed])

  if (!checked || !authed) {
    return null
  }

  return (
    <AdminShell active={active} onNavigate={setActive}>
      {active === 'dashboard' && <DashboardView onNavigate={setActive} />}
      {active === 'fleet' && <FleetView />}
      {active === 'bookings' && <BookingsView />}
      {active === 'categories' && <CategoriesView />}
      {active === 'reviews' && <ReviewsView />}
      {active === 'settings' && <SettingsView />}
      {active === 'seo' && <SeoView />}
    </AdminShell>
  )
}