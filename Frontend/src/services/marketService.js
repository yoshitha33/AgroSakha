import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api'

export async function getMarketPrices(data = {}) {
  try {
    const res = await axios.post(`${API_URL}/market-prices`, {
      state: data.state || 'AP',
      cropType: data.cropType || null
    })
    return res.data
  } catch (error) {
    const errorMessage = error.response?.data?.error || error.message || 'Failed to fetch market prices'
    console.error('Market prices error:', errorMessage)
    throw errorMessage
  }
}

export async function getMarketPricesByCategory(category) {
  try {
    const res = await axios.post(`${API_URL}/market-prices`, {
      state: 'AP',
      cropType: category
    })
    return res.data
  } catch (error) {
    const errorMessage = error.response?.data?.error || error.message || 'Failed to fetch prices'
    throw errorMessage
  }
}
