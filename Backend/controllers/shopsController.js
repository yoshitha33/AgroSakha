// Nearby Shops and Pest Control Controller
// This provides location-based services using Google Places API

import { Client } from '@googlemaps/google-maps-services-js'
import { config } from '../config/index.js'

const googleMapsClient = new Client({})

export async function getNearbyShops(req, res) {
  try {
    const { latitude, longitude, pincode, radius = 5000 } = req.body
    const radiusInKm = radius / 1000

    console.log('[getNearbyShops] Request:', { latitude, longitude, pincode, radius })

    if (!latitude || !longitude) {
      return res.status(400).json({
        success: false,
        error: 'Latitude and longitude are required'
      })
    }

    // Call Google Places API for real agricultural shops
    const response = await googleMapsClient.placesNearby({
      params: {
        location: { lat: latitude, lng: longitude },
        radius: radius,
        type: 'store',
        keyword: 'agricultural supply farm shop seeds fertilizer',
        key: config.GOOGLE_MAPS_API_KEY
      }
    })

    const shops = response.data.results.map(place => ({
      id: place.place_id,
      name: place.name,
      address: place.vicinity || place.formatted_address,
      latitude: place.geometry.location.lat,
      longitude: place.geometry.location.lng,
      distance: calculateRealDistance(
        latitude,
        longitude,
        place.geometry.location.lat,
        place.geometry.location.lng
      ),
      rating: place.rating || 0,
      totalRatings: place.user_ratings_total || 0,
      isOpen: place.opening_hours?.open_now ?? null,
      photos: place.photos?.map(photo => photo.photo_reference) || [],
      types: place.types || []
    }))

    // Sort by distance
    shops.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))

    // Fallback to mock data if no results found
    if (shops.length === 0) {
      console.log('[getNearbyShops] No real shops found, using mock data')
      const mockShops = [
      {
        id: 1,
        name: 'Green Agro Store',
        address: '123 Main Road, Village Center',
        latitude: latitude ? latitude + 0.01 : null,
        longitude: longitude ? longitude + 0.01 : null,
        distance: calculateDistance(latitude, longitude, 0.01),
        phone: '+91 98765 43210',
        type: 'agricultural_supply',
        rating: 4.5,
        open: true,
        hours: '9:00 AM - 7:00 PM',
        products: ['Seeds', 'Fertilizers', 'Tools', 'Pesticides']
      },
      {
        id: 2,
        name: 'Farmers Supply Depot',
        address: '45 Market Street, Near Bus Stand',
        latitude: latitude ? latitude + 0.02 : null,
        longitude: longitude ? longitude + 0.02 : null,
        distance: calculateDistance(latitude, longitude, 0.02),
        phone: '+91 91234 56789',
        type: 'agricultural_supply',
        rating: 4.2,
        open: false,
        hours: '8:00 AM - 6:00 PM',
        products: ['Seeds', 'Equipment', 'Fertilizers']
      },
      {
        id: 3,
        name: 'AgroMart',
        address: '78 Field Lane, Opp. School',
        latitude: latitude ? latitude + 0.03 : null,
        longitude: longitude ? longitude + 0.03 : null,
        distance: calculateDistance(latitude, longitude, 0.03),
        phone: '+91 99887 66554',
        type: 'agricultural_supply',
        rating: 4.7,
        open: true,
        hours: '8:30 AM - 8:00 PM',
        products: ['Seeds', 'Fertilizers', 'Tools', 'Irrigation']
      },
      {
        id: 4,
        name: 'Krishi Kendra',
        address: '22 Village Road, Near Temple',
        latitude: latitude ? latitude + 0.015 : null,
        longitude: longitude ? longitude + 0.015 : null,
        distance: calculateDistance(latitude, longitude, 0.015),
        phone: '+91 98888 77777',
        type: 'agricultural_supply',
        rating: 4.3,
        open: true,
        hours: '9:00 AM - 6:30 PM',
        products: ['Seeds', 'Organic Fertilizers', 'Bio-pesticides']
      }
    ]

      // Filter by radius (mock implementation)
      const filteredShops = mockShops.filter(shop => {
        const dist = parseFloat(shop.distance)
        return !isNaN(dist) && dist <= radiusInKm
      })

      // Sort by distance
      filteredShops.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))

      return res.json({
        success: true,
        count: filteredShops.length,
        shops: filteredShops,
        source: 'mock',
        location: {
          latitude,
          longitude,
          pincode,
          radius: radiusInKm
        }
      })
    }

    return res.json({
      success: true,
      count: shops.length,
      shops: shops,
      source: 'google_places',
      location: {
        latitude,
        longitude,
        pincode,
        radius: radiusInKm
      }
    })
  } catch (error) {
    console.error('getNearbyShops error:', error)
    return res.status(500).json({ 
      success: false,
      error: error.message || 'Failed to fetch nearby shops' 
    })
  }
}

