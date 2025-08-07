// src/components/WeatherForecast.jsx
import { FiSun, FiCloud, FiCloudRain, FiCloudSnow } from "react-icons/fi";

const WeatherForecast = () => {
    const forecast = [
        { day: "Mon", temp: "24°C", icon: <FiSun className="h-6 w-6 text-yellow-500" /> },
        { day: "Tue", temp: "22°C", icon: <FiSun className="h-6 w-6 text-yellow-500" /> },
        { day: "Wed", temp: "18°C", icon: <FiCloud className="h-6 w-6 text-gray-400" /> },
        { day: "Thu", temp: "16°C", icon: <FiCloudRain className="h-6 w-6 text-blue-400" /> },
        { day: "Fri", temp: "12°C", icon: <FiCloudSnow className="h-6 w-6 text-blue-200" /> },
    ];

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                5-Day Weather Forecast
            </h2>
            <div className="flex justify-between items-end h-32 mt-6">
                {forecast.map((day) => (
                    <div key={day.day} className="flex flex-col items-center">
                        <span className="text-gray-500 text-sm">{day.day}</span>
                        <div className="my-2">{day.icon}</div>
                        <span className="text-gray-800 font-medium">{day.temp}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeatherForecast;