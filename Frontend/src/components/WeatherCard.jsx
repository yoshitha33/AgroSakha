// src/components/WeatherCard.jsx
import { useEffect, useState } from "react";
import { FiSun, FiCloud, FiCloudRain, FiCloudSnow, FiWind, FiDroplet } from "react-icons/fi";
import { getCurrentWeather } from "../services/weatherService";

const WeatherCard = () => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                // Bhimavaram coordinates
                const data = await getCurrentWeather(16.5497, 81.8764);
                setWeather(data);
            } catch (err) {
                setError(err?.message || 'Failed to fetch weather');
                // Set mock data on error
                setWeather({
                    temperature: 24,
                    humidity: 65,
                    windSpeed: 12,
                    description: 'Sunny',
                    city: 'Bhimavaram',
                    country: 'IN',
                });
            } finally {
                setLoading(false);
            }
        };
        fetchWeather();
    }, []);

    const getWeatherIcon = (description) => {
        if (!description) return <FiSun className="h-8 w-8 text-yellow-500" />;
        const desc = description.toLowerCase();
        if (desc.includes('cloud')) return <FiCloud className="h-8 w-8 text-gray-400" />;
        if (desc.includes('rain')) return <FiCloudRain className="h-8 w-8 text-blue-400" />;
        if (desc.includes('snow')) return <FiCloudSnow className="h-8 w-8 text-blue-200" />;
        return <FiSun className="h-8 w-8 text-yellow-500" />;
    };

    if (loading) {
        return (
            <div className="bg-white p-6 rounded-xl shadow-sm animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-12 bg-gray-200 rounded w-1/3 mb-4"></div>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Current Weather</h2>
                {getWeatherIcon(weather?.description)}
            </div>
            <div className="flex items-center space-x-4 mb-4">
                <span className="text-4xl font-bold text-gray-800">{Math.round(weather?.temperature || 24)}°C</span>
                <div>
                    <p className="text-gray-800 font-medium">{weather?.description || 'Sunny'}</p>
                    <p className="text-gray-500 text-sm">{weather?.city || 'New Delhi'}, {weather?.country || 'IN'}</p>
                </div>
            </div>
            <div className="pt-4 border-t border-gray-100 space-y-2">
                <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                        <FiDroplet className="text-blue-500" />
                        <span>Humidity: {weather?.humidity || 65}%</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <FiWind className="text-gray-500" />
                        <span>Wind: {Math.round(weather?.windSpeed || 12)} km/h</span>
                    </div>
                </div>
            </div>
            {error && <p className="text-xs text-yellow-600 mt-2">⚠️ Using demo data</p>}
        </div>
    );
};

export default WeatherCard;