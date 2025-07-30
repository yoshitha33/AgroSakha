import { X } from 'lucide-react'

export default function Sidebar({ isSidebarOpen, toggleSidebar, sidebarItems }) {
  return (
    <>
      {/* Dark overlay only if you want the overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-20"
          onClick={toggleSidebar}
        />
      )}
      <aside
        className={`
          fixed top-0 left-0 z-30 w-64 h-full bg-white shadow-lg transform transition-transform duration-300
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className="text-xl font-bold text-gray-800">AgriTech</h1>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-gray-100"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="mt-6">
          {sidebarItems.map((item, idx) => {
            const Icon = item.icon
            return (
              <a
                key={idx}
                href="#"
                className={`
                  flex items-center px-6 py-3 text-sm font-medium transition-colors duration-200
                  ${item.active
                    ? 'bg-green-50 text-green-700 border-r-2 border-green-500'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </a>
            )
          })}
        </nav>
      </aside>
    </>
  )
}
