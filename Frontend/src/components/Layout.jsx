import { useState } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

export default function Layout({ children, pageTitle, sidebarItems }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  return (
    <div className="relative min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        sidebarItems={sidebarItems}
      />

      {/* Main content: Navbar + page content */}
      <div className="flex-1 flex flex-col">
        <Navbar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          title={pageTitle}
        />

        <main className="flex-1 overflow-y-auto p-4 max-w-7xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
