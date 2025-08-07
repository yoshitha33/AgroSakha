import React from 'react';
import Layout from '../components/Layout';
import ActiveSchemes from '../components/ActiveSchemes';

const GovtSchemesDocuments = () => {
  const documents = [
    { name: 'Land Records', status: 'Verified', date: '2024-12-15' },
    { name: 'Crop Insurance', status: 'Pending', date: '2024-12-10' },
    { name: 'Soil Health Card', status: 'Verified', date: '2024-11-25' },
    { name: 'Farmer ID', status: 'Verified', date: '2024-10-20' }
  ];

  const schemes = [
    {
      name: 'PM-KISAN',
      description: 'Direct income support to farmers',
      eligibility: 'Small and marginal farmers',
      benefit: '₹6,000 per year'
    },
    {
      name: 'Crop Insurance Scheme',
      description: 'Protection against crop loss',
      eligibility: 'All farmers',
      benefit: 'Up to 90% coverage'
    },
    {
      name: 'Soil Health Card',
      description: 'Soil nutrient status information',
      eligibility: 'All farmers',
      benefit: 'Free soil testing'
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Government Schemes & Documents</h1>
          <p className="text-gray-600">Access government schemes and manage your documents</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Active Schemes */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Available Schemes</h2>
            <div className="space-y-4">
              {schemes.map((scheme, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-700">{scheme.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{scheme.description}</p>
                  <div className="text-xs text-gray-500">
                    <p><strong>Eligibility:</strong> {scheme.eligibility}</p>
                    <p><strong>Benefit:</strong> {scheme.benefit}</p>
                  </div>
                  <button className="mt-2 bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700">
                    Apply Now
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Document Management */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">My Documents</h2>
            <div className="space-y-3">
              {documents.map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="font-medium">{doc.name}</h3>
                    <p className="text-sm text-gray-500">Updated: {doc.date}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      doc.status === 'Verified' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {doc.status}
                    </span>
                    <button className="text-blue-600 hover:text-blue-800 text-sm">
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
              Upload New Document
            </button>
          </div>
        </div>

        {/* Application Status */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Application Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-800">Approved Applications</h3>
              <p className="text-2xl font-bold text-green-600">3</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <h3 className="font-semibold text-yellow-800">Pending Applications</h3>
              <p className="text-2xl font-bold text-yellow-600">1</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-800">Total Schemes</h3>
              <p className="text-2xl font-bold text-blue-600">12</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GovtSchemesDocuments;
