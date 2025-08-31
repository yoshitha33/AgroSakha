import React, { useState } from "react";
import { TbBuildingStore } from "react-icons/tb";
import { MdOutlinePestControl } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const demoShops = [
  {
    name: "Green Agro Store",
    address: "123 Main Road, Village Center",
    distance: "1.2 km",
    phone: "+91 98765 43210",
    open: true,
  },
  {
    name: "Farmers Supply Depot",
    address: "45 Market Street, Near Bus Stand",
    distance: "2.5 km",
    phone: "+91 91234 56789",
    open: false,
  },
  {
    name: "AgroMart",
    address: "78 Field Lane, Opp. School",
    distance: "3.1 km",
    phone: "+91 99887 66554",
    open: true,
  },
];

const demoPestServices = [
  {
    name: "Safe Pest Control",
    address: "12 Pest Lane, Market Area",
    distance: "1.8 km",
    phone: "+91 90000 11122",
    open: true,
  },
  {
    name: "Agro Pest Solutions",
    address: "99 Field Road, Near Hospital",
    distance: "3.0 km",
    phone: "+91 95555 22334",
    open: false,
  },
];

const NearbyShops = () => {
  const [shops] = useState(demoShops);
  const [pestServices] = useState(demoPestServices);
  const [pincode, setPincode] = useState("");
  const [locationStatus, setLocationStatus] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // toggle function for sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleLocation = () => {
    setLocationStatus("Detecting location...");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationStatus("Location detected!");
          // Here you would use position.coords.latitude & longitude for real API
        },
        () => setLocationStatus("Unable to detect location.")
      );
    } else {
      setLocationStatus("Geolocation not supported.");
    }
  };

  const handlePincode = (e) => {
    setPincode(e.target.value);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-white to-gray-100">
      {/* ✅ Navbar now uses toggleSidebar */}
      <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex">
        {/* ✅ Sidebar now uses toggleSidebar */}
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        <main className="flex-1 overflow-y-auto">
          {/* Pest Control Section */}
          <section className="w-full py-12 px-4 md:px-24">
            <div className="flex items-center mb-8">
              <MdOutlinePestControl className="text-red-600 w-10 h-10 mr-3" />
              <h3 className="text-3xl font-bold text-red-700">
                Find Pest Control Services
              </h3>
            </div>
            <form className="flex flex-col sm:flex-row items-center gap-4 mb-8">
              <button
                type="button"
                onClick={handleLocation}
                className="flex items-center px-5 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition text-lg font-medium"
              >
                <FaMapMarkerAlt className="mr-2" />
                Use Current Location
              </button>
              <span className="text-gray-500 font-semibold">or</span>
              <input
                type="text"
                value={pincode}
                onChange={handlePincode}
                placeholder="Enter Pincode"
                className="px-5 py-3 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none text-lg"
                maxLength={6}
              />
            </form>
            {locationStatus && (
              <div className="mb-6 text-green-700 font-medium">
                {locationStatus}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {pestServices.map((service, idx) => (
                <div
                  key={idx}
                  className="w-full bg-red-50 border border-red-200 rounded-xl p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between shadow hover:shadow-lg transition-shadow"
                >
                  <div>
                    <div className="text-2xl font-semibold text-red-800">
                      {service.name}
                    </div>
                    <div className="text-gray-700">{service.address}</div>
                    <div className="text-gray-500 text-base">
                      {service.distance} away
                    </div>
                    <div className="text-gray-600 text-base mt-1">
                      <span className="font-medium">Phone:</span> {service.phone}
                    </div>
                  </div>
                  <div className="mt-4 sm:mt-0 flex items-center">
                    <span
                      className={`inline-block px-4 py-2 rounded-full text-base font-semibold ${
                        service.open
                          ? "bg-green-200 text-green-800"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {service.open ? "Open Now" : "Closed"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Nearby Shops Section */}
          <section className="w-full py-12 px-4 md:px-24">
            <div className="flex items-center mb-8">
              <TbBuildingStore className="text-green-700 w-10 h-10 mr-3" />
              <h2 className="text-3xl font-bold text-green-700">Nearby Shops</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {shops.map((shop, idx) => (
                <div
                  key={idx}
                  className="w-full bg-green-50 border border-green-200 rounded-xl p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between shadow hover:shadow-lg transition-shadow"
                >
                  <div>
                    <div className="text-2xl font-semibold text-green-800">
                      {shop.name}
                    </div>
                    <div className="text-gray-700">{shop.address}</div>
                    <div className="text-gray-500 text-base">
                      {shop.distance} away
                    </div>
                    <div className="text-gray-600 text-base mt-1">
                      <span className="font-medium">Phone:</span> {shop.phone}
                    </div>
                  </div>
                  <div className="mt-4 sm:mt-0 flex items-center">
                    <span
                      className={`inline-block px-4 py-2 rounded-full text-base font-semibold ${
                        shop.open
                          ? "bg-green-200 text-green-800"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {shop.open ? "Open Now" : "Closed"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default NearbyShops;
