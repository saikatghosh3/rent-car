export const ADMIN = {
  name: 'Admin',
  email: 'admin@gmail.com',
  password: 'admin1234',
  initials: 'AD',
  role: 'Administrator',
}

export const AUTH_SESSION_KEY = 'tbr-ac-admin'

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false
  return window.sessionStorage.getItem(AUTH_SESSION_KEY) === 'yes'
}

export function signIn(email: string, password: string): boolean {
  if (email.trim().toLowerCase() === ADMIN.email && password === ADMIN.password) {
    window.sessionStorage.setItem(AUTH_SESSION_KEY, 'yes')
    return true
  }
  return false
}

export function signOut(): void {
  window.sessionStorage.removeItem(AUTH_SESSION_KEY)
}