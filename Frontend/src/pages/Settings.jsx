import React, { useState } from 'react';
import Layout from '../components/Layout';

const Settings = () => {
  const [language, setLanguage] = useState('English');
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [fontSize, setFontSize] = useState('medium');

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Settings</h1>
          <p className="text-gray-600">Customize your AgroSakha experience</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Language Settings */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Language Preferences</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Language
                </label>
                <select 
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="English">English</option>
                  <option value="Telugu">తెలుగు (Telugu)</option>
                  <option value="Hindi">हिंदी (Hindi)</option>
                  <option value="Tamil">தமிழ் (Tamil)</option>
                  <option value="Kannada">ಕನ್ನಡ (Kannada)</option>
                </select>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="voice"
                  checked={voiceEnabled}
                  onChange={(e) => setVoiceEnabled(e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor="voice" className="text-sm">Enable voice commands and responses</label>
              </div>
            </div>
          </div>

          {/* Accessibility Settings */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Accessibility</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Font Size
                </label>
                <select 
                  value={fontSize}
                  onChange={(e) => setFontSize(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                  <option value="extra-large">Extra Large</option>
                </select>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="high-contrast"
                  className="mr-2"
                />
                <label htmlFor="high-contrast" className="text-sm">High contrast mode</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="screen-reader"
                  className="mr-2"
                />
                <label htmlFor="screen-reader" className="text-sm">Screen reader support</label>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Notifications</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Enable notifications</span>
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Weather alerts</span>
                <input type="checkbox" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Market price updates</span>
                <input type="checkbox" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Pest warnings</span>
                <input type="checkbox" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Government scheme updates</span>
                <input type="checkbox" defaultChecked />
              </div>
            </div>
          </div>

          {/* Account Settings */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Account</h2>
            <div className="space-y-4">
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
                Edit Profile
              </button>
              <button className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700">
                Change Password
              </button>
              <button className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700">
                Export Data
              </button>
              <button className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700">
                Delete Account
              </button>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-6 text-center">
          <button className="bg-green-600 text-white py-3 px-8 rounded-md hover:bg-green-700 text-lg">
            Save All Settings
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
