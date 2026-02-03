// src/components/CropHealth.jsx
import { FiCheckCircle } from "react-icons/fi";

const CropHealth = () => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Crop Health Status
            </h2>
            <div className="flex items-center space-x-3">
                <FiCheckCircle className="h-8 w-8 text-green-500" />
                <div>
                    <p className="text-gray-800 font-medium">Healthy</p>
                    <p className="text-gray-500 text-sm">Last scan: 2h ago</p>
                </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-gray-600 text-sm">
                    No pest detected in last scan
                </p>
            </div>
        </div>
    );
};

export default CropHealth;