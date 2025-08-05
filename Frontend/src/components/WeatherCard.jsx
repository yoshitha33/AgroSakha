// src/components/WeatherCard.jsx
import { FiSun } from "react-icons/fi";

const WeatherCard = () => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Current Weather</h2>
                <FiSun className="h-6 w-6 text-yellow-500" />
            </div>
            <div className="flex items-center space-x-4">
                <span className="text-4xl font-bold text-gray-800">24°C</span>
                <div>
                    <p className="text-gray-800 font-medium">Sunny</p>
                    <p className="text-gray-500 text-sm">New York, USA</p>
                </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-gray-600 text-sm">
                    Humidity: 65% • Wind: 12 km/h NE
                </p>
            </div>
        </div>
    );
};

export default WeatherCard;