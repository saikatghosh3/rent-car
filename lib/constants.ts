import siteContent from '@/data/site-content.json'

export const COMPANY = siteContent.company
export const whatsappLink = (message: string) =>
  `https://wa.me/${COMPANY.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`
export const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/cars', label: 'Our Fleet' },
  { href: '/services', label: 'Our Services' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
]
