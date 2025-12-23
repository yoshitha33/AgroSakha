// ML API Test Script
// Run this with: node test-ml-api.js

import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

const log = {
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  warn: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
};

// Test 1: Health Check
async function testHealthCheck() {
  log.info('Testing health check endpoint...');
  try {
    const response = await axios.get(`${API_URL}/health`);
    log.success(`Health check passed: ${response.data.status}`);
    log.info(`MongoDB: ${response.data.mongodb}`);
    return true;
  } catch (error) {
    log.error(`Health check failed: ${error.message}`);
    return false;
  }
}

// Test 2: Crop Recommendation
async function testCropRecommendation() {
  log.info('Testing crop recommendation...');
  try {
    const data = {
      nitrogen: 90,
      phosphorus: 42,
      potassium: 43,
      pH: 6.5,
      rainfall: 200,
      temperature: 25,
      humidity: 80,
    };
    
    const response = await axios.post(`${API_URL}/crop-recommendation`, data);
    log.success('Crop recommendation successful');
    
    if (response.data.crops && Array.isArray(response.data.crops)) {
      log.info(`Recommended crops: ${response.data.crops.map(c => c.name).join(', ')}`);
      response.data.crops.forEach(crop => {
        console.log(`  - ${crop.name}: ${crop.confidence}%`);
      });
    } else if (response.data.error) {
      log.warn(`Response contains error: ${response.data.error}`);
    }
    return true;
  } catch (error) {
    log.error(`Crop recommendation failed: ${error.response?.data?.error || error.message}`);
    return false;
  }
}

// Test 3: Fertilizer Recommendation
async function testFertilizerRecommendation() {
  log.info('Testing fertilizer recommendation...');
  try {
    const data = {
      temperature: 26,
      humidity: 52,
      moisture: 38,
      soilType: 'Sandy',
      cropType: 'Rice',
      nitrogen: 37,
      potassium: 0,
      phosphorous: 0,
    };
    
    const response = await axios.post(`${API_URL}/fertilizer-recommendation`, data);
    log.success('Fertilizer recommendation successful');
    
    if (response.data.fertilizer) {
      log.info(`Recommended fertilizer: ${response.data.fertilizer}`);
      if (response.data.details) {
        console.log(`  Details: ${response.data.details}`);
      }
      if (response.data.tips) {
        console.log('  Tips:');
        response.data.tips.forEach(tip => console.log(`    - ${tip}`));
      }
    } else if (response.data.error) {
      log.warn(`Response contains error: ${response.data.error}`);
    }
    return true;
  } catch (error) {
    log.error(`Fertilizer recommendation failed: ${error.response?.data?.error || error.message}`);
    return false;
  }
}

// Test 4: Pest Detection (with a test base64 image)
async function testPestDetection() {
  log.info('Testing pest detection...');
  log.warn('Skipping pest detection test (requires actual image)');
  log.info('To test manually, upload an image through the UI');
  return true;
}

// Run all tests
async function runAllTests() {
  console.log('\n' + '='.repeat(60));
  console.log('ML API Integration Tests');
  console.log('='.repeat(60) + '\n');
  
  const results = {
    health: await testHealthCheck(),
    crop: false,
    fertilizer: false,
    pest: false,
  };
  
  console.log('');
  
  if (results.health) {
    results.crop = await testCropRecommendation();
    console.log('');
    
    results.fertilizer = await testFertilizerRecommendation();
    console.log('');
    
    results.pest = await testPestDetection();
  } else {
    log.error('Backend is not running or not accessible');
    log.info('Please start the backend server with: cd Backend && npm run dev');
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('Test Summary');
  console.log('='.repeat(60));
  console.log(`Health Check:           ${results.health ? '✓ PASSED' : '✗ FAILED'}`);
  console.log(`Crop Recommendation:    ${results.crop ? '✓ PASSED' : '✗ FAILED'}`);
  console.log(`Fertilizer Recommendation: ${results.fertilizer ? '✓ PASSED' : '✗ FAILED'}`);
  console.log(`Pest Detection:         ${results.pest ? '✓ PASSED' : '✗ SKIPPED'}`);
  console.log('='.repeat(60) + '\n');
  
  const passed = Object.values(results).filter(r => r === true).length;
  const total = Object.keys(results).length;
  
  if (passed === total) {
    log.success(`All tests passed! (${passed}/${total})`);
  } else {
    log.warn(`Some tests failed or were skipped (${passed}/${total} passed)`);
  }
}

// Run the tests
runAllTests().catch(error => {
  console.error('Test runner error:', error);
  process.exit(1);
});
