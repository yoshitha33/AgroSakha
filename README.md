# AgroSakha

A comprehensive agricultural management platform with ML-powered features for Indian farmers.

## ✨ Features

### ML-Powered Tools
- **🌾 Crop Recommendation** - AI suggests best crops based on soil and climate
- **🧪 Fertilizer Recommendation** - Smart fertilizer suggestions for optimal yield
- **🐛 Pest/Disease Detection** - Image-based plant disease identification

### Farm Management
- **💰 Expense Tracking** - Track and analyze farm expenses
- **📊 Budget Management** - Plan and manage farm budgets
- **☁️ Weather Integration** - Real-time weather data and forecasts
- **💵 Market Prices** - Current market prices for crops

### Information & Support
- **🏛️ Government Schemes** - Access agricultural schemes and documents
- **🤖 AI Chatbot** - Get farming advice and answers
- **🏪 Nearby Shops** - Find agricultural shops and resources

## 🚀 Quick Start

### Prerequisites
- Node.js v14+
- Python 3.8+
- MongoDB

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd AgroSakha
```

2. **Install Python dependencies**
```bash
pip install numpy pillow transformers torch
```

3. **Setup Backend**
```bash
cd Backend
npm install
cp .env.example .env  # Configure your environment variables
npm run dev
```

4. **Setup Frontend**
```bash
cd Frontend
npm install
cp .env.example .env  # Configure your environment variables
npm run dev
```

5. **Start MongoDB**
```bash
mongod
```

### Access the Application
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- API Documentation: http://localhost:5000/api/health

## 📚 Documentation

- **[Quick Start Guide](QUICKSTART.md)** - Get up and running quickly
- **[ML Integration Guide](ML_INTEGRATION_GUIDE.md)** - Detailed ML implementation docs
- **[Test Data](TEST_DATA.md)** - Sample data for testing ML features

## 🧪 Testing ML Features

Run the automated test suite:
```bash
cd Backend/test
node test-ml-api.js
```

Or test manually using the sample data in [TEST_DATA.md](TEST_DATA.md)

## 🏗️ Project Structure

```
AgroSakha/
├── Backend/                 # Node.js + Express backend
│   ├── controllers/        # Request handlers
│   ├── ml/                # Python ML scripts
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   └── utils/             # Utilities (Python runner, etc.)
├── Frontend/               # React + Vite frontend
│   └── src/
│       ├── components/    # Reusable components
│       ├── pages/         # Page components
│       └── services/      # API service layer
└── agri/                  # Legacy ML model files
```

## 🔧 Configuration

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/agrosakha
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
PYTHON_PATH=python
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## 🎯 ML Models

### Crop Recommendation
- **Input:** N, P, K, pH, rainfall, temperature, humidity
- **Output:** Top 3 crop suggestions with confidence scores
- **Fallback:** Heuristic-based recommendations

### Fertilizer Recommendation
- **Input:** Climate, soil type, crop type, current nutrients
- **Output:** Fertilizer type with application tips
- **Fallback:** Crop-specific recommendations

### Pest/Disease Detection
- **Model:** MobileNetV2 (HuggingFace)
- **Input:** Plant leaf image
- **Output:** Disease classification with confidence
- **Auto-download:** Model downloads on first use

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- Axios
- Lucide Icons

### Backend
- Node.js
- Express
- MongoDB + Mongoose
- Python integration

### ML/AI
- Python
- NumPy
- Pillow
- HuggingFace Transformers
- PyTorch

## 📊 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/crop-recommendation` | POST | Get crop suggestions |
| `/api/fertilizer-recommendation` | POST | Get fertilizer advice |
| `/api/pest-detection` | POST | Detect plant diseases |
| `/api/expenses` | GET/POST | Expense management |
| `/api/budgets` | GET/POST | Budget management |
| `/api/current-weather` | GET | Current weather |
| `/api/forecast` | GET | Weather forecast |
| `/api/health` | GET | Server health check |

## 🐛 Troubleshooting

### Backend not starting
- Verify MongoDB is running
- Check if port 5000 is available
- Ensure all npm packages are installed

### ML features not working
- Install Python dependencies: `pip install numpy pillow transformers torch`
- Verify Python is in PATH
- Check backend console for Python errors
- Models will use fallback heuristics if model files are missing (this is normal)

### CORS errors
- Verify FRONTEND_URL in backend .env
- Check VITE_API_URL in frontend .env
- Ensure both servers are running

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues and questions, please create an issue in the repository.

---

**Status:** ✅ ML Integration Complete - All features operational!
