export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

export function getAuthHeader() {
  return { Authorization: `Bearer ${localStorage.getItem('token')}` }
}

export function isAuthenticated() {
  return !!localStorage.getItem('token')
}
