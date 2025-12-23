# ML Integration Test Data

Use these sample data sets to test the ML features:

## 1. Crop Recommendation Test Cases

### Test Case 1: Rice Suitable Conditions
```json
{
  "nitrogen": 80,
  "phosphorus": 40,
  "potassium": 40,
  "pH": 6.5,
  "rainfall": 200,
  "temperature": 27,
  "humidity": 85
}
```
**Expected Result:** Rice should be top recommendation

### Test Case 2: Wheat Suitable Conditions
```json
{
  "nitrogen": 50,
  "phosphorus": 30,
  "potassium": 30,
  "pH": 7.0,
  "rainfall": 50,
  "temperature": 22,
  "humidity": 60
}
```
**Expected Result:** Wheat should be recommended

### Test Case 3: High NPK Values
```json
{
  "nitrogen": 120,
  "phosphorus": 80,
  "potassium": 80,
  "pH": 6.8,
  "rainfall": 150,
  "temperature": 25,
  "humidity": 70
}
```
**Expected Result:** Multiple crop options

## 2. Fertilizer Recommendation Test Cases

### Test Case 1: Rice in Sandy Soil
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
**Expected Result:** NPK 17-17-17

### Test Case 2: Wheat in Loamy Soil
```json
{
  "temperature": 20,
  "humidity": 65,
  "moisture": 45,
  "soilType": "Loamy",
  "cropType": "Wheat",
  "nitrogen": 45,
  "potassium": 20,
  "phosphorous": 30
}
```
**Expected Result:** NPK 20-10-10

### Test Case 3: Vegetables with Low Nutrients
```json
{
  "temperature": 25,
  "humidity": 70,
  "moisture": 50,
  "soilType": "Clay",
  "cropType": "Vegetables",
  "nitrogen": 10,
  "potassium": 5,
  "phosphorous": 5
}
```
**Expected Result:** NPK 20-20-20

### Test Case 4: Cotton in Black Soil
```json
{
  "temperature": 28,
  "humidity": 55,
  "moisture": 35,
  "soilType": "Chalky",
  "cropType": "Cotton",
  "nitrogen": 60,
  "potassium": 30,
  "phosphorous": 40
}
```
**Expected Result:** NPK 18-18-6

## 3. Pest Detection Test Cases

### Test Case 1: Healthy Leaf
Upload an image of a healthy green leaf
**Expected Result:** "Healthy" or specific healthy plant classification

### Test Case 2: Diseased Leaf
Upload an image showing disease symptoms (spots, discoloration, etc.)
**Expected Result:** Disease name with high confidence

### Test Case 3: Non-Leaf Image
Upload a non-plant image
**Expected Result:** Low confidence or isLeaf: false

## Test Images Sources

You can get test images from:
1. **PlantVillage Dataset:** https://www.kaggle.com/datasets/emmarex/plantdisease
2. **Google Images:** Search for "plant disease leaf"
3. **Take your own:** Photos of real plants in your area

Sample image search queries:
- "tomato bacterial spot leaf"
- "potato late blight"
- "corn common rust"
- "grape black rot"
- "healthy tomato leaf"

## Testing Workflow

### Backend API Testing (Using curl or Postman)

#### 1. Test Crop Recommendation
```bash
curl -X POST http://localhost:5000/api/crop-recommendation \
  -H "Content-Type: application/json" \
  -d '{
    "nitrogen": 80,
    "phosphorus": 40,
    "potassium": 40,
    "pH": 6.5,
    "rainfall": 200,
    "temperature": 27,
    "humidity": 85
  }'
```

#### 2. Test Fertilizer Recommendation
```bash
curl -X POST http://localhost:5000/api/fertilizer-recommendation \
  -H "Content-Type: application/json" \
  -d '{
    "temperature": 26,
    "humidity": 52,
    "moisture": 38,
    "soilType": "Sandy",
    "cropType": "Rice",
    "nitrogen": 37,
    "potassium": 0,
    "phosphorous": 0
  }'
```

#### 3. Test Health Endpoint
```bash
curl http://localhost:5000/api/health
```

### Frontend UI Testing

#### 1. Crop Recommendation Page
1. Navigate to Crop Recommendation page
2. Fill all required fields using Test Case 1 data
3. Click "Get Crop Recommendation"
4. Verify results display with crop names and confidence scores
5. Check browser console for any errors

