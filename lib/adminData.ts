import { cars, bookings, testimonials } from '@/lib/mockData'
import notificationsData from '@/data/notifications.json'
import type { Car, Booking } from '@/lib/mockData'

export type AdminNotification = {
  id: string
  type: 'booking' | 'review' | 'car' | 'system'
  title: string
  description: string
  time: string
  read: boolean
}

export const notifications = notificationsData as AdminNotification[]

export type CategoryPricing = {
  name: string
  slug: string
  baseRate: number
  perKm: number
  vehicles: number
  description: string
  icon: 'sedan' | 'suv' | 'microbus' | 'bus'
}

export type SiteReview = {
  id: string
  customer: string
  route: string
  date: string
  rating: number
  text: string
  status: 'published' | 'hidden'
}

export type SiteSetting = {
  brandName: string
  shortName: string
  phone: string
  whatsapp: string
  email: string
  address: string
  hours: string
  facebook: string
  instagram: string
}

export type SeoSettings = {
  title: string
  description: string
  keywords: string
  ogImage: string
  twitterHandle: string
  googleAnalyticsId: string
  noIndex: boolean
}

export const categoryPricing: CategoryPricing[] = [
  { name: 'Sedan', slug: 'Sedan', baseRate: 6500, perKm: 45, vehicles: 12, description: 'Smooth rides for city trips and business travel.', icon: 'sedan' },
  { name: 'SUV', slug: 'SUV', baseRate: 18000, perKm: 70, vehicles: 5, description: 'Command every road with space, power, and comfort.', icon: 'suv' },
  { name: 'Microbus', slug: 'Microbus', baseRate: 8500, perKm: 55, vehicles: 4, description: 'Perfect for families, small groups, and events.', icon: 'microbus' },
  { name: 'Bus', slug: 'Bus', baseRate: 28000, perKm: 95, vehicles: 3, description: 'Large group travel with luxury seating for everyone.', icon: 'bus' },
]

export const siteReviews: SiteReview[] = [
  { id: 'RV-1009', customer: 'Nusrat Jahan', route: 'Dhaka → Cox\'s Bazar', date: '02 Sep 2026', rating: 5, text: 'The car was spotless and the driver knew every shortcut. Completely stress-free.', status: 'published' },
  { id: 'RV-1008', customer: 'Tanvir Ahmed', route: 'Dhaka → Sylhet', date: '28 Aug 2026', rating: 5, text: 'Professional from the first message to the final drop-off. Highly recommended.', status: 'published' },
  { id: 'RV-1007', customer: 'Rafi & Ayesha', route: 'Dhaka → Purbachal', date: '21 Aug 2026', rating: 4, text: 'Hiace for our wedding guests — everything ran perfectly on schedule.', status: 'published' },
  { id: 'RV-1006', customer: 'Sadia Rahman', route: 'Dhaka → Chittagong', date: '15 Aug 2026', rating: 5, text: 'Very punctual driver and a clean, comfortable car. Will book again.', status: 'published' },
  { id: 'RV-1005', customer: 'Imran Kabir', route: 'Dhaka → Sundarbans', date: '09 Aug 2026', rating: 4, text: 'Good experience overall. The Land Cruiser handled the rough roads easily.', status: 'hidden' },
  { id: 'RV-1004', customer: 'Mahin & Co.', route: 'Dhaka → Rajshahi', date: '01 Aug 2026', rating: 5, text: 'Excellent service for our office trip. Fair price, great AC.', status: 'published' },
  { id: 'RV-1003', customer: 'Farhan Islam', route: 'Dhaka → Saint Martin\'s', date: '24 Jul 2026', rating: 5, text: 'Long journey but super comfortable. Water and snacks provided by driver.', status: 'published' },
  { id: 'RV-1002', customer: 'Tania Hossain', route: 'Dhaka → Khulna', date: '17 Jul 2026', rating: 4, text: 'Car was clean and fuel efficient. Pickup was 5 minutes early.', status: 'hidden' },
]

export const siteSettingDefaults: SiteSetting = {
  brandName: 'Traveling Bangladesh Rent A Car',
  shortName: 'Traveling Bangladesh',
  phone: '+880 1712-345678',
  whatsapp: '+8801712345678',
  email: 'hello@travelingbangladesh.com',
  address: 'House 12, Road 4, Dhanmondi, Dhaka 1205',
  hours: 'Open 24 hours, 7 days a week',
  facebook: 'https://facebook.com/travelingbangladesh',
  instagram: 'https://instagram.com/travelingbangladesh',
}

export const seoSettingDefaults: SeoSettings = {
  title: 'Traveling Bangladesh | Rent A Car',
  description: 'Safe, comfortable, and dependable car rental across Bangladesh with professional drivers.',
  keywords: 'rent a car bangladesh, car rental dhaka, taxi service bangladesh, microbus rent, suv rent',
  ogImage: '/icon-light-32x32.png',
  twitterHandle: '@tbr_car',
  googleAnalyticsId: 'G-XXXXXXX',
  noIndex: false,
}

export function fleetStats() {
  const perCategory = cars.reduce<Record<string, number>>((acc, c) => {
    acc[c.category] = (acc[c.category] ?? 0) + 1
    return acc
  }, {})
  return {
    totalCars: 24,
    available: 18,
    rented: 6,
    pending: bookings.filter((b) => b.status === 'Pending').length,
    perCategory,
    utilization: 64,
    revenue: 124000,
    trips: 321,
    growth: 12,
  }
}

export { cars, bookings, testimonials }
export type { Car, Booking }