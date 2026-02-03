// src/components/FarmingTip.jsx
import { FiInfo } from "react-icons/fi";

const FarmingTip = () => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-start">
                <FiInfo className="h-5 w-5 text-blue-500 mt-1 mr-3" />
                <div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">
                        Daily Farming Tip
                    </h2>
                    <p className="text-gray-600">
                        Optimal time for irrigation is early morning or late evening to
                        minimize water loss through evaporation. This helps conserve water
                        while ensuring your crops get the moisture they need.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FarmingTip;