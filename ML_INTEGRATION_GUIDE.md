# ML Models Integration Guide

## Overview
This guide explains how the ML models are integrated with the React frontend in the AgroSakha application.

## Architecture

### Backend Structure
```
Backend/
├── ml/                          # Python ML scripts
│   ├── crop_recommend.py        # Crop recommendation model
│   ├── fertilizer_recommend.py  # Fertilizer recommendation model
│   └── plant_disease.py         # Plant disease detection model
├── controllers/
│   └── mlController.js          # ML API controllers
├── routes/
│   └── ML.js                    # ML API routes
└── utils/
    └── pythonRunner.js          # Python script executor
```

### Frontend Structure
```
Frontend/src/
├── services/                    # API service layer
│   ├── cropService.js          # Crop API calls
│   ├── fertilizerService.js    # Fertilizer API calls
│   └── pestService.js          # Pest detection API calls
└── pages/                       # React pages
    ├── CropRecommendation.jsx
    ├── FertilizerRecommendation.jsx
    └── PestDetection.jsx
```

## API Endpoints

### 1. Crop Recommendation
**Endpoint:** `POST /api/crop-recommendation`

**Request Body:**
```json
{
  "nitrogen": 90,
  "phosphorus": 42,
  "potassium": 43,
  "pH": 6.5,
  "rainfall": 200,
  "temperature": 25,
  "humidity": 80
}
```

**Response:**
```json
{
  "crops": [
    {
      "name": "Rice",
      "confidence": 85.5
    },
    {
      "name": "Wheat",
      "confidence": 10.2
    },
    {
      "name": "Maize",
      "confidence": 4.3
    }
  ],
  "meta": {
    "source": "model",
    "ok": true
  }
}
```

### 2. Fertilizer Recommendation
**Endpoint:** `POST /api/fertilizer-recommendation`

**Request Body:**
```json
{
  "temperature": 26,
  "humidity": 52,
  "moisture": 38,
  "soilType": "Sandy",
  "cropType": "Rice",
  "nitrogen": 37,
  "potassium": 0,
  "phosphorous": 0
}
```

**Response:**
```json
{
  "fertilizer": "NPK 17-17-17",
  "details": "Model-based fertilizer recommendation",
  "tips": [
    "Apply in early morning or late evening",
    "Ensure proper soil moisture before application"
  ],
  "ok": true
}
```

### 3. Pest/Disease Detection
**Endpoint:** `POST /api/pest-detection`

**Request Body:**
```json
{
  "imageBase64": "data:image/jpeg;base64,/9j/4AAQSkZJRg..."
}
```

**Response:**
```json
{
  "label": "Tomato___Bacterial_spot",
  "confidence": 98.76,
  "isLeaf": true,
  "ok": true
}
```

## How It Works

### 1. Frontend Service Layer
Each service file provides a simple API interface:

```javascript
// cropService.js
export const getCropRecommendation = async (data) => {
  const response = await axios.post(`${API_URL}/crop-recommendation`, data);
  return response.data;
};
```

### 2. Backend Controller
The controller receives the request and calls the Python script:

```javascript
export async function cropRecommendation(req, res) {
  const script = path.join(mlDir, 'crop_recommend.py')
  const payload = {
    N: Number(nitrogen),
    P: Number(phosphorus),
    K: Number(potassium),
    ph: Number(pH),
    rainfall: Number(rainfall),
    temperature: Number(temperature),
    humidity: Number(humidity),
  }
  const result = await runPython(script, payload, { timeoutMs: 30000 })
  return res.json(result)
}
```

### 3. Python Runner
The `pythonRunner.js` utility:
1. Spawns a Python process
2. Sends JSON payload via stdin
3. Captures stdout/stderr
4. Parses JSON response
5. Returns to controller

### 4. Python ML Script
Each Python script:
1. Reads JSON from stdin
2. Loads the ML model (or uses heuristics)
3. Makes predictions
4. Outputs JSON to stdout

## Setup Instructions

### Prerequisites
1. **Node.js** (v14 or higher)
2. **Python** (v3.8 or higher)
3. **MongoDB** (running instance)

### Python Dependencies
Install required packages:
```bash
pip install numpy pillow transformers torch
```

### Backend Setup
1. Navigate to Backend directory:
```bash
cd Backend
```

2. Install Node dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/agrosakha
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

4. Start the backend:
```bash
npm run dev
```

