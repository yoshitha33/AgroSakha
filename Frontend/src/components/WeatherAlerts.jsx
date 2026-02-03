// src/components/WeatherAlerts.jsx
import { useEffect, useState } from "react";
import { FiAlertTriangle, FiCheckCircle, FiInfo } from "react-icons/fi";
import { getWeatherAlerts } from "../services/weatherService";

const WeatherAlerts = () => {
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAlerts = async () => {
            try {
                const data = await getWeatherAlerts();
                setAlerts(data.alerts || []);
            } catch (err) {
                setError(err?.message || 'Failed to fetch alerts');
                // Set mock alerts on error
                setAlerts([
                    {
                        type: 'normal',
                        severity: 'success',
                        title: 'Good Weather Conditions',
                        description: 'Current weather is suitable for most farming activities.',
                    },
                ]);
            } finally {
                setLoading(false);
            }
        };
        fetchAlerts();
    }, []);

    const getAlertIcon = (severity) => {
        switch (severity) {
            case 'danger':
                return <FiAlertTriangle className="h-5 w-5 text-red-500" />;
            case 'warning':
                return <FiAlertTriangle className="h-5 w-5 text-yellow-500" />;
            case 'success':
                return <FiCheckCircle className="h-5 w-5 text-green-500" />;
            case 'info':
                return <FiInfo className="h-5 w-5 text-blue-500" />;
            default:
                return <FiAlertTriangle className="h-5 w-5 text-gray-500" />;
        }
    };

    const getAlertStyles = (severity) => {
        switch (severity) {
            case 'danger':
                return 'bg-red-50 border-l-4 border-red-500';
            case 'warning':
                return 'bg-yellow-50 border-l-4 border-yellow-500';
            case 'success':
                return 'bg-green-50 border-l-4 border-green-500';
            case 'info':
                return 'bg-blue-50 border-l-4 border-blue-500';
            default:
                return 'bg-gray-50 border-l-4 border-gray-500';
        }
    };

    if (loading) {
        return (
            <div className="bg-white p-6 rounded-xl shadow-sm animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="space-y-3">
                    {[...Array(2)].map((_, i) => (
                        <div key={i} className="h-16 bg-gray-200 rounded"></div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Weather Alerts
            </h2>
            <div className="space-y-3">
                {alerts.map((alert, idx) => (
                    <div key={idx} className={`p-4 rounded flex items-start space-x-3 ${getAlertStyles(alert.severity)}`}>
                        {getAlertIcon(alert.severity)}
                        <div className="flex-1">
                            <p className="font-medium text-gray-800">{alert.title || alert.type}</p>
                            <p className="text-sm text-gray-600">{alert.description}</p>
                        </div>
                    </div>
                ))}
            </div>
            {error && <p className="text-xs text-yellow-600 mt-4">⚠️ Using demo alerts</p>}
        </div>
    );
};

export default WeatherAlerts;