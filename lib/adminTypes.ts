export type ViewKey =
  | 'dashboard'
  | 'fleet'
  | 'bookings'
  | 'categories'
  | 'reviews'
  | 'settings'
  | 'seo'

export const statusStyles: Record<string, string> = {
  Pending: 'status-pending',
  Confirmed: 'status-confirmed',
  Cancelled: 'status-cancelled',
  completed: 'status-confirmed',
  published: 'status-confirmed',
  hidden: 'bg-slate-100 text-slate-600',
}

export const toneStyles: Record<string, string> = {
  '': 'bg-slate-100 text-slate-600',
  blue: 'bg-blue-50 text-blue-600',
  green: 'bg-emerald-50 text-emerald-600',
  amber: 'bg-amber-50 text-amber-600',
  rose: 'bg-rose-50 text-rose-600',
  
}