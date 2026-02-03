import React from 'react';
import Layout from '../components/Layout';
import WeatherAlerts from '../components/WeatherAlerts';

const Alerts = () => {
  const alerts = [
    {
      id: 1,
      type: 'weather',
      title: 'Heavy Rainfall Alert',
      message: 'Heavy rainfall expected in your area for the next 48 hours',
      severity: 'high',
      time: '2 hours ago'
    },
    {
      id: 2,
      type: 'market',
      title: 'Price Drop Alert',
      message: 'Wheat prices have dropped by 10% in the local market',
      severity: 'medium',
      time: '4 hours ago'
    },
    {
      id: 3,
      type: 'pest',
      title: 'Pest Attack Warning',
      message: 'Brown plant hopper spotted in nearby farms',
      severity: 'high',
      time: '6 hours ago'
    },
    {
      id: 4,
      type: 'scheme',
      title: 'New Scheme Available',
      message: 'PM-KISAN payment cycle opened for registration',
      severity: 'low',
      time: '1 day ago'
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-red-100 border-red-300 text-red-800';
      case 'medium': return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'low': return 'bg-blue-100 border-blue-300 text-blue-800';
      default: return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'weather': return '🌧️';
      case 'market': return '💰';
      case 'pest': return '🐛';
      case 'scheme': return '📋';
      default: return '📢';
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Alerts & Notifications</h1>
          <p className="text-gray-600">Stay informed about important farming updates</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Alert List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold">Recent Alerts</h2>
              </div>
              <div className="divide-y">
                {alerts.map(alert => (
                  <div key={alert.id} className={`p-6 border-l-4 ${getSeverityColor(alert.severity)}`}>
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">{getTypeIcon(alert.type)}</span>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{alert.title}</h3>
                        <p className="text-gray-600 mt-1">{alert.message}</p>
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-sm text-gray-500">{alert.time}</span>
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-800 text-sm">
                              View Details
                            </button>
                            <button className="text-gray-600 hover:text-gray-800 text-sm">
                              Dismiss
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Alert Settings */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Alert Preferences</h3>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input type="checkbox" defaultChecked className="mr-2" />
                  <span className="text-sm">Weather Alerts</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" defaultChecked className="mr-2" />
                  <span className="text-sm">Market Price Alerts</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" defaultChecked className="mr-2" />
                  <span className="text-sm">Pest & Disease Alerts</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" defaultChecked className="mr-2" />
                  <span className="text-sm">Government Scheme Alerts</span>
                </label>
              </div>
              <button className="w-full mt-4 bg-green-600 text-white py-2 rounded-md hover:bg-green-700">
                Save Preferences
              </button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Alert Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">High Priority</span>
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">2</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Medium Priority</span>
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">1</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Low Priority</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">1</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Alerts;
