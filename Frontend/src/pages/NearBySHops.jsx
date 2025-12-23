import React, { useState } from "react";
import { TbBuildingStore } from "react-icons/tb";
import { MdOutlinePestControl } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Loader, MapPin, Phone, Clock, Star, AlertCircle } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { getNearbyShops, getNearbyPestControl, getCurrentLocation } from "../services/shopsService";

const NearbyShops = () => {
  const [shops, setShops] = useState([]);
  const [pestServices, setPestServices] = useState([]);
  const [pincode, setPincode] = useState("");
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [locationStatus, setLocationStatus] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('shops'); // 'shops' or 'pest'
  const [manualLat, setManualLat] = useState("");
  const [manualLng, setManualLng] = useState("");

  // toggle function for sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleUseCurrentLocation = async () => {
    setLocationStatus("Detecting location...");
    setError(null);
    setLoading(true);
    
    try {
      const position = await getCurrentLocation();
      console.log('📍 DETECTED COORDINATES:', position);
      console.log(`Latitude: ${position.latitude}, Longitude: ${position.longitude}`);
      console.log(`Accuracy: ${position.accuracy} meters`);
      
      setLocation(position);
      
      // Determine location description
      let locationDesc = `${position.latitude.toFixed(6)}, ${position.longitude.toFixed(6)}`;
      
      // Add warning if coordinates seem to be in Delhi area
      if (position.latitude > 28.4 && position.latitude < 28.9 && 
          position.longitude > 76.8 && position.longitude < 77.4) {
        locationDesc += " ⚠️ (Delhi area - might be IP-based location)";
      } else if (position.latitude > 15 && position.latitude < 20 && 
                 position.longitude > 78 && position.longitude < 85) {
        locationDesc += " ✅ (Andhra Pradesh area)";
      }
      
      setLocationStatus(`📍 Detected: ${locationDesc}`);
      
      // Fetch both shops and pest control services
      await Promise.all([
        fetchShops(position),
        fetchPestControl(position)
      ]);
      
    } catch (err) {
      console.error('Location error:', err);
      setError(err.message || 'Unable to detect location');
      setLocationStatus('');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchByPincode = async () => {
    if (!pincode || pincode.length !== 6) {
      setError('Please enter a valid 6-digit pincode');
      return;
    }

    setError(null);
    setLoading(true);
    setLocationStatus(`Searching in pincode: ${pincode}`);

    try {
      // For pincode, we'll use a default location (in real app, convert pincode to coordinates)
      const mockLocation = { latitude: 28.6139, longitude: 77.2090, pincode };
      setLocation(mockLocation);
      
      await Promise.all([
        fetchShops(mockLocation),
        fetchPestControl(mockLocation)
      ]);
      
    } catch (err) {
      console.error('Search error:', err);
      setError(err.message || 'Failed to search by pincode');
    } finally {
      setLoading(false);
    }
  };

  const handleManualLocationSearch = async () => {
    const lat = parseFloat(manualLat);
    const lng = parseFloat(manualLng);

    if (!manualLat || !manualLng || isNaN(lat) || isNaN(lng)) {
      setError('Please enter valid latitude and longitude');
      return;
    }

    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      setError('Invalid coordinates. Lat: -90 to 90, Lng: -180 to 180');
      return;
    }

    setError(null);
    setLoading(true);
    setLocationStatus(`Searching at coordinates: ${lat.toFixed(4)}, ${lng.toFixed(4)}`);

    try {
      const manualLocation = { latitude: lat, longitude: lng };
      setLocation(manualLocation);
      
      await Promise.all([
        fetchShops(manualLocation),
        fetchPestControl(manualLocation)
      ]);
      
    } catch (err) {
      console.error('Search error:', err);
      setError(err.message || 'Failed to search at location');
    } finally {
      setLoading(false);
    }
  };

  const fetchShops = async (locationData) => {
    try {
      console.log('Fetching shops with location:', locationData);
      const response = await getNearbyShops({
        latitude: locationData.latitude,
        longitude: locationData.longitude,
        pincode: locationData.pincode,
        radius: 5000 // 5km radius
      });
      
      console.log('Shops response:', response);
      if (response.success && response.shops) {
        setShops(response.shops);
      }
    } catch (err) {
      console.error('Failed to fetch shops:', err);
      throw err;
    }
  };

  const fetchPestControl = async (locationData) => {
    try {
      console.log('Fetching pest control with location:', locationData);
      const response = await getNearbyPestControl({
        latitude: locationData.latitude,
        longitude: locationData.longitude,
        pincode: locationData.pincode,
        radius: 5000 // 5km radius
      });
      
      console.log('Pest control response:', response);
      if (response.success && response.services) {
        setPestServices(response.services);
      }
    } catch (err) {
      console.error('Failed to fetch pest control:', err);
      throw err;
    }
  };

  const handlePincodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Only digits
    setPincode(value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchByPincode();
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-green-50 to-blue-50">
      <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex">
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        <main className="flex-1 overflow-y-auto p-6">
          {/* Header */}
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600">
                  🏪 Find Nearby Agricultural Services
                </span>
              </h1>
              <p className="text-gray-600">
                Discover agricultural supply stores and pest control services near you
              </p>
            </div>

            {/* Search Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-green-600" />
                Search by Location
              </h2>
              
              <div className="flex flex-col md:flex-row items-center gap-4">
                <button
                  type="button"
                  onClick={handleUseCurrentLocation}
                  disabled={loading}
                  className={`flex items-center px-6 py-3 rounded-lg shadow font-medium transition-colors ${
                    loading
                      ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {loading ? (
                    <>
                      <Loader className="w-5 h-5 mr-2 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <FaMapMarkerAlt className="mr-2" />
                      Use Current Location
                    </>
                  )}
                </button>
                
                <span className="text-gray-500 font-semibold">or</span>
                
                <div className="flex gap-2 flex-1 max-w-md">
                  <input
                    type="text"
                    value={pincode}
                    onChange={handlePincodeChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter 6-digit Pincode"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    maxLength={6}
                    disabled={loading}
                  />
                  <button
                    onClick={handleSearchByPincode}
                    disabled={loading || !pincode || pincode.length !== 6}
                    className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                      loading || !pincode || pincode.length !== 6
                        ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                        : 'bg-emerald-600 text-white hover:bg-emerald-700'
                    }`}
                  >
                    Search
                  </button>
                </div>
              </div>

              {/* Manual Coordinates Input */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  🎯 Manual Coordinates (for Andhra Pradesh or any specific location)
                </h3>
                <div className="flex flex-col md:flex-row items-center gap-3">
                  <input
                    type="text"
                    value={manualLat}
                    onChange={(e) => setManualLat(e.target.value)}
                    placeholder="Latitude (e.g., 16.5062)"
                    className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none w-full md:w-48"
                  />
                  <input
                    type="text"
                    value={manualLng}
                    onChange={(e) => setManualLng(e.target.value)}
                    placeholder="Longitude (e.g., 80.6480)"
                    className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none w-full md:w-48"
                  />
                  <button
                    type="button"
                    onClick={handleManualLocationSearch}
                    disabled={loading}
                    className={`px-6 py-2 rounded-lg shadow font-medium transition-colors w-full md:w-auto ${
                      loading
                        ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    Search Here
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  💡 <strong>Bhimavaram:</strong> 16.5449, 81.5212 | Vijayawada: 16.5062, 80.6480 | Visakhapatnam: 17.6868, 83.2185 | Guntur: 16.3067, 80.4365
                </p>
              </div>

              {/* Status Messages */}
              {locationStatus && (
                <div className="mt-4 flex items-center gap-2 text-green-700 bg-green-50 px-4 py-2 rounded-lg">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm font-medium">{locationStatus}</span>
                </div>
              )}

              {error && (
                <div className="mt-4 flex items-start gap-2 text-red-700 bg-red-50 px-4 py-3 rounded-lg border border-red-200">
                  <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Error</p>
                    <p className="text-sm">{error}</p>
                  </div>
                </div>
              )}

              {/* Info Box */}
              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-blue-800">
                    <p className="font-semibold mb-1">📍 Location Detection Info:</p>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      <li>Browser may use <strong>IP-based location</strong> (less accurate)</li>
                      <li>If showing wrong city, use <strong>Manual Coordinates</strong> below</li>
                      <li>Check browser console (F12) for exact detected coordinates</li>
                      <li>For best results: Enable GPS on your device</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="mb-6">
              <div className="flex gap-2 border-b border-gray-200">
                <button
                  onClick={() => setActiveTab('shops')}
                  className={`px-6 py-3 font-medium transition-colors border-b-2 ${
                    activeTab === 'shops'
                      ? 'border-green-600 text-green-600'
                      : 'border-transparent text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <TbBuildingStore className="inline w-5 h-5 mr-2" />
                  Agricultural Shops ({shops.length})
                </button>
                <button
                  onClick={() => setActiveTab('pest')}
                  className={`px-6 py-3 font-medium transition-colors border-b-2 ${
                    activeTab === 'pest'
                      ? 'border-red-600 text-red-600'
                      : 'border-transparent text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <MdOutlinePestControl className="inline w-5 h-5 mr-2" />
                  Pest Control ({pestServices.length})
                </button>
              </div>
            </div>

            {/* Agricultural Shops Section */}
            {activeTab === 'shops' && (
              <div>
                {shops.length === 0 && !loading && (
                  <div className="text-center py-12 bg-white rounded-lg">
                    <TbBuildingStore className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No shops found. Try searching by location or pincode.</p>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {shops.map((shop) => (
                    <div
                      key={shop.id}
                      className="bg-white border border-green-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-green-800 mb-1">
                            {shop.name}
                          </h3>
                          <div className="flex items-center gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(shop.rating)
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                            <span className="text-sm text-gray-600 ml-1">({shop.rating})</span>
                          </div>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            shop.open
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-600'
                          }`}
                        >
                          {shop.open ? 'Open' : 'Closed'}
                        </span>
                      </div>

                      <div className="space-y-2 text-gray-700">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-gray-500" />
                          <span className="text-sm">{shop.address}</span>
                        </div>
                        {shop.phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-500" />
                            <a href={`tel:${shop.phone}`} className="text-sm hover:text-green-600">
                              {shop.phone}
                            </a>
                          </div>
                        )}
                        {shop.hours && (
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <span className="text-sm">{shop.hours}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span className="text-sm font-medium text-green-600">
                            {shop.distance} km away
                          </span>
                        </div>
                        {shop.totalRatings > 0 && (
                          <div className="text-xs text-gray-500">
                            Based on {shop.totalRatings} reviews
                          </div>
                        )}
                      </div>

                      {shop.products && shop.products.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <p className="text-xs font-medium text-gray-600 mb-2">Available Products:</p>
                          <div className="flex flex-wrap gap-2">
                            {shop.products.map((product, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-md"
                              >
                                {product}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pest Control Section */}
            {activeTab === 'pest' && (
              <div>
                {pestServices.length === 0 && !loading && (
                  <div className="text-center py-12 bg-white rounded-lg">
                    <MdOutlinePestControl className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No pest control services found. Try searching by location or pincode.</p>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {pestServices.map((service) => (
                    <div
                      key={service.id}
                      className="bg-white border border-red-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-red-800 mb-1">
                            {service.name}
                          </h3>
                          <div className="flex items-center gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(service.rating)
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                            <span className="text-sm text-gray-600 ml-1">({service.rating})</span>
                          </div>
                          {service.emergency && (
                            <span className="inline-block px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded">
                              24/7 Emergency
                            </span>
                          )}
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            service.open
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-600'
                          }`}
                        >
                          {service.open ? 'Open' : 'Closed'}
                        </span>
                      </div>

                      <div className="space-y-2 text-gray-700">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-gray-500" />
                          <span className="text-sm">{service.address}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-500" />
                          <a href={`tel:${service.phone}`} className="text-sm hover:text-red-600">
                            {service.phone}
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">{service.hours}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span className="text-sm font-medium text-red-600">
                            {service.distance} km away
                          </span>
                        </div>
                      </div>

                      {service.services && service.services.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <p className="text-xs font-medium text-gray-600 mb-2">Services Offered:</p>
                          <div className="flex flex-wrap gap-2">
                            {service.services.map((item, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 bg-red-50 text-red-700 text-xs rounded-md"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default NearbyShops;
