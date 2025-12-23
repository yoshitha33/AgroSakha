# AgroSakha - ML Integration Quick Start

## ✅ Integration Complete!

The ML models are now fully integrated with the React frontend. All three features are ready to use:

1. **Crop Recommendation** - Suggests best crops based on soil and weather conditions
2. **Fertilizer Recommendation** - Recommends optimal fertilizer type
3. **Pest/Disease Detection** - Identifies plant diseases from leaf images

## 🚀 Quick Start

### 1. Start MongoDB
Make sure MongoDB is running:
```bash
# Windows
mongod

# Linux/Mac
sudo systemctl start mongodb
```

### 2. Start Backend Server
```bash
cd Backend
npm install  # First time only
npm run dev
```

The backend should start on `http://localhost:5000`

### 3. Start Frontend
```bash
cd Frontend
npm install  # First time only
npm run dev
```

The frontend should start on `http://localhost:5173`

### 4. Install Python Dependencies
```bash
pip install numpy pillow transformers torch
```

## 🧪 Testing the Integration

### Option 1: Use the Web Interface
1. Open `http://localhost:5173` in your browser
2. Navigate to each ML feature page:
   - Crop Recommendation
   - Fertilizer Recommendation
   - Pest Detection
3. Fill in the forms and test each feature

### Option 2: Run Automated Tests
```bash
cd Backend/test
node test-ml-api.js
```

### Option 3: Test API Directly
Use the provided test cases in `ML_INTEGRATION_GUIDE.md`

## 📋 What Was Integrated

### Backend (Node.js + Express)
- ✅ ML Controller with 3 endpoints
- ✅ Python runner utility for executing ML scripts
- ✅ Proper error handling and timeouts
- ✅ CORS configuration for frontend access
- ✅ Request/response logging

### Frontend (React + Vite)
- ✅ Service layer for API calls
  - `cropService.js`
  - `fertilizerService.js`
  - `pestService.js`
- ✅ Three complete UI pages with forms
  - `CropRecommendation.jsx`
  - `FertilizerRecommendation.jsx`
  - `PestDetection.jsx`
- ✅ Proper state management (loading, errors, results)
- ✅ User-friendly error messages
- ✅ Console logging for debugging

### Python ML Scripts
- ✅ `crop_recommend.py` - Classification with fallback
- ✅ `fertilizer_recommend.py` - Recommendation with heuristics
- ✅ `plant_disease.py` - Image classification with HuggingFace

## 🔧 Configuration

### Backend Environment Variables
Create `Backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/agrosakha
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
PYTHON_PATH=python
```

### Frontend Environment Variables
Create `Frontend/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

## 📊 API Endpoints

All endpoints are prefixed with `/api`:

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/crop-recommendation` | POST | Get crop suggestions |
| `/fertilizer-recommendation` | POST | Get fertilizer advice |
| `/pest-detection` | POST | Detect plant diseases |
| `/health` | GET | Check server status |

## 🎯 Example Usage

### Crop Recommendation
```javascript
const response = await fetch('http://localhost:5000/api/crop-recommendation', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    nitrogen: 90,
    phosphorus: 42,
    potassium: 43,
    pH: 6.5,
    rainfall: 200,
    temperature: 25,
    humidity: 80
  })
});
const data = await response.json();
console.log(data.crops); // Array of crop recommendations
```

### Fertilizer Recommendation
```javascript
const response = await fetch('http://localhost:5000/api/fertilizer-recommendation', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    temperature: 26,
    humidity: 52,
    moisture: 38,
    soilType: 'Sandy',
    cropType: 'Rice',
    nitrogen: 37,
    potassium: 0,
    phosphorous: 0
  })
});
const data = await response.json();
console.log(data.fertilizer); // Fertilizer type
```

### Pest Detection
```javascript
// First, convert image to base64
const fileInput = document.getElementById('imageInput');
const file = fileInput.files[0];
const reader = new FileReader();
reader.onload = async (e) => {
  const base64 = e.target.result;
  
  const response = await fetch('http://localhost:5000/api/pest-detection', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ imageBase64: base64 })
  });
  const data = await response.json();
  console.log(data.label); // Disease name
  console.log(data.confidence); // Confidence %
};
reader.readAsDataURL(file);
```

## 🐛 Troubleshooting

### Backend Not Starting
- Check if MongoDB is running
- Verify `.env` file exists with correct values
- Check if port 5000 is available
- Run `npm install` to ensure dependencies are installed

### Frontend API Errors
- Verify backend is running on port 5000
- Check CORS settings in backend
- Ensure `VITE_API_URL` is set correctly in `.env`
- Check browser console for detailed errors

### Python Script Errors
- Install required packages: `pip install numpy pillow transformers torch`
- Verify Python is in PATH
- Check PYTHON_PATH in backend `.env`
- Look at backend console for Python error messages

### Model Not Found Warnings
- This is normal! The system will use fallback heuristics
- To use actual models, train them using scripts in `agri/backend/` and `agri/plant/fertilizer/`
- Models are optional; heuristic recommendations work without them

## 📚 Documentation

For detailed information, see:
- `ML_INTEGRATION_GUIDE.md` - Complete integration documentation
- Backend logs - Check console for request/response details
- Browser console - Check for frontend errors and API responses

## ✨ Features

### Crop Recommendation
- Input: Soil nutrients (N, P, K), pH, climate data
- Output: Top 3 crop suggestions with confidence scores
- Fallback: Heuristic recommendations if model unavailable

### Fertilizer Recommendation
- Input: Soil type, crop type, current nutrients, climate
- Output: Fertilizer type with application tips
- Fallback: Crop-specific heuristic recommendations

### Pest/Disease Detection
- Input: Leaf image (JPG, PNG, WEBP)
- Output: Disease name, confidence, leaf detection status
- Model: MobileNetV2 trained on plant diseases
- Auto-download: Model downloads from HuggingFace on first use

## 🎨 UI Features

All pages include:
- ✅ Clean, modern UI with Tailwind CSS
- ✅ Form validation
- ✅ Loading states with spinners
- ✅ Error messages
- ✅ Success result display
- ✅ Responsive design
- ✅ User guidance and tips

## 📝 Next Steps

1. **Test each feature** through the web interface
2. **Check browser console** for any errors
3. **Review backend logs** for Python script execution
4. **Train ML models** for better predictions (optional)
5. **Customize UI** to match your design requirements
6. **Add authentication** if needed for production

## 💡 Tips

- Use browser DevTools Network tab to inspect API calls
- Check backend console for Python output and errors
- Models download automatically on first use (pest detection)
- Fallback heuristics ensure features work without models
- All endpoints return JSON with consistent structure

## 🤝 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review `ML_INTEGRATION_GUIDE.md` for detailed info
3. Check backend and frontend console logs
4. Test API endpoints directly with the test script
5. Verify all services are running (MongoDB, Backend, Frontend)

---

**Status:** ✅ All ML models successfully integrated and ready to use!
