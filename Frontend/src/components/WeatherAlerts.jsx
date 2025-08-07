// src/components/WeatherAlerts.jsx
import { FiAlertTriangle } from "react-icons/fi";

const WeatherAlerts = () => {
    const alerts = [
        {
            id: 1,
            type: "Heavy Rain",
            time: "Tomorrow",
        },
        {
            id: 2,
            type: "Cold Front",
            time: "in 3 days",
        },
    ];

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Weather Alerts
            </h2>
            <div className="space-y-3">
                {alerts.map((alert) => (
                    <div key={alert.id} className="flex items-start">
                        <FiAlertTriangle className="h-5 w-5 text-yellow-500 mt-1 mr-3" />
                        <div>
                            <p className="text-gray-800 font-medium">{alert.type}</p>
                            <p className="text-gray-500 text-sm">{alert.time}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeatherAlerts;