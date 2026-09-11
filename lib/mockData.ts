import carsData from '@/data/cars.json'
import testimonialsData from '@/data/testimonials.json'
import bookingsData from '@/data/bookings.json'

export type Car = {
  id: string
  name: string
  category: string
  seats: number
  luggage: number
  fuel: string
  transmission: string
  price: number
  image: string
  description: string
  features: string[]
}

export type Testimonial = {
  quote: string
  name: string
  role: string
  initials: string
}

export type Booking = {
  id: string
  customer: string
  route: string
  date: string
  car: string
  status: string
  email?: string
  phone?: string
  passengers?: number
  pickup?: string
  dropoff?: string
  createdAt?: string
}

export const cars: Car[] = carsData as Car[]
export const testimonials: Testimonial[] = testimonialsData as Testimonial[]
export const bookings: Booking[] = bookingsData as Booking[]
