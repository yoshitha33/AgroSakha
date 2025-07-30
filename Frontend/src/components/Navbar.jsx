// src/components/Navbar.jsx
import { Menu, X } from 'lucide-react'
import logo from '../assets/logo.jpg'


export default function Navbar({ isSidebarOpen, toggleSidebar, title = 'Pest Detection' }) {
  return (
    <header className="flex items-center px-4 py-4 bg-green-700 shadow-sm border-b h-15">
      {/* Logo and website name */}
      <div className="flex items-center space-x-4">
        {/* Sidebar toggle (Menu/X) */}
        <button
          onClick={toggleSidebar}
          className="ml-2 p-2 rounded-md text-white hover:bg-green-500 transition-colors"
          aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
        >
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Replace '/logo.png' with your logo path */}
        <img
  src={logo}
  alt="AgroSakha Logo"
  className="h-10 w-10 object-contain rounded-full bg-white"
/>
  <span className="text-2xl font-bold text-white tracking-wide">agrosakha</span>
      </div>
      {/* Language switcher */}
      <div className="ml-auto flex space-x-2">
        <button className="px-3 py-1 rounded text-white font-semibold hover:bg-green-600 transition-colors focus:outline-none">
          తెలుగు
        </button>
        <button className="px-3 py-1 rounded text-white font-semibold hover:bg-green-600 transition-colors focus:outline-none">
          हिंदी
        </button>
        <button className="px-3 py-1 rounded text-white font-semibold hover:bg-green-600 transition-colors focus:outline-none">
          English
        </button>
      </div>
    </header>
  )
}
