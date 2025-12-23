# Nearby Shops Integration Guide

## Overview
The Nearby Shops feature allows farmers to discover agricultural supply stores and pest control services in their vicinity using geolocation or pincode search.

## Features

### 🏪 Nearby Agricultural Shops
- Find shops selling seeds, fertilizers, pesticides, and farming equipment
- View shop ratings, hours, and available products
- See distance from your location

### 🐛 Pest Control Services
- Locate professional pest control services
- Identify emergency services
- View service ratings and offerings

## Architecture

### Backend Components

#### 1. Routes (`Backend/routes/Shops.js`)
```javascript
POST /api/nearby-shops
POST /api/nearby-pest-control
```

**Request Format:**
```json
{
  "latitude": 28.7041,
  "longitude": 77.1025,
  "radius": 10,
  "pincode": "110001"  // Optional
}
```

**Response Format (Nearby Shops):**
```json
{
  "shops": [
    {
      "id": "1",
      "name": "Green Valley Agro Store",
      "distance": "1.2 km",
      "rating": 4.5,
      "address": "123 Main Street",
      "phone": "+91-9876543210",
      "hours": "9:00 AM - 7:00 PM",
      "isOpen": true,
      "products": ["Seeds", "Fertilizers", "Pesticides"]
    }
  ]
}
```

**Response Format (Pest Control):**
```json
{
  "services": [
    {
      "id": "1",
      "name": "AgriCare Pest Solutions",
      "distance": "0.8 km",
      "rating": 4.8,
      "address": "456 Service Road",
      "phone": "+91-9876543211",
      "hours": "24/7 Emergency",
      "isOpen": true,
      "services": ["Crop Protection", "Soil Treatment"],
      "isEmergency": true
    }
  ]
}
```

#### 2. Controller (`Backend/controllers/shopsController.js`)

**Functions:**
- `getNearbyShops(req, res)` - Returns agricultural shops near location
- `getNearbyPestControl(req, res)` - Returns pest control services
- `calculateDistance(lat1, lon1, lat2, lon2)` - Helper for distance calculation

**Current Implementation:**
- Uses mock data for development
- Calculates distances using Haversine formula
- Filters by radius (default: 10km)

### Frontend Components

#### 1. Service Layer (`Frontend/src/services/shopsService.js`)

**API Functions:**
```javascript
// Get nearby agricultural shops
getNearbyShops({ latitude, longitude, radius, pincode })

// Get nearby pest control services  
getNearbyPestControl({ latitude, longitude, radius, pincode })

// Get user's current location
getCurrentLocation()
```

**getCurrentLocation() Details:**
- Uses browser's Geolocation API
- Returns Promise with { latitude, longitude }
- Handles permission denied, position unavailable, timeout errors
- 10-second timeout for location acquisition
- High accuracy mode enabled

#### 2. UI Component (`Frontend/src/pages/NearbyShops.jsx`)

**Features:**
- **Current Location Detection**: Auto-detect user's GPS coordinates
- **Pincode Search**: Manual search using 6-digit pincode
- **Tab Navigation**: Switch between Shops and Pest Control
- **Star Ratings**: Visual rating display (1-5 stars)
- **Distance Display**: Shows distance from user
- **Open/Closed Status**: Real-time availability indicator
- **Product/Service Tags**: Color-coded badges
- **Loading States**: Animated loader during API calls
- **Error Handling**: User-friendly error messages

**State Management:**
```javascript
const [shops, setShops] = useState([])
const [pestServices, setPestServices] = useState([])
const [location, setLocation] = useState(null)
const [loading, setLoading] = useState(false)
const [error, setError] = useState(null)
const [activeTab, setActiveTab] = useState('shops')
const [pincode, setPincode] = useState('')
```

## User Flow

### Using Current Location

1. User clicks "Use Current Location" button
2. Browser requests geolocation permission
3. System detects coordinates (latitude, longitude)
4. Displays success message with location
5. Fetches both shops and pest control services in parallel
6. Updates UI with results in respective tabs

### Using Pincode Search

1. User enters 6-digit pincode
2. System validates format
3. Converts pincode to coordinates (currently mock)
4. Fetches services based on pincode
5. Displays results

## UI Components Breakdown

### Search Controls
- "Use Current Location" button with MapPin icon
- Pincode input field with Search button
- Loader animation during location detection

### Tab Navigation
- "Agricultural Shops" tab
- "Pest Control Services" tab
- Active tab highlighting

### Shop/Service Cards
```
┌─────────────────────────────────┐
│ Shop Name                 ⭐ 4.5│
│ 📍 1.2 km away                  │
│ 📍 123 Main Street              │
│ 📞 +91-9876543210               │
│ 🕒 9:00 AM - 7:00 PM     ✅ Open│
│ [Seeds] [Fertilizers]           │
└─────────────────────────────────┘
```

### Rating Display
- Gold stars (⭐) for rating points
- Gray stars (☆) for remaining points
- Numeric rating display

### Status Indicators
- Green "Open" badge
- Red "Closed" badge
- Blue "Emergency" badge (pest control)

## Testing

### Test Scenarios

1. **Current Location Detection**
   ```
   ✓ Allow location permission
   ✓ Verify latitude/longitude captured
   ✓ Check shops loaded in Shops tab
   ✓ Check services loaded in Pest Control tab
   ```

2. **Pincode Search**
   ```
   ✓ Enter valid 6-digit pincode
   ✓ Submit search
   ✓ Verify results display
   ```

3. **Tab Switching**
   ```
   ✓ Switch to Pest Control tab
   ✓ Verify services display
   ✓ Switch back to Shops tab
   ✓ Verify shops display
   ```

