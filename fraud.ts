import axios from 'axios'
import { API_URL, getAuthHeader } from './auth'

export async function getAlerts() {
  const res = await axios.get(`${API_URL}/api/fraud`, { headers: getAuthHeader() })
  return res.data
}

export async function resolveAlert(id: string) {
  const res = await axios.post(`${API_URL}/api/fraud/${id}/resolve`, {}, { headers: getAuthHeader() })
  return res.data
}
