import React from 'react';
import Layout from '../components/Layout';
import WeatherCard from '../components/WeatherCard';
import WeatherForecast from '../components/WeatherForecast';
import WeatherAlerts from '../components/WeatherAlerts';

const Weather = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Weather Information</h1>
          <p className="text-gray-600">Stay updated with current weather conditions and forecasts</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <WeatherCard />
          <WeatherAlerts />
        </div>

        <div className="mb-6">
          <WeatherForecast />
        </div>

        {/* Additional weather features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Rainfall Data</h3>
            <p className="text-gray-600">Track rainfall patterns for better crop planning</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Soil Temperature</h3>
            <p className="text-gray-600">Monitor soil temperature for optimal planting</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Humidity Levels</h3>
            <p className="text-gray-600">Check humidity for disease prevention</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Weather;
