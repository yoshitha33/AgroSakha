import { X, Bug } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import { TbBuildingStore } from "react-icons/tb";
import { GiFertilizerBag } from "react-icons/gi";


export default function Sidebar({ isSidebarOpen, toggleSidebar }) {
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    { name: "Home (Dashboard)", path: "/dashboard", icon: "🏠" },
    { name: "Weather", path: "/weather", icon: "🌤️" },
    { name: "Market Prices", path: "/market-prices", icon: "💰" },
    { name: "Expenses & Yield", path: "/expenses-yield", icon: "📊" },
    { name: "Crop Recommendation", path: "/crop-recommendation", icon: "🌾" },
    { name: "Fertiliser Planner" ,path: "/fertiliser-planner", icon: <GiFertilizerBag className="w-5 h-5" />, },
    { name: "Pest Detection", path: "/pest-detection", icon: <Bug className="w-5 h-5" /> },
    { name: "Nearby Shops", path: "/nearby-shops", icon: <TbBuildingStore /> },
    { name: "ChatBot", path: "/chatbot", icon: "🤖" },
    { name: "Govt Schemes & Documents", path: "/govt-schemes", icon: "📋" },
    { name: "Alerts", path: "/alerts", icon: "🚨" },
    { name: "Settings", path: "/settings", icon: "⚙️" },
    { name: "Admin Panel", path: "/admin", icon: "👨‍💼" },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    toggleSidebar();
  };

  const isActiveItem = (path) => {
    return location.pathname === path;
  };
  return (
    <>
      {/* Dark overlay for all screen sizes */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0  bg-opacity-20 z-20"
          onClick={toggleSidebar}
        />
      )}
      <aside
        className={`
          fixed top-0 left-0 z-30 w-80 h-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className="text-xl font-bold text-gray-800">AgroSakha</h1>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-gray-100"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="mt-6 px-4 pb-6 overflow-y-auto h-full">
          <div className="space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`
                  w-full flex items-center px-4 py-3 text-sm font-medium transition-colors duration-200 text-left rounded-lg
                  ${isActiveItem(item.path)
                    ? 'bg-green-100 text-green-700 border-l-4 border-green-500'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }
                `}
              >
                <span className="text-xl mr-4">{item.icon}</span>
                <span className="truncate">{item.name}</span>
              </button>
            ))}
          </div>
        </nav>
      </aside>
    </>
  )
}
