// src/components/Navbar.jsx
import { FiSettings, FiBell, FiUser } from "react-icons/fi";
import { Menu, X } from 'lucide-react';
import logo from '../assets/logo.jpg';

const Navbar = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <nav className="bg-green-700 shadow-sm border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left side - Logo and mobile menu */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md text-white hover:bg-green-600 transition-colors"
            aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
          >
            {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>          <div className="flex items-center space-x-2">
            <img
              src={logo}
              alt="AgroSakha Logo"
              className="h-10 w-10 object-contain rounded-full bg-white"
            />
            <span className="text-2xl font-bold text-white tracking-wide hidden sm:inline">AgroSakha</span>
          </div>
        </div>

        {/* Right side - Language switcher and icons */}
        <div className="flex items-center space-x-2">
          <div className="hidden md:flex space-x-2 mr-4">
            <button className="px-3 py-1 rounded text-white font-medium hover:bg-green-600 transition-colors text-sm">
              తెలుగు
            </button>
            <button className="px-3 py-1 rounded text-white font-medium hover:bg-green-600 transition-colors text-sm">
              हिंदी
            </button>
            <button className="px-3 py-1 rounded text-white font-medium hover:bg-green-600 transition-colors text-sm">
              English
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button className="p-2 text-white hover:bg-green-600 rounded-full transition-colors">
              <FiSettings className="h-5 w-5" />
            </button>
            <button className="p-2 text-white hover:bg-green-600 rounded-full relative transition-colors">
              <FiBell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            <button className="p-2 text-white hover:bg-green-600 rounded-full transition-colors">
              <FiUser className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;