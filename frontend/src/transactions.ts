import axios from 'axios'
import { API_URL, getAuthHeader } from './auth'

export async function getTransactions() {
  const res = await axios.get(`${API_URL}/api/transactions`, { headers: getAuthHeader() })
  return res.data
}

export async function createTransaction(data: any) {
  const res = await axios.post(`${API_URL}/api/transactions`, data, { headers: getAuthHeader() })
  return res.data
}

export async function getSpending() {
  const res = await axios.get(`${API_URL}/api/transactions/spending`, { headers: getAuthHeader() })
  return res.data
}

export async function getRecommendations() {
  const res = await axios.get(`${API_URL}/api/transactions/recommendations`, { headers: getAuthHeader() })
  return res.data
}
