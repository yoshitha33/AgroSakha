import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api'

export async function detectPest(imageBase64) {
  try {
    const res = await axios.post(`${API_URL}/pest-detection`, { imageBase64 })
    return res.data
  } catch (error) {
    const errorMessage = error.response?.data?.error || error.message || 'Failed to detect pest/disease'
    throw errorMessage
  }
}
