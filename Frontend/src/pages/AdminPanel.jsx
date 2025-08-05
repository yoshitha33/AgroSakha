import React, { useState } from 'react';
import Layout from '../components/Layout';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('users');

  const users = [
    { id: 1, name: 'Ravi Kumar', role: 'Farmer', location: 'Andhra Pradesh', status: 'Active' },
    { id: 2, name: 'Priya Singh', role: 'Farmer', location: 'Punjab', status: 'Active' },
    { id: 3, name: 'Ahmed Ali', role: 'Agricultural Officer', location: 'Maharashtra', status: 'Active' },
  ];

  const reports = [
    { id: 1, type: 'Weather Data', date: '2024-12-15', status: 'Generated' },
    { id: 2, type: 'Market Prices', date: '2024-12-14', status: 'Pending' },
    { id: 3, type: 'User Activity', date: '2024-12-13', status: 'Generated' },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Panel</h1>
          <p className="text-gray-600">Manage users, content, and system settings</p>
        </div>

        {/* Admin Navigation */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b">
            <nav className="flex space-x-8 px-6">
              {['users', 'content', 'reports', 'system'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm ${
                    activeTab === tab
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)} Management
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Users Management */}
            {activeTab === 'users' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">User Management</h2>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                    Add New User
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.map(user => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {user.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.location}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {user.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-2">Edit</button>
                            <button className="text-red-600 hover:text-red-900">Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Content Management */}
            {activeTab === 'content' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Content Management</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-semibold mb-2">Weather Data</h3>
                    <p className="text-sm text-gray-600 mb-4">Manage weather information and forecasts</p>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                      Manage
                    </button>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-semibold mb-2">Market Prices</h3>
                    <p className="text-sm text-gray-600 mb-4">Update crop prices and market data</p>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                      Manage
                    </button>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-semibold mb-2">Government Schemes</h3>
                    <p className="text-sm text-gray-600 mb-4">Add and update scheme information</p>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                      Manage
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Reports */}
            {activeTab === 'reports' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Reports & Analytics</h2>
                <div className="space-y-4">
                  {reports.map(report => (
                    <div key={report.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h3 className="font-medium">{report.type}</h3>
                        <p className="text-sm text-gray-500">Generated on {report.date}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          report.status === 'Generated' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {report.status}
                        </span>
                        <button className="text-blue-600 hover:text-blue-800">Download</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* System Settings */}
            {activeTab === 'system' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">System Settings</h2>
                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-semibold mb-2">Database Management</h3>
                    <p className="text-sm text-gray-600 mb-4">Backup and restore system data</p>
                    <div className="space-x-2">
                      <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                        Backup Now
                      </button>
                      <button className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700">
                        Restore
                      </button>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-semibold mb-2">API Configuration</h3>
                    <p className="text-sm text-gray-600 mb-4">Manage external API integrations</p>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                      Configure APIs
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminPanel;