### Frontend Setup
1. Navigate to Frontend directory:
```bash
cd Frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the frontend:
```bash
npm run dev
```

## Testing the Integration

### Test 1: Crop Recommendation
1. Navigate to the Crop Recommendation page
2. Fill in the form:
   - Nitrogen: 90
   - Phosphorus: 42
   - Potassium: 43
   - pH: 6.5
   - Rainfall: 200
   - Temperature: 25
   - Humidity: 80
3. Click "Get Crop Recommendation"
4. Verify you receive crop suggestions with confidence scores

### Test 2: Fertilizer Recommendation
1. Navigate to the Fertilizer Recommendation page
2. Fill in the form:
   - Temperature: 26
   - Humidity: 52
   - Moisture: 38
   - Soil Type: Sandy
   - Crop Type: Rice
   - Nitrogen: 37
   - Potassium: 0
   - Phosphorous: 0
3. Click "Get Recommendation"
4. Verify you receive fertilizer recommendation

### Test 3: Pest Detection
1. Navigate to the Pest Detection page
2. Upload an image of a plant leaf
3. Click "Analyze"
4. Verify you receive disease detection results

## ML Models

### Crop Recommendation Model
- **Location:** `agri/backend/crop_model.pkl`
- **Type:** Classification model
- **Features:** N, P, K, temperature, humidity, pH, rainfall
- **Output:** Top 3 crop recommendations with confidence scores
- **Fallback:** Heuristic-based recommendations if model not found

### Fertilizer Recommendation Model
- **Location:** `agri/plant/fertilizer/fertilizer_model.pkl`
- **Type:** Classification model
- **Features:** Temperature, humidity, moisture, soil type, crop type, N, P, K
- **Output:** Fertilizer type with application tips
- **Fallback:** Crop-based heuristic recommendations

### Plant Disease Detection Model
- **Model:** `linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification`
- **Type:** Image classification (HuggingFace Transformers)
- **Input:** Base64 encoded image
- **Output:** Disease label, confidence score, leaf detection
- **Cache:** Local model cache in `agri/plantdisease/leaf_model/`

## Troubleshooting

### Common Issues

#### 1. Python Script Timeout
**Error:** "Python script timed out"
**Solution:** 
- Increase timeout in controller (default: 30s for crop, 120s for fertilizer, 180s for pest)
- Check Python dependencies are installed
- Verify Python path is correct

#### 2. Model Files Not Found
**Error:** Model falls back to heuristics
**Solution:**
- Train and save models using the training scripts in `agri/backend/` and `agri/plant/fertilizer/`
- Ensure model files are in correct locations
- Models work with fallback heuristics if files missing

#### 3. CORS Errors
**Error:** "CORS policy blocked"
**Solution:**
- Verify backend CORS configuration in `middleware/index.js`
- Check FRONTEND_URL in backend `.env` matches frontend URL
- Ensure frontend uses correct API_URL in `.env`

#### 4. Image Upload Issues
**Error:** "Failed to detect pest"
**Solution:**
- Check image file size (should be < 10MB based on body-parser limit)
- Verify image format (JPG, PNG, WEBP supported)
- Ensure transformers package is installed for model

#### 5. API Connection Failed
**Error:** "Network Error" or "Failed to fetch"
**Solution:**
- Verify backend is running on port 5000
- Check VITE_API_URL in frontend `.env`
- Test API health: `http://localhost:5000/api/health`
- Check browser console for CORS or network errors

## Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/agrosakha
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
PYTHON_PATH=python  # or python3 on some systems
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## Response Handling

All ML endpoints follow this pattern:

**Success Response:**
```json
{
  // Model-specific data
  "ok": true
}
```

**Error Response:**
```json
{
  "error": "Error message",
  "ok": false
}
```

React pages handle both cases:
```javascript
try {
  const result = await mlService(data);
  setResult(result);
} catch (err) {
  setError(err.message || 'Operation failed');
}
```

## Performance Optimization

1. **Model Caching:** Models are loaded once and cached in memory
2. **Timeouts:** Different timeouts for different operations
3. **Fallbacks:** Heuristic recommendations when models unavailable
4. **Image Compression:** Consider implementing client-side compression for large images

## Future Enhancements

1. **Model Versioning:** Add version tracking for ML models
2. **Result Caching:** Cache common predictions
3. **Batch Processing:** Support multiple predictions in one request
4. **Progress Indicators:** Real-time progress for long operations
5. **Model Metrics:** Track accuracy and usage statistics
6. **A/B Testing:** Compare model versions

## Support

For issues or questions:
1. Check backend logs for Python errors
2. Check browser console for frontend errors
3. Verify all dependencies are installed
4. Test API endpoints directly using tools like Postman
5. Ensure all services are running (MongoDB, Backend, Frontend)
