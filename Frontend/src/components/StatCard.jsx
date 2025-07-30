const StatCard = ({ title, value, subtitle, progress, icon }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <span className="text-lg">{icon}</span>
      </div>
      <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
      {progress !== undefined ? (
        <div className="mt-3">
          <div className="flex items-center justify-between text-sm text-gray-500 mb-1">
            <span>{subtitle}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
        </div>
      ) : (
        <p className="text-sm text-gray-500">{subtitle}</p>
      )}
    </div>
  )
}

export default StatCard