#### 2. Fertilizer Recommendation Page
1. Navigate to Fertilizer Recommendation page
2. Fill all required fields using Test Case 1 data
3. Click "Get Recommendation"
4. Verify fertilizer type and tips are displayed
5. Check browser console for any errors

#### 3. Pest Detection Page
1. Navigate to Pest Detection page
2. Click "Upload Image" and select a leaf image
3. Preview should show the selected image
4. Click "Analyze"
5. Verify results show disease label and confidence
6. Check browser console for any errors

## Validation Checklist

### Backend Validation
- [ ] Server starts without errors
- [ ] MongoDB connection successful
- [ ] Health endpoint returns OK status
- [ ] Crop recommendation endpoint responds
- [ ] Fertilizer recommendation endpoint responds
- [ ] Pest detection endpoint responds
- [ ] Python scripts execute without errors
- [ ] Proper error messages for invalid input

### Frontend Validation
- [ ] All pages load without errors
- [ ] Forms validate required fields
- [ ] Loading states display during API calls
- [ ] Error messages display for failed requests
- [ ] Success results display correctly
- [ ] Images upload successfully
- [ ] Console shows API request/response logs
- [ ] No CORS errors in console

### Integration Validation
- [ ] Frontend can reach backend API
- [ ] API responses match expected format
- [ ] Error handling works end-to-end
- [ ] Python scripts receive correct data
- [ ] Results display in UI correctly
- [ ] All three ML features functional

## Expected Response Formats

### Crop Recommendation Response
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
    }
  ],
  "meta": {
    "source": "model",
    "ok": true
  }
}
```

### Fertilizer Recommendation Response
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

### Pest Detection Response
```json
{
  "label": "Tomato___Bacterial_spot",
  "confidence": 98.76,
  "isLeaf": true,
  "ok": true
}
```

### Error Response
```json
{
  "error": "Error message here",
  "ok": false
}
```

## Performance Benchmarks

Expected response times (with heuristic fallback):
- **Crop Recommendation:** < 2 seconds
- **Fertilizer Recommendation:** < 2 seconds
- **Pest Detection:** 3-10 seconds (first time, model download)
- **Pest Detection:** < 3 seconds (subsequent requests)

With trained models loaded:
- **Crop Recommendation:** < 1 second
- **Fertilizer Recommendation:** < 1 second
- **Pest Detection:** 2-5 seconds

## Common Test Scenarios

### Scenario 1: First-Time User
1. Start backend and frontend
2. Wait for model downloads (pest detection only)
3. Test all three features
4. Verify heuristic fallbacks work

### Scenario 2: With Trained Models
1. Place trained model files in correct directories
2. Restart backend
3. Test all three features
4. Verify model-based predictions work

### Scenario 3: Error Handling
1. Stop backend
2. Try submitting forms
3. Verify error messages display
4. Restart backend
5. Verify functionality restored

### Scenario 4: Invalid Input
1. Submit form with missing fields
2. Verify validation prevents submission
3. Submit with invalid values (negative numbers, etc.)
4. Verify server-side validation

## Debugging Tips

### Backend Debugging
- Check console for Python stdout/stderr
- Look for "Python Runner" log messages
- Verify Python process spawns successfully
- Check for timeout errors
- Validate JSON parsing works

### Frontend Debugging
- Open browser DevTools (F12)
- Check Network tab for API calls
- Verify request payload is correct
- Check response status and body
- Look at Console tab for errors
- Use React DevTools for state inspection

### Python Script Debugging
- Run scripts directly with test data
- Check for package import errors
- Verify model file paths
- Test JSON input/output manually
- Look for encoding issues

## Test Report Template

```
ML Integration Test Report
Date: ___________
Tester: ___________

Backend Tests:
[ ] Server starts successfully
[ ] MongoDB connected
[ ] Health check passes
[ ] Crop recommendation works
[ ] Fertilizer recommendation works
[ ] Pest detection works

Frontend Tests:
[ ] Crop recommendation page functional
[ ] Fertilizer recommendation page functional
[ ] Pest detection page functional
[ ] Error handling works
[ ] Loading states display
[ ] Results display correctly

Integration Tests:
[ ] End-to-end crop recommendation
[ ] End-to-end fertilizer recommendation
[ ] End-to-end pest detection
[ ] CORS configured correctly
[ ] No console errors

Issues Found:
1. ___________________________
2. ___________________________
3. ___________________________

Overall Status: PASS / FAIL
```

---

Save this test data and use it to verify your ML integration is working correctly!
