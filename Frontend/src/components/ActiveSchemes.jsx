// src/components/ActiveSchemes.jsx
import { FiFileText } from "react-icons/fi";

const ActiveSchemes = () => {
    const schemes = [
        {
            id: 1,
            name: "Crop Insurance Scheme",
            daysLeft: 15,
        },
        {
            id: 2,
            name: "Subsidy Program",
            daysLeft: 30,
        },
    ];

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Active Government Schemes
            </h2>
            <div className="space-y-4">
                {schemes.map((scheme) => (
                    <div key={scheme.id} className="flex items-center justify-between">
                        <div className="flex items-start">
                            <FiFileText className="h-5 w-5 text-green-500 mt-1 mr-3" />
                            <div>
                                <p className="text-gray-800 font-medium">{scheme.name}</p>
                                <p className="text-gray-500 text-sm">
                                    {scheme.daysLeft} days left to apply
                                </p>
                            </div>
                        </div>
                        <button className="px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700">
                            Apply
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ActiveSchemes;