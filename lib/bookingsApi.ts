import type { Booking } from '@/lib/mockData'

export type BookingInput = {
  customer: string
  email: string
  phone: string
  pickup: string
  dropoff: string
  date: string
  passengers: number
  car?: string
}

export async function fetchBookings(): Promise<Booking[]> {
  const res = await fetch('/api/bookings', { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to load bookings')
  return res.json()
}

export async function submitBooking(input: BookingInput): Promise<Booking> {
  const res = await fetch('/api/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...input,
      route: `${input.pickup} → ${input.dropoff}`,
      car: input.car?.trim() || 'To be assigned',
    }),
  })
  if (!res.ok) throw new Error('Failed to submit booking')
  return res.json()
}

export async function updateBookingStatus(id: string, status: string): Promise<Booking> {
  const res = await fetch('/api/bookings', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, status }),
  })
  if (!res.ok) throw new Error('Failed to update booking')
  return res.json()
}