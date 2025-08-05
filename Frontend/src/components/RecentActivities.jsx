// src/components/RecentActivities.jsx
import { FiCheckCircle, FiAlertTriangle, FiDollarSign } from "react-icons/fi";

const RecentActivities = () => {
    const activities = [
        {
            id: 1,
            type: "scan",
            title: "Pest scan completed",
            time: "2 hours ago",
            icon: <FiCheckCircle className="h-5 w-5 text-green-500" />,
        },
        {
            id: 2,
            type: "expense",
            title: "Expense recorded: Seeds purchase",
            time: "5 hours ago",
            icon: <FiDollarSign className="h-5 w-5 text-blue-500" />,
        },
        {
            id: 3,
            type: "alert",
            title: "Weather alert: Rain expected",
            time: "1 day ago",
            icon: <FiAlertTriangle className="h-5 w-5 text-yellow-500" />,
        },
        {
            id: 4,
            type: "scan",
            title: "Soil analysis completed",
            time: "2 days ago",
            icon: <FiCheckCircle className="h-5 w-5 text-green-500" />,
        },
    ];

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Recent Activities
            </h2>
            <div className="space-y-4">
                {activities.map((activity) => (
                    <div key={activity.id} className="flex items-start">
                        <div className="mt-1 mr-3">{activity.icon}</div>
                        <div>
                            <p className="text-gray-800 font-medium">{activity.title}</p>
                            <p className="text-gray-500 text-sm">{activity.time}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentActivities;