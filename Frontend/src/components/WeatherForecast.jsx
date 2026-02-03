// src/components/WeatherForecast.jsx
import { useEffect, useState } from "react";
import { FiSun, FiCloud, FiCloudRain, FiCloudSnow } from "react-icons/fi";
import { getWeatherForecast } from "../services/weatherService";

const WeatherForecast = () => {
    const [forecast, setForecast] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchForecast = async () => {
            try {
                // Bhimavaram coordinates
                const data = await getWeatherForecast(16.5497, 81.8764);
                setForecast(data.forecast || []);
            } catch (err) {
                setError(err?.message || 'Failed to fetch forecast');
                // Set mock forecast on error
                setForecast([
                    { day: "Mon", temp: "24°C", description: "Sunny", icon: <FiSun className="h-6 w-6 text-yellow-500" /> },
                    { day: "Tue", temp: "22°C", description: "Sunny", icon: <FiSun className="h-6 w-6 text-yellow-500" /> },
                    { day: "Wed", temp: "18°C", description: "Cloudy", icon: <FiCloud className="h-6 w-6 text-gray-400" /> },
                    { day: "Thu", temp: "16°C", description: "Rainy", icon: <FiCloudRain className="h-6 w-6 text-blue-400" /> },
                    { day: "Fri", temp: "12°C", description: "Snowy", icon: <FiCloudSnow className="h-6 w-6 text-blue-200" /> },
                ]);
            } finally {
                setLoading(false);
            }
        };
        fetchForecast();
    }, []);

    const getWeatherIcon = (description) => {
        if (!description) return <FiSun className="h-6 w-6 text-yellow-500" />;
        const desc = description.toLowerCase();
        if (desc.includes('cloud')) return <FiCloud className="h-6 w-6 text-gray-400" />;
        if (desc.includes('rain')) return <FiCloudRain className="h-6 w-6 text-blue-400" />;
        if (desc.includes('snow')) return <FiCloudSnow className="h-6 w-6 text-blue-200" />;
        return <FiSun className="h-6 w-6 text-yellow-500" />;
    };

    if (loading) {
        return (
            <div className="bg-white p-6 rounded-xl shadow-sm animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
                <div className="flex justify-between">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-24 bg-gray-200 rounded w-16"></div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                5-Day Weather Forecast
            </h2>
            <div className="flex justify-between items-end h-32 mt-6">
                {forecast.slice(0, 5).map((day, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                        <span className="text-gray-500 text-sm">{day.day}</span>
                        <div className="my-2">
                            {getWeatherIcon(day.description)}
                        </div>
                        <span className="text-gray-800 font-medium">
                            {typeof day.temp === 'string' ? day.temp : `${day.temp}°C`}
                        </span>
                        <span className="text-xs text-gray-500 mt-1">{day.description}</span>
                    </div>
                ))}
            </div>
            {error && <p className="text-xs text-yellow-600 mt-4">⚠️ Using demo data</p>}
        </div>
    );
};

export default WeatherForecast;