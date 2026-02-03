import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api'

export async function getFertilizerRecommendation(data) {
  try {
    const res = await axios.post(`${API_URL}/fertilizer-recommendation`, data)
    return res.data
  } catch (error) {
    const errorMessage = error.response?.data?.error || error.message || 'Failed to get fertilizer recommendation'
    throw errorMessage
  }
}
