import { promises as fs } from 'fs'
import path from 'path'
import { NextRequest, NextResponse } from 'next/server'
import type { Booking } from '@/lib/mockData'

const FILE = path.join(process.cwd(), 'data', 'bookings.json')

async function readAll(): Promise<Booking[]> {
  try {
    const raw = await fs.readFile(FILE, 'utf-8')
    return JSON.parse(raw) as Booking[]
  } catch {
    return []
  }
}

async function writeAll(list: Booking[]) {
  await fs.writeFile(FILE, JSON.stringify(list, null, 2), 'utf-8')
}

export async function GET() {
  const all = await readAll()
  return NextResponse.json(all)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const all = await readAll()

  const customer = String(body.customer ?? '').trim()
  const pickup = body.pickup ? String(body.pickup).trim() : ''
  const dropoff = body.dropoff ? String(body.dropoff).trim() : ''
  const route = String(body.route ?? '').trim() || (pickup && dropoff ? `${pickup} → ${dropoff}` : '')
  if (!customer || !route) {
    return NextResponse.json({ error: 'Missing customer or route' }, { status: 400 })
  }

  const max = all.reduce(
    (m, b) => Math.max(m, parseInt(String(b.id).replace(/\D/g, ''), 10) || 0),
    1042
  )

  const booking: Booking = {
    id: `BK-${max + 1}`,
    customer,
    route,
    date: String(body.date ?? '').trim(),
    car: String(body.car ?? 'To be assigned').trim(),
    status: 'Pending',
    email: body.email ? String(body.email).trim() : undefined,
    phone: body.phone ? String(body.phone).trim() : undefined,
    passengers: typeof body.passengers === 'number' ? body.passengers : undefined,
    pickup: body.pickup ? String(body.pickup).trim() : undefined,
    dropoff: body.dropoff ? String(body.dropoff).trim() : undefined,
    createdAt: new Date().toISOString(),
  }

  all.unshift(booking)
  await writeAll(all)
  return NextResponse.json(booking, { status: 201 })
}

export async function PATCH(req: NextRequest) {
  const body = await req.json()
  const all = await readAll()
  const idx = all.findIndex((b) => b.id === body.id)
  if (idx === -1) {
    return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
  }
  const status = String(body.status ?? '').trim()
  if (!status) {
    return NextResponse.json({ error: 'Missing status' }, { status: 400 })
  }
  all[idx] = { ...all[idx], status }
  await writeAll(all)
  return NextResponse.json(all[idx])
}