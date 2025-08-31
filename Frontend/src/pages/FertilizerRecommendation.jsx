import React, { useState } from "react";
import { FlaskConical, SproutIcon, Package } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const soilTypes = ["Sandy", "Clay", "Silty", "Peaty", "Chalky", "Loamy"];
const cropTypes = [
  "Rice",
  "Wheat",
  "Maize",
  "Cotton",
  "Sugarcane",
  "Pulses",
  "Vegetables",
  "Fruits",
];

// Example recommendation data for UI demonstration
const exampleRecommendation = {
  fertilizer: "NPK 20-20-20",
  details:
    "Balanced fertilizer recommended for your crop and soil conditions.",
  tips: [
    "Apply in early morning or late evening.",
    "Ensure proper soil moisture before application.",
    "Avoid over-fertilization to prevent crop damage.",
  ],
  nextSteps: "Monitor crop growth and repeat soil testing after 30 days.",
};

const infoCards = [
  {
    title: "Why Soil Testing?",
    icon: <FlaskConical className="w-10 h-10 text-orange-500" />,
    text: "Soil testing helps determine nutrient needs and prevents over-fertilization, saving money and protecting the environment.",
  },
  {
    title: "Balanced Fertilization",
    icon: <SproutIcon className="w-10 h-10 text-green-600" />,
    text: "Balanced use of Nitrogen, Phosphorous, and Potassium ensures healthy crop growth and higher yields.",
  },
  {
    title: "Best Practices",
    icon: <Package className="w-10 h-10 text-blue-500" />,
    text: "Apply fertilizers at the recommended time and dose for your crop and soil type for best results.",
  },
];

const FertilizerRecommendation = () => {
  const [form, setForm] = useState({
    temperature: "",
    humidity: "",
    moisture: "",
    soilType: "",
    cropType: "",
    nitrogen: "",
    potassium: "",
    phosphorous: "",
  });

  const [recommendation, setRecommendation] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Replace with backend API call
    setRecommendation(exampleRecommendation);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-green-50 to-blue-50">
      {/* ✅ Navbar + Sidebar */}
      <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex">
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* ✅ Main Content */}
        <main className="flex-1 overflow-y-auto py-8 px-2">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-6xl mx-auto w-full flex flex-col md:flex-row gap-10">
            {/* Left: Form */}
            <div className="flex-1 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
                Fertilizer Recommendation
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Temperature{" "}
                    <span className="text-gray-400 text-sm">(°C)</span>
                  </label>
                  <input
                    type="number"
                    name="temperature"
                    value={form.temperature}
                    onChange={handleChange}
                    placeholder="Enter temperature"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Humidity <span className="text-gray-400 text-sm">(%)</span>
                  </label>
                  <input
                    type="number"
                    name="humidity"
                    value={form.humidity}
                    onChange={handleChange}
                    placeholder="Enter humidity"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Moisture <span className="text-gray-400 text-sm">(%)</span>
                  </label>
                  <input
                    type="number"
                    name="moisture"
                    value={form.moisture}
                    onChange={handleChange}
                    placeholder="Enter moisture level"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Soil Type
                  </label>
                  <select
                    name="soilType"
                    value={form.soilType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
                    required
                  >
                    <option value="">Select soil type</option>
                    {soilTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Crop Type
                  </label>
                  <select
                    name="cropType"
                    value={form.cropType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
                    required
                  >
                    <option value="">Select crop type</option>
                    {cropTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Nitrogen
                    </label>
                    <input
                      type="number"
                      name="nitrogen"
                      value={form.nitrogen}
                      onChange={handleChange}
                      placeholder="Enter nitrogen"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Potassium
                    </label>
                    <input
                      type="number"
                      name="potassium"
                      value={form.potassium}
                      onChange={handleChange}
                      placeholder="Enter potassium"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Phosphorous
                    </label>
                    <input
                      type="number"
                      name="phosphorous"
                      value={form.phosphorous}
                      onChange={handleChange}
                      placeholder="Enter phosphorus"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full mt-4 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-xl shadow-md hover:from-green-700 hover:to-green-800 transition-all duration-200"
                >
                  Get Recommendation
                </button>
              </form>
            </div>

            {/* Right: Cards */}
            <div className="flex-1 flex flex-col gap-4 justify-center">
              {/* Info Cards */}
              <div className="grid grid-cols-1 gap-4">
                {infoCards.map((card, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl shadow-md border border-green-100 p-5 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-200"
                  >
                    <div className="mb-2">{card.icon}</div>
                    <div className="font-bold text-green-700 mb-1">
                      {card.title}
                    </div>
                    <div className="text-gray-600 text-sm">{card.text}</div>
                  </div>
                ))}
              </div>
              {/* Recommendation Cards */}
              {recommendation && (
                <>
                  <div className="bg-green-50 border border-green-200 rounded-2xl shadow-lg p-6">
                    <h3 className="text-2xl font-bold text-green-800 mb-2">
                      Recommended Fertilizer
                    </h3>
                    <div className="text-lg font-semibold text-green-700 mb-2">
                      {recommendation.fertilizer}
                    </div>
                    <p className="text-gray-700 mb-4">
                      {recommendation.details}
                    </p>
                    <div>
                      <h4 className="font-semibold text-green-700 mb-1">
                        Tips:
                      </h4>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        {recommendation.tips.map((tip, idx) => (
                          <li key={idx}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-2xl shadow p-4">
                    <h4 className="font-semibold text-blue-700 mb-1">
                      Next Steps
                    </h4>
                    <p className="text-gray-700">{recommendation.nextSteps}</p>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-2xl shadow p-4">
                    <h4 className="font-semibold text-yellow-700 mb-1">
                      Your Input Summary
                    </h4>
                    <ul className="text-gray-700 text-sm space-y-1">
                      <li>
                        <span className="font-medium">Soil Type:</span>{" "}
                        {form.soilType}
                      </li>
                      <li>
                        <span className="font-medium">Crop Type:</span>{" "}
                        {form.cropType}
                      </li>
                      <li>
                        <span className="font-medium">Temperature:</span>{" "}
                        {form.temperature}°C
                      </li>
                      <li>
                        <span className="font-medium">Humidity:</span>{" "}
                        {form.humidity}%
                      </li>
                      <li>
                        <span className="font-medium">Moisture:</span>{" "}
                        {form.moisture}%
                      </li>
                      <li>
                        <span className="font-medium">Nitrogen:</span>{" "}
                        {form.nitrogen}
                      </li>
                      <li>
                        <span className="font-medium">Potassium:</span>{" "}
                        {form.potassium}
                      </li>
                      <li>
                        <span className="font-medium">Phosphorous:</span>{" "}
                        {form.phosphorous}
                      </li>
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FertilizerRecommendation;
