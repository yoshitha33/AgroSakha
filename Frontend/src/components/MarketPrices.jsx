// src/components/MarketPricesTable.jsx
import { FiArrowUp, FiArrowDown } from "react-icons/fi";

const MarketPricesTable = () => {
    const commodities = [
        { name: "Wheat", price: "$245", change: "+2.5%", trend: "up" },
        { name: "Corn", price: "$198", change: "-1.2%", trend: "down" },
        { name: "Soybeans", price: "$312", change: "+0.8%", trend: "up" },
        { name: "Rice", price: "$185", change: "+1.5%", trend: "up" },
        { name: "Cotton", price: "$92", change: "-0.5%", trend: "down" },
    ];

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Market Prices
            </h2>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Commodity
                            </th>
                            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Price
                            </th>
                            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Change
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {commodities.map((item) => (
                            <tr key={item.name}>
                                <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                    {item.name}
                                </td>
                                <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-800">
                                    {item.price}
                                </td>
                                <td className="px-2 py-4 whitespace-nowrap text-sm">
                                    <div className="flex items-center">
                                        {item.trend === "up" ? (
                                            <FiArrowUp className="h-4 w-4 text-green-600 mr-1" />
                                        ) : (
                                            <FiArrowDown className="h-4 w-4 text-red-600 mr-1" />
                                        )}
                                        <span
                                            className={
                                                item.trend === "up" ? "text-green-600" : "text-red-600"
                                            }
                                        >
                                            {item.change}
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MarketPricesTable;