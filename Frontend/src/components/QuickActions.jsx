// src/components/QuickActions.jsx
import {
    FiSearch,
    FiDollarSign,
    FiTrendingUp,
    FiCalendar,
} from "react-icons/fi";

const QuickActions = () => {
    const actions = [
        {
            id: 1,
            title: "Scan for Pests",
            icon: <FiSearch className="h-5 w-5" />,
            color: "bg-green-100 text-green-700",
        },
        {
            id: 2,
            title: "Add Expense",
            icon: <FiDollarSign className="h-5 w-5" />,
            color: "bg-blue-100 text-blue-700",
        },
        {
            id: 3,
            title: "Market Prices",
            icon: <FiTrendingUp className="h-5 w-5" />,
            color: "bg-purple-100 text-purple-700",
        },
        {
            id: 4,
            title: "View Calendar",
            icon: <FiCalendar className="h-5 w-5" />,
            color: "bg-orange-100 text-orange-700",
        },
    ];

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
                {actions.map((action) => (
                    <button
                        key={action.id}
                        className={`${action.color} p-4 rounded-lg flex flex-col items-center justify-center hover:shadow-md transition-shadow`}
                    >
                        <div className="mb-2">{action.icon}</div>
                        <span className="text-sm font-medium">{action.title}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default QuickActions;