import React from 'react';
import Layout from '../components/Layout';
import MarketPrices from '../components/MarketPrices';
import MarketHighlights from '../components/MarketHighlights';

const MarketPricesPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Market Prices</h1>
          <p className="text-gray-600">Stay updated with current market prices and trends</p>
        </div>

        <div className="mb-6">
          <MarketHighlights />
        </div>

        <div className="mb-6">
          <MarketPrices />
        </div>

        {/* Additional market features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Price Trends</h3>
            <p className="text-gray-600">Analyze price trends over time</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Market Analysis</h3>
            <p className="text-gray-600">Get insights on market conditions</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Price Alerts</h3>
            <p className="text-gray-600">Set alerts for price changes</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default MarketPricesPage;
