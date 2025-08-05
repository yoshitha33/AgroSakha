// src/components/Greeting.jsx
const Greeting = () => {
    const userName = "John Doe";
    const weather = {
        temp: "24°C",
        condition: "Sunny",
        location: "New York, USA",
    };

    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div className="mb-4 md:mb-0">
                <h1 className="text-2xl font-bold text-gray-800">
                    Hello, {userName} 👋
                </h1>
                <p className="text-gray-600">Welcome back to your farm dashboard</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-gray-800">
                    Today's weather: {weather.temp} {weather.condition}, {weather.location}
                </p>
            </div>
        </div>
    );
};

export default Greeting;