export async function getNearbyPestControl(req, res) {
  try {
    const { latitude, longitude, pincode, radius = 5000 } = req.body
    const radiusInKm = radius / 1000

    console.log('[getNearbyPestControl] Request:', { latitude, longitude, pincode, radius })

    if (!latitude || !longitude) {
      return res.status(400).json({
        success: false,
        error: 'Latitude and longitude are required'
      })
    }

    // Call Google Places API for real pest control services
    const response = await googleMapsClient.placesNearby({
      params: {
        location: { lat: latitude, lng: longitude },
        radius: radius,
        keyword: 'pest control agricultural crop protection',
        key: config.GOOGLE_MAPS_API_KEY
      }
    })

    const services = response.data.results.map(place => ({
      id: place.place_id,
      name: place.name,
      address: place.vicinity || place.formatted_address,
      latitude: place.geometry.location.lat,
      longitude: place.geometry.location.lng,
      distance: calculateRealDistance(
        latitude,
        longitude,
        place.geometry.location.lat,
        place.geometry.location.lng
      ),
      rating: place.rating || 0,
      totalRatings: place.user_ratings_total || 0,
      isOpen: place.opening_hours?.open_now ?? null,
      photos: place.photos?.map(photo => photo.photo_reference) || [],
      types: place.types || [],
      emergency: place.types?.includes('emergency') || false
    }))

    // Sort by distance
    services.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))

    // Fallback to mock data if no results found
    if (services.length === 0) {
      console.log('[getNearbyPestControl] No real services found, using mock data')
      const mockPestServices = [
      {
        id: 1,
        name: 'Safe Pest Control',
        address: '12 Pest Lane, Market Area',
        latitude: latitude ? latitude + 0.018 : null,
        longitude: longitude ? longitude + 0.012 : null,
        distance: calculateDistance(latitude, longitude, 0.018),
        phone: '+91 90000 11122',
        type: 'pest_control',
        rating: 4.6,
        open: true,
        hours: '24/7 Service',
        services: ['Crop Pest Control', 'Fumigation', 'Organic Solutions'],
        emergency: true
      },
      {
        id: 2,
        name: 'Agro Pest Solutions',
        address: '99 Field Road, Near Hospital',
        latitude: latitude ? latitude + 0.025 : null,
        longitude: longitude ? longitude + 0.025 : null,
        distance: calculateDistance(latitude, longitude, 0.025),
        phone: '+91 95555 22334',
        type: 'pest_control',
        rating: 4.4,
        open: false,
        hours: '8:00 AM - 6:00 PM',
        services: ['Integrated Pest Management', 'Crop Protection'],
        emergency: false
      },
      {
        id: 3,
        name: 'Green Shield Pest Control',
        address: '56 Farm Avenue, Village Square',
        latitude: latitude ? latitude + 0.012 : null,
        longitude: longitude ? longitude + 0.015 : null,
        distance: calculateDistance(latitude, longitude, 0.012),
        phone: '+91 97777 88888',
        type: 'pest_control',
        rating: 4.8,
        open: true,
        hours: '7:00 AM - 9:00 PM',
        services: ['Organic Pest Control', 'Soil Treatment', 'Consultation'],
        emergency: true
      }
    ]

      // Filter by radius
      const filteredServices = mockPestServices.filter(service => {
        const dist = parseFloat(service.distance)
        return !isNaN(dist) && dist <= radiusInKm
      })

      // Sort by distance
      filteredServices.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))

      return res.json({
        success: true,
        count: filteredServices.length,
        services: filteredServices,
        source: 'mock',
        location: {
          latitude,
          longitude,
          pincode,
          radius: radiusInKm
        }
      })
    }

    return res.json({
      success: true,
      count: services.length,
      services: services,
      source: 'google_places',
      location: {
        latitude,
        longitude,
        pincode,
        radius: radiusInKm
      }
    })
  } catch (error) {
    console.error('getNearbyPestControl error:', error)
    return res.status(500).json({ 
      success: false,
      error: error.message || 'Failed to fetch pest control services' 
    })
  }
}

// Helper function to calculate real distance using Haversine formula
function calculateRealDistance(lat1, lon1, lat2, lon2) {
  const R = 6371 // Radius of Earth in kilometers
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c
  return distance.toFixed(1)
}

function toRad(degrees) {
  return degrees * (Math.PI / 180)
}

// Helper function for mock distance (fallback)
function calculateDistance(lat, lng, offset) {
  if (!lat || !lng) return '2.5'
  const distance = Math.sqrt(offset * offset * 2) * 111
  return distance.toFixed(1)
}
