import React, { useState } from 'react';
import { getCropRecommendation } from '../services/cropService';
import Layout from '../components/Layout';

export default function CropRecommendation() {
  const [formData, setFormData] = useState({
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    pH: '',
    rainfall: '',
    temperature: '',
    humidity: '',
    soilType: '',
    season: '',
    location: '',
    area: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Sample data for testing
  const sampleData = {
    nitrogen: 90,
    phosphorus: 42,
    potassium: 43,
    pH: 6.5,
    rainfall: 202.9,
    temperature: 20.8,
    humidity: 82.0,
    soilType: 'loamy',
    season: 'Kharif',
    location: 'Andhra Pradesh',
    area: '5'
  };

  const loadSampleData = () => {
    setFormData(sampleData);
    setError(null);
    setResult(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await getCropRecommendation(formData);
      console.log('Crop recommendation response:', response);
      setResult(response);
    } catch (err) {
      console.error('Crop recommendation error:', err);
      setError(typeof err === 'string' ? err : err.message || 'Failed to get recommendation');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600">
              Crop Recommendation
            </span>
          </h1>
        
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl shadow-sm animate-fade-in">
              {error}
            </div>
          )}

          {result && (
            <div className="mb-8 p-6 bg-gradient-to-br from-green-100 to-emerald-50 rounded-xl shadow-lg border border-green-200">
              <h2 className="text-xl font-semibold mb-4 text-green-800">Recommended Crops</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.isArray(result.crops) ? (
                  result.crops.map((crop, index) => (
                    <div key={index} 
                      className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-green-100">
                      <h3 className="font-medium text-green-700">{crop.name}</h3>
                      <div className="mt-2 h-2 bg-green-100 rounded-full">
                        <div 
                          className="h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                          style={{ width: `${crop.confidence}%` }}
                        />
                      </div>
                      <p className="text-sm text-gray-600 mt-2">{crop.confidence}% confidence</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-700">{result.recommendation || 'No specific recommendation available'}</p>
                )}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Sample Data Loading */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-900">New to this tool?</p>
                <p className="text-xs text-blue-700">Load sample data to see how crop recommendations work</p>
              </div>
              <button
                type="button"
                onClick={loadSampleData}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Load Sample Data
              </button>
            </div>

            {/* Basic Information Section */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-100">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                <span className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-2 text-green-600">1</span>
                Basic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Area (in acres)</label>
                  <input
                    type="number"
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Soil Properties Section */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-100">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                <span className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-2 text-green-600">2</span>
                Soil Properties
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nitrogen (N)</label>
                  <input
                    type="number"
                    name="nitrogen"
                    value={formData.nitrogen}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phosphorus (P)</label>
                  <input
                    type="number"
                    name="phosphorus"
                    value={formData.phosphorus}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Potassium (K)</label>
                  <input
                    type="number"
                    name="potassium"
                    value={formData.potassium}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">pH Level</label>
                  <input
                    type="number"
                    step="0.1"
                    name="pH"
                    value={formData.pH}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Soil Type</label>
                  <select
                    name="soilType"
                    value={formData.soilType}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    required
                  >
                    <option value="">Select soil type</option>
                    <option value="clay">Clay</option>
                    <option value="sandy">Sandy</option>
                    <option value="loamy">Loamy</option>
                    <option value="black">Black</option>
                    <option value="red">Red</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Climate Conditions Section */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-100">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                <span className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-2 text-green-600">3</span>
                Climate Conditions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Rainfall (mm)</label>
                  <input
                    type="number"
                    name="rainfall"
                    value={formData.rainfall}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Temperature (°C)</label>
                  <input
                    type="number"
                    name="temperature"
                    value={formData.temperature}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Humidity (%)</label>
                  <input
                    type="number"
                    name="humidity"
                    value={formData.humidity}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Season</label>
                  <select
                    name="season"
                    value={formData.season}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    required
                  >
                    <option value="">Select season</option>
                    <option value="kharif">Kharif</option>
                    <option value="rabi">Rabi</option>
                    <option value="zaid">Zaid</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`
                w-full py-4 px-6 rounded-xl text-lg font-medium shadow-md
                transition-all duration-200 transform hover:scale-[1.02]
                ${loading 
                  ? 'bg-gray-300 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white'
                }
              `}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing...
                </div>
              ) : 'Get Crop Recommendation'}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

