import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api'

export async function getNearbyShops(data) {
  try {
    const res = await axios.post(`${API_URL}/nearby-shops`, data)
    return res.data
  } catch (error) {
    const errorMessage = error.response?.data?.error || error.message || 'Failed to fetch nearby shops'
    throw errorMessage
  }
}

export async function getNearbyPestControl(data) {
  try {
    const res = await axios.post(`${API_URL}/nearby-pest-control`, data)
    return res.data
  } catch (error) {
    const errorMessage = error.response?.data?.error || error.message || 'Failed to fetch pest control services'
    throw errorMessage
  }
}

// Helper function to get user's current location
export function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'))
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        })
      },
      (error) => {
        let errorMessage = 'Unable to retrieve your location'
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location permission denied. Please enable location access.'
            break
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable'
            break
          case error.TIMEOUT:
            errorMessage = 'Location request timed out'
            break
        }
        reject(new Error(errorMessage))
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    )
  })
}