4. **Error Handling**
   ```
   ✓ Deny location permission → Error message displays
   ✓ Enter invalid pincode → Validation error
   ✓ Simulate network error → Error message displays
   ```

### Test Data

**Mock Shops (4 locations):**
- Green Valley Agro Store (1.2 km, 4.5★)
- Farm Fresh Supplies (2.5 km, 4.2★)
- AgriMart Central (3.8 km, 4.7★)
- Krishi Kendra Store (5.1 km, 4.3★)

**Mock Pest Services (3 locations):**
- AgriCare Pest Solutions (0.8 km, 4.8★, Emergency)
- Crop Protection Services (1.5 km, 4.6★)
- BioShield Pest Control (2.3 km, 4.4★)

## API Integration Steps

### Step 1: Backend Setup
```bash
# Ensure backend is running
cd Backend
npm install
npm run dev
```

### Step 2: Frontend Setup
```bash
# Ensure frontend is running
cd Frontend
npm install
npm run dev
```

### Step 3: Test Endpoints
```bash
# Test nearby shops endpoint
curl -X POST http://localhost:5000/api/nearby-shops \
  -H "Content-Type: application/json" \
  -d '{"latitude": 28.7041, "longitude": 77.1025, "radius": 10}'

# Test pest control endpoint
curl -X POST http://localhost:5000/api/nearby-pest-control \
  -H "Content-Type: application/json" \
  -d '{"latitude": 28.7041, "longitude": 77.1025, "radius": 10}'
```

### Step 4: Browser Testing
1. Navigate to `http://localhost:5173/nearby-shops`
2. Click "Use Current Location"
3. Allow geolocation permission
4. Verify shops display
5. Switch to "Pest Control Services" tab
6. Verify services display

## Future Enhancements

### Google Maps Integration
```javascript
// Replace mock distance calculation with Google Maps API
const calculateRealDistance = async (origin, destination) => {
  const service = new google.maps.DistanceMatrixService()
  // Implementation
}
```

### Real Pincode to Coordinates
```javascript
// Integrate geocoding API
const getPincodeCoordinates = async (pincode) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${pincode}`
  )
  // Parse and return coordinates
}
```

### Map View
- Add interactive Google Maps
- Show shop/service markers
- Display user location marker
- Enable directions to shop

### Additional Features
- **Favorite Shops**: Save frequently visited locations
- **Filters**: By rating, distance, products
- **Sort**: By distance, rating, hours
- **Reviews**: User-submitted shop reviews
- **Click-to-Call**: Direct phone calling
- **Directions**: Navigate to shop
- **Shop Hours**: Real-time open/closed status
- **Product Search**: Find specific products
- **Price Comparison**: Compare prices across shops

## Error Messages

### Geolocation Errors
- `"Please allow location access"` - Permission denied
- `"Unable to get your location"` - Position unavailable
- `"Location request timed out"` - Timeout (>10s)
- `"Geolocation not supported"` - Browser incompatibility

### Validation Errors
- `"Please enter a 6-digit pincode"` - Invalid format

### API Errors
- `"Failed to fetch shops"` - Network/server error
- `"No shops found nearby"` - Empty results

## Dependencies

### Backend
```json
{
  "express": "^4.18.2",
  "mongoose": "^7.5.0"
}
```

### Frontend
```json
{
  "react": "^19.1.0",
  "axios": "^1.6.2",
  "lucide-react": "^0.533.0"
}
```

## Browser Compatibility

### Geolocation API Support
- ✅ Chrome 5+
- ✅ Firefox 3.5+
- ✅ Safari 5+
- ✅ Edge 12+
- ✅ Opera 10.6+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

### Requirements
- HTTPS or localhost (geolocation security requirement)
- User permission for location access
- Enabled location services on device

## Troubleshooting

### Location Not Detected
1. Check browser console for errors
2. Verify HTTPS or localhost
3. Check device location services enabled
4. Try different browser
5. Clear browser permissions and retry

### No Results Found
1. Increase search radius in backend
2. Check mock data exists
3. Verify coordinates are valid
4. Check network tab for API response

### API Errors
1. Verify backend is running (`npm run dev`)
2. Check CORS configuration
3. Verify API endpoints in service file
4. Check backend logs for errors

## Security Considerations

### Location Privacy
- Only request location when needed
- Explain why location is needed
- Don't store location without permission
- Clear location data when done

### API Security
- Add rate limiting
- Validate coordinates range
- Sanitize pincode input
- Add authentication for production

## Performance Optimization

### Current Optimizations
- Parallel API calls using `Promise.all()`
- Debounced pincode search
- Cached location data in state
- Lazy loading of service data

### Future Optimizations
- Add service worker for offline support
- Cache API responses
- Implement virtual scrolling for large lists
- Add search radius selection
- Paginate results for large datasets

## Deployment Notes

### Environment Variables
```env
# Frontend (.env)
VITE_API_URL=https://your-backend-url.com

# Backend (.env)
PORT=5000
MONGODB_URI=your_mongodb_connection_string
NODE_ENV=production
```

### Production Checklist
- [ ] Replace mock data with real database
- [ ] Integrate Google Maps API
- [ ] Add real pincode geocoding
- [ ] Enable HTTPS
- [ ] Add rate limiting
- [ ] Set up error logging
- [ ] Add analytics tracking
- [ ] Configure CORS for production domain
- [ ] Add authentication if needed
- [ ] Optimize bundle size

## Support

For issues or questions:
1. Check console for error messages
2. Review API endpoint responses
3. Verify geolocation permissions
4. Check network connectivity

---

**Last Updated:** January 2025  
**Version:** 1.0.0  
**Status:** ✅ Fully Integrated and Functional
