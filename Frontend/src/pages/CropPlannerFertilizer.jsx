import React, { useState } from 'react';
import Layout from '../components/Layout';

const CropPlannerFertilizer = () => {
  const [selectedCrop, setSelectedCrop] = useState('');
  const [soilType, setSoilType] = useState('');

  const crops = ['Rice', 'Wheat', 'Cotton', 'Sugarcane', 'Maize', 'Tomato', 'Potato'];
  const soilTypes = ['Clay', 'Sandy', 'Loamy', 'Silt', 'Chalky', 'Peaty'];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Crop Planner & Fertilizer Advisor</h1>
          <p className="text-gray-600">Plan your crops and get fertilizer recommendations</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Crop Planner */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Crop Planner</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Crop</label>
                <select 
                  value={selectedCrop}
                  onChange={(e) => setSelectedCrop(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Choose a crop</option>
                  {crops.map(crop => (
                    <option key={crop} value={crop}>{crop}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Soil Type</label>
                <select 
                  value={soilType}
                  onChange={(e) => setSoilType(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Choose soil type</option>
                  {soilTypes.map(soil => (
                    <option key={soil} value={soil}>{soil}</option>
                  ))}
                </select>
              </div>
              <button className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700">
                Get Planting Schedule
              </button>
            </div>
          </div>

          {/* Fertilizer Advisor */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Fertilizer Advisor</h2>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-green-800">NPK Recommendation</h3>
                <p className="text-green-700">Based on your soil test results</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-800">Organic Options</h3>
                <p className="text-blue-700">Eco-friendly fertilizer alternatives</p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg">
                <h3 className="font-semibold text-yellow-800">Application Schedule</h3>
                <p className="text-yellow-700">When and how much to apply</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Seasonal Calendar</h3>
            <p className="text-gray-600">Best planting times for your region</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Crop Rotation</h3>
            <p className="text-gray-600">Optimize soil health with rotation</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Soil Testing</h3>
            <p className="text-gray-600">Schedule soil health checkups</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CropPlannerFertilizer;
