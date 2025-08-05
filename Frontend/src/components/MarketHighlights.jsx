// src/components/MarketHighlights.jsx
import { FiArrowUp, FiArrowDown } from "react-icons/fi";

const MarketHighlights = () => {
    const commodities = [
        { name: "Wheat", price: "$245", change: "+2.5%", trend: "up" },
        { name: "Corn", price: "$198", change: "-1.2%", trend: "down" },
        { name: "Soybeans", price: "$312", change: "+0.8%", trend: "up" },
    ];

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Market Highlights
            </h2>
            <div className="space-y-3">
                {commodities.map((item) => (
                    <div key={item.name} className="flex items-center justify-between">
                        <span className="text-gray-800">{item.name}</span>
                        <div className="flex items-center space-x-2">
                            <span className="font-medium">{item.price}</span>
                            <span
                                className={`text-sm ${item.trend === "up" ? "text-green-600" : "text-red-600"
                                    }`}
                            >
                                {item.change}
                            </span>
                            {item.trend === "up" ? (
                                <FiArrowUp className="h-4 w-4 text-green-600" />
                            ) : (
                                <FiArrowDown className="h-4 w-4 text-red-600" />
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MarketHighlights